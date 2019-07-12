---
title: Pour des sites web modernes, direction le maillage de contenus
date: 2019-07-11
lastmod: 2019-07-12T12:42:35.000+00:00
description: ''
author: anthony
categories:
- gatsby
- headless
images:
- "/assets/images///"
source:
  author: Sam Bhagwat
  title: 'Delivering Modern Website Experiences: The Journey to a Content Mesh'
  url: https://www.gatsbyjs.org/blog/2018-10-04-journey-to-the-content-mesh/
  lang: en
commments: false
aliases: []
canonical_url: ''
keywords: []
draft: true

---
Les systèmes de gestion de contenu (CMS) sont nés pour rendre l'édition de contenu de sites _possible_. Ils sont maintenant ré-imaginés pour la rendre _fantastique_.

Au début des années 2000, publier sur le web était difficile. Le CMS s'est petit à petit imposé comme l'application unique pour stocker les contenus, générer les sites et les servir aux utilisateurs finaux.

Avec le temps, le paysage de fonctionnalités s'est étoffé — des domaines clé comme la recherche, le suivi de données, les paiements, la personnalisation et le e-commerce ont émergé. Dans chaque domaine, les outils spécialisés se sont vite améliorés, alors que dans le même temps la qualité des applications de gestion de contenu destinés aux entreprises comme Adobe Experience Manager ou Sitecore a plus ou moins stagné.

## Modulariser le CMS

De nos jours, l'équipe web d'un site de e-commerce peut gérer son inventaire produit dans [Shopify](https://www.shopify.com/), les listings de produit dans [Salsify](https://www.salsify.com/) et les évaluations dans [Bazaarvoice](https://www.bazaarvoice.com/). Une équipe qui fait tourner un site avec des contenus payants peut écrire des articles dans [Wordpress](https://wordpress.org/), stocker des vidéos dans [JWPlayer](https://www.jwplayer.com/), des données utilisateur dans [Auth0](https://auth0.com/), et les données d'inscription dans [Recurly](https://recurly.com/).

Lorsque les équipes web ont besoin d'ajouter de la recherche, elles peuvent se tourner vers [Algolia](https://www.algolia.com/); vers [Stripe](http://stripe.com) pour des paiements; vers [Segment](https://segment.com/) pour des données statistiques; vers [Optimizely](https://www.optimizely.com/) pour du A/B testing ; vers [Evergage](https://www.evergage.com/) pour de la personnalisation.

Les équipes adoptent ces services car chacun d'entre eux est fait pour répondre à un besoin bien précis, alors que de leur côté les CMS destinés aux entreprises ne sont souvent pas optimisés pour grand chose.

![](/v1562938736/jamstatic/modular-cms-architecture.png)

## L'émergence du maillage de contenus

Cet article a pour but d'expliquer l'émergence du "maillage de contenus" — une couche structurelle pour un site web découplé. Le maillage de contenus assemble différents systèmes de contenus, dans un environnement de développement moderne, tout en optimisant la performance du site web généré.

La précédente génération de CMS dédiés aux entreprises offrait souvent une expérience d'édition de contenu générique, basée sur des développement et des environnements de déploiement dépassés. La nouvelle stratégie pour la gestion de contenu tant à ne conserver que les meilleurs solutions, adaptables à des cas d'utilisation spécifiques comme le e-commerce ou le blogging; elle apporte un cadre de travail moderne permettant des itérations rapides et génère des sites web légers et rapides nativement.

Le maillage de contenus donne plus de possibilités aux développeurs tout en conservant le workflow des contributeurs. Il vous donne accès aux meilleurs services _sans_ la difficulté de devoir les intégrer manuellement.

## Trois domaines avec une innovation rapide

Le changement est stimulé par la rencontre de trois révolutions dans la façon dont nous créons et consommons le contenu :

* _La gestion du contenu_ : les applications de type CMS monolithiques sont remplacées par des systèmes de gestion modulaires et spécialisés.
* _Les techniques de développement_ : les frameworks Front comme React ont un rôle prépondérant pour les expériences enrichies de l'utilisateur.
* La performance : étant donné que le mobile représente plus de 50% du traffic internet, la haute performance est devenue obligatoire et non plus optionnelle.

![](/v1562938846/jamstatic/three-website-revolutions.png)

These technological changes have made modern web technology both _essential_ for creating fresh, novel, and engaging digital experiences, and _more accessible_ for the enterprise.

Each change primarily affects a different stakeholder --- marketing, development/IT, and the end-user, respectively.

The key challenge is that without a content mesh, integrating these systems together is a lot of work. Forrester titled one of their [report sections](https://www.tangomodem.com/wp-content/uploads/2017/09/the-rise-of-the-headless-cms.pdf): "Warning: Headless Content Management Is For Do-It-Yourself Shops." But _with_ a content mesh, all of these systems can be brought together in a unified, low-cost, low-defect whole.

In other words, the content mesh makes developers, content creators, and users _all_ happy.

## Intégrer les technologies modernes en déléguant le travail

As this series continues, we’ll explore the rise of this "content mesh" -- that allows enterprises to adopt these new technologies without needing to DIY themselves.

In Part 2, [The Unbundling of the CMS](/blog/2018-10-10-unbundling-of-the-cms), we’ll explore the rise of headless CMSs and best-of-breed website content and functionality systems.

In Part 3, [The Rise of Modern Web Development](/blog/2018-10-11-rise-of-modern-web-development), we’ll detail the maturing of the JavaScript ecosystem, the emergence of stable UI libraries like React for creating rich web technologies, and how they help website teams at scale build high-quality sites.

In Part 4, [Why Mobile Performance is Crucial](/blog/2018-10-16-why-mobile-performance-is-crucial), we’ll discuss the ROI of site speed, explore two modern, complementary trends for improving web performance and how website teams can get the best of both out of the box.

In our conclusion, [Creating Compelling Experiences](/blog/2018-10-18-creating-compelling-content-experiences), we’ll discuss a step-by-step approach for choosing a content architecture, modern development environment, a performance strategy -- and most importantly, choosing a "content mesh" that makes all the other choices easy. We’ll also explore how one clear option -- Gatsby -- emerges as the most feature-complete of any content mesh alternatives.

## Le paysage du développement web moderne

![](/v1562939172/jamstatic/content-mesh.png)