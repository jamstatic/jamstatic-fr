---
title: "Bien démarrer avec Algolia"
date: 2018-03-19T21:13:46+01:00
description: ""
categories:
  - algolia
images:
  - https://res.cloudinary.com/practicaldev/image/fetch/s--bOzJM1UG--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/9heb90tm7eoyapp3mbl1.jpg
source:
  author: "Jessica West"
  title: "Getting Started with Algolia"
  url: "https://dev.to/algolia/getting-started-with-algolia-4lnp"
---

{{% intro %}}

Algolia fait tout pour faciliter l’ajout d’une recherche
performante sur votre site. Jessica West le prouve une fois de plus en nous
décrivant pas-à-pas les étapes nécessaires pour y parvenir, ici en vanilla JS
avec InstantSearch.

{{% /intro %}}

Salut 👋 ! Ça vous est déjà arrivé de développer entièrement un moteur de
recherche ? Avez-vous déjà redouté que votre Product Manager vous dise "tu sais
ce qui serait super ? Ce serait d’avoir une barre de recherche sur le site" et
là votre première réaction est de soupirer et de lever les yeux au ciel…

Ça m'est arrivé malheureusement beaucoup trop souvent. Pour être franche,
j'évitais ce genre de demande comme la peste car même quand j'arrivais à faire
fonctionner la recherche, je voyais bien que c'est pas "génial" et de plus
arrivée à la moitié de la documentation je me demandais, mais bon sang, _où
est-ce qu'est censé aller ce module ?_ Vraiment, c'est pas marrant à faire.

Mais maintenant, nous avons des outils et des services à notre disposition qui
rendent tout cela bien plus simple. C’est fini le temps où on développait un
moteur de recherche à la mano. Ah, que c'est beau le progrès. Ma vie est un peu
plus simple chaque jour qui passe.

C’est une des raisons pour lesquelles j'ai commencé à jouer avec Algolia et que
j'ai fini par rejoindre leur équipe. Je n'ai vraiment pas envie que vous lisiez
cet article en vous disant "oh non, elle veut nous vendre le produit". Non
j'aimerais vraiment partager avec vous ce que j'ai appris pour bien démarrer
avec Algolia et comment faire pour se mettre à coder avec. Regardons donc
quelles sont les quelques étapes pour vous vous puissiez avoir une recherche
fonctionnelle sur votre site.

## Obtenir vos clefs d’API

{{< figure
src="https://res.cloudinary.com/practicaldev/image/fetch/s--RDmWaa8U--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://cdn.glitch.com/45e6d35c-2e10-4020-8ad3-d5f1b9d3aae6%252FalgoliaAPIkeysMarkedUp.png%3F1514567735627"
caption="Les différentes clés d’API d’Algolia" attr="" attrlink="" >}}

