---
title: Entretien avec Michael Rose, designer et développeur front-end
date: 2017-12-02
author: Frank Taillandier
description: >
  Michael Rose, webdesigner très actif dans la communauté Jekyll, partage son retour d’expérience sur les générateurs de site statique
images:
  - /assets/images/michael-rose.jpg
source:
  lang: en
  url: https://www.thenewdynamic.org/article/interview-michael-rose/
  title: Interview with Michael Rose, designer and front-end developer
categories:
  - jekyll
---

Michael Rose est un des webdesigner les plus actifs dans la communauté Jekyll, il est l’auteur de thèmes populaires comme [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/), [Basically Basic](https://mmistakes.github.io/jekyll-theme-basically-basic/) ou
[Hpster](https://mmistakes.github.io/hpstr-jekyll-theme/).
Michael partage son expérience et son point de vue de designer qui travaille avec des générateurs de site statique comme Jekyll, Gatsby ou Hugo. Aucun logiciel n'est parfait et il y a toujours de la place pour des améliorations selon lui.

{{< figure src="/assets/images/michael-rose.jpg" >}}

## Bonjour Michael, comment te présenter ?

La réponse la plus simple à cette question est de me présenter comme un designer et un développeur front-end, je suppose. J'ai commencé par travailler dans le monde de l’impression et je suis passé petit à petit au design et au développement Web, je fais ça depuis un peu plus de 17 ans maintenant.

Quand je ne suis pas devant l’écran de mon ordinateur, j'aime bien jouer un peu à la Xbox One et à la Nintendo Switch ou bien je fais des dessins et des peintures numériques à l’aide de mon iPad. Je passe aussi beaucoup de temps avec ma femme et mes deux filles jumelles.

## Comment en es-tu venu à adopter Jekyll comme outil de publication ?

Le fait que Jekyll utilise [Liquid](https://shopify.github.io/liquid/) pour la conception des gabarits de page m'a tout de suite attiré. À l’époque je développais des sites Web et des blogs avec WordPress et j'avais du mal à comprendre ce qui se passait dans la fameuse "boucle".

Je trouve Liquid clair et facile à comprendre. Prendre un ensemble de documents HTML et ajouter des balises et quelques conditions si/sinon a fait tilt chez moi.

Bien entendu, tous les bénéfices du passage au statique sont aussi appréciables, mais c'est vraiment le processus de création des gabarits de page que j'apprécie le plus. Ce qui m'a amené par la suite à développer des thèmes open source pour la communauté.

## Sur quels types de sites travailles-tu ?

Dans mon travail, je suis principalement designer frontend pour des sites de e-commmerce, j'administre aussi les contenus. J'utilise souvent Jekyll pour m'aider à prototyper de nouveaux blocs de contenus et de nouveaux agencements de pages avant de les intégrer dans OpenText, un CMS d’entreprise que nous utilisons sur plus d’une trentaine de sites.

En dehors du boulot, je m'occupe de quelques blogs WordPress avec beaucoup de contenus, [mon site personnel](https://mademistakes.com/) est sous Jekyll, et je maintiens [plusieurs thèmes populaires pour Jekyll](https://mademistakes.com/work/jekyll-themes/).

## Qu'est-ce qui te plait dans le fait de travailler avec des générateurs de site statique ?

Il y a trois chose que j'aime bien quand je travaille avec des <abbr aria-label="Générateur de Site Statique">GSS</abbr> :

1. Leur **simplicité**. Des fichiers faciles d’accès, faciles à éditer,  à modifier et à transformer en HTML. Il n'y a rien de magique dans le processus et on peut adopter le workflow que l’on souhaite.
2. Leur **interopérabilité**. La plupart des <abbr aria-label="Générateur de Site Statique">GSS</abbr> utilisent des fichiers Markdown pour *stocker* les contenus, ce qui rend les migrations vers d’autres générateurs beaucoup plus simples.
3. Leur **performance**. Comme ils ne se reposent pas sur une connexion à une base de données, les pages peuvent être facilement optimisées et mises en cache pour que ça aille plus vite. C’est quelque chose qu'il n'est pas aussi aisé à réaliser avec des sites dynamiques servis par WordPress ou ses copains.

## Quelle est ta fonctionnalité préférée dans Jekyll ?

L'utilisation de [Liquid](https://shopify.github.io/liquid/). J'ai essayé d’autres <abbr aria-label="Générateur de Site Statique">GSS</abbr> et Jekyll est de loin le plus facile à apprendre et avec lequel on peut vite construire des trucs.

## Quelle est la fonctionnalité qui te manque le plus ?

Comme c'est juste un générateur, le rôle de Jekyll n'est pas de gérer les médias. Toutefois, c'est une des fonctionnalités qui me manque le plus quand je ne travaille pas avec WordPress.

Le gestionnaire de médias de WordPress est excellent et il me manque à chaque fois que je travaille sur des contenus avec beaucoup d’images dans Jekyll. Bien entendu il y a des outils qui peuvent aider dans le processus, mais ce n'est pas la même chose que de pouvoir uploader en masse, éditer, retailler et générer le balisage des images reponsive qui va bien.

Mis à part les différences de langages dans lequel ils sont développés, l’expérience est la même entre les différents <abbr aria-label="Générateur de Site Statique">GSS</abbr>. Quelques années auparavant, j'aurais dit que le manque d’interface de gestion pour l’édition des articles et des pages était un gros frein pour les personnes issues du monde WordPress. Mais avec des services comme [Forestry.io](https://forestry.io),
[Cloudcannon](https://cloudcannon.com), et même le [plugin `jekyll-admin`](https://github.com/jekyll/jekyll-admin/) ce vide a été en partie rempli.

J'ai aussi regardé des services comme Cloudinary. Mais ils sont payants… du moins si je choisis un plan qui couvre mes besoins, alors que WordPress c'est entièrement gratuit, difficile de rivaliser avec ça ;-)

J'essaie de plus en plus de ne pas polluer mes fichiers Markdown avec des balises personnalisées. Je rêve de pouvoir avoir un fichier en pur Markdown, portable, qui s'affiche partout où Markdown est supporté, et qui peut être prévisualisé facilement (avec les images et tout le reste).

J'ai pas mal étudié [Gatsby](https://www.gatsbyjs.org/) qui est un générateur qui embarque un ensemble d’outils modernes et qui permet de ce genre de choses et bien plus. Il peut convertir automatiquement les liens vers les images écrits en Markdown, les redimensionner, les optimiser et générer le balisage adéquat pour une image responsive avec `srcset` grâce aux plugins [gatsby-remark-images](https://www.gatsbyjs.org/packages/gatsby-remark-images/)
et [gatsby-images](https://www.gatsbyjs.org/packages/gatsby-image/) et ce de manière assez rapide à l’aide de [sharp](https://github.com/lovell/sharp).

Je n'ai pas testé [la version 3 du plugin `jekyll-assets`](https://envygeeks.io/2017/11/21/jekyll-assets-3-released) mais les plugins Jekyll écrits en Ruby qui font des choses similaires sont plutôt lents, du fait qu'ils reposent sur des bibliothèques comme Imagemagick ou équivalentes.

## Pourquoi y a-t-il aussi peu de thèmes de qualité pour Jekyll selon toi?

Jusqu'à récemment peu de thèmes étaient supportés nativement par GitHub Pages.
Pour avoir accès à des thèmes de qualité, il fallait connaître Git et savoir _forker_ un dépôt.
Mais je pense que la majorité des utilisateurs veulent juste profiter de GitHub Pages pour bénéficier d’un site _gratuit_ avec lequel ils pourront publier des articles.

Maintenant que [GitHub Pages supporte les thèmes distants](https://github.com/blog/2464-use-any-theme-with-github-pages) peut-être verrons-nous plus de thèmes de qualité apparaître. Surtout que l’installation et la mise à jour se font sans peine maintenant.

L'autre chose qui pose potentiellement problème pour les développeurs est peut-être le manque de standardisation.
Par exemple WordPress possède une nomenclature et un ensemble de standards pour le [développement de thème](https://codex.wordpress.org/Theme_Development).
Actuellement, on trouve des thèmes Jekyll un peu partout, et chaque développeur fait les choses à sa sauce. Arriver à se mettre d’accord sur un ensemble de bonnes pratiques pour le nommage des `_layouts`, les variables de configuration à ajouter au fichier `_config.yml` et un support natif de i18n dans Jekyll, aiderait pas mal je pense.

Sur mes derniers thèmes, j'ai essayé de me baser sur ce qu'à fait [Minima, le thème par défaut de Jekyll](https://github.com/jekyll/minima/). Puisque c'est par là que commence la plupart des gens, adopter la même nomenclature et une configuration similaire a l’air de plutôt bien fonctionner.

Il y aura toujours des particularités si des thèmes ont des fonctionnalités spécifiques, mais une espèce de base commune pourrait bénéficier à tout le monde. C’est dur de rivaliser avec WordPress à ce niveau. Vous pouvez installer n'importe quel thème et modifier l’apparence de votre site sans trop d’effort.

## Pourquoi n'y a-t-il pas plus de designers Web qui travaillent avec des générateurs de site statique ?

Je n'en suis pas certain, mais je ne pense pas que ce soit par méconnaissance, car il n'y a pas un jour où je tombe sur un billet de blog ou un article sur l’utilisation des sites statiques. Mais c'est peut-être l’environnement dans lequel j'évolue ;)

Il est possible que beaucoup pensent que c'est juste pour faire de petits sites perso. Avec tous les services qui arrivent comme [Netlify](https://netlify.com) et les lancements de site visibles comme [Smashing Magazine avec Hugo](/2017/03/17/smashing-mag-va-dix-fois-plus-vite/), je ne pense pas que ça soit le cas. Donc c'est peut-être qu'il faut juste continuer de faire passer le mot que les générateurs de site statique sont un ensemble d’outils puissants qui permettent de monter en charge.

## Ton [thème hpster](https://dldx.github.io/hpstr-hugo-theme/) a été porté pour Hugo, est-ce que tu as testé ?

Oui j'ai regardé. Quand ce thème a été porté, Hugo commençait à peine à faire parler de lui. Depuis Hugo s'est considérablement développé dans la communauté des générateurs et c'est vraiment quelque chose sur lequel il faut que je me penche un peu plus. J'aimerais bien voir Jekyll s'inspirer de la vitesse avec laquelle il arrive à générer les pages. Comme j'ai un site personnel assez important avec des milliers de fichiers Markdown, la génération prend plusieurs minutes avec Jekyll. Alors qu'avec Hugo, je pense que ce sera quelques secondes.

La seule chose qui me retienne véritablement de creuser un peu plus dans Hugo est [son langage pour les gabarits de page](https://gohugo.io/templates/). Ça vient peut-être de moi, mais ce n'est pas aussi lisible que les gabarits Liquid et j'ai vraiment de mal à comprendre ce que fait le code.
