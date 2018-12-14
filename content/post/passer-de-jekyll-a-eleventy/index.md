---
title: Passer de Jekyll à Eleventy
description: >-
  Paul Lloyd ne tarit pas d'éloges sur les vertus du générateur de site statique
  Eleventy. Longtemps utilisateur du très populaire Jekyll écrit en Ruby,
  il a décidé de passer à la vitesse supérieure avec Eleventy, écrit en JS.
date: 2018-12-12
images:
- /2018/12/12/passer-de-jekyll-a-eleventy/twitter-card-fr.png
source:
  author: Paul Robert Lloyd
  title: Turn Jekyll up to Eleventy
  url: https://24ways.org/2018/turn-jekyll-up-to-eleventy/
categories:
- jekyll
- eleventy
---

{{% intro %}}

[Jekyll](/categories/jekyll) est à ce jour le générateur de site statique le plus utilisé, c'est aussi un des plus anciens, et il fait face aujourd'hui à beaucoup de concurrents. Un des projets récents qui se rapproche le plus de Jekyll est [Eleventy](/categories/eleventy), développé par le très sympathique [Zach Leat](https://twitter.com/zachleat). Eleventy, c'est Jekyll repensé pour tirer parti de JavaScript et de l'écosystème npm. C'est un outil qui reste très simple d'approche et qui supporte Liquid comme langage de gabarit.

Autant d'arguments qui ont vite fait de convaincre [Paul Robert Lloyd](https://paulrobertlloyd.com/) de tenter de migrer son site vers Eleventy. Qui sait, la lecture de cet article vous incitera peut-être à faire de même ?

{{% /intro %}}

Ne pas compliquer les choses s'avère parfois payant. Bien que beaucoup de sites
que nous utilisons tous les jours aient besoin de bases de données
relationnelles pour gérer leurs contenus, et de pages dynamiques pour répondre
aux contributions de leurs utilisateurs, beaucoup de sites plus simples
peuvent se contenter de servir du HTML pré-compilé, c'est généralement une solution beaucoup moins onéreuse et bien plus sécurisée.

La [JAMstack](https://www.jamstack.org) (JavaScript, APIs réutilisables et
Markup préparé à l'avance) est un terme marketing populaire qui désigne cette
nouvelle manière d'architecturer des sites web, et en un sens c'est un retour
aux débuts du web, avant que les développeurs ne commencent à bricoler avec des scripts CGI ou PHP. En réalité mon site web a toujours servi du HTML pré-compilé : d'abord à l'aide de [Movable Type](https://movabletype.org), et puis récemment avec celle de [Jekyll](https://jekyllrb.com), à propos duquel [Anna écrivait en 2013](https://24ways.org/2013/get-started-with-github-pages/).

En combinant trois langages faciles d'approche — Markdown pour le contenu, YAML pour les données et Liquid pour les modèles de page — Jekyll a rencontré un large public et a influencé le design de [beaucoup de générateurs de sites statiques](https://www.staticgen.com) qui ont suivi. Jekyll n'en est pas parfait pour autant. Outres des temps de compilation qui peuvent être importants, il est développé en Ruby. Bien que Ruby soit un langage de programmation très élégant, c'est un nouvel écosystème à appréhender et à savoir gérer, en plus ce celui que l'on utilise déjà côté front : JavaScript. Quand j'utilisais Jekyll, je me disais souvent "La même chose, mais en Node". Heureusement pour moi, un des elfes de Noël a exaucé mon vœu [Atwoodien](https://blog.codinghorror.com/the-principle-of-least-power/) et a déposé un tel générateur de site statique au pied de mon sapin.

## Présentation d'Eleventy

[Eleventy](https://www.11ty.io) est une alternative beaucoup plus flexible que Jekyll. Outre le fait qu'il soit écrit en Node, il est beaucoup moins strict quant à la manière d'organiser ses fichiers, et supporte d'autres langages de gabarits comme EJS, Pug, Handlebars et Nunjucks, en plus de Liquid. Le top c'est que les temps de compilations sont _bien_ meilleurs (et les [optimisations futures](https://github.com/11ty/eleventy/issues/56) promettent des gains supplémentaires).

Vu que le contenu est stocké avec la même combinaison familière de front matter YAML et de Markdown, passer de Jekyll à Eleventy semble plutôt raisonnable au premier abord. Et pourtant, j'ai découvert à mes dépens qu'il y avait quelques pièges. Si vous envisagez une migration, voici quelques petits trucs et astuces pour vous aider dans votre parcours[^1].

{{% notice info %}}

Tout au long de cet article, nous allons prendre comme exemple le site du [Guide Markdown](https://www.markdownguide.org) de Matt Cone. Si vous voulez tester les modifications, commencez par cloner le [dépôt git](https://github.com/mattcone/markdown-guide) et placez-vous dans le dossier du projet :

```sh
git clone https://github.com/mattcone/markdown-guide.git
cd markdown-guide
```

{{%/ notice %}}

## Avant de commencer

Si vous avez déjà utilisé des outils comme Grunt, Gulp ou webpack, vous connaissez déjà un peu l'écosystème de Node.js, mais si vous avez uniquement utilisé Jekyll pour compiler vos CSS et générer votre HTML, il est maintenant temps pour vous d'[installer Node.js](https://nodejs.org) et de configurer votre projet afin de pouvoir utiliser son gestionnaire de paquet, npm :

1.  **Installer Node.js :**

    -   Mac : Si ce n'est pas déjà fait, je vous conseille d'[installer Homebrew](https://brew.sh), a gestionnaire de paquets pour Mac. Ensuite dans un terminal tapez `brew install node`.
    -   Windows : [Téléchargez l'installateur pour Windows](https://nodejs.org/en/download/) depuis le site web de Node.js et suivez les instructions.

2.  **Initialiser NPM :** Assurez-vous d'être dans le répertoire du projet et tapez `npm init`. Cette commande va vous poser quelques questions avant de créer un fichier appelé `package.json`. Comme le `Gemfile` de RubyGems, il contient la liste des dépendances tierces de votre projet.

Si vous gérez les versions de votre site avec Git, assurez-vous également d'ajouter le répertoire `node_modules` à votre fichier `.gitignore`. Contrairement à RubyGems, npm stocke par défaut ses dépendances dans le répertoire de votre projet. Ce répertoire peut vite devenir assez important, et comme il contient des fichiers binaires compilés spécifiquement pour votre ordinateur, il ne devrait pas être versionné. Eleventy prend ce fichier en compte, ce qui veut dire que tout ce que vous voulez que Git ignore, Eleventy l'ignorera aussi.

## Installer Eleventy

Maintenant que Node.js est installé et que votre projet est prêt à utiliser npm, nous pouvons installer Eleventy en tant que dépendance :

```sh
npm install --save-dev @11ty/eleventy
```

Si vous ouvrez votre `package.json` vous devriez y voir figurer les lignes suivantes :

```sh
…
"devDependencies": {
  "@11ty/eleventy": "^0.6.0"
}
…
```

Nous pouvons maintenant lancer Eleventy en ligne de commande à l'aide de l'utilitaire `npx` de NPM. Par exemple pour convertir le fichier `README.md` en HTML, nous taperons la commande suivante :

```sh
npx eleventy --input=README.md --formats=md
```

Cette commande va générer un fichier HTML dans `_site/README/index.html`.
Eleventy utilise par défaut le même répertoire de destination que Jekyll (`_site`), comme nous le verrons à de nombreuses reprises pendant cette transition.

## La configuration

Alors que Jekyll utilise la syntaxe YAML pour son fichier de configuration, Eleventy lui se repose sur JavaScript. Cela permet de programmer des options et ouvre donc des possibilités assez puissantes comme nous le verrons par la suite.

Commençons par créer notre fichier de configuration (`.eleventy.js`), et reportons les paramètres pertinents du `_config.yml` dans leurs options équivalentes :

```js
module.exports = function(eleventyConfig) {
  return {
    dir: {
      input: "./",      // Équivalent au paramètre source de Jekyll
      output: "./_site" // Équivalent au paramètre destination de Jekyll
    }
  };
};
```

Quelques choses bonnes à savoir :

-   Alors que Jekyll vous permet de lister les fichiers et dossiers à exclure de la génération avec le paramètre `exclude`, [Eleventy recherche ses mêmes valeurs](https://www.11ty.io/docs/ignores/) dans un fichier nommé  `.eleventyignore` (en plus du `.gitignore`).

-   Par défaut, Eleventy utilise [markdown-it](https://github.com/markdown-it/markdown-it) pour parcourir le Markdown. Si vous utilisez des fonctionnalités avancées (comme les abréviations, les listes de définition et les notes de bas de page), vous devrez [déclarer votre propre instance de cette bibliothèque Markdown (ou d'une autre) à Eleventy ](https://www.11ty.io/docs/languages/markdown/)et la configurer avec les options et les plugins de votre choix.

## Les gabarits de mise en forme

Eleventy manque encore de flexibilité quant à la localisation des `layouts`, qui doivent pour le moment se trouver dans le répertoire `_includes` ([Surveiller la résolution du problème sur GitHub](https://github.com/11ty/eleventy/issues/137)).

Nous allons donc devoir déplacer nos fichiers du répertoire `_layouts` vers `_includes\layouts`, puis mettre à jour les références pour y incorporer le sous-dossier `layouts`. Nous pourrions mettre à jour la propriété `layout:` dans le front matter de chacun de nos fichiers de contenu, mais nous allons opter pour la [création d'alias](https://www.11ty.io/docs/layouts/#layout-aliasing) dans la configuration d'Eleventy :

```js
module.exports = function(eleventyConfig) {
    // les alias sont relatifs au répertoire _includes
    eleventyConfig.addLayoutAlias('about', 'layouts/about.html');
    eleventyConfig.addLayoutAlias('book', 'layouts/book.html');
    eleventyConfig.addLayoutAlias('default', 'layouts/default.html');

    return {
      dir: {
        input: "./",
        output: "./_site"
      }
    };
  }
```

### Déterminer le langage à utiliser pour les gabarits

Par défaut Eleventy va transformer les fichiers Markdown (`.md`) avec Liquid, mais nous avons aussi besoin de dire à Eleventy comment procéder au traitement des autres fichiers qui utilisent des gabarits Liquid. Il existe pour cela [plusieurs manières de faire](https://www.11ty.io/docs/languages/#overriding-the-template-language), la plus simple étant de modifier les extensions des fichiers. Ici, quelques fichiers se trouvent dans notre dossier `api` que nous voulons traiter avec Liquid et exporter au format JSON. Pour cela nous ajoutons le suffixe `.liquid` à notre fichier (en conséquence `basic-syntax.json` devient `basic-syntax.json.liquid`), Eleventy saura alors quoi faire.

## Les variables

De l'extérieur, Jekyll et Eleventy se ressemblent pas mal, mais chaque outil modélise son contenu et ses données d'une manière légèrement différente, il va donc nous falloir mettre à jour quelques variables dans nos modèles.

### Les variables de site

En plus des directives de compilation, Jekyll vous permet de stocker des variables globales dans son fichier de configuration et d'y accéder dans les modèles via l'espace de nom `site.*`. Par exemple dans notre Guide Markdown nous avons les valeurs suivantes :

```yaml
title: "Markdown Guide"
url: https://www.markdownguide.org
baseurl: ""
repo: http://github.com/mattcone/markdown-guide
comments: false
author:
  name: "Matt Cone"
og_locale: "en_US"
```

Le fichier de configuration d'Eleventy utilise JavaScript et n'est pas fait pour stocker de telles valeurs. Toutefois comme avec Jekyll, nous pouvons utiliser [des fichiers de données pour stocker des variables globales](https://www.11ty.io/docs/data-global/). Si nous ajoutons nos données relatives au site dans un fichier JSON situé dans le dossier `_data` et que nous le nommons `site.json`, nous pouvons continuer à utiliser l'espace de nom `site.*` et laisser nos variables telles quelles.

```json
{
    "title": "Markdown Guide",
    "url": "https://www.markdownguide.org",
    "baseurl": "",
    "repo": "http://github.com/mattcone/markdown-guide",
    "comments": false,
    "author": {
      "name": "Matt Cone"
    },
    "og_locale": "en_US"
  }
```

### Les variables de page

Le tableau ci-dessous établit la correspondance entre les variables de page.
Retenez qu'on peut accéder directement aux propriétés front matter, alors que les valeurs des méta-données dérivées (comme les URLs, les dates, etc.) sont préfixées avec l'espace de nom `pages.*` :

| Jekyll         | Eleventy          |
| :------------- | :---------------- |
| `page.url`     | `page.url`        |
| `page.date`    | `page.date`       |
| `page.path`    | `page.inputPath`  |
| `page.id`      | `page.outputPath` |
| `page.name`    | `page.fileSlug`   |
| `page.content` | `content`         |
| `page.title`   | `title`           |
| `page.foobar`  | `foobar`          |

Lorsque d'une itération sur des pages, les valeurs front matter sont accessibles via l'objet `data` et le contenu via `templateContent` :

| Jekyll         | Eleventy               |
| :------------- | :--------------------- |
| `item.url`     | `item.url`             |
| `item.date`    | `item.date`            |
| `item.path`    | `item.inputPath`       |
| `item.id`      | `item.outputPath`      |
| `item.name`    | `item.fileSlug`        |
| `item.content` | `item.templateContent` |
| `item.title`   | `item.data.title`      |
| `item.foobar`  | `item.data.foobar`     |

Espérons que ces différences entre les pages et les variables d'item disparaissent dans une future version ([suivre le problème sur GitHub](https://github.com/11ty/eleventy/issues/338)), afin de faciliter la compréhension de la manière dont Eleventy structure ses données.

### Les variables de pagination

Alors qu'avec Jekyll, la pagination est limitée à lister des articles sur une page, Eleventy vous permet de [paginer n'importe quelles données ou documents de collections](https://www.11ty.io/docs/pagination/). Vu cette disparité, les changements sont plus importants, mais ce tableau liste la correspondance des variables équivalentes :

| Jekyll                          | Eleventy                      |
| :------------------------------ | :---------------------------- |
| `pagination.page`               | `pagination.pageNumber`       |
| `pagination.per_page`           | `pagination.size`             |
| `pagination.posts`              | `pagination.items`            |
| `pagination.previous_page_path` | `pagination.previousPageHref` |
| `pagination.previous_page_path` | `pagination.nextPageHref`     |

## Les filtres

Jekyll propose [quelques filtres supplémentaires](https://jekyllrb.com/docs/liquid/filters/), en plus de ceux fournis par défaut par Liquid.
Il y en a un certain nombre — cet article ne peut pas tous les couvrir — mais vous pouvez les répliquer avec [l'option de configuration](https://www.11ty.io/docs/filters/) `addFilter` d'Eleventy. Convertissons les deux filtres utilisés par notre Guide Markdown : `jsonify` et `where`.

Le filtre `jsonify` sert à exporter un objet ou une chaîne de caractères dans un format JSON valide. Comme JavaScript propose [une méthode JSON native](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) pour cela, nous pouvons l'utiliser dans notre filtre. La méthode `addFilter` prend deux paramètres en entrée : en premier le nom du filtre, en deuxième la fonction dans laquelle nous voulons passer le contenu pour le transformer :

```js
// {{ variable | jsonify }}
  eleventyConfig.addFilter('jsonify', function (variable) {
    return JSON.stringify(variable);
  });
```

Le filtre `where` de Jekyll est un peu plus complexe au sens où il prend deux arguments additionnels, la clef sur laquelle on veut effectuer la recherche et la valeur recherchée :

```liquid
{{ site.members | where: "graduation_year","2014" }}
```

Pour reproduire ce comportement, nous pouvons passer trois arguments au lieu d'un à la fonction passée à `addFilter`: le tableau (`array`) que nous voulons examiner, la clef sur laquelle on veut effectuer la recherche et la valeur recherchée :

```js
// {{ array | where: key,value }}
  eleventyConfig.addFilter('where', function (array, key, value) {
    return array.filter(item => {
      const keys = key.split('.');
      const reducedKey = keys.reduce((object, key) => {
        return object[key];
      }, item);

      return (reducedKey === value ? item : false);
    });
  });
```

Il se passe pas mal de trucs dans ce filtre, que je vais tenter d'expliquer.
Nous examinons chaque `item` dans notre `array`, et nous [réduisons](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/reduce) la `key` (passée comme une chaine à l'aide de la notation avec le point) de manière à pouvoir être analysée correctement (comme une référence d'objet) avant de comparer sa valeur avec celle de `value`. Si elle correspond, l'`item` reste dans le tableau retourné, sinon il est supprimé. Pfiou !

## Les includes

Comme pour les filtres, [Jekyll fournit un jeu de tags](https://jekyllrb.com/docs/liquid/tags/) qui ne fait pas partie intégrante du cœur de Liquid. Parmi eux, l'un des plus utiles est le tag `include`. La bibliothèque utilisée par Eleventy, [LiquidJS](https://github.com/harttle/liquidjs) fournit aussi un tag `include`, mais sa syntaxe diffère légèrement de [celle définie par Shopify](https://help.shopify.com/en/themes/liquid/tags/theme-tags#include). Si vous ne passez pas de variables en paramètre de vos includes, vous ne devriez pas à avoir à faire de modification pour que ça marche.
Dans le cas contraire, alors qu'avec Jekyll vous écrivez :

```liquid
<!-- page.html -->
{% include include.html value="key" %}

<!-- include.html -->
{{ include.value }}
```

dans Eleventy, vous allez écrire :

```liquid
<!-- page.html -->
{% include "include.html", value: "key" %}

<!-- include.html -->
{{ value }}
```

L'inconvénient de la syntaxe Shopify c'est que les assignations de variables ne
sont plus limitées au périmètre de l'`include` et peuvent donc être exposées
ailleurs ; gardez cela bien en tête lors de la conversion de vos gabarits, car
vous aurez peut-être à faire des ajustements supplémentaires.

### Paramétrer Liquid

Vous aurez peut-être remarqué dans l'exemple ci-dessus que LiquidJS s'attend à ce que le nom des fichiers d'inclusion soient entre guillemets (sinon ils seront traités comme des variables). Nous pourrions mettre à jour nos gabarits pour ajouter des guillemets autour des noms de fichier (c'est l'approche conseillée), mais nous pouvons aussi désactiver ce comportement en mettant l'option``dynamicPartials`de LiquidJS à`false\`.

En outre, Eleventy ne supporte pas le tag `include_relative`, nous ne pouvons donc pas inclure des fichiers relativement à l'emplacement du fichier courant. Toutefois, LiquidJS nous laisse définir plusieurs chemins dans lesquels rechercher les fichiers à inclure via l'option `root`.

Heureusement pour nous, Eleventy nous laisse [passer des options à LiquidJS](https://www.11ty.io/docs/languages/liquid/) :

```js
eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
    root: [
      '_includes',
      '.'
    ]
  });
```

## Les collections

[Dans Jekyll les collections](https://jekyllrb.com/docs/collections/) permettent aux auteurs de créer les collections de documents de leur choix, en plus des pages et des articles. Eleventy propose [une fonctionnalité similaire](https://www.11ty.io/docs/collections/), mais qui permet de faire beaucoup plus de choses.

### Les collections dans Jekyll

Dans Jekyll, pour créer des collections, vous devez ajouter leurs noms dans le fichier `_config.yml` et créer les dossiers correspondants dans votre projet. Notre guide Markdown possède deux collections :

```yaml
collections:
    - basic-syntax
    - extended-syntax
```

Elles correspondent aux dossiers `_basic-syntax` et `_extended-syntax`, nous pouvons itérer sur leurs contenus de la sorte :

```liquid
{% for syntax in site.extended-syntax %}
  {{ syntax.title }}
{% endfor %}
```

### Les collections dans Eleventy

Il existe deux manières de configurer des collections dans Eleventy.
Tout d'abord, en utilisant simplement la propriété `tag` dans le front matter des fichiers de contenu :

```yaml
---
title: Barré
syntax-id: barre
syntax-summary: "~~La terre est plate~~"
tag: extended-syntax
---
```

Nous pouvons ensuite itérer sur les contenus étiquetés de la sorte :

```liquid
{% for syntax in collections.extended-syntax %}
  {{ syntax.data.title }}
{% endfor %}
```

Eleventy permet aussi de déclarer des collections à l'aide de la fonction `addCollection`. Par exemple, plutôt que d'utiliser des tags, nous pouvons rechercher des fichiers à l'aide d'un motif global (une manière de spécifier un ensemble de fichiers à rechercher à l'aide de caractères joker) :

```js
eleventyConfig.addCollection('basic-syntax', collection => {
  return collection.getFilteredByGlob('_basic-syntax/*.md');
});

eleventyConfig.addCollection('extended-syntax', collection => {
  return collection.getFilteredByGlob('_extended-syntax/*.md');
});
```

Nous pouvons faire encore mieux. Par exemple, imaginons que nous voulions trier une collection par la propriété `display_order` du front matter de nos documents. Nous pourrions prendre les résultats retournés par la fonction `collection.getFilteredByGlob` et les trier à l'aide de [la fonction `sort` de JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/sort) :

```js
eleventyConfig.addCollection('example', collection => {
  return collection.getFilteredByGlob('_examples/*.md').sort((a, b) => {
    return a.data.display_order - b.data.display_order;
  });
});
```

Avec un peu de chance, cet exemple vous a fait comprendre [ce qu'il est possible de faire avec cette approche](https://www.11ty.io/docs/collections/#collection-api-methods).

## Utiliser les données de répertoire pour définir les paramètres par défaut

Par défaut, Eleventy ne va pas toucher à la structure de vos fichiers de contenus quand il va générer le site. Dans le cas présent, cela signifie que
`/_basic-syntax/lists.md` sera généré sous `/_basic-syntax/lists/index.html`.
Comme dans Jekyll, nous pouvons [définir où les fichiers seront générés](https://www.11ty.io/docs/permalinks/) à l'aide de la propriété `permalink`. Par exemple si nous voulons que cette page devienne accessible sous `/basic-syntax/lists.html` nous pouvons ajouter :

```yaml
---
title: Lists
syntax-id: lists
api: "no"
permalink: /basic-syntax/lists.html
---
```

Là encore, ce n'est pas quelque chose que vous voulez gérer au niveau de chaque fichier, et une fois de plus Eleventy propose des fonctionnalités qui peuvent vous aider : [les données de dossier](https://www.11ty.io/docs/data-template-dir/) et les [variables pour les permaliens](https://www.11ty.io/docs/permalinks/#use-data-variables-in-permalink).

Par exemple, pour parvenir au même résultat que précédemment pour tous les contenus stockés dans le dossier `_basic-syntax`, nous pouvons y créer un fichier JSON du même nom, `_basic-syntax/_basic-syntax.json` et y définir nos valeurs par défaut. Pour les permaliens, nous avons le droit d'utiliser une variable Liquid pour construire le chemin désiré :

```json
{
  "layout": "syntax",
  "tag": "basic-syntax",
  "permalink": "basic-syntax/{{ title | slug }}.html"
}
```

Maintenant, le guide Markdown ne publie pas les exemples de syntaxe sous forme d'URLs individuelles et permanentes, il se contente d'utiliser les fichiers de contenu pour stocker les données. Modifions donc un peu tout ça. Affranchissons-nous des règles imposées par Jekyll sur l'emplacement et le nom des dossiers de collections, et déplaçons tout dans un dossier nommé `_content` :

```txt
markdown-guide
└── _content
    ├── basic-syntax
    ├── extended-syntax
    ├── getting-started
    └── _content.json
```

Ajoutons également un fichier de données (`_content.json`) dans ce dossier. Comme les règles définies au niveau du dossier sont appliquées de manière récursive, cela signifie que tous les fichiers contenus dans cette arborescence ne seront plus publiés :

```json
{
  "permalink": false
}
```

## Les fichiers statiques

Eleventy ne va transformer que les fichiers dont il connaît les gabarits. Maintenant nous pouvons aussi avoir des fichiers statiques qui n'ont pas besoin d'être convertis, mais que nous devons copier dans le dossier de destination. Pour cela, nous pouvons utiliser [la copie de fichier "passe-plat"](https://www.11ty.io/docs/copy/). Dans notre fichier de configuration, nous indiquons à Eleventy quels dossiers/fichiers copier via l'option `addPassthroughCopy`.
Puis nous activons cette fonctionnalité dans ce qui est retourné, en mettant `passthroughFileCopy` à `true` :

```js
module.exports = function(eleventyConfig) {
  …

  // Copy the `assets` directory to the compiled site folder
  eleventyConfig.addPassthroughCopy('assets');

  return {
    dir: {
      input: "./",
      output: "./_site"
    },
    passthroughFileCopy: true
  };
}
```

## Considérations finales

### Gestion des assets

Contrairement à Jekyll, Eleventy ne propose aucun support de compilation et d'assemblage des scripts — ce ne sont pas les options qui manquent dans l'écosystème npm dans ce domaine. Si vous utilisiez Jekyll pour compiler vos fichiers Sass en CSS, ou CoffeeScript en JavaScript, vous devrez rechercher comment faire ça, car malheureusement ce n'est pas le but du présent article.

### Publication sur GitHub Pages

Un des gros avantages de Jekyll, c'est son [intégration dans GitHub Pages](https://jekyllrb.com/docs/github-pages/). Pour publier un site généré avec Eleventy — ou tout autre site non généré par Jekyll — sur GitHub Pages peut s'avérer compliqué, et implique généralement de devoir [copier le site généré dans la branche `gh-pages`](https://github.com/tschaub/gh-pages) ou d'[inclure cette branche comme un sous-module Git](https://blog.revathskumar.com/2014/07/publish-github-pages-using-git-submodules.html). Vous pouvez aussi utiliser un service d'intégration continue comme [Travis](https://travis-ci.com) ou [CircleCI](https://circleci.com) et pousser le site généré sur votre serveur web. De quoi vous faire tourner la tête !

C'est peut-être pour cette raison que des services spécialisés dans l'hébergement de fichiers statiques ont émergé comme [Netlify](https://www.netlify.com) ou [Google Firebase](ttps://firebase.google.com/products/hosting/).
Rappelez-vous cependant que vous pouvez publier un site statique où vous voulez !

## Montez d'un cran

Si vous songiez à passer à Eleventy, j'espère que ce bref aperçu vous aura été utile. Il sert également à rappeler qu'il n'est pas toujours prudent de prendre le train en marche.

Essayer de nouveaux outils et des technologies émergentes est toujours gratifiant, cela demande pas mal de travail et de compromis. Eleventy est très intéressant, mais il n'a qu'un an, et donc peu de thèmes ou de plugins sont disponibles. De plus, il n'est maintenu que par une seule personne. Alors que Jekyll est un projet mature, qui possède une grande communauté, ainsi que de nombreux contributeurs et mainteneurs.

J'ai passé mon site sous Eleventy car la lenteur et la rigidité de Jekyll m'empêchaient de faire ce que je voulais. Mais j'ai également investi du temps dans cette migration. Après avoir lu ce guide, et en fonction des spécificités de votre projet, vous déciderez peut-être de garder Jekyll, surtout si c'est pour parvenir au même résultat. Et ce n'est pas un problème !

Mais [ceux-là vont jusqu'à 11](https://www.11ty.io/docs/#sites-using-eleventy).

[^1]: L'information présentée ici est valable pour les versions 0.6.0 d'Eleventy et 3.8.5 de Jekyll.
