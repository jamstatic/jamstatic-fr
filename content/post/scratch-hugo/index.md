---
title: "La fonction .Scratch d’Hugo"
description: Pendant longtemps, la fonction Scratch a été le seul moyen d'écraser des variables en Go Templating. Elle reste toujours le meilleur moyen d'enrichir votre contexte de page ou de shortcode dans Hugo.
date: 2018-02-09T20:50:50+01:00
lastmod: 2018-08-29T10:09:47-05:00
images:
  - https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/w_1200,c_fit,co_white,g_north_west,x_80,y_120,l_text:poppins_80_ultrabold_line_spacing_-30:La%20fonction%20.Scratch%20d%E2%80%99Hugo/jamstatic/twitter-card.png
categories:
  - hugo
source:
  author: Régis Philibert
  title: "Hugo .Scratch explained"
  url: https://regisphilibert.com/blog/2017/04/hugo-scratch-explained-variable/
---

{{< intro >}}

Si vous avez aimé l’article de
[Régis Philibert](https://regisphilibert.com/) à propos de [la gestion du
contexte]({{< relref "hugo-le-point-sur-le-contexte.md" >}}) dans les fichiers
de gabarits de page, vous devriez tout autant apprécier cette
explication par l’exemple de la fonction `.Scratch` du langage de templating d'Hugo. Ça vous démange ? Voyons tout cela en détail.

{{< /intro >}}

---

{{< notice update >}} Vous êtes ici pour apprendre à écraser une variable dans un gabarit de page ? Bonne nouvelle, vous n'avez plus besoin de la fonction `.Scratch` pour cela depuis la version 0.48 d'Hugo. Malgré cela, `.Scratch` reste encore utile pour plein d'autres choses ! {{< /notice >}}

Le contexte de Page d'Hugo n'est pas seulement la source d'information la plus importante pour vos pages, c'est aussi la source de données principale de tous vos templates. Plus souvent qu'il n'y paraît, vous aurez à ajouter vos propres variables personnalisées en plus de celles définies par défaut.

