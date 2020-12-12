---
title: Présentation d’Eleventy, un nouveau générateur de site statique
date: 2018-02-18 10:23:07 +0100
author: frank
description:
  Zach Leatherman explique pourquoi il a développé Eleventy, un générateur de
  site statique basé sur JavaScript, particulièrement flexible et qui sait se faire
  oublier.
categories:
  - eleventy
images:
  - https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/w_1200,c_fit,co_white,g_north_west,x_80,y_80,l_text:poppins_80_ultrabold_line_spacing_-30:Eleventy%252C%20un%20nouveau%20g%C3%A9n%C3%A9rateur%20de%20site%20statique/jamstatic/twitter-card.png
source:
  author: Zach Leatherman
  title: Introducing Eleventy
  url: https://www.zachleat.com/web/introducing-eleventy/
  lang: en
---

{{< intro >}} L'auteur d’Eleventy, le talentueux
[Zach Leatherman](https://twitter.com/zachleat), développeur front-end
particulièrement attentif à la performance explique pourquoi il a décidé de
développer à son tour un générateur de site statique. Eleventy se pose d’emblée
comme une alternative intéressante à Jekyll ou aux générateurs qui reposent sur
des bibliothèques JavaScript, tout en en s'affranchissant de leurs contraintes.
{{< /intro >}}

---

Eleventy est un nouveau générateur de site statique.

{{< notice info >}}

Si n'êtes pas encore au fait de ce que sont les générateurs
de sites statiques et des avantages qu'ils procurent, lisez
[ce très bon article](https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/)
paru dans Smashing Magazine écrit par
[Matt Biilmann](https://twitter.com/biilmann).

{{< /notice >}}

Encore un générateur de site statique ? Oui. Mais pourquoi ? Bonne question.

Eleventy a été créé pour trois raisons :

- Flexibilité
- Parier sur JavaScript
- Ce n'est pas un framework JavaScript

## Flexibilité

### Flexibilité du moteur de template

Eleventy vous permet d’utiliser différents moteurs de template et de migrer
ainsi facilement vos contenus existants. Vos fichiers de contenu peuvent
utiliser un moteur de templating différent de celui de vos gabarits de page !

_Linda fait du développement web pour ses clients. Linda maintient un ensemble
de documentation transversale pour l’ensemble de ses projets qu'elle fournit en
même temps que les composants front-end et les templates. Linda a codé ses
documentations à l’aide du langage de templating Liquid avec Jekyll. Linda a
maintenant un client qui souhaite qu'elle livre les composants sous forme de
fichiers de gabarit Mustache. Facile, Linda passe de Jekyll à Eleventy car
Eleventy sait gérer les deux côte-à-côte. Bien joué Linda._

| Générateur de site | Classement [staticgen.com](https://www.staticgen.com/) | Moteur de templates |
| ------------------ | ------------------------------------------------------ | ------------------- |
| Jekyll             | #1                                                     | Liquid              |
| Hugo               | #2                                                     | Go Template         |
| Hexo               | #3                                                     | EJS, Pug            |
| Gatsby             | #4                                                     | React.js            |

Eleventy supporte actuellement :

- HTML
- [Markdown](https://github.com/markdown-it/markdown-it)
- [Liquid](https://www.npmjs.com/package/liquidjs) (used by Jekyll)
- [Nunjucks](https://mozilla.github.io/nunjucks/)
- [Handlebars](https://github.com/wycats/handlebars.js)
- [Mustache](https://github.com/janl/mustache.js/)
- [EJS](https://www.npmjs.com/package/ejs)
- [Haml](https://github.com/tj/haml.js)
- [Pug](https://github.com/pugjs/pug)
- JavaScript Template Literals (ES2015)

### Flexibilité de l’arborescence de répertoires

Eleventy tient à ce que vous puissiez continuer à travailler avec l’arborescence
existante de votre projet. Il n'y a aucune obligation de mettre tous vos
fichiers de contenu dans un répertoire `source`, `content` ou `_posts` (sauf si
vous le désirez). Vous dites à Eleventy où sont vos fichiers et il se
débrouillera avec.

Un simple `eleventy` en ligne de commande va traiter les fichiers présents dans
le répertoire courant et générer un site dans un dossier `_site`. Vous pouvez
préciser votre choix à l’aide des options `--input` et `--output`.

#### Traite les fichiers du répertoire courant et génère un dossier `_site`

```sh
eleventy
```

#### Traite les fichiers du dossier `src` et génère un dossier `_gh_pages`

```sh
eleventy --input=src --output=_gh_pages
```

#### Traite les fichiers du répertoire courant et génère les fichiers au même endroit

```sh
eleventy --input=. --output=.
```

#### Transformer un fichier à la fois

Eleventy fonctionne aussi comme un petit utilitaire permettant de traiter un
seul fichier. Pour transformer le fichier `README.md` en `README.html`.

```sh
eleventy --input=README.md --output=.
```

## Pariez sur JavaScript

Pariez toujours sur JavaScript. JavaScript vous donne accès à `npm`.
L'écosystème d’npm est immense. Follement immense. Et il continue de gagner en
popularité. Selon [modulecounts.com](http://www.modulecounts.com/), npm propose
déjà trois fois plus de modules que son deuxième concurrent, Maven Central
(Java). Quand vous souhaitez ajouter une fonctionnalité, il y a de grandes
chances qu'il existe déjà un module npm pour ça.

| Générateur de site | Langage    | Nombre de modules         |
| ------------------ | ---------- | ------------------------- |
| Jekyll             | Ruby       | ~140,000 sur rubygems.org |
| Hugo               | Go         | ~20,000 sur Gopm          |
| Hexo               | JavaScript | ~580,000 sur npm          |
| Gatsby             | JavaScript | ~580,000 sur npm          |

## Eleventy n'est pas un framework JavaScript

Bien qu'Eleventy utilise JavaScript à travers node.js pour transformer les
fichiers de gabarit en fichiers de contenu, il est important de savoir que (par
défaut) le HTML généré n'inclut aucun fichier JavaScript client spécifique à
Eleventy côté client. C’est une des facettes fondamentales des intentions et des
objectifs du projet. Ce n'est pas un framework JavaScript. Nous voulons que
notre contenu soit découplé autant que possible d’Eleventy, et parce Eleventy
utilise des moteurs de templates indépendants d’Eleventy, cela nous permet de
nous rapprocher de cet objectif.

Il se peut que par la suite nous insérions un peu de JavaScript pour la partie
client spécifique à Eleventy, mais ce ne sera pas une option activée par défaut.
Bien entendu, libre à vous d’ajouter votre propre code JavaScript pour la partie
client, en fonction de votre projet et de vos besoins.

La moindre des choses à faire est de toujours analyser ce qui est produit en
sortie par les générateurs de site statique, surtout ceux qui sont très liés à
des frameworks JavaScript. La majorité des frameworks JavaScript incluent du
code JavaScript assez dogmatique côté client, même lorsque qu'ils utilisent le
rendu côté serveur.

Ces bibliothèques peuvent être lourdes et parfois bloquer le
[rendu du contenu critique](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/)
ou encore causer des congestions au niveau réseau dans le rendu de contenu
critique avec `preload`.

La performance c'est critique. Les fichiers statiques peuvent présenter un gain
de performance formidable. Pour maintenir ce niveau de performance, Eleventy
vous laisse le contrôle complet sur l’inclusion de code JavaScript dans vos
pages.

## Testez Eleventy !

J'espère que vous donnerez sa chance à Eleventy ! Installez-le !

```sh
npm install -g @11ty/eleventy
```

Vous trouverez des tutoriels sur [11ty.dev](https://www.11ty.dev/). Dites à Zach
ce que vous aimez ou que vous n'aimez pas !
[il adorerait avoir vos retours](https://twitter.com/zachleat).

Une chose sympa et facile à faire que vous pouvez faire pour soutenir le projet
est de le [marquer d’une étoile sur GitHub](https://github.com/11ty/eleventy).
Comme la liste gigantesque des générateurs de site statique de
[staticgen.com](https://www.staticgen.com/) est classée en fonction du nombre
d’étoiles sur GitHub, ça aiderait le projet à gagner pas mal de places au
classement. Merci !
