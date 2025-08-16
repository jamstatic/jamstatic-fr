---
title: "Guide complet des Webmentions avec Eleventy"
description: Ajoutez les Webmentions à votre site statique Eleventy grâce à ce guide pas à pas.
author: frank
social:
  mastodon: DirtyF@mamot.fr
date: 2019-12-27T08:48:32+01:00
lastmod: 2019-12-27T17:05:32+01:00
categories:
  - eleventy
source:
  author: "Sia Karamalegos"
  title: "An In-Depth Tutorial of Webmentions + Eleventy"
  url: "https://sia.codes/posts/webmentions-eleventy-in-depth/"
---
Je suis toujours une grande fan du générateur de site statique [Eleventy](https://www.11ty.dev/), et j'étais impatiente de gérer les [Webmentions](https://indieweb.org/Webmention) avec.

> Webmention est un standard web pour les mentions et les conversations sur le web, un puissant élément constitutif d'un réseau fédéré croissant de commentaires, d'appréciations, de rediffusions et d'autres riches interactions  sur le web social décentralisé.
> — [IndieWeb.org](https://indieweb.org/Webmention)

C'est un outil très cool qui vous permet d'avoir des interactions sociales quand vous hébergez votre propre contenu. Max Böck a écrit un excellent article qui détaille son implémentation, [Indieweb statique 2e partie : utiliser les Webmentions](https://mxb.dev/blog/using-webmentions-on-static-sites/). Il a également crée un starter pour Eleventy, [eleventy-webmentions](https://github.com/maxboeck/eleventy-webmentions), un modèle de départ avec un support basique des webmentions.

Alors pourquoi écrire cet article ? Malheureusement pour moi j'ai commencé à développer mon site avec le [blog de base pour Eleventy](https://github.com/11ty/eleventy-base-blog) et j'avais déjà terminé quand j'ai découvert [eleventy-webmentions](https://github.com/maxboeck/eleventy-webmentions). J'ai dû lutter pour développer pleinement cette fonctionnalité, car je débute encore avec Eleventy. J'ai donc voulu partager en détail les étapes que j'ai dû mener à bien, en espérant que ça aide davantage d'entre vous à rejoindre l'IndieWeb.

Le but de cet article est d'ajouter les webmentions à un site Eleventy, après coup. Les fichiers, les dossiers, et l'architecture du site sont les mêmes que dans `eleventy-base-blog`, mais vous pouvez vous en servir comme point de départ pour un site Eleventy. Simplement faites attention aux endroits où votre architecture pourrait différer.

Le code de cet article est un mélange de l'article de Max Böck, son [site perso](https://github.com/maxboeck/mxb), du modèle d'amorçage [eleventy-webmentions](https://github.com/maxboeck/eleventy-webmentions), du [site de Zach Leatherman](https://github.com/zachleat/zachleat.com), et des modifications effectuées pendant ma propre implémentation. Je leur suis très reconnaissante pour leur travail, car je n'aurais jamais pu arriver à ce résultat sans eux.

## Étape 1 : s'inscrire sur webmentions.io

Il nous faut d'abord s'inscrire sur webmention.io, le service tiers qui nous permet de profiter du pouvoir des webmentions sur les sites statiques.

1. Configurer IndieAuth de manière à ce que webmention.io sache que vous êtes bien le propriétaire de votre domaine. Suivez les instructions données [sur leur site](https://indieauth.com/setup).
2. Allez sur [webmention.io](https://webmention.io/).
3. Entrez l'URL de votre site web dans le champ "Web Sign-In" , et cliquez sur "Sign in".

Si la validation est réussie, vous devriez être redirigé·e vers le tableau des webmentions où sont affichées deux balises `<link>` que vous devez insérez dans la balise `<head>` de votre site web :

```html
<!-- _includes/layouts/base.njk -->
<link rel="webmention" href="https://webmention.io/<your.domain>/webmention" />
<link rel="pingback" href="https://webmention.io/<your.domain>/xmlrpc" />
```

Vous disposez aussi d'un token d'API personnel. Nous voulons pouvoir le stocker de manière sécurisée dans nos variables d'environnement locales. Installez `dotenv` pour définir et accéder facilement à vos variables d'environnement :

```bash
npm install dotenv
```

Créez un fichier `.env` à la racine de votre projet et ajoutez votre token d'API pour webmention.io.

```bash
WEBMENTION_IO_TOKEN=v07r370k3n1c1.
```

N'oubliez pas d'ajouter votre fichier `.env` dans votre fichier `.gitignore`. Tant que nous y sommes, ajoutons également le dossier `_cache` qui sera crée lors du premier rapatriement des webmentions :

```bash
_cache/
_site/
node_modules/
.env
```

Vous aimeriez probablement récupérer quelques webmentions. Si vous utilisez Twitter, [Bridgy](https://brid.gy/) est un excellent moyen de récupérer vos mentions depuis Twitter. Assurez d'abord qu'un lien vers votre site web est présent dans votre profil, puis connectez-le.

## Comment tout ça va marcher

Quand nous lançons une génération avec `NODE_ENV=production`, nous allons récupérer les nouvelles webmentions publiées depuis la fois précédente. Celles-ci seront sauvées dans le fichier `_cache/webmentions.json`.  Ces mentions proviennent de l'[API de webmention.io](https://github.com/aaronpk/webmention.io#api).

Lors de chaque génération, pour chaque page :

- Depuis le cache des webmentions `_cache/webmentions.json`, ne garder que les webmentions qui correspondent à l'URL de la page en cours (dans mon cas, celle de l’article de blog).
- Faire appel à la fonction `webmentionsByType` pour les filtrer par type (par exemple des _likes_ ou des réponses)
- Utiliser la fonction `size` pour calculer le nombre de mentions par type
- Afficher le total avec le type de mention sous forme d'entête (ex: "7 réponses")
- Afficher la liste des mentions de ce type (par exemple sous forme d'avatar avec un lien vers le profil Twitter pour chaque _like_.)

## Récupération des webmentions

Tout d'abord, nous devons ajouter notre nom de domaine en tant que propriété dans notre fichier `_data/metadata.json`. Ajoutons-y également l'URL racine qui nous sera utile par la suite :

```json
// _data/metadata.json
{
  //...other metadata
  "domain": "example.com",
  "url": "https://example.com"
}
```

Ensuite, installons quelques dépendances supplémentaires :

```bash
npm install lodash node-fetch
```

Et mettons à jour notre script de `build` pour y préciser la variable d'environnement `NODE_ENV` dans notre `package.json` :

```json
// package.json
{
  // …config
  "scripts": {
    "build": "NODE_ENV=production npx eleventy",
    // scripts…
}
```

Nous pouvons maintenant nous concentrer sur la partie récupération. Oui, je sais que le fichier qui suit est beaucoup trop long, mais je pense qu'il n'est pas facile à comprendre hors contexte. Voici les grandes étapes qui constituent le code :

1. Lire les mentions depuis le cache enregistré dans `_cache/webmentions.json`.
2. Si notre environnement est `production`, récupérer les nouvelles webmentions depuis la dernière génération. Les fusionner avec celles en cache et sauvegarder le fichier de cache. Retourner les mentions ajoutées.
3. Si notre environnement n’est pas `production`, retourner les mentions depuis le cache.

```javascript
// _data/webmentions.js
// Déclaration des dépendances
const fs = require('fs')
const fetch = require('node-fetch')
const unionBy = require('lodash/unionBy')
const domain = require('./metadata.json').domain

// Charger les variables d'environnement avec `dotenv`
require('dotenv').config()

// Définir l'emplacement du cache et les paramètres d'appel de l'API
const CACHE_FILE_PATH = '_cache/webmentions.json'
const API = 'https://webmention.io/api'
const TOKEN = process.env.WEBMENTION_IO_TOKEN

async function fetchWebmentions(since, perPage = 10000) {
  // Avertir et s'arrêter là si le nom de domaine et le token d'API ne sont pas définis
  if (!domain || !TOKEN) {
    console.warn('>>> Impossible de récupérer les webmentions : domaine ou token manquant')
    return false
  }

  let url = `${API}/mentions.jf2?domain=${domain}&token=${TOKEN}&per-page=${perPage}`
    if (since) url += `&since=${since}` // ne récupérer que les nouvelles webmentions

  const response = await fetch(url)
  if (response.ok) {
    const feed = await response.json()
    console.log(`>>> ${feed.children.length} nouvelles webmentions récupérées depuis ${API}`)
    return feed
  }

  return null
}

// Fusionner les nouvelles webmentions avec celles du cache, unique par id
function mergeWebmentions(a, b) {
  return unionBy(a.children, b.children, 'wm-id')
}

// sauvegarder les webmentions combinnées dans le fichier de cache
function writeToCache(data) {
  const dir = '_cache'
  const fileContent = JSON.stringify(data, null, 2)
  // créer le dossier de cache s'il n'existe pas déjà
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  // écrire les données dans le fichier de cache JSON
  fs.writeFile(CACHE_FILE_PATH, fileContent, err => {
    if (err) throw err
    console.log(`>>> webmentions mise en cache dans ${CACHE_FILE_PATH}`)
  })
}

// Lire le contenu du cache à partir du fichier JSON
function readFromCache() {
  if (fs.existsSync(CACHE_FILE_PATH)) {
    const cacheFile = fs.readFileSync(CACHE_FILE_PATH)
    return JSON.parse(cacheFile)
  }

  // Pas de cache trouvé.
  return {
    lastFetched: null,
    children: []
  }
}

module.exports = async function () {
  console.log('>>> Lectures des webmentions depuis le cache…');

  const cache = readFromCache()

  if (cache.children.length) {
    console.log(`>>> ${cache.children.length} webmentions chargées depuis le cache`)
  }

  // Ne télécharger les nouvelles webmentions qu'en production
  if (process.env.NODE_ENV === 'production') {
    console.log('>>> Vérification de nouvelles webmentions...');
    const feed = await fetchWebmentions(cache.lastFetched)
    if (feed) {
      const webmentions = {
        lastFetched: new Date().toISOString(),
        children: mergeWebmentions(cache, feed)
      }

      writeToCache(webmentions)
      return webmentions
    }
  }

  return cache
}
```

## Filtres pour la génération

Maintenant que nous avons rempli notre cache de webmentions, il nous faut pouvoir l'utiliser. Nous devons pour cela générer les fonctions, les [filtres](https://www.11ty.dev/docs/filters/), qu'Eleventy va utiliser pour générer nos fichiers.

D'abord, j'aime bien séparer les filtres de la configuration principale d'Eleventy pour ne pas trop la surcharger. Le fichier dédié aux filtres va définir chacun de nos filtres dans un objet. Les clés seront les noms de filtres et les valeurs seront les fonctions de filtres. Ajouter nos nouvelles fonctions de filtres dans le fichier `_11ty/filters.js` :

```javascript
// _11ty/filters.js
const { DateTime } = require("luxon"); // Déjà présent dans eleventy-base-blog

module.exports = {
  getWebmentionsForUrl: (webmentions, url) => {
    return webmentions.children.filter(entry => entry['wm-target'] === url)
  },
  size: (mentions) => {
    return !mentions ? 0 : mentions.length
  },
  webmentionsByType: (mentions, mentionType) => {
    return mentions.filter(entry => !!entry[mentionType])
  },
  readableDateFromISO: (dateStr, formatStr = "dd LLL yyyy 'at' hh:mma") => {
    return DateTime.fromISO(dateStr).toFormat(formatStr);
  }
}
```

Maintenant pour pouvoir utiliser ces nouveaux filtres, dans notre fichier `.eleventy.js`, nous devons boucler sur les clefs de cet objet de filtres, pour ajouter chaque filtre à la configuration d'Eleventy :

```javascript
// .eleventy.js
// ...Autres imports
const filters = require('./_11ty/filters')

module.exports = function(eleventyConfig) {
  // Filters
  Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  })

  // Autres configs...
```

:::info
Ici je n'utilise pas de filtre d’assainissement du HTML car j'ai remarqué que les données sont contenues dans un champ `text` qui est déjà nettoyé. C'est peut-être nouveau ou bien ce n'est pas valable pour toutes les webmentions. Je mettrais cet article à jour si je dois l'ajouter.
:::

## Afficher les mentions

Nous sommes maintenant fin prêts à tout assembler et à afficher nos webmentions. Je les positionne à la fin de chaque article de blog, donc dans mon fichier `_includes/layouts/post.njk`, j'ajoute une nouvelle section pour les webmentions. Ici, nous déclarons une variable nommée `webmentionUrl` qui contient l’URL complète de la page, puis nous la passons dans le fichier partiel `webmentions.njk` :

```html
<!-- _includes/layouts/post.njk -->
<section>
  <h2>Webmentions</h3>
  {% set webmentionUrl %}{{ page.url | url | absoluteUrl(site.url) }}{% endset %}
  {% include 'webmentions.njk' %}
</section>
```

Nous pouvons maintenant écrire notre fichier de modèle pour les webmentions. Dans cet exemple, j’affiche des liens, des retweets et des réponses. Je commence par définir toutes les variables dont j’aurais besoin dans quelques instants :

```html
<!-- _includes/webmentions.njk -->
  <!-- Filtrer les webmentions du cache pour n’inclure que celles relatives à l’URL de l’article en cours -->
  {% set mentions = webmentions | getWebmentionsForUrl(metadata.url + webmentionUrl) %}
  <!-- Définir les reposts comme des mentions de type `repost-of`  -->
  {% set reposts = mentions | webmentionsByType('repost-of') %}
  <!-- Calcul du total de reposts -->
  {% set repostsSize = reposts | size %}
  <!-- Définir les likes comme des mentions de type `like-of`  -->
  {% set likes = mentions | webmentionsByType('like-of') %}
  <!-- Calcul du total de likes -->
  {% set likesSize = likes | size %}
  <!-- Définir les réponses comme des mentions de type `in-reply-to`  -->
  {% set replies = mentions | webmentionsByType('in-reply-to')  %}
  <!-- Calcul du total de réponses -->
  {% set repliesSize = replies | size  %}
```

Une fois nos variables définies, nous pouvons afficher ces données. Ici je vais seulement m'attarder sur la partie "réponses", libre à vous d'aller voir comment je gère les autres types de webmentions dans [ce gist](https://gist.github.com/siakaramalegos/b1f7ded21f9ecddaee91e3f6d88e2e48){embed=false}.

L'affichage des réponses est un peu plus complexe que de simplement afficher une photo et un lien. Je fais appel à un autre template ici pour afficher chaque webmention. Nous affichons le nombre total de réponses et affichons le mot "Réponse" au pluriel si nécessaire. Puis nous bouclons sur les webmentions de type réponse et les affichons à l'aide d'un nouveau fichier partiel Nunjucks :

```html
<!-- _includes/webmentions.njk -->
<!-- …définition des variables… -->
{% if repliesSize > 0 %}
<div class="webmention-replies">
  <h3>{{ repliesSize }} {% if repliesSize == "1" %}Reply{% else %}Replies{% endif %}</h3>

  {% for webmention in replies %}
    {% include 'webmention.njk' %}
  {% endfor %}
</div>
{% endif %}
```

Nous pouvons afficher les réponses à l'aide de ce nouveau fichier partiel pour chaque réponse. Si l'auteur de la webmention a une photo de profil, nous l'affichons, sinon nous affichons un avatar. Même chose pour le nom, nous l'affichons s'il existe, sinon nous affichons "Anonyme". Notre filtre `readableDateFromISO` nous aide à afficher la date de publication dans un format plus sympathique pour les humains, enfin nous affichons le texte de la webmention :

```html
<!-- _includes/webmention.njk -->
<article class="webmention" id="webmention-{{ webmention['wm-id'] }}">
  <div class="webmention__meta">
    {% if webmention.author %}
      {% if webmention.author.photo %}
      <img src="{{ webmention.author.photo }}" alt="{{ webmention.author.name }}" width="48" height="48" loading="lazy">
      {% else %}
      <img src="{{ '/img/avatar.svg' | url }}" alt="" width="48" height="48">
      {% endif %}
      <span>
        <a class="h-card u-url" {% if webmention.url %}href="{{ webmention.url }}" {% endif %} target="_blank" rel="noopener noreferrer"><strong class="p-name">{{ webmention.author.name }}</strong></a>
      </span>
    {% else %}
      <span>
        <strong>Anonymous</strong>
      </span>
    {% endif %}

    {% if webmention.published %}
      <time class="postlist-date" datetime="{{ webmention.published }}">
        {{ webmention.published | readableDateFromISO }}
      </time>
    {% endif %}
  </div>
  <div>
    {{ webmention.content.text }}
  </div>
</article>
```

## Sautons courageusement dans l’inconnu…

Ça fonctionne ? Nous allons enfin pouvoir tester. Commencez par lancer la commande `npm run build` pour générer une liste initiale de webmentions qui sera sauvegardée dans le fichier `_cache/webmentions.json`. Puis lancer votre serveur de développement local pour vérifier que ça marche ! Bien entendu, vous devrez au moins avoir une webmention associée à un article pour voir quelque chose. 😁

Vous pouvez voir le résultat de ma propre implémentation sur mon [site](https://sia.codes/posts/webmentions-eleventy-in-depth/#webmentions). Bon courage ! Dites moi si vous trouvez des anomalies ou des erreurs dans cet article !

## Poursuivez en ajoutant des Microformats

Keith Grant a un excellent article [Ajouter le support de Webmention à un site statique](https://keithjgrant.com/posts/2019/02/adding-webmention-support-to-a-static-site/). Lisez la section ["Amélioration à l'aide des Microformats"](https://keithjgrant.com/posts/2019/02/adding-webmention-support-to-a-static-site/#enhancing-with-microformats) pour plus d'explication et d'exemple.

## Ressources additionnelles

- La totalité du code source de mon site est sur [Github](https://github.com/siakaramalegos/sia.codes-eleventy). Il évoluera avec le temps, j'en suis sûre, regardez donc attentivement [ce commit](https://github.com/siakaramalegos/sia.codes-eleventy/commit/d7318565917b1342b38d6b3bff4e3e548276afca) qui contient l'ensemble de mes changements pour l'ajout des webmentions.
- Comment ajouter le support de `dotenv` sur Netlify est abordé dans [cette réponse sur Stack Overflow](https://stackoverflow.com/questions/48453493/set-environment-variable-for-build-in-netlify).
- Comment définir un job `cron` via Github Actions pour régénérer périodiquement mon site sur Netlify (afin de récupérer et d'afficher les nouvelles webmentions) est détaillé dans [Programmer des déploiements Netlify avec les GitHub Actions](https://www.voorhoede.nl/en/blog/scheduling-netlify-deploys-with-github-actions/).
