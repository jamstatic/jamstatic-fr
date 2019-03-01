---
title: Gatsby pour les applis Web
description: Comment Gatsby permet d'allier les atouts du statique avec les possibilités
  du dynamique pour créer des applis Web riches en fonctionnalités
date: 2019-03-01 11:00:00 +0100
commments: true
source:
  author: Dustin Schau
  title: Gatsby for Apps
  url: https://www.gatsbyjs.org/blog/2018-11-07-gatsby-for-apps/
images:
- https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523346582/go_static.jpg
categories:
- jamstack
- gatsby

---
Gatsby est génial pour la génération des sites statiques. Vous le saviez probablement déjà ! Mais c'est en fait tout aussi bien pour les applis Web. Vous ne le saviez peut-être pas. Gatsby est fait pour construire des expériences qui profitent à la fois des bénéfices des sites dits statiques et des applis web. Vous n'avez pas à sacrifier les avantages des unes pour obtenir les bénéfices des autres.

Dans cet article, nous allons voir certains cas d'usage d'une appli Web complexe, comme le fait d'aller requêter des données tierces dynamiques ou de s'authentifier, et nous allons vous révéler pourquoi Gatsby est un très bon choix pour construire des applis web.

Nous allons prendre comme exemple une appli Web classique — Gmail — que nous avons reconstruit en Gatsby pour démontrer comment Gatbsy peut servir à construire des applications modernes et plaisantes.

Pour commencer, nous pouvons nous demander ce qu'est, au juste, une appli Web.

> Note :
Si vous ne l'avez pas déjà fait, nous vous suggérons de regarder la vidéo ‘[Beyond Static: Building Dynamic Apps with Gatsby](https://www.gatsbyjs.com/build-web-apps-webinar)’ de laquelle la plupart des idées de ce billet sont reprises.

## Qu'est-ce qu'une appli Web ?

J'ai par le passé [tenté de définir](https://www.gatsbyjs.org/blog/2018-10-15-beyond-static-intro/#what-is-an-app) ce qu'est une appli Web traditionnelle, ce qui s'est avéré étonnamment difficile. Pour résumer, je pense qu'il y a plusieurs fonctionnalités clés qui tendent à créer une expérience semblable à celle d'une app :

- requêtage de données dynamiques;
- authentification des utilisateurs, et le fait d'avoir des routes authentifiées côté client;
- des interactions côté client portées par JavaScript.

Bien entendu, une appli Web n'est pas une simple checklist pour laquelle il faudrait avoir coché chacun des points précédents afin d'obtenir une expérience semblable à celle d'une app. Je pense plutôt qu'il est plus simple d’*observer* un exemple d'une appli Web — qui aurait mis en place plusieurs de ces fonctionnalités — afin de pouvoir se créer un modèle mental du type d'applis Web que Gatsby peut construire.

Je pense plus particulièrement à deux exemples clé, qui sont pour moi les plus représentatifs de mon modèle mental d'un appli web… Gmail et Twitter.

## Gmail

