---
title: "Pourquoi et comment j’ai migré Jamstatic.fr de Hugo vers Cecil"
description: "Retour d’expérience sur la migration du site vers Cecil."
date: 2022-08-28
updated: 2026-01-28
author: arnaud
social:
  twitter: ArnaudLigny
  mastodon: arnaud@gazuji.com
categories:
  - Hugo
  - Cecil
---
À la fin de l’année dernière j’avais entrepris de pérenniser le travail de refonte du site, engagé avec [Frank](https://frank.taillandier.me) : nouveau logo et nouvelle charte graphique, impliquant la modification des templates et de la feuille de styles.

C’est la version sur laquelle vous lisez cette article 😊

Pour rappel, avant le site ressemblait à ça :

![Capture d’écran de la v1 de Jamstatic.fr](../../assets/images/jamstatic-v1-screenshot.png "[Capture d’écran de la v1 de Jamstatic.fr](https://web.archive.org/web/20201012071702/https://jamstatic.fr/)")

## Pourquoi changer de solution ?

Au tout début je m’étais concentré sur la modification des feuilles de styles en m’appuyant sur [Tailwind CSS](https://tailwindcss.com/) (comme [souhaité par Frank](https://github.com/jamstatic/jamstatic-fr/pull/255)), puis sur la modification des [templates Go](https://gohugo.io/templates/introduction/).  
Puis, je me suis rapidement arraché les cheveux sur le moteur de templates d’Hugo... En effet, ne le pratiquant pas régulièrement, j’étais systématiquement en train de consulter la documentation pour savoir comment réaliser des actions pourtant basiques : comment manipuler une variable, gérer les héritages, les inclusions, etc.  
Bref, une perte de temps importante et une motivation se réduisant de jour en jour.

J’ai alors décidé de [sauter le pas](https://github.com/jamstatic/jamstatic-fr/pull/343) et de migrer vers [Cecil](https://cecil.app/), pour 2 raisons majeures :

1. Je connais la solution sur le bout des doigts (et pour cause puisque j’en suis [le créateur](https://arnaudligny.fr/blog/cecil-mon-generateur-de-site-statique/) ^^) ;
2. Et surtout je suis à l’aise, et donc efficace, avec le moteur de template [Twig](https://twig.symfony.com/).

## Comment ?

Après le "pourquoi ?" intéressons nous maintenant à la partie la plus intéressante de ce billet, à savoir le "comment ?" 😊

Le principe de génération du site, la structure des contenus et l’organisation des templates étant relativement proches entre Hugo et Cecil, j’ai décidé de procéder par itérations successives plutôt que de repartir d’une page blanche, selon la boucle suivante :

1. J’effectue une modification ;
2. Je lance un nouveau build ;
3. J’effectue les ajustements nécessaires (en m’appuyant sur les messages d’erreur retournés) ;
4. Je recommence jusqu’à ce que le build soit valide.

### Gestion de contenu

Nous pouvons séparer les contenus en 2 catégories :

1. Les *pages*, c’est à dire les articles rédigés dans le format [Markdown](https://fr.m.wikipedia.org/wiki/Markdown)
2. Les *assets*, c’est à dire les illustrations et autres vidéos au sein des articles

Aussi, je me suis tout d’abord concentré sur la réorganisation de ces contenus :

1. Déplacement des fichiers _*.md_ du dossier `content/` de Hugo vers le dossier `pages/` de Cecil
2. Renommage des fichiers dans la section _post_ de manière à les préfixer avec la date de l’article (`YYYY-MM-DD_Titre.md`) et ainsi faciliter leur tri
3. Déplacement des fichiers médias dans le dossier dédié de Cecil (`asset/`)

### Mise en forme et templates

Le changement de moteur de templates aura certainement été le plus gros du travail, mais qui aura permis d’optimiser le rendu, via :

- La rationalisation et la factorisation des templates de manière à ne pas/plus dupliquer du code
- La suppression des templates inutiles, c’est à dire disponibles en natif avec Cecil (tel que celui du flux RSS)

### Dépendances et scripts

Cecil supportant nativement (entre autre) la minification des scripts et des feuilles de styles, il n’est plus nécessaire d’installer certaines dépendances requises par Hugo. J’ai pu de fait, réduire le fichier `package.json` au strict minimum : à savoir le support de Tailwind CSS et de All Contributors.

De plus, il existe des [*Themes Components*](https://cecil.app/themes/components/) pour Cecil, c’est à dire des thèmes utilitaires, dont [PWA](https://github.com/Cecilapp/theme-pwa#readme) permettant de transformer n’importe quel site web généré avec Cecil en Progessive Web App.

### Image de partage

L’image de partage sur les réseaux sociaux était créée de manière semi-automatique via l’[API HTTP de manipulation d’image de Cloudinary](https://cloudinary.com/documentation/transformation_reference#l_text), en paçant le lien (fabriqué à la main) dans le front matter de chaque post.

Même si ça fonctionnait plutôt bien en pratique, cette méthode était contraignante puisqu’il fallait recréer l’URL pour chaque nouvel article, en veillant à l’encoder correctement.

De plus le service de Cloudinary était sollicité à chaque affichage du post concerné, alors même que l’image n’était plus modifiée.

Aussi, j’ai délégué la construction de cette URL au template [`post/page.html.twig`](https://github.com/jamstatic/jamstatic-fr/blob/master/layouts/post/page.html.twig#L1) :

```twig
{% set cloudinary_url = 'https://res.cloudinary.com/%s/image/upload/f_auto,q_auto/w_1100,c_fit,co_white,g_north_west,x_80,y_120,l_text:poppins_80_ultrabold_line_spacing_-30:%s/%s'|format(site.cloudinary.account, page.title|url_encode|replace({'%2C':'%252C'}), 'jamstatic/twitter-card.png') %}
{% set image = asset(cloudinary_url, {filename: 'cards/%s.png'|format(page.id)}) %}
```

En pratique :

- Création d’une image « modèle » (en veillant à garder de la place pour y intégrer le titre du billet)
- Utilisation de la fonction [`asset()`](https://cecil.app/documentation/templates/#asset) pour manipuler l’image générée par Cloudinary :
  1. Format automatique et qualité automatique
  2. Définition de la largeur maximum du texte avant retour à la ligne (1100 px) et positionnement du texte aux coordonnées 80:120
  3. Utilisation de la police de caractère Poppins 80 ultra bold interligne -30
  4. Remplacement des virgules présentes dans le titre par des espaces
  5. Encodage de l’URL obtenue
  6. Enfin, enregistrement de l’asset avec un nom de fichier "slugifié" afin d'être compatible avec les contraintes de nommage Windows, au format PNG

Exemple :

![Exemple d’une Twitter Card](../../assets/images/twitter-card-example.png "Exemple d’une Twitter Card")

## Conclusion

Pour conclure rapidement, je dirais que l’important ici n’est pas la solution utilisée pour générer le site : c’est la source de la donnée, le contenu, en l’occurrence les articles. Et, dans le cas de cette migration technique, ce qui a fait la différence c’est le fait que les articles ont été rédigés dans un format standardisé, [Markdown](https://fr.wikipedia.org/wiki/Markdown), indépendant de la solution technique.
