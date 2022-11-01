---
title: "De Jekyll à Eleventy"
description: "Retour d'expérience du passage de Jekyll à Eleventy."
author: jerome
date: 2019-09-07T10:59:06+02:00
lastmod: 2019-09-07T12:24:06+02:00
categories:
  - jekyll
  - eleventy
source:
  author: "Jérôme Coupé"
  title: "From Jekyll to Eleventy"
  url: "https://www.webstoemp.com/blog/from-jekyll-to-eleventy/"
---
:::intro
Eleventy n'en finit pas de faire des émules, il séduit par sa simplicité et sa flexibilité, [Jérôme Coupé](https://www.webstoemp.com) a sauté le pas à son tour et il est très satisfait de son choix.
:::

Jekyll est un générateur que je continue d'apprécier, d'utiliser et de suivre, néanmoins quand j'ai enfin eu le temps de mettre à jour [mon site](https://www.webstoemp.com), j'ai choisi de partir sur Eleventy.

## Choisir un générateur de site

Les générateurs de site statiques gagnent toujours plus en popularité, grâce à l'omniprésence des APIs, aux processus de développement basés sur Git, à la puissance des frameworks JavaScript, aux CMS headless et aux couches de données unifiées fournies par GraphQL. Ils sont devenus un choix raisonnable pour tous types de sites web.

Mon site tournait précédemment sous Jekyll, que j'apprécie pour sa facilité d'utilisation et sa flexibilité. Toutefois, il était devenu plus lent que d'autres générateurs plus récents et me forçait à maintenir un environnement Ruby à jour. J'ai testé plusieurs outils, avant de finalement restreindre ma liste de choix à [Hugo](https://gohugo.io/) et [Eleventy](https://www.11ty.dev/).

### Hugo

Écrit en Go, Hugo est extrèmement rapide. il est également disponible sous forme de fichier binaire, ce qui ne vous force pas à maintenir un environnement Go. A titre d'expérience, j'ai développé la version 2 de mon site avec Hugo et l'exercice a été concluant.

Cependant, les inconvénients d'Hugo sont pour moi la [syntaxe de Go HTML template](https://gohugo.io/templates/introduction/) qui demande pas mal de pratique pour être apprivoisée, et le fait qu'Hugo soit une solution "tout en un". Cela peut se révéler utile pour les gros projets, mais réduit les possibilités de l'étendre facilement.

### Eleventy

Ce qui nous amène à Eleventy. Eleventy est écrit en Node, vous avez donc accès à tout l'écosystème de NPM pour l'étendre, il est facile d'utilisation, et il est bien plus rapide que Jekyll (sans cependant atteindre les performances d'Hugo).

