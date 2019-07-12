---
title: Pour des sites web modernes, direction le maillage de contenus
date: 2019-07-11
lastmod: 2019-07-12T12:42:35.000+00:00
description: ''
author: Anthony Lopez
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

Teams are adopting these services because each is tailored to a specific use-case; the generic enterprise CMS alternative is often optimized for none.

![](/v1562938736/jamstatic/modular-cms-architecture.png)

## L'émergence du maillage de contenus

This is the first post in a series, Journey to the Content Mesh, intended to explain the emergence of a "content mesh" -- the infrastructure layer for a decoupled website. The content mesh stitches together content systems in a modern development environment while optimizing website delivery for performance.

The previous generation of enterprise CMS offered an often-generic content editing experience glued to out-of-date development and deployment environments. The emerging strategy for content management selects best-of-breed solutions, tailored to specific use-cases like e-commerce or blogging; it provides a modern framework for rapid iteration and it generates lightning fast websites out of the box.

The content mesh empowers developers while preserving content creators’ workflows. It gives you access to best-of-breed services _without_ the pain of manual integration.

## Trois domaines avec une innovation rapide

Change is being spurred by the confluence of three revolutions in how we create and consume content:

* _Content management._ Monolithic CMS applications are being replaced by modular, specialized content systems.
* _Development techniques._ Modern UI frameworks like React are becoming essential to rich user experiences.
* _Performance._ As mobile surpasses 50% of internet traffic, high-performance is becoming a must-have, not a nice-to-have.

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