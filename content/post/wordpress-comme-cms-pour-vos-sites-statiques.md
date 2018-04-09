---
title: "Utiliser WordPress comme CMS pour vos sites statiques"
date: 2018-01-09T15:50:46+01:00
description: "Grâce à son API REST WordPress fait aussi CMS headless. Stefan Baumgartner montre comment récupérer les contenus pour générer un site statique avec Metalsmith."
author:
categories:
  - jamstack
  - headless
keywords:
  - wordpress
  - cms
  - headless
source:
  author: "Stefan Baumgartner"
  title: "WordPress as CMS for your JAMStack sites"
  url: https://fettblog.eu/wordpress-and-jamstack-sites/
---

{{% intro %}}
La mode est au [CMS headless]({{< relref "cms-headless.md" >}}), comprenez au
découplage du back et du front. WordPress n'échappe pas à la règle. Même si son
API REST ne permet pas encore de faire tout ce qu'on voudrait, il est tout à
fait possible d’aller récupérer les contenus entrés par les utilisateurs dans
l’interface d’administration qu'ils affectionnent tant pour ensuite les passer à
la moulinette d’un générateur de site statique. Stefan Baumgartner a testé pour
vous avec [Metalsmith](http://www.metalsmith.io/), voici comment il a procédé.
{{% /intro %}}

La toute-puissante [JAMStack]({{< relref "5-raisons-de-tester-la-jamstack.md" >}})
offre des sites web statiques rapides et sécurisés, et avec des systèmes de
gestion de contenu [headless]({{< relref "cms-headless.md" >}}) ils deviennent
même faciles à éditer ! Toutefois il peut arriver que de temps à autre, vous
vous retrouviez devant un blog WordPress avec tellement d’articles (et d’auteurs
qui ont peur du changement !) pour que la raison vous pousse à ne pas le migrer.
Mais WordPress aussi fonctionne en headless. D'ailleurs, le propre service
d’hébergement de WordPress communique avec le core de WordPress uniquement au
travers de son API, l’interface d’édition fait partie de la toute nouvelle et
belle application [Calypso](https://developer.wordpress.com/calypso/).

Un des gros avantages quand on utilise un générateur de site statique, c'est que
généralement il se moque de la provenance de votre contenu. Utilisons donc
[l’attrayante API REST de WordPress](http://v2.wp-api.org/) pour récupérer un
peu de contenu et générer des sites statiques !

Dans mon exemple, j'utilise le générateur de site statique
[Metalsmith](http://www.metalsmith.io/). C’est juste car je travaille avec au
quotidien et qu'il est assez simple de faire tourner de nouveaux plugins dessus.
Mais ça marche aussi avec [les générateurs de
Jekyll](https://jekyllrb.com/docs/plugins/#generators) par exemple. Du moment
que votre générateur sait comment utiliser des fichiers JSON pour les données en
entrée, vous pouvez utiliser les exemples de code ci-dessous pour stocker ce qui
est retourné dans l’étape de préparation des données. C’est parti !

## L'API WordPress

Chaque installation de WordPress possède une API JSON à part entière. Ça veut
dire que vous pouvez accéder aux articles et aux pages via des URLs. Ça m'a tout
l’air d’un CMS headless ça ! Si vous avez une instance de WordPress qui tourne
quelque part, ajoutez `/wp-json/wp/v2/posts` à la fin de l’URL principale. Vous
devriez avoir quelque chose en sortie !

En fait les 10 derniers articles ainsi que toutes leurs métadonnées vous sont
présentés dans un format JSON facile à comprendre.

### Récupérer les informations sur l’auteur

Vous remarquerez d’emblée que le champ `author` de chaque article est un nombre.
C’est ainsi que les données sont structurées dans WordPress. Il faudrait que
vous alliez chercher le numéro dans la table des auteurs et WordPress ne propose
pas une URL d’API pour cela.

Toutefois, vous pouvez activer l’option masquée par défaut `_embed` qui va
ajouter toutes les données relatives à l’auteur.

Donc avec `https://url-vers-votre-blog/wp-json/wp/v2/posts?_embed` vous avez
toutes les données dont vous avez besoin !

### Récupérer tous les articles

Si vous avez un nombre très important d’articles, le prochain défi sera de les
récupérer tous. Malheureusement ce ne sera peut-être pas possible en une seule
requête. Vous pouvez maximiser le nombre d’articles retournés à 100 en ajoutant
le paramètre supplémentaire `per_page` :

```
https://url-vers-votre-blog/wp-json/wp/v2/posts?_embed&per_page=100
```

Ensuite, il va falloir récupérer les informations de pagination. Il existe un
paramètre `page` qui permet de sélectionner la page que vous souhaitez
récupérer. Vous avez la possibilité de l’utiliser récursivement pour récupérer
toutes les pages qui existent. Vous pouvez également vérifier les entêtes HTTP
personnalisés de WordPress pour connaître le nombre de pages à récupérer. Ici,
c'est comme ça que je vais procéder. Gardez juste en tête que les paramètres
CORS de votre serveur doivent autoriser le passage de ces entêtes à votre
client. L'entête personnalisé qui contient le nombre de pages est
`X-WP-TotalPages`.

Pour télécharger les données, j'utilise
[isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch), qui fournit
la même API `fetch` pour Node et pour le navigateur. Regardons tout ça :

```js
const fetch = require('isomorphic-fetch');

const mainURL = 'http://chemin-vers-votre-blog';
const apiURL = '/wp-json/wp/v2/posts';
const url = `${mainURL}${apiURL}?_embed&per_page=100`;

fetch(url)                                        /* 1 */
  .then(res => {
    const noPages =
      res.headers.get('X-WP-TotalPages');         /* 2 */
    const pagesToFetch = new Array(noPages - 1)
      .fill(0)
      .map((el, id) =>
        fetch(`${url}&page=${id+2}`));            /* 3 */
    return Promise.all([res, ...(pagesToFetch)]); /* 4 */
  })
  .then(results =>
     Promise.all(results.map(el => el.json())))   /* 5 */
  .then(pages => [].concat(...pages))             /* 6 */
```

1.  Nous téléchargeons les 100 premiers articles de notre blog.
    Si notre blog WordPress contient moins de 100 articles, nous n'avons plus rien à télécharger.
2.  L'entête `X-WP-TotalPages` nous indique combien il nous
    reste de pages à télécharger.
3.  Nous créons un tableau de promesses pour les pages à télécharger,
    nous commençons à la page 2 (la page 1 a déjà été téléchargée)
4. `Promise.all` nous permet de passer le premier résultat et tous les suivants
    issus de notre tableau `pagesToFetch`.
5.  Appel de promesse suivant : convertir tous les résultats en JSON.
6.  Et enfin nous convertissons tous nos résultats dans un seul et unique tableau
    qui contient toutes les données des articles de notre blog.

L'appel `.then` suivant contiendra un tableau avec toutes les entrées du blog.
Vous pouvez stocker ces données sous forme de fichier JSON (si votre générateur
de site n'est pas extensible) ou dans notre cas : créer une vraie page de
données que nous voulons générer.

## Ajouter vos articles dans Metalsmith

Metalsmith — comme beaucoup de générateurs de sites statiques — sait quel est le
dossier qui contient vos fichiers source. La plupart du temps au format
Markdown. Ces fichiers sont ensuite convertis en HTML. Toutefois, Metalsmith
permet aussi d’ajouter des données externes. Il est assez simple de manipuler
les tableaux de fichiers et d’ajouter de nouveaux fichiers. La seule chose à
savoir c'est que chaque fichier doit posséder une clef unique : l’URL ou le
chemin où il va être stocké. Le contenu de chaque entrée est un objet qui
contient toutes les données que vous souhaitez stocker.
Regardons tout ça !

### Un plugin WordPress pour Metalsmith

Metalsmith fonctionne avec des plugins. À chaque fois que vous lancez une génération avec Metalsmith, il va appliquer tous les plugins que vous avez définis, un peu comme avec Gulp.

Réutilisons l’exemple de code précédent et améliorons-le pour en faire un plugin Metalsmith :

```js
const { URL } = require('url’);

const wordpress = (url) => (files, smith, done) => { /* 1 */
  fetch(url)
    /* … include code from above …*/
    .then(allPages => {
      allPages.forEach(page => {
        const relativeURL
          = new URL(page.link).pathname;             /* 2 */
        const key = `./${relativeURL}/index.html`;
        let value = page;                            /* 3 */
        value.layout = 'post.hbs';
        value.contents =
          new Buffer(page.content.rendered, 'utf8');
        files[key] = value;                          /* 4 */
      });
      done();                                        /* 5 */
    });
}
```

1.  L'interface pour les plugins Metalsmith est `(files, metalsmith, done)`. Le
    premier paramètre désigne l’ensemble des fichiers qui doivent être transformés
    en HTML. Le deuxième paramètre est l’objet Metalsmith. Le troisième paramètre
    est une fonction de callback. C’est particulièrement utile pour les opérations
    asynchrones. Appelez `done` lorsque votre plugin a fini son travail.
2.  Une fois que nous avons tous les articles à partir des appels à l’API (voir
    ci-dessus), nous avons transformé quelque peu les données. D'abord, nous devons
    modifier les permaliens de WordPress pour que Metalsmith puisse s'y retrouver.
    Nous utilisons le package `URL` de Node pour récupérer l’URL relative (sans le nom
    de domaine) et à partir de cela nous créons un chemin relatif dans le système
    de fichier. Vous remarquerez que nous ajoutons `index.html`. De cette manière
    nous créons tout un tas de dossiers avec un seul fichier HTML dedans.
    Nous obtenons ainsi de belles URLs pour nos sites statiques.
3.  Ensuite, nous créons des paires clé-valeur pour l’objet fichier. Chaque valeur
    correspond à une entrée dans le tableau `post` que nous avons récupéré plus tôt.
    Nous précisons ensuite le gabarit à utiliser et indiquons le contenu (le
    plugin `metalsmith-layouts` a besoin de ces deux valeurs pour fonctionner).
4.  Après ça, nous stockons cette valeur dans le chemin relatif que nous avons défini plus tôt.
5.  Une fois qu'on a fait ça pour tous les articles, nous appelons la fonction de
    callback `done` pour indiquer la fin du traitement par nos plugins.

Parfait. En quelques lignes de code nous avons dit à Metalsmith d’étendre les
fichiers qu'il transforme déjà avec les fichiers que nous récupérons à partir
d’une API. C’est ce qui rend Metalsmith extrêmement puissant, car vous n'êtes
plus lié à un seul et unique CMS. Vous pouvez même vous brancher sur différents
systèmes de gestion de contenu, récents ou plus anciens, et ne produire qu'un
seul fichier en sortie. Trop bien !

### Script de génération pour Metalsmith

Nous voulons pouvoir utiliser notre nouveau plugin de manière très simple lors
de l’enchaînement des traitements par Metalsmith. Nous ne faisons appel qu'au plugin
_layouts_ qui va générer un contenu un peu plus sémantique à partir de nos fichiers
Handlebars.

```js
const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');

/** le plugin  **/

Metalsmith('.')
  .use(wordpress(apiURL))
  .use(layouts({
    engine: 'handlebars'
  }))
  .source('./source')
  .destination('./build’)
  .build((err) => {
    if (err) throw err;
    console.log('Finished’);
  });
```

On commence d’abord par récupérer toutes les données depuis l’API WordPress,
puis on les fait passer dans le plugin `metalsmith-layouts`. Puis on lance la
génération à proprement parlé. Si vous exécutez ce fichier, vous verrez qu'il
génère un dossier `build` dans votre système de fichier.

### Gabarit de page

Le fichier de gabarit est un fichier Handlebars qui définit une structure HTML de base.
`contents` fait référence au champ que nous avons défini plus tôt dans notre plugin Metalsmith pour WordPress. Le reste vient directement de l’objet et intègre automatiquement les données de `_embedded` l’auteur. C’est tout simple :

```handlebars
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{title.rendered}}</title>
</head>
<body>
  <h1>{{title.rendered}}</h1>
  {{{contents}}}

  <aside>
    by {{_embedded.author.0.name}}
  </aside>
</body>
</html>
```

## Étape suivante

Excellent ! Après m'être familiarisé avec l’API de WordPress, avoir récupéré
tous les contenus, créer des sites statiques à partir des données a été un jeu
d’enfant. J'ai créé un [dépôt à valeur d’exemple sur
GitHub](https://github.com/ddprrt/metalsmith-wordpress-sample). Dites-moi ce que
vous en pensez.

L'étape suivante serait de créer un petit plugin WordPress (un vrai avec du PHP
et tout) qui utilise le hook de publication pour activer automatiquement votre
système d’intégration continue. Mais vu la richesse de l’écosystème de
WordPress, il se pourrait bien de quelque chose de ce genre existe déjà.

Un commentaire ? [Envoyez un tweet](https://twitter.com/ddprrt) !
