---
title: "Guide complet des Webmentions avec Eleventy"
description: Ajoutez les Webmentions à votre site statique Eleventy grâce à ce guide pas à pas.
date: 2019-11-30T13:48:32+01:00
lastmod: 2019-11-30T13:49:32+01:00
draft: true
categories:
  - eleventy
images:
  - /assets/images/2019/11/
source:
  author: "Sia Karamalegos"
  title: "An In-Depth Tutorial of Webmentions + Eleventy"
  url: "https://sia.codes/posts/webmentions-eleventy-in-depth/"
---

Je suis toujours une grande fan du générateur de site statique [Eleventy](https://www.11ty.io/), et j'étais impatiente de gérer les [Webmentions](https://indieweb.org/Webmention) avec.

> Webmention est un standard web pour les mentions et les conversations sur le web, un puissant élément constitutif d'un réseau fédéré croissant de commentaires, d'appréciations, de rediffusions et d'autres riches interactions  sur le web social décentralisé.
> — [IndieWeb.org](https://indieweb.org/Webmention)

C'est un outil très cool qui vous permet d'avoir des interactions sociales quand vous hébergez votre propre contenu. Max Böck a écrit un excellent article qui détaille son implémentation, [Indieweb statique 2e partie : utiliser les Webmentions](https://mxb.dev/blog/using-webmentions-on-static-sites/). Il a également crée un starter pour Eleventy, [eleventy-webmentions](https://github.com/maxboeck/eleventy-webmentions), un modèle de départ avec un support basique des webmentions.

Alors pourquoi écrire cet article ? Malheureusement pour moi j'ai commencé à déveloper mon site avec le [blog de base pour Eleventy](https://github.com/11ty/eleventy-base-blog) et j'avais déjà terminé quand j'ai découvert [eleventy-webmentions](https://github.com/maxboeck/eleventy-webmentions). J'ai dû lutter pour développer pleinement cette fonctionnalité, car je débute encore avec Eleventy. J'ai donc voulu partager en détail les étapes que j'ai dû mener à bien, en espérant que ça aide davantage d'entre vous à rejoindre l'IndieWeb.

Le but de cet article est d'ahouter les webmentions à un site Eleventy, après coup. Les fichiers, les dossiers, et l'architecture du site sont les mêmes que dans `eleventy-base-blog`, mais vous pouvez vous en servir comme point de départ pour un site Eleventy. Simplement faites attention aux endroits où votre architecture pourrait différer.

Le code de cet article est un mélange de l'article de Max Böck, son [site perso](https://github.com/maxboeck/mxb), du modèle d'amorçage [eleventy-webmentions](https://github.com/maxboeck/eleventy-webmentions), du [site de Zach Leatherman](https://github.com/zachleat/zachleat.com), et des modifications effectuées pendant ma propre implémentation. Je leur suis très reconnaissante pour leur travail, car je n'aurais jamais pu arriver à ce résultat sans eux.

## Étape 1 : s'inscrire sur webmentions.io

Il nous faut d'abord s'inscrire sur webmention.io, le service tiers qui nous permet de profiter du pouvoir des webmentions sur les sites statiques.

1. Configurer IndieAuth de manière à ce que webmention.io sache que vous êtes bien le propriétaire de votre domaine. Suivez les instructions données [sur leur site](https://indieauth.com/setup).
2. Allez sur [webmention.io/](https://webmention.io/).
3. Entrez l'URL de votre site web dans le champ "Web Sign-In" , et cliquez sur "Sign in".

Si la validation est réussie, vous devriez être redirigé vers le tableau des webmnetions où sont affichées deux balises `<link>` que vous devez insérez dans la balise `<head>` de votre site web :

```html
<!-- _includes/layouts/base.njk -->
<link rel="webmention" href="https://webmention.io/<your.domain>/webmention" />
<link rel="pingback" href="https://webmention.io/<your.domain>/xmlrpc" />
```

Vous disposez aussi d'un token d'API personnel. Nous voulons pouvoir le stocker de manière sécurisée dans nos variables d'environnement locales. Installez `dotenv` pour définir et accéder facilement à vos variables d'environnement :

```bash
npm install dotenv
```

Créez un fichier `.env` à lma racine de votre projet et ajoutez votre token d'API pour webmention.io.

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

Vous aimeriez probablement avec quelques webmentions. Si vous utilisez Twitter, [Bridgy](https://brid.gy/) est un excellent moyen de récupérer vos mentions depuis Twitter. Assurez d'abord qu'un lien vers votre site web est présent dans votre profil, puis connectez le.

## Comment tout ça va marcher

Quand nous lançons une génération avec `NODE_ENV=production`, nous allons récupérer les nouvelles webmentions publiées depuis la fois précédente. Celles-ci seront sauvées dans le fichier `_cache/webmentions.json`.  Ces mentions proviennent de l'[API de webmention.io](https://github.com/aaronpk/webmention.io#api).

Lors de chaque génération, pour chaque page :

- From the webmentions cache in `_cache/webmentions.json`, only keep webmentions that match the URL of the page (for me, this is each blog post).
- Use a `webmentionsByType` function to filter for one type (e.g., likes or replies)
- Use a `size` function to calculate the count of those mentions by type
- Render the count with mention type as a heading (e.g., "7 Replies")
- Render a list of the mentions of that type (e.g., linked Twitter profile pictures representing each like)

## Récupération des webmentions

First, we need to set up our domain as another property in our `_data/metadata.json`. Let's also add our root URL for use later:

```json
// _data/metadata.json
{
  //...other metadata
  "domain": "example.com",
  "url": "https://example.com"
}
```

Next, we'll add a few more dependencies:

```bash
$ npm install lodash node-fetch
```

And update our `build` script to set the `NODE_ENV` in our `package.json`:
```json
// package.json
{
  // … config
  "scripts": {
    "build": "NODE_ENV=production npx eleventy",
    // scripts…
}
```

Now we can focus on the fetch code. Okay, okay, I know this next file is beaucoup long, but I thought it was more difficult to understand out of context. Here are the general steps happening in the code:

1. Read any mentions from the file cache at `_cache/webmentions.json`.
2. If our environment is "production", fetch new webmentions since the last time we fetched. Merge them with the cached ones and save to the cache file. Return the merged set of mentions.
3. If our envinroment is not "production", return the cached mentions from the file

```javascript
// _data/webmentions.js
const fs = require('fs')
const fetch = require('node-fetch')
const unionBy = require('lodash/unionBy')
const domain = require('./metadata.json').domain

// Load .env variables with dotenv
require('dotenv').config()

// Define Cache Location and API Endpoint
const CACHE_FILE_PATH = '_cache/webmentions.json'
const API = 'https://webmention.io/api'
const TOKEN = process.env.WEBMENTION_IO_TOKEN

async function fetchWebmentions(since, perPage = 10000) {
  // If we dont have a domain name or token, abort
  if (!domain || !TOKEN) {
    console.warn('>>> unable to fetch webmentions: missing domain or token')
    return false
  }

  let url = `${API}/mentions.jf2?domain=${domain}&token=${TOKEN}&per-page=${perPage}`
    if (since) url += `&since=${since}` // only fetch new mentions

  const response = await fetch(url)
  if (response.ok) {
    const feed = await response.json()
    console.log(`>>> ${feed.children.length} new webmentions fetched from ${API}`)
    return feed
  }

  return null
}

// Merge fresh webmentions with cached entries, unique per id
function mergeWebmentions(a, b) {
  return unionBy(a.children, b.children, 'wm-id')
}

// save combined webmentions in cache file
function writeToCache(data) {
  const dir = '_cache'
  const fileContent = JSON.stringify(data, null, 2)
  // create cache folder if it doesnt exist already
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  // write data to cache json file
  fs.writeFile(CACHE_FILE_PATH, fileContent, err => {
    if (err) throw err
    console.log(`>>> webmentions cached to ${CACHE_FILE_PATH}`)
  })
}

// get cache contents from json file
function readFromCache() {
  if (fs.existsSync(CACHE_FILE_PATH)) {
    const cacheFile = fs.readFileSync(CACHE_FILE_PATH)
    return JSON.parse(cacheFile)
  }

  // no cache found.
  return {
    lastFetched: null,
    children: []
  }
}

module.exports = async function () {
  console.log('>>> Reading webmentions from cache...');

  const cache = readFromCache()

  if (cache.children.length) {
    console.log(`>>> ${cache.children.length} webmentions loaded from cache`)
  }

  // Only fetch new mentions in production
  if (process.env.NODE_ENV === 'production') {
    console.log('>>> Checking for new webmentions...');
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

## Filters for build

Now that we've populated our webmentions cache, we need to use it. First we have to generate the functions, or "filters" that Eleventy will use to build our templates.

First, I like keeping some filters separated from the main Eleventy config so that it doesn't get too bogged down. The separate filters file will define each of our filters in an object. The keys are the filter names and the values are the filter functions. In `_11ty/filters.js`, add each of our new filter functions:

```javascript
// _11ty/filters.js
const { DateTime } = require("luxon"); // Already in eleventy-base-blog

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

Now to use these new filters, in our `.eleventy.js`, we need to loop through the keys of that filters object to add each filter to our Eleventy config:

```javascript
// .eleventy.js
// ...Other imports
const filters = require('./_11ty/filters')

module.exports = function(eleventyConfig) {
  // Filters
  Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  })

  // Other configs...
```

I do not have a sanitize HTML filter because I noticed the content data has a `text` field that is already sanitized. Maybe this is new or not true for all webmentions. I'll update this post if I add it in.

## Rendering mentions

Now we're ready to put it all together and render our webmentions. I put them at the bottom of each blog post, so in my `_includes/layouts/post.njk`, I add a new section for the webmentions. Here, we are setting a variable called `webmentionUrl` to the page's full URL, and passing it into the partial for the `webmentions.njk` template:

```html
<!-- _includes/layouts/post.njk -->
<section>
  <h2>Webmentions</h3>
  {% set webmentionUrl %}{{ page.url | url | absoluteUrl(site.url) }}{% endset %}
  {% include 'webmentions.njk' %}
</section>
```

Now we can write the webmentions template. In this example, I will show links, retweets, and replies. First, I set all of the variables I will need for rendering in a bit:

```html
<!-- _includes/webmentions.njk -->
  <!-- Filter the cached mentions to only include ones matching the post's url -->
  {% set mentions = webmentions | getWebmentionsForUrl(metadata.url + webmentionUrl) %}
  <!-- Set reposts as mentions that are `repost-of`  -->
  {% set reposts = mentions | webmentionsByType('repost-of') %}
  <!-- Count the total reposts -->
  {% set repostsSize = reposts | size %}
  <!-- Set likes as mentions that are `like-of`  -->
  {% set likes = mentions | webmentionsByType('like-of') %}
  <!-- Count the total likes -->
  {% set likesSize = likes | size %}
  <!-- Set replies as mentions that are `in-reply-to`  -->
  {% set replies = mentions | webmentionsByType('in-reply-to')  %}
  <!-- Count the total replies -->
  {% set repliesSize = replies | size  %}
```

With our variables set, we can now use that data for rendering. Here I'll walk through only "replies", but feel free to see a snapshot of how I handled the remaining sets in [this gist](https://gist.github.com/siakaramalegos/b1f7ded21f9ecddaee91e3f6d88e2e48).

Since replies are more complex than just rendering a photo and link, I call another template to render the individual webmention. Here we render the count of replies and conditionally plural-ify the word "Reply". Then we loop through the reply webmentions to render them with a new nunjucks partial:

```html
<!-- _includes/webmentions.njk -->
<!-- ...setting variables and other markup -->
{% if repliesSize > 0 %}
<div class="webmention-replies">
  <h3>{{ repliesSize }} {% if repliesSize == "1" %}Reply{% else %}Replies{% endif %}</h3>

  {% for webmention in replies %}
    {% include 'webmention.njk' %}
  {% endfor %}
</div>
{% endif %}
```

Finally, we can render our replies using that new partial for a single reply webmention. Here, if the author has a photo, we show it, otherwise we show an avatar. We also conditionally show their name if it exists, otherwise we show "Anonymous". We use our `readableDateFromISO` filter to show a human-friendly published date, and finally render the text of the webmention:

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

## Bravely jumping into the black hole…
Does it work?!?! We can finally test it out. First run `npm run build` to generate an initial list of webmentions that is saved to the `_cache/webmentions.json` file. Then run your local development server and see if it worked! Of course, you'll need to have at least one webmention associated with a post to see anything. 😁

You can see the result of my own implementation below. Good luck! Let me know how it turns out or if you find in bugs or errors in this post!

## Continue your journey by using Microformats

Keith Grant has a great write-up in his article [Adding Webmention Support to a Static Site](https://keithjgrant.com/posts/2019/02/adding-webmention-support-to-a-static-site/). Check out the "Enhancing with Microformats" section for an explanation and examples.

## Additional resources

- You can find the full code for my site on [Github](https://github.com/siakaramalegos/sia.codes-eleventy). It will evolve in the future, I'm sure, so you can focus on [this commit](https://github.com/siakaramalegos/sia.codes-eleventy/commit/d7318565917b1342b38d6b3bff4e3e548276afca) which has the bulk of my changes for adding webmentions.
- How I added dotenv support to Netlify is covered in this [Stack Overflow answer](https://stackoverflow.com/questions/48453493/set-environment-variable-for-build-in-netlify).
- How I set up a "cron" job through Github actions to periodically rebuild my site on Netlify (to grab and post new webmentions) is covered in [Scheduling Netlify deploys with GitHub Actions](https://www.voorhoede.nl/en/blog/scheduling-netlify-deploys-with-github-actions/).