De plus Eleventy supporte [plusieurs langagues de templating](https://www.11ty.dev/docs/languages/).

#### Configuration

J'ai opté pour le moteur de templating [Nunjucks](https://mozilla.github.io/nunjucks/) de Mozilla. Outre cela, je n'avais besoin que de fichiers Markdown et HTML.

Nunjucks n'offre pas de filtres `date` et `limit`, je les ai donc ajoutés dans mon fichier de configuration `eleventy.js`, en utilisant la bibliothèque [`moment.js`](https://momentjs.com/) pour le filtre de date.

```js
const moment = require("moment");

// limit filter
eleventyConfig.addNunjucksFilter("limit", function (array, limit) {
  return array.slice(0, limit);
});

// date filter
eleventyConfig.addNunjucksFilter("date", function (date, format) {
  return moment(date).format(format);
});
```

J'utilise [Gulp](https://gulpjs.com/) comme outil de génération, j'ai donc dû dire à Eleventy d'ignorer mes assets. Pour ce faire, j'ai simplement ajouté la ligne suivante au fichier `.eleventyignore` situé à la racine de mon projet:

```txt
src/assets/**/*
```

L'étape suivante a été d'ajouter Eleventy à mon fichier `gulpfile.js` et d'utiliser la fonction `child_process` de Node. De cette manière, je peux facilement intégrer Eleventy à mes commandes `build` et `watch`.

```js
// packages
const cp = require("child_process");

// Eleventy
function build() {
  return cp.spawn("npx", ["eleventy", "--quiet"], { stdio: "inherit" });
}
```

### Structure de données

#### Collections

Mon site est simple, je n'avais besoin que de deux collections (blogposts et projects) pour lesquelles j'ai créé deux dossiers contenant des fichiers Markdown avec du front matter YAML.

Eleventy propose une fonctionnalité intéressante qui vous permet d'utiliser des fichiers JSON nommés comme votre dossier de collection pour déclarer des valeurs front matter communes à tous les fichiers du répertoire.

Par exemple, j'ai utilisé un fichier `blogposts.json` dans mon dossier `blogposts` pour définir le layout et la structure des permaliens pour tous les articles de blog.

```json
{
  "layout": "layouts/blogpost.njk",
  "permalink": "blog/{{ page.fileSlug }}/index.html"
}
```

Les projets quant à eux n'ont pas besoin de pages de détail, j'ai donc spécifié la valeur de `permalink` à `false` dans le fichier `projects.json` de mon dossier `projects` et je n'ai pas défini de `layout`.

```json
{
  "permalink": false
}
```

Pour créer les deux collections et permettre à Eleventy de générer les fichiers HTML, j'ai utilisé la fonction `getFilteredByGlob( glob )` dans mon fichier `eleventy.js`:

```js
const moment = require("moment");

module.exports = function (eleventyConfig) {
  // blogpost collection
  eleventyConfig.addCollection("blogposts", function (collection) {
    return collection.getFilteredByGlob("./src/blogposts/*.md");
  });

  // projects collection
  eleventyConfig.addCollection("projects", function (collection) {
    return collection.getFilteredByGlob("./src/projects/*.md");
  });

  // limit filter
  eleventyConfig.addNunjucksFilter("limit", function (array, limit) {
    return array.slice(0, limit);
  });

  // date filter
  eleventyConfig.addNunjucksFilter("date", function (date, format) {
    return moment(date).format(format);
  });

  // Base config
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
```

#### Les fichiers de données

Eleventy vous laisse aisément travailler avec des fichiers de données aux format JSON ou JS situés par défaut dans le sous-dossier `_data` de votre répertoire de base (`src` dans mon cas).

J'ai donc utilisé un fichier `./src/_data/site.js` pour définir des variables globales du site, auxquelles je peux facilement accéder dans n'importe quel fichier en utilisant le nom du fichier de données et une des clés de l'objet correspondant.

```js
module.exports = {
  title: "Webstoemp",
  description:
    "Webstoemp is the portfolio and blog of Jérôme Coupé, a designer and front-end developer from Brussels, Belgium.",
  url: "https://www.webstoemp.com",
  baseUrl: "/",
  author: "Jerôme Coupé",
  authorTwitter: "@jeromecoupe",
  buildTime: new Date(),
};
```

La valeur de `site.buildTime` peut maintenant être utilisée dans le pied de page du site :

```twig
<div class="c-sitefooter__copyright">
  <p class="u-margin-all-none">&copy; Webstoemp {{ site.buildTime | date("Y") }}</p>
</div>
```

### Layouts Nunjucks

J'ai choisi Nunjucks notamment pour son mécanisme d'héritage de layouts. Je peux définir un layout de base et ensuite l'étendre avec d'autres layouts si besoin.

#### Blogposts

Boucler sur la collection `blogposts` pour afficher les titres et les dates de publication n'est pas très compliqué:

```twig
{% for post in collections.blogposts | reverse %}
  {% if loop.first %}<ul class="c-list-ui">{% endif %}
  <li>
    <article class="c-blogteaser">
      <p class="c-blogteaser__date"><time datetime="{{ post.date | date('Y-M-DD') }}">{{ post.date|date("MMMM Do, Y") }}</time></p>
      <h2 class="c-blogteaser__title"><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
    </article>
  </li>
  {% if loop.last %}</ul>{% endif %}
{% else %}
  <p>No blogpost found</p>
{% endfor %}
```

J'utilise un layout dédié pour afficher le détail de chaque article de blog. Le fichier `_includes/layouts/blogpost.nkj` appelle mon layout principal et ajoute l'image associée à l'article de blog, ainsi que le contenu Markdown au bloc `content` :

```twig
{% extends "layouts/base.njk" %}
{% set activeSection = "blog" %}

{% set metaTitle = title %}
{% set metaDescription = excerpt %}
{% set metaImage = site.url ~ "/img/blogposts/_600x600/" ~ image %}

{% block content %}

  <article class="c-blogpost">
    <div class="c-blogpost__media">
      <div class="l-container">

        <picture>
          <source media="(min-width: 500px)"
                  srcset="/img/blogposts/_1024x576/{{ image }} 1024w,
                          /img/blogposts/{{ image }} 1500w"
                  sizes="(min-width: 1140px) 1140px,
                         100vw">
          <img src="/img/blogposts/_600x600/{{ image }}"
               class="o-fluidimage"
               alt="{{ imageAlt }}">
        </picture>

      </div>
    </div>

    <div class="c-blogpost__body  l-container l-container--narrow">

      <header>
        <p class="c-suptitle  c-suptitle--dark"><time datetime="{{ page.date | date('Y-M-DD') }}">{{ page.date | date("MMMM Do, YYYY") }}</time></p>
        <h1 class="c-h1">{{ title }}</h1>
        <div class="c-blogpost__intro">
          <p>{{ excerpt }}</p>
        </div>
      </header>

      <div class="c-wysiwyg">
        {{ content | safe }}
      </div>

    </div>
  </article>

{% endblock %}
```

### Projects

La même logique est appliquée pour afficher les projets, avec une petite nuance. Comme il n'y a pas de layout dédié pour la collection `projects`, il nous faut utiliser [`templateContent`](https://www.11ty.dev/docs/collections/#collection-item-data-structure) pour afficher le contenu des fichiers Markdown. Voici une version simplifiée du code :

```twig
{% for project in collections.projects | reverse %}
    {{ project.templateContent | safe }}
{% endfor %}
```

## Satisfait de mon choix

Au final, je suis très content du résultat et d'avoir opté pour Eleventy. Le [code source de mon site](https://github.com/jeromecoupe/webstoemp) est publié sur GitHub, si vous avez envie d'aller y jeter un œil.