![capture d'écran de Gmail](https://res.cloudinary.com/jamstatic/image/upload/c_scale,f_auto,q_auto,w_1200/v1551433893/gmail.png)

Gmail peut-être vu, avec le recul, comme une “preuve de concept” qui a démontré deux choses très importantes :

- le JavaScript côté client peut offrir une expérience proche de celles des apps, et
- une application JavaScript (qui s'exécute dans votre navigateur) soutient favorablement la comparaison avec une application native, que ce soit sur desktop ou mobile.

Il ne faut pas sous-estimer l'impact de ces bénéfices. Gmail a *prouvé* qu'une expérience de type native est non seulement possible pour les utilisateurs grâce au JavaScript côté client, mais aussi que cette solution peut être préférable et plus pratique que la solution native. Nous reviendrons sur l'exemple de ce bon vieux Gmail en temps voulu.

## Twitter (Progressive Web Application)

![Capture d'écran de Twitter Lite](https://res.cloudinary.com/jamstatic/image/upload/c_scale,f_auto,q_auto,w_1200/v1551434027/twitter-lite.png)

Twitter est un autre très bon exemple de mon modèle mental de ce qu'est (et ce que peut être !) une appli Web parce que :

- ça illustre une partie de la richesse d'une expérience Web moderne, et
- ça repose sur des pratiques avancées et des optimisations poussées de performances pour proposer une expérience rapide et plaisante.

En particulier, les fonctionnalités suivantes sont des composantes clés pour un nouveau genre d'applications :

- le cache agressif des données et une navigation rapide grâce aux Service Workers,
- la mise en place du [pattern PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/) (Push, Render, Pre-cache, Lazy-Loading),
- l'illustration du pattern Coquille Applicative ([_App Shell_](https://developers.google.com/web/fundamentals/architecture/app-shell)) pour rendre encore plus rapide les visites subséquentes et afficher une page la plus complète possible, le plus rapidement possible.

Ces concepts modernes, lorsqu'ils sont pris ensemble, sont un atout majeur dans l'approche qu'a suivi Twitter pour proposer une expérience proche d'une app. Les ingénieur·e·s de Twitter ont réussi à isoler le cœur de l'expérience Twitter et à le rendre disponible à travers une appli Web moderne ultra-rapide grâce à l'application de techniques d'ingénierie éprouvées; et certains utilisateurs la préfèrent même à l'expérience native. Pour en apprendre davantage sur ces techniques, vous pouvez parcourir cette excellente [étude de cas](https://developers.google.com/web/showcase/2017/twitter) par Addy Osmani de Google.

Ces deux applis Web serviront de d'exemples à garder à l'esprit quand nous allons aborder l'utilisation de Gatsby pour les applis Web.

## Gatsby est taillé pour les applis Web

![what if I told you](https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1551434095/what-if-i-told-you.png)

Et si je vous disais… que construire un site avec Gatsby autorisait toutes ces fonctionnalités, traditionnellement réservées à des applis Web, parce qu'un “site statique” Gatsby est en fait une appli Web ?

Aucune application Gatsby n'est dans les faits purement statique. Tout ce qui peut être rendu à l'aide de HTML statique dès le chargement de la page l'est. Ensuite, le JavaScript côté client (via React !) prend le contrôle en tant que socle technique pour les fonctionnalités dynamiques des applis Web. Un petit tour d'horizon du système de build de Gatsby permet d’expliquer clairement le concept. Gatsby :

1. injecte la données dans les pages (depuis [GraphQL](https://www.gatsbyjs.org/docs/querying-with-graphql/) ou même [sans utiliser GraphQL](https://www.gatsbyjs.org/docs/using-gatsby-without-graphql/));

2. utilise la fonction d'API de rendu côté serveur [`ReactDOMServer.renderToString`](https://reactjs.org/docs/react-dom-server.html#rendertostring) pour transformer les composants React en fichiers HTML;

3. injecte le runtime et des additions (comme un routeur !) pour permettre de construire des features d’applis Web.

- Gatsby offre une expérience similaire à [create-react-app](https://facebook.github.io/create-react-app/) une fois que le runtime est fonctionnel

Pour illustrer ce concept, commençons avec une exemple classique… Nous avons besoin de requêter des points de donnée à l'execution plutôt qu'au moment du build.

```jsx
// src/pages/messages.js

import React from "react"

import Layout from "../components/layout"

class Messages extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
    }
  }

  // note: this is a simplified example without error handling, authentication, etc.
  async componentDidMount() {
    const messages = await fetch(`/api/some-url-to-get-messages`).then(
      response => response.json()
    )

    this.setState({
      messages,
    })
  }

  render() {
    const { messages } = this.state
    return (
      <Layout>
        {messages.length === 0 ? (
          <p>Loading messages&hellip;</p>
        ) : (
          <ul>
            {messages.map(message => (
              <li key={message.id}>{message.text}</li>
            ))}
          </ul>
        )}
      </Layout>
    )
  }
}

export default Messages
```


Tout ce que nous avons fait ci-dessus est d'implémenter la méthode du cycle de vie React [`componentDidMount`](https://reactjs.org/docs/react-component.html#componentdidmount), qui va déclencher une requête vers une API REST pour requêter des données (des messages !) depuis une API distante. Au runtime notre application requête donc des données dynamiquement. Ceci illustre l'efficacité du runtime Gatsby + React, ainsi que la manière dont une application Gatsby est en réalité proche d'un `create-react-app` déjà hydraté avec la donnée. [Les méthodes du lifecycle React](https://reactjs.org/docs/state-and-lifecycle.html) sont pleinement supportées et permettent donc d'implémenter n'importe quel type d'interaction nécessaire, comme, dans notre exemple, une requête sur une API distante.

Considérons l'animation ci-dessous, qui représente l'expérience utilisateur. En réalité, nous avons généré statiquement les blocs non-dynamiques (le header, la sidebar…) et nous avons requêté dynamiquement le reste des données !

![illustration de la coquille applicative](https://res.cloudinary.com/jamstatic/image/upload/v1551434167/dynamic-data-fetching.gif)

Cependant, notre exemple peut paraître simpliste — ou en tous cas assez éloigné d'une vraie appli Web. Que se passerait-il si l'API REST [nécessitait une authentification](https://www.gatsbyjs.org/docs/authentication-tutorial/) ? Et si nous souhaitions des [routes gérées côté client](https://www.gatsbyjs.org/docs/building-apps-with-gatsby/#client-only-routes--user-authentication), par exemple pour avoir un lien direct vers un message spécifique ? Tout est possible ! Est-ce qu'on peut profiter de GraphQL lors du build *et* du runtime ? Bien sûr !

L'idée principale que je tiens à clarifier dans cet article est que les fonctionnalités *typiques* d'une appli Web sont non seulement possibles avec Gatsby, mais aussi et surtout simples et intuitives à implémenter grâce au runtime dynamique disponible dans chaque application Gatsby. Ce n'est *que* du React.

Gatsby sert à construire des applis Web dynamiques, de la même manière que Gatsby sert à construire des sites statiques. C'est maintenant acté. Gatsby peut être utilisé pour beaucoup de cas d'utilisations typiques d'une appli Web, que ce soit l'authentification, les routes côté client, le requêtage dynamique de données et bien plus.

## Pourquoi utiliser Gatsby pour une appli Web ?

**Des optimisations de performance, par défaut**

Si l'on regarde les avantages que procure Gatsby, à minima :

- le rendu statique de composants React et des données associées en HTML statique;
- l'optimisation des données, des images, etc. pour obtenir des sites ultra-rapides;
- la présence de patterns liés à la performance et des bonnes pratiques comme le [PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/), la séparation de code par route, etc.

Chacun de ces avantages mériteraient que l'on s'y attarde un peu plus, mais nous nous contenterons de dire que ce sont d' *excellentes* fonctionnalités que vous souhaitez avoir dans vos sites *statiques*, mais aussi dans vos applis web.

Ces optimisations de performances ne sont pas à activer — elles sont présentes par défaut. Quand de nouvelles techniques et de nouvelles optimisations apparaîtrons et gagneront en popularités, nous pourrons les y ajouter tout comme nous avons ajouté celles-ci. Ces optimisations peuvent alors être poussées à vos utilisateurs en mettant à jour votre version de Gatsby, un peu comme les améliorations d'outillage peuvent être obtenues en mettant à jour [create-react-app](https://facebook.github.io/create-react-app/).

**Les plugins et l'écosystème Gatsby**

Un des avantages principaux de Gatsby est son architecture modulaire. Vous avez besoin d'un plugin pour [récupérer des données de Wordpress](https://www.gatsbyjs.org/packages/gatsby-source-wordpress/) ? Bien sûr, cela semble raisonnable. Vous avez besoin de [transformer des données YAML](https://www.gatsbyjs.org/packages/gatsby-transformer-yaml/) en objets JavaScript plus simples à manipuler ? Allez, pourquoi pas ! Une envie de se [raccorder à une API GraphQL distante](https://www.gatsbyjs.org/packages/gatsby-source-graphql/) et d'injecter ses données au moment du build ? Ah, je vois qu'on a des goûts de luxe. Vous souhaitez afficher des images optimisées, adaptées à toutes les tailles et qui affichent un effet de flou lors du chargement ? C'est parti !

Prenons le temps de regarder plus en détail ces fonctionnalités proposées par un de nos composants, [`gatsby-image`](https://www.gatsbyjs.org/packages/gatsby-image/).

**`gatsby-image`**

[`gatsby-image`](https://www.gatsbyjs.org/packages/gatsby-image/) est certainement un de mes composants préférés parmi ceux que Gatsby propose et maintient. Il offre un excellent rendu d'images, et amène des optimisations rendues possibles par des plugins comme [`gatsby-plugin-sharp`](https://www.gatsbyjs.org/packages/gatsby-plugin-sharp/). Ces deux techniques, couplée avec l'API GraphQL disponible dans n'importe quelle application Gatsby, simplifie grandement l'expérience de développement lorsque l'on souhaite afficher des images optimisées. Parmi les fonctionnalités disponibles, citons :

- l'adaptabilité de la taille des images pour en afficher une optimisée à celle de votre interface — ce qui permet de reléguer la fameuse image de 5Mo en tête de page au fin fond des oubliettes;
- la génération de multiples images, adaptées aux appareils mobiles, en utilisant `srcset` pour ne télécharger que celle dont votre utilisateur a besoin;
- le chargement asynchrone des images avec une technique de flou dégressif — ou même de [SVG tracé](https://using-gatsby-image.gatsbyjs.org/traced-svg/).

`gatsby-image` est incroyable. Si vous n'avez pas encore pu tester ses fonctionnalités dans vos sites, je vous recommande chaudement de vous y mettre ! Vous pouvez vous inspirer de notre exemple, fraîchement redesigné, “[Using Gatsby Image](https://using-gatsby-image.gatsbyjs.org/)” (en anglais) pour en apprendre plus et le voir dans un cas d'utilisation réelle. En somme, utilisez `gatsby-image` et vos utilisateurs vous remercieront.

Le potentiel de ces composants et de ces plugins est immense. De la même manière que les composants réutilisables ont été incroyablement importants dans le succès de l'écosystème React, les plugins ont une valeur immense pour les applications Gatsby. Pourquoi perdre du temps de développement à réimplémenter ces composants vous-même lorsque vous pouvez réutiliser et profiter du potentiel de l'écosystème Open Source ? Lorsque vous utilisez ces plugins et ces composants, vous pouvez passer davantage de temps à construire votre propre application Gatsby. Jetez un oeil à notre [librairie de plugins](https://www.gatsbyjs.org/plugins) si ce n'est pas déjà fait !

Maintenant, la suite : nous allons comparer l'expérience utilisateur lorsque nous requêtons des données derrière une authentification entre une application Gatsby, et une application rendu côté serveur.

## La Coquille Applicative

En ajoutant juste le plugin [`gatsby-plugin-offline`](https://www.gatsbyjs.org/packages/gatsby-plugin-offline/), nous transformons notre appli Web en une Progressive Web App complète, qui fonctionne hors ligne, et qui crée une “coquille applicative” en enregistrant un Service Worker. Une coquille applicative est en réalité une collection de composants de votre application (par exemple, l'en tête, le pied de page, la navigation latérale, etc…) qui sont disponibles immédiatement depuis le Service Worker pendant que le contenu dynamique est récupéré en tâche de fond. Cela permet de créer des expériences utilisateur immersives, car l'application apparaît instantanément à l'écran et le contenu dynamique se remplit progressivement.

Si nous regardons de plus près cette approche, elle se décompose comme suit:

- on rend le plus de contenu possible instantanément (la coquille applicative);
- on fait des requêtes asynchrones pour aller chercher des données supplémentaires, par exemple du contenu venant d'une API (plus particulièrement d'une API authentifiée).

Comparons cette méthode avec celle du rendu côté serveur. Pour cet exemple, nous allons considérer que nous devons nous connecter à une API authentifiée. L'appel API que l'on déclenche sert à peupler le contenu de la page avant qu'elle soit envoyée (en HTML) à l'utilisateur. Nous devons donc attendre que l'appel API soit terminé avant de commencer à charger la page, plutôt que de proposer la coquille applicative et d'aller chercher les données dans un second temps, en tâche de fond.

Pour illustrer cet exemple, nous pouvons nous appuyer sur l'animation suivante. Sur la gauche, on peut voir une application qui utilise un Service Worker et une coquille applicative — une application Gatsby par exemple. Sur la droite, c'est une application rendue côté serveur, qui doit donc attendre que l'appel API soit terminé avant de pouvoir proposer la page complète, d'un coup.

![comparaison coquille applicative vs rendu côté serveur](https://res.cloudinary.com/jamstatic/image/upload/v1551434230/app-shell-web-apps.gif)

Nous voyons donc clairement les avantages de cette approche. Lorsque nous chargeons une coquille applicative, nous donnons à nos utilisateurs l'impression que la page se charge plus rapidement, bien que si nous comparons les deux approches, elles affichent toutes deux *toute la donnée* au même moment. Nous avons donc le meilleur des deux mondes… On donne la perception que le site est très rapide, tout en sachant qu'il *est* très rapide grâce aux optimisations que l'on obtient avec Gatsby, par défaut.

Afin de revenir sur tous ces concepts, j'ai préparé une application de démonstration qui ressemble à notre vieil ami Gmail. Cette démonstration montre que les applis Web complexes sont non seulement *possibles* avec Gatsby, mais aussi que Gatsby est un excellent choix lorsque l'on doit en construire une.

## Et voici… Gatsby Mail ! (Qui ne sert qu'à des fins de démonstration !)

![gatsby mail](https://res.cloudinary.com/jamstatic/image/upload/c_scale,f_auto,q_auto,w_1200/v1551434278/gatsby-mail.png)


[Gatsby Mail](https://gatsby-mail.netlify.com/) reprend certains des concepts et des thèmes que j'ai abordés. Plus particulièrement :

1. Gmail, Twitter et les autres sont des exemples parlants d'applis Web complexes qui proposent des expériences riches.
2. Gatsby fournit des composants, des plugins, etc… qui permettent de développer ces expériences, servez-vous en !
3. Gatsby est un excellent choix lorsqu'il s'agit de construire de telles applis Web.

De plus, Gatsby Mail fait la démonstration de fonctionnalités spécifiques aux applis Web, comme :

- du rendu statique couplé à des requêtes dynamiques grâce au *runtime* côté client;
- de l'authentification et des routes gérées côté client;
- des routes non-authentifiées, comme une page d'accueil (qui utilise [l'API Context](https://reactjs.org/docs/context.html) de React);
- l'utilisation de GraphQL au moment du build *et* *au runtime*, en s'appuyant sur une API GraphQL distante et sur [`apollo-boost`](https://github.com/apollographql/apollo-client/tree/master/packages/apollo-boost);
- le chargement d'une coquille applicative grâce à `gatsby-plugin-offline` (voyez par vous-même la démo en “3G rapide” ci-dessous !).

et même des thèmes clairs/sombres, parce que pourquoi pas ! Vous pouvez voir ce que ce tout cela donne, et comment cela amène à une très bonne expérience utilisateur dans l'exemple ci-dessous, pour lequel j'ai simulé une connexion 3G rapide. La coquille applicative (l'en-tête, le pied de page, etc…) s'affiche *instantanément* pendant que l'on va chercher le contenu dynamique (depuis notre API distante GraphQL) en tâche de fond.

![animation de la coquille applicative sur Gatsby Mail](https://res.cloudinary.com/jamstatic/image/upload/v1551434347/app-shell-gatsby-mail.gif)


Vous pouvez aller jeter un oeil au [repository GitHub](https://github.com/dschau/gatsby-mail) pour en savoir plus sur comment elle a été développée, et vous approprier quelques unes de ces techniques pour la prochaine **appli** Web que vous développerez en Gatsby ;)

On a hâte de voir ce que vous allez construire.