Commencez par créer un compte chez [Algolia](https://www.algolia.com/cc/devto).
Et récupérez ensuite vos identifiants dans votre
[dashboard](https://www.algolia.com/licensing). Vous aurez besoin de copier
`App Id`, `Search Only API Key` et `Admin API Key`.

Une fois que c'est fait, ajoutez-les dans ce que vous utilisez pour stocker vos
variables d’environnement (un fichier `.env` par exemple) de manière à ce que
votre application sache comment se connecter à votre application Algolia et à
son index. Et voilà ! Le plus dur est fait !

## Connecter votre source de données

Si vos données déjà sont accessibles en ligne, nous pouvons commencer par la
création d’une fonction qui va appeler cette URL et venir alimenter l’index de
votre application Algolia. Regardons comment faire ça en JavaScript.

```javascript
const data_url =
  "https://raw.githubusercontent.com/algolia/datasets/master/movies/actors.json";

function indexData(data_url) {
  return axios
    .get(data_url, {})
    .then(function(response) {
      console.log(response.data[0]);
      return;
    })
    .catch(function(error) {
      console.warn(error);
    });
}
```

Pour le moment cette fonction ne fait que récupérer l’url de données que nous
lui passons en paramètre et affiche dans la console le premier enregistrement
trouvé. Ici nous faisons appel à Axios pour effectuer des appels d’API. Axios
est une librairie JavaScript utilisée pour faire des requêtes HTTP avec node.js
ou depuis le navigateur et elle retourne une promesse, une API native en
JavaScript depuis ECMAScript 6. L'avantage de cette librairie, c'est qu'elle
peut transformer automatiquement des données JSON.

## Préparer les données pour Algolia

Maintenant que nous avons fait un appel à nos données, commençons à utiliser le
compte Algolia que nous venons de créer pour mettre à jour notre index avec nos
données ! Nous allons faire ça en deux temps, d’abord nous allons parcourir les
données retournées par notre appel `axios.get` et en faire un tableau d’objets.
Cela va nous permettre de n'utiliser que les données que nous voulons dans notre
index. Après, une fois que c'est fait nous pouvons envoyer ces données à notre
index Algolia.

_Première étape :_ Plutôt que de juste retourner une réponse positive, créons
une fonction qui va gérer cet envoi des données en lui passant la réponse à
notre appel `axios.get`.

```javascript
function indexData(data_url) {
  return axios
    .get(data_url, {})
    .then(response => {
      return dataToAlgoliaObject(response.data);
    })
    .then(function(response) {
      return;
    })
    .catch(function(error) {
      console.warn(error);
    });
}
```

Maintenant dans notre fonction, nous allons vouloir parcourir toutes les entrées
présentes dans nos données et en faire des objets Algolia, à l’aide d’une boucle
qui devrait être assez facile à écrire.

```javascript
function dataToAlgoliaObject(data_points) {
  var algoliaObjects = [];
  for (var i = 0; i < data_points.length; i++) {
    var data_point = data_points[i];
    var algoliaObject = {
      objectID: data_point.objectID,
      name: data_point.name,
      rating: data_point.rating,
      image_path: data_point.image_path,
      alternative_name: data_point.alternative_name
    };
    algoliaObjects.push(algoliaObject);
  }

  return algoliaObjects;
}
```

_Deuxième étape :_ Maintenant que nous avons créé nos objets, ils sont prêts à
être envoyés à Algolia !

Changeons quelques trucs dans notre fonction `indexData`. Nous pouvons chaîner
notre appel avec un `.then` grâce la structure de notre promesse axios et
utiliser `async` et `await` pour nous assurer que tout se passe bien pendant
l’envoi de nos données.

```javascript
function indexData(data_url) {
  return axios
    .get(data_url, {})
    .then(response => {
      return dataToAlgoliaObject(response.data);
    })
    .then(async response => {
      await sendDataToAlgolia(response);
      return;
    })
    .then(function(response) {
      return;
    })
    .catch(function(error) {
      console.warn(error);
    });
}
```

## Envoi des données à Algolia

Écrivons maintenant la fonction `sendDataToAlgolia`. C’est le moment où nous
allons avoir besoin des clés que nous avons stockées auparavant dans notre
fichier `.env`. Nous allons également devoir nous assurer que nous avons quelque
chose qui initialise notre index et nous permette de lui donner le nom de notre
choix pour y stocker nos données. Vu que notre jeu de données contient des
acteurs de cinéma, ça semble être un bon nom pour notre index.

```javascript
const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);
const algoliaIndex = algoliaClient.initIndex("movie-actors");

function sendDataToAlgolia(algoliaObjects) {
  return new Promise((resolve, reject) => {
    algoliaIndex.addObjects(algoliaObjects, (err, content) => {
      if (err) reject(err);
      resolve();
    });
  });
}
```

## Configuration des paramètres

Nous avons des données dans notre index ! Maintenant, nous voulons dire à
Algolia comment nous voulons que ces données soient utilisées. Nous pouvons
faire cela dans l’interface d’administration ou avec du code. Je préfère la
deuxième méthode, voyons ensemble comment faire cela. Nous avons _beaucoup_
d’options mais tenons nous en pour le moment aux options de base :

-  _searchableAttributes_: listez ce que vous voulez pouvoir rechercher dans
   l’objet Algolia que vous avez crée

-  _attributesToHighlight_: mettre en surbrillance le champ recherché

-  _customRanking_: choisissez la façon donc vous voulez afficher vos données,
   `desc()` ou `asc()`

-  _attributesToRetrieve_: les attributs à afficher dans les résultats de
   recherche

```javascript
async function configureAlgoliaIndex() {
  algoliaIndex.setSettings({
    searchableAttributes: ["name"],
    attributesToHighlight: ["name"],
    customRanking: ["desc(rating)"],
    attributesToRetrieve: ["name", "rating", "image_path"]
  });
}
```

Ajoutons maintenant cette fonction, une fois l’envoi de notre index correctement
effectué.

```javascript
function indexData(data_url) {
  return axios
    .get(data_url, {})
    .then(response => {
      return dataToAlgoliaObject(response.data);
    })
    .then(async response => {
      await sendDataToAlgolia(response);
      return;
    })
    .then(async () => {
      await configureAlgoliaIndex();
      return;
    })
    .then(function(response) {
      return;
    })
    .catch(function(error) {
      console.warn(error);
    });
}
```

Waouh, nous avons maintenant ajouté les données à notre index comme nous le
souhaitions. Nous en avons donc terminé avec la partie serveur, passons
maintenant à la partie où les gens peuvent voir et rechercher dans nos données,
si chères à nos yeux.

## Connecter le front-end

Algolia a ce qu'on appelle des _widgets_, qui nous permettent d’ajouter
rapidement des sections dans notre page HTML sans avoir à écrire beaucoup de
code. Des éléments comme une barre de recherche, ou bien l’endroit où nos objets
Algolia seront vus dans la page, peuvent être ajoutés à l’aide de quelques
lignes de JavaScript. Ouvrons notre fichier pour le côté client.

Nous allons commencer par créer une instance d’`instantsearch` que nous pourrons
utiliser dans notre application. Vous pouvez utiliser des cookies pour passer
ces données du serveur au client ou bien vous pouvez utiliser les clefs. Pour
faire au plus simple, nous allons utiliser les clefs ici.

```javascript
$(document).ready(function() {
  var instantsearch = window.instantsearch;

  // création d’une instance d’instantsearch
  // avec notre identifiant d’application et notre clef d’API
    var search = instantsearch({
      appId: Cookies.get('app_id'),
      apiKey: Cookies.get('search_api_key'),
      indexName: Cookies.get('index_name'),
      urlSync: true,
      searchParameters: {
        hitsPerPage: 3
      }
    });
  });
```

Connectons maintenant notre _input_ de recherche à notre code HTML pour que les
gens aient une barre de recherche.

```javascript
search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#search-box",
    placeholder: "Rechercher vos acteurs préférés"
  })
);
```

Maintenant, nous voulons ajouter les résultats provenant de nos données, et
retourner ce que nous voulons afficher.

```javascript
search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    hitsPerPage: 12,
    templates: {
      empty: `<div class="col-md-12" style="text-align: center;"> Nous n'avons pas trouvé de résultats correspondants à votre recherche <em>\"{{query}}\"</em></div`,
      item: function(hit) {
        try {
          return `
              <div class="col-md-4" style="text-align: center;">
                <p>
                  <h3 class="hit-text">${hit._highlightResult.name.value}</h3>
                  <img src="https://image.tmdb.org/t/p/w45/${
                    hit.image_path
                  }" height="50" width="50">
                </p>
                <p>
                  Rating: ⭐️ ${hit.rating}
                </p>

              </div>
            `;
        } catch (e) {
          console.warn("Couldn't render hit", hit, e);
          return "";
        }
      }
    }
  })
);
```

Une bonne expérience de recherche ne devrait pas retourner trop de résultats à
la fois, ajoutons donc une pagination aux résultats que nous renvoyons.

```javascript
search.addWidget(
  instantsearch.widgets.pagination({
    container: "#pagination"
  })
);
```

Et enfin pour terminer… lançons la recherche ! Cela va permettre de tout
instancier dans votre page.

```javascript
search.start();
```

Naturellement, si vous voulez vous épargner tout ce travail manuel, vous pouvez
allez voir
[notre application pour démarrer rapidement sur Glitch](https://glitch.com/~algolia-quickstart),
la remixer et vous aurez tout ce code et une application basique qui tourne en
moins de 5 minutes.

{{< figure
src="https://cdn.glitch.com/45e6d35c-2e10-4020-8ad3-d5f1b9d3aae6%2Fezgif.com-gif-maker.gif?1514128983358"
caption="" attr="" attrlink="" >}}

😉 J'espère que cette lecture vous a plu et vous aura été utile !
