---
title: Un site multilingue avec Eleventy
description: "Comment gérer plusieurs langues sur son site Eleventy à l'aide de fichiers de données et de collections."
author: jerome
date: 2019-09-07T14:27:07+02:00
lastmod: 2019-09-07T14:27:07+02:00
categories:
  - eleventy
  - i18n
images:
  - https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/w_1100,c_fit,co_white,g_north_west,x_80,y_120,l_text:poppins_80_ultrabold_line_spacing_-30:Un%20site%20multilingue%20avec%20Eleventy/jamstatic/twitter-card.png
source:
  author: "Jérôme Coupé"
  title: "Multilingual sites with Eleventy"
  url: "https://www.webstoemp.com/blog/multilingual-sites-eleventy/"
---

{{< intro >}}
Eleventy n'offre pas de fonctionnalités natives liées au multilinguisme et à la localisation, cela ne nous empêche aucunement de développer une bonne gestion du multilingue à l'aide de fichiers de données globales, de collections en utilisant Nunjucks comme langage de templating.
{{< /intro >}}

---

Afin d'illustrer notre propos, nous allons développer un blog multilingue tout ce qu'il y a de plus classique.

Voici l'arborescence de fichiers avec laquelle nous allons travailler. C'est une architecture [Eleventy](/categories/eleventy) standard, dont les principes et les techniques peuvent être appliqués à des projets plus importants.

```text
+-- src
  +-- _data
    +-- site.js
    +-- footer.js
    +-- header.js
  +-- _includes
    +-- layouts
      +-- base.njk
    +-- partials
      +-- header.njk
      +-- footer.njk
  +-- en
    +-- pages
      +-- index.html
      +-- blog.html
      +-- contact.html
    +-- posts
      +-- yyyy-mm-dd-some-blogpost.md
      +-- posts.json
    +-- en.json
  +-- fr
    +-- pages
      +-- index.html
      +-- blog.html
      +-- contact.html
    +-- posts
      +-- yyyy-mm-dd-some-blogpost.md
      +-- posts.json
    +-- fr.json
+-- .eleventy.js
```

## Définition des locales

La première consiste à créer nos locales à l'aide [des fichiers de données pour les répertoires](https://www.11ty.dev/docs/data-template-dir/).

Pour cela il nous suffit d'ajouter les fichiers `en.json` and `fr.json` dans nos répertoires de langues. Dans chacun d'entre eux, nous définissons une clé `locale`. Elle va permettre d'accéder aux valeurs correspondantes dans tous les fichiers de layout présents dans les sous-répertoires d'un dossier de langue.

Par exemple, notre fichier `fr.json` contient :

```js
{
  "locale": "fr"
}
```

`{{ locale }}` va donc maintenant retourner "fr" ou "en" pour chacun de nos fichiers de layout, en fonction de sa position dans notre arborescence de fichiers.

## Filtre de localisation de date

Nunjucks ne possède pas de filtre pour les dates. Nous pouvons en créer un à l'aide de `moment.js` et lui passer la valeur de notre `locale` pour qu'il localise les dates pour nous, ce qui est toujours une partie importante des projets multilingues.

Pour ce faire, nous allons insérer le code suivant dans notre fichier de configueration `eleventy.js` :

```js
// date filter (localized)
eleventyConfig.addNunjucksFilter("date", function (date, format, locale) {
  locale = locale ? locale : "en";
  moment.locale(locale);
  return moment(date).format(format);
});
```

À présent, nous pouvons utiliser ce filtre dans nos layouts et lui passer le paramètre `locale`. Notez bien que comme nous avons défini la `locale` par défaut comme `en`, nous pouvons omettre de la préciser pour les dates purement numériques. Un petit exemple :

```twig
<p><time datetime="{{ post.date | date('Y-MM-DD') }}">{{ post.item|date("DD MMMM Y", locale) }}</time></p>
```

Maintenant que nos dates sont automatiquement localisées, passons aux collections.

## Localisation des collections

