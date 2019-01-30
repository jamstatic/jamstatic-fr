---
title: "Les collections dans Eleventy"
date: 2019-01-29T08:54:22+01:00
description: Les collections sont un concept central dans Eleventy.
draft: true
categories:
  - eleventy
source:
  author: Philip Borenstein
  title: Working with Collections
  url: https://www.pborenstein.com/articles/collections/
---



Eleventy uses `collections` to group posts according to various criteria. A
collection might consist of articles in a series. Another collection could be of
posts about books. A third could be all the posts in a particular directory.

Eleventy gives you two ways to create collections:

- [implicitly](#tag-based-collections), with tags in the front matter
- [explicitly](#custom-collections), with `addCollection()`

## Tag-based collections

Pages that share a tag are in the same collection. A template with the following
front matter would generate pages in the collections `books` and `reviews`.

``` liquid
{%- raw -%}
---
title: Finding Oz
category: Culture
tags:
- books
- reviews
---
. . .
{% endraw %}
```

Within a template collections are accessed by name as properties of the global
`collections` object.

``` liquid
{% raw %}
<p>
  The title of this page is:
  {{ collections.books[0].data.title }}
</p>
{% endraw %}
```

Collections are usually used in loops to iterate over each item in the
collection.

``` liquid
{% raw %}
{% for post in collections.books %}
  {{ post.data.title }}
  {{ post.url }}
  {{ post.data.category }}
  {{ post.data.tags }}
  {{ post.date }}
{% endfor %}
{% endraw %}
```


The `collections` object itself looks like this:


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

Each property is an array of [collection item objects][collection-data] (the doc
also calls them [template objects](https://www.11ty.io/docs/collections/#return-values)).

The special collection `all`  is an array of all of the page objects that
Eleventy generates.

[collection-data]: https://www.11ty.io/docs/collections/#collection-item-data-structure


<div class="mdhack" id="collection-items"></div>

| Property          | Description           |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inputPath`       | Path to this file including the `input` directory.<hr><code class="phony">./src/articles/finding-oz.md</code>                                                               |
| `outputPath`      | Path to the rendered file.<hr><code class="phony">articles/finding-oz/index.html</code>                                                                                     |
| `fileSlug`        | Short name from the file name. [There are rules](https://www.11ty.io/docs/data/#fileslug). <hr><code class="phony">./src/articles/finding-oz.md</code>                      |
| `data`            | Data from the front matter of the rendered page. The global variables available to each page.                                                                               |
| `date`            | The date of this file in UTC. [There are rules](https://www.11ty.io/docs/dates/). <hr><code class="phony">2009-08-07T13:52:12.000Z</code>                                   |
| `url`             | Path to this content. Doesn't include protocol or host. <hr><code class="phony">/articles/finding-oz/</code>                                                                |
| `templateContent` | The rendered content, not including any layout wrappers.<hr><code class="phony">&lt;p&gt;As with most books ... much about The Wizard of Oz&lt;/li&gt;\n&lt;/ul&gt;\n</code>|
| `template`        | All sorts of data parsed out of the template. Things like the Eleventy configuration, markdown engine setup, and lots of stuff we probably shouldn't rely on.               |

[<div class="table-caption">collection item properties</div>]

<details style="margin-top: 1em">
<summary>
Implementation: How a tag becomes a collection
</summary>

[`getTaggedCollectionsData()`](https://github.com/11ty/eleventy/blob/7cac4ac0b6b99dd79d07ab94d1a443c276fe73db/src/TemplateMap.js#L146-L161)
is the function that turns tags into collections.

``` js/9-10
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

`getTaggedCollectionsData()` gets called
in `TemplateMap.cache()` which is where
Eleventy builds the collections.
</details>

## Custom Collections

In addition to the collections built from tags, you can use `addCollection()` in
your `.eleventy.js` configuration file to create your own collections.

For example, this is how to create a collection called `articles` made up of
pages generated from templates in the directory `src/articles/`:

```js
eleventyConfig.addCollection("articles",
  collection => collection
    .getAllSorted()
    .filter(item => item.url
                 && ! item.inputPath.includes('index.njk')
                 && item.inputPath.startsWith('./src/articles/')))
```

`addCollection()` takes two arguments:[^addcollection]
- the name of the collection (a string)
- a function that takes a `collection` as an argument.

[^addcollection]: `addCollection()` doesn't actually
  do anything other than to associate the collection-building
  function with the collection name. The collection-building
  function itself is called later
  in
  [`getUserConfigCollectionsData()`](https://github.com/11ty/eleventy/blob/7cac4ac0b6b99dd79d07ab94d1a443c276fe73db/src/TemplateMap.js#L167-L191).

      ```js
      addCollection(name, callback) {
        name = this.getNamespacedName(name);

        if (this.collections[name]) {
          throw new UserConfigError(
            `config.addCollection(${name}) already exists. Try a different name for your collection.`
          );
        }

        this.collections[name] = callback;
      }
      ```


You might think that the `collection` parameter is an array of template objects
like the tag-based `collections` object. Instead, this parameter is an instance
of a [`TemplateCollection`][template-collection], which is derived from from
[`Sortable`][sortableSrc], and looks like this:

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

Its `items` property is an array of all the template objects. It's the same as
`collections.all`. You don't want to access the items directly like this:
`collection.item[n]`. Instead use the [following methods][collection-methods] to
get the items.

[sortableSrc]: https://github.com/11ty/eleventy/blob/master/src/Util/Sortable.js
[collection-methods]: https://www.11ty.io/docs/collections/#collection-api-methods
[template-collection]: https://github.com/11ty/eleventy/blob/master/src/TemplateCollection.js

| Method                        | Description                                                                |
| :---------------------------- | :------------------------------------------------------------------------- |
| `getAll()`                    | Gets all of the items in arbitrary order.                                  |
| `getAllSorted()`              | Gets all of the items in order.                                            |
| `getFilteredByTag(tagName)` | Get all of the items with a specific tag.                                  |
| `getFilteredByGlob(glob)`   | Gets all of the items whose `inputPath` matches one or more glob patterns. |
[<div class="table-caption">collection api methods</div>]

The items are almost [the same](#collection-items) as the ones
in the tag-based collections.
In tag-based collections, items have `templateContent`.
In `addCollection()` collections, items have `_pages`.
I don't know why.

You can use `addCollection()` to create
collections of pages. Since Eleventy 5.0.3,
you can use it to create collections
or arbitrary objects.

For instance, this is how you'd make a collection
that consists of an array of all the
category properties:

```json
module.exports = function(collection) {
  let catSet = new Set()

  collection.getAllSorted().forEach(item =>
        typeof item.data.category === "string"
    &&  catSet.add(item.data.category))

  return [...catSet]
};

```

<details style="margin-top: 1em" id=getUserConfigCollectionsData>
<summary>
Implementation: How custom collections get built
</summary>

[`getUserConfigCollectionsData()`](https://github.com/11ty/eleventy/blob/7cac4ac0b6b99dd79d07ab94d1a443c276fe73db/src/TemplateMap.js#L167-L191)
is the function that calls `addCollection()`'s callback.

```js/5
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

`getUserConfigCollectionsData()` gets called in `TemplateMap.cache()` which is
where Eleventy builds the collections.
</details>
