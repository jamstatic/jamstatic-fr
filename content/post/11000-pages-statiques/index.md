---
title: "Un site statique de 11 000 pages, c'est possible ?"
description: "Les sites statiques pour un site de média c'est l'idéal. Rapide, léger, sécurisé, tout semble coller sur le papier. Mais est-il possible de créer un site statique avec un grand nombre de pages ?"
date: 2021-03-09 14:00:00
images:
  - https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/w_1100,c_fit,co_white,g_north_west,x_80,y_80,l_text:poppins_80_ultrabold_line_spacing_-30:G%C3%A9n%C3%A9rer%20un%20site%20statique%20de%2011%20000%20pages/jamstatic/twitter-card.png
author: patrickF
categories:
  - deploiement
  - nextjs
  - headless
  - nuxtjs
---

{{< intro >}}
Les sites statiques pour un site de média c'est l'idéal. Rapide, léger, sécurisé, tout semble coller sur le papier. Mais est-il possible de créer un site statique avec un grand nombre de pages ?
{{</ intro >}}

## Le contexte

Tout débute par un client. Une entreprise qui gère des documents et des articles sur tout ce qui concerne les textes légaux sur le droit du travail dans les sociétés françaises.  Elle existe depuis des décennies et comme toutes les entreprises de média et de documentation, elle produit beaucoup de contenu chaque année.  

Au fil des années, par la création de plusieurs sites web, ils ont une accumulation de divers technologies et langages. Le client souhaite aller de l'avant, réduire la dette technique et simplifier toute son infrastructure. Et réduire les coûts si possible.  
Il désire donc basculer une bonne partie des sites actuels sur des sites statiques.  

Mais avant d'investir de l'énergie humaine et de l'argent dans cette grosse migration, il est indispensable de tester les possibilités des solutions, vérifier que la solution matche bien avec le besoin et les enjeux business.

## Choix des générateurs et du CMS Headless

