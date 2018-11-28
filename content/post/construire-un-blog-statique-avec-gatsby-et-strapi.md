---
title: Construire un blog statique avec Gatsby et Strapi
description: Découvrez comment facilement développer un blog en utilisant Gatsby et Strapi.
date: 2018-04-26
author: pierreburgy
images:
 - https://blog.strapi.io/content/images/2018/04/strapi-plus-gatsby-love.jpg
categories:
 - gatsby
 - cms
 - headless
---

![Strapi Gatsby](https://blog.strapi.io/content/images/2018/04/strapi-plus-gatsby-love.jpg)

## Introduction

Un site statique est un site dont le contenu est fixe. Techniquement, il est composé d'une simple liste de fichiers HTML, qui affiche les mêmes informations quel que soit le visiteur. Contrairement aux sites dynamiques, il ne requiert ni programmation back-end ni base de données. Publier un site statique est simple : il suffit d'uploader les fichiers sur un service de stockage et le tour est joué. Les deux principaux avantages d'un site web sont la sécurité et la vitesse : étant donné qu'il n'y a pas de base de données le site ne peut pas se faire hacker, et puisqu'il n'y a pas de génération de page à chaque requête, la navigation pour l'utilisateur est plus fluide.

Pour faciliter leur création, de nombreux générateurs de sites statiques sont disponibles: [Jekyll](https://jekyllrb.com/), [Hugo](https://gohugo.io/), [Hexo](https://hexo.io/), etc. La plupart du temps, le contenu est géré via des fichiers (idéalement en format Markdown) statiques ou via une API de contenu. Ensuite, le générateur requête le contenu, l'injecte dans les templates définis par le développeur et génère un ensemble de fichiers HTML, CSS et JavaScript.

Les Progressive Web Apps (PWA) sont des applications web, reposant fortement sur l'utilisation de JavaScript, qui se veulent être [fiables, rapides et engageantes](https://developers.google.com/web/progressive-web-apps). Étant donné qu'elles rendent la navigation plus rapide et qu'elles offrent une expérience utilisateur bien meilleure, les PWA sont devenues la manière par défaut de construire des interfaces web. Pour cette raison, de nombreux frameworks front-end ont fait leur apparition au cours des dernières années : Angular, React, et plus récemment, Vue.

> Gatsby : quand les sites statiques rencontrent les Progressive Web Apps.

Les sites Web statiques et PWA ont tous les deux de solides avantages, ce qui nous incite à trouver un moyen de les utiliser tous les deux dans le même projet. Heureusement, quelques outils ont réussi à faire le pont entre les deux, notamment celui dont on entend le plus parler depuis quelques mois : [Gatsby](https://www.gatsbyjs.org/). Nous avons donc décidé de vous donner un exemple complet pour vous apprendre à commencer à l'utiliser facilement. Un site statique a besoin d'une source de contenu : dans cet exemple, nous allons le délivrer grâce à une API créée avec Strapi.

### Qu'est-ce que Gatsby ?

D'après ses créateurs, [Gatsby](https://www.gatsbyjs.org) est un "_blazing-fast website framework for React_". Il permet aux développeurs de créer des sites construits avec React en quelques minutes. Que vous vouliez développer un blog ou un site vitrine, Gatsby devrait correspondre à vos besoins.

{{<figure src="https://blog.strapi.io/content/images/2018/04/gatsby-logo.jpg" width="50%" link="https://www.gatsbyjs.org">}}

Étant donné que Gatsby utilise React, les pages générées ne sont jamais rechargées, ce qui rend le site extrêmement rapide. De nombreux plugins sont disponibles pour permettre aux développeurs de gagner du temps et de récupérer la donnée depuis n'importe quelle source (fichiers Markdown, CMS, etc.). Gatsby est fortement basé sur le concept de la ["node" interface](https://www.gatsbyjs.org/docs/node-interface/), qui est le centre du système de données de Gatsby.

Créé par [Kyle Mathews](https://twitter.com/kylemathews), le projet a été officiellement [publié en juillet 2017](https://www.gatsbyjs.org/blog/gatsby-v1/) et est d'ores et déjà [utilisé par des dizaines d'entreprises](https://github.com/gatsbyjs/gatsby#showcase).

### Qu'est-ce que Strapi?

[Strapi](https://strapi.io) est le Content Management Framework le plus avancé sur la technologie Node.js. À mi-chemin entre un famework Nodejs et un Headless CMS (API-first), il permet d'économiser des semaines de développement.

{{< figure src="https://blog.strapi.io/content/images/2018/04/strapi-logo.jpg" link="https://strapi.io" width="50%">}}

Grâce à son système extensible de plugin, il propose de nombreuses fonctionnalités : panel d'administration, authentification et gestion des permissions, gestion de contenu, générateur d'API, etc.

Contrairement aux CMS en ligne, **Strapi est 100% open-source**, ce qui veut dire que :

-  **Strapi est totalement gratuit**
-  Vous pouvez l'**héberger sur vos propres serveurs**. Vous êtes donc propriétaire de votre donnée.
-  Il est entièrement **personnalisable et extensible**, grâce au système de plugins.

## Installation de l'API

Tout d'abord, nous allons commencer par créer une API avec Strapi et ajouter du contenu.

### Création du projet Strapi

#### Installation de Strapi

_Pré-requis_: vérifiez que [Node 8](https://nodejs.org/en/download/) (ou plus) et [MongoDB](https://docs.mongodb.com/manual/installation/) sont installés et démarrés sur votre machine.

Installez Strapi via npm :

```bash
npm i strapi@alpha -g
```

_Note_ : Strapi v3 est encore en version alpha, mais cela ne posera aucun problème pour la réalisation de ce tutoriel.

#### Création d'un projet Strapi

Créez un dossier nommé `gatsby-strapi-tutorial` :

```bash
mkdir gatsby-strapi-tutorial
```

Générez l'API au sein de ce nouveau dossier :

```bash
cd gatsby-strapi-tutorial
strapi new api
```

#### Démarrage du serveur

Entrez à l'intérieur du projet généré :

```bash
cd api
```

Démarrez le serveur Node.js :

```bash
strapi start
```

À partir de maintenant, vous devriez être à même de voir le panel d'administration de votre projet : [http://localhost:1337/admin](http://localhost:1337/admin).

### Création du premier utilisateur

Ajoutez votre premier utilisateur depuis la [page d'inscription](http://localhost:1337/admin/plugins/users-permissions/auth/register).

![Tutorial](https://blog.strapi.io/content/images/2018/01/Screen-Shot-2018-01-17-at-21.09.14.png)

### Création d'un type de contenu

Les API Strapi sont basées sur une structure de données appelée Content Types (équivalent des modèles dans les frameworks et des Content Types dans WordPress).

Créez un Content Type nommé `article` contenant trois champs : `title` (type `string`), `content` (type `text`) et `author` (type `relation`: un utilisateur doit pouvoir être lié à plusieurs articles).

![Tutorial](https://blog.strapi.io/content/images/2018/01/Screen-Shot-2018-01-17-at-15.17.40.png)

![Tutorial](https://blog.strapi.io/content/images/2018/01/Screen-Shot-2018-01-17-at-21.11.50.png)

### Ajout d'articles

Ajoutez quelques articles en base de données. Pour cela, suivez les étapes suivantes :

1. Visitez la [page listant les articles](http://localhost:1337/admin/plugins/content-type-builder/models/article).
2. Cliquer sur `Add New Article`.
3. Renseignez un titre et un contenu, liez l'article à un auteur, puis valider.
4. Ajouter deux autres articles.

![Tutorial](https://blog.strapi.io/content/images/2018/01/Screen-Shot-2018-01-17-at-21.14.36.png)

### Autorisation d'accès

Pour des raisons de sécurité, l'[accès à l'API](http://localhost:1337/article) est, par défaut, restreint.

Pour autoriser l'accès, visitez la [section Auth & Permissions du rôle Guest](http://localhost:1337/admin/plugins/users-permissions/roles/edit/1), sélectionnez l'action `Article - find` et sauvegardez. À partir de ce moment, vous devriez être à même de [requêter la liste d'articles](http://localhost:1337/article).

L'accès à l'[API des auteurs](http://localhost:1337/article) est également restreint. Autorisez l'accès aux anonymes en sélectionnant l'action `Users & Permissions - find` puis en sauvegardant.

![Tutorial](https://blog.strapi.io/content/images/2018/01/Screen-Shot-2018-01-17-at-21.29.59.png)

## Développement du site statique

Bien joué, votre API est prête à l'utilisation ! Nous allons maintenant commencer le développement du site statique.

### Installation de Gatsby

Commençez par installer Gatsby :

```bash
npm install --global gatsby-cli
```

### Création d'un projet Gatsby

Dans le dossier `gatsby-strapi-tutorial` que vous avez précédemment créé, générez votre tout nouveau blog :

```bash
gatsby new blog
```

### Démarrage en mode développement

Entrez dans le dossier du projet :

```bash
cd blog
```

Démarrez le serveur :

```bash
gatsby develop
```

À partir de ce moment, votre site Gatsby devrait être disponible à l'adresse suivante : [http://localhost:8000](http://localhost:8000).

### Installation du plugin source Strapi

Lorsque l'on crée un site statique, la donnée peut venir de différentes sources : fichiers Markdown, fichiers CSV, un site WordPress (utilisant le plugin JSON REST API), etc.

Gatsby l'a bien compris. C'est pourquoi ses créateurs ont décidé de construire une couche spécifique et indépendante : le Data layer. Le système entier repose sur [GraphQL](http://graphql.org).

Pour connecter Gatsby à une nouvelle source de données, il faut [développer un "plugin source"](https://www.gatsbyjs.org/docs/create-source-plugin). Heureusement, [de nombreux plugins source sont déjà disponibles](https://www.gatsbyjs.org/docs/plugins). Vous devriez donc réussir à trouver celui qui correspond le mieux à vos besoins.

Dans cet exemple nous utilisons Strapi. Nous allons donc évidemment avoir besoin d'un plugin source dédié au API Strapi. Bonne nouvelle : [celui-ci existe déjà](https://github.com/strapi/gatsby-source-strapi) !

Installons-le :

```bash
npm install --save gatsby-source-strapi
```

Le plugin a besoin d'être configuré. Remplacez le contenu du fichier `gatsby-config.js` avec :

_Path_ : `gatsby-config.js`

```jsx
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `http://localhost:1337`,
        contentTypes: [ // List of the Content Types you want to be able to request from Gatsby.
          `article`,
          `user`
        ]
      },
    },
  ],
}
```

Ensuite, redémarrez le serveur afin que Gatsby prenne en compte ces changements.

### Liste d'articles

Dans un premier temps, nous voulons afficher la liste d'articles. Pour cela, remplacez le contenu de la page d'accueil par le suivant :

_Path_ : `src/pages/index.js`

```jsx
import React from 'react'
import Link from 'gatsby-link'

const IndexPage = ({ data }) => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <ul>
      {data.allStrapiArticle.edges.map(document => (
        <li key={document.node.id}>
          <h2>
            <Link to={`/${document.node.id}`}>{document.node.title}</Link>
          </h2>
          <p>{document.node.content}</p>
        </li>
      ))}
    </ul>
    <Link to="/page-2/">Go to page 2</Link>
  </div>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
`
```

#### Que venons-nous de faire ?

À la fin du fichier nous exportons `pageQuery` : une requête GraphQL qui requête la liste entière des articles. Comme vous pouvez le voir, nous requêtons uniquement les champs `id`, `title` et `content` grâce à la précision du langage GraphQL.

Ensuite, nous passons l'objet déstructuré `{ data }` comme paramètre de `IndexPage` et nous bouclons sur son objet `allStrapiArticles` afin d'afficher la donnée.

![Tutorial](https://blog.strapi.io/content/images/2018/01/Screen-Shot-2018-01-17-at-21.25.48.png)

#### Astuce : générez vos requêtes GraphQL en quelques secondes !

Gastby inclut l'excellente interface GraphQL. Cela facilite grandement la création de requêtes GraphQL. [Jetez-y un œil](http://localhost:8000/___graphql) et tentez de créer quelques requêtes.

### Vue article

Notre site commence à ressembler à un blog. C'est une bonne nouvelle ! Cependant, une partie importante est encore manquante : la page article.

Commençons par créer le template contenant la requête GraphQL et définissant le contenu affiché :

_Path_ : `src/templates/article.js`

```jsx
import React from 'react'
import Link from 'gatsby-link'

const ArticleTemplate = ({ data }) => (
  <div>
    <h1>{data.strapiArticle.title}</h1>
    <p>by <Link to={`/authors/${data.strapiArticle.author.id}`}>{data.strapiArticle.author.username}</Link></p>
    <p>{data.strapiArticle.content}</p>
  </div>
)

export default ArticleTemplate

export const query = graphql`
  query ArticleTemplate($id: String!) {
    strapiArticle(id: {eq: $id}) {
      title
      content
      author {
        id
        username
      }
    }
  }
`
```
Tout semble prêt, mais en réalité, Gatsby ne sait pas quand ce template devrait être affiché. Chaque article a besoin d'une URL. Nous allons donc informer Gatsby des nouvelles URLs que nous souhaitons, grâce à la [fonction `createPage`](https://www.gatsbyjs.org/docs/creating-and-modifying-pages).

Tout d'abord, nous allons déclarer une nouvelle fonction nommée `makeRequest` afin d'exécuter la requête GraphQL. Ensuite, nous exportons une fonction nommée `createPages` dans laquelle nous récupérons la liste d'articles et créons une page pour chacun d'entre eux. Voici le résultat :

_Path_ : `gatsby-node.js`

```jsx
const path = require(`path`);

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for nodes to use in creating pages.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      return result;
    })
  )
});

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const getArticles = makeRequest(graphql, `
    {
      allStrapiArticle {
        edges {
          node {
            id
          }
        }
      }
    }
    `).then(result => {
    // Create pages for each article.
    result.data.allStrapiArticle.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.id}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          id: node.id,
        },
      })
    })
  });

  // Query for articles nodes to use in creating pages.
  return getArticles;
};
```

Redémarrez le serveur Gatsby.

À partir de maintenant, vous devriez pouvoir visiter les pages de chaque article en cliquant sur les liens affichés sur la page d'accueil.

![Tutorial](https://blog.strapi.io/content/images/2018/01/Screen-Shot-2018-01-17-at-21.26.46.png)

### Vue auteur

Les articles sont rédigés par des auteurs. Eux-aussi méritent une page dédiée.

La création de la page auteur est très similaire à celle de la page article. Premièrement, nous créons le template :

_Path_ : `src/templates/user.js`

```jsx
import React from 'react'
import Link from 'gatsby-link'

const UserTemplate = ({ data }) => (
  <div>
    <h1>{data.strapiUser.username}</h1>
    <ul>
      {data.strapiUser.articles.map(article => (
        <li key={article.id}>
          <h2>
            <Link to={`/${article.id}`}>{article.title}</Link>
          </h2>
          <p>{article.content}</p>
        </li>
      ))}
    </ul>
  </div>
)

export default UserTemplate

export const query = graphql`
  query UserTemplate($id: String!) {
    strapiUser(id: { eq: $id }) {
      id
      username
      articles {
        id
        title
        content
      }
    }
  }
`
```

Ensuite, nous mettons à jour le fichier `gatsby-node.js` pour créer les URLs :

_Path_ : `gatsby-node.js`

```jsx
const path = require(`path`);

const makeRequest = (graphql, request) => new Promise((resolve, reject) => {
  // Query for article nodes to use in creating pages.
  resolve(
    graphql(request).then(result => {
      if (result.errors) {
        reject(result.errors)
      }

      return result;
    })
  )
});


// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const getArticles = makeRequest(graphql, `
    {
      allStrapiArticle {
        edges {
          node {
            id
          }
        }
      }
    }
    `).then(result => {
    // Create pages for each article.
    result.data.allStrapiArticle.edges.forEach(({ node }) => {
      createPage({
        path: `/${node.id}`,
        component: path.resolve(`src/templates/article.js`),
        context: {
          id: node.id,
        },
      })
    })
  });

  const getAuthors = makeRequest(graphql, `
    {
      allStrapiUser {
        edges {
          node {
            id
          }
        }
      }
    }
    `).then(result => {
    // Create pages for each user.
    result.data.allStrapiUser.edges.forEach(({ node }) => {
      createPage({
        path: `/authors/${node.id}`,
        component: path.resolve(`src/templates/user.js`),
        context: {
          id: node.id,
        },
      })
    })
  });

  // Queries for articles and authors nodes to use in creating pages.
  return Promise.all([
    getArticles,
    getAuthors,
  ])
};
```

Dernière étape : redémarrez le serveur et visitez la page auteur depuis la page d'un article.

![Tutorial](https://blog.strapi.io/content/images/2018/01/Screen-Shot-2018-01-17-at-21.27.47.png)

## Conclusion

Félicitations ! Vous avez créé un blog super rapide et facile à maintenir !

Étant donné que le contenu est géré dans Strapi, les auteurs peuvent écrire leurs articles depuis une vraie interface et vous, en tant que développeur, n'avez qu'à recompiler le site pour mettre à jour le contenu.

### Que faire ensuite ?

N'hésitez pas à continuer le projet pour découvrir plus en profondeur les avantages de Gatsby et de Strapi. Voici une liste de fonctionnalités que vous pourriez ajouter à votre projet : liste des auteurs, catégories d'articles, système de commentaire avec l'API Strapi ou Disqus, etc. Vous pouvez aussi créer tout type de site (boutique e-commerce, site vitrine, etc.).

Lorsque votre projet sera terminé, vous voudrez probablement le déployer. Le site statique généré par Gatsby peut [facilement être publiée sur des services de stockage](https://www.gatsbyjs.org/docs/deploy-gatsby/) tels que Netlify, S3/Cloudfront, GitHub pages, GitLab, Heroku, etc. L'API Strapi n'est rien d'autre qu'une application Node.js. Elle peut donc être mise en ligne sur Heroku ou sur n'importe quelle instance Linux ayant Node.js installé dessus.

Le [code source de ce tutoriel est disponible sur GitHub](https://github.com/strapi/strapi-examples/tree/master/gatsby-strapi-tutorial). Pour le tester, clonez-le repository et suivez les instructions présentes dans le Readme.

Nous espérons que vous avez apprécié ce tutoriel. N'hésitez pas à le commenter, le partager, et indiquer quelle est votre manière favorite de créer des sites avec React et d'en gérer le contenu.
