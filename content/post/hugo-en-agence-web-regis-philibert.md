---
title: "Hugo en agence web, avec Régis Philibert"
date: 2021-12-20T14:18:34+01:00
lastmod: 2021-01-23T14:18:34+01:00
draft: true
description: "Un entretien avec Régis Philibert, développeur web et expert du générateur de site statique Hugo."
author: frank

categories:
  - podcast
  - hugo
images:
  - https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/w_1100,c_fit,co_white,g_north_west,x_80,y_120,l_text:poppins_80_ultrabold_line_spacing_-30:Des%20nouvelles%20d'Hugo%20avec%20R%C3%A9gis%20Philibert/jamstatic/twitter-card.png
---

Dans cet entretien, Régis revient sur son parcours, son adoption puis son travail avec Hugo en agence, ses fonctionnalités préférées, les challenges qu'il a du relevé et ce qui rend ce
générateur si agréable à l'utilisation.

Si vous vous intéressez à [Hugo](/categories/hugo/), il y a de grandes chance que vous ayez déjà lu ici même un des articles de Régis Philibert ayant pour but de vous faire progresser dans votre apprentissage.

<!-- {{< player number=2 >}}

<div>

{{< podcast/apple url="https://podcasts.apple.com/fr/podcast/" >}}&nbsp;
{{< podcast/google url="https://podcasts.google.com/feed/" >}}&nbsp;
{{< podcast/spotify url="https://open.spotify.com/episode/" >}}

</div> -->

## Son parcours

Régis est développeur web front-end depuis plus de 10 ans. Après avoir développé pas mal de sites web avec WordPress, Hugo est devenu son outil de prédilection depuis quelques années pour servir des sites statiques.

Quand [Smashing Magazine est passé sour Hugo]({{< relref "smashing-mag-va-dix-fois-plus-vite.md" >}}), ça a été le déclic. Régis a rapidement été conquis par les fonctionnalités d'Hugo, comme [les ressources associées aux pages](https://regisphilibert.com/blog/2018/01/hugo-page-resources-and-how-to-use-them/) a rapidement commencé à collaborer au projet, maintenu par [Bjørn Erik Pedersen]({{< relref "interview-hugo-lead-developer" >}}), et notamment à la documentation.

