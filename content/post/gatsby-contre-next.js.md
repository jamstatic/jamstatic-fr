---
title: Gatsby contre Next.js
date: 2020-10-03
lastmod: 2020-10-03T21:12:22+02:00
description: Une illustration du surcoût de la complexité engendré par Gatsby sur un site
  statique par rapport au framework React Next.js
author: Frank Taillandier
categories:
- gatsby
- nextjs
images:
- "/assets/images/"
source:
  author: Jared Palmer
  title: Gatsby vs. Next.js
  url: https://jaredpalmer.com/gatsby-vs-nextjs
  lang: en
aliases: []
canonical_url: https://jaredpalmer.com/gatsby-vs-nextjs
---

{{< intro >}}
Gatsby n'a pas toujours bonne presse, surtout quand il s'agit de développer des sites statiques plutôt simples avec une seule source de données. Le retour d'expérience de [Jared Palmer](https://jaredpalmer.com), le créateur de Formik et de Razzle en est une bonne illustration. À l'opposé [NextJS](https://nextjs.org) 9 propose le juste niveau d'abstraction nécessaire pour générer des sites statiques à partir du système de fichiers, tout en continuant d'utiliser React pour le développement par composition.
{{< /intro >}}

---

Ces derniers mois, j'ai migré autant de code que possible hors de Gatsby. Bien que je comprenne parfaitement pourquoi certaines personnes soient attirées par Gatsby et son écosystème grandissant, de mon côté je me suis résolu à arrêter de siroter du Tang à la paille. Bien que Next.js ne soit pas parfait non plus, il procure une meilleure abstraction au dessus de Webpack, qui est plus qu'adéquate pour une grande majorité de projets.

Dans cet article je partagee mon opinion personnelle sur ces deux projets quand il s'agit de développer des sites web statiques[^1].

[^1]: Pour des applications dynamiques rendues côté serveur, je préfère Razzle + After.js car je suis convaincu que dans ce cas le routeur de React offre une meilleure API de routing que celle de NextJS.

## À quoi Gatsby est-il bon ?

Avant d'évoquer ses défauts, je voudrais vous faire part des domaines dans lesquels je pense que Gatsby excelle en me basant sur une expérience récente.

Il y a encore quelques jours, je construisais un site web Gatsby pour un ami qui ouvre une boîte de nuit appelée _Noir_ à New York. Mon ami voulait absolumenet une galerie d'images avec des photos sympas du lieu. Mais comme le lieu est encore en construction, il n'y avait pas encore d'images utilisables pour la galerie.

![Maquette de la page d'accueil du site](https://jaredpalmer.com/static/e1a12ba8fc3cf54a7f90f0c9c639e493/28063/noir-homepage.webp)

En attendant, ils m'ont demandé si je pouvais simplement extraire des images de leur compte Instagram ([@noirnewyorkcity](https://instagram.com/noirnewyorkcity)) jusqu'à leur ouverture officielle. Comme j'utilisais Gatsby, j'ai fait une recherche rapide sur Google sur "Gatsby Instagram", et voilà, je suis immédiatement tombé sur `gatsby-source-instagram`. Ce [plugin source Gatsby](https://www.gatsbyjs.org/tutorial/part-five/) récupère les 12 derniers posts Instagram d'un profil sans clé d'API et les place dans le schéma GraphQL de votre site. Après avoir installé le plugin, j'ai ouvert l'IDE GraphiQL de Gatsby. J'ai copié et collé la requête à partir de la documentation du plugin, et boum. Cela a fonctionné.

![L'interface de GraphiQL](https://jaredpalmer.com/static/233f7821107d91fe1cd1b3d65d293412/9acdc/noir-graphiql-2.webp)

Celà a pris 15 minutes pour intégrer et insérer les images sur la page. Ce qui est remarquable, c'est que j'ai fait tout cela sans jamais consulter la documentation de l'API Instagram. Plutôt cool.

Ce type d'interaction illustre la proposition de valeur unique de Gatsby : une API GraphQL unique et universelle pour toutes les sources de données. En exploitant GraphQL et son écosystème croissant de plugins source, Gatsby peut, en théorie, fournir aux développeurs une couche d'abstraction unifiée (et un langage de requête) pour accéder à n'importe quelle donnée (qu'il s'agisse de JSON distant, de fichiers locaux ou de vidéos de chats).

## Où est le problème ?

L'exemple ci-dessus illustre à la fois le meilleure et le pire côté de Gatsby. Oui, c'est bien beau d'utiliser GraphQL, mais c'est surtout très très agaçant la plupart du temps. Si vous y réfléchissez deux secondes, je me fous de savoir comment les données Instagram que je veux arrivent à mon composant React, je veux juste qu'elles apparaissent sous forme de propriétés (et de préférence avec des types TypeScript). Rappelez-vous, puisque nous sommes en terrain statique, nous ne nous soucions pas trop de la sur-extraction ; je serais tout aussi heureux que vous me donniez _toutes_ les données Instagram comme props puisqu'il n'y a pas de temps d'exécution supplémentaire (juste du temps de génération).

Cela donne l'impression de prendre des pilules qui rendent fou, mais imaginez comme il aurait été agréable de ne pas écrire de GraphQL du tout ? Et s'il avait simplement fourni automatiquement toutes les données à toutes mes pages. Cela aurait permis de gagner un temps fou.

## GraphQL est excessif pour la plupart des sites statiques

Une autre expérience notable avec Gatsby pour moi a été la construction du site web de mon podcast : https://undefined.fm ([source](https://github.com/undefinedfm/undefined.fm)). Contrairement au blog Markdown typique d'un développeur (comme celui-ci), le contenu de undefined.fm est uniquement dérivé du f[lux RSS de notre podcast](https://feeds.simplecast.com/8lcA0Is7). C'est une bonne chose car cela permet à notre solution d'hébergement de podcasts/CMS (Simplecast) d'être l'unique source de vérité[^2].

[^2] : J'ai une action GitHub qui redéploie le site chaque nuit en pingant le hook de déploiement de Netlify. Quand je poste un nouvel épisode, une fois par semaine environ, je le redéploie généralement manuellement via le tableau de bord de Netlify.

Bien que cela semble génial, la mise en place de cette solution a été pénible. Bien qu'il existe quelques plugins Gatsby source pour les flux RSS, aucun d'entre eux n'était adapté aux Podcasts[^3]. J'ai choisi celui qui semblait le mieux fonctionner et j'ai copié tout cela dans le code source de mon projet sous `./plugins/gatsby-source-simplecast-rss`. Je l'ai ensuite ajouté à mon fichier `gatsby-config.js`. J'ai ensuite dû trouver comment ajouter ces données à l'API GraphQL de Gatsby.

[^3] : Les podcasts ont un format RSS très spécifique qu'Apple a inventé il y a des années. Chaque application de podcast, PocketCasts, Overcasts, etc. n'est en fait qu'un lecteur RSS fantaisiste déguisé.

Il est temps de nous amuser un peu, comme ceci:

```js
// gastby-node.js
const { load, select, createChildren } = require('./internals');
exports.sourceNodes = async ({ actions }, options = {}) => {
  const { createNode } = actions;
  const { feed } = options;
  try {
    // Création des noeuds, souvent en récupérant
    // des données d'une API distante.
    const { rss } = await load(feed);
    const podcast = rss.channel[0].item;
    createChildren(podcast, null, createNode);
  } catch (e) {}
  // C'est fini, on retourne.
  return;
};
```

Là ça devient délirant:

```js
// internals.js
const crypto = require('crypto');
const rp = require('request-promise');
const { parseString } = require('xml2js');
const lget = require('lodash.get');
// Utils copied from initial plugin by Uptime Ventures
const transform = i =>
  new Promise((resolve, reject) =>
    parseString(i, (e, p) => (e ? reject(e) : resolve(p)))
  );
const load = uri => rp({ uri, transform });
const select = (i, key) => {
  const value = lget(i, key);
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
};
const digest = i =>
  crypto
    .createHash('md5')
    .update(JSON.stringify(i))
    .digest('hex');
/**
 * Slugify a string
 * @param s Any string
 */
function toSlug(s) {
  if (!s) {
    return '';
  }
  s = s.toLowerCase().trim();
  s = s.replace(/ & /g, ' and ');
  s = s.replace(/[ ]+/g, '-');
  s = s.replace(/[-]+/g, '-');
  s = s.replace(/[^a-z0-9-]+/g, '');
  return s;
}
const createChildren = (nodes, parent, createNode) => {
  const children = [];
  nodes.forEach(n => {
    const link = toSlug(select(n, 'title'));
    children.push(link);
    const node = {
      id: toSlug(select(n, 'title')),
      title: select(n, 'title'),
      description: select(n, 'itunes:summary'),
      html: select(n, 'content:encoded'),
      // Fix the date
      date: new Date(select(n, 'pubDate')).toISOString(),
      // Extract out the embed URL
      artwork: n['itunes:image'][0]['$']['href'],
      embed: n.enclosure[0]['$']['url']
        .replace('.mp3', '')
        // hack @todo
        .replace('/audio/17ba21/17ba21db-66b5-4612-855e-556b20f60155', '')
        .replace('https://cdn', 'https://player')
        .split('/')
        .slice(0, 4)
        .join('/'),
      audioUrl: n.enclosure[0]['$']['url'],
      duration: select(n, 'itunes:duration'),
      keywords: select(n, 'itunes:keywords'),
      episodeNumber: select(n, 'itunes:episode'),
      link,
      parent,
      children: [],
    };
    // This is how you we specify that each entry
    // in the RSS feed should become an Episode node in Gatsby's GraphQL layer
    node.internal = {
      type: 'Episode',
      contentDigest: digest(node),
    };
    createNode(node);
  });
  return children;
};
module.exports = {
  select,
  load,
  createChildren,
};
```

Nul besoin de parcourir le code ligne par ligne, voici ce que fait ce plugin :

- Récupération du flux RSS (qui est en XML) spécifié dans les options du plugin dans `gatsby-config.js`
- Conversion du XML en JSON
- Extraction du tableau des épisodes de l'objet JSON
- Parcours de chaque entrée, modification de certaines d'entre elles avec la magie des chaînes de caractères (pour générer un slug et obtenir l'URL correcte pour l'intégration de l'iframe)
- Ajout de chaque entrée à la couche GraphQL de Gatsby en tant que noeud d'épisode en spécifiant un type et en le hachant (je suppose que Gatsby utilise ce hachage pour optimiser les changements ? :)

Tout cela semble parfait et cela fonctionne, mais le développement de ce plugin était loin d'être idéal. Chaque fois que j'ai modifié le plugin, j'ai dû relancer la commande `rm -rf .cache && gatsby develop`. S'il y avait ne serait-ce qu'_une_ erreur, le site explosait (nous y reviendrons plus tard).

Je n'ose pas imaginer ce que cela doit être pour les débutants. Si tout cela semble faire beaucoup et sans une véritable explication complète, c'est que je ne comprends pas non plus. Ça ressemble à un tas de pièges à traverser. Mais finalement, j'ai réussi par le faire fonctionner.

C'est du moins ce que je pensais. Ce que je viens de vous montrer, c'est comment faire entrer les données _dans_ l'API GraphQL de Gatsby. Pour générer une page pour chaque épisode, j'ai dû trouver cette fonction monstre dans le fichier `gatsby-node.js`. J'ai fait cela en copiant la requête GraphQL de la documentation de `gatsby-source-filesystem` et en l'adaptant à ma requête `allEpisode`. Il a fallu tout un tas d'essais et d'erreurs pour que les slugs fonctionnent.

```js
const path = require('path');
// Appremment notre plugin n'a pas crée les noeuds comme nos le pensions,
// cette partie est requise
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Episode`) {
    createNodeField({
      node,
      name: `slug`,
      value: `/radio/${node.id}`,
    });
  }
};
// Interrogee l'API GraphQL et crée une page pour chaque épisode en utilisant le modèle d'épisode.
// Cela ressemble beaucoup au plugin `gatsby-source-filesystem`
exports.createPages = ({ graphql, actions }) => {
  return new Promise((resolve, reject) => {
    const episodeTemplate = path.resolve('./src/templates/episode.tsx');
    const episodeQuery = /* GraphQL */ `
      {
        allEpisode(sort: { fields: [date], order: DESC }, limit: 1000) {
          edges {
            node {
              id
              title
              description
              fields {
                slug
              }
            }
          }
        }
      }
    `;
    resolve(
      graphql(episodeQuery).then(result => {
        if (result.errors) {
          reject(result.errors);
        }
        result.data.allEpisode.edges.forEach(edge => {
          actions.createPage({
            path: edge.node.fields.slug,
            component: episodeTemplate,
            context: {
              slug: edge.node.fields.slug,
            },
          });
        });
      })
    );
  });
};
/**
 * Slugify a string
 * @param s Any string
 */
function toSlug(s) {
  if (!s) {
    return '';
  }
  s = s.toLowerCase().trim();
  s = s.replace(/ & /g, ' and ');
  s = s.replace(/[ ]+/g, '-');
  s = s.replace(/[-]+/g, '-');
  s = s.replace(/[^a-z0-9-]+/g, '');
  return s;
}
// ...
```

Attendez ce n'est pas fini. Deux autres requêtes GraphQL sont nécessaires pour demander les données de l'épisode. Une pour la page d'accueil et une pour le modèle d'épisode !

```js
// ./src/index.tsx
// Get the list of all the episodes for the homepage
export const query = graphql`
  {
    allEpisode(sort: { fields: [date], order: DESC }, limit: 100) {
      edges {
        node {
          id
          title
          description
          episodeNumber
          duration
          date
          fields {
            slug
          }
        }
      }
    }
  }
`;
```

```js
// ./src/templates/episode.tsx
// Get a single episode
export const pageQuery = graphql`
  query($slug: String!) {
    episode(fields: { slug: { eq: $slug } }) {
      id
      title
      description
      date
      html
      embed
      duration
      artwork
      audioUrl
      fields {
        slug
      }
    }
  }
`;
```

Si vous êtes déboussolé, vous n'êtes pas seul. Si vous pensez que c'est beaucoup de code et d'indirection, alors vous et moi sommes sur la même longueur d'onde.

## Déboguer est un cauchemar

Si ce n'était qu'un plugin Webpack ou une utilisation ordinaire de `fs`, les erreurs de débogage ne seraient pas un problème. Les erreurs seraient traçables jusqu'à leur source grâce aux traces normales de la pile. Cependant, à cause de toute l'abstraction requise pour GraphQL et Webpack dans les entrailles de Gatsby, le débogage est un cauchemar même pour moi (et j'en connais malheureusement un rayon sur Webpack et GraphQL).

Par exemple, imaginons que l'un de mes appels `select(n, 'itunes:xxx')` provoque une erreur pour un épisode spécifique, mais que le reste fonctionne bien, voici à quoi ressemblerait la console lorsque vous lancez `gatsby develop` :

```bash
~/workspace/github/jaredpalmer/theundefined master*
❯ yarn start -p 5000
yarn run v1.19.1
$ rm -rf .cache && gatsby develop -p 5000
success open and validate gatsby-configs — 0.016 s
success load plugins — 0.236 s
success onPreInit — 1.147 s
success delete html and css files from previous builds — 0.095 s
success initialize cache — 0.005 s
success copy gatsby files — 0.029 s
success onPreBootstrap — 0.009 s
warning The gatsby-transformer-sharp plugin has generated no Gatsby nodes. Do you need it?
warning The gatsby-source-simplecast-rss plugin has generated no Gatsby nodes. Do you need it?
success source and transform nodes — 0.209 s
success building schema — 0.124 s
error gatsby-node.js returned an error
  TypeError: Cannot read property 'allEpisode' of undefined
  - gatsby-node.js:81 graphql.then.result
    /Users/jared/workspace/github/jaredpalmer/theundefined/gatsby-node.js:81:21
  - util.js:16 tryCatcher
    [theundefined]/[bluebird]/js/release/util.js:16:23
  - promise.js:512 Promise._settlePromiseFromHandler
    [theundefined]/[bluebird]/js/release/promise.js:512:31
  - promise.js:569 Promise._settlePromise
    [theundefined]/[bluebird]/js/release/promise.js:569:18
  - promise.js:606 Promise._settlePromiseCtx
    [theundefined]/[bluebird]/js/release/promise.js:606:10
  - async.js:142 _drainQueueStep
    [theundefined]/[bluebird]/js/release/async.js:142:12
  - async.js:131 _drainQueue
    [theundefined]/[bluebird]/js/release/async.js:131:9
  - async.js:147 Async._drainQueues
    [theundefined]/[bluebird]/js/release/async.js:147:5
  - async.js:17 Immediate.Async.drainQueues [as _onImmediate]
    [theundefined]/[bluebird]/js/release/async.js:17:14
success createPages — 0.035 s
success createPagesStatefully — 0.042 s
success onPreExtractQueries — 0.001 s
success update schema — 0.080 s
error GraphQL Error There was an error while compiling your site's GraphQL queries.
  Error: RelayParser: Encountered 2 error(s):
- Unknown field 'episode' on type 'Query'. Source: document `usersJaredWorkspaceGithubJaredpalmerTheundefinedSrcTemplatesEpisodeTsx2642664173` file: `GraphQL request`
  GraphQL request (3:5)
  2:   query($slug: String!) {
  3:     episode(fields: { slug: { eq: $slug } }) {
         ^
  4:       id
- Unknown field 'allEpisode' on type 'Query'. Source: document `usersJaredWorkspaceGithubJaredpalmerTheundefinedSrcPagesIndexTsx3249400678` file: `GraphQL request`
  GraphQL request (3:5)
  2:   {
  3:     allEpisode(sort: { fields: [date], order: DESC }, limit: 100) {
         ^
  4:       edges {
success extract queries from components — 0.224 s
success run graphql queries — 0.014 s — 5/5 483.25 queries/second
success write out page data — 0.007 s
success write out redirect data — 0.001 s
success onPostBootstrap — 0.001 s
info bootstrap finished - 5.33 s
Starting type checking and linting service...
Using 1 worker with 2048MB memory limit
Starting type checking and linting service...
Using 1 worker with 2048MB memory limit
Watching: /Users/jared/workspace/github/jaredpalmer/theundefined/src
Browserslist: caniuse-lite is outdated. Please run next command `yarn upgrade caniuse-lite browserslist`
 DONE  Compiled successfully in 4118ms                                          11:45:37 AM
Type checking and linting in progress...
You can now view undefined.fm in the browser.
  http://localhost:5000/
View GraphiQL, an in-browser IDE, to explore your site's data and schema
  http://localhost:5000/___graphql
Note that the development build is not optimized.
To create a production build, use npm run build
ℹ ｢wdm｣:
ℹ ｢wdm｣: Compiled successfully.
No type errors found
No lint errors found
Version: typescript 2.9.2, tslint 5.12.1
Time: 6294ms
```

Dans les 100 lignes de journaux ci-dessus, il est indiqué que quelque chose ne va pas avec ma requête sur les épisodes. Ce qui n'est pas immédiatement clair, c'est la nature et l'emplacement de l'erreur.

```bash
TypeError: Cannot read property 'allEpisode' of undefined
  - gatsby-node.js:81 graphql.then.result
    /Users/jared/workspace/github/jaredpalmer/theundefined/gatsby-node.js:81:21
```

Cette erreur indique qu'il y a un problème dans `gatsby-node.js` à la ligne 81 (où je map les épisodes retournés par GraphQL).

mouais… à ce moment là, dans ma tête je suis perdu :

Il y a une erreur dans mon plugin source ? Peut-être ? Est-elle présente sur tous les épisodes ? Peut-être ? Est-elle présente sur un seul champ d'un épisode ? Ou peut-être sur un champ spécifique d'un épisode spécifique ? Mais lequel ? Ça a l'air bon pourtant ? Peut-être ai-je fait une faute de frappe dans ma requête GraphQL de `gatsby-node.js` ? D'après le reste de la sortie du terminal, il semble que mes autres requêtes GraphQL (situées quelque part dans mon code source) échouent également ? Où sont-elles ? Celles qui échouent ? J'ai oublié ? Zut. Mon plugin semblait fonctionner quelques secondes auparavant ? Maintenant, aucun de mon GraphQL ne semble fonctionner ?

Quelle meeeeerde !

Il s'avère que cette ligne sournoise que vous avez probablement manquée, vaut son pesant d'or:

```bash
warning The gatsby-source-simplecast-rss plugin has generated no Gatsby nodes. Do you need it?
```

Hum. Alors maintenant, si vous êtes comme moi, vous commencez à décommenter / commenter les morceaux de ce `createChildren` jusqu'à ce que vous compreniez ce qui se passe par essais et erreurs successifs. Une vraie partie de plaisir.

Attendez ! Ce n'est pas fini !

## Gatsby pourrait bien être trop intelligent à ses dépens

Mon père ([@shellypalmer](https://twitter.com/shellypalmer)) a lancé [Think About This](https://thinkaboutthis.fm/) son podcast sur la technologie en compagnie de [Ross Martin](https://twitter.com/rossmartin1) il y a quelques semaines. Vous devriez l'écouter, c'est super. En bon fiston, je me suis empressé de forker le code source de mon podcast undefined.fm, en changeant just les visuels et les contenus textuels, pour lancer thinkaabouthis.fm. Mis à part le fait que le site utilise Megaphone.fm à la place de Simplecast, le code des deux sites est identique à 99,9%. Tout marchait comme sur des roulettes pour l'épisode pilote. J'ai même automatisé le déploiement du site à l'aide d'une tâche cron dans une action GitHub tous les mecredi matins.

Cependant le jour du lancement du premier véritable épisode, mon père me ping sur Slack :

![Jared le site n'affiche pas le premier épisode](https://jaredpalmer.com/static/047db1c3d5c391f3a081cc18521d648b/7bae5/slack.webp)

Cela n'a pas de sens, mon site marche très bien depuis des mois. Pourquoi est-ce que le premiere épisode ne s'affiche-t-il pas ?
Le déploiement semble se passer correctement, aucune erreur à signaler dans les fichiers journaux de Netlify. Qu'est-ce qui se passe encore ?

Et bien, il se trouve que parfois Gatsby/GraphQL est vraiment trop intelligent à ses dépens. Bien que ce soit en régle générale une bonne chose, Gatsby _déduit_ le schema GraphQL de la source de données. Cela marche très bien quand tout est toujours défini, mais beaucoup moins bien lorsque certaines entrées sont nulles. Il se trouve que le premier épisode du flux RSS du podcast de mon père était un épisode pilote et ne possédait donc pas de numéro pour le champ `<itunes:episode>`. Ce n'était pas un problème jusqu'à la parution du véritable premier épisode (le deuxième élément du flux RSS) qui lui avait la valeur `1` pour `<itunes:episode>`. Ça a fait explosé Gatsby car il n'arrivait pas à déduire la valeur d'`episodeNumber` pour le pilote. Qui l'aurait cru ? Pas moi. Après avoir fouillé la documentation, j'ai appris qu'on peut [outrepasser ce comportement à l'aide de l'annotation GrapQL `@dontinfer`](https://www.gatsbyjs.com/docs/schema-customization/#opting-out-of-type-inference).

Bien que ça ait l'air d'une correction simple à cette petite anomalie, cela m'a pris des heures à comprendre d'où le problème venait. Pendant ce temps, j'ai du supprimere le numéro d'épisode du site.

### Alors GraphQL pour des sites statiques ?

Au final, oui, le système de fichiers est un graphe. GraphQL pourrait bien être l'API de données universelle techniquement "correcte". Cependant, le flux de travail ci-dessus est trop élaboré et beaucoup trop compliqué pour récupérer un simple flux RSS et générer du bon vieux HTML. Il n'est pas nécessaire de faire aussi compliqué.

## Les plugins

Un autre aspect controversé de Gatsby est son système de plugin. On trouve une tonne de plugins sur NPM pour toutes sortes de choses farfelues. Le problème que j'ai avec Gatsby, c'est qu'il n'est pas livré avec la batterie incluse. Le paquet `Gatsby` en lui-même ne fait qu'orchestrer les plugins et les trucs de GraphQL. Toutes les autres fonctionnalités sont déléguées aux plugins. Je déteste ça, vraiment. Bien que cela semble être une excellente stratégie de maintenance, ce n'est pas très amusant pour un consommateur. Le résultat est que vous devez installer environ 7-8 plugins chaque fois que vous démarrez un nouveau site. Ou alors, vous pouvez la jouer cool et créer votre propre gatsby-theme (qui est un groupe de plugins). Encore une fois, mon problème est que le fait d'avoir un noyau très mince signifie que chaque site Gatsby finit par être un flocon de neige. J'ai environ 4 ou 5 sites Gatsby, et ils sont tous assez similaires, mais pas assez pour que je puisse copier et coller aveuglément du code entre eux. J'ai juste l'impression qu'ils devraient partager _beaucoup plus_ de code. Bien que ce problème soit quelque peu résolu par les thèmes de Gatsby, il semble que le noyau de Gatsby seul soit plutôt inutile. De plus, comme beaucoup de choses sont déléguées aux plugins, passer d'un projet Gatsby à un autre est plus compliqué que si le noyau en faisait un peu plus pour vous. Par exemple, presque chaque fichier `gatsby-node.js` devient inévitablement un flocon de neige. Commençons par le plugin le plus téléchargé : `gatsby-source-filesystem`. Ce plugin nécessite environ 20 à 50 lignes de code dans `gatsby-node.js`. Cette duplication signifie que tout diverge.

"Mais Jared, espèce d'idiot, en quoi est-ce différent d'un fichier `razzle.config.js` ou d'un `next.config.js` ?"
Je vous répondrais: la partie GraphQL et les abstractions de Gatsby.

Next.js (et Razzle) vous donnent tous deux  un simple accès direct à la configuration de Webpack. Si vous connaissez Webpack, alors vous connaissez Next.js et Razzle. Point final.
Avec Gatsby, vous disposez de méthodes et de fonctions du framework que vous _devez_ utiliser pour augmenter les fonctionnalités.
GraphQL est encore une fois, la source de la complexité pour Gatsby et la raison pour laquelle les fichiers `gatsby-node.js` sont beaucoup plus complexes que votre fichier `next.config.js` usuel. Autrement dit, `gatsby-node.js` c'est l'équivalent de `functions.php` de ce bon vieux Wordpress  sous stéroïdes. Et je ne suis pas fan.

## Next.js c'est top pour des sites statiques

[Next.js](https://nextjs.org) n'est pas parfait pour tout. Cependant, il est vraiment _très_ bon pour les sites statiques. Tout d'abord, le routage du système de fichiers de Next.js est phénoménal pour les sites statiques : `./pages/about.tsx` devient `/about`. Au lieu d'être obligé d'interroger une API GraphQL centrale, vous pouvez simplement écrire une fonction appelée `getStaticProps` qui sera exécutée au moment de la compilation. Tout ce qui est renvoyé est injecté sous forme de propriétés (props) dans votre composant de page. Mieux encore, vous pouvez aussi écrire n'importe quel code Node.js dans cette fonction et il sera supprimé côté client, ce qui vous permet d'utiliser le système de fichiers.

### Faire des trucs géniaux avec `getStaticProps`

Pour être honnête je n'ai pas titlé sur Next.js jusqu'à ce que je lise le code source de [la documentation d'Expo](https://github.com/expo/expo/tree/master/docs). Il contient un code excellent pour générer la barre latérale et analyser statiquement le système de fichiers. Tout fonctionne grâce à `babel-plugin-preval`. Cet astucieux plugin de Kent C. Dodds pré-évalue le code JavaScript au moment de la génération. Il peut ensuite être utilisé pour préévaluer le contenu du système de fichiers en utilisant le bon vieux paquet `fs`. Cependant, maintenant avec Next.js 9.x, vous n'avez même plus besoin de `preval`, vous pouvez simplement exporter une fonction depuis une page appelée `getStaticProps` et ça marche.

Par exemple, la nouvelle documentation de Formik aura un blog. Tous les articles sont écrits en MDX. Chaque article reçoit un fichier `.mdx` dans le répertoire `./pages/blog` et possède le même front matter:  titre, description, date, etc. Pour générer l'index du blog, je fais le plus simple possible : je lis les fichiers `.mdx` dans le répertoire `./pages/blog/`, j'analyse leur contenu avec le paquet `front-matter`, je les mets dans un tableau et je les classe par date. Comme j'utilise `getStaticProps`, tout se passe au moment de la compilation, de sorte que le résultat est toujours une page statique.

```js
// ./pages/blog/index.js
import React from 'react';
import path from 'path';
import fm from 'front-matter';
import fs from 'fs-extra';
import toDate from 'date-fns/toDate';
import compareDesc from 'date-fns/compareDesc';
export default function BlogList({ posts }) {
  return (
    <>
      {posts.map(({ title }) => (
        <div key={title}>{title}</div>
      ))}
    </>
  );
}
export function getStaticProps() {
  let items = fs.readdirSync('./pages/blog');
  for (var i = 0; i < items.length; i++) {
    const filePath = path.join(path_, items[i]);
    const { ext, name } = path.parse(filePath);
    // Traiter uniquement les fichiers markdown/mdx qui ne sont pas des pages index.tsx
    if (ext.startsWith('.md') && ext !== 'index') {
      try {
        let { attributes } = fm(fs.readFileSync(filePath, 'utf8'));
        let obj = {
          ...attributes,
          date: toDate(attributes.date),
          href: filePath
            .replace(/^pages\/blog/, '/blog')
            .replace(/.mdx?$/, '')
            .replace(/.tsx?$/, ''),
        };
        arr.push(obj);
      } catch (e) {
        console.log(`Error reading frontmatter of ${filePath}`, e);
      }
    }
  }
  return { props: { posts: arr.sort(compareDesc) } };
}
```

C'est tout. Nous faisons à 100 % la même chose que `gatsby-source-filesystem` sans recourir à quelconque magie de GraphQL. Nous avons juste utilisé les paquets `fs` et `front-matter`.

## Gatsby et moi c'est terminé

Alors oui, j'en ai fini avec Gatsby. Je n'ai pas abordé les performances de build de Gatsby, ni sa stratégie de cache, ni les builds incrémentaux, parce que rien de tout cela ne m'importe. En fin de compte, je ne vois pas l'intérêt de la complexité supplémentaire ou de l'utilisation indirecte de GraphQL par Gatsby. Je suis assez satisfait de Next.js pour les sites statiques. De toute évidence, tout est question de compromis. Si vous aimez Gatsby, et qu'il fonctionne pour vous et votre équipe. C'est génial. Je suis content pour vous. Pour moi, Next.js me semble être la bonne abstraction. Si j'ai besoin de GraphQL, je peux l'utiliser si je veux, mais il ne m'est pas imposé.
