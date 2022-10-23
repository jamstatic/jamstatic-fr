---
title: C’est quoi un CMS headless ?
description: Un CMS headless s'occupe uniquement de vous aider à modéliser et à saisir vos contenus pour les fournir au terminal de votre choix.
author: frank
date: 2017-12-15T16:40:50+01:00
images:
 - https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/w_1200,c_fit,co_white,g_north_west,x_80,y_120,l_text:poppins_80_ultrabold_line_spacing_-30:C%E2%80%99est%20quoi%20un%20CMS%20headless%20%3F/jamstatic/twitter-card.png
categories:
  - cms
  - headless
---

Dans les architectures [Jamstack]({{< relref
"5-raisons-de-tester-la-jamstack/" >}}), chaque service est assuré par un
outil spécifique qui va se contenter de faire une chose et une seule, si
possible de son mieux. L'édition de contenus pourra par exemple être confiée à
un CMS _headless_ — qui contrairement à un CMS dynamique classique comme
WordPress ou Drupal ne sera pas chargé de la gestion des modèles, puisque c'est
le rôle du générateur de site statique, ni du rendu, puisque les pages HTML
générées seront ensuite directement servies depuis un CDN.

Si les architectures Jamstack sont très [performantes]({{< relref
"smashing-mag-va-dix-fois-plus-vite.md" >}}), il n'en reste pas moins que tous
les intervenants doivent pouvoir contribuer au produit quel que soit leur
profil. Une interface conviviale pour l’édition de contenus est donc un passage
souvent obligé si vous voulez vous assurer que tout le monde y trouve son
compte.