Lors de son apprentissage, Régis en a profité pour écrire à propos de concepts fondamentaux comme la [gestion du contexte]({{< relref "hugo-le-point-sur-le-contexte" >}}) ou une [introduction à la syntaxe du templating]({{< relref "de-wordpress-a-hugo-un-nouvel-etat-d-esprit" >}}), à connaître quand on veut maîtriser les bases. Le [forum de discussion d'Hugo](https://discourse.gohugo.io/) regorge d'informations et s'avère un complément indispensable à [la documentation de référence](https://gohugo.io/documentation/).

## Ses fonctionnalités préférées

La [gestion des assets native d'Hugo]({{< relref "hugo-asset-pipeline.md" >}}), qui permet de se passer d'outils comme Webpack, Parcel, Gulp ou Rollup pour compiler CSS, Sass ou transpiler du JavaScript moderne avec zéro configuration. Pour cela Hugo intègre des librairies Go comme [esbuild](https://esbuild.github.io/), ce qui permet de bénéficier d'une rapide inégalée.

La deuxième fonctionnalité ce sont [les modules Hugo]({{< relref "tout-savoir-sur-les-modules-hugo" >}}), basés sur les modules Go, qui procurent un système de dépendances, qui ne nécessite pas de publier des paquets sur un registre, et qui peut aller récupérer des fichiers directement depuis un dépôt Git.

On peut par exemple pointer Hugo vers un thème Hugo hébergé sur GitHub et Hugo va rapatrier et et fusionner le tout dans un système de fichier unifié. Les possibilités avec les modules sont infinies, [l'agence The New Dynamic](https://www.thenewdynamic.com/) a par exemple développé de nombreux [modules open source pour Hugo](https://www.thenewdynamic.com/open-source/), comme [le module pour Imgix](https://www.thenewdynamic.com/article/hugo-module-imgix/) afin d'automatiser le traitement et l'optimisation d'images, etc.

Hugo est livré sous forme de fichier binaire et intègre beaucoup de fonctionnalités nativement pour que vous n'ayez rien à coder. Contrairement à des générateurs impératifs comme Eleventy, qui par défaut ne propose rien. Par exemple Hugo intègre une gestion des taxonomies, alors qu'avec Eleventy, il est de la responsabilité du développeur d'implémenter cette gestion.

Depuis 2018, Régis a rejoint l'agence de Bud Parr, un membre très actif de la communauté via The New Dynamic, dans laquelle on retrouve quelques uns des acteurs de la Jamstack, et qui développe des sites statiques professionnellement depuis près de 10 ans.

Parmi les projets, on retrouve beaucoup de sites de contenus, de sites vitrines, de landing pages, de documentation (comme celle d'Hugo), voire des [sites de e-commerce avec SnipCart]({{< relref "un-site-ecommerce-statique-avec-hugo" >}}).

PROBLEME de SON Régis (ECHO)

### Les défis relevés

Un besoin récurrent est d'intégrer une recherche, et pour cela les formats de sortie d'Hugo permettent de générer facilement des indexes au format JSON, ou des exports au format CSV. Pour les formulaires, on doit passer par un service tiers comme [FormSpree](https://formspree.io/) ou [Netlify Forms](https://www.netlify.com/products/forms/).

Les clients sont satisfaits, leurs sites sont rapides, stables et performants. Les mises en production se font rapidement, généralement en moins d'une minute, grâce à la mise en cache des fichiers générés sur le réseau de CDN de Netlify.

Afin de proposer de la composition de page, il est possible de définir des blocs avec des variables, au travers de CMS comme Forestry. Go HTML Templating permet la manipulation de structure de données (tableaux, listes, dictionnaires).

Il est aussi de possible de générer du JSON pour tous les types de contenus, et donc de proposer une API en lecture seule.

Netlify permet de faire des redirections en fonction de la région ou du pays de l'utilisateur, il est donc possible d'afficher certains contenus pour la France, et d'autres pour le Canada, pratique quand vous développer des sites internationaux. Hugo sait parfaitement [gérer des contenus dans plusieurs langues]({{< relref "contenu-multilingue-avec-hugo" >}}).

Hugo gagne en fonctionnalités sans faire aucune concession sur la performance, grâce à des tests automatisés et à l'excellent travail du développeur principal qui est très expérimentés. Les performances sont encore meilleures bien entendues sur processeurs récents comme les Apple M1.

Au final, Hugo demande bien moins de maintenance et ne nécessite pas d'être mis à jour, sauf si on souhaite refactoriser certaines parties pour

### Les limites ?

Aujourd'hui Hugo ne fonctionne qu'avec des fichiers locaux, et ne peut pas tirer parti de données tierces fournies par des APIs. Hugo ne sait pas encore générer des pages et il faut encore passer des fonctions serverless, mais cela fait partie des choses qu'on devrait voir arriver un de ces jours.

Il est toujours possible de développeur avec Vue ou React, certaines pages dynamiques comme la recherche, dans ce cas il faudra avoir recours à l'écosystème de Node.js.

## Apprendre Hugo

La documentation officielle est une documentation de référence, mais ne comporte pas de tutoriels ou d'HOWTOs sur des fonctionnalités avancées qui permettraient une adoption plus rapide. Il ne tient qu'à la communauté.

Hugo comme Eleventy, sont d'excellents points d'entrée pour apprendre le développement front-end, car il n'y a aucun surcharge, et il marche très bien en ligne de commande en hors-ligne.

## Liens

- Le blog de Régis Philibert
- Le blog de l'agence The New Dynamic
- Le site communautaire The New Dynamic

### Actualités

- [Le chapitre Jamstack du Web Alamanac 2020 de HTTP Archive](https://almanac.httparchive.org/en/2020/jamstack)
- [AWS Amplify Admin UI](https://aws.amazon.com/fr/blogs/aws/aws-amplify-admin-ui-helps-you-develop-app-backends-no-cloud-experience-required/) ([Démo en vidéo](https://www.youtube.com/watch?v=p33Q9cT_dNQ))
- [Le blog statique: minimalisme et simplicité par Aline Théou sur 24 jours de Web](https://www.24joursdeweb.fr/2020/blog-statique-minimalisme-et-simplicite/)
