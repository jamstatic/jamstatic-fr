---
title: Passez en mode hors-connexion avec un Service Worker et Hugo !
date: 2017-03-11 17:04:01 +01:00
description: Permettez aux visiteurs de consulter votre site statique en mode hors-connexion
  à l'aide d'un Service Worker
image: assets/images/service-worker.png
source:
  title: Go offline! Service Worker and Hugo
  url: https://gohugohq.com/howto/go-offline-with-service-worker/
---

La majorité des articles publiés jusqu'ici se référaient à Jekyll, cette fois
place à [Hugo](http://gohugo.io/). Hugo est un générateur de site statique
populaire très performant et beaucoup plus performant pour vos visiteurs si vous
lui adjoignez les services d'un Service Worker pour gérer le mode déconnecté de
votre site web. Notez que les explications fournies ici sont valables et
facilement adaptables pour tout autre générateur statique.
{: .intro }

Après le _mobile first_, place maintenant au _offline first_ et [_aux
progressive web apps
(PWA)_](https://frank.taillandier.me/2016/06/28/que-sont-les-progressive-web-apps/)
tous deux très tendances en ce moment. Les Service Workers jouent un rôle majeur
dans tous les cas de figure. Un Service Worker en gros c'est un script qui va
jouer le rôle d'un proxy entre le navigateur web et le réseau Internet. Vous
trouverez dans cet article un exemple simple qui vous permettra d'installer un
Service Worker sur un site statique généré avec [Hugo](http://gohugo.io/) afin
de le rendre ultra-performant.

## De quoi parle-t-on ?

Si vous n'avez pas encore entendu parler des Service Workers et que vous voulez
en savoir plus sur le sujet, merci de consulter les liens suivants :

* **[Votre première Progressive Web App](https://developers.google.com/web/fundamentals/getting-started/codelabs/your-first-pwapp/)** publié sur Google Developers
* **[L'API Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)** publié sur MDN Mozilla Developer Network
* **[Service Worker Revolution](https://ponyfoo.com/articles/serviceworker-revolution)** publié chez Ponyfoo
* **[Tout ce que vous devez savoir pour créer vos premières application hors-ligne](https://github.com/pazguille/offline-first)** sur Github

Maintenant que vous avez lu tout ça - ou du moins que vous avez compris de quoi
il en retourne - voici ce que nous allons faire :

* **Installer un Service Worker** à partir d'un exemple dans Hugo.
* **Afficher une page hors-connexion personnalisée** en cas de panne de réseau
  ou si la page n'est pas en cache
* **Afficher une page d'erreur 404 personnalisée** en cas de requêtes HTTP
  retournant une erreur client de type 4xx
* **Ajouter un fichier `manifest.json`** pour définir l'apparence de
  l'application Web sur mobile.

## Pré-requis

### Créer une page `hors-connexion`

Assurez vous de créer une page hors-connexion personnalisée pour afficher à vos
visiteurs quand ils déconnectés du réseau.

Par exemple vous pouvez créer les fichiers suivants :

```sh
├── content
│   ├── offline.md
├── layouts
│   ├── offline/single.html
```

Contenu du fichier **content/offline.md** :

```md
+++
date = "2016-10-16T19:28:41+02:00"
draft = false
title = "Oops, vous êtes déconnecté du réseau."
type = "offline"
+++

Essayez de vous connecter à Internet pour naviguer sur le site.
```

Le fichier **layouts/offline/single.html** :

```liquid
<html>
 <head>
  <title>{% raw %}{{ .Title }}{% endraw %}</title>
 </head>
 <body>
    <h1>{% raw %}{{ .Title }}{% endraw %}</h1>
    {% raw %}{{ .Content }}{% endraw %}
 </body>
</html>
```

C'est _vraiment un exemple minimaliste_, vous pouvez bien entendu créer une page
hors-connexion avec le contenu de votre choix.

Mais déjà grâce à notre exemple, nous avons généré une page
`offline/index.html`. OK, ça c'est fait.

### Créer une page 404 personnalisée

Si votre projet ne possède pas encore de page 404 personnalisée, vous pouvez
vous référer à [la documentation d'Hugo pour créer une page
404](https://gohugo.io/templates/404/) ou vous contenter de suivre les quelques
instructions de base ci-dessous.

Pour cela, vous aurez besoin des fichiers suivants :

```sh
├──content
│   ├── 404.md
├── layouts
│   ├── 404.html
```

Le fichier **content/404.md** :

```md
+++
date = "2016-10-16T19:28:41+02:00"
draft = false
title = "Zut... Page non trouvée."
+++

Vous devriez aller voir ailleurs.
```

Le fichier **layouts/404.html** :

```html
<html>
 <head>
  <title>{% raw %}{{ .Title }}{% endraw %}</title>
 </head>
 <body>
    <h1>{% raw %}{{ .Title }}{% endraw %}</h1>
    {% raw %}{{ .Content }}{% endraw %}
 </body>
</html>
```

### Créer les icônes de l'application Web

Les icônes des applications sont juste des favicons qu'on affiche sur un écran
de démarrage au chargement du site depuis l'écran d'accueil.

Les tailles suivantes sont recommandées :

* 128px × 128px
* 144px × 144px
* 152px × 152px
* 192px × 192px
* 256px × 256px

Pour les générer rapidement, vous pouvez utiliser un service comme
[favicomatic.com](http://www.favicomatic.com/).

Ensuite placez les fichiers PNG dans votre dossier `/static` folder.
Par exemple :

```sh
├── static
│   ├── favicons
│   │   ├── icon-128x128.png
│   │   ├── icon-144x144.png
│   │   ├── icon-152x152.png
│   │   ├── icon-192x192.png
│   │   ├── icon-256x256.png
```

### Installation du fichier `manifest.json`

Le vrai travail commence maintenant avec la création et la configuration du
fichier `manifest.json`.

Nous allons utiliser pour cela un [exemple de fichier
manifest](https://github.com/wildhaber/offline-first-sw/blob/master/manifest.json)
existant tiré du dépôt `offline-first-sw`.

Placez ce fichier également dans le dossier `static/`, il doit obligatoirement
se trouver à la racine comme ceci :

```sh
├── static
│   ├── manifest.json
```

Vous pouvez recopier ce fichier à la main ou utiliser la commande suivante si
vous travaillez dans un environnement GNU Linux ou MacOS :

```sh
# à partir du dossier raçine de Hugo
cd static
wget https://raw.githubusercontent.com/wildhaber/offline-first-sw/master/manifest.js
```

Vous devriez maintenant avoir un fichier qui ressemble à cela dans votre dossier
`static` :

```json
{
  "name": "<nom-de-votre-application>",
  "short_name": "<nom-abrégé>",
  "icons": [{
    "src": "/img/icons/logo-128x128.png",
    "sizes": "128x128",
    "type": "image/png"
  }, {
    "src": "/img/icons/logo-144x144.png",
    "sizes": "144x144",
    "type": "image/png"
  }, {
    "src": "/img/icons/logo-152x152.png",
    "sizes": "152x152",
    "type": "image/png"
  }, {
    "src": "/img/icons/logo-192x192.png",
    "sizes": "192x192",
    "type": "image/png"
  }, {
    "src": "/img/icons/logo-256x256.png",
    "sizes": "256x256",
    "type": "image/png"
  }],
  "start_url": "/index.html",
  "display": "standalone",
  "orientation" : "portrait",
  "background_color": "#000000",
  "theme_color": "#000000"
}
```

Ajustez les valeurs à votre guise.

### Ajoutez un lien vers `manifest.json` dans votre modèle

Pour que le navigateur soit en mesure de détecter votre `manifest.json`, ajoutez
le bout du code suivant dans le `<head>` de vos modèles :

```html
<link rel="manifest" href="/manifest.json">
```

### Installation du Service Worker

Pour cela nous allons aussi utiliser l'exemple de [Service
Worker](https://github.com/wildhaber/offline-first-sw/blob/master/sw.js) fourni
dans le dépôt
[`offline-first-sw`](https://github.com/wildhaber/offline-first-sw).

Le fichier `sw.js` doit également se trouver à la racine du dossier `static`
comme ceci :

```sh
├── static
│   ├── sw.js
```

Là encore soit vous recopiez le fichier à la main, soit vous utilisez la
commande suivante dans un environnement GNU Linux ou MacOS :

```sh
# à partir du dossier racine d'Hugo
cd static
wget https://raw.githubusercontent.com/wildhaber/offline-first-sw/master/sw.js
```

Vous devez vous retrouver avec le fichier suivant à la racine :

```js
const CACHE_VERSION = 1;

const BASE_CACHE_FILES = [
  '/style.css',
  '/script.js',
  '/search.json',
  '/manifest.json',
  '/favicon.png',
];

const OFFLINE_CACHE_FILES = [
  '/style.css',
  '/script.js',
  '/offline/index.html',
];

const NOT_FOUND_CACHE_FILES = [
  '/style.css',
  '/script.js',
  '/404.html',
];

const OFFLINE_PAGE = '/offline/index.html';
const NOT_FOUND_PAGE = '/404.html';

const CACHE_VERSIONS = {
  assets: 'assets-v' + CACHE_VERSION,
  content: 'content-v' + CACHE_VERSION,
  offline: 'offline-v' + CACHE_VERSION,
  notFound: '404-v' + CACHE_VERSION,
};

// Durée de mise en cache en SECONDES en fonction des différentes extensions
const MAX_TTL = {
  '/': 3600,
  html: 3600,
  json: 86400,
  js: 86400,
  css: 86400,
};

const CACHE_BLACKLIST = [
  //(str) => {
  //    return !str.startsWith('http://localhost') && !str.startsWith('https://jamstatic.fr');
  //},
];

const SUPPORTED_METHODS = [
  'GET',
];

/**
 * isBlackListed
 * @param {string} url
 * @returns {boolean}
 */
function isBlacklisted(url) {
  return (CACHE_BLACKLIST.length > 0) ? !CACHE_BLACKLIST.filter((rule) => {
    if (typeof rule === 'function') {
      return !rule(url);
    } else {
      return false;
    }
  }).length : false
}

/**
 * getFileExtension
 * @param {string} url
 * @returns {string}
 */
function getFileExtension(url) {
  let extension = url.split('.').reverse()[0].split('?')[0];
  return (extension.endsWith('/')) ? '/' : extension;
}

/**
 * getTTL
 * @param {string} url
 */
function getTTL(url) {
  if (typeof url === 'string') {
    let extension = getFileExtension(url);
    if (typeof MAX_TTL[extension] === 'number') {
      return MAX_TTL[extension];
    } else {
      return null;
    }
  } else {
    return null;
  }
}

/**
 * installServiceWorker
 * @returns {Promise}
 */
function installServiceWorker() {
  return Promise.all(
    [
      caches.open(CACHE_VERSIONS.assets)
      .then(
        (cache) => {
          return cache.addAll(BASE_CACHE_FILES);
        }
      ),
      caches.open(CACHE_VERSIONS.offline)
      .then(
        (cache) => {
          return cache.addAll(OFFLINE_CACHE_FILES);
        }
      ),
      caches.open(CACHE_VERSIONS.notFound)
      .then(
        (cache) => {
          return cache.addAll(NOT_FOUND_CACHE_FILES);
        }
      )
    ]
  );
}

/**
 * cleanupLegacyCache
 * @returns {Promise}
 */
function cleanupLegacyCache() {

  let currentCaches = Object.keys(CACHE_VERSIONS)
    .map(
      (key) => {
        return CACHE_VERSIONS[key];
      }
    );

  return new Promise(
    (resolve, reject) => {

      caches.keys()
        .then(
          (keys) => {
            return legacyKeys = keys.filter(
              (key) => {
                return !~currentCaches.indexOf(key);
              }
            );
          }
        )
        .then(
          (legacy) => {
            if (legacy.length) {
              Promise.all(
                  legacy.map(
                    (legacyKey) => {
                      return caches.delete(legacyKey)
                    }
                  )
                )
                .then(
                  () => {
                    resolve()
                  }
                )
                .catch(
                  (err) => {
                    reject(err);
                  }
                );
            } else {
              resolve();
            }
          }
        )
        .catch(
          () => {
            reject();
          }
        );

    }
  );
}


self.addEventListener(
  'install', event => {
    event.waitUntil(installServiceWorker());
  }
);

// La méthode activate est chargée de supprimer les vieux caches
self.addEventListener(
  'activate', event => {
    event.waitUntil(
      Promise.all(
        [
          cleanupLegacyCache(),
        ]
      )
      .catch(
        (err) => {
          event.skipWaiting();
        }
      )
    );
  }
);

self.addEventListener(
  'fetch', event => {

    event.respondWith(
      caches.open(CACHE_VERSIONS.content)
      .then(
        (cache) => {

          return cache.match(event.request)
            .then(
              (response) => {

                if (response) {

                  let headers = response.headers.entries();
                  let date = null;

                  for (let pair of headers) {
                    if (pair[0] === 'date') {
                      date = new Date(pair[1]);
                    }
                  }

                  if (date) {
                    let age = parseInt((new Date().getTime() - date.getTime()) / 1000);
                    let ttl = getTTL(event.request.url);

                    if (ttl & amp; & amp; age > ttl) {

                      return new Promise(
                          (resolve) => {

                            return fetch(event.request)
                              .then(
                                (updatedResponse) => {
                                  if (updatedResponse) {
                                    cache.put(event.request, updatedResponse.clone());
                                    resolve(updatedResponse);
                                  } else {
                                    resolve(response)
                                  }
                                }
                              )
                              .catch(
                                () => {
                                  resolve(response);
                                }
                              );

                          }
                        )
                        .catch(
                          (err) => {
                            return response;
                          }
                        );
                    } else {
                      return response;
                    }

                  } else {
                    return response;
                  }

                } else {
                  return null;
                }
              }
            )
            .then(
              (response) => {
                if (response) {
                  return response;
                } else {
                  return fetch(event.request)
                    .then(
                      (response) => {

                        if (response.status < 400) {
                          if (~SUPPORTED_METHODS.indexOf(event.request.method) & amp; & amp; !isBlacklisted(event.request.url)) {
                            cache.put(event.request, response.clone());
                          }
                          return response;
                        } else {
                          return caches.open(CACHE_VERSIONS.notFound).then((cache) => {
                            return cache.match(NOT_FOUND_PAGE);
                          })
                        }
                      }
                    )
                    .then((response) => {
                      if (response) {
                        return response;
                      }
                    })
                    .catch(
                      () => {

                        return caches.open(CACHE_VERSIONS.offline)
                          .then(
                            (offlineCache) => {
                              return offlineCache.match(OFFLINE_PAGE)
                            }
                          )

                      }
                    );
                }
              }
            )
            .catch(
              (error) => {
                console.error('Error in fetch handler:', error);
                throw error;
              }
            );
        }
      )
    );

  }
);
```

Maintenant vous pouvez définir le comportement souhaité pour votre Service
Worker :

#### Fichiers à mettre en cache par défaut

```js
const BASE_CACHE_FILES = [
    '/style.css',
    '/script.js',
    '/search.json',
    '/manifest.json',
    '/favicon.png',
];
```

Listez dans ce tableau tous les fichiers qui devraient être mis en cache par
défaut

#### Fichiers en mode hors-connexion

```js
const OFFLINE_CACHE_FILES = [
    '/style.css',
    '/script.js',
    '/offline/index.html',
];
```

Listez dans ce tableau les fichiers nécessaires pour l'affichage de votre page
`offline`.

#### Fichiers en cas d'erreur 4xx

```js
const NOT_FOUND_CACHE_FILES = [
    '/style.css',
    '/script.js',
    '/404.html',
];
```

Listez dans ce tableau les fichiers nécessaires pour l'affichage de votre page
d'erreur 404.

#### Page hors-connexion

```js
const OFFLINE_PAGE = '/offline/index.html';
```

C'est la page qui sera affichée quand le visiteur sera déconnecté du réseau ou
que la page n'est pas déjà en cache.

#### Page d'erreur

```js
const NOT_FOUND_PAGE = '/404.html';
```

Le chemin de la page qui sera affichée en cas d'erreur de type 4xx.

#### Durée de mise en cache

```js
const MAX_TTL = {
    '/': 3600,
    html: 3600,
    json: 86400,
    js: 86400,
    css: 86400,
};
```

Ce tableau clé-valeur indique pour chaque type d'extension de fichier la durée
maximum de mise en cache appelée _Time To Live_ (définit **en secondes** et pas
en millisecondes). C'est le temps qui s'écoulera avant qu'un fichier ne soit mis
à jour à partir du réseau.

Les extensions non présentes resteront en cache jusqu'à la prochaine la mise à
jour du cache par le Service Worker.

```js
// 60 = 1 minute
// 3600 = 1 heure
// 86400 = 1 jour
// 604800 = 1 semaine
// 2592000 = 30 jours (~ 1 mois)
// 31536000 = 1 an
```

#### Fichiers à exclure de la mise en cache

```js
const CACHE_BLACKLIST = [
    (str) => {
        // str = URL de la ressource
        // Appliquer cette régle lorsque vous ne voulez pas mettre des fichiers externes en cache
        return !str.startsWith('https://votresiteweb.tld');
    },
];
```

Ajustez ces paramètres au contexte de votre site ou de votre application.

### Enregistrement du Service Worker

Ajoutez le script suivant avant la fermeture de la balise `<body>` ou placez le
dans votre fichier JavaScript généré :

```html
<script>
    if('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/sw.js', { scope: '/' })
            .then(function(registration) {
                console.log('Service Worker enregistré');
            });

        navigator.serviceWorker
            .ready
            .then(function(registration) {
                console.log('Service Worker prêt');
            });
    }
</script>
```

Ce code JS va enregistrer, installer et activer votre Service Worker.

Vous en avez à présent terminé avec toutes les étapes nécessaires. Vous disposez
maintenant d'un site Hugo ultra-rapide. :)

### Débogguer votre Service Worker

Pour débogguer un Service Worker avec Google Chrome, il vous suffit d'ouvrir la
console et d'aller dans l'onglet `Application`. C'est là que vous trouverez
votre Service Worker et vos caches.

Vous en apprendrez davantage sur le [déboggage de Service Workers](https://developers.google.com/web/fundamentals/getting-started/codelabs/debugging-service-workers/)
sur le site pour les développeurs de Google.

Si votre navigateur préféré est Firefox vous en saurez plus sur [le déboggage des Service Workers et Push à l'aide des outils de développement pour Firefox](https://hacks.mozilla.org/2016/03/debugging-service-workers-and-push-with-firefox-devtools/)
sur hacks.mozilla.org.
