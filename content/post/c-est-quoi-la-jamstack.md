---
title: C'est quoi la JAMstack au juste ?
date: 2019-02-07T20:12:14+01:00
lastmod: 2019-02-28T09:17:42+01:00
description: "Un petit pense-bête pour expliquer les concepts de la JAMstack et encourager les développeurs à adopter cette approche."
source:
  author: "Pedro Duarte"
  title: "WTF is JAMstack?"
  url: "https://jamstack.wtf/"
---

{{% intro %}}
[Pedro Duarte](https://twitter.com/peduarte) a lancé [https://jamstack.wtf](https://jamstack.wtf) un mini-site afin de donner une vue d'ensemble de la JAMstack. Nous vous proposons ici sa traduction en français afin de permettre à toujours plus de développeurs d'adopter cette façon de travailler.
{{% /intro %}}


La JAMstack révolutionne notre manière de travailler en proposant une expérience de développement plus simple, de meilleures performances, des coûts bien moins élevés et une grande scalabilité.

Vous vous demandez peut-être ; oui OK, mais comment ? pourquoi ? c'est quoi au juste ?

C'est la raison d'être de cette page [https://jamstack.wtf](https://jamstack.wtf/).

Le but de ce guide est de présenter de manière claire le concept de la JAMstack et d'inciter d'autres développeurs à adopter cette approche.

Le contenu ci-dessous est tiré du site ci-dessus 👆

Asseyez-vous, mettez-vous à l'aise et appréciez ✌️

*****

**Sommaire**

[C'est quoi la JAMstack ?](#c-est-quoi-la-jamstack)

- [Signification](#signification)
  - [Bénéfices](#bénéfices)
  - [Bonnes pratiques](#bonnes-pratiques)
  - [Workflow](#chaîne-de-publication)
  - [Historique](#historique)
- [Bien démarrer](#bien-démarrer)
  - [Développement](#développement)
  - [Déploiement](#déploiement)
  - [Parties dynamiques](#parties-dynamiques)
  - [CMS](#cms)
- [Ressources](#ressources)
- [À propos](#à-propos)

*****

## C'est quoi la JAMstack ?

### Signification

![](https://cdn-images-1.medium.com/max/1600/1*T4kRqCGtoD8PuPjR_ZbPxQ.png)

JAM c'est pour : JavaScript, APIs & Markup.

**JavaScript**<br> Les fonctionnalités dynamiques sont gérées par JavaScript. Vous êtes libres d'utiliser la bibliothèque ou le framework que vous voulez.

**APIs**<br> Les opérations côté serveur sont abstraites sous forme d'APIs réutilisables, accessibles en HTTPS à l'aide de JavaScript. Ces opérations peuvent être déléguées à des services tierces ou bien à vos propres fonctions.

**Markup**<br/> Les sites web sont servis sous forme de fichiers HTML statiques. Ces fichiers peuvent être générés à partir de fichiers source, comme du Markdown, à l'aide d'un générateur de site statique.

### Bénéfices

Les principaux bénéfices apportés par la JAMstack sont :

**Une performance accrue**<br/>
Servir du code généré et des assets à partir d'un CDN

**Une meilleure sécurité**<br/>
Plus besoin de se soucier des vulnérabilités du serveur ou de la base de données

**Un coût bien moindre**<br/>
L'hébergement de fichiers statiques est moins cher [voire gratuit](https://netlify.com/)

**Une meilleure expérience de développement**<br/>
Les développeurs front end peuvent se focaliser sur la partie client, sans être dépendants d'une architecture monolithique. Cela se traduit en général par un développement plus rapide et plus ciblé.

**Redimensionnement à la volée**<br/>
Si votre site devient viral ou est soumis à un pic d'activité, le CDN compensera sans problèmes.

### Bonnes pratiques

Les astuces suivantes vous aideront à tirer le meilleur parti de la stack.

**Réseau de distribution de contenu (CDN)**<br/>
Puisque tous les fichiers et les assets sont générés en amont, ils peuvent servis sur un CDN. Cela procure une meilleure performance et un redimensionnement à la volée.

[En savoir plus](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)

**Déploiement atomique**<br/>
Chaque déploiement est une photographie complète du site. Vous disposez ainsi d'une version consistante du site à l'échelle mondiale.

[En savoir plus](https://buddy.works/blog/introducing-atomic-deployments#what-are-atomic-deployments)

**Invalidation du cache**<br/>
Une fois votre site généré poussé en ligne, le CND va invalider son cache. Cela signifie que la nouvelle version est instantanément disponible partout.

[En savoir plus](https://www.netlify.com/blog/2015/09/11/instant-cache-invalidation/)

**Tout est versionné**<br/>
Votre code vit dans un système de gestion de versions tel que Git. Les principaux avantages sont : l'historique des changements de chaque fichier et de chaque collaborateur ainsi que la traçabilité.

[En savoir plus](https://www.atlassian.com/git/tutorials/what-is-version-control)

**Générations automatiques**<br/>
Votre serveur est notifié lorsqu'une nouvelle génération est requise, typiquement à l'aide de webhooks. Le serveur génère le projet, met à jour les CDNs et le site est en ligne.

[En savoir plus](https://www.agilealliance.org/glossary/automated-build)

### Chaîne de publication

Voici à quoi ressemblerait la chaîne de publication JAMstack idéale.

![](https://cdn-images-1.medium.com/max/800/1*iaJIWN-1jhRBTiVfmYYdlA.png)

### Historique

**2015**<br/>
Les générateurs statiques sont de plus en plus en vogue, grâce à des générateurs populaires comme Jekyll.

**2016**<br/>
Quelques développeurs pensent que les sites statiques n'ont pas à être forcément statiques, le terme "JAMstack" fait son apparition.

**2017**<br/>
La révolution du web moderne commence à prioriser la performance, le redimensionnement à la volée et l'expérience de développement. Le terme JAMstack est adopté par un groupe de développeurs plus important et les premières entreprises commencent à annoncer des projets basés sur la JAMstack.

**2018**<br/>
Des outils comme Netlify, Gatsby et Contentful contribuent à promouvoir le terme et la communauté grandit vite. C'est aussi l'année de la première conférence JAMstack.

[Source: SnipCart](https://snipcart.com/blog/jamstack)

*****

## Bien démarrer

C'est à vous de décider comment générer vos fichiers HTML. Les trois approches les plus communes sont :

### Développement

**À la main**<br/>
Une méthode simple et efficace d'écrire du HTML, c'est idéal pour les pages super simples.

**Générateurs de site statique**<br/>
La plupart des sites JAMstack sont propulsés par un générateur de site statique.
Vous êtes libres de choisir votre GSS.

* [Gatsby](https://www.gatsbyjs.org/)
* [Next.js](https://nextjs.org/)
* [Hugo](https://gohugo.io/)

[Voir davantage de générateurs](https://www.staticgen.com/)

**Framework frontend**<br/>
La plupart des frameworks ne génèrent pas de fichiers HTML statiques par défaut, toutefois c'est possible si vous connaissez bien vos outils, cela demande plus d'expérience et de maintenance.

* [React](http://reactjs.org/)
* [Vue.js](https://vuejs.org/)
* [Preact](https://preactjs.com/)

### Déploiement

Vous devez héberger le résultat de la compilation de votre site. Il existe de fantastiques services qui font cela gratuitement et simplement.

* [Netlify](https://netlify.com/)
* [Zeit](https://zeit.co/)
* [Github Pages](https://pages.github.com/)

[Voir plus de services de déploiement](https://www.thenewdynamic.org/tools/hosting-deployment/)

### Parties dynamiques

Les sites JAMstack n'ont pas à être entièrement statiques. Il existe des services formidables pour vous aider à insérer des parties dynamiques dans votre projet.

**Fonctions personnalisées**<br/>
Vous pouvez également abstraire vos propres fonctions pour en faire des APIs réutilisables. Pour cela vous pouvez utiliser [les fonctions AWS lambda](https://aws.amazon.com/lambda/features/) ou [les fonctions Netlify](https://functions.netlify.com/examples/)

**Commentaires**<br/>
Beaucoup de sites JAMstack intègrent des sections pour les commantaires, principalement sur des blogs.

**Formulaires**<br/>
Un excellent moyen d'interagir avec votre audience

**E-Commerce**<br/>
Mettre en place une boutique en ligne sur un site JAMstack n'a jamais été aussi simple.

**Recherche**<br/> 
Reposez-vous sur des services tiers pour intégrer des fonctionnalités de recherche

[Voir plus de services pour les sites statiques](https://github.com/agarrharr/awesome-static-website-services#e-commerce)

### CMS

Les sites JAMstack peuvent aussi être gérés via un système de gestion de contenu, plus précisément  avec des CMS headless. Chaque changement effectué dans le CMS va entraîner une nouvelle génération du site, qui sera ensuite déployé sous forme de fichiers statiques.

* [Contentful](http://contentful.com/)
* [Forestry](https://forestry.io/)
* [Ghost](https://docs.ghost.org/api/content/)
* [Headless WordPress](https://developer.wordpress.org/rest-api/)
* [Netlify CMS](https://www.netlifycms.org/)
* [Strapi](https://strapi.io/)

[Voir plus de services de gestion de contenu](https://headlesscms.org/)

### Ressources

Voici une sélection de ressources sur la JAMstack qui comporte des matériaux d'apprentissage ainsi que des listes de services.

#### Services

- [Une liste de services pour les sites web statiques](https://github.com/agarrharr/awesome-static-website-services)
- [Une liste de gestionnaires de contenu pour les sites JAMstack](https://headlesscms.org/)
- [Une liste de générateurs de site statiques pour les sites JAMstack](https://www.staticgen.com/)
- [Un annuaire de sélection d'outils et de services](https://www.thenewdynamic.org/tool/)

#### Articles

- [Débuter avec la JAMstack? Tout ce que vous devez savoir pour bien démarrer](https://snipcart.com/blog/jamstack)
- [Quel est le concept derrière la JAMstack](https://www.quora.com/What-is-the-concept-behind-JAMstack)
- [Développement web moderne avec la JAMstack](https://bejamas.io/blog/jamstack-modern-web-development/)
- [Smashing Magazine va dix fois plus vite](/2017/03/17/smashing-mag-va-dix-fois-plus-vite/)
- [Ghost avec la JAMstack](https://blog.ghost.org/jamstack/)
- [JAMstack avec Gatsby, Netlify et Netlify CMS](https://medium.com/netlify/jamstack-with-gatsby-netlify-and-netlify-cms-a300735e2c5d)

#### Vidéos

- [L'essor de la JAMstack, présentation de Mathias Biilmann](https://www.youtube.com/watch?v=uWTMEDEPw8c)
- [La nouvelle stack Front-end, présentation de Mathias Biilmann](https://vimeo.com/163522126)
- [Une sélection de vidéos par The New Dynamic](https://www.thenewdynamic.org/video/)
- [Comment freeCodeCamp sert des millions d'apprenants en utilisant la JAMstack](https://www.youtube.com/watch?v=e5H7CI3yqPY)

#### Podcast

- [JAMstack Radio](https://www.heavybit.com/library/podcasts/jamstack-radio/)

*****

## À propos

Cette page a été mise en place par [@peduarte](https://twitter.com/peduarte) et
présentée au [meetup JAMstack de Londres](https://www.meetup.com/JAMstack-London/events/257961818/) — ([voir les slides](https://speakerdeck.com/peduarte/jamstack-cheatsheet)).
