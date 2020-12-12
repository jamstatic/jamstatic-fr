---
title: "Comparaison des temps de compilation des générateurs de site statique"
description: "Comment se comportent les principaux générateurs quand il s'agit de compiler 1, 1 000 ou 64 000 fichiers?"
author: frank
date: 2020-10-31T08:38:15+01:00
lastmod: 2020-10-31T14:38:15+01:00
excerpt: |
  Le temps de compilation d'un site est un critère parmi tant d'autres.
  Si ces premiers tests comparatifs de performance pure ne sont pas représentatifs de ce que à quoi vous pouvez vous attendre dans le contexte de vos projets, ils vous donneront quand même un premier ordre d'idée. Partir sur un framework a un coût en temps de compilation.
 
  Jekyll n'est intrinsèquement pas plus lent qu'Eleventy, tout dépend de votre projet. Gatsby sera le plus pénalisant sur de gros sites, Next.js est le framework qui s'en sort le mieux, et Hugo l'emporte haut la main et demeure intouchable dès qu'il s'agit de vitesse de compilation.
categories:
  - eleventy
  - jekyll
  - hugo
  - gatsby
images:
  - https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/w_1100,c_fit,co_white,g_north_west,x_80,y_120,l_text:poppins_80_ultrabold_line_spacing_-30:Performance%20des%20g%C3%A9n%C3%A9rateurs%20de%20site%20statique/jamstatic/twitter-card.png
source:
  author: Sean C Davis
  title: Comparing Static Site Generator Build Times
  url: https://css-tricks.com/comparing-static-site-generator-build-times/
---

