---
title: "Vers une Jamstack légère et performante, avec Nicolas Goutay"
description: "Passer de Gatsby à Eleventy afin de pouvoir concevoir un site web plus performant et accessible à tous."
author: frank
excerpt: |
  Dans ce premier épisode de *Génération Statique* Frank Taillandier et Arnaud Ligny reçoivent Nicolas Goutay, expert performance web, actuellement développeur chez [Orbit](https://orbit.love), conférencier et organisateur des [meetups Jamstack parisiens](https://jamstack.paris). Fort d’une expérience avec React et Gatsby, le coût des frameworks JavaScript côté client a poussé Nicolas à privilégier des outils plus légers et plus adaptés aux sites de contenus.
date: 2020-11-19
images:
  - https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/w_1200,c_fit,co_white,g_north_west,x_80,y_80,l_text:poppins_80_ultrabold_line_spacing_-30:Vers%20une%20Jamstack%20l%C3%A9g%C3%A8re%20et%20performante%252C%20avec%20Nicolas%20Goutay/jamstatic/twitter-card.png
categories:
  - podcast
  - gatsby
  - eleventy
  - nextjs
podcast:
  url: https://anchor.fm/jamstatic/episodes/Vers-une-Jamstack-lgre-et-performante--avec-Nicolas-Goutay-emunhp
---

{{< intro >}}
Dans ce premier épisode de *Génération Statique* Frank Taillandier et Arnaud Ligny reçoivent Nicolas Goutay, expert performance web, actuellement développeur chez [Orbit](https://orbit.love), conférencier et organisateur des [meetups Jamstack parisiens](https://jamstack.paris). Fort d’une expérience avec React et Gatsby, le coût des frameworks JavaScript côté client a poussé Nicolas à privilégier des outils plus légers et plus adaptés aux sites de contenus.
{{</ intro >}}

{{< player number=1 >}}

<div class="flex space-x-2">
<div>
{{< podcast/apple url="https://podcasts.apple.com/fr/podcast/g%C3%A9n%C3%A9ration-statique/id1539806294#episodeGuid=2bb8821a-9aef-4136-a76d-4fad59dbbde6" >}}</div>
<div>{{< podcast/google url="https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy8zOWY0ZmEwNC9wb2RjYXN0L3Jzcw?sa=X&ved=0CAMQ4aUDahcKEwi43MqAkZ7tAhUAAAAAHQAAAAAQBA" >}}</div>
<div>{{< podcast/spotify url="https://open.spotify.com/episode/53HWoHsBUCjWGUcuGZH1R1?si=zNwGktbKRPyMtOk95JhIig" >}}</div>
</div>

## Introduction

[Jamstatic](https://jamstatic.fr) a été lancé avec la volonté de partager autour de la génération de sites statiques, nous suivons avec attention cet écosystème depuis près de 2015.

Près de 80 articles ont été publiés depuis sur le site web, plusieurs meetups ont eu lieu notamment sur Paris. Au vu des nombreuses discussions sur le [Slack](https://jamstatic.fr/slack/), nous avons décidé de nous essayer au format [podcast](https://anchor.fm/jamstatic/), afin de partager toujours plus sur le développement de sites web modernes et performants.

## Bataille d'égo de CEO

[La dernière Jamstack Conf](https://jamstackconf.com/2020/october/) a eu lieu en ligne, on en retiendra surtout la joute verbale entre Matt Biilmann le CEO de [Netlify](https://www.netlify.com/), à l’origine de l’appellation Jamstack, et Matt Mullenweg, le CEO d’[Automattic](https://automattic.com/) venu défendre WordPress. Richard McManus de The New Stack [revient sur cet échange](https://thenewstack.io/jamstack-vs-wordpress-round-2-the-two-matts-debate/) qui ne manquait pas de piquant. Pour se démarquer et faire augmenter l'adoption de leur plate-forme pour le déploiement de sites Jamstack, la stratégie de Netlify est d’attaquer les faiblesses bien connues de WordPress, notamment en matière de maintenance et de sécurité, mais c’était sans compter sur le répondant de Matt Mullenweg qui a très bien défendu l’approche intégrée de WordPress.com, qui répond justement à cette problématique, tout en gardant un CMS open source.

## L'API de WordPress pour le blog de Gatsby

Gatsby, un des deux frameworks React majeurs qui permet de générer des applications web, a d’ailleurs [annoncé avoir finalement opté pour WordPress en mode headless pour son blog](https://www.gatsbyjs.com/blog/gatsby-blog-wordpress). Ils permettent ainsi à plus de 130 contributeurs de rester dans leur zone de confort, tout en contournant les tarifs de CMS leaders sur le marché comme Contentful, qui dans sa formule actuelle à $489 dollars n’intègre que 25 utilisateurs. Une stratégie moins frontale et plus intelligente de Gatsby qui par la même occasion montre qu’on peut très bien avoir un site React en front tout en gardant son WordPress en back et en requétant les données en GraphQL.

## Les annonces de la première Next.js conf

L’autre framework React qui a le vent en poupe c’est [Next.js](https://nextjs.org/). La première [conférence](https://nextjs.org/conf/schedule) du framework hybride qui permet de faire du statique _et_ du SSR a eu lieu fin octobre.

Beaucoup d’annonces de la part de Vercel, notamment la mise à disposition d’un outil de monitoring de métriques de performance (les [Core Web Vitals](https://web.dev/vitals/#core-web-vitals)) mesurées depuis leur CDN auprès des utilisateurs, sans avoir à ajouter la moindre ligne de JS à son site.

Ces [métriques](https://web.dev/metrics/) poussées par Google permettent de démontrer la performance de sites développés avec Next.js et déployés sur les CDN de Vercel. Ils ont d’ailleurs aussi à l’occasion sorti un premier exemple de site e-commerce et annonce bientôt supporter de s'interfacer avec l'API de Shopify. Quand on connaît l’importance de la performance sur les taux de conversions en e-commerce, on se dit que la bataille va faire rage dans ce secteur. On notera que la plate-forme de déploiement Gatsby Cloud permet aussi de mesurer son score Lighthouse standard, des indicateurs "un peu fourre-tout", selon Nicolas.

{{< figure src="https://res.cloudinary.com/jamstatic/image/upload/c_scale,f_auto,q_auto,w_1600/v1605969846/jamstatic/vercel-analytics.png" caption="Le tableau de bord des métriques de performance utilisateur de Vercel affiche un score d'expérience réelle, ici pour les 3/4 des utilisateurs de téléphone mobile sur un site généré avec Next.js." >}}

Également développé en partenariat avec les équipes de Google, Next.js dispose maintenant d’un [composant Image](https://vercel.com/docs/next.js/image-optimization) qui va grandement aider les développeurs dans la gestion des images responsive pour les servir dans des formats optimisés sur leurs CDN. Gatsby dispose déjà d’un composant image qui retaille les images au build et les charge automatiquement au scroll. On voit que la concurrence est rude entre les deux frameworks et que c’est la performance ressentie côté utilisateur qui est moteur dans ces innovations. C’est une très bonne chose pour le web et pour faciliter le travail les développeurs qui ont maintenant à leur disposition des abstractions dont le but est d’éviter de servir des images non optimisées.

Devant la popularité croissante de Next.js, Netlify n’a d’autre choix pour retenir les développeurs que de devoir [supporter le SSR et le mode preview via des fonctions lambda](https://www.netlify.com/blog/2020/10/27/preview-mode-for-next.js-now-fully-supported-on-netlify/). Ils offrent désormais quelques cours en ligne dont un pour [apprendre les bases de Next.js](https://explorers.netlify.com/learn/nextjs). Le framework semble au centre de toutes les attentions en ce moment. L'enjeu n'est pas négligeable pour Netlify, puisque Vercel est un concurrent direct. Nous parlerons plus en détail du déploiement et de l'hébergement de sites statiques dans le prochain épisode.

## Gatsby simplifie la génération de pages

Gatsby de son côté n'est pas en reste et continue de progresser, le framework vient d'annoncer [une nouvelle API de routing basée sur le système de fichiers](https://www.gatsbyjs.com/blog/fs-route-api)…à la Next.js ou Nuxt.js. Votre fichier `/about.js` sera servi en tant que `/about/`. Nicolas précise que Gatsby demande un peu plus d'investissement initial mais que le résultat final sera similaire.

## Nuxt.js de plus en plus statique

Nuxt.js, est désormais capable de [générer un site entièrement statique](https://nuxtjs.org/blog/nuxt-static-improvements) et permet de requêter le système de fichiers grâce à [son API de contenu](https://content.nuxtjs.org/) très simple d’utilisation, avec rechargement à chaud, insertion de composants Vue dans le Markdown, un queryBuilder, une recherche textuelle, et bien plus…

Le projet initié par les deux frères Chopin, Alexandre et Sébastien, a annoncé sa première levée de fonds et propulse maintenant des sites majeurs comme lequipe.fr. On se réjouit de la progresssion du framework Vue.js.

Stocker ses contenus sous forme de fichiers Markdown, JSON, YAML, est très courant et c’est une bonne chose que tous les framework JS continuent de faciliter le travail à ce niveau-là. Frank rappelle que des CMS basés sur Git comme [Forestry](https://forestry.io/) interagissent avec votre dépôt et proposent une interface de rédaction épurée ainsi que la possibilité de modéliser ses contenus, via du front matter ou des fichiers de données. Une flexibilité vraiment appréciable, et accessible au plus grand nombre.

Des frameworks bien pratiques, de plus en plus versatiles, capables de travailler avec des fichiers locaux comme avec des API distantes. Ces frameworks JavaScript facilitent le développement par composition, ce paradgime explique en partie leur adoption de plus en plus massive.

## Hugo de mieux en mieux outillé pour le JavaScript

Enfin Hugo, [le générateur de loin le plus rapide]({{< relref "comparatif-performance-generateurs-de-site-statique" >}} ) pour transformer ses fichiers source en site web, [continue d'intégrer](https://gohugo.io/news/0.78.0-relnotes/) des outils issus de l'écosystème [JavaScript](https://gohugo.io/hugo-pipes/js/), après la transpilation via [Babel](https://gohugo.io/hugo-pipes/babel/), la gestion de dépendances [npm](https://gohugo.io/news/0.75.0-relnotes/), on peut aussi maintenant empaqueter son JavaScript à la vitesse de la lumière avec [esbuld](https://esbuild.github.io). Les développeurs peuvent découper leurs projets en modules réutilisables et bénéficier d'un _bundler_ lui aussi bien plus rapide que webpack ou parcel.

## Tailwind 2.0

[La version 2.0 de Tailwind CSS est sortie](https://blog.tailwindcss.com/tailwindcss-v2).[Le site fait peau neuve](https://tailwindcss.com) pour l'occasion, il est développé avec Next.js, déployé sur Vercel avec une recherche propulsée par Algolia.

## Eleventy en route vers le million de téléchargements

De son côté, mine de rien [Eleventy le générateur volontairement simple]({{< relref "eleventy-generateur-statique-simple" >}}) de Zach Leatherman se rapproche doucement du million de téléchargements npm, l’engouement est réel chez les développeurs front adeptes des choses bien faites, et souhaitant garder un contrôle total sur le JavaScript livré. C'est d'ailleurs ce qui a plu à Nicolas Goutay, qui détaille [l'approche plus légére privilégiée pour développer le nouveau site d'Orbit](https://orbit.love/blog/towards-a-lightweight-jamstack), avec Eleventy, Tailwind CSS et Alpine.js.

## Comment ne pas faire subir le coût des frameworks à ses visiteurs ?

Dans son article sur https://orbit.love/blog/towards-a-lightweight-jamstack (prochainement disponible en français), Nicolas rappelle que l'expérience de développement proposée par les frameworks JavaScript se fait au détriment de la performance expérimentée par vos visiteurs.

Nicolas a longtemps utilisé React pour beaucoup de projets en agence. Très attentif à la performance finale ressentie par les visiteurs, Nicolas sait que cela demande d'implémenter beaucoup de bonnes pratiques: la gestion des images, l'implémentation de Service Workers, le rendu côté serveur. "Encore faut-il en avoir le temps, l'expertise et la connaissance" précise Nicolas. Gatsby s'est positionné comme un framework React qui peut se connecter à n'importe quelle source de données via son API GraphQL et qui implémente les bonnes pratiques de webperf par défaut, générant une Progressive Web App en sortie.

Gatsby peut aussi précharger les pages dès qu'un visiteur s'apprête à cliquer sur un lien, ce qui va donner une impression d'instantanéité du chargement de la page. C'est ce parti-pris sur la performance qui a plu à Nicolas, qui fait que le développeur est incité à servir un site optimisé.

Nicolas rappelle néanmoins que la taille du JavaScript livré sur le site a un impact énorme sur l'expérience utilisateur (et de plus en plus sur le SEO). Même 30 kilobits de JavaScript vont impacter le temps que met un site à être interactif. Cela peut se mesurer en terme de “clics rageux” (_rage clicks_) où les utilisateurs croient pouvoir interagir avec la page qui semble chargée, alors que le navigateur est toujours en train d'interpréter le code JavaScript embarqué.

Tout le monde ne dispose pas du dernier modèle de téléphone ultra-puissant et un site comme celui du Washington Post peut mettre près de 40 secondes à s'afficher sur un téléphone d'entrée de gamme.

<div class="w-1/2 mx-auto">
{{< tweet 1322556145626718208 >}}
</div>

On surveillera le [First Input Delay](https://web.dev/fid/) dans ses métriques, même si comme le dit Nicolas "cela reste une approximation synthétique et imparfaite". Idéalement testez sur autre chose que le dernier iPhone avec une connexion 4G qui dépote.

Tout le monde ne maintient pas une application comme Facebook, Airbnb, ou Twitter. Si pour les applications, l'utilisation de frameworks ne fait plus débat, elle demande donc de peser le pour et le contre quand il s'agit de développer des sites de contenu avec peu d'interactivité côté client.

Malgré son appétence pour React, Nicolas a décidé de s'affranchir de ce coût non négligeable pour les utilisateurs finaux et s'est intéressé à Eleventy, pour se recentrer sur le contenu, l'accessibilité et la performance.

Les langages de templating proposés par les générateurs sont néanmoins moins versatiles que React ou Vue. On utilisera des fichiers partiels pour tendre vers un développement par composition, mais c'est une expérience de développement différente.

Le changement de philosophie peut se résumer à qui pilote, en React c'est le JavaScript, avec Alpine.js ce sont les fichiers HTML, dans lequel on ajoute des attributs qui permettent de piloter l'interactivité.

[Le code du site d'Orbit est open source](https://github.com/orbit-love/orbit-web), vous pouvez donc aller voir comment Nicolas a utilisé [Alpine](https://github.com/alpinejs/alpine) pour ajouter de l'interactivité à certaines parties de l'interface comme la navigation, l'inscription à la newsletter ou les extraits de code.

> L'approche est très rafraichissante, elle permet de se recentrer sur une des primitives du web, le HTML, et de pouvoir soigner la qualité du code servi à l'utilisateur — Nicolas Goutay

Mozilla adopte [cette approche légère](https://hacks.mozilla.org/2020/10/to-eleventy-and-beyond/) sur https://extensionworkshop.com/.

On notera que certains sites Eleventy utilisent les Web Components et que GitHub a développé [un framework pour embarquer des Web Components dans les applications Ruby on Rails](https://github.com/github/view_component). Là encore, il faudrait dédier une émission complète sur ce sujet. C'est quelque chose à surveiller de près.

Il est possible d'utiliser Vue avec Eleventy, c'est d'ailleurs [ce qu'a fait Zach Leatherman sur netlify.com](https://www.netlify.com/blog/2020/09/18/eleventy-and-vue-a-match-made-to-power-netlify.com/).

Le statique moderne est toujours en plein évolution, beaucoup d'outils dans le seul but de produire des sites à la fois modernes, accessibles et performants.

La discussion continue sur [Slack](/slack) et [Twitter](https://twitter.com/jamstatic_fr)…

## Intervenants

- [Frank Taillandier](https://frank.taillandier.me), Customer Success Manager chez [Forestry.io](https://forestry.io), initiateur de la communauté [jamstatic.fr](https://jamstatic.fr)
- [Arnaud Ligny](https://arnaudligny.fr), consultant technique web & e-commerce, créateur du générateur de site statique [Cecil](https://cecil.app)
- [Nicolas Goutay](https://twitter.com/phacks), développeur web chez [Orbit](https://orbit.love/), organisateur des meetups [Jamstack Paris](https://jamstack.paris/), et de la conférence francophone [We Love Speed](https://www.welovespeed.com/2020/)
