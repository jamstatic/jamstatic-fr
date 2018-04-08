---
title: "La fonction .Scratch d’Hugo"
date: 2018-02-09T20:50:50+01:00
draft: false
categories:
  - hugo
source:
  author: Régis Philibert
  title: "Hugo .Scratch explained"
  url: https://regisphilibert.com/blog/2017/04/hugo-scratch-explained-variable/
---

{{% intro %}}Si vous avez aimé l'article de [Régis Philibert](https://regisphilibert.com/) à propos de [la gestion du contexte]({{< relref "hugo-le-point-sur-le-contexte.md" >}}) dans les fichiers de gabarits de page pour Hugo, vous devriez tout autant apprécier cette explication par l'exemple du surchargement de variables à l'aide de la fonction `.Scratch`. Ça vous démange ? Voyons tout cela en détail.
{{% /intro %}}

Manipuler des variables dans Hugo peut s'avérer compliqué si vous ne connaissez que des langages de programmation classiques.

Généralement on écrit quelque chose comme :

```php
<?php
$salutations = "Bonjour";
if($ciel == "sombre"){
    $salutations = "Bonsoir";
}
// En une ligne avec un opérateur ternaire :
$salutations = $ciel == "sombre" ? "Bonjour : Bonsoir";
```

Avec Go Template, on serait donc tenté d'écrire:

```go
{{ $salutations := "Bonjour" }}
{{ if eq $ciel "sombre" }}
    {{ $salutations = "Bonsoir" }}
{{ end }}
{{ $salutations }}
```

Malheureusement ça ne fonctionnera pas 😞

Vous aurez besoin de l'aide de `.Scratch` pour cela et c'est ce que nous allons voir ensemble !