Il y a tant de [générateurs de sites statiques (SSG)](https://jamstack.org/generators/). C'est fatiguant de devoir décider par où commencer. Bien qu'une abondance d'articles utiles puisse aider à se repérer dans les options (populaires), ils ne facilitent pas la décision comme par magie.

Je me suis efforcé de faciliter cette décision. Un de mes collègues a construit une [fiche d'évaluation du générateur de site statique](https://www.ample.co/blog/questions-to-ask-before-choosing-a-static-site-generator). Elle donne un très bon aperçu de nombreux choix de SSG populaires. Ce qui manque, c'est la façon dont ils fonctionnent réellement dans la pratique.

{{< figure src="https://res.cloudinary.com/jamstatic/image/upload/c_scale,dpr_2.0,f_auto,q_auto,w_1980/v1604155807/jamstatic/ssg-comparison-cheatsheet.png" alt="" attr="Comparatif des principaux générateurs" attrlink="https://www.ample.co/blog/questions-to-ask-before-choosing-a-static-site-generator" >}}

Tous les générateurs de sites statiques ont en commun le fait qu'ils prennent des données en entrée, les font passer par un moteur de template et produisent des fichiers HTML. Nous appelons généralement ce processus « la compilation ».

Il y a trop de nuances, de contexte et de paramètres à considérer pour pouvoir comparer les performances des différents générateurs pendant le processus de compilation pour les afficher sur une feuille de calcul - et c'est ainsi que commence notre test de comparaison des temps de compilation des générateurs de sites statiques les plus courants.

Il ne s'agit pas seulement de déterminer quel générateur est le plus rapide. [Hugo](https://gohugo.io/) a déjà cette réputation. Je veux dire, ils l'écrivent sur leur site web - Le framework le plus rapide au monde pour le développement de sites web - donc ça doit être vrai !

Il s'agit d'une comparaison des temps de compilation de plusieurs SSG populaires et, plus important encore, d'analyser en détail ces temps de compilation. Choisir aveuglément le plus rapide ou discréditer le plus lent serait une erreur. Voyons ensemble pourquoi.

## Les tests

Le processus de test est conçu pour démarrer de manière simple - avec seulement quelques générateurs populaires et un format de données simple. Une base sur laquelle on pourra s'appuyer pour tester d'autres générateurs et affiner les données. Pour le moment, le test comprend six des générateurs les plus populaires :

- [Eleventy](https://www.11ty.dev/)
- [Gatsby](https://www.gatsbyjs.com/)
- [Hugo](https://gohugo.io/)
- [Jekyll](https://jekyllrb.com/)
- [Next](https://nextjs.org/)
- [Nuxt](https://nuxtjs.org/)

Chaque test utilise l'approche et les conditions suivantes :

- La source de données pour chaque génération est constituée de fichiers Markdown avec un titre front matter et un corps de texte (contenant trois paragraphes de contenu) générés de manière aléatoire.
- Le contenu ne contient pas d'images.
- Les tests sont exécutés en série sur une seule machine, ce qui rend les valeurs réelles moins pertinentes que la comparaison relative entre les lots.
- La sortie est un texte en clair sur une page HTML, exécutée par le starter par défaut, en suivant le guide de démarrage respectif de chaque générateur.
- Chaque test est un essai à froid. Les caches sont effacés et les fichiers Markdown sont régénérés pour chaque test.

Ces tests sont considérés comme des tests de _référence_. Ils utilisent des fichiers Markdown de base et produisent du HTML non stylisé dans la sortie intégrée.

En d'autres termes, le résultat est techniquement un site web qui pourrait être déployé pour la production, bien que ce ne soit pas vraiment un scénario de la vraie vie. Cependant, cela permet une première comparaison entre ces frameworks. Les choix que vous faites en tant que développeur utilisant l'un de ces frameworks impacteront les temps de compilation de différentes manières ([généralement en les ralentissant](https://css-tricks.com/make-jamstack-slow-challenge-accepted/)).

Par exemple, contrairement au monde réel, nous testons des générations à froid. Dans la vraie vie, si vous avez 10 000 fichiers Markdown comme source de données et que vous utilisez Gatsby, vous allez utiliser le cache de Gatsby, ce qui réduira considérablement les temps de génération (jusqu'à près de la moitié).

On peut en dire autant des générations incrémentielles, qui sont liées à des passages à chaud par rapport aux passages à froid, dans la mesure où elles ne génèrent que les fichiers qui ont changé. Pour le moment, nous ne testons pas l'approche incrémentale dans ces tests.

## Les deux types de générateurs de sites statiques

Avant cela, considérons d'abord qu'il existe en réalité deux types de générateurs de sites statiques. Appelons-les _basique_ et _avancé_.

- **Les générateurs de base** (qui ne sont pas basiques sous le capot) sont essentiellement une interface en ligne de commande (CLI) qui prend des données en entrée et produit du HTML, et peut souvent être étendue pour traiter divers ressources (ce que nous ne faisons pas ici).
- **Les générateurs avancés** offrent quelque chose en plus de la sortie d'un site statique, comme le rendu côté serveur, des fonctions _serverless_ et l'intégration d'un framework. Ils ont tendance à être configurés pour être plus dynamiques par défaut.

J'en ai délibérément choisi trois de chaque type dans ce test. Les trois premiers à tomber dans le panier de base sont Eleventy, Hugo et Jekyll. Les trois autres sont basés sur un framework frontend et sont livrés avec des quantités d'outils variés. Gatsby et Next sont bâtis sur React, tandis que Nuxt est construit par dessus Vue.

| Générateurs Basiques | Générateurs Avancés |
| :------------------- | :------------------ |
| Eleventy             | Gatsby              |
| Hugo                 | Next                |
| Jekyll               | Nuxt                |

## Mon hypothèse

Appliquons [la méthode scientifique](https://en.wikipedia.org/wiki/Scientific_method) à cette approche car la science est amusante (et utile) !

Mon hypothèse est que si un générateur est avancé, alors il fonctionnera moins vite qu'un générateurs de base. Je pense que les résultats en témoigneront, car les générateurs avancés ont davantage de coûts fonctionnels que les générateurs de base. Ainsi, il est probable que nous voyons les deux groupes de générateurs - de base et avancés - regroupés ensemble, dans les résultats avec des générateurs de base se déplaçant beaucoup plus rapidement.

Permettez-moi de développer un peu plus cette hypothèse.

### Linéaire et rapide

Hugo et Eleventy domineront les tests avec des volumes de données plus petits. Ce sont des processus (relativement) simples dans Go et Node.js, respectivement, et leur temps de génération devrait le refléter. Bien que les deux générateurs soient moins rapides au fur et à mesure que le nombre de fichiers augmente, je m'attends à ce qu'ils restent en tête, bien que Eleventy soit peut-être un peu moins linéaire à l'échelle, simplement parce que Go a tendance à être plus performant que Node.

### Lent, puis rapide, mais toujours lent

Les générateurs avancés, ou liés à un framework, démarreront et sembleront lents. Je soupçonne qu'un test sur fichier unique contient une différence significative - des millisecondes pour les tests de base, contre plusieurs secondes pour Gatsby, Next et Nuxt.

Les générateurs basés sur un framework font chacun appel à webpack pour la génération, ce qui entraîne une quantité importante de frais fonctionnels, quelle que soit la quantité de contenu qu'ils traitent. C'est le contrat tacite que nous passons en utilisant ces outils (nous y reviendrons plus tard).

Mais, à mesure que nous ajouterons des milliers de fichiers, je pense que nous verrons l'écart entre les deux catégories se réduire, même si le groupe _avancé_ restera plus loin derrière d'une manière significative.

Dans le groupe des générateurs avancés, je m'attends à ce que Gatsby soit le plus rapide, uniquement parce qu'il n'a pas de composant côté serveur dont il faut se soucier - mais c'est juste une intuition. Next et Nuxt ont peut-être optimisé cela au point que, si nous n'utilisons pas cette fonctionnalité, cela n'affectera pas les temps de génération. Et je pense que Nuxt battra Next, uniquement parce que Vue a un peu moins d'impact que React.

### Jekyll : le vilain petit canard

Ruby est tristement célèbre pour sa lenteur. Il est devenu plus performant avec le temps, mais je ne m'attends pas à ce qu'il rivalise avec Node, et certainement pas avec Go. Et pourtant, dans le même temps, il n'a pas le bagage d'un framework.

Au début, je pense que nous verrons Jekyll comme étant assez rapide, peut-être même impossible à distinguer de Eleventy. Mais au fur et à mesure que nous arriverons aux milliers de fichiers, la performance en prendra un coup. Mon sentiment est qu'il peut y avoir un moment où Jekyll devient le plus lent des six. Nous allons pousser jusqu'à la barre des 100 000 pour en être sûrs.

{{< figure src="https://i2.wp.com/css-tricks.com/wp-content/uploads/2020/10/jekyll-hand-chart.jpg?w=862&ssl=1" alt="Les résultats auxquels on pourrait s'attendre, Hugo le plus rapide et Next.js le plus lent" >}}

## Les résultats sont arrivés !

Le code de ces tests se trouve sur [GitHub](https://github.com/seancdavis/ssg-build-performance-tests). Il y a aussi [un site qui montre les résultats relatifs](https://ssg-build-performance-tests.netlify.app/).

Après de nombreuses itérations pour établir les bases sur lesquelles ces tests pourraient être effectués, j'ai fini par réaliser une série de 10 tests dans trois ensembles de données différents :

- **Basique** : Un seul fichier, pour comparer les temps de génération de base
- **Petits sites** : De 1 à 1024 fichiers, en doublant le nombre de fichiers à chaque fois (pour faciliter la détermination de l'échelle linéaire des générateurs)
- **Grands sites** : De 1 000 à 64 000 fichiers, en doublant le nombre de fichiers à chaque passage. Au départ, je voulais aller jusqu'à 128 000 fichiers, mais j'ai rencontré des problèmes avec certains des frameworks. 64 000 ont fini par suffire pour donner une idée de la manière dont les différents acteurs allaient évoluer avec des sites toujours plus importants.

{{< figure src="https://i1.wp.com/css-tricks.com/wp-content/uploads/2020/10/base-build-times.jpg" alt="Performance de base, Hugo est largement vainqueur">}}

{{< figure src="https://i2.wp.com/css-tricks.com/wp-content/uploads/2020/10/build-small-sites.jpg" alt="Génération sur des petits sites (< 1024 fichiers) : Hugo est de loin le plus rapide, Gatsby devient plus lent dès 128 fichiers">}}

{{< figure src="https://i1.wp.com/css-tricks.com/wp-content/uploads/2020/10/build-large-sites.jpg" alt="Génération de gros sites (entre 1000 et 64000 fichiers): Hugo est de loin le plus rapide, Gatsby est exponentiellement plus lent" >}}

## Synthèse des résultats

Certains résultats m'ont surpris, alors que d'autres étaient prévisibles. Voici les points les plus importants :

- Comme prévu, **Hugo est le plus rapide**, quelle que soit la taille du site. Ce à quoi je ne m'attendais pas, c'est qu'il _loin_ devant tous les autres générateurs, même sur une génération de base (il n'est pas non plus linéaire, mais nous reviendrons sur ce point.)
- Les groupes de générateurs de base et avancés sont assez évidents quand on regarde les résultats pour les petits sites. C'était prévu, mais il était surprenant de voir que **Next est plus rapide que Jekyll avec 32 000 fichiers, et plus rapide que Eleventy et Jekyll avec 64 000 fichiers**. Il est également surprenant que Jekyll soit plus rapide que Eleventy avec 64 000 fichiers.
- Aucun des générateurs ne suit une échelle linéaire. Next.js est celui qui s'en rapproche le plus cependant. Hugo donne l'apparence d'être linéaire, mais c'est seulement parce qu'il est beaucoup plus rapide que les autres.
- Je pensais Gatsby serait le plus rapide parmi les générateurs avancés, et je me suis dit que c'était celui qui se rapprocherait le plus des générateurs de base. Mais **Gatsby s'est avéré être le plus lent**, produisant la courbe la plus exponentielle.
- Bien que cela ne soit pas spécifiquement mentionné dans l'hypothèse de départ, **l'échelle des différences était plus grande que je ne l'aurais imaginé**. Pour un seul fichier, Hugo est environ 170 fois plus rapide que Gatsby. Mais à 64 000 fichiers, il est plus proche - environ 25 fois plus rapide. Cela signifie que, si Hugo reste le plus rapide, il a en fait la forme de croissance exponentielle la plus spectaculaire parmi le lot. Il semble simplement linéaire à cause de l'échelle du graphique.

## Qu'en conclure ?

Lorsque j'ai partagé mes résultats avec les créateurs et les mainteneurs de ces générateurs, j'ai généralement eu la même réponse. Pour paraphraser :

> Les générateurs qui prennent plus de temps à générer en font davantage. Ils apportent plus aux développeurs, alors que les générateurs plus rapides (c'est-à-dire les outils "de base") concentrent leurs efforts en grande partie sur la conversion des modèles en fichiers HTML.

Nous sommes d'accord.

Pour résumer : _La mise à l'échelle des sites Jamstack est difficile._

Les défis qui se présenteront à vous, développeur, au fur et à mesure que vous que la taille de votre site augmentera, varieront en fonction du site que vous essayez de construire. Ces données ne sont pas saisies ici car elles ne peuvent l'être - chaque projet est unique d'une certaine manière.

Ce qui compte vraiment, c'est _votre niveau de tolérance à l'attente en échange de l'expérience de développement_.

Par exemple, si vous allez générer un grand site à forte charge d'images avec Gatsby, vous allez le payer avec des délais de génération plus longs, mais on vous donne aussi un immense ensemble de plugins et une base sur laquelle construire un site solide, organisé et basé sur des composants. Faites de même avec Jekyll, et il vous faudra beaucoup plus d'efforts pour rester organisé et efficace tout au long du processus, même si vos générations peuvent être plus rapides.

Au [boulot](https://www.ample.co/), je développe généralement [des sites avec Gatsby](https://www.ample.co/blog/the-case-for-gatsby) (ou Next, selon le niveau d'interactivité dynamique requis). Nous avons travaillé avec le framework Gatsby pour construire un noyau sur lequel nous pouvons rapidement créer des sites web très personnalisés, riches en images, avec une abondance de composants. Nos temps de génération augementent au fur et à mesure que les sites se développent, mais c'est à ce moment que nous devenons créatifs en mettant en place des [micro frontend](https://micro-frontends.org/), en déchargeant le traitement des images, en mettant en place des aperçus de contenu, ainsi que de nombreuses autres optimisations.

[De mon côté](https://www.seancdavis.com/), je préfère travailler avec Eleventy. En général, je ne fais qu'écrire du code, et mes besoins sont beaucoup plus simples. (J'aime me considérer comme un bon client pour moi-même.) J'ai le sentiment d'avoir plus de contrôle sur les fichiers en sortie, ce qui me permet d'obtenir plus facilement les performances de 💯 côté client, et c'est important pour moi.

En fin de compte, il ne s'agit pas _seulement_ de ce qui est rapide ou lent. Il s'agit de savoir ce qui fonctionne le mieux pour vous et combien de temps vous êtes prêt à attendre.

## Conclusion

Ce n'est que le début ! L'objectif de cet effort était de créer une base sur laquelle nous pouvons, ensemble, comparer les temps de génération relatifs des générateurs de sites statiques les plus populaires.

Quelles sont vos idées ? Quels sont les faiblesses du processus actuel ? Que pouvons-nous faire pour améliorer ces tests ? Comment pouvons-nous les rendre plus proches des scénarios du monde réel ? Devrions-nous transférer le traitement sur une machine dédiée ?

Voilà les questions auxquelles j'aimerais que vous m'aidiez à répondre. [Parlons-en](https://github.com/seancdavis/ssg-build-performance-tests/issues).
