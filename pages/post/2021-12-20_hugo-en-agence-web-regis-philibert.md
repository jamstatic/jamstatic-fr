---
published: false
title: "Hugo en agence web, avec Régis Philibert"
description: "Un entretien avec Régis Philibert, développeur web et expert du générateur de site statique Hugo."
date: 2021-12-20T14:18:34+01:00
author: podcast
categories:
  - podcast
  - hugo
---
:::intro
Dans cet entretien, [Régis Philibert](https://twitter.com/regisphilibert) revient sur son parcours, son adoption puis son travail avec Hugo en agence au quotidien, ses fonctionnalités préférées, les challenges qu'il a du relevé et ce qui rend ce
générateur si agréable à l'utilisation.

Si vous vous intéressez à [Hugo](/categories/hugo/), il y a de grandes chance que vous ayez déjà lu ici-même un des articles de Régis ayant pour but de vous faire progresser dans votre apprentissage.
:::

<!--
<iframe src="https://anchor.fm/jamstatic/embed/episodes/XXXX"  width="100%" frameborder="0" scrolling="no"></iframe>
-->

## Son parcours

![Rex, Regis: Hugo et Orbi](/images/regis-philibert.png "Régis Philibert"){width=250}

Régis est développeur web front-end depuis plus de 10 ans. Après avoir développé pas mal de sites web avec WordPress, Hugo est petit à petit devenu son outil de prédilection depuis quelques années pour développer des sites pré-rendus et servis depuis des CDNs.

Quand [Smashing Magazine est passé sous Hugo](page:post/smashing-mag-va-dix-fois-plus-vite), ça a été le déclic. Régis a rapidement été conquis par les fonctionnalités d'Hugo, comme [les ressources associées aux pages](https://regisphilibert.com/blog/2018/01/hugo-page-resources-and-how-to-use-them/), il a rapidement commencé à collaborer au projet, maintenu par [Bjørn Erik Pedersen](page:post/interview-hugo-lead-developer), et notamment à la documentation.

Lors de son apprentissage, Régis en a profité pour écrire à propos de concepts fondamentaux comme la [gestion du contexte](page:hugo-le-point-sur-le-contexte) ou une [introduction à la syntaxe du templating](page:post/de-wordpress-a-hugo-un-nouvel-etat-d-esprit), à connaître quand on veut maîtriser les bases. Le [forum de discussion d'Hugo](https://discourse.gohugo.io/) regorge d'informations et s'avère un complément indispensable à [la documentation de référence](https://gohugo.io/documentation/).

## Ses fonctionnalités préférées

La [gestion des assets native d'Hugo](page:post/hugo-asset-pipeline), qui permet de se passer d'outils comme Webpack, Parcel, Gulp ou Rollup pour compiler CSS, Sass ou transpiler du JavaScript moderne avec **zéro configuration**. Pour cela Hugo intègre des librairies Go comme [esbuild](https://esbuild.github.io/), ce qui permet de bénéficier d'une [rapidité de compilation inégalée](page:post/comparatif-performance-generateurs-de-site-statique).

[Les modules Hugo](page:post/tout-savoir-sur-les-modules-hugo), basés sur les modules Go,  procurent un système de dépendances, qui ne nécessite pas de publier des paquets sur un registre, et qui peut aller récupérer des fichiers directement depuis un dépôt Git. Couplé au système de fichiers unifiés d'Hugo et à ses conventions de nommage, vos sites peuvent partager autant de dépendances(themes, partiels, icônes, assets, contenus, etc.) que nécessaire.

On peut par exemple pointer Hugo vers un thème hébergé sur GitHub. Lors de la compilation Hugo va rapatrier, fusionner et mettre en cache le thème dans son système de fichiers unifiés. [L'agence The New Dynamic](https://www.thenewdynamic.com/) a développé de nombreux [modules open source pour Hugo](https://www.thenewdynamic.com/open-source/), dont [un module pour Imgix](https://www.thenewdynamic.com/article/hugo-module-imgix/) afin d'automatiser le traitement et l'optimisation d'images, si crucial pour un chargement de page performant.

Hugo est livré sous forme de fichier binaire et se doit donc d'intègrer beaucoup des fonctionnalités attendues nativement, comme la gestion des taxonomies, pour que vous n'ayez pas à réinventer la roue. Contrairement à des générateurs impératifs comme Eleventy, qui n'imposent rien par défaut et vous demandent d'implementer *votre* solution.

Depuis 2018, Régis a rejoint [The New Dynamic](https://www.thenewdynamic.com/), l'agence web fondée par Bud Parr basée à New-York, un membre très actif de la communauté Jamstack, via notamment la création dès 2013 d'un Slack que fréquente encore quelques-uns des développeurs les plus actifs. Bud est un précurseur du développement de site statiques à l'aide de générateurs pour ses clients et il a franchi le pas il y a déjà près de 10 ans. TND ne vend pas une technologie mais des résultats et une manière de collaborer sur le long terme.

Parmi ses projets, on retrouve beaucoup de sites de contenus, de sites vitrines, de landing pages, de documentation (comme celle d'Hugo dont il a développé le thème), voire des [sites de e-commerce avec SnipCart](page:post/un-site-ecommerce-statique-avec-hugo).

### Les défis relevés

Un des besoin récurrent est l'intégration d'une recherche, pour cela les formats de sortie d'Hugo permettent de générer des indexes au format JSON, ou des exports au format CSV. Pour les formulaires, on passera par un service tiers comme [FormSpree](https://formspree.io/) ou [Netlify Forms](https://www.netlify.com/products/forms/).

Les clients sont satisfaits, leurs sites sont rapides, stables et performants. Les mises en production se font rapidement, généralement en moins d'une minute, grâce à la mise en cache des fichiers générés sur le réseau de CDN de Netlify.

Afin de proposer de la composition de page aux éditeurs, il est possible de définir des blocs avec des variables, au travers de CMS comme [Forestry](https://www.forestry.io/docs/settings/fields/blocks/). Go HTML Templating offre des [fonctions](https://gohugo.io/functions/) dédiées la manipulation de structure de données de base (tableaux, listes, dictionnaires) qui vont permettre de développer des fonctionnalités plus avancées, comme le chargement à la demande du visiteur d'un type de contenu.

Il est aussi de possible de [générer du JSON](https://forestry.io/blog/build-a-json-api-with-hugo/) pour tous types de contenus, et par là même de proposer une API en lecture seule. Une fonctionnalité à faible coût mais qui ouvre pas mal de possibilités en terme de développement.

[Netlify permet de faire des redirections en fonction de la région ou du pays de l'utilisateur](https://www.netlify.com/blog/2020/10/30/easy-localization-with-netlify-redirects-and-rewrites/), il est donc possible d'afficher certains contenus pour la France, et d'autres pour le Canada, pratique quand vous développez des sites internationaux. Hugo sait parfaitement [gérer des contenus dans plusieurs langues](page:post/contenu-multilingue-avec-hugo).

Hugo gagne en fonctionnalités au gré des versions sans faire aucune concession sur la performance, grâce à des tests automatisés et à l'excellent travail du développeur principal. Les performances sont encore plus impressionnantes sur les processeurs récents tel que l'Apple Sillicon, qui devrait être supporté dans la prochaine version de [Go 1.16](https://tip.golang.org/doc/go1.16) actuellement encore en bêta.

Au final, Hugo demande bien moins de maintenance et ne nécessite pas forcément d'être mis à jour, sauf si on souhaite refactoriser certaines parties pour bénéficier des dernières fonctionnalités comme la transpilation JavaScript par exemple.

Il est toujours possible de développer avec Vue ou React, pour certaines pages dynamiques comme la recherche, dans ce cas on peut toujours avoir recours à l'écosystème de Node.js 😨

### Les limites actuelles ?

Aujourd'hui Hugo ne fonctionne qu'avec des fichiers locaux, et ne peut pas tirer parti de données tierces fournies par des APIs. Hugo ne sait pas encore générer des pages sans passer par des fonctions serverless, mais cela fait partie des choses qu'on devrait voir arriver un de ces jours 🤞.

## Apprendre Hugo

La documentation officielle est une documentation de référence, mais ne comporte pas de tutoriels ou d'HOW-TOs sur des fonctionnalités avancées qui permettraient une adoption plus rapide. Il ne tient qu'à la communauté de contribuer, tout ne peut pas venir pas de la core team.

Hugo comme Eleventy, sont d'excellents points d'entrée pour apprendre le développement front-end, car il n'y a besoin de rien d'autre, de plus Hugo fonctionne parfaitement en mode hors-ligne.

## Liens

- [Le site de Régis Philibert](https://regisphilibert.com/)
- [L'agence The New Dynamic](https://www.thenewdynamic.com/)
- [Le site communautaire The New Dynamic](https://www.tnd.dev/)

### Dans l'actu

- [Le chapitre Jamstack du Web Alamanac 2020 de HTTP Archive](https://almanac.httparchive.org/en/2020/jamstack)
- [AWS Amplify Admin UI](https://aws.amazon.com/fr/blogs/aws/aws-amplify-admin-ui-helps-you-develop-app-backends-no-cloud-experience-required/)
- [Le blog statique: minimalisme et simplicité par Aline Théou sur 24 jours de Web](https://www.24joursdeweb.fr/2020/blog-statique-minimalisme-et-simplicite/)