Du moins tant que [cette anomalie du langage Go](https://github.com/golang/go/issues/10608) n'aura pas été résolue dans la version 1.11 annoncée actuellement pour la fin juillet, la seule manière de surcharger des variables ou d'ajouter n'importe quel type de valeur personnalisée à un objet `.Page`, c'est d'utiliser la fonction `.Scratch`.

`.Scratch` est super pratique mais [sa documentation est un peu légère](https://gohugo.io/extras/scratch/) si comme moi vous n'êtes pas super à l'aise avec le langage Go.

## `.Scratch` à la rescousse !

Au départ la fonction `.Scratch` a été ajoutée pour palier à la limitation de Go Template mentionnée plus haut et s'est mise à rendre bien d'autres services par la suite.\
Cette fonction dispose de plusieurs méthodes.

### `.Scratch.Set`

`Set` est utilisé pour mémoriser une valeur voire pour pouvoir surcharger simplement une valeur par la suite.

Pour reprendre notre exemple précédent en PHP, nous pouvons écrire quelque chose comme :

```go
{{ .Scratch.Set "salutations" "Bonjour" }}
{{ if eq $ciel "sombre" }}
    {{ .Scratch.Set "salutations" "Bonsoir" }}
{{ end }}

{{ .Scratch.Get "salutations"}}
```

### `.Scratch.Add`

Cette méthode s'occupe d'ajouter ou de pousser des valeurs multiples dans une variable ou une clef.

```go
// Pour les chaînes de caractères
{{ .Scratch.Add "salutations" "Bonjour" }}
{{ .Scratch.Add "salutations" "Bonsoir" }}

{{ .Scratch.Get "salutations" }}
// Affichera : BonjourBonsoir
```

Utilisée avec `slice`, elle permet d'ajouter une ou plusieurs valeurs à un tableau.

```
{{ .Scratch.Add "salutations" (slice "Bonjour") }}
{{ .Scratch.Add "salutations" (slice "Bonsoir") }}
{{ .Scratch.Add "salutations" (slice "Aloha" "Buenos dias") }}
```

### `.Scratch.Get`

Maintenant récupérons tout ça.

```go
// Avec la fonction range
{{ range .Scratch.Get "salutations" }}
<ol>
    <li>
        {{ . }}
    </li>
</ol>
{{ end }}
// Affichera une liste ordonnée avec nos 4 salutations.

// Ou avec la fonction delimit
// Affichera Bonjour, Bonsoir, Aloha, Buenos dias
{{ delimit (.Scratch.Get "salutations"), ", " }}
```

## Manipuler des tableaux et des maps

### .Scratch.SetInMap

Cette fonction-là permet de cible la clef d'un tableau et de lui assigner une nouvelle valeur.

Elle prend comme premier paramètre votre clef `.Scratch`, comme second paramètre la clef issue du tableau ou de la map, le troisième étant la valeur que vous définissez.

Si vous ne connaissez pas [dict](https://gohugo.io/functions/dict/#readout) je
vous explique tout ça [dans cet article](https://regisphilibert.com/blog/2017/04/hugo-go-template-translator-explained-understanding/#associative-arrays)

```go
{{ .Scratch.Add "salutations" (dict "english" "Hello" "french" "Bonjour") }}

{{ .Scratch.SetInMap "salutations" "english" "Howdy 🤠" }}

// Nous avons modifié la valeur de la clef en anglais de Hello à Howdy 🤠 !

```

## Attention au périmètre et au contexte…

`.Scratch` n'est disponible que pour l'objet page ou l'objet shortcode. Vous ne pouvez pas l'utiliser sur un autre élément.

Souvenez-vous que si vous vous trouvez à l'intérieur d'une boucle `range` dans votre page d'index, alors le `.Scratch` de votre page d'index sera `$.Scratch` alors que la page courante que vous traitez dans votre boucle sera `.Scratch`.

Retenez également que vous pouvez affecter une paire clef-valeur à `.Scratch` depuis n'importe où, même dans un fichier partiel du moment que vous lui passez le contexte.
Heeeeein? Prenons un exemple concret pour illustrer les dangers qui vous guettent avec l'utilisation de `.Scratch` et du contexte.

### Un exemple classe avec `.Scratch`

Je trouve ça bien pratique d'affecter des classes à mon élément `body` (comme le fait WordPress) pour pouvoir faires des ajustements CSS/JavaScript en fonction de la page sur laquelle on se trouve.

Je trouvais ça très fastideux à faire avec Hugo, jusqu'à ce que je comprenne comment utiliser `.Scratch`.

Je veux ajouter une classe CSS `rp-body` à toutes mes pages ainsi que la valeur de `.Section` à mes classes.

Et seule la page d'accueil devrait hériter de la classe `rp-home`.

Je pourrais écrire ça une bonne foi pour toute, dans un fichier partiel ou un fichier de gabarit de page qui comprend l'ouverture de la balise `body` mais… je pourrais avoir besoin de cette liste de classes ailleurs dans mon code pour réaliser des tours de magie avec ajax. Disons sous forme d'objet JavaScript.

Comme faire pour créer cette liste, la modifier si je suis sur la page d'accueil et la stocker dans mon objet `.Page` pour pouvoir la réutiliser par la suite ? Pour bien faire, nous allons stocker nos classes dans un tableau.

```go
// Avant la balise body, je peux stocker mon unique et première classe universelle.
{{ .Scratch.Add "classes" (slice "rp-body") }}

// Puis ma section. Ce printf me permet d'ajouter la valeur de .Section avec mon préfixe personnalisé.
{{ .Scratch.Add "classes" (slice (printf "rp-%s" .Section))) }}

// Et maintenant sommes nous sur la page d'accueil ?
{{ if .IsHome }}
    {{ .Scratch.Add "classes" (slice "rp-home") }}
{{end}}
// Est-ce que ce sont les vacances ? 🎄
{{ if isset .Site.Params "season" }}
    {{ .Scratch.Add "classes" (slice (printf "rp-body--%s" .Site.Params.season))) }}
{{ end }}
```

Nous pourrions faire bien plus de vérifications et de contorsions, mais en fin de compte, nous n'avons plus qu'à écrire dans notre fichier de gabarit ce joli :

```go
<body class='{{ delimit (.Scratch.Get "classes") " " }}'>
```

Et pour JavaScript, nous pouvons créer notre objet à l'endroit où nous en avons besoin.

```js
<script>
    let bodyClasses = [{{ range .Scratch.Get "classes" }}"{{ . }}", {{end}}];
</script>
```

Très bon cas de figure, continuons notre chemin.

### `.Scratch` dans un fichier partiel

Comme je l'expliquais plus tôt, comme `.Scratch` fait partie de l'objet page généralement passé en tant que contexte ([le fameux point]({{< relref "hugo-le-point-sur-le-contexte.md" >}})) à l'appel de la fonction `partial`.Déplaçons le bout de code qui stocke nos classes dans un fichier partiel pour gagner en lisibilité :

```go
// partials/scratching/body_classes.html
{{ .Scratch.Add "classes" (slice "rp-body") }}
[… ici le code vu précédemment  …]
```

Dans mon fichier de gabarit, je peux maintenant écrire :

```
{{ partial "scratching/body_classes.html" . }}
<body class='{{ delimit (.Scratch.Get "classes") " " }}'>
[…]
```

Le retour de la fonction `.Scratch` de la page a été transmis au fichier partiel via le contexte, de manière à pouvoir continuer de le modifier sans avoir à toucher au code ailleurs. En plus ça permet d'avoir des fichiers de gabarits de page plus propres !

### `.Scratch` dans un fichier partiel dans une boucle `range` 🤯

Quand vous utilisez la fonction `range` pour boucler sur des éléments, vous ne pouvez pas lui passer le contexte en paramètre comme on peut le faire avec la fonction `partial`, le contexte que vous manipulez est celui de la boucle, c'est bien ce que vous souhaitez.

```go
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

C'est parce que le contexte que nous passons en paramètre de la fonction `partial` est celui de l'élément en cours parcouru grâce à la fonction `range`, pas celui de la page dont vous êtes en train de coder le gabarit.

Très bien me direz-vous, mais comment faire pour accéder au `.Scratch` de la page parente depuis notre fichier partiel ?

Eh bien, vous pouvez toujours stocker ce qui est retourné par la fonction `.Scratch` de la page dans une variable, pour la passer ensuite en paramètre de votre fichier partiel :

```go
 {{ $indexScratch := .Scratch }}
    {{ range where .Data.Pages }}
        {{ partial "child.html" $indexScratch }}
    {{ end }}
```

Dans le fichier partiel on écrira alors :

```go
    <div class="Child Child--{{ .Get "section_color" }}">
    […]
    <div>
```

Si vous avez également besoin de l'ensemble du contexte de la page que vous êtes en train de parcourir dans la boucle, utilisez alors la fonction `dict` :

```go
  {{ $indexScratch := .Scratch }}
    {{ range where .Data.Pages }}
        {{ partial "child.html" (dict "indexScratch" $indexScratch "page" . }}
    {{ end }}
```

Dans le fichier partiel vous pourrez alors écrire :

```
    <div class="Child Child--{{ .indexScratch.Get section_color}}">
        {{ .page.Content }}
    <div>
```

## `.Scratch` après Go 1.11

Le jour où l'équipe chargée de développer le langage Go publiera cette révision, nous pourrons surcharger naturellement les variables dans nos fichiers de gabarits :

```go
// Enfin !
{{ $salutations := "Bonjour" }}
{{ if eq $ciel "sombre" }}
    {{ $salutations = "Bonsoir" }}
{{ end }}
{{ $salutations }}
```

Mais `.Scratch` aura toujours besoin de passer les paires clef-valeur au contexte de page ou de shortcode. Sans cela, vous allez vous retrouver avec un sac de nœuds à gérer.

### Sans `.Scratch` après Go v1.11

```
{{ $humeur := "Joyeux" }}
{{ if $pluie }}
    {{ $humeur = "Grincheux" }}
{{ end }}
{{ partial "blancheneige/nain.html" (dict "humeur" $humeur "page" . ) }}
```

### Avec `.Scratch` (actuellement)

```
{{ .Scratch.Set "humeur" "Joyeux" }}
{{ if $pluie }}
    {{ .Scratch.Set "humeur" "Grincheux" }}
{{ end }}
{{ partial "blancheneige/nain.html" . }}
```

En plus, je ne pense pas que s'amuser à dénouer des maps complexes soit aussi pratique que ce que nous permet de faire actuellement `.Scratch.SetInMap` !
