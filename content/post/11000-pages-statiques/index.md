---
title: "Un site statique de 11 000 pages, c'est possible ?"
description: "Les sites statiques pour un site de média c'est l'idéal. Rapide, léger, sécurisé, tout semble coller sur le papier. Mais est-il possible de créer un site statique avec un grand nombre de pages?"
date: 2021-03-09 14:00:00
images:
author: patrickF
categories:
  - deploiement
  - Next JS
  - Headless
  - Nuxt JS
---

{{< intro >}}
Les sites statiques pour un site de média c'est l'idéal. Rapide, léger, sécurisé, tout semble coller sur le papier. Mais est-il possible de créer un site statique avec un grand nombre de pages?
{{</ intro >}}


## Le contexte

Tout débute par un client. Une entreprise qui gère des documents et des articles sur tout ce qui concerne les textes légaux sur le droit du travail dans les sociétés françaises.  
Elle existe depuis des décennies et comme toutes les entreprises de média et de documentation, elle produit beaucoup de contenu chaque année.  
Au fil des années, par la création de plusieurs sites web, ils ont une accumulation de divers technologies et langages. Le client souhaite aller de l'avant, réduire la dette technique et simplifier toute son infrastructure. Et réduire les coûts si possible.  
Il désire donc basculer une bonne partie des sites actuels sur des sites statiques.  
Mais avant d'investir de l'énergie humaine et de l'argent dans cette grosse migration, il est indispensable de tester les possibilités des solutions, vérifier que la solution matche bien avec le besoin et les enjeux business.



## Choix des générateurs et du CMS Headless

