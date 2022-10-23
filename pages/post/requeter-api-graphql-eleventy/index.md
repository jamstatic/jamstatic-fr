---
title: "Consommer l'API GraphQL d'un CMS headless avec Eleventy"
description: "Eleventy permet de récupérer les données d'une API GraphQL pour générer des pages statiques, en lieu et place des fichiers Markdown."
author: jerome
date: 2019-09-08T23:00:48+02:00
lastmod: 2019-09-08T23:00:48+02:00
images:
 - https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/w_1120,c_fit,co_white,g_north_west,x_80,y_80,l_text:poppins_80_ultrabold_line_spacing_-30:Consommer%2520l'API%2520GraphQL%2520d'un%2520CMS%2520headless%2520avec%2520Eleventy/jamstatic/twitter-card.png
categories:
  - eleventy
  - headless 
source:
  author: Jérôme Coupé
  title: Consuming a headless CMS GraphQL API with Eleventy
  url: "https://www.webstoemp.com/blog/headless-cms-graphql-api-eleventy/"
---

## Les différents types de CMS headless

Si vous avez besoin d'ajouter un [CMS headless](/2017/12/15/cms-headless/) à votre site web, vous avez le choix entre deux approches : soit le contenu est versionné dans votre dépôt Git, soit il est accessible via une API tierce.

Dans les deux cas, les créateurs de contenu ont accès à une interface graphique, mais ce qui se passe en coulisses quand du contenu est crée, modifié ou effacé est totalement différent.

### Les CMS headless basés sur Git