L'adoption d’un CMS headless ravira également les développeurs habitués à
consommer des APIs à longueur de journée et outre les bonnes vieilles APIs
RESTful on commence aussi à voir apparaître des
[APIs GraphQL](https://graphcms.com/). Tout le monde a donc à y gagner, les
personnes en charge de la modélisation de contenu auront à leur disposition
[des outils beaucoup plus souples](https://www.contentful.com/developers/docs/concepts/data-model/)
et ne sauront plus contraintes par des bases de données peu flexibles et
coûteuses en performance et en maintenance. Au final le CMS headless offre plus
de souplesse, de liberté, puisqu'il ne vous impose aucun choix de technologie,
sans compter que vous pouvez déléguer la maintenance serveur si vous optez pour
un service hébergé. Service tiers payant ou solution open source, c'est vous qui
voyez comme dirait l’autre.

Les architectures monolithiques ont leurs limites et si vous maintenez plusieurs
applications mobiles natives et différents services web, vous préférerez
sûrement avoir un point d’accès unique : votre API de contenus. De plus c'est
pratique pour que des services externes comme
[Algolia](https://www.algolia.com/) puissent au passage indexer votre contenu
([exemple avec Kentico](https://kenticocloud.com/blog/searching-content-kentico-cloud-algolia-integration)).
L'interaction entre services via des APIs, ce n'est pas nouveau et il n'est
guère étonnant de voir les services de gestion de contenu proposer de plus en
plus de connecteurs aux générateurs de site statique et inversement.
[Gatsby](/categories/gatsby) intègre ainsi nativement la notion même
[de source](https://www.gatsbyjs.org/docs/create-source-plugin/) afin de pouvoir
se connecter à n'importe quelle source de données externe.

Le rôle du CMS headless c'est de vous fournir une interface à la fois pour la
modélisation et la saisie des contenus mais aussi une interface de programmation
pour vous permettre de consommer ensuite ces contenus où vous voulez, comme bon
vous semble. C’est la seule chose dont va se préoccuper le CMS headless, le
reste est de votre ressort.

{{< figure src="https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523346944/jamstatic/headless-cms-schema.png" caption=""
attr="Aperçu d’une architecture de CMS découplée"
attrlink="https://www.storyblok.com/tp/headless-cms-explained" >}}

Si vous utilisez un générateur de site statique, le CMS headless est donc une
pièce supplémentaire que vous pourriez vouloir ajouter à votre architecture,
comme d’habitude cela dépend du projet.

[Distinguons les CMS headless]({{< relref "post/git-based-cms-vs-api-first-cms.md">}}) qui vous permettent de
modifier les fichiers de votre dépôt Git
([Forestry](https://forestry.io), [Siteleaf](https://siteleaf.com), [Netlify
CMS]({{< relref "configurer-netlify-cms-pour-jekyll.md" >}}), etc.) de ceux qui mettent vos contenus à disposition via une API
([Contentful](https://www.contentful.com/), [Prismic](https://prismic.io/),
[Directus](https://getdirectus.com/), [GraphCMS](https://graphcms.com/), etc.).

Chris Macrae détaille la différence entre les deux approches dans
[cette vidéo](https://www.youtube.com/watch?v=KX4G49ZrvY0).

Quoi qu'il en soit dans les deux cas, le CMS headless ne s'occupe que de la
partie cachée, le back, pas de la partie visible — la tête est coupée comme le
suggère le terme anglophone _headless_, d’ici à parler de révolution, il n'y a
qu'un pas. Tout se recoupe !

Si vous suivez de près ce qui se passe autour des architectures Jamstack, vous
n'aurez pas manqué de constater que des CMS headless il y en a de plus en plus,
et ce n'est pas prêt de s'arrêter vu la popularité croissante des architectures
découplées, et de tous ces termes à la mode comme "microservices" ou
"serverless" qui désignent des choses bien plus spécifiques.

L'équipe de rédaction de Smashing Magazine édite principalement un site web et l’utilisation de [Netlify CMS](https://www.netlifycms.org/) — dont la v1.0 vient de sortir — suffit à leur besoin. Même si les rédacteurs évoluent dans les métiers du Web, une interface de rédaction et un éditeur visuel sont toujours appréciables et évitent quelques manipulations techniques.

Passer au statique ne veut pas dire, devoir tout faire en ligne de commande, au
contraire, tout ce beau monde doit pouvoir interagir et ce de façon automatisée
et sûre.

Si jamais cela peut vous rassurer, Contentful, un des acteurs majeurs du marché
[vient de lever 28 millions de dollars](https://www.contentful.com/blog/2017/12/04/contentful-series-c/)
tout comme [Algolia](https://blog.algolia.com/redefining-incredible-search/) ou
[Netlify](https://www.netlify.com/blog/2017/08/09/netlify-raises-12m-from-a16z/)
avant eux, signe que ce type de solutions ont encore de beaux jours devant
elles. Les services de qualité qui proposent des APIs ont la cote.

> If software is eating the world, SaaS APIs are eating the development world.

Voilà maintenant vous savez ce qui se cache derrière cet énième anglicisme
barbare — un découpage fonctionnel des responsabilités des fonctions d’édition,
de stockage et d’export des données — et que vous serez un peu plus éclairé la
prochaine fois que vous devrez réfléchir à moderniser votre workflow de
publication.

Quelques articles en anglais pour approfondir le sujet :

- [Le guide ultime du CMS headless de Kentico (PDF, Epub)](https://kenticocloud.com/headless-cms-guide)
- [Les bénéfices d’un CMS headless (Forbes)](https://www.forbes.com/sites/forbestechcouncil/2017/11/22/the-benefits-of-a-headless-cms/#3447e5422d85)
- [C’est quoi un CMS headless ? (CSS Tricks)](https://css-tricks.com/what-is-a-headless-cms/)
- [CMS headless découplé (Contentful)](https://www.contentful.com/r/knowledgebase/headless-and-decoupled-cms/)
- [headless CMS en 5 minutes (StoryBlok)](https://www.storyblok.com/tp/headless-cms-explained)
- [Livre blanc sur l’API REST de WordPress (PDF)](https://humanmade.com/wordpress-rest-api-white-paper/)

Listes de CMS headless :

- <https://headlesscms.org/>
- [Tools: headless CMS (The New Dynamic)](https://www.thenewdynamic.org/tools/content-management/headless-cms/)
