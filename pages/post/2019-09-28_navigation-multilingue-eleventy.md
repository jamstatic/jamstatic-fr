---
title: "Navigation multilingue avec Eleventy"
description: "Une approche pour gérer la navigation sur un site Jamstack multilingue généré avec Eleventy."
author: jerome
date: 2019-09-28
categories:
  - eleventy
  - i18n
source:
  author: Jérôme Coupé
  title: Language switcher for multilingual Jamstack sites
  url: https://www.webstoemp.com/blog/language-switcher-multilingual-jamstack-sites/
---
## Mise en place

Développer un site multilingue avec un générateur de site statique est à la portée de tous dès lors que l'on dispose d'un langage de templating, de données structurées et d'un système permettant de contrôler les URLs, ce que proposent la plupart des générateurs de sites statiques.

Il existe beaucoup d'[articles sur le sujet](/categories/i18n), comme celui que nous avons publié sur [la gestion d'un site multilingue avec Eleventy](page:post/site-multilingue-avec-eleventy). Hugo dispose d'[une documentation très claire](https://gohugo.io/content-management/multilingual/) sur le sujet, de [nombreux](https://www.sylvaindurand.org/making-jekyll-multilingual/) [articles](https://forestry.io/blog/creating-a-multilingual-blog-with-jekyll/) en font de même pour Jekyll.

Notre but ici est de rediriger depuis une page écrite dans une langue donnée vers les traductions disponibles pour cette même page. Si aucune traduction n'existe pour une page, alors nous redirigerons vers la page d'accueil dans la langue demandée.

Ici, nous utilisons [Eleventy](/categories/eleventy), mais l'approche serait similaire avec d'autres générateurs de site statique.

Pour parvenir à nos fins, il nous faut :

1. Pouvoir boucler sur les différents langages utilisés sur le site
2. Nous assurer que chaque contenu dispose d'une clé `locale` dont la valeur correspond au code de langue utilisé pour ce même contenu. Si vous avez besoin de vous rafraîchir la mémoire, relisez [comment faire avec les fichiers de données de répertoire avec Eleventy](page:post/site-multilingue-avec-eleventy).
3. Définir une clé commune unique nommée `translationKey` pour relier les traductions d'un contenu entre elles.

## Les langues du site

Nous allons commencer par créer un tableau des langues utilisées par notre site. J'ai pour habitude de définir un objet `languages` dans le fichier de données `./src/_data/site.js`.

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
  languages: [
    {
      label: "english",
      code: "en",
    },
    {
      label: "français",
      code: "fr",
    },
  ],
};
```

À l'aide de ce tableau nous allons pouvoir parcourir les différentes langues de notre site et comparer la valeur du `code` de langue avec celui de la `locale` définie dans nos fichiers de contenu.

## Ajout des clés de traduction

Maintenant il nous faut créer une relation explicite entre les différentes traductions d'un même contenu. Avec un générateur de site statique qui stocke les données dans des fichiers, nous pouvons utiliser une même clé dans le front matter YAML de ces fichiers. Cette clé de traduction est une chaîne de caractère qui doit être unique pour chaque contenu.

Par exemple, pour connecter entre elles nos pages de contact dans différentes langues, nous pouvons utiliser :

`./src/en/pages/about.njk`

```twig
---
permalink: "/{{ locale }}/about/index.html"
translationKey: "about-page"
---
```

`./src/fr/pages/about.njk`

```text
---
permalink: "/{{ locale }}/a-propos/index.html"
translationKey: "about-page"
---
```

Nous pouvons appliquer le même principe à nos documents de collections, par exemple pour les articles de blog :

`./src/en/bogposts/2019-09-12-my-awesome-blogpost.njk`

```text
---
title: "My awesome blogpost"
translationKey: "awesome-blogpost"
---
```

`./src/fr/bogposts/2019-09-12-mon-magnifique-article-de-blog.njk`

```text
---
title: "Mon magnifique article de blog"
translationKey: "awesome-blogpost"
---
```

Nous disposons maintenant d'une relation explicite entre les traductions de nos contenus en différentes langues.

## Coder notre sélecteur de langue

Voici le détail de ce que nous allons faire avec ce petit morceau de code:

1. Boucler sur toutes les langues déclarées de notre site
2. Définir la page d'accueil comme valeur par défaut de `translatedUrl`, valeur qui sera remplacée lorsqu'une traduction de contenu est trouvée.
3. Dans cette boucle, parcourir tous les contenues du site. Eleventy nous fourni une méthode très pratique avec [`collections.all`](https://www.11ty.dev/docs/collections/#the-special-all-collection).
4. Pour chaque contenu parcouru, vérifier si la clé `translationKey` correspond et si sa `locale` correspond au `code` de langue en cours. Si une correspondance est trouvée, alors définir `translatedUrl` avec l'URL de ce contenu.
5. Utiliser les valeurs de `translatedUrl` pour créer les liens de notre sélecteur de langue.

```twig
{# Boucler sur les langues du site #}
{% for lgg in site.languages %}
  {% if loop.first %}<ul class="c-lggnav">{% endif %}

  {# Définir translatedUrl à la page d'accueil de cette langue par défaut #}
  {% set translatedUrl = "/" + lgg.code + "/" %}

  {# Définir la classe de la langue active #}
  {% set activeClass = "is-active" if lgg.code == locale else "" %}

  {# Parcourir tous les contenus du site #}
  {% for item in collections.all %}

    {# Pour chaque contenu, vérifier si
    - la valeur de sa translationKey correspond à celle du contenu en cours
    - sa locale correspond au code de langue parcourue #}
    {% if item.data.translationKey == translationKey and item.data.locale == lgg.code %}
      {% set translatedUrl = item.url %}
    {% endif %}

  {% endfor %}

  <li class="c-lggnav__item">
    <a class="c-lggnav__link  {{ activeClass }}" href="{{ translatedUrl }}">{{ lgg.label }}</a>
  </li>

  {% if loop.last %}</ul>{% endif %}
{% endfor %}
```

Et voilà, mission accomplie avec un effort minime. Ces boucles seront déclenchées pour chaque page de site. Comme Eleventy a de toute façon déjà créé `collections.all` et qu'il est assez performant en entrée-sortie, l'impact sur le temps de génération du site devrait être assez faible, même pour de gros sites.
