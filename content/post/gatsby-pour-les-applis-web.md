---
title: "Gatsby pour les applis Web"
description: Comment Gatsby permet d'allier les atouts du statique avec les possibilités du dynamique pour créer des applis Web riches en fonctionnalités
date: 2018-11-07
commments: true
source:
  author: Dustin Schau
  title: "Gatsby for Apps"
  url: https://www.gatsbyjs.org/blog/2018-11-07-gatsby-for-apps/
images:
  - https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523346582/go_static.jpg
categories:
  - jamstack
  - gatsby
---

Gatsby brille dans la génération des sites statiques. Vous le savez probablement déjà ! C'est en fait tout aussi bien pour les applis Web. Vous ne le savez peut-être pas. Gatsby est taillé pour construire des expériences qui tirent à la fois les bénéfices des sites dits statiques et des applis web — simultanément. Vous n'avez pas à sacrifier les avantages des unes pour obtenir les bénéfices des autres.


Dans ce post, nous allons voir certains cas d'usage d'une appli web complexe, comme le fait d'aller requêter des données tierces dynamiques et l'authentification, and nous allons révéler pourquoi Gatsby est un très bon choix pour construire des applis web.

Nous allons prendre comme exemple une appli web classique — Gmail — que nous avons reconstruit en Gatsby pour démontrer comment Gatbsy peut servir à construire des applications modernes et plaisantes.

Pour commencer, nous pouvons nous demander ce qu'est, au juste, une appli web.

> Note :
Si vous ne l'avez pas déjà fait, nous vous suggérons de regarder la vidéo (en anglais) ‘[Beyond Static: Building Dynamic Apps with Gatsby](https://www.gatsbyjs.com/build-web-apps-webinar)’ de laquelle la plupart des idées de ce billet sont reprises.

## Qu'est-ce qu'une appli web ?

J'ai par le passé [tenté de définir](https://www.gatsbyjs.org/blog/2018-10-15-beyond-static-intro/#what-is-an-app) ce qu'est une appli Web traditionnelle, ce qui s'est avéré étonnamment difficile (en anglais). Pour résumer, je pense qu'il y a plusieurs fonctionnalités clés qui tendent à créer une expérience semblable à celle d'une app :

- Requêtage de données dynamiques
- Authentification des utilisateurs, et le fait d'avoir des routes authentifiées côté client
- Des intéractions côté client portées par JavaScript

Bien entendu, une appli web n'est pas une simple liste de courses pour laquelle il faudrait avoir chacun des points suivants afin d'obtenir une expérience semblable à celle d'une app. Je pense plutôt qu'il est plus simple de *voir* un exemple d'une appli Web — une qui aurait mis en place plusieurs de ces fonctionnalités — afin de pouvoir dessiner un modèle mental du type d'applis Web que Gatsby peut construire.

Je pense plus particulièrement à deux exemples clé, qui sont pour moi les plus représentatifs de mon modèle mental d'un appli web… Gmail et Twitter.

## Gmail

![](Untitled-e8155760-8318-40a9-84de-c5957dd970b2.png)

Gmail pouvait être vu à l'époque comme un “proof of concept” qui a démontré deux choses très importantes :

