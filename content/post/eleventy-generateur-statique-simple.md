---
title: "Un site web simple avec le plus simple des générateurs de site statique"
date: 2018-01-24T20:40:44+01:00
description: "Présentation d'Eleventy, le générateur de site statique le plus simple et le plus intuitif."
categories:
  - eleventy
images:
  - https://cdn-images-1.medium.com/max/800/1*u1v8ojapeWAgL2xjaJZ5rA.png
source:
  author: "Zach Leat"
  title: "Making a Simple Web Site with the Simplest Static Site Generator, Level 1"
  url: "https://medium.com/@11ty/making-a-simple-web-site-with-the-simplest-static-site-generator-level-1-7fc6febca1"
---

{{% intro %}}
Il existe des centaines de générateurs de site statique et il en arrive toujours de nouveaux. Après avoir longtemps utilisé Jekyll, [Zach Leat](https://www.zachleat.com/web/), développeur front-end chez [Filament Group](https://www.filamentgroup.com/), a décidé de s'inspirer des principes de Jekyll pour les porter et les étendre grâce à l'écosystème de `npm` qu'il manipule au quotidien.

Ce nouveau générateur vise donc les développeurs front end et leur donne le choix du langage de templating ([Liquid](https://shopify.github.io/liquid/) par défaut comme dans Jekyll et aussi [tout plein d'autres qu'on peut mélanger à loisir](https://github.com/11ty/eleventy/#eleventy-) bien connus des développeurs JS) tout en leur offrant la puissance de `npm`. Zach nous propose un premier aperçu de son fonctionnement.
{{% /intro %}}

{{< figure src="https://cdn-images-1.medium.com/max/800/1*u1v8ojapeWAgL2xjaJZ5rA.png" caption="" attr="Credits: https://unsplash.com/@jogi" attrlink="https://unsplash.com/photos/uCsJqqtkDps" >}}

Voici [Eleventy](https://github.com/11ty/eleventy/), le générateur de site statique le plus simple et le plus intuitif. Avec Eleventy, vous pouvez généréer des sites à partir de données de manière simple et rapide — et vous concentrer sur un contenu facile à maintenir, conçu pour durer longtemps. **Faites en sorte que votre site dure 10 ans, pas 10 mois.**

### Installation

1.  Si ce n'est pas déjà fait, [installez node.js et
    npm](https://docs.npmjs.com/getting-started/installing-node) (ils sont dispos sous la forme d'un seul et unique paquet).
    Eleventy ne fonctionne qu' à partir de `node --version` 8.0.0 ou plus.
2.  Ensuite, installez l'utilitaire en ligne de commande, disponible sur
    [npm](https://www.npmjs.com/package/@11ty/eleventy) : `npm install -g @11ty/eleventy`

### En avant

Faisons un site web pour notre collection d'images GIF. Une interface pour notre propre domaine [bukk.it](https://bukk.it/).
Appelons-ça _Giffleball_.

{{% notice info %}}Le code source de la première partie de ce tutoriel est [disponible sur GitHub](https://github.com/11ty/giffleball).{{% /notice %}}

#### Création des fichiers

Créeons un dossier pour notre tout nouveau site web. (`~ $ ` ne fait pas partie de la commande à lancer)

```
~ $ mkdir giffleball
```

Ajoutons quelques images à notre site. Voici une sélection d'images d'oiseaux tirée de l'honorable site [bukk.it](https://bukk.it).

{{< figure src="https://bukk.it/%e2%80%a6.jpg" caption="" attr="https://bukk.it/parrot.gif" attrlink="https://bukk.it/%e2%80%a6.jpg" >}}

{{< figure src="https://bukk.it/%3f%3f%3f.jpg" caption="" attr="https://bukk.it/parrot.gif" attrlink="https://bukk.it/%3f%3f%3f.jpg" >}}

{{< figure src="https://bukk.it/parrot.gif" caption="" attr="https://bukk.it/parrot.gif" attrlink="https://bukk.it/parrot.gif" >}}

Sauvegardez ces images dans un dossier `img` à l'intérieur de notre répertoire `giffleball`.

```sh
giffleball/
  img/???.jpg      (nouveau)
  img/….jpg        (nouveau)
  img/parrot.gif   (nouveau)
```

#### Création d'un gabarit de page

Faisons un gabarit de page ! Créez un fichier nommé `index.html` dans le répertoire `giffleball`.

```sh
giffleball/
  index.html       (nouveau)
  img/???.jpg
  img/….jpg
  img/parrot.gif
```

Créons une liste avec des liens vers nos images GIF dans le fichier `index.html` :

```html
<!doctype html>
<html lang="en">
 <head>
  <meta charset="utf-8">
  <title>Giffleball</title>
 </head>
 <body>
  <h1>Giffleball</h1>
  <ul>
   <li><a href="img/???.jpg">???.jpg</a></li>
   <li><a href="img/….jpg">….jpg</a></li>
   <li><a href="img/parrot.gif">parrot.gif</a></li>
  </ul>
 </body>
</html>
```

Jusqu'ici, rien d'extraordinaire. Mais nous pouvons déjà lancer `eleventy` et générer notre site. Nous passerons en option les extensions de fichier que nous voulons voir `eleventy` traiter :

```sh
~ $ cd giffleball
~/giffleball $ eleventy --formats=html,gif,jpg
Writing _site/index.html from ./index.html.
Wrote 1 file in 0.07 seconds
```

Cela a pour effet de créer un nouveau site web dans le répertoire `_site`. Si vous souhaitez que le site soit généré dans un autre dossier, précisez le nom du répertoire en argument avec l'option `--output` :

```sh
~/giffleball $ eleventy --output=ailleurs
Writing ailleurs/index.html from ./index.html.
Wrote 1 file in 0.07 seconds
```

### Basons-nous sur des données

OK, jusqu'ici nous aurions simplement pu charger notre fichier `index.html` dans le navigateur et le résultat aurait été le même. Il n'y a aucune différence en entrée et en sortie. Ajoutons donc un petite touche `eleventy`. Déplaçons certaines données de la page dans notre [front matter](https://jekyllrb.com/docs/frontmatter/) :

```markdown
---
siteTitle: Giffleball
images:
  - ???.jpg
  - ….jpg
  - parrot.gif
---
<!doctype html>
<html lang="en">
 <head>
  <meta charset="utf-8">
  <title>{{ siteTitle }}</title>
 </head>
 <body>
  <h1>{{ siteTitle }}</h1>
  <ul>
  {% for filename in images %}
     <li><a href="img/{{ filename }}">{{ filename }}</a></li>
  {% endfor %}
  </ul>
 </body>
</html>
```

Nous avons ajouté le titre du site (utilisé à deux endroits) ainsi que la liste des images dans notre front matter.

Par défaut dans Eleventy, le moteur du rendu `liquid` est disponible pour les fichiers HTML et les fichiers Markdown. Eleventy supporte une large gamme de moteurs de rendu (jetez un œil sur [la liste complète](https://github.com/11ty/eleventy/#eleventy-)) qui sont disponibles lorsque vous utilisez une extension de fichier spécifique. Par exemple notre fichier `index.html` aurait pu s'appeler `index.liquid` et le fonctionnement aurait été le même :

```
~/giffleball $ mv index.html index.liquid
~/giffleball $ eleventy --formats=liquid,html,jpg,gif
Writing _site/index.html from ./index.liquid.
Wrote 1 file in 0.07 seconds
```

Bien sûr vous pouvez modifier les paramètres par défaut, nous verrons ça plus
tard (ou vous pouvez dès à présent jeter un œil au fichier
[README](https://github.com/11ty/eleventy/#configuration-optional)).

L'utilisation d'un moteur de rendu présente plusieurs avantages :

1.  Modifier vos données au même endroit. Pour changer le titre du site, nous
    n'avons besoin de le modifier qu'à un seul endroit (le front matter) au lieu de  deux. Pour ajouter ou supprimer des images nous n'avons pas à toucher au modèle de code HTML.
2.  Modifier le balisage des liens vers nos images en une fois. Admettons que
    souhaitions modifier le code HTML de notre liste d'images. Comme nous nous basons sur des données, nous pouvons modifier le modèle de code HTML dans notre boucle plutôt que de devoir modifier chaque `<li>` individuellement. Trois passent encore mais vous imaginez si notre site listait 300 images ?
3.  Les caractères spéciaux contenus dans les noms de fichier. Quand je regarde
    dans mon navigateur, on dirait que mon serveur web n'aime pas trop des noms tels que `???.jpg`. Le fichier ne s'affiche pas correctement.
    Que se passerait-il si nos noms de fichiers comportaient des caractères bizarres que notre serveur web ou notre navigateur ne sait pas traiter ? Nous devons les échapper ! La syntaxe du moteur de template Liquid a juste ce qu'il nous faut : [un filtre `url_encode`](https://shopify.github.io/liquid/filters/url_encode/). Mettons notre gabarit à jour pour en bénéficier :

```html
{% for filename in images %}
   <li><a href="img/{{ filename | url_encode }}">{{ filename }}</a></li>
{% endfor %}
```

Ah c'est bien mieux. Ça marche nickel.

J'espère que vous vous rendez compte de l'avantage d'utiliser des moteurs de rendu et un générateur de site statique pour vos sites web.

{{% notice info %}}Le code source de la deuxième partie de ce tutoriel est [disponible sur GitHub](https://github.com/11ty/giffleball/tree/level-2).{{% /notice %}}

### Ajoutons un filtre

Faisons un truc plus compliqué. Affichons la taille de chacune des images GIF à côté de leur lien. Nous pouvons faire ça à l'aide d'un filtre. Les filtres s'ajoutent dans le fichier de configuration - un fichier `.eleventy.js` — créons en un. Il devrait ressembler à ça :

```js
module.exports = (function(eleventyConfig) {

});
```

Si vous ne le nommez pas `.eleventy.js`, chaque fois que vous allez lancer la commande `eleventy` il faudra lui passer le nom du fichier de configuration en option à l'aide de `--config=maConfig.js`. C'est bien plus simple de s'en tenir au nom par défaut.

Ajoutons notre filtre à l'aide de la méthode `.addFilter`. Appelons-le `filesize` et commençons par lui faire retourner un texte tout bête :

```js
module.exports = (function(eleventyConfig) {
 eleventyConfig.addFilter("filesize", function(path) {
  return "0 KB";
 });
});
```

Bien entendu, notre filtre n'est pas bon car nous nous contentons de retourner `"0 KB"` à chaque fois. Mais vérifions d'abord qu'il marche.

Ouvrons notre modèle `index.html` et regardons à quoi ressemble notre boucle pour le moment :

```html
<ul>
{% for filename in images %}
 <li><a href="img/{{ filename | url_encode }}">{{ filename }}</a></li>
{% endfor %}
</ul>
```

Vous avez fait attention à comment on a utilisé le filtre natif `url_encode` fourni par le moteur de rendu Liquid ? Maintenant que nous avons crée le notre, ajoutons un appel à notre petit filtre maison, comme ceci :

```html
<ul>
{% for filename in images %}
{% capture path %}img/{{ filename }}{% endcapture %}
 <li><a href="img/{{ filename | url_encode }}">{{ filename }}</a> {{ path | filesize }}</li>
{% endfor %}
</ul>
```

Bien entendu, la magie a lieu dans `{{ path | filesize }}`. Mais notez comment nous utilisons la balise `{% capture %}` de Liquid pour créer une nouvelle variable `path` avec Liquid, que nous passons ensuite à notre filtre.

Maintenant, lançons `eleventy` pour générer les fichiers.

```sh
~/giffleball $ eleventy --formats=html,gif,jpg
Writing _site/index.html from ./index.html.
Wrote 1 file in 0.07 seconds
```

Cela va générer le code suivant dans le fichier `_site/index.html` (ici nous ne montrons que le rendu de la liste et pas le fichier HTML entier pour faire court):

```html

<ul>

<li><a href="img/%3F%3F%3F.jpg">???.jpg</a> 0 KB</li>

<li><a href="img/%E2%80%A6.jpg">….jpg</a> 0 KB</li>

<li><a href="img/parrot.gif">parrot.gif</a> 0 KB</li>

</ul>

```

OK, c'est presque ça — mais c'est quoi tous ces espacements ? *(Notez que c'est une question purement rhetorique à laquelle je vais m'empresser de répondre tout de suite.)*
Lors du traitement des modèles, Liquid ne supprime pas les retours à la ligne et les espaces autours des balises Liquid. Heureusement pour nous, Liquid fournit un outil pour contrôler ces espacements. Il faut utiliser `{%-` à la place de `{%` pour supprimer l'espacement avant la balise Liquid. Et indépendamment on peut aussi utiliser `-%}` à la place de  `%}` à la fin pour supprimer l'espace après la balise Liquid. L'un ou l'autre. Les deux. Personnellement je trouve que ça rend mieux avec juste `{%-` au début. Il est important pour moi d'avoir une vue du code source qui soit propre, alors nettoyons tout ça :

```liquid
<ul>
 {%- for filename in images %}
 {%- capture path %}img/{{ filename }}{% endcapture %}
 <li><a href="img/{{ filename | url_encode }}">{{ filename }}</a> {{ path | filesize }}</li>
 {%- endfor %}
</ul>
```

Ce qui produit :

```html
<ul>
 <li><a href="img/%3F%3F%3F.jpg">???.jpg</a> 0 KB</li>
 <li><a href="img/%E2%80%A6.jpg">….jpg</a> 0 KB</li>
 <li><a href="img/parrot.gif">parrot.gif</a> 0 KB</li>
</ul>
```

Magnifique.

### C'est encore un peu tôt pour nous réjouir, notre filtre n'est pas fini

OK, faisons en sorte que notre filtre serve à quelque chose plutôt que de simplement retourner systèmatiquement
`"0 KB"`. Modifiez votre fichier `.eleventy.js` comme ceci :

```js
const fs = require("fs");

module.exports = (function(eleventyConfig) {
 eleventyConfig.addFilter("filesize", function(path) {
 let stat = fs.statSync(path);
 if( stat ) {
 return (stat.size/1024).toFixed(2) + " KB";
 }
 return
                                  "";
 });
});
```

C'est la manière la plus simple de le faire marcher, ça n'ajoute aucune nouvelle dépendance lors d'un `npm install`.

### Allons plus loin à l'aide de NPM

Un des gros avantages d'Eleventy sur d'autres générateurs de site statique comme Jekyll ou Hugo, c'est l'accès à tout l'écosystème de NPM. Il y a tellement d'excellents modules. Si vous êtes assez courageux pour jouer avec `npm`, lancez cette commande pour générer un fichier `package.json` pour notre projet :

```
~/giffleball $ npm init -f
```

Nous pouvons maintenant installer des modules cools à notre projet, comme [file-size pour des tailles de fichiers plus lisibles](https://www.npmjs.com/package/file-size).

```
~/giffleball $ npm install --save file-size
+ file-size@1.0.0
added 1 package in 1.491s
```

Utlisons-le pour coder notre filtrer dans le fichier `.eleventy.js`:

```js
const fs = require("fs");
const filesize = require("file-size");

module.exports = (function(eleventyConfig) {
 eleventyConfig.addFilter("filesize", function(path) {
  let stat = fs.statSync(path);
  if( stat ) {
   return filesize(stat.size).human();
  }
  return "";
 });
});
```

Ce qui nous donne :

```html
<ul>
 <li><a href="img/%3F%3F%3F.jpg">???.jpg</a> 44.52 KiB</li>
 <li><a href="img/%E2%80%A6.jpg">….jpg</a> 55.39 KiB</li>
 <li><a href="img/parrot.gif">parrot.gif</a> 2.05 KiB</li>
</ul>
```

Félicitations ! Vous avez ajouté un filtre et tiré profit du vaste et immense écosystème NPM.

J'espère que vous appréciez la puissance offerte par l'utilisation de filtres dans nos fichiers de gabarits. Ils peuvent transformer des contenus simples à l'aide de la puissance de l'écosystème NPM.

#### À suivre

Dans la prochaine partie nous verrons comment faire marcher ensemble plusieurs fichiers de gabarits avec des fichiers de mise en page et des fichiers de données externes.
