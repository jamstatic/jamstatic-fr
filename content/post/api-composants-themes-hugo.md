---
title: "Ajoutez une API à votre site grâce aux composants de themes d’Hugo"
date: 2018-07-13T20:54:26+02:00
description: "Les composants de thèmes sont utiles pour implémenter l'export de vos contenus dans des formats alternatifs."
categories:
  - hugo
images:
  - https://res.cloudinary.com/forestry-demo/image/fetch/c_limit,dpr_auto,f_auto,q_80,w_auto/https://forestry.io/uploads/2018/07/leaf-group.jpg
source:
  author: "DJ Walker"
  title: "Add Functionality to Your Hugo Site With Theme Components"
  url: "https://forestry.io/blog/add-functionality-to-your-hugo-site-with-theme-components/"
---
{{% intro %}}

Hugo continue de s'enrichir de fonctionnalités au fil des versions, parmi les dernières notables le support de modules de thèmes ou composants de thèmes. Il est désormais possible de venir enrichir un thème existant en fonctionnalités en ajoutant quelques fichiers de mise en forme. On peut par exemple ajouter des modèles pour afficher des vues au format JSON, voire même fournir un fichier YAML de configuration pour pouvoir personnaliser les champs à afficher. C'est ce que nous montre ici DJ Walker de chez Forestry.io, l'occasion de réviser au passage les fonctions de bases offertes par le langage de templating de Go.

{{% /intro %}}

Les composants de thème sont apparus dans la version 0.41 d'Hugo.
Quand Hugo cherche certains fichiers (comme des données ou des
fichiers de mise en page), il regarde d'abord à la racine de votre projet, puis
dans le sous-répertoire `themes/` qui correspond à ce que vous avez spécifié
dans le fichier `config.toml`. Jusqu'ici on ne pouvait préciser qu'un seul thème
dans le fichier de configuration. Le principe reste le même qu'auparavant, sauf
que maintenant Hugo va passer en revue tous les thèmes présents dans le tableau en
le parcourant de gauche à droite.