Côté CMS, le choix est déjà arrêté sur Craft CMS.  
C'est un CMS qui offre une très bonne expérience pour l'édition et surtout, il permet un mode headless avec des features très intéressantes par défaut. On y retrouve notamment: un mode preview, une API GraphQL et des webhooks. Parfait pour fonctionner avec un site statique. ([https://craftcms.com/](https://craftcms.com/))  
Le mode preview offrira une bonne expérience aux responsables du contenu. Il est très important pour une complète adoption par l'équipe de pouvoir éditer du contenu et vérifier le rendu immédiatement.

Comme le mode preview est un prérequis, cela élimine déjà tous les GSS (générateur de site statique) pur HTML (Hugo, Eleventy, etc.) sur lequel on ne bénéficie pas de cette fonctionnalité.  
On s'oriente donc sur 2 solutions qui offrent la possibilité de fonctionner dans ce mode. C'est donc Nuxt JS et Next JS qui sont retenus. Gastby aurait pu être utilisé aussi grâce à la nouvelle route API mais nous souhaitons conserver des process de build assez rapide. D'expérience, je connais bien Gatsby JS et je sais qu'il est le moins performant (POC fait avant l'annonce de la version 3).


## Commençons avec Next JS

Nous commençons avec Next JS, car nous avons hâte de découvrir le mode incrémental. La vitesse de publication d'une nouvelle version du site est également un point important.  
En effet, Next JS a implémenté 2 modes intéressants dans les dernières versions : le mode incrémental et la régénération des pages.  
Par contre, il faut savoir que ces 2 features et le mode preview ne sont pas disponibles dans le mode full statique (export html).  
Donc pour Next JS, le mode hybride est obligatoire et demande donc un serveur node JS pour le faire tourner.  
Pas de soucis aujourd'hui, car Vercel est très accessible en termes d'hébergement et Netlify propose aussi la possibilité de faire tourner Next JS en mode hybride sur son service.


## La génération des 11 000 pages et premier blocage

Durant le développement, je travaillais avec un échantillon d'une centaine de pages. Jusque là, tout va bien.
Je fais mon développement, j'ajoute les pages, la pagination. Tout fonctionne parfaitement.
Il est temps de tester avec les 11 000 pages. Et là, patatras !  
L'API a du mal à suivre les requêtes. Eh oui, 11 000 pages, c'est autant de requêtes pour générer chaque page dans un temps très court. Évidemment, à ce stade, rien n'est optimisé du côté du CMS mais c'est un premier blocage dans la génération des pages.

Pour optimiser les appels vers l'API, je fais un système de cache qui permet d'utiliser les fichiers caches au lieu d'appeler l'API. Je génère le cache juste avant le build.
Tout fonctionne parfaitement. Les 11 000 pages prennent entre 5 et 8min pour être créées.



## La surprise ou le blocage qu'on attendait pas

Bon OK, le temps de build des 11 000 pages est un petit peu long. Si on doit attendre à chaque fois entre 5 et 10min pour avoir une nouvelle version en ligne, ce n’est pas top.  
Mais là où nous avons eu la surprise, c'est quand nous avons testé sur Vercel le déploiement.  
Une chose que j'avais oubliée, c'est que 11 000 pages, c'est entre 400 et 500 Mb. Et en upload, ça prend du temps. Beaucoup de temps !
Clairement, au début, j'ai cru a un bug. J'ai coupé le déploiement au bout de 39mn. Oui, vous avez bien lu, 39min.  
Eh bien non, ce n’était pas un bug. J'ai testé sur Netlify, via FTP chez moi (fibre), ça prend bien une bonne quarantaine de minutes.

{{< figure src="39mindeploy.png" >}}


Le constat est simple. Impossible de faire du full statique sur un très grand nombre de pages. Le statique ne s'y prête pas du tout. D'autant que les futurs sites doivent atteindre le double, voir le triple en quantité de pages.


## L'incrémentale build à la rescousse !


C'est alors que la feature "Incremental regeneration" nous ait apparu comme la solution ultime ! ([incremental static regeneration](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration))  
Je vous explique : Next JS est capable de générer une page sous forme statique lors de la visite. Générer ou régénérer.
Il suffit alors d'utiliser le mode `fallback` de la fonction `getStaticPaths` avec la valeur `true` ou `blocking` pour afficher une page non générée lors de la phase de build.  
La suite est simple, vous donnez un tableau vide comme valeur `paths` de la fonction `getStaticPaths` pour ne générer aucune page lors du build.
Les pages seront générées à la demande en cas de visite.  
Résultat, un temps de build entre 2 min et 4 min pour un site statique (hybride) de 10 991 articles !

{{< figure src="10991articles.png" >}}
{{< figure src="4mindeploy.png" >}}

Cerise sur le gâteau, en utilisant le paramètre `revalidate`, on peut régénérer la page (temps en secondes) sans relancer un build. Cela veut dire qu'en cas de mise à jour de contenu, il n'est pas nécessaire de relancer un build !

<div style="margin: 1rem 0 2rem;text-align: center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/Dj-rKHmLp5w" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>



## La solution retenue

Bien que Nuxt JS ne propose pas de mode hybride comme Next JS pour le moment, nous sommes allés au bout du POC. Nous avons fait la même application en mode full statique, car nous ne souhaitons pas utiliser le mode SSR (Server side rendering). Et comme vous devez vous en douter, nous avons rencontré les mêmes soucis de temps de build et de déploiement.
Nous avons hâte de découvrir plus en détail la version 3 de Nuxt JS avec le moteur Nitro, qui doit normalement permettre un mode hybride.

Donc pour le moment, Next JS est retenu pour la migration des premiers sites. On utilisera le mode hybride avec une génération des pages à la demande en utilisant un `fallback` en `blocking` pour être 100% SEO.  
L'idée de générer au build les x derniers articles pour accélérer le chargement des articles récents est évoqué.  
Nous n’excluons pas que certaines pages très anciennes ne soient peut-être jamais visitées et donc jamais générées.

Pour résumer, si vous souhaitez créer un site statique comportant un grand nombre de pages (media, e-commerce), Next JS semble être pour le moment la seule solution.


### Private

Malheureusement, le projet est confidentiel et le code privé. Désolé, je ne peux pas fournir les data pour faire des tests. Oui Hugo est très rapide pour créer un site. Mais clairement là, le problème est dans le poids à uploader sur le serveur.

