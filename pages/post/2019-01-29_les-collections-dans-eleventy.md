---
title: "Les collections dans Eleventy"
description: "Les deux manières de créer des collections de documents avec le générateur de site statique Eleventy."
date: 2019-01-29T08:54:22+01:00
author: frank
categories:
  - eleventy
source:
  author: Philip Borenstein
  title: Working with Collections
  url: https://www.pborenstein.com/articles/collections/
---
:::intro
Le générateur de site statique open source [Eleventy](/categories/eleventy) est à la différence d'autres générateurs — comme Jekyll ou Hugo — beaucoup moins opiniâtre. Là où ces deux générateurs vont imposer _la_ manière dont vous pouvez créer des collections de documents (appelées sections de contenu dans Hugo), Eleventy lui vous laisse le choix.
:::

Dans Eleventy les `collections` permettent de grouper des articles selon divers
critères. Une collection pourrait désigner une série d'articles. Un autre
collection pourrait regrouper les articles à propos de livres. Une troisième
collection pourrait rassembler tous les contenus d'un même répertoire.

Eleventy vous permet de créer des collections de deux manières :

- [implicitement](#les-collections-à-base-de-tags), à l'aide de tags dans le front matter
- [explicitement](#les-collections-sur-mesure), avec la fonction `addCollection()`

## Les collections à base de tags

Toutes les pages qui partagent un même tag appartiennent à la même collection.
Un modèle avec le front matter suivant va générer des pages dans les collections
`books` et `reviews`.

```yaml
---
title: Finding Oz
category: Culture
tags:
  - books
  - reviews
---
. . .
```

Dans un modèle, on accède aux collections par leur nom, en tant que propriété de
l'object global `collections`.

```twig
<p>
  Le titre de cette page est :
  {{ collections.books[0].data.title }}
</p>
```

On utilise généralement les collections dans des boucles afin d'itérer sur
chaque élément de la collection.

```twig
{% for post in collections.books %}
  {{ post.data.title }}
  {{ post.url }}
  {{ post.data.category }}
  {{ post.data.tags }}
  {{ post.date }}
{% endfor %}
```

L'objet `collections` lui, ressemble à ça :

```json
{
  "all": [...],
  "nav": [...],
  "books": [
    {
      "inputPath": "./src/articles/finding-oz.md",
      "outputPath": "_site/articles/finding-oz/index.html",
      "fileSlug": "finding-oz",
      "data": {...},
      "date": "2009-08-07T13:52:12.000Z",
      "url": "/articles/finding-oz/",
      "templateContent": "<p>As with most books ... much about The Wizard of Oz</li>\n</ul>\n",
      "template": {...}
    },
    ...
  ],
  "programming": [...],
}
```

Chaque propriété est un tableau d'[objets d'éléments de
collection](https://www.11ty.dev/docs/collections/#collection-item-data-structure)
(également appelés [objets
modèle](https://www.11ty.dev/docs/collections/#return-values) dans la
documentation).

La collection spéciale `all` représente un tableau de tous les objets page
générés par Eleventy.

| Propriété         | Description                                                                                                                                                                                                                              |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inputPath`       | Chemin vers ce fichier incluant le répertoire source. <hr><code class="phony">./src/articles/finding-oz.md</code>                                                                                                                        |
| `outputPath`      | Chemin du fichier généré. <hr><code class="phony">articles/finding-oz/index.html</code>                                                                                                                                                  |
| `fileSlug`        | Version courte en fonction du nom et de l'emplacement du fichier. [En fonction des règles](https://www.11ty.dev/docs/data/#fileslug). <hr><code class="phony">finding-oz</code>                                                          |
| `data`            | Données du front matter de la page rendue. Les variables globales disponibles pour chaque page.                                                                                                                                          |
| `date`            | La date du fichier au format UTC. [Voir les règles](https://www.11ty.dev/docs/dates/). <hr><code class="phony">2019-01-27T13:52:12.000Z</code>                                                                                           |
| `url`             | Chemin vers le contenu. N'inclus pas le protocole et le nom d'hôte. <hr><code class="phony">/articles/finding-oz/</code>                                                                                                                 |
| `templateContent` | Le contenu généré de la page, n'inclut pas les balises enveloppantes de mise en page.<hr><code class="phony">&lt;p&gt;Comme la plupart des livres ... à propos du Magicien d'Oz&lt;/li&gt;\n&lt;/ul&gt;\n</code>                         |
| `template`        | Toutes sortes de données analysées par le modèle. Des choses comme la configuration d'Eleventy, la configuration du moteur de rendu pour le markdown, et beaucoup de choses sur lesquelles nous ne devrions probablement pas nous baser. |

**Implémentation : Comment un tag devient une collection**

[`getTaggedCollectionsData()`](https://github.com/11ty/eleventy/blob/7cac4ac0b6b99dd79d07ab94d1a443c276fe73db/src/TemplateMap.js#L146-L161) est la fonction qui transforme des tags en collections.

```javascript
async getTaggedCollectionsData() {
let collections = {};
collections.all = this.createTemplateMapCopy(
this.collection.getAllSorted()
);
debug(`Collection: collections.all size: ${collections.all.length}`);

let tags = this.getAllTags();
for (let tag of tags) {
collections[tag] = this.createTemplateMapCopy(
this.collection.getFilteredByTag(tag)
);
debug(`Collection: collections.${tag} size: ${collections[tag].length}`);
}
return collections;
}
```

`getTaggedCollectionsData()` est appelée dans `TemplateMap.cache()` qui est
l'endroit ou Eleventy génère les collections.

## Les collections sur mesure

Outre les collections créées à partir de tags, vous pouvez utiliser la fonction
`addCollection()` dans votre fichier de configuration `.eleventy.js` pour créer
vos propres collections.

Par exemple, voici comment créer une collection nommée `articles` constituée de pages
générées à partir de modèles présents dans le dossier `src/articles/` :

```js
eleventyConfig.addCollection("articles", (collection) =>
  collection
    .getAllSorted()
    .filter(
      (item) =>
        item.url &&
        !item.inputPath.includes("index.njk") &&
        item.inputPath.startsWith("./src/articles/")
    )
);
```

La fonction `addCollection()` prend deux paramètres[^addcollection] :

- le nom de la collection (une chaîne de caractères)
- une fonction qui prend une `collection` en paramètre.

Vous pourriez penser que le paramètre collection est un tableau d'objets de
modèle comme l'objet `collections` basé sur les tags. Ce paramètre est en fait
une instance d'une [`TemplateCollection`][template-collection], qui dérive de
[`Sortable`][sortable-src], et ressemble à ceci :

```json
{
  "items": [
    { ... },
    . . .
    { ... }
  ],
  "sortFunctionStringMap": { ... },
  "sortAscending": true,
  "sortNumeric": false
}
```

La propriété `items` est un tableau de tous les objets de modèle. C'est la même
chose que `collections.all`. Vous ne voulez pas accéder aux éléments directement
en écrivant : `collection.item[n]`.
Utilisez plutôt les [méthodes suivantes][collection-methods] pour accéder aux éléments.

| Méthode                     | Description                                                                                    |
| :-------------------------- | :--------------------------------------------------------------------------------------------- |
| `getAll()`                  | Récupérer tous les éléments dans un ordre spécifique.                                          |
| `getAllSorted()`            | Récupérer tous les éléments dans l'ordre.                                                      |
| `getFilteredByTag(tagName)` | Récupérer tous les éléments qui possèdent un tag spécifique.                                   |
| `getFilteredByGlob(glob)`   | Récupérer tous les éléments dont l' `inputPath` correspond à un ou plusieurs patterns globaux. |

Les éléments sont _presque_ [les mêmes](#elements-collection) que ceux des
collections basées sur des tags, à la différence près que dans les collections
basées sur des tags, les éléments ont une propriété `templateContent`. Dans les
collections créées avec la fonction `addCollection()`, les éléments ont une
propriété `_pages`. Je ne saurais dire pourquoi.

Vous pouvez utiliser `addCollection()` pour créer des collections de pages.
Depuis Eleventy 0.5.3, vous pouvez l'utiliser pour créer des collections ou des
objets de votre choix.

Par exemple, voici comment vous créeriez une collection constituée d'un tableau
de toutes les catégories :

```js
module.exports = function (collection) {
  let catSet = new Set();

  collection
    .getAllSorted()
    .forEach(
      (item) =>
        typeof item.data.category === "string" && catSet.add(item.data.category)
    );

  return [...catSet];
};
```

**Implémentation : Comment sont construites les collections sur mesure**

[`getUserConfigCollectionsData()`](https://github.com/11ty/eleventy/blob/7cac4ac0b6b99dd79d07ab94d1a443c276fe73db/src/TemplateMap.js#L167-L191) est la fonction qui appelle ce qui est retourné par la fonction `addCollection()`.

```javascript
async getUserConfigCollectionsData() {
let collections = {};
let configCollections =
this.configCollections || eleventyConfig.getCollections();
for (let name in configCollections) {
let ret = configCollections[name](this.collection);
// work with arrays and strings returned from UserConfig.addCollection
if (
Array.isArray(ret) &&
ret.length &&
ret[0].inputPath &&
ret[0].outputPath
) {
collections[name] = this.createTemplateMapCopy(ret);
} else {
collections[name] = ret;
}
debug(
`Collection: collections.${name} size: ${collections[name].length}`
);
}
return collections;
}
```

`getUserConfigCollectionsData()` est appelé dans `TemplateMap.cache()` qui est
l'endroit où Eleventy construit les collections.

[sortable-src]: https://github.com/11ty/eleventy/blob/master/src/Util/Sortable.js
[collection-methods]: https://www.11ty.dev/docs/collections/#collection-api-methods
[template-collection]: https://github.com/11ty/eleventy/blob/master/src/TemplateCollection.js

[^addcollection]:
    `addCollection()` ne fait rien d'autre qu'associer la fonction
    qui construit la collection au nom de la collection.
    La fonction qui construit la collection est elle-même appelée plus tard dans
    [`getUserConfigCollectionsData()`](https://github.com/11ty/eleventy/blob/7cac4ac0b6b99dd79d07ab94d1a443c276fe73db/src/TemplateMap.js#L167-L191).