Les composants de thèmes sont top pour implémenter des formats d'exports
alternatifs des contenus de votre site. Nous avons déjà montré
[comment ajouter une API JSON à votre site Hugo](https://forestry.io/blog/build-a-json-api-with-hugo/) — dans le présent article
nous allons ré-implémenter cette fonctionnalité sous forme de composant de
thème. [Le composant obtenu](https://github.com/dwalkr/hugo-json-api-component)
pourra ainsi être installé sur n'importe quel site Hugo pour fournir un export
JSON de tous les contenus, sans que vous n'ayez besoin d'écrire vos propres
fichiers de mise en forme. Grâce aux composants de thème, vous pouvez
l'installer aux côtés d'un thème existant et profiter des deux !

## Préparer le composant d'API

Notre objectif est de créer un composant autonome qui permette à quiconque
d'ajouter une API JSON à son site.

Puisque nous voulons que ce composant marche par défaut pour tout un tas de cas
de figure, l'utilisateur devrait pouvoir définir la forme des données qu'il
veut exposer au format JSON. Permettre à l'utilisateur de définir son propre
schéma demandera un peu plus de travail en amont, mais il n'aura pas besoin de
surcharger ou de ré-implémenter le code de notre gabarit de page.

Pour rendre le code de notre gabarit plus simple et moins sujet aux erreurs,
nous allons [utiliser la fonction `.Scratch` d'Hugo]({{< relref
"scratch-hugo.md" >}}) pour construire l'objet de données que nous voulons en
sortie, puis nous l'exporterons à l'aide de la fonction `jsonify`.  Nous avons
brièvement touché un mot de cette approche [la dernière fois que nous avons évoqué l'export JSON avec Hugo](https://forestry.io/blog/hugo-json-api-part-2#addendum-creating-json-output-with-jsonify).

## Implémenter le composant

Puisque nous voulons en faire un composant de thème, nous allons placer
l'intégralité de notre code dans le dossier `themes/json-api` de notre projet.
Notre composant n'aura besoin que de quelques fichiers :

```txt
data/
  json_schema.yml
layouts/
  _default/
    list.json.json
    single.json.json
  partials/
    schema_item.tmpl
theme.toml
```

Le fichier `json_schema.yml` permettra aux utilisateurs de définir leur propre
schéma. Nous y reviendrons. Les fichiers présents dans le dossier `layouts`
feront le gros du travail pour rendre les contenus au format JSON.

### L'export au format JSON

JSON est un des [formats natifs de sortie d'Hugo](https://gohugo.io/templates/output-formats/#output-format-definitions).

Comme notre composant de thème va utiliser le comportement par défaut d'Hugo en ce qui concerne le JSON, nous n'avons pas besoin de configuration additionnelle. La version JSON d'une page ou d'une section sera accessible en ajoutant `index.json` à la fin de son URL.

### Schéma configurable

Notre composant de thème définit un schéma par défaut dans le fichier de données `json_schema.yml`, les utilisateurs peuvent définir leur propre schéma en ajoutant un fichier similaire dans leur dossier `data` générique. Notre composant va se baser sur le schéma défini dans ce fichier et générer le JSON approprié.

Notre schéma par défaut ressemble à ça :

```yaml
default:
  list:
    fields:
    - key: title
      field: title
    - key: date
      field: date
  single:
    fields:
    - key: title
      field: title
    - key: date
      field: date
    - key: content
      field: $PAGECONTENT
```

La clef de premier niveau représente la section à laquelle s'applique le schéma, celles de second niveau précise la configuration pour les différentes vues: liste et unitaire. Il y a un champ spécial appelé `$PAGECONTENT`, sur lequel nous reviendrons.

{{% notice tip %}}
Hugo procède à la **fusion** des fichiers de données qui portent le même nom quand il traite les composants de thème. Cela signifie que si un utilisateur de notre composant de thème ajoute un fichier `json_schema.yml` dans son projet, il n'aura pas forcément besoin de redéfinir le schéma par défaut : celui-ci sera toujours accessible dans le fichier `json_schema.yml` du thème !
{{% /notice %}}

### Rendu JSON avec jsonify

Si vous avez lu [notre article sur la création d'une API JSON avec Hugo](https://forestry.io/blog/build-a-json-api-with-hugo/#/output-formats), vous savez qu'il nous faut créer deux fichiers de mises en forme: `list.json.json` et `single.json.json`. Ces deux fichiers exporteront du JSON, le premier pour les vues de liste d'un type de contenu et le second pour les vues d'un seul élément.

Comme annoncé, nous allons utiliser [la fonction `.Scratch` d'Hugo](https://gohugo.io/functions/scratch/) pour façonner une structure de données, plutôt que d'avoir à l'écrire avec la syntaxe JSON. Contrairement à Jekyll, Hugo ne nous permet pas de créer de nouvelles variables dans vos modèles. À la place, Hugo vous propose d'utiliser `.Scratch` pour stocker des paires clef-valeur et créer des objets de données.

Pour avoir un aperçu de l'utilisation de `.Scratch`,  commençons par écrire le fichier `list.json.json`:

```go-html-template
{{- .Scratch.Set "items" slice -}}
{{- range .Pages -}}
    <!--
    ...
    Charger les données de la page dans "item"
    ...
    -->
    {{- $.Scratch.Add "items" ($.Scratch.Get "item") -}}
    {{- $.Scratch.Delete "item" -}}
{{- end -}}
{{- .Scratch.Get "items" | jsonify -}}
```

À l'aide de `.Scratch.Set` et de `.Scratch.Get`, nous pouvons définir et récupérer les valeurs de l'objet `Scratch`. `.Scratch.Add` ajoute une valeur à un tableau (slice). Ici, nous bouclons sur les pages de notre liste et nous ajoutons les données de la page dans une valeur de `Scratch` nommée `item`, puis nous ajoutons cette valeur au tableau (slice) `items`. Cet objet est ensuite formaté  en JSON.

On arrive maintenant à la partie délicate : parser le schéma du fichier `json_schema.yml` et insérer le contenu approprié dans notre structure de données. Puisque nous allons devoir le faire pour les deux vues `list` et `single`, il serait bon d'encapsuler cette partie dans un fichier partiel. Hugo nous demande de passer explicitement toutes les données auxquelles nous voulons accéder dans le deuxième paramètre de la fonction `partial`, nous allons donc utiliser la fonction `dict` pour créer un objet à la volée qui contiendra toutes les valeurs que nous prévoyons d'utiliser.

{{% notice tip %}}
Si vous avez besoin d'aide, nous avons déjà discuté de [l'utilisation de `dict` pour passer davantage de contexte aux partiels](https://forestry.io/blog/3-tips-for-mastering-blocks/#pass-page-context-to-your-hugo-block-layouts).
{{% /notice %}}

```go-html-template
{{- partial "schema_item.tmpl" (dict "currentPage" . "Root" $ "SchemaType" "list") -}}
```

La page courante est passée dans notre boucle en tant que `currentPage`, le contexte racine est passé en tant que `Root` et nous passons aussi un autre paramètre `SchemaType`. Puisque nous allons utiliser le même partiel pour les deux vues, il faut que nous disions au fichier partiel `schema_item.tmpl` si nous nous trouvons dans un contexte de list ou de vue unitaire, c'est pour cela que nous avons créé la variable `SchemaType` et nous lui passons ici la valeur `list`.

Avec un code structuré de la sorte, le fichier `schema_item.tmpl` est supposé stocker les données de notre page dans une valeur `.Scratch` dont la clé est `item`.

La première chose à faire est de localiser une configuration de schéma compatible. Nous allons d'abord regarder si un schéma est défini pour la section de contenu courante, si ce n'est pas le cas nous utiliserons celle par défaut. Par exemple, lorsque nous effectuons le rendu de la vue liste des posts, nous regardons s'il existe une entrée `post.list` dans notre fichier de configuration de schéma, et si ce n'est pas le cas nous utiliserons `default.list`.

```go-html-template
{{- if and (isset $.Root.Site.Data.json_schema .currentPage.Section) (isset (index $.Root.Site.Data.json_schema .currentPage.Section) .SchemaType) -}}
    {{- $.Root.Scratch.Set "schema" (index (index $.Root.Site.Data.json_schema .currentPage.Section) .SchemaType) -}}
{{- else -}}
    {{- $.Root.Scratch.Set "schema" (index $.Root.Site.Data.json_schema.default .SchemaType) -}}
{{- end -}}```

Nous faisons de nouveau appel à `.Scratch` pour stocker temporairement la configuration de schéma que nous allons utiliser. Il sera plus simple d’y faire référence dans le code ultérieurement.

Nous allons ensuite définir la valeur `uri` de notre item de donnée. Selon moi cette valeur devrait toujours être définir dans le JSON d’un item. Cela sert non seulement à identifier l’URL unique d’un item dans une liste mais aussi d’identifiant unique pour l’item. Nous pouvons utiliser `.Scratch.SetInMap` pour ajouter la clef `uri` à notre objet `item`.

```go-html-template
{{- $.Root.Scratch.SetInMap "item" "uri" ($.currentPage.OutputFormats.Get "json").Permalink -}}
```

`(.OutputFormats.Get` `"``json``"``).Permalink` retourne l'URL de l'item exporté au format JSON.

Maintenant que c'est fait, il ne nous reste plus qu'à boucler sur les champs définis dans notre schéma et ajouter chacun d'eux à notre objet `.Scratch`. À présent il nous faut vérifier si notre schéma comporte des champs spéciaux comme `$PAGECONTENT`. Le champ `$PAGECONTENT` désigne le contenu HTML de la page. On peut accéder au reste des valeurs via `.Params`.

```go-html-template
{{- range ($.Root.Scratch.Get "schema").fields -}}
    {{- if eq .field "$PAGECONTENT" -}}
    {{- $.Root.Scratch.SetInMap "item" (default "content" .key) (index $.currentPage.Content) -}}
    {{- else -}}
        {{- $.Root.Scratch.SetInMap "item" (default .field .key) (index $.currentPage.Params .field) -}}
    {{- end -}}
{{- end -}}
```

{{% notice %}}
En utilisant la fonction `default` function, nous rendons la paramètre `key` optionel lorsque nous définissons un schéma. Par défaut ce sera le nom du champ front matter.
{{% /notice %}}

C'est tout ce que nous avons à faire pour notre fichier partiel `schema_item.tmpl` ! Laisser les utilisateurs définir leur propre schéma aurait pu d'emblée sembler comme une charge de travail supplémentaire, mais cela donne beaucoup plus de flexibilité à notre composant de thème.

Et le truc cool c'est que puisque la quasi-totalité du travail est effectuée dans notre fichier partiel `schema_item.tmpl`, le code de notre fichier de mise en forme `single.json.json` ne fait que deux lignes !

```go-html-template
{{- partial "schema_item.tmpl" (dict "currentPage" . "Root" $ "SchemaType" "single") -}}
{{- .Scratch.Get "item" | jsonify -}}
```

Nous avons juste besoin d'appeler le fichier partiel `schema_item.tmpl` et lui dire que nous voulons utiliser le schéma pour la vue unitaire, puis nous affichons les résultats (stocké une fois de plus dans un objet `Scratch` en tant qu'`item`) à l'aide de la fonction `jsonify`. C'est beau tant de simplicité, non ?

## Installer le composant de thème JSON sur un site existant

Afin de tirer parti de ce composant sur un site existant, il nous suffit de suivre la marche suivante:

1. Ajouter notre composant de thème dans le dossier `/themes/` en tant que submodule Git

2. Mettre à jour le paramètre `theme` dans notre fichier de configuration `config.toml` (ou .yml) pour lui dire d'utiliser notre composant de thème
Add our theme component to `themes/` as a submodules

3. Configurer l'export JSON pour les pages et les sections

Pour vous montrer comment faire, j'ai créé un site de démo qui utilise [le thème Paper](https://github.com/nanxiaobei/hugo-paper). Un site avec quelques articles de blog et trois pages à propos de différentes voitures. [La démo tourne chez Netlify](https://hardcore-knuth-fc0978.netlify.com/).

### Configurer le composant de thème JSON

Vous pouvez installer le composant de thème à l'aide de la commande suivante :

```sh
git submodule add https://github.com/dwalkr/hugo-json-api-component themes/json-api
```

Puis, ouvrez votre fichier de configuration `config.toml` et modifier les lignes suivantes :

```toml
theme = "paper"
```

pour obtenir :

```toml
theme = ["paper","json-api"]
```

Enfin, pour activer l'export au format JSON pour nos vues liste et nos vues unitaires, il nous faut le spécifier dans la section `outputs` de notre fichier de configuration :

```toml
[outputs]
    page = ["html","json"]
    section = ["html","json"]
```

Une fois que c'est fait, redémarrez votre serveur Hugo avec `hugo server` et vous devriez pouvoir avoir accès aux données au format JSON en ajoutant `/index.json` à la fin des URLs de pages et de sections.

### Personnaliser le schéma

Le schéma par défaut marche très bien pour le type de contenu `posts` mais les voitures que nous avons ajoutées dans la section `garage` possèdent des champs front matter additionnels, que nous voulons afficher aussi au format JSON. Puisque nous pouvons personnaliser le schéma de configuration JSON pour chaque section, c'est un jeu d'enfant. Il suffit d'ajouter un fichier `data/json_schema.yml` et de le configurer de la sorte :

```yaml
garage:
  list:
    fields:
      - field: year
      - field: make
      - field: model
  single:
    fields:
      - field: title
        key: name
      - field: year
      - field: make
      - field: model
      - field: engine
      - field: $PAGECONTENT
        key: description
```

Rappelez-vous qu'Hugo fusionne les fichiers de données, donc même si nous surchargeons ce fichier de notre composant de thème, `default`, la configuration par défaut, sera toujours prise en compte par Hugo.

[Voilà ce que ça donne pour la vue en liste](https://hardcore-knuth-fc0978.netlify.com/garage/index.json) de notre exemple, si vous voulez voir notre nouveau schéma en action.

## La pointe de l'iceberg

Même si les composants de thème ne sont pas à proprement parler des "plugins", ils offrent une nouvelle manière d'ajouter des fonctionnalités empaquetées à un site Hugo. Il me tarde de voir les thèmes tirer parti des avantages de cette nouvelle fonctionnalité et de voir ce que donnera cette façon plus modulaire de développer des sites avec Hugo. Si vous avez des idées d'utilisation des composants de thème, venez en parler avec nous sur notre Slack !
