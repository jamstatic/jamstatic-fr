---
title: "C'est quoi un CMS Headless ?"
date: 2017-12-15T16:40:50+01:00
description: "Le rôle d'un CMS headless est de confier le stockage et l'édition des contenus à un service dédiée."
categories:
  - cms
images:
  - /assets/images/2017/12/headless-cms-logos.png
---

Dans les architectures JAMstack, chaque service est assuré par un outil spécifique qui va se contenter de faire une chose et une seule, si possible de son mieux. L'édition de contenus pourra par exemple être confiée à un CMS _headless_ - qui contrairement à un CMS dynamique classique comme WordPress ou Drupal ne sera pas chargé de la gestion des modèles — ça c'est le rôle du générateur de site statique — ni du rendu puisque les pages HTML générées seront ensuite directement servies depuis un CDN.

Si les architectures JAMstack sont très [performantes](/2017/03/17/smashing-mag-va-dix-fois-plus-vite/), il n'en reste pas moins que tous les intervenants doivent pouvoir contribuer au produit quel que soit leur profil. Une interface conviviale pour l'édition de contenus est donc un passage obligé si vous voulez vous assurer que tout le monde y trouve son compte.

L'adoption d'un CMS headless ravira également les développeurs habitués à consommer des APIs à longueur de journée et outre les bonnes vieilles APIs RESTful on commence aussi à voir apparaître des [APIs GraphQL](https://graphcms.com/). Tout le monde a donc à y gagner, les personnes en charge de la modélisation de contenu auront à leur disposition [des outils beaucoup plus souples](https://www.contentful.com/developers/docs/concepts/data-model/) et ne sauront plus contraints par des bases de données peu flexibles et coûteuses à maintenir. Au final c'est un choix qui offre plus de souplesse, de liberté, sans compter que vous pouvez déléguer la maintenance serveur si vous optez pour un service hébergé. Service tiers payant ou open source hébergé, c'est vous qui voyez.

Les architectures monolithiques ont leurs limites et si vous maintenez des applications mobiles, des sites web, vous aimeriez sûrement avoir un point d'accès unique : votre API de contenus. C'est aussi pratique pour que des services externes comme [Algolia](https://www.algolia.com/) puissent indexer votre contenu ([Exemple avec Kentico](https://kenticocloud.com/blog/searching-content-kentico-cloud-algolia-integration)).

Le rôle du CMS headless c'est donc de vous fournir une interface à la fois pour la modélisation et la saisie des contenus mais aussi une interface de programmation pour vous permettre de consommer ensuite ces contenus où vous voulez, comme bon vous semble. C'est la seule chose dont va se préoccuper le CMS headless, le reste est de votre ressort.

{{< figure src="/assets/images/2017/12/headless-cms-schema.png" caption="" attr="Aperçu d'une architecture de CMS découplée" attrlink="https://www.storyblok.com/tp/headless-cms-explained" >}}

Si vous utilisez un générateur de site statique, le CMS headless est donc une pièce que vous pourriez vouloir ajouter à votre architecture.

Attention donc à bien distinguer les CMS headless qui vous permettront de modifier les fichiers déjà présents dans votre dépôt Git (Forestry, Siteleaf, Netlify CMS, etc.) de ceux qui mettrons vos contenus à disposition via une API ([Contentful](https://www.contentful.com/), [Prismic](https://prismic.io/), [Directus](https://getdirectus.com/), [GraphCMS](https://graphcms.com/), etc.). Chris Macrae de chez Foresry détaille bien la différence entre les deux approches dans [cette vidéo](https://www.youtube.com/watch?v=KX4G49ZrvY0).

Dans les deux cas, le CMS headless ne s'occupe que du back, pas de la partie visible (la tête est donc coupée comme le suggère le terme anglophone _headless_ - d'ici à parler de révolution, il n'y a qu'un pas ! 😃).

Si vous suivez de prêt ce qui se passe autour des architecures JAMstack, vous n'aurez pas manquer de constater que des CMS headless il y en a de plus en plus, et ce n'est pas prêt de s'arrêter vu la popularité croissante des architectures découplées, et tous ces termes à la mode comme "microservices" ou "serverless" - qui désignent encore autre chose de bien plus précis.

L'équipe de rédaction de Smashing Magazine édite uniquement un site web et l'utlisation de [Netlify CMS](https://www.netlifycms.org/) - dont la v1.0 vient de sortir - semble correspondre à leur besoin.

Si jamais ça peut vous rassurer, Contentful, un des acteurs majeurs du marché [vient de lever 28 millions de dollars](https://www.contentful.com/blog/2017/12/04/contentful-series-c/), signe que ces projets ont encore de beaux jours devant eux.

En attendant nous espérons avoir contribué à mieux vous expliquer ce qui se cache derrière cet énième anglicisme - un découpage fonctionnel des responsabilités des fonctions d'édition et de stockage des données - et que vous serez un peu plus éclairé la prochaine fois que vous devrez réfléchir à moderniser votre workflow de publication.

Voici quelques articles plus détaillé en anglais sur le sujet :

* [Les bénéfices d'un CMS headless (Forbes)](https://www.forbes.com/sites/forbestechcouncil/2017/11/22/the-benefits-of-a-headless-cms/#3447e5422d85)
* [C'est quoi un CMS headless ? (CSS Tricks)](https://css-tricks.com/what-is-a-headless-cms/)
* [CMS headless découplé (Contentful)](https://www.contentful.com/r/knowledgebase/headless-and-decoupled-cms/)
* [Headless CMS en 5 minutes (StoryBlok)](https://www.storyblok.com/tp/headless-cms-explained)

Listes de CMS headless :

* [https://headlesscms.org/](https://headlesscms.org/)
* [Tools: Headless CMS (The New Dynamic)](https://www.thenewdynamic.org/tools/content-management/headless-cms/)

*[CDN]: Content Delivery Network