Nous allons pouvoir tirer parti de notre arborescence de fichiers pour créer des collections dans Eleventy. Le plus simple est encore de créer une collection par langue. Nous utilisons pour cela la fonction [`getFilteredByGlob`](<https://www.11ty.dev/docs/collections/#getfilteredbyglob(-glob-)>) dans notre fichier `eleventy.js`.

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("posts_en", function (collection) {
    return collection.getFilteredByGlob("./src/en/posts/*.md");
  });
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("posts_fr", function (collection) {
    return collection.getFilteredByGlob("./src/fr/posts/*.md");
  });
};
```

Comme nos fichiers de contenu Markdown se trouvent dans des sous-répertoires de nos dossiers de langues, la variable `locale` est accessible. Nous pouvons par exemple l'utiliser pour créer les permaliens de tous nos articles.

Plutôt que d'ajouter une variable `permalink` dans le front matter de chaque fichier, nous pouvons créer un fichier de données `posts.json` dans chacun de nos dossiers `posts` avec le contenu suivant:

```js
{
  permalink: "/{{ locale }}/blog/{{ page.fileslug }}/index.html";
}
```

Nous avons ainsi localisé toutes les pages de détail de tous nos articles, il nous reste encore à boucler sur nos collections dans les différentes pages `blog.njk` de nos différentes langues.

```twig
{% for post in collections.posts_en | reverse %}
  {% if loop.first %}<ul>{% endif %}
    <li>

      <article>
        <p><time datetime="{{ post.date | date('Y-MM-DD') }}">{{ post.date | date("DD MMMM[,] Y", locale) }}</time></p>
        <h3><a href="{{ post.url }}">{{ post.data.title }}</a></h3>
      </article>

    </li>

  {% if loop.last %}</ul>{% endif %}
{% endfor %}
```

Notez que nous pourrions aussi aussi utiliser pour nos collections notre variable `locale`. Il faudrait pour cela utiliser à la place une notation entre crochets pour concaténer les chaînes de caractères.

```twig
{% set posts = collections["posts_" + locale] %}
{% for post in posts %}
  {# loop content #}
{% endfor %}
```

## Localisation des layouts et des fichiers partiels

Alors que la duplication de nos pages et de nos articles est à priori logique, nous ne voulons pas faire de même pour nos layouts et nos fichiers partiels.

Fort heureusement, nous pouvons éviter cela en traduisant simplement certaines chaînes de caractères. Pour ce faire, nous devons créer [des fichiers de données génériques](https://www.11ty.dev/docs/data-global/) qui contiendront nos traductions sous forme de paire clés/valeurs. Nous pourrons ensuite faire référence dynamiquement à ces clés dans nos fichiers partiels et de layouts à l'aide de notre chère variable `locale`.

### Layouts

Commençons par un exemple dans un fichier de layout.

Le fichier `./src/_data/site.js` va rendre accessibles des variables via l'objet `site`.

```js
module.exports = {
  buildTime: new Date(),
  baseUrl: "https://www.mysite.com",
  name: "mySite",
  twitter: "@handle",
  en: {
    metaTitle: "Title in english",
    metaDescription: "Description in english",
  },
  fr: {
    metaTitle: "Titre en français",
    metaDescription: "Description en français",
  },
};
```

Nous pouvons utiliser ces variables dans notre fichier `./src/fr/pages/index.njk`. Dans notre exemple, nous allons d'abord assigner les valeurs à des variables Nunjucks plutôt que de les utiliser directement, car ces valeurs nous pourrions avoir besoin de les surcharger dans d'autres pages. La même logique peut être appliquée pour les modèles de page spécifiques aux articles.

```twig
---
permalink: /{{ locale }}/index.html
---

{% extends "layouts/base.njk" %}

{% set metaTitle = site[locale].metaTitle %}
{% set metaDescription = site[locale].metaDescription %}
{% set metaImage = site[locale].metaImage %}

{% block content %}
  {# page content #}
{% endblock %}
```

Puisque ce layout étend le fichier `./src/_includes/layouts/base.njk`, les variables Nunjucks déclarées dans le gabarit enfant ainsi que les variables globales d'Eleventy sont également accessibles dans ce fichier.

```twig
<!DOCTYPE html>
<html lang="{{ locale }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{ metaTitle }}</title>
  <link rel="stylesheet" href="/css/main.min.css">

  <!-- open graph -->
  <meta property="og:type" content="article">
  <meta property="og:title" content="{{ metaTitle }}">
  <meta property="og:image" content="{{ metaImage }}">
  <meta property="og:site_name" content="{{ site.name }}">
  <meta property="og:description" content="{{ metaDescription }}">

  <!-- twitter -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:site" content="{{ site.twitter }}">
  <meta name="twitter:title" content="{{ metaTitle }}">
  <meta name="twitter:description" content="{{ metaDescription }}">
  <meta name="twitter:image" content="{{ metaImage }}">
</head>
<body>
  {% include "partials/siteheader.njk" %}
  {% block content %}{% endblock %}
  {% include "partials/sitefooter.njk" %}
</body>
</html>
```

### Fichiers partiels

La traduction de fichiers partiels comme `./src/_includes/partials/footer.njk` est basée sur le même principe.

Premièrement, nous créons un fichier `./data/footer.js` et nous utilisons nos locales comme clés.

```js
module.exports = {
  mapUrl: "https://goo.gl/maps/3YTkhCgfEgj1PRAd7",
  fr: {
    addressTitle: "Adresse",
    addressStreet: "Rue du marché",
    addressNumber: "42",
    addressPostcode: "1000",
    addressCity: "Bruxelles",
    directionsLabel: "Itinéraire",
  },
  en: {
    addressTitle: "Address",
    addressStreet: "Market street",
    addressNumber: "42",
    addressPostcode: "1000",
    addressCity: "Brussels",
    directionsLabel: "Directions",
  },
};
```

Ensuite dans le fichier `./src/_includes/partials/footer.njk`, nous nous basons sur la valeur de notre variable `locale` pour accéder à ces clés à l'aide de la notation entre crochets.

```twig
<footer>
  <h2>{{ footer[locale].addressTitle }}</h2>
  <p>
    {{ footer[locale].addressStreet }}, {{ footer[locale].addressNumber }}<br>
    {{ footer[locale].addressPostcode }}, {{ footer[locale].addressCity }}
  </p>
  <p><a href="{{ footer.mapUrl }}">{{ footer[locale].directionsLabel }}</a></p>
</footer>
```

Et voilà, nous avons maintenant un pied de page traduit en plusieurs langues.

## Flexible par nature

Les générateurs de site statiques sont très flexibles quant aux structures de données que vous pouvez créer. Eleventy est l'un des générateurs les plus flexibles qu'il m'ait été donné d'utiliser, ce qui en fait un bon candidat pour créer une structure de données multilingue, adaptable à tout type de projet.