Les CMS basés sur Git comme [Netlify CMS](https://www.netlifycms.org/) ou [Forestry](https://forestry.io) vont sauvegarder votre contenu dans des fichiers texte et les sauvegarder dans votre dépôt Git. C'est l'approche que je préfère pour les raisons suivantes :

- code et contenu partagent le même workflow
- le contenu est versionné par Git avec un historique clair
- le contenu stocké sous forme de fichiers texte (markdown, YAML, JSON, etc.) est extrêmement portable

### Les APIs de CMS headless

Les CMS basés sur des APIs comme [Contentful](https://www.contentful.com/) ou [DatoCMS](https://www.datocms.com/) vont sauvegarder vos contenus dans le Cloud et vont le rendre accessible via une API. GraphQL est en passe de devenir une façon populaire d'interroger et de tirer parti de ces APIs. Selon moi, cette approche présente de l'intérêt lorsque :

- le contenu est destiné à être publié sur différentes plateformes
- vos modèles de données sont hautement relationnels

## Structure du projet

[Eleventy](https://www.11ty.dev/)(11ty), qui est en passe de devenir mon générateur de site statique de prédilection, est à même de pouvoir travailler avec les deux approches de façon assez élégante et avec un minimum d'efforts.

Qui aurait pensé faire une requète sur une API GraphQL et utiliser les données retournées pour générer des pages statiques serait aussi simple ?

[DatoCMS](https://www.datocms.com/) est un CMS headless que je recommande à mes clients. Son prix est raisonnable, il propose des options suffisantes et reste très flexible, il gère élégamment l'internationalisation, et propose une bonne expérience utilisateur et de développement.

Si cet article est écrit pour DatoCMS, cette méthodologie est appliquable à tout CMS headless offrant une API GraphQL.

Voici l'arborescence de fichiers classique avec laquelle nous allons travailler dans Eleventy :

```text
+-- src
  +-- _data
    +-- blogposts.js
  +-- _includes
    +-- layouts
      +-- base.njk
  +-- blogposts
    +-- entry.njk
    +-- list.njk
+-- .eleventy.js
+-- .env
+-- .env.example
+-- package-lock.json
+-- package.json
```

## Configuration de DatoCMS

Après avoir crée notre compte, nous avons besoin d'un modèle de données et de quelques entrées dans DatoCMS. J'ai crée un modèle de données nommé `blogposts` avec une série de champs et quelques entrées.

Nous pouvons alors utiliser notre [token d'API](https://www.datocms.com/docs/content-delivery-api/authentication) pour nous connecter à [l'explorateur de l'API GraphQL](https://cda-explorer.datocms.com/) afin de visualiser les requêtes et les options disponibles, ainsi que le JSON qui nous est retourné.

Une fois encore, la plupart des CMS headless avec une API GraphQL offrent cette fonctionnalité d'une manière ou d'une autre.

## Configuration d'Eleventy

Nous allons devoir nous authentifier au serveur GraphQL de DatoCMS avec notre [token d'API](https://www.datocms.com/docs/content-delivery-api/authentication). Nous pouvons utiliser [`dotenv`](https://www.npmjs.com/package/dotenv) pour le stocker dans un fichier `.env` que nous ajouterons à notre fichier `.gitignore` pour éviter qu'il ne soit stocké dans notre dépôt Git. Après avoir installé le paquet, nous créons le fichier `.env` à la racine du projet et y ajoutons le token de l'API de DatoCMS :

```text
DATOCMS_TOKEN="fak3t0k3n3c52750d04b3d92383b1d"
```

Ensuite, il nous faut ajouter la ligne suivant au début de notre fichier de configuration `.eleventy.js` :

```js
require("dotenv").config();
```

Étant donné que ce fichier est traité très tôt par [Eleventy](https://www.11ty.dev/), notre token sera accessible dans tous nos templates via `process.env.DATOCMS_TOKEN`.

## Utilisation des fichiers de données JavaScript

Au lieu d'aller piocher nos données à l'aide de collections et de fichiers Markdown avec du front matter en YAML, nous allons utiliser [les fichiers de données JavaScript d'Eleventy](https://www.11ty.dev/docs/data-js/). Nous utiliserons le fichier `src/_data/blogposts.js` pour nous connecter à [la content delivery API](https://www.datocms.com/docs/content-delivery-api/) de DatoCMS lors de la génération du site, afin d'exporter un fichier JSON contenant tous les articles de blog avec les champs dont nous avons besoin. Le contenu de ce fichier sera accessible dans nos templates via l'objet `blogposts`.

Eleventy sera alors en mesure d'utiliser ce fichier JSON pour générer les pages de détail et d'index de notre blog.

Çi-dessous, le fichier complet nécessaire pour récupérer tous nos articles de blog, qui se base sur [le code de la requête en Vanilla JS](https://www.datocms.com/docs/content-delivery-api/first-request#vanilla-js-exampl) donné en exemple dans la documentation de DatoCMS.

Afin de miniser les dépendances, j'ai privilégié l'utilisation de `node-fetch` à celle d'Appolo et consorts.

Par défaut l'API GraphQL de DatoCMS limite à 100 le nombre d'enregistrements retournés par requête (merci à [Dan Fascia](https://twitter.com/danfascia) pour sa remarque). Si notre blog comporte plus de 100 entrées, il va donc nous falloir faire plusieurs requêtes et concaténer les résultats pour récupérer l'intégralité de nos articles de blog.

```js
// paquets requis
const fetch = require("node-fetch");

// token de DatoCMS
const token = process.env.DATOCMS_TOKEN;

// récupération des articles de blog
// voir https://www.datocms.com/docs/content-delivery-api/first-request#vanilla-js-example
async function getAllBlogposts() {
  // nombre maximal d'enregistrements retournés par requête
  const recordsPerQuery = 100;

  // nombre d'enregistrements à ignorer (démarre à 0)
  let recordsToSkip = 0;

  // Devons nous faire une nouvelle requête ?
  let makeNewQuery = true;

  // Tableau pour stocker les articles de blog
  let blogposts = [];

  // Effectuer des requpêtes jusqu'à ce que makeNewQuery passe à faux
  while (makeNewQuery) {
    try {
      // Initialisation du téléchargement
      const dato = await fetch("https://graphql.datocms.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          query: `{
            allBlogposts(
              first: ${recordsPerQuery},
              skip: ${recordsToSkip},
              orderBy: _createdAt_DESC,
              filter: {
                _status: {eq: published}
              }
            )
            {
              id
              title
              slug
              intro
              body(markdown: true)
              _createdAt
              image {
                url
                alt
              }
              relatedBlogs {
                id
              }
            }
          }`
        })
      });

      // Enregistrment de la réponse JSON lorsque la promesse est résolue
      const response = await dato.json();

      // Gestion des erreurs DatoCMS
      if (response.errors) {
        let errors = response.errors;
        errors.map((error) => {
          console.log(error.message);
        });
        throw new Error("Aborting: DatoCMS errors");
      }

      // mise à jour du tableau des articles avec les données retournées par la réponse en JSON
      blogposts = blogposts.concat(response.data.allBlogposts);

      // itération des valeurs pour la prochaine requête
      recordsToSkip += recordsPerQuery;

      // Vérification du nombre d'enregistrements retourné
      // S'il y en a moins de 100, on arrête de faire des requêtes
      if (response.data.allBlogposts.length < recordsPerQuery) {
        makeNewQuery = false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  // mise en forme de l'objet blogposts
  const blogpostsFormatted = blogposts.map((item) => {
    return {
      id: item.id,
      date: item._createdAt,
      title: item.title,
      slug: item.slug,
      image: item.image.url,
      imageAlt: item.image.alt,
      summary: item.intro,
      body: item.body,
      relatedBlogs: item.relatedBlogs
    };
  });

  // retour de l'objet formatté
  return blogpostsFormatted;
}

// export pour 11ty
module.exports = getAllBlogposts;
```

Plutôt que d'utiliser directement les données de la réponse JSON, je la mets généralement en forme pour améliorer la maintenabilité future de mes templates. Si quelque chose change au niveau du CMS, je sais que j'aurais seulement à mettre à jour les fichiers de données, et non tous les templates qui les utilisent.

### Les images et les vignettes

Les fichiers et les images uploadés dans DatoCMS sont stockés sur [Imgix](https://www.imgix.com/), nous pouvons donc ajouter [des paramètres à chaque URL d'images](https://docs.imgix.com/apis/url) pour les redimensionner, les retailler et les manipuler de diverses manières. Ces transformations se vont à la volée et sont ensuite mises en cache sur le CDN pour les utilisations ultérieures.

La majorité des CMS headless offrent des fonctionnalités similaires, soit en intégrant des services tiers comme [Cloudinary](https://cloudinary.com/) ou [Uploadcare](https://uploadcare.com/), soit en proposant leur propre API pour les images.

### Champs relationnels

L'API GraphQL de DatoCMS gère très bien les structures de données hautement imbriquées et vous permettra de récupérer les données voulues dans vos champs relationnels. Toutefois, j'adopte généralement une approche plus simple :

- Je crée un gros fichier JSON pour chaque type de données (articles, projets, évènements, etc.), chaque élément possède un identifiant unique.
- Pour les champs relationnels, je récupère seulement l'identifiants des élements relatifs.
- J'utilise des boucles imbriquées dans les templates pour récupérer les données à l'aide des identifiants.

Comme les générateurs de site statique performants comme [Hugo](https://gohugo.io/) ou [Eleventy](https://www.11ty.dev) n'ont pas une empreinte mémoire importante lors du parcours de boucles dans les templates, je n'ai jamais fait face à des soucis de performance avec cette approche. C'est à la fois très flexible et vos requêtes s'en retrouvent simplifiées.

## Générer une liste paginée des articles de blog avec 11ty

Grâce à [la fonctionnalité pagination d'Eleventy](https://www.11ty.dev/docs/pagination/), nous pouvons parcourir notre fichier JSON (accessible via l'objet `blogposts`) et générer une liste paginée des articles de blog. Dans cet exemple, nous allons générer une liste de pages contenant chacune 12 éléments, grâce à la clé `size`.

Voici le code complet du fichier `src/blogposts/list.njk` :

```twig
---
pagination:
  data: blogposts
  size: 12
permalink: blog{% if pagination.pageNumber > 0 %}/page{{ pagination.pageNumber + 1}}{% endif %}/index.html
---

{% extends "layouts/base.njk" %}
{% set htmlTitle = item.title %}

{% block content %}
  <h1>Blogposts</h1>

  {# boucler sur les éléments paginés #}
  {% for item in pagination.items %}
    {% if loop.first %}<ul>{% endif %}
      <li>
        <p><img src="{{ item.image }}?fit=crop&amp;w=200&amp;h=200" alt="{{ item.imageAlt }}"></p>
        <h2><a href="/blog/{{ item.slug }}">{{ item.title }}</a></h2>
        <p><time datetime="{{ item.date | date('Y-M-DD') }}">{{ item.date|date("MMMM Do, Y") }}</time></p>
        <p>{{ item.summary }}</p>
      </li>
    {% if loop.last %}</ul>{% endif %}
  {% endfor %}

  {# pagination #}
  {% if pagination.hrefs | length > 0 %}
  <ul>
    {% if pagination.previousPageHref %}
      <li><a href="{{ pagination.previousPageHref }}">Previous page</a></li>
    {% endif %}
    {% if pagination.nextPageHref %}
      <li><a href="{{ pagination.nextPageHref }}">Next page</a></li>
    {% endif %}
  </ul>
  {% endif %}

{% endblock %}
```

## Générer les pages individuelles pour les articles dans 11ty

Nous pouvons nous reposer sur la même fonctionnalité pour générer également toutes les pages individuelles. La seule astuce ici est de spécifier le nombre d'élements de chaque page comme égal à 1 et de définir les permaliens de façon dynamique. Voici le code complet pour `src/blogposts/entry.njk`:

```twig
---
pagination:
  data: blogposts
  size: 1
  alias: blogpost
permalink: blog/{{ blogpost.slug }}/index.html
---
{% extends "layouts/base.njk" %}
{% set htmlTitle = blogpost.title %}

{% block content %}
  {# blogpost #}
  <img src="{{ blogpost.image }}?fit=crop&amp;w=1024&amp;h=576"
       srcset="{{ blogpost.image }}?fit=crop&amp;w=600&amp;h=338 600w,
               {{ blogpost.image }}?fit=crop&amp;w=800&amp;h=450 800w,
               {{ blogpost.image }}?fit=crop&amp;w=1024&amp;h=576 1024w"
       sizes="100vw"
       class="u-fluidimg"
       alt="{{ blogpost.imageAlt }}">

  <h1>{{ blogpost.title }}</h1>
  <p><time datetime="{{ blogpost.date | date('Y-M-DD') }}">{{ blogpost.date|date("MMMM Do, Y") }}</time></p>
  <p>{{ blogpost.intro }}</p>
  {{ blogpost.body | safe }}

  {# Articles relatifs #}
  {% if blogpost.relatedBlogs|length %}
    <h2>Vous pourriez aussi aimer</h2>
    <ul>
    {% for item in blogpost.relatedBlogs %}
      {% for post in blogposts %}
        {% if post.id == item.id %}
          <li>
            <a href="/blog/{{ post.slug }}">{{ post.title }}</a>
          </li>
        {% endif %}
      {% endfor %}
    {% endfor %}
    </ul>
  {% endif %}
{% endblock %}
```

## Déclencher automatiquement les builds

La plupart des CMS headless fournissent des webhooks qui vont envoyer une requête à une URL lorsque les données sont modifiées. Si vous hébergez votre site chez Netlify (vous devriez, c'est un super service), il suffit de quelques clics pour [créer un hook entrant](https://www.netlify.com/docs/webhooks/) qui déclenchera la génération de votre site. à chaque reception d'une requête POST.

DatoCMS propose le déploiement en 1 clic grâce à son intégration avec Netlify. Il vous suffit de l'activer et voilà, votre blog sera généré à chaque fois que les données seront mises à jour.

Nous disposons maintenant d'un blog qui combine la puissance d'une base de données relationnelle avec la rapidité et la stabilité d'un site statique, hébergé sur CDN.
