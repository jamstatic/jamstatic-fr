---
title: "Un site web simple avec le plus simple des générateurs de site statique"
date: 2018-01-24T20:40:44+01:00
description: "Présentation d'Eleventy, le générateur de site statique le plus simple et le plus intuitif."
images:
  - /assets/images/2018/01/bird.jpg
source:
  author: "Zach Leat"
  title: "Making a Simple Web Site with the Simplest Static Site Generator, Level 1"
  url: "https://medium.com/@11ty/making-a-simple-web-site-with-the-simplest-static-site-generator-level-1-7fc6febca1"
---

{{% intro %}}
Il existe des centaines de générateurs de site statique et il en arrive toujours de nouveaux. Après avoir longtemps utilisé Jekyll, [Zach Leat](https://www.zachleat.com/web/), développeur front-end chez [Filament Group](https://www.filamentgroup.com/), a décidé de s'inspirer des principes de Jekyll pour les porter et les étendre grâce à l'écosystème de `npm` qu'il manipule au quotidien.

Ce nouveau générateur vise donc les développeurs front end et se propose d'allier la simplicité du langage de templating [Liquid](https://shopify.github.io/liquid/) et la puissance de `npm`. Zach nous propose un premier aperçu de son fonctionnement.
{{% /intro %}}

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

{{% notice info %}}Le code source final de ce tutoriel est [disponible sur GitHub](https://github.com/11ty/giffleball).{{% /notice %}}

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

Créons un liste avec des liens vers nos images GIF dans le fichier `index.html` :

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

### Basons nous sur des données

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

Par défaut dans Eleventy, le moteur du rendu `liquid` est disponible pour les fichiers HTML et les fichiers Markdown. Eleventy supporte une large gamme de moteur de rendu (jetez un œeil sur [la liste complète](https://github.com/11ty/eleventy/#eleventy-)) qui sont disponibles lorsque vous utilisez une extension de fichier spécifique. Par exemple notre fichiers `index.html` aurait pu s'appeler `index.liquid` et le fonctionnement aurait été le même :

```
~/giffleball $ mv index.html index.liquid
~/giffleball $ eleventy --formats=liquid,html,jpg,gif
Writing _site/index.html from ./index.liquid.
Wrote 1 file in 0.07 seconds
```

Bien sûr vous pouvez modifier les paramètres par défaut, nous verrons ça plus
tard (ou vous pouvez dès à présent jeter un œil au fichier
[README](https://github.com/11ty/eleventy/#configuration-optional).

L'utilisation d'un moteur de rendu présente plusieurs avantages :

1.  Modifier vos données au même endroit. Pour changer le titre du site, nous
    n'avons besoin de le modifier qu'à un seul endroit (le front matter) au lieu de  deux. Pour ajouter ou supprimer des images nous n'avons pas à toucher au modèle de code HTML.
2.  Modifier le balisage des liens vers nos images en une fois. Admettons que
    souhaitions modifier le code HTML de notre liste d'images. Comme nous nous basons sur des données, nous pouvons modifier le modèle de code HTML dans notre boucle plutôt que de devoir modifier chaque `<li>` individuellement. Trois passe encore mais vous imaginez si notre site listait 300 images ?
3.  Les caractères spéciaux contenus dans les noms de fichier. Quand je regarde
    dans mon navigateur, on dirait que mon serveur web n'aime pas trop des noms tels que `???.jpg`. Le fichier ne s'affiche pas correctement.
    Que se passerait-il si nos noms de fichiers comportaient des caractères bizarres que notre serveur web ou notre navigateur ne sait pas traiter ? Nous devons les échapper ! La syntaxe du moteur de template Liquid a juste ce qu'il nous faut : [un filtre `url_encode`](https://shopify.github.io/liquid/filters/url_encode/). Mettons notre gabarit à jour pour en bénéficier :

```html
{% for filename in images %}
   <li><a href="img/{{ filename | url_encode }}">{{ filename }}</a></li>
{% endfor %}
```

Ah c'est bien mieux. Ça marche nickel.

### Pour résumer

J'espère que vous vous rendez compte de l'avantage d'utiliser des moteurs de rendu et un générateur de site statique pour vos sites web. Nous verrons prochainement comment utiliser un générateur de site statique avec plusieurs gabartis de mise en page. Plus précisements, comment séparer vos modèles de fichiers HTML et votre contenu et comment utiliser des fichiers de données externes (qui s'accomodent très bien avec du front matter pour générer facilement vos données au travers de plusieurs gabarits de page).

À suivre donc…
