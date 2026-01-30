---
title: "Implémenter les catégories dans Eleventy"
description: "Comment créer une collection afin de pouvoir travailler avec des catégories dans le générateur Eleventy."
author: frank
date: 2019-02-05T09:15:06+01:00
lastmod: 2019-02-06T09:10:26+01:00
categories:
  - Eleventy
source:
  author: "Philip Borenstein"
  title: "Implementing Categories"
  url: "https://www.pborenstein.com/articles/categories/"
---
Je veux disposer de catégories dans Eleventy afin de pouvoir dispatcher
mes articles dans divers domaines génériques [^1]. L'idée c'est que tous les
articles sur les livres aillent dans la catégorie "Culture", les articles
techniques dans la catégorie "Tech", etc.

- Un article n'a pas besoin de préciser une catégorie.
- Un article ne peut appartenir qu'à une seule catégorie
- Par convention, les noms de catégories commencent par une majuscule.

Les tags, eux, peuvent figurer dans n'importe quelle catégorie. Un livre
étrange et un article technique fantaisiste appartiennent à des
catégories différentes, mais peuvent très bien être tous les deux étiquettés "bizarre".

## Comment ça marche à l'usage ?

Regardons comment nous allons utiliser les catégories :

- Comment préciser la catégorie d'un article,
- Comment accéder à la catégorie d'un article dans un modèle
- Comment manipuler tous les articles d'une même catégorie

### Préciser la catégorie

On utilise la propriété `category` ainsi pour préciser la catégorie à laquelle
appartient l'article :

```yaml
---
date: 10/30/2018
title: Loomings
category: Tech
tags:
  - tools
  - git
  - eleventy
---

```

### Appeler la catégorie dans un modèle

Dans un modèle, on fait référence à la propriété catégorie comme d'habitude :

```html
<a href="/categories/{{category}}">{{ category }}</a>
```

### Manipuler les articles d'une même catégorie

On peut manipuler les articles d'une même catégories en créant une collection `categories` [^2].
Pour lister tous les articles rangés dans la catégorie `Tech`, on pourrait procéder de la sorte :

```twig
<ul>
  {%- for article in collections.categories["Tech"] -%}
  <li>{{ article.data.title }}</li>
  {%- endfor -%}
</ul>
```

Tout comme l'objet `collections` possède une propriété pour chaque tag, l'objet
`collections.categories` possède une propriété pour chaque catégorie.
Chaque propriété fait référence à un tableau d'articles. Ça donne quelque chose comme ça :

```json
collections: {
  all: [ items ],
  categories: {
    Culture: [ items ],
    Life: [ items ],
    Thinking: [ items ]
  }
}
```

## Implémentation

Nous voulons :

- une liste de catégories
- un objet qui contient une propriété pour chaque catégorie, chaque propriété est une liste d'articles pour cette catégorie

### Créer une liste de catégories

Pour générer une liste de catégories nous itérons sur tous les fichiers générés.
Cette fonction crée une collection `categoryList` qui contient les noms de toutes les catégories.

```js
getCatList = function (collection) {
  let catSet = new Set();

  collection
    .getAllSorted()
    .forEach(
      (item) =>
        typeof item.data.category === "string" && catSet.add(item.data.category)
    );

  return [...catSet];
};

eleventyConfig.addCollection("categoryList", getCatList);
```

### Créer une liste d'articles pour chaque catégorie

Pour générer les listes d'articles de chaque catégorie, nous voulons créer un objet qui possède une propriété pour chaque catégorie, et chaque propriété contient une liste d'articles de cette catégorie. Pour le dire plus simplement, nous voulons finir avec un objet qui ressemble à ça :

```json
categories {
  Culture: [article_1, article_4],
  Tech: [article_3],
  Life: [article_1, article_3]
}
```

Nous pouvons utiliser la fonction `makeCategories()` comme callback de `addCollection()` pour créer cet objet. Nous itérons sur chaque élément qui possède une propriété `category` dans son front matter et nous l'ajoutons à la liste de cette catégorie [^explication] :

```js
makeCategories = function (collection) {
  let categories = {};

  // Every rendered page

  collection.getAllSorted().forEach((item) => {
    let category = item.data.category;

    // Ignore the ones without a category

    if (typeof category !== "string") return;

    if (Array.isArray(categories[category]))
      //  category array exists? Just push
      categories[category].push(item);
    //  Otherwise create it and
    //  make `item` the first, uh, item.
    else categories[category] = [item];
  });

  return categories;
};
```

Puisque nous souhaitons appeler notre collection de catégories `catgories`, nous la créons comme cela :

```js
addCollection("categories", makeCategories);
```

Nous avons maintenant un moyen de créer une collection, qui contient elle-même ses propres collections. Cela me permet de ranger mes articles dans des@ endroits distincts.

[^1]: Ça c'est ce que je dis _maintenant_. Ma première motivation était de comprendre [comment marchent les collections](page:post/les-collections-dans-eleventy).]
[^2]: Vous l'appelez comme vous voulez. Il se trouve que j'aime bien "categories".
[^explication]: Ce `if (Array.isArray(categories[category]))` est vraiment stupide. N'existe-t-il pas un moyen d'ajouter un élément dans un tableau et de le créer au passage s'il n'existe pas ?