Côté CMS, le choix est déjà arrêté sur [Craft CMS](https://craftcms.com/). C'est un CMS qui propose une très bonne expérience pour l'édition et surtout, il permet un mode headless avec des fonctionnalités très intéressantes par défaut. On y retrouve notamment: un mode prévisualisation, une API GraphQL et des webhooks. Parfait pour fonctionner avec un site statique.

Le mode prévisualisation offre une bonne expérience aux responsables du contenu. Il est très important pour une complète adoption par l'équipe de pouvoir éditer du contenu et vérifier le rendu immédiatement.

Comme le mode prévisualisation est un prérequis, cela élimine déjà tous les GSS (générateur de site statique) pur HTML ([Hugo](/categories/hugo/), [Eleventy](/categories/eleventy/), etc.) sur lequel on ne bénéficie pas de cette fonctionnalité.  
On s'oriente donc sur deux solutions qui offrent la possibilité de fonctionner dans ce mode. C'est donc Nuxt.js et Next.js qui sont retenus.

Gastby aurait pu être utilisé aussi grâce à la nouvelle route API mais nous souhaitons conserver des process de build assez rapide. D'expérience, je connais bien Gatsby et je sais qu'il est le moins performant — ce prototype précède l'annonce de la version 3.0 annoncée comme plus rapide.

{{< notice info >}}
### Next.js

[Next.js](https://nextjs.org/) est un framework JavaScript basé sur React. Il permet de générer des applications React sous trois modes de rendu : SSR (rendu serveur), hybride (statique dynamique) et 100% statique (export des pages sous forme HTML)  
Uniquement dans le mode hybride, il offre les fonctionnalités suivantes : le mode prévisualisation des pages non générées, la regénération statique incrémentale (la (re)génération de pages existantes ou non, sous forme de fichiers statiques).

{{< /notice >}}

{{< notice info >}}
### Nuxt.js

Nuxt.js est un framework JavaScript basé sur Vue.js. Il permet de générer des applications Vue.js sous trois modes de rendu : SSR (rendu serveur), SPA (single page application) et 100% statique (export des pages HTML).
Il propose également un système de prévisualisation, mais dans le mode 100% statique. À ce jour, il ne propose pas de système de génération de page dynamique comme Next.js.  

Rien de confirmé pour le moment, mais la version 3.0 de Nuxt.js devrait proposer une fonctionnalité équivalente.

{{< /notice >}}

## Commençons avec Next.js

Nous commençons avec Next.js, et nous avons hâte de découvrir le mode incrémental. La vitesse de publication d'une nouvelle version du site est également un point important. En effet, Next.js a implémenté deux modes intéressants dans les dernières versions : le mode incrémental et la régénération des pages.

Néanmoins ces deux fonctionnalités et le mode prévisualisation ne sont pas disponibles dans le mode entièrement statique (export HTML). Donc **pour Next.js, le mode hybride est obligatoire** et demande donc un serveur Node.js pour le faire tourner. Pas de soucis aujourd'hui, car Vercel est très accessible en termes d'hébergement et Netlify propose aussi la possibilité de faire tourner Next.js en mode hybride sur son service.

## Génération des 11 000 pages et premier blocage

Durant le développement, je travaillais avec un échantillon d'une centaine de pages. Jusque là, tout va bien. Je fais mon développement, j'ajoute les pages, la pagination. Tout fonctionne parfaitement.

Il est temps de tester avec les 11 000 pages. Et là, patatras !  L'API a du mal à suivre les requêtes. Eh oui, 11 000 pages, c'est autant de requêtes pour générer chaque page dans un temps très court. Évidemment, à ce stade, rien n'est optimisé du côté du CMS mais c'est un premier blocage dans la génération des pages.

Pour optimiser les appels vers l'API, je fais un système de cache qui permet d'utiliser les fichiers du cache au lieu d'appeler l'API. Je génère le cache juste avant le build.
Tout fonctionne parfaitement. Les 11 000 pages prennent entre 5 et 8 minutes pour être créées.

## La surprise ou le blocage qu'on attendait pas

Bon OK, le temps de build des 11 000 pages est un petit peu long. Si on doit attendre à chaque fois entre 5 et 10 minutes pour avoir une nouvelle version en ligne, ce n’est pas top.  

Mais là où nous avons été surpris, c'est quand nous avons testé le déploiement sur Vercel.  
Une chose que j'avais oubliée, c'est que 11 000 pages, c'est entre 400 et 500 Mb. Et en upload, ça prend du temps. Beaucoup de temps !

Clairement, au début, j'ai cru a un bug. J'ai coupé le déploiement au bout de 39 minutes. Oui, vous avez bien lu, 39 minutes. Et non, ce n’était pas un bug : j'ai testé sur Netlify, via FTP avec une connexion fibre, ça prend bien une bonne quarantaine de minutes !

{{< figure src="39mindeploy.png" >}}

Le constat est simple. Impossible de faire du full statique sur un très grand nombre de pages. Le statique ne s'y prête pas du tout. D'autant que les futurs sites doivent atteindre le double, voire le triple en quantité de pages.

## La régénération incrémentale à la rescousse

C'est alors que la fonctionnalité de [régéneration incrementale](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration) nous est apparu comme la solution ultime ! Next.js est en effet capable de générer une page sous forme statique lors de la visite. Générer *ou* régénérer.

On peut utiliser le mode `fallback` de la fonction `getStaticPaths` avec la valeur `true` ou `blocking` pour afficher une page non générée lors de la phase de build.

Ensuite, vous donnez un tableau vide comme valeur `paths` de la fonction `getStaticPaths` pour ne générer aucune page lors du build. Les pages seront générées à la demande en cas de visite.

Résultat, un **temps de génération entre deux et quatres minutes** pour un site statique hybride de 10 991 articles !

{{< figure src="10991articles.png" >}}
{{< figure src="4mindeploy.png" >}}

Cerise sur le gâteau, en utilisant le paramètre `revalidate`, on peut régénérer la page (temps en secondes) sans relancer un build. Cela veut dire qu'en cas de mise à jour de contenu, il n'est pas nécessaire de relancer un build !

{{< youtube Dj-rKHmLp5w >}}

## La solution retenue

Bien que Nuxt.js ne propose pas de mode hybride comme Next.js pour le moment, nous sommes allés au bout du prototype. Nous avons fait la même application en mode full statique, car nous ne souhaitons pas utiliser le mode SSR (Server Side Rendering). Et comme vous devez vous en douter, nous avons rencontré les mêmes soucis de temps de build et de déploiement.

Nous avons hâte de découvrir plus en détail la version 3 de Nuxt.js avec le moteur Nitro, qui doit normalement permettre un mode hybride.

Donc pour le moment, Next.js est retenu pour la migration des premiers sites. On utilisera le mode hybride avec une génération des pages à la demande en utilisant un `fallback` en `blocking` pour être 100% SEO compatible.  

L'idée de générer au build les *X* derniers articles pour accélérer le chargement des articles récents est évoqué. Nous n’excluons pas que certaines pages très anciennes ne soient peut-être jamais visitées et donc jamais générées.

Pour résumer, si vous souhaitez créer un site statique comportant un grand nombre de pages (media, e-commerce), Next.js semble être pour le moment la seule solution.

## Prototype privé

Le projet est confidentiel et le code privé. Je ne peux pas fournir les données pour faire des tests
