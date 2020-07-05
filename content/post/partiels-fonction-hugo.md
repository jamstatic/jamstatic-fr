---
title: "Des fonctions dans nos partiels Hugo !"
date: 2019-12-22T10:36:56+01:00
lastmod: 2019-12-22T16:21:43+01:00
description: "Maintenant que les partiels peuvent retourner tout type de donnée, nous pouvons écrire des fonctions réutilisables dans nos différents modèles de page !"
categories:
  - hugo
images:
  - https://regisphilibert.com/blog/2019/12/hugo-partial-series-part-2-functions-with-returning-partials//images/featured.png
source:
  author: "Régis Philibert"
  title: "The Full Partial Series Part 2: Returning partials!"
  url: "https://regisphilibert.com/blog/2019/12/hugo-partial-series-part-2-functions-with-returning-partials/"
---

![](https://regisphilibert.com/blog/2019/12/hugo-partial-series-part-2-functions-with-returning-partials//images/featured.png)

Comme nous l'avons déjà vu dans différents articles dont celui sur la [mise en cache des fichiers partiels]({{< relref "/post/mise-en-cache-fichiers-partiels-hugo" >}}), jusqu'ici le moteur de _templating_ d'Hugo se concentrait principalement sur la génération de fichiers. Résultat : même si les fichiers partiels étaient très utiles pour afficher tout un tas de trucs, jusqu'à récemment, ils ne permettaient pas de retourner une valeur typée.

Tout a changé à partir de la version `0.55.0` d'Hugo qui a introduit l'instruction `return` dans l'API de la fonction `partial` ! Les partiels sont tout à coup devenus des fonctions réutilisables qui peuvent être appelées par des fichiers de modèles plus conventionnels.

Dans cet article, nous aborderons les bases de cette fonctionnalité avant de nous plonger dans des cas d'utilisation bien précis.

### **Avant `return`**

Avant l'arrivée de l'instruction `return`, quand les partiels ne savaient qu'imprimer du contenu, beaucoup de gens se reposaient malgré tout sur eux pour créer des bouts de code réutilisables qui avaient d'autres buts. Par exemple vous pouviez transformer l'URL relative d'une image pour la préfixer avec votre domaine S3:

```go-html-template
# layouts/partial/FormatURL.html
{{- $S3Domain := site.Params.s3Domain -}}
{{- printf "%s/%s" $S3Domain . | safeHTMLAttr -}}
# layout/_default/single.html
{{- with .Params.image -}}
<img src="{{ partial "FormatURL.html" . }}" />
{{ end }}
```

Ici la notation `{{- -}}` nous assure que rien d'autre ne sera affiché aux côtés de la chaîne de l'URL : ni espace, ni retour à la ligne, etc.

On pourrait même aller plus loin et afficher des données au format JSON à l'appel du partiel :

```go-html-template
# layouts/partial/GetSEOData.html
{{- with . -}}
  {{- $title := .Title -}}
  {{- $description := .Summary -}}
  {{- with .Params.seo.title -}}
    {{- $title = . -}}
  {{- end -}}
  {{- with .Params.seo.description -}}
    {{- $description = . -}}
  {{- end -}}
  {{- dict "title" $title "description" $description | jsonify -}}
{{- end -}}

# layouts/partial/head.html
{{ $seo := partial "GetSEOData.html" . | transform.Unmarshal }}
{{ with $seo }}
  # seo tags...
{{ end }}
```

Mais ces astuces se limitaient à des types de données basiques comme les chaînes de caractères, les nombres ou des tableaux (associatifs) de celles-ci.
Il n'y avait aucun moyen de facilement retourner un objet complexe comme une page ou un fichier, encore moins une collection de pages.

Puis vint [Hugo 0.55.0](https://gohugo.io/news/0.55.0-relnotes/) , l'instruction `return` et les _partiels de fonction_!

## **Quelques points à retenir**

Avant de nous plonger dans le code, il y a certaines choses à faire et à ne pas faire que nous devons passer en revue.

### **🚫 Pas de `return` dans les clauses**

```go-html-template
{{ if gt .Params.temperature 70 }}
  {{ return 😎 }}
{{ end }}
```

Ici ☝️ la valeur `.Params.temperature` sera ignorée et c'est 😎 qui sera systématiquement retourné. Un partiel retournera simplement ce qui suit une instruction `return` et ce où qu'elle soit positionnée dans le code.

```go-html-template
{{ with .Params.temperature }}
  {{ return . }}
{{ end }}
```
Même chose ici ☝️, `return` doit se trouver à la racine et ne peut pas être appelé dans une instruction imbriquée.

### 🚫 Pas de multiples instructions `return`

```go-html-template
{{ if gt .Params.temperature 70 }}
  {{ return 😎 }}
{{ else }}
  {{ return ⛸️ }}
{{ end }}
```

Cet exemple ne marchera pas, car les retours multiples ne sont pas supportés.

### 👍 Une unique variable retournée

On tire donc des exemples précédents la règle générique : **une variable retournée unique à la racine**.

Le meilleur moyen de se conformer à cette règle est de porter notre attention sur l'unique _variable retournée_.

La _variable retournée_ c'est votre base de départ, celle que vous allez manipuler et éventuellement retourner.

1. 🍽️ Affecter une valeur de départ,
2. 🔪 la travailler,
3. 💁‍♂️ et la retourner à la fin.

```go-html-template
{{ $emoji := ⛸️ }}
{{ if gt .Params.temperature 70 }}
  {{ $emoji = 😎}}
{{ else if gt .Params.temperature 100 }}
  {{ $emoji = 🥵}}
{{ end }}
{{ return $emoji }}
```

Quel que soit le nombre de lignes, d'espaces ou de retours à la ligne dans votre code, la seule valeur produite par votre partiel c'est cet emoji unique qui suit le mot magique `return`.

{{< notice info >}}
Tout comme pour `if`, `with`, `range` et leurs amis, ce qui suit `return` n'a pas besoin d'être entre parenthèses.

```go-html-template
{{ return gt .Params.temperature 50 }}
```
☝️ Cette notation est valide et retournera un booléen.
{{< /notice >}}

### 🤙 Appeler nos partiels de fonction

Comme pour n'importe quel autre partiel on écrit :

```go-html-template
Emoji: {{ partial "emoji.html" . }}
```

Là où ça devient intéressant c'est qu'on peut stocker la valeur retournée !

```go-html-template
{{ $emoji := partial "emoji.html" . }}
```

### 📏 Quelques conventions

Du moins celles que j'ai adoptées…

Pour bien distinguer mes partiels classiques de ceux qui retournent des valeurs de tous types, j'ai pris pour habitude de ranger ces derniers dans le dossier  `layouts/partials/func/`. Cela a au moins le mérite de les isoler des partiels plus conventionnels, sans avoir non plus à avoir à taper beaucoup plus de caractères lors de leur appel.

```go-html-template
{{ partial "func/emoji.html" . }}
```

Hugo part du principe que par défaut l'extension de votre fichier partiel est `.html`. Vu que j'utilise toujours l'extension `html` pour mes fichiers partiels, je peux omettre de l'écrire et ainsi gagner cinq précieux caractères :

```go-html-template
{{ partial "func/emoji" . }}
```

Enfin, j'aime bien utiliser la casse _CamelCase_ ainsi qu'un verbe autant que possible :

```go-html-template
{{ partial "func/GetEmoji" . }}
```

**Et voilà mon code Hugo est tout beau :**

```go-html-template
{{ with partial "func/GetEmoji" . }}
  Emoji: {{ . }}
{{ end }}
```
## Coder nos partiels de fonction

Bien, la partie théorique était intéressante, maintenant il est temps de faire craquer quelques articulations et de nous mettre à taper au clavier ! Ensemble nous allons essayer de répondre à un besoin de base : _lister les termes des taxonomies de nos projets Hugo de manière efficace_.

Cette opération n'est pas forcément très intuitive. Une taxonomie et ses termes occupent une place à part entière dans un projet Hugo, mais vu depuis le contexte d'une page, ce n'est qu'une liste de chaînes de caractères dans votre Front Matter :

```yaml
---
title: Une nuit au Louvre
tags:
  - Art
  - Paris
  - Musée
---
```

Pour les lister sous forme de liens cliquables, vous devez construire vous même ces dits liens, en vous basant sur ces chaînes transformées en URLs ou en récupérant l'objet page à l'aide de `.GetPage` ou `.Site.Taxonomies`.

Ce serait bien si ce travail pénible pouvait être fait dans un _partiel de fonction_ réutilisable et non dans les fichiers de modèles de nos contenus.

Quant à l'appel de ce type de partiel, il devrait être aussi concis que cela :

```go-html-template
{{ range .Params.tags }}
  {{ with partial "func/GetTagPage" . }}
    <a href="{{ .RelPermalink }}">{{ .Title }}</a>
  {{ end }}
{{ end }}
```

**🙌 ⌨️ C'est parti**

```go-html-template
{{/* 1. */}}
{{ $tag := false }}
{{/* 2. */}}
{{ with index site.Taxonomies.tags (urlize .) }}
  {{/* 3. */}}
  {{ with .Page }}
    {{/* 4. */}
    {{ $tag = . }}
  {{ end }}
{{ end }}

{{/* 5. */}
{{ return $tag }}
```
1. Nous commençons par initialiser notre _variable retournée_ à sa valeur par défaut
2. `site.Taxonomies.tags` retourne une collection de tous les tags du site avec leur objet `.Page`. Le _point_ représente le contexte de notre partiel, ici le nom de notre tag, que nous transformons en URL pour correspondre à sa clef dans `site.Taxonomies.tags`.
3. Nous avons de fortes chances de tomber sur une  `.Page`, mais `with` ajoute une vérification supplémentaire et nous permet en plus de changer de contexte.
4. Nous stockons le tag de la page dans notre _variable retournée_.
5. 🎉

**👍 Beau boulot !**

Et pour les autres taxonomies comme les `categories`? Hors de question de copier/coller tout cela dans un nouveau partiel pour remplacer `site.Taxonomies.tags` par `site.Taxonomies.categories`. 🙅‍♀️

Nous voulons pouvoir écrire ceci :

```go-html-template
{{ range .Params.categories }}
  {{ with partial "func/GetTermPage" (dict "taxonomy" "categories" "term" .) }}
    <a href="{{ .RelPermalink }}">{{ .Title }}</a>
  {{ end }}
{{ end }}
```

## Gestion des arguments

Jusqu'à maintenant nous n'avons passé qu'un seul argument à nos partiels de fonction, où le contexte ne contenait qu'un élément. Mais ici, il nous en faut deux : la taxonomie et son terme. Notre contexte devra donc être un tableau associatif qui contiendra les deux.

Nous mettons donc notre partiel à jour :

```go-html-template
{{ $return := false }}

{{/* 1. */}}
{{ $taxonomy := "tags" }}
{{ with .taxonomy }}
  {{ $taxonomy = . }}
{{ end }}

{{/* 2. */}}
{{ with $term := .term }}
  {{ with index site.Taxonomies $taxonomy }}
    {{ with index . (urlize $term) }}
      {{ with .Page }}
        {{ $return = . }}
      {{ end }}
    {{ end }}
  {{ end }}
{{ end }}

{{/* 3. */}}
{{ return $return }}
```

1. Maintenant que nous passons un argument `term`, nommer notre variable retournée `$term` pourrait prêter à confusion. Appelons la maintenant `$return`  pour bien marquer que c'est **la** _variable retournée_.
2. Si aucun argument `.term` n'est présent, la _variable retournée_ devrait rester vide. Avant d'aller plus loin, nous faisons appel à `with` pour nous assurer que `.term` est bien défini et nous stockons cette valeur initiale afin de pouvoir y accéder quelque que soit notre contexte. Ces quelques lignes sont d'ailleurs une très bonne illustration de changements de contexte !
3. 🎉

## Mise en cache !

OK très bien, mais je veux une fonction qui liste les tags d'une page et qui me renvoie un tableau de tableaux associatifs qui contiennent chacun des données structurées comme `.URL` et `.Name`. De cette façon, si je veux passer de `.RelPermalink` à `.Permalink` dans le futur, je peux le faire dans ma _variable retournée_ plutôt que dans chaque fichier de modèle où je souhaite afficher ces liens.

C'est l'occasion idéale de voir comment appeler un _partiel de fonction_ depuis un _partiel de fonction_ et mettre en cache sa valeur. :sweat_smile:

```go-html-template
#layout/partials/func/GetTags.html
{{/* 1. */}}
{{ $return := slice }}
{{/* 2. */}}
{{ with .Params.tags }}
  {{ range . }}
    {{/* 3. */}}
    {{ with partialCached "func/GetTerm" (dict "taxonomy" "tags" "term" .) "tags" . }}
      {{/* 4. */}}
      {{ $tag := dict "URL" .RelPermalink "Name" .Title }}
      {{/* 5. */}}
      {{ $return := $return | append $tag }}
    {{ end }}
  {{ end }}
{{ end }}

{{/* 6. */}}
{{ return $return }}
```
1. Nous voulons être sûrs de pouvoir parcourir la valeur de notre variable retournée à l'aide de la fonction `range`. Afin de nous assurer de retourner un tableau (`slice`), nous initialisons notre variable avec un tableau vide.
2. La fonction `range` ne bronchera pas avec un tableau vide, mais tout autre type de valeur entraînerait une erreur de génération. Il est donc toujours plus sage de tester à l'aide d'un `with`, sauf si vous êtes vraiment sûrs de retourner un tableau.
3. Nous appelons notre précédent partiel de fonction, mais cette fois nous le mettons en cache. Pour les variantes, nous utilisons les deux valeurs de ses arguments.
4. Nous sauvegardons le tout dans un tableau associatif à des fins de lisibilité. Puisque notre `$tag` est déclaré dans le contexte de notre boucle `range`, il ne pourra pas entrer en conflit avec un autre `$tag` comme par exemple le prochain tag de la liste.
5. Nous utilisons la fonction [`append`](https://gohugo.io/functions/append/#readout) pour ajouter notre tableau associatif `$tag` au tableau que nous retournons.
6. 🎉

Maintenant dans notre modèle nous pouvons écrire :

```go-html-template
# layouts/_default/single.html
{{/* 1. */}}
{{ range partial "func/GetTags" $ }}
  {{/* 2. */}}
  <a href="{{ .URL }}">{{ .Name }}</a>
{{ end }}
```

1. Nous avons que la valeur retournée par notre partiel de fonction maison est à coup sûr un tableau, vide ou non. Nous pouvons donc utiliser `range` sans problème.
2. Nous pouvons maintenant utiliser les clefs personnalisées de nos tableaux associatifs.
3. C'est tout !

## Des améliorations possibles ?

Bien entendu ! Nous pourrions :

- Exclure certains tags du tableau retourné par la fonction `GetTags`
- Transformer `GetTags` en `GetTerms`, afin de pouvoir l'utiliser pour n'importe quelle taxonomie.
- Trouver la bonne variante de notre _partiel de fonction_ `GetTags` et utiliser `partialCached`.
- Développer bien plus de partiels de fonction pour répondre à d'autres besoins !

## Conclusion

Après avoir vu les bases, nous avons pu développer deux partiels de fonction qui nous aideront grandement dans la maintenance de l'affichage des taxonomies de notre site.

Et si nous avons besoin d’afficher seulement certains articles ou bien tous les articles mais en excluant certains tags ? Cela se passera dans la fonction `GetTags` et pas ailleurs !  Et si dans une prochaine version Hugo introduit un moyen plus efficace de gérer les termes d’une taxonomie ? Nous ajusterons notre fonction `GetTerm` !

Avec ses _partiels de fonction_, Hugo répond enfin à la séparation des problématiques de templating et de gestion des données, en permettant la réutilisabilité et le typage de données !

Est-ce que je vous ai déjà dit que c'était une de mes fonctionnalités préférées dont je vais abuser en 2020 ?

Si vous avez un retour d’expérience ou des questions à propos des partiels de fonction, ou que voulez simplement partager les partiels que vous avez développé suite à lecture de cet article, [laissez un commentaire ou un bout de code](https://regisphilibert.com/blog/2019/12/hugo-partial-series-part-2-functions-with-returning-partials/) !
