---
date: 2017-03-17T13:44:01Z
description: Smashing fait désormais partie de la renaissance du web moderne. Sachant
  que leur site pouvait aller six fois plus vite en tirant parti d'un CDN global,
  Smashing a opté pour la JAMstack et s'est adjoint les services de Netlify pour les
  aider à migrer.
image: assets/images/caching-issues.jpg
title: Smashing Magazine est maintenant 10 fois plus rapide
url: /2017/03/17/smashing-mag-va-dix-fois-plus-vite/
---

La refonte de Smashing Magazine à l'aide d'un générateur de site statique et d'APIs tierces comme Algolia constitue un petit évènement pour le développement Web moderne. Smashing est en effet un des sites les plus consultés et le fait de faire évoluer leur stack technique, de se reposer sur des outils actuels montre à quel point cet écosystème est mature et robuste. C'est la société Netlify, basée à San Francisco et spécialisée dans l'hébergement de sites statiques, qui a accompagné Smashing dans cette aventure. En traduisant [l'article paru sur leur blog](https://www.netlify.com/blog/2017/03/16/smashing-magazine-just-got-10x-faster/), nous continuons à promouvoir ces solutions dans l'espoir que cela vous incite à adopter à votre tour ce type d'architectures dans certains de vos projets.
{: .intro }

## Écouter l'épopée de Smashing Magazine

{% include video.html url="https://www.youtube.com/embed/rB4Cl5LSe2c?cc_load_policy=1" width="560" height="315" %}

Smashing Magazine a toujours été une plateforme de confiance pour les développeurs. C'est un endroit où on peut trouver les meilleures pratiques liées au développement Web. Cela fait longtemps que nous leur faisons confiance, depuis que Matt Biilmann, co-fondateur et CEO de Netlify, a commencé à utiliser Smashing Magazine pour apprendre à programmer par lui-même il y a quelques années de cela.

En novembre 2015, Matt a écrit ["Pourquoi les générateurs de site web statique sont le prochain gros truc"](https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/), qui est devenu un des articles les plus lus sur Smashing Magazine. Dans cet article, Netlify a mené des expériences intéressantes. Nous avons effectué une comparaison pour voir à quel point Smashing Magazine serait plus rapide s'il était hébergé sur Netlify, qui tire partie de la rapidité d'un CDN global… les premiers tests ont montré que ça allait **6 fois plus vite** !

En avril 2016, Matt a fait une présentation lors de la SmashingConf à San Francisco où il a parlé de la [JAMstack](https://jamstack.org/), une architecture de développement moderne pour le Web basée sur le Javascript côté client, des APIs réutilisables et du Markup pré-généré.

La JAMstack intègre des pratiques qui la rendent idéale pour le développement Web moderne :

-   Les sites basés sur la JAMstack tirent partie de la puissance des CDN pour bénéficier d'une vitesse et d'une performance impossibles à battre.
-   Tout est versionné dans Git, pas besoin de bases de données à répliquer, pas d'installation compliquée.
-   Le code est pré-généré avec la JAMstack, les régénérations sont automatisées, les modifications ne seront pas en production avant la prochaine régénération… pour ne citer que quelques exemples.

C'est une nouvelle manière de bâtir des sites et des applications qui offrent de meilleures performances, une sécurité plus élevée, un moindre coût de redimensionnement et une meilleure expérience de développement.

Une renaissance du Web moderne est en train d'avoir lieu et Smashing comptait bien en faire partie. Mais d'abord, ils voulaient l'implémenter pour eux-mêmes. En faisant cela Smashing consolide un peu plus le fait "qu'ils appliquent ce qu'ils recommandent" et qu'ils font partie des pionniers du développement Web moderne. Le fait d'avoir choisi la JAMstack et Netlify pour les aider à concrétiser cette vision ne pouvait que nous réjouir.

## Un travail titanesque

Smashing Magazine a décidé l'année dernière de redesigner leur site car ils faisaient face à pas mal de problèmes avec leur configuration précédente. Ils utilisaient différents outils et plate-formes pour tout gérer, des abonnements en passant par les contenus, ce qui pouvait s'avérer frustrant quand on ne savait pas où aller pour faire quelque chose.

WordPress leur a causé de forts maux de têtes et Smashing n'était plus satisfait de ce qu'il pouvait proposer. Même en utilisant la plupart des plugins de cache disponibles, il était clair que WordPress ne fonctionnait pas comme il fallait puisqu'il y avait des problèmes avec **chacun des plugins de cache**.

{% include figure.html url="https://cdn.netlify.com/3e5d615c43e682e4601dcfcd7eb8ee15357be6d9/63741/img/blog/gif_1.gif" description="Vitaly Friedman : nous avions des problèmes de cache avec chacun des plugins de cache Wordpress existants" %}

**Si** Netlify voulait relever le défi, il fallait bien comprendre les priorités cruciales pour Smashing :

-   L'accès à une **plate-forme unifiée** - un endroit qui regroupe les différents outils techniques utilisés pour la gestion du site,

-   La liberté de produire **un design** qu'ils aiment sans avoir à subir les contraintes imposées par WordPress et les autres outils,

-   Le site le **plus performant** possible en se focalisant sur la fiabilité et la rapidité.

…le tout en l'espace de **quelques mois**[^1].

[^1]: NdT. Le projet s'est étendu de juin 2016 à mars 2017.

Rien que ça ? Après quelques échanges et une réunion avec toute l'équipe, Netlify a décidé qu'ils ne pouvaient laisser passer une aussi belle occasion. Smashing magazine serait la parfaite étude de cas pour montrer que l'utilisation de la JAMstack constitue **la** manière de développer des sites.

{% include figure.html url="https://cdn.netlify.com/8847cc537164cc098d3f77f8db225c41f14430a5/e553b/img/blog/gif_4.gif" description="Mathias Biilmann : Smashing avait besoin d'un générateur, d'un CMS, de commentaires, d'une plate-forme de E-commerce, d'une gestion des abonnements et des paiements" %}

Cela signifie que Smashing avait beaucoup de besoins. Il fallait créer un outil de build pour le magazine, un gestionnaire de contenus pour les milliers d'articles, un moteur de commentaires (avec plus de 200 000 commentaires !), une plate-forme de e-commerce pour les ventes, un service d'abonnement et un compte utilisateur.

Nous ne sommes généralement pas pour réinventer la roue, nous sommes donc partis à la recherche d'outils actuels susceptibles de répondre aux solides besoins de Smashing. Malheureusement nous nous sommes vite aperçus qu'il allait falloir repartir de zéro.

## Ainsi naquirent nos rêves d'open source

Nous voulions fournir à Smashing tous les outils et les fonctionnalités dont il avait besoin. Mais il était également important pour nous que nos efforts en vaillent la peine et puissent bénéficier plus largement à l'ensemble de la communauté. Nous avions l'occasion de montrer que la JAMstack représente le futur du développement Web tout en construisant des outils qui allaient pouvoir être utilisés par la communauté grandissante qui gravite autour. C'est pour cela que tout ce que nous avons développé pour Smashing est **open source**.

En partant des besoins de Smashing, le début de notre périple technique a consisté à développer les APIS open source suivantes :

-   **GoTell** - une API et un outil de build pour la gestion d'un grand nombre de commentaires,
-   **GoCommerce** - une petit API en Go pour les sites e-commerce pour la gestion des commandes et des paiements,
-   **GoJoin** -  une API qui intègre les abonnements Stripe pour les Single Page Apps et les sites,
-   **GoTrue** - une petite API open-source écrite en Go qui peut agir comme une API de service indépendante pour la gestion des inscriptions et des authentifications. Elle est basée sur OAuth2 et JWT et peut gérer les inscriptions, les connexions et les données personnelles des utilisateurs.

Vous pouvez retrouver toutes ces APIs sur notre [page open source](https://www.netlify.com/open-source/). Il y a tout un historique technique derrière ces décisions et nous dévoilerons plus de détails à ce propos dans un prochain article.

## Notre CMS open source

Une des tâches les plus importantes liée au travail pour Smashing a été sans conteste le projet de gestionnaire de contenus open source **[Netlify
CMS](https://www.netlifycms.org/)**.

{% include figure.html url="https://cdn.netlify.com/f938aee2d1bd841ea4fe599a3af0f4e9bbba6b3c/024d0/img/blog/netlifycms.svg" description="Un CMS qui unifie le travail des auteurs, des éditeurs et des développeurs" %}

Loin de ses cousins bouffis et monolithiques comme WordPress, nous voulions que le CMS de Netlify permette aux éditeurs de contenus de bénéficier du processus de versionnement basé sur Git. Qui plus est, Netlify CMS est compatible avec toutes les plate-formes et fonctionne avec (presque) tout les générateurs de site statique compatibles avec GitHub. C'est rapide, simple, souple et nous sommes très fiers du résultat.

*Spéciale dédicace à toutes les technologies utilisées :*

[Algolia](https://www.algolia.com/), un service de recherche super rapide en temps réel, [Hugo](http://gohugo.io/), combiné à une gestion moderne des assets avec Gulp et Webpack, le tout basé sur le modèle open-source [Victor Hugo](https://github.com/netlify/victor-hugo).

## Putain, on l'a fait !

Quelques mois plus tard, nous y voici… Smashing a annoncé aujourd'hui la sortie du [site en version bêta](https://next.smashingmagazine.com/) et même s'il reste encore du travail à faire, nous pouvons célébrer quelques victoires :

SmashingMagazine.com est aujourd'hui bien plus rapide, ils sont passés d'un temps de début de chargement de 800ms à 80ms. Les visiteurs de Smashing vont maintenant bénéficier d'une expérience plus fluide grâce à de meilleures intégrations, une vitesse accrue et une meilleure performance.

{% include figure.html url="https://cdn.netlify.com/f1e06365a29be3cfcf08b8f1a82fc902cb9a75cf/ec035/img/blog/gif_2.gif" description="Le temps de début de chargement est bien plus rapide qu'auparavant" %}

Smashing possède désormais la plate-forme unifiée dont ils rêvaient. Ils gèrent maintenant à partir **d'un seul et même endroit** tous les solides besoins de leur site. Avec Netlify, les projets open source et une manière plus efficace de gérer les contenus, fini d'hésiter pour savoir sur quel bouton appuyer ou quel outil utiliser pour réaliser une action particulière.

Ils ont maintenant pleinement le contrôle sur le design de leur choix et pour résultat [un joli site](https://next.smashingmagazine.com/).

…et la JAMStack a prouvé qu'elle est une figure de proue de la rennaissance du Web moderne et nous avons avons été capable d'achever tout ce travail tout en fournissant une boîte à outil open source pour la communauté.
