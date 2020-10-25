---
title: "Un site statique avec des composants à l’aide de Nunjucks"
description: "Apprenez à construire un site statique avec des composants à l’aide d’un préprocesseur HTML."
date: 2018-03-13T20:21:48+01:00
images:
  - https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/w_1200,c_fit,co_white,g_north_west,x_80,y_120,l_text:poppins_80_ultrabold_line_spacing_-30:Un%20site%20statique%20avec%20des%20composants%20%C3%A0%20l%E2%80%99aide%20de%20Nunjucks/jamstatic/twitter-card.png
source:
  author: "Chris Coyier"
  title: "Building A Static Site With Components Using Nunjucks"
  url: "https://www.smashingmagazine.com/2018/03/static-site-with-nunjucks/"
---

{{< intro >}}

La philosophie de la génération de site statique à l’aide d’un langage de
templating et d’un langage de balisage léger comme Markdown continue d’être
déclinée à l’envi. Le même principe est repris ici par Chris Coyier, le créateur
de CodePen que les développeurs front connaissent bien, pour la création
d’[un site qui liste quelques-unes des possibilités offertes](https://thepowerofserverless.info)
par ce que nous appelons plus globalement la [Jamstack](/categories/jamstack) et
qui est ici désigné sous le nom de _serverless_ — une des nombreuses composantes
de ces architectures découplées.

Un cas d’étude très simple qui pourrait vous donner des idées. Aucune
configuration puisque c'est un service en ligne payant qui est utilisé ici, mais
on pourrait tout aussi bien utiliser le générateur open source
[Eleventy](/categories/eleventy) par exemple, qui utilise aussi
[Nunjucks](https://mozilla.github.io/nunjucks/).

{{< /intro >}}

---

Il est de plus en plus courant de nos jours de bâtir des sites avec des
composants et c'est une très bonne idée. Plutôt que de construire les pages les
unes après les autres, nous développons un système de composants (comme un
formulaire de recherche, un carte d’article, un menu, un pied de page) et nous
assemblons le site avec ces composants.

Des frameworks JavaScript comme React ou Vue reposent en grande partie sur ce
principe. Mais ce n'est pas parce que vous n'utilisez pas de JavaScript côté
client pour développer votre site que vous devez renoncer à l’idée d’utiliser
des composants. En utilisant un préprocesseur HTML, nous pouvons monter un site
statique et bénéficier également de le possibilité d’abstraire notre site et son
contenu sous forme de composants réutilisables.

Les sites statiques font fureur actuellement, et à juste titre, car ils sont
rapides, sécurisés et pas cher à héberger. Croyez-le ou pas mais même Smashing
Magazine est un site statique !

Regardons de plus près un site que j'ai monté récemment à l’aide de cette
technique. J'ai utilisé [CodePen Projects](https://codepen.io/pro/projects) pour
le développer qui supporte [Nunjucks](https://mozilla.github.io/nunjucks/) comme
préprocesseur, ce qui est parfait pour faire le job.

### Un site de quatre pages avec un entête, une navigation et un pied de page consistants

[C’est un microsite](https://thepowerofserverless.info/). Nul besoin de passer
par CMS capable de gérer des centaines de pages, ni de JavaScript pour ajouter
de l’interaction. Par contre il faut qu'une poignée de pages partage la même
mise en page.

![Un haut et un pied de page consistants sur toutes les pages](https://res.cloudinary.com/jamstatic/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_960/v1603621914/jamstatic/static-site-nunjucks-image1.jpg)

HTML n'apporte pas encore de réponse à ce problème. Nous avons besoin de pouvoir
faire des _imports_. Les langages comme PHP permettent cela avec
`<?php include "header.php"; ?>`, mais PHP n'est pas disponible (à dessein) chez
les hébergeurs de sites statiques et HTML ne peut encore rien pour nous.
Heureusement nous pouvons préprocesser nos inclusions à l’aide d’un langage de
templating comme [Nunjucks](https://mozilla.github.io/nunjucks/).

![L'import est possible dans les langages comme PHP](https://res.cloudinary.com/jamstatic/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_960/jamstatic/static-site-nunjucks-image2.png)

Cela fait parfaitement sens ici de créer un gabarit de page, qui inclus des
morceaux de HTML pour le haut de page, la navigation et le pied de page. Le
concept de blocs de Nunjucks nous permet d’insérer du contenu à cet endroit
lorsque nous utilisons le gabarit de page.

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Power of Serverless</title>
  <link rel="stylesheet" href="/styles/style.processed.css" />
</head>

<body>
  {% include "./template-parts/_header.njk" %} {% include
  "./template-parts/_nav.njk" %} {% block content %} {% endblock %} {% include
  "./template-parts/_footer.njk" %}
</body>
```

Vous remarquerez que les fichiers inclus sont commencent par un tiret bas et
possèdent l’extension `.njk`. Ce n'est pas obligatoire, ils pourraient se nommer
`header.html` ou `icons.svg` mais ils sont nommés ainsi car premièrement c'est
une convention de nommage qu'on rencontre souvent pour les fichiers partiels.
Dans CodePen, cela signifie qu'ils ne seront pas compilés tous seuls, et
deuxièmement utiliser l’extention `.njk` nous permettra de faire plus de choses
avec Nunjucks si besoin.

Rien de spécial dans ces morceaux de fichiers. Ce sont simplement des petits
bouts de HTML destinés à être utilisés sur toutes nos pages.

```html
<footer>
  <p>
    Ceci est un simple pied de page, les gens. Circulez, y’a rien à voir.
  </p>
</footer>
```

De cette manière, un simple changement dans ces fichiers et il sera appliqué sur
toutes nos pages.

### Utiliser un seul gabarit pour nos pages

Maintenant nous pouvons créer un fichier pour chacune de nos pages. Commençons
quand même par `index.njk` , qui sera automatiquement traité pour créer un
fichier `index.html` dans CodePen project à chaque enregistrement.

![Démarrer avec un fichier index.njk](https://res.cloudinary.com/jamstatic/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_960/jamstatic/static-site-nunjucks-image3.png)

Voici ce que nous pourrions écrirer dans le fichier `index.njk` pour appliquer
le gabarit de page et ajouter du contenu dans le bloc principal :

```twig
{% extends "_layout.njk" %}

{% block content %}
<h1>Bonjour, monde!</h1>
{% endblock %}
```

Ça suffit pour avoir une page d’accueil fonctionnelle. Sympa ! On peut faire
pareil pour chacune des autres pages, le contenu du bloc sera simplement
différent, et nous aurons un petit site de quatre pages facile à maintenir.

![Le fichier index.njk est transformé en index.html](https://res.cloudinary.com/jamstatic/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_960/jamstatic/static-site-nunjucks-image4.png)

Entre nous soit dit, je ne suis pas persuadé que ces petits morceaux
réutilisables soient des _composants_ à proprement parlé. Nous sommes simplement
efficients et nous découpons notre gabarit en petits morceaux. Je pense qu'un
composant est plutôt quelque chose qui accepte des données en entrée et génère
une version unique de lui-même avec ces données. Nous allons y venir.

### Rendre la navigation active

Maintenant que nous avons des morceaux de HTML répétés à l’identique sur nos
pages, pouvons-nous appliquer un style CSS unique aux entrées indiviudelles de
la navigation pour identifier la page courante ? Nous pourrions le faire avec
JavaScript en regardant la valeur retournée par `window.location` par exemple,
mais nous pouvons nous passer de JavaScript pour cela. Le truc c'est d’ajouter
une `class` unique pour chaque page sur l’élément `<body>` et de la styler avec
CSS.

Dans notre fichier `_layout.njk` nous allons générer un nom de classe à l’aide
d’une variable :

```html
<body class="{{ body_class }}"></body>
```

Et avant d’appliquer le gabarit sur chaque page, nous définissons cette variable
:

```html
{% set body_class = "home" %} {% extends "_layout.njk" %}
```

Imaginons que notre navigation soit structurée de la sorte :

```html
<nav class="site-nav">
  <ul>
    <li class="nav-home">
      <a href="/"> Home </a>
      …
    </li>
  </ul>
</nav>
```

Nous pouvons maintenant cibler ce lien et lui appliquer un style spécifique en
écrivant :

```css
body.home .nav-home a,
body.services .nav-services a {
  /* continue matching classes for all pages… */
  /* unique active state styling */
}
```

![Styler les liens de navigation avec une classe active](https://res.cloudinary.com/jamstatic/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_960/jamstatic/static-site-nunjucks-image5.gif)

_Oh, c'est quoi ces icônes ?_ Ce sont simplement des fichiers `.svg` déposés
dans un dossier et inclus de la sorte :

```twig
{% include "../icons/cloud.svg" %}
```

Cela me permet de les styler ainsi :

```css
svg {
  fill: white;
}
```

En partant du principe que les éléments SVG du fichier n'ont pas déjà un
attribut `fill` de défini.

### Rédiger du contenu en Markdown

La page d’accueil de mon site affiche un gros bloc de contenu. Je pourrais
écrire et maintenir cela en HTML, mais il est parfois bon de
[laisser ce genre de chose à Markdown](http://mediatemple.net/blog/tips/you-should-probably-blog-in-markdown/).
Markdown est plus léger et un peu plus lisible lorsqu'il y a beaucoup de texte.

Rien de plus simple dans CodePen Projects. Je crée un fichier avec l’extension
`.md` qui sera automatiquement transformé en HTML avant d’être inclus dans le
fichier `index.njk`.

![Les fichiers Markdown sont transformés en HTML dans CodePen Projects](https://res.cloudinary.com/jamstatic/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_960/jamstatic/static-site-nunjucks-image6.gif)

```html
{% block content %}
<main class="centered-text-column">{% include "content/about.html" %}</main>
{% endblock %}
```

### Développer de vrais composants

Partons du principe que les composants sont des modules réutilisables à qui on
injecte des données lors de leur création. Dans des frameworks comme Vue, vous
utiliseriez des
f[ichiers uniques par composants](https://vuejs.org/v2/guide/single-file-components.html),
qui sont des morceaux isolés de HTML modelé, de CSS au périmètre limité et de
JavaScript spécifique au composant. C’est super cool, mais notre microsite n'a
pas besoin de quelque chose d’aussi sophistiqué.

Nous avons besoin de créer des "cartes" qui utilisent un modèle simple, on peut
par exemple faire quelque chose comme :

![Créer des composants réutilisables à l’aide de modèles](https://res.cloudinary.com/jamstatic/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_960/jamstatic/static-site-nunjucks-image7.png)

Pour créer un tel composant dans Nunjucks, il faut utilise ce qu'on appelle des
[Macros](https://mozilla.github.io/nunjucks/templating.html). Les Macros sont
d’une simplicité exquise. C’est comme **des fonctions pour HTML** !

```html
{% macro card(title, content) %}
<div class="card">
  <h2>{{ title }}</h2>
  <p>{{ content }}</p>
</div>
{% endmacro %}
```

Puis vous les appelez comme bon vous semble :

```html
{{ card('My Module', 'Lorem ipsum whatever.') }}
```

L'idée générale est de **séparer les données et le balisage**. Cela nous donne
des bénéfices concrets et assez clairs :

1. Si nous devons changer le HTML, nous pouvons le faire dans la macro et le
    changement sera reporté partout où la macro est utilisée.

2. La donnée n'est pas mélangée avec le balisage

3. La donnée pourrait venir de n'importe où ! Nous pouvons passer la donnée
    directement lors de l’appel comme nous l’avons fait ci-dessus. Ou bien nous
    pouvons référencer des données en JSON et boucler dessus. Je suis sûr qu'on
    pourrait mettre en place un système dans lequel des données JSON proviennent
    d’un [CMS headless]({{< relref "cms-headless.md" >}}), d’un processus de
    génération, d’une fonction serverless, d’une tâche cron ou de ce que vous
    voulez.

Maintenant que nous avons juste ce dont nous avons besoin, des cartes répétables
qui combinent des données et du balisage :

![Le HTML vient de la macro, les données peuvent venir de n'importe où](https://res.cloudinary.com/jamstatic/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_960/jamstatic/static-site-nunjucks-image8.png)

### Créer autant de composants que vous voulez

Vous pouvez partir de ce principe et l’appliquer à l’envi. Imaginez par exemple
que Bootstrap est essentiellement des bouts des CSS qui suivent des patrons en
HTML qui définissent leur utilisation. Vous pourriez transformer tous les
patrons du framework en macro et les appeler en fonction de vos besoins. L'idée
est celle d’un
[framework de composants](https://css-tricks.com/componentizing-a-framework/).

Vous pouvez imbriquer les composants si ça vous chante, et tendre vers quelque
chose qui ressemble à la philosophie du
[design atomique](http://bradfrost.com/blog/post/atomic-web-design/).

Nunjucks offre également une couche de logique, qui fait que vous pouvez créer
des composants conditionnels et des variations en passant différents paramètres.

[Dans le petit site que j'ai crée](https://thepowerofserverless.info/), j'ai
créé une autre macro pour la section idées du site car les données utilisées et
le design de la carte sont légèrement différents.

![Vous pouvez créer autant de composants que vous voulez](https://res.cloudinary.com/jamstatic/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_960/jamstatic/static-site-nunjucks-image9.png)

### Un avis rapide sur les sites statiques

Si la plupart des sites pourraient bénéficier d’une architecture à base de
composants, tous les sites ne sont pas faits pour être statiques. Je travaille
sur beaucoup de sites pour lesquels utiliser un langage côté serveur est
approprié et utile.

Un de mes sites, [CSS-Tricks](https://css-tricks.com/), propose des trucs comme
un compte utilisateur avec un système de permissions complexe : forums,
commentaires, ecommerce. Bien que toutes ces fonctionnalités n'empêchent pas de
travailler en statique, je suis souvent bien content d’avoir une base de données
et des langages côté serveur pour travailler. Cela me permet de développer ce
sont j'ai besoin et de tout avoir au même endroit.

### Allez de l’avant et passer au statique

Rappelez-vous qu'un des bénéfices de développer le site comme nous l’avons fait
dans cet article est qu'au final nous obtenons quelques fichiers statiques.
Faciles à héberger, performants et sécurisés. Pourtant, nous avons pu travailler
de manière sympa et efficace. Ce site sera simple à mettre à jour par la suite…

- Le projet final est un microsite nommé _Le pouvoir du Serverless pour les
  développeurs Front-End_ (<https://thepowerofserverless.info/>).

- L'hébergement de fichier statique fait partie selon moi du mouvement
  serverless.

- Tout le code est visible (et vous pouvez même en faire une copie pour vous)
  [directement dans CodePen](https://codepen.io/chriscoyier/project/editor/ZepgLg).
  Il est maintenu, généré et
  [hébergé](https://blog.codepen.io/projects/custom-domains/) entièrement sur
  CodePen à l’aide de [CodePen Projects](https://codepen.io/pro/projects).

- CodePen Projects s'occupe de toute la partie
  [Nunjucks](https://mozilla.github.io/nunjucks/) dont nous avons parlé ici,
  ainsi que de la compilation Sass et de l’hébergement des images, que j'ai
  utilisé pour le site. Vous pourriez faire la même chose avec par exemple un
  process de génération basé sur Gulp voire Grunt par exemple.
  [Voici un modèle de départ pour un tel projet](https://github.com/ericmotil/gulp-nunjucks-sass)
  que vous pourriez utiliser.