- Le JavaScript côté client peut offrir une expérience proche de celles des apps, et
- une application JavaScript (qui s'exécute dans votre navigateur) soutient favorablement la comparaison avec une application native, que ce soit sur desktop ou mobile.

L'impact de ces bénéfices ne peut pas être souligné suffisamment. Gmail a *prouvé* qu'une expérience de type native est non seulement possible pour les utilisateurs grâce au JavaScript côté client, mais aussi que cette solution peut être préférable et plus pratique que la solution native. Nous reviendrons sur l'exemple de ce bon vieux Gmail en temps voulu.

## Twitter (Progressive Web Application)

![](Untitled-f005f0c1-af48-4fe2-aad3-b4668b20b3e6.png)

Twitter est un autre très bon exemple de mon modèle mental de ce qu'est (et ce que peut être !) une appli Web parce que :

- Ca illustre une partie de la richesse d'une expérience Web moderne, et
- Ca repose sur des pratiques avancées et des optimisations poussées de performances pour proposer une expérience rapide et plaisante

En particulier, les fonctionnalités suivantes sont des composantes clés pour un genre nouveau d'applications :

- Le cache agressif des données et une navigation rapide grâce aux Service Workers
- La mise en place du pattern PRPL (Push, Render, Pre-cache, Lazy-Loading)
- L'illustration du pattern App Shell pour rendre encore plus rapide les visites subséquentes et afficher une page la plus complète possible, le plus rapidement possible

Ces concepts modernes, lorsque pris ensembles, sont un atout majeur dans l'approche que montre Twitter pour proposer une expérience proche d'une app. Les ingénieur•e•s de Twitter ont réussi à isoler le coeur de l'expérience Twitter et à la rendre disponible à travers une appli Web moderne ultra-rapide grâce à l'application de techniques d'ingénierie éprouvées; et certains parmi leurs utilisateurs la préfèrent même à l'expérience native. Pour en apprendre davantage sur ces techniques, vous pouvez parcourir cette excellente étude de cas de Addy Osmani chez Google.

Ces deux applis Web serviront de d'exemples à garder à l'esprit quand nous allons aborder l'utilisation de Gatsby pour les applis Web.

## Gatsby est taillé pour les applis Web

![](Untitled-9dd530f5-0376-4f03-a5a6-749eff8be51d.png)

Et si je vous disais… que construire un site avec Gatsby autorisait toutes ces fonctionnalités, traditionnellement réservées à des applis Web, parce qu'un “site statique” Gatsby est en fait une application ?

Aucune application Gatsby n'est en fait purement statique. Tout ce qui peut être rendu à l'aide de HTML statique dès le chargement de la page l'est. Cependant, le JavaScript côté client (via React !) prend le contrôle en tant que socle technique pour les fonctionnalités dynamiques des applis Web. Un petit tour d'horizon du système de build de Gatsby explique clairement le concept.

1. Injecter la données dans les pages (depuis GraphQL ou même sans utiliser GraphQL)

2. Utiliser la fonction d'API de rendu côté serveur `ReactDOMServer.renderToString` pour transformer les composants React en fichiers HTML

3. Injecter le runtime et des additions (comme un routeur !) pour autoriser les features des applis Web

- Gatsby offre une expérience similaire à create-react-app une fois que le runtime est fonctionnel

Pour illustrer le concept, commençons avec une exemple classique… Nous avons besoin de requêter  des points de donnée au runtime plutôt qu'au build-time.

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

Tout ce que nous avons fait ci-dessus est d'implémenter la méthode du cycle de vie React `componentDidMount`, qui va déclencher une requête vers une API REST pour requêter des données (des messages !) depuis une API distante. Au runtime notre application requête donc des données dynamiquement. Ceci illustre l'efficacité du runtime Gatsby + React, ainsi que la manière dont une application Gatsby est en réalité proche d'un create-react-app déjà hydraté avec la donnée. Les méthodes du lifecycle React sont pleinement supportées et permettent donc d'implémenter n'importe quel type d'interaction nécessaire, comme, dans notre exemple, une requête sur une API distante.

Considérons l'animation ci-dessous, qui représente l'expérience utilisateur. En réalité, nous avons généré statiquement les blocs non-dynamiques (le header, la sidebar…) et nous avons requêté dynamiquement le reste des données !

![](Untitled-abb46879-7412-40e2-8c6d-0f19d95c8c2e.png)

Cependant, notre example peut paraître simpliste — ou en tous cas assez éloigné d'une vraie appli Web. Que se passerait-il si l'API REST nécessitait une authentification ? Et si nous souhaitions des routes seulement côté client, par exemple pour avoir un lien direct vers un message spécifique ? Tout est possible ! Est-ce qu'on peut profiter de GraphQL lors du build *et* du runtime ? Bien sûr !

L'idée principale que je tiens à clarifier dans cet article est que les fonctionnalités *typiques* d'une appli Web sont non seulement possibles avec Gatsby, mais aussi et surtout simples et intuitives à implémenter grâce au runtime dynamique disponible dans chaque application Gatsby. Ce n'est *que* du React.

Gatsby sert à construire des applis Web dynamiques, de la même manière que Gatsby sert à construire des sites statiques. C'est maintenant acté. Gatsby peut être utilisé pour beaucoup de cas d'utilisations typiques d'une appli Web, que ce soit l'authentification, les routes côté client, le requêtage dynamique de données et bien plus.

## Pourquoi utiliser Gatsby pour une appli Web ?

**Des optimisations de performance, par défaut**

Si l'on regarde les avantages que procure Gatsby, à minima :

- Le rendu statique de composants React et des données associées en HTML statique
- L'optimisation des données, des images, etc… pour obtenir des sites ultra-rapides
- La présence de patterns liés à la performance et des bonnes pratiques comme le PRPL, la séparation de code par route, etc÷

Chacun de ces avantages mériteraient que l'on s'y attarde un peu plus, mais nous nous contenterons de dire que ce sont des *excellentes* fonctionnalités que vous souhaitez avoir dans vos sites *statiques*, mais aussi dans vos applis web.

Ces optimisations de performances ne sont pas à activer — elles sont présentes par défaut. Quand de nouvelles techniques et de nouvelles optimisations apparaîtrons et gagneront en popularités, nous pourrons les y ajouter tout comme nous avons ajouté celles-ci. Ces optimisations peuvent alors être poussées à vos utilisateurs en mettant à jour votre version de Gatsby, un peu comme les améliorations d'outillage peuvent être obtenues en mettant à jour create-react-app.

**Les plugins et l'écosystème Gatsby**

Un des avantages principaux de Gatsby est son architecture modulaire. Vous avez besoin d'un plugin pour récupérer des données de Wordpress ? Bien sûr, cela semble raisonnable. Vous avez besoin de transformer des données YAML en objets JavaScript plus simples à manipuler ? Allez, pourquoi pas ? Une envie de se raccorder à une API GraphQL distante et d'injecter ses données au moment du build ? Ah, je vous qu'on a des goûts de luxe. Vous souhaitez afficher des images optimisées, adaptées à toutes les tailles et qui affichent un effet de flou lors du chargement ? C'est parti.

Prenons le temps de regarder plus en détail ces fonctionnalités proposées par un de nos composants, gatsby-image.

**`gatsby-image`**

gatsby-image est certainement un de mes composants préférés parmi ceux que Gatsby fournit et maintient. Il offre un rendu excellent, et amène des optimisations rendues possibles par des plugins comme gatsby-plugin-sharp. Ces deux techniques, couplée avec l'API GraphQL disponible dans n'importe quelle application Gatsby, simplifie grandement le l'expérience de développement lorsque l'on souhaite afficher des images optimisées. Parmi les fonctionnalités disponibles, citons :

- L'adaptabilité de la taille des images pour en afficher une optimisée à celle de votre interface
    - Ce qui permet de reléguer la fameuse image de 5Mo en tête de page au fin fond des oubliettes
- La génération de multiples images, adaptées aux appareils mobiles, en utilisant `srcset` pour ne télécharger que celle dont votre utilisateur a besoin
- Le chargement asynchrone des images avec une technique de flou — ou même de SVG tracé

`gatsby-image` est incroyable. Si vous n'avez pas encore pu tester ses fonctionnalités dans vos sites, je vous recommande chaudement de vous y mettre ! Vous pouvez vous inspirer de notre exemple, fraîchement redesigné, “Using Gatsby Image” (en anglais) pour en apprendre plus et le voir dans un cas d'utilisation réelle. En somme, utilisez `gatsby-image` et vos utilisateurs vous remercieront.

Le potentiel de ces composants et de ces plugins est immense. De la même manière que les composants réutilisables ont été incroyablement importants dans le succès de l'écosystème React, les plugins ont une valeur immense pour les applications Gatsby. Pourquoi perdre du temps de développement à réimplémenter ces composants vous-même lorsque vous pouvez réutiliser et profiter du potentiel de l'écosystème Open Source ? Lorsque vous utilisez ces plugins et ces composants, vous pouvez passer davantage de temps à construire votre propre application Gatsby. Jetez un oeil à notre librairie de plugins si ce n'est pas déjà fait !

Maintenant, la suite : nous allons comparer l'expérience utilisateur lorsque nous requêtons des données derrière une authentification entre une application Gatsby, et une application rendu côté serveur.

## La Coquille Applicative

En ajoutant juste le plugin `gatsby-plugin-offline`, nous permettons une Progressive Web App complète, qui fonctionne hors ligne, et qui crée une “coquille applicative” en enregistrant un Service Worker. Une coquille applicative est en réalité une collection de composants de votre application (par exemple, l'en tête, le pied de page, la navigation latérale, etc…) qui sont rendus disponible immédiatement depuis le Service Worker pendant que le contenu dynamique est récupéré en tâche de fond. Cela permet de créer des expériences utilisateur immersives, car l'application apparaît instantanément à l'écran et le contenu dynamique se remplit progressivement.

Si nous regardons de plus près cette approche, elle se décompose comme suit:

- On rend le plus de contenu possible instantanément (la coquille applicative)
- On fait des requêtes asynchrones pour aller chercher des données supplémentaires, par exemple du contenu venant d'une API (plus particulièrement d'une API authentifiée).

Comparons cette méthode avec celle du rendu côté serveur. Pour cet exemple, nous allons considérer que nous devons nous connecter à une API authentifiée. L'appel API que l'on déclenche sert à peupler le contenu de la page avant qu'elle soit envoyée (en HTML) à l'utilisateur. Nous devons donc attendre que l'appel API soit terminé avant de commencer à charger la page, plutôt que de proposer la coquille applicative et d'aller chercher les données dans un second temps, en tâche de fond.

Pour illustrer cet exemple, nous pouvons nous appuyer sur l'animation suivante. Sur la gauche, on peut voir une application qui utilise un Service Worker et une coquille applicative — une application Gatsby par exemple. Sur la droite, c'est une application rendue côté serveur, qui doit donc attendre que l'appel API soit terminé avant de pouvoir proposer la page complète, d'un coup.

![](Untitled-6e4f3c76-1469-471c-bd9c-4adb2a79e848.png)

Nous voyons donc clairement les avantages de cette approche. Lorsque nous chargeons une coquille applicative, nous donnons à nos utilisateurs l'impression que la page se charge plus rapidement, bien que si nous comparons les deux approches, elles affichent toutes deux *toute la donnée* au même moment. Nous avons donc le meilleur des deux mondes… On donne la perception que le site est très rapide, tout en sachant qu'il *est* très rapide grâce aux optimisations que l'on obtient avec Gatsby, par défaut.

Afin de revenir sur tous ces concepts, j'ai préparé une application de démonstration qui ressemble à notre vieil ami Gmail. Cette démonstration montre que les applis Web complexes sont non seulement *possibles* avec Gatsby, mais aussi que Gatsby est un excellent choix lorsque l'on a à en construire une.

## Et voici… Gatsby Mail ! (Qui ne sert qu'à des fins de démonstration !)

![](Untitled-8219ed5f-7d4e-4948-ad3f-f0e426483bb4.png)

[Gatsby Mail](https://gatsby-mail.netlify.com/) reprend certains des concepts et des thèmes que j'ai abordés. Plus particulièrement :

1. Gmail, Twitter et les autres sont des exemples parlants d'applis Web complexes qui proposent des expériences riches
2. Gatsby fournit des composants, des plugins, etc… qui permettent de développer ces expériences, vous pouvez les utiliser !
3. Gatsby est un excellent choix lorsqu'il s'agit de construire de telles applis Web

De plus, Gatsby Mail fait la démonstration de fonctionnalités spécifiques aux applis Web, comme :

- Du rendu statique couplé à des requêtes dynamiques grâce au *runtime* côté client
- De l'authentification et des routes gérées côté client
- Des routes non-authentifiées, comme une page d'accueil (qui utilise [l'API Context](https://reactjs.org/docs/context.html) de React)
- L'utilisation de GraphQL au moment du build *et* *au runtime*, en s'appuyant sur une API GraphQL distante et sur `apollo-boost`
- Le chargement d'une coquille applicative grâce à gatsby-plugin-offline (essayez l'exemple en “3G rapide” ci-dessous !)

et même des thèmes clairs/sombres, parce que pourquoi pas ! Vous pouvez voir ce que ce tout cela donne, et comment cela amène à une très bonne expérience utilisateur dans l'exemple ci-dessous, pour lequel j'ai simulé une connexion 3G rapide. La coquille applicative (l'en tête, le pied de page, etc…) s'affiche *instantanément* pendant que l'on va chercher le contenu dynamique (depuis notre API distante GraphQL) en tâche de fond.

![](Untitled-9cca5b6e-fb4e-4a69-9906-d04c8747b8af.png)

Vous pouvez aller jeter un oeil au [repository GitHub](https://github.com/dschau/gatsby-mail) pour en savoir plus sur comment elle a été développée, et vous approprier quelques unes de ces techniques pour la prochaine **appli** Web que vous développerez en Gatsby ;)

On a hâte de voir ce que vous allez construire.