Avec la fonction **.Scratch** d'Hugo, n'importe quelle [Page](https://gohugo.io/variables/page/#readout) ou [Shortcode](https://gohugo.io/variables/shortcodes/#readout) peut être enrichie avec autant de variables que nécessaire en plus de celles par défaut.

## C'est quoi Scratch ?

Scratch a été ajouté à l'origine pour contourner une [limitation](https://github.com/golang/go/issues/10608) du langage de templating de Go, qui empêchait d'écraser des variables. Elle s'est rapidement enrichie d'autres méthodes et constitue désormais une fonctionnalité d'Hugo à part entière.

{{< notice info >}}
À des fins de lisibilité, les extraits de code qui suivent ont des commentaires incompatibles avec le langage de template de Go. Reportez vous à la [doc](http://gohugo.io/templates/introduction/#comments) pour comment commenter dans Hugo.
{{< /notice >}}

### `.Scratch.Set`

`Set` est utilisé pour mémoriser une valeur voire pour pouvoir surcharger simplement une valeur par la suite.

```go-html-template
{{ .Scratch.Set "salutations" "Bonjour" }}
{{ if eq $ciel "sombre" }}
    {{ .Scratch.Set "salutations" "Bonsoir" }}
{{ end }}

{{ .Scratch.Get "salutations"}}
```

### `.Scratch.Add`

Cette méthode s'occupe d’ajouter ou de pousser des valeurs multiples dans une
variable ou une clef.

```go-html-template
// Pour les chaînes de caractères
{{ .Scratch.Add "salutations" "Bonjour" }}
{{ .Scratch.Add "salutations" "Bonsoir" }}

{{ .Scratch.Get "salutations" }}
// Affichera : BonjourBonsoir
```

Utilisée avec `slice`, elle permet d’ajouter une ou plusieurs valeurs à un
tableau.

```go-html-template
{{ .Scratch.Add "salutations" (slice "Bonjour") }}
{{ .Scratch.Add "salutations" (slice "Bonsoir") }}
{{ .Scratch.Add "salutations" (slice "Aloha" "Buenos dias") }}
```

### `.Scratch.Get`

Maintenant récupérons tout ça.

```go-html-template
// Avec la fonction range
{{ range where .Scratch.Get "salutations" }}
<ol>
    <li>
        {{ . }}
    </li>
</ol>
{{ end }}
// ☝️ Affichera une liste ordonnée avec nos 4 salutations.

// Ou avec la fonction delimit
{{ delimit (.Scratch.Get "salutations"), ", " }}
// ☝️ Affichera Bonjour, Bonsoir, Aloha, Buenos dias
```

### .Scratch.Delete[^1]

Supprime la paire clé/valeur du contexte.
Lors de l'utilisation de `.Scratch.Add` dans une boucle, `.Scratch.Delete` est pratique pour réinitialiser une valeur.

```go-html-template
{{ .Scratch.Delete "salutations" }}
```

### newScratch[^2]

Ce n'est pas une méthode issue de Scratch, mais une fonction qui permet la création d'une instance locale de Scratch dans un template.

```go-html-template
{{ $headerScratch := newScratch }}
{{ $headerScratch.Add "brand_image" .Params.image }}
```

## Manipuler des tableaux et des maps

### .Scratch.SetInMap

Cette fonction-là permet de cibler la clef d’un tableau et de lui assigner une
nouvelle valeur.

Elle prend comme premier paramètre votre clef `.Scratch`, comme second paramètre
la clef issue du tableau ou de la map, le troisième étant la valeur que vous
définissez.

Si vous ne connaissez pas [dict](https://gohugo.io/functions/dict/#readout) je
vous explique tout ça
[dans cet article](https://regisphilibert.com/blog/2017/04/hugo-cheat-sheet-go-template-translator/#associative-arrays)

```go-html-template
{{ .Scratch.Add "salutations" (dict "english" "Hello" "french" "Bonjour") }}

{{ .Scratch.SetInMap "salutations" "english" "Howdy 🤠" }}

// Nous avons modifié la valeur de la clef en anglais de Hello à Howdy 🤠 !
```

## Attention au périmètre et au contexte…

`.Scratch` n'est disponible que pour l’objet page ou l’objet shortcode. Vous ne
pouvez pas l’utiliser sur un autre élément.

Souvenez-vous que si vous vous trouvez à l’intérieur d’une boucle `range` dans
votre page d’index, alors le `.Scratch` de votre page d’index sera `$.Scratch`
alors que la page courante que vous traitez dans votre boucle sera `.Scratch`.

Retenez également que vous pouvez affecter une paire clef-valeur à `.Scratch`
depuis n'importe où, même dans un fichier partiel du moment que vous lui passez
le contexte. Heeeeein? Prenons un exemple concret pour illustrer les dangers qui
vous guettent avec l’utilisation de `.Scratch` et du contexte.

### Un exemple classe avec `.Scratch`

Je trouve ça bien pratique d’affecter des classes à mon élément `body` (comme le
fait WordPress) pour pouvoir faire des ajustements CSS/JavaScript en fonction
de la page sur laquelle on se trouve.

Je trouvais ça très fastidieux à faire avec Hugo, jusqu'à ce que je comprenne
comment utiliser `.Scratch`.

Je veux ajouter une classe CSS `rp-body` à toutes mes pages ainsi que la valeur
de `.Section` à mes classes.

Et seule la page d’accueil devrait hériter de la classe `rp-home`.

Je pourrais écrire ça une bonne foi pour toute, dans un fichier partiel ou un
fichier de gabarit de page qui comprend l’ouverture de la balise `body` mais… je
pourrais avoir besoin de cette liste de classes ailleurs dans mon code pour
réaliser des tours de magie avec ajax. Disons sous forme d’objet JavaScript.

Comme faire pour créer cette liste, la modifier si je suis sur la page d’accueil
et la stocker dans mon objet `.Page` pour pouvoir la réutiliser par la suite ?
Pour bien faire, nous allons stocker nos classes dans un tableau.

```go-html-template
// Avant la balise body, je peux stocker mon unique et première classe universelle.
{{ .Scratch.Add "classes" (slice "rp-body") }}

// Puis ma section. Ce printf me permet d’ajouter la valeur de .Section avec mon préfixe personnalisé.
{{ .Scratch.Add "classes" (slice (printf "rp-%s" .Section))) }}

// Et maintenant sommes nous sur la page d’accueil ?
{{ if .IsHome }}
    {{ .Scratch.Add "classes" (slice "rp-home") }}
{{end}}
// Est-ce que ce sont les vacances ? 🎄
{{ if isset .Site.Params "season" }}
    {{ .Scratch.Add "classes" (slice (printf "rp-body--%s" .Site.Params.season))) }}
{{ end }}
```

Nous pourrions faire bien plus de vérifications et de contorsions, mais en fin
de compte, nous n'avons plus qu'à écrire dans notre fichier de gabarit ce joli :

```go-html-template
<body class='{{ delimit (.Scratch.Get "classes") " " }}'>
```

Et pour JavaScript, nous pouvons créer notre objet à l’endroit où nous en avons
besoin.

```js
<script>
    let bodyClasses = [{{ range .Scratch.Get "classes" }}"{{ . }}", {{end}}];
</script>
```

Très bon cas de figure, continuons notre chemin.

### `.Scratch` dans un fichier partiel

Comme je l’expliquais plus tôt, comme `.Scratch` fait partie de l’objet page
généralement passé en tant que contexte ([le fameux point]({{< relref
"hugo-le-point-sur-le-contexte.md" >}})) à l’appel de la fonction
`partial`.Déplaçons le bout de code qui stocke nos classes dans un fichier
partiel pour gagner en lisibilité :

```go-html-template
// partials/scratching/body_classes.html
{{ .Scratch.Add "classes" (slice "rp-body") }}
[… ici le code vu précédemment  …]
```

Dans mon fichier de gabarit, je peux maintenant écrire :

```go-html-template
{{ partial "scratching/body_classes.html" . }}
<body class='{{ delimit (.Scratch.Get "classes") " " }}'>
[…]
```

Le retour de la fonction `.Scratch` de la page a été transmis au fichier partiel
via le contexte, de manière à pouvoir continuer de le modifier sans avoir à
toucher au code ailleurs. En plus ça permet d’avoir des fichiers de gabarits de
page plus propres !

### `.Scratch` dans un fichier partiel dans une boucle `range` 🤯

Quand vous utilisez la fonction `range` pour boucler sur des éléments, vous ne
pouvez pas lui passer le contexte en paramètre comme on peut le faire avec la
fonction `partial`, le contexte que vous manipulez est celui de la boucle, c'est
bien ce que vous souhaitez.

```go-html-template
{{ .Scratch.Set "section_color" }}
{{ range where .Data.Pages}}
   <h2>{{ .Title }}</h2>
     <div class="Child Child--{{ $.Scratch.Get section_color}}">
     […]
     <div>
{{ end }}
// Affichera le contenu de section_color.

// Alors que…
{{ range where .Data.Pages }}
      {{ partial "enfant.html" . }}
{{ end }}

// Le fichier partiel enfant.html ne saura pas récupérer le contenu de la fonction .Scratch de la page, même si nous lui passons le contexte en paramètre…
```

C’est parce que le contexte que nous passons en paramètre de la fonction
`partial` est celui de l’élément en cours parcouru grâce à la fonction `range`,
pas celui de la page dont vous êtes en train de coder le gabarit.

Très bien me direz-vous, mais comment faire pour accéder au `.Scratch` de la
page parente depuis notre fichier partiel ?

Eh bien, vous pouvez toujours stocker ce qui est retourné par la fonction
`.Scratch` de la page dans une variable, pour la passer ensuite en paramètre de
votre fichier partiel :

```go-html-template
{{ $indexScratch := .Scratch }}
  {{ range where .Data.Pages }}
      {{ partial "child.html" $indexScratch }}
  {{ end }}
```

Dans le fichier partiel on écrira alors :

```go-html-template
<div class="Child Child--{{ .Get "section_color" }}">
[…]
<div>
```

Si vous avez également besoin de l’ensemble du contexte de la page que vous êtes
en train de parcourir dans la boucle, utilisez alors la fonction `dict` :

```go-html-template
{{ $indexScratch := .Scratch }}
  {{ range where .Data.Pages }}
      {{ partial "child.html" (dict "indexScratch" $indexScratch "page" . }}
  {{ end }}
```

Dans le fichier partiel vous pourrez alors écrire :

```go-html-template
<div class="Child Child--{{ .indexScratch.Get section_color}}">
    {{ .page.Content }}
<div>
```

### _.Scratch_ dans un fichier partiel sans contexte de page

Tout ce qui figure ci-dessus est important si vous devez accéder à une instance Scratch liée à votre contexte de page, mais avec l'ajout de `newScratch`[^2], vous pouvez utiliser désormais utiliser Scratch n'importe où, y compris dans un fichier partiel sans contexte de Page.

Appelons un fichier partiel. Notez que nous ne passons aucun contexte de Page, juste une map issue du Front Matter qui contient `class`, `alt` et une potentielle `image_src` pour remplacer celle par défaut.

```go-html-template
{{ partial "brand" .Params.brand }}
```

Dans notre fichier partiel nous pouvons toujours faire appel à Scratch :

```go-html-template
{{ $brandScratch := newScratch }}
{{ $brandScratch.Set "brand_image" "default.jpg" }}
{{ with .image_src }}
	{{ $brandScratch.Set "brand_image" "." }}
{{ end }}
<div class="brand {{ .class }}">
	<img src="{{ $brandScratch.Get "brand_image" }}" alt="{{ .alt }}" />
</div>
```

## `.Scratch` après Go 1.11

Oui, avec la version 11 de Golang nous pouvons maintenant nativement écraser les variables dans les templates Go mais …

Dans beaucoup de cas, je trouve que stocker une valeur dans le contexte de Page plus utile qu'autre chose. Par exemple, si un fichier partiel a besoin d'accéder à des variables de Page et à d'autres informations, si vous vous passiez de Scratch, vous vous retrouveriez avec un contexte sous la forme d'un long `dict`…

```go-html-template
{{ $humeur := "Joyeux" }}
{{ if $pluie }}
    {{ $humeur = "Grincheux" }}
{{ end }}
{{ partial "blancheneige/nain.html" (dict "humeur" $humeur "page" . ) }}
```

Utiliser Scratch pour stocker vos variables dans l'objet de Page vous garantit un code propre et réutilisable.

### Avec `.Scratch`

```go-html-template
{{ .Scratch.Set "humeur" "Joyeux" }}
{{ if $pluie }}
    {{ .Scratch.Set "humeur" "Grincheux" }}
{{ end }}
{{ partial "blancheneige/nain.html" . }}
```

En plus, je ne pense pas que s'amuser à dénouer des maps complexes soit aussi
pratique que ce que nous permet de faire actuellement `.Scratch.SetInMap` !

[^1]: Depuis [Hugo 0.38](https://gohugo.io/news/0.38-relnotes/)
[^2]: Depuis [Hugo 0.43](https://gohugo.io/news/0.43-relnotes/)
