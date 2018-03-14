---
title: "Hugo, le point sur le contexte"
date: 2018-02-08T17:27:39+01:00
description: "Exemples de gestion du contexte et signification du point dans les templates Hugo."
categories:
  - hugo
images:
  - https://regisphilibert.com/blog/2018/02/hugo-the-scope-the-context-and-the-dot/images/featured.png
source:
  author: Régis Philibert
  title: Hugo, the scope, the context and the dot
  url: https://regisphilibert.com/blog/2018/02/hugo-the-scope-the-context-and-the-dot/
---

{{% intro %}}
Le [contexte](https://gohugo.io/templates/introduction/#context-aka-the-dot), c'est un concept assez perturbant quand on commence à vouloir développer des modèles de page pour Hugo. Il est facile de s'emmêler les pinceaux pour accéder à ses [variables](https://golang.org/pkg/text/template/#hdr-Variables). Au travers de quelques exemples très simples, [Régis Philibert](https://regisphilibert.com/tags/hugo/) se propose de nous aider à y voir plus clair.
{{% /intro %}}

**Mais pourquoi ma variable n'est pas accessible ici et ici ?** 🙄

Quand est un habitué des bons vieux langages de templates où le périmètre fonctionnel est rarement un problème, bien comprendre les contraintes de périmètre en [Go Template](https://golang.org/pkg/html/template/) n'est pas toujours aisé.

Dans cet article, nous essaierons de comprendre l'impact du périmètre et du contexte à l'intérieur de nos gabarits et de nos fichiers partiels, et comment jongler avec le point 🤹.\

## Le contexte et le point

J'utilise ici le mot _périmètre_ dans le titre, car c'est la première chose qui vient à l'esprit quand on fait face à cette problématique et j'imagine que c'est le terme que les gens vont utiliser pour rechercher de l'aide. Mais en définitive c'est plutôt du _contexte_ dont nous allons parler ici.

Le périmètre c'est ce qui est disponible dans une situation donnée dans votre code. À l'intérieur d'une classe ou d'une fonction par exemple.

Mais dans les gabarits d'Hugo, la plupart du temps, vous n'avez accès qu'à un seul objet : le **contexte**. Et il est stocké dans un point.

Oui, ce point là. `{{.}}`

Et vous finissez donc par utiliser les propriétés de cet objet comme ça : \
`.Title`, `.Permalink`, `.IsHome`

## Le point de la page

Le contexte d'origine, celui disponible dans votre fichier de gabarit racine `baseof.html` et dans les autres fichiers de gabarits sera toujours le contexte de la page. En fait, tout ce que vous avez besoin d'afficher dans cette page est contenu dans ce point.\
`.Title`, `.Permalink`, `.Resources` et tout ce qui vous chante.

Même les informations de votre site sont stockées dans le contexte de page à l'aide de `.Site` qui est prêt à l'emploi.

Mais en _Go Template_ dès que vous utilisez une fonction, vous perdez ce contexte, et votre précieux point, votre contexte est remplacé par celui de la fonction, qui a son propre… point.

Si par exemple dans mon gabarit de page j'ai :

### With

```go
{{ with .Title }}
    {{/* Maintenant le point c'est .Title */}}
    <h1>{{ . }}</h1>
{{ end }}
```

A l'intérieur de ce `with` vous n'êtes plus dans le contexte de page. Le contexte, le point, c'est maintenant le titre de votre page. Ici, c'est exactement ce que nous voulons !

### Range

Même chose ici, une fois que vous avez commencé à itérer avec `range`, le contexte est l'élément actuellement parcouru. Vous perdez le contexte de page au profit du contexte de la fonction `range`.


```go
{{ range .Data.Pages }}
    {{/* Ici le point est celui de la page 'en cours'. */}}
    {{ .Permalink }}
{{ end }}
```

```go
{{ range .Resources.Match "gallery/*" }}
    {{/* Ici le point designe une des images. */}}
    {{ .Permalink }}
// {{ end }}
```

```go
{{ range (slice "Hello" "Bonjour" "Gutten Tag") }}
    {{/* Ici le point désigne cette chaîne de caractères. */}}
    {{ . }}
{{ end }}
```

### Le contexte du plus haut niveau de la page 💲

Heureusement pour nous, Hugo stocke le contexte de page dans un `$` donc cela ne fait rien si vous vous trouvez au fin fond d'un `width` ou d'un `range`, vous pouvez toujours récupérer le contexte du plus haut niveau de la page.

#### Un niveau d'imbrication

```go
{{ with .Title }}
    {{/* Le point désigne .Title */}}
    <h1>{{ . }}</h1>
    {{/* $ désigne le plus haut niveau de la page */}}
    <h3>From {{ $.Title }}</h3>
{{ end }}
```

#### Trois niveaux d'imbrication

```go
{{/* 1. Le point désigne le plus haut niveau de la page (de liste) */}}
<h1>{{ .Title }}</h1>
{{ range .Data.Pages }}
    <article>
        {{/* 2. Le point désigne la page en cours */}}
        <h3>{{ .Title }}</h3>
        <hr>
        {{ range .Resources.Match "images/.*" }}
            <figure>
                {{/* 3. Le point désigne une de ces ressources */}}
                <img src="{{ .Permalink }}">
                {{/* $ désigne le contexte de haut niveau de la page */}}
                <caption>{{ .Title }} de l’article {{ $.Title }}</caption>
            </figure>
        {{ end }}
    </article>
{{ end }}
```

## Les fichiers partiels

Par défaut, les fichiers partiels ne passent aucun contexte.\
Mais il suffit d'un seul paramètre pour y remédier. Cet objet sera alors disponible à l'intérieur du fichier partiel et sera référencé à l'aide, vous l'aviez deviné, du point.

Donc pour des fichiers partiels simples, vous n'aurez besoin que du contexte de page. Le **point** de votre page.

```go
    {{ partial "page/head" . }}
```

Ici la fonction `partial` a pour paramètre votre contexte, à priori celui de votre page si vous n'êtes pas dans une boucle `range` ou dans une condition `with` ou bien dans un autre fichier partiel.

```go
    <h1>
        {{ .Title }}
    </h1>
    <h3><time datetime="{{ .Date }}">{{ dateFormat "Écrit le 2 January 2006" .Date }}</time></h3>
```

Maintenant, imaginons que vous écriviez un fichier partiel pour le rendu de votre image fantaisiste encadrée, vous n'avez besoin que de son chemin, qui devient donc votre contexte.

```go
{{ partial "img" $path }}
```

Dans le fichier `partials/img.html`, on aura donc :

```go
<figure class="Figure Figure--framed">
    <img src="{{ . }}" alt="">
</figure>
```

Le point ici c'est la valeur de `$path`.

C'est un exemple tout simple. La plus part du temps, vous aurez besoin de beaucoup plus de valeurs.

Pas de souci, nous pouvons utiliser la fonction `dict` pour passer un ensemble d'éléments en paramètre (entier, chaine de caractère, objet)

`dict` va créer une *map*, souvent désignée également comme un tableau associatif.\
Reportez-vous à la [documentation de cette fonction](https://gohugo.io/functions/dict) ou à mon propre article [sur le sujet](https://regisphilibert.com/blog/2017/04/hugo-go-template-translator-explained-understanding/#associative-arrays).

```go
{{ partial "img" dict("path" $path "alt" "Nice blue sky") }}
```

Le point va contenir cet objet à l'intérieur du fichier partiel, donc nous pouvons préfixer nos clefs avec `.`

```go
<figure class="Figure Figure--framed">
    <img src="{{ .path }}" alt="{{ .alt }}">
</figure>
```

Vous pouvez mettre une lettre majuscule à vos clefs pour qu'elles fassent plus "Hugo" mais j'aime bien mettre tout en minuscules. De cette manière dans un fichier partiel j'identifie immédiatement les clefs issues d'un contexte personnalisé de celles issues de celui de la page.

### Accéder au plus haut niveau $ depuis un fichier partiel

Contrairement à `range` et `with` le contexte de page n'est pas disponible dans `$`.

Pas de problème, nous allons ajouter le contexte de la page à notre `dict`.

Vous pouvez appeler cette clef importante comme vous voulez, beaucoup de gens utilisent "Page" pour pouvoir écrire `Page.Title`. Comme ça vous chante, du moment que vous êtes consistent dans votre nomenclature.

```go
{{ partial "img" dict("Page" . "path" $path "alt" "Nice blue sky") }}
```

```html
<figure class="Figure Figure--framed">
    <img src="{{ .path }}" alt="{{ .alt }} from {{ .Page.Title }}">
</figure>
```

## Conclusion

Ce point peut vite devenir votre meilleur ami et s'avère bien pratique une fois qu'on a appris à jongler avec. Il permet d'écrire du code très lisible même si parfois on ne sait plus très bien à quel niveau on se situe.

Il y a d'autres fonctions qui prennent le contexte, regardez notamment du côté de `block` et `template`.

Bonne mise au point !
