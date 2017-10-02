---
title: Les templates Hugo pour les designers WordPress
description: >
  Découvrons les bases du générateur de site Hugo en le comparant à son ancêtre
  bien connu WordPress.
image: /assets/images/hugo/header.jpg
source:
  title: Hugo Templates for WordPress Designers
  url: http://blog.teamtreehouse.com/hugo-templates-wordpress-designers
  author: Leon Barnard
---

{: .intro }
Loin de réinventer la roue, les gestionnaires de site statique comme Hugo
s'appuient sur des conventions existantes. On retrouve beaucoup de
fonctionnalités similaires entre un GSS comme Hugo et un CMS comme WordPress.
Suite à la refonte du [site de support et de documentation de
Balsamiq](https://support.balsamiq.com/), [Leon
Barnard](http://blog.teamtreehouse.com/author/leon_barnard) en a profité pour
pointer les similitudes des deux systèmes. Outre la concision de la syntaxe
d'Hugo, c'est l'occasion pour les designers WordPress d'apprécier la souplesse
apportée par la gestion de la structuration des contenus sous forme de dossiers
et de fichiers, ainsi que l'importance de la convention de nommage adoptée.

L'année dernière j'avais écris un article générique d'[introduction aux concepts
qui se cachent derrière les gestionnaires de site
statique](http://blog.teamtreehouse.com/getting-started-static-sites). Cette
fois j'aimerais aborder quelques spécificités de base d'un des générateurs les
plus populaires appelé [Hugo](https://gohugo.io/), en le comparant à son
illustre ancêtre WordPress.

## Introduction

Avant de commencer, je préfère préciser que je n'aborderai pas la migration de
WordPress vers Hugo. Un [outil
d'export](https://gohugo.io/tools/migrations/#wordpress) est mis à disposition
et de nombreux billets de blog décrivent comment d'autres ont migré.

Je vais davantage me concentrer sur les templates de thèmes utilisés, puisque
c'est l'un des plus gros ajustements à faire quand on plonge dans Hugo, qu'on
migre depuis WordPress ou qu'on parte de zéro.

La bonne nouvelle c'est qu'il y a pas mal de points communs entre Hugo et
WordPress dans la manière dont fonctionnent les templates et dans les
fonctionnalités offertes.

Quand j'ai écrit à propos d'Hugo l'année dernière, il lui manquait quelques-unes
des fonctionnalités qui rendent WordPress si populaire. Mais cela a énormément
évolué depuis (tout en restant incroyablement rapide) et Hugo offre maintenant
des fonctionnalités matures comme l'imbrication de templates ou les contenus
relatifs, et les nouvelles fonctionnalités continuent d'affluer en permanence.

{% include figure.html
url="http://blog.teamtreehouse.com/wp-content/uploads/2017/09/home-page-templating-example-952x480.png"
description="Édition d'un modèle de page pour Hugo" %}

## Fondamentaux des templates Hugo

La première chose à savoir à propos d'Hugo, c'est qu'il est écrit en langage Go.
Go n'est pas aussi connu que d'autres langages sur le Web, mais il gagne
rapidement en popularité. Treehouse propose [un aperçu du langage
Go](https://teamtreehouse.com/library/go-language-overview).

Si l'idée d'apprendre un nouveau langage de programmation représente pour vous
un _no-Go_ (huhu 😉 ) pour changer de gestionnaire de contenu, n'abandonnez pas
tout de suite, moi-même je ne sais pas programmer en Go et pourtant j'ai été
capable d'écrire des modèles Hugo sophistiqués pour le site de documentation de
Balsamiq, grâce à ma connaissance d'HTML et en passant en revue la
[documentation d'Hugo](https://gohugo.io/documentation/).

Laissez-moi vous convaincre en vous donnant vos premières leçons pour créer des
modèles pour Hugo.

### Une syntaxe différente, des fonctionnalités similaires

Dans WordPress, quand vous souhaitez afficher le contenu d'un article de blog ou
d'une page, vous écrivez cette ligne dans un modèle:

```php
<!--?php the_content(); ?-->
```

Dans Hugo c'est :

{% raw %}

```go
{{ .Content }}
```

{% endraw %}

Pas mal, non ? On pourrait même dire que c'est mieux. (Vous allez rapidement
vous habituer à ces doubles accolades et à ces points, mais vous allez devoir
dire adieu à ces drôles de points d'interrogation qui m'ont toujours fait douter
de ce que je faisais.)

Continuons, en mentionnant au passage que, comme en PHP, on peut mélanger le
HTML et le langage de templating d'Hugo.

Si vous avez déjà personnalisé un modèle WordPress, vous avez probablement écrit
ce genre de mélange d'HTML et de PHP:

```php
<a href="/"><?php bloginfo('name'); ?></a>
```

Ce code localise le nom du site et crée un lien vers la page d'accueil.
WordPress dispose d'une fonction appelée `bloginfo` à qui on passe le paramètre
`name` pour le récupérer.

Hugo, de son côté, utilise une variable nommée
[`.Site`](https://gohugo.io/variables/site/#site-variables-list) avec une
propriété appelée `.Title`. Le même code dans Hugo s'écrit ainsi:

{% raw %}

```go
<a href="/">{{ .Site.Title }}</a>
```

{% endraw %}

Là encore c'est également assez intuitif, non ?

J'espère que vous vous sentez plus serein maintenant. 🙂

Continuons sur notre lancée.

Le dernier exemple basique est l'affichage d'une liste d'articles ou de pages.
La structure générale est la même dans les deux systèmes : boucler sur les
articles et ajouter un élément de liste à puces pour chacun, en récupérant le
lien vers l'article et son titre.

Dans WordPress…

```php
<ul>
    <?php while (have_posts()) : the_post(); ?>
        <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
    <?php endwhile; ?>
</ul>
```

WordPress utilise une boucle PHP `while`, qu'on retrouve dans beaucoup de
langages de programmation. Hugo utilise une simple fonction appelée `range` qui
a le même objectif:

{% raw %}

```go
<ul>
    {{ range .Data.Pages }}
        <li><a href="{{ .Permalink }}">{{ .Title }}</a></li>
    {{ end }}
</ul>
```

{% endraw %}

Les éléments de liste se ressemblent beaucoup dans les deux langages, mais une
fois encore, celle d'Hugo a l'air un peu plus propre. Et comme il y a moins de
texte, c'est plus facile à lire.

## Prenons de la hauteur

Bon, maintenant que nous avons vu quelques-unes des différences syntaxiques
entre WordPress et Hugo, voyons maintenant les différents types de modèles.

### Les includes s'appellent les `partials`

Une des principales raisons d'utiliser un générateur de site plutôt que d'écrire
de simples fichiers HTML est de pouvoir réutiliser du code à travers les
différentes pages. Il est par exemple impensable de nos jours de copier-coller
le même code HTML pour l'entête et le pied-de-page dans chaque page.

La fonction `include()` PHP est, à elle seule, une des raisons pour laquelle le
langage est devenu si populaire dans le Web et pourquoi WordPress utilise PHP.

Vous pouvez utiliser la fonction `include()` dans WordPress, bien que maintenant
il existe des fonctions qui simplifient la récupération de parties spécifiques
communément utilisées dans la page. Pour inclure le pied de page global de page,
vous écrivez :

```php
<?php get_footer(); ?>
```

Hugo n'émet aucune hypothèse quant à la structure de votre page comme le fait
WordPress. Hugo utilise une fonction similaire à la fonction `include()` de PHP
appelée [`partial`](https://gohugo.io/templates/introduction/#includes) pour
insérer le contenu d'un fichier dans un autre.

Voilà comment ça marche :

{% raw %}

```go
{{ partial "footer.html" . }}
```

{% endraw %}

N'oubliez pas le point (`.`) à la fin, il désigne le contexte.
{: .notice .tip }

Notez que le nom du fichier partiel doit se trouver dans le répertoire
`partials`, un des sous-dossiers du dossier `layouts` où sont stockés les
fichiers des modèles.

C'est le bon moment pour vous présenter une des différences majeures entre
WordPress et Hugo concernant les modèles. Dans WordPress, la localisation des
éléments est en général cachée, la plupart des choses se trouve dans une base de
données ([comme on peut le voir sur cette
image](http://blog.teamtreehouse.com/wp-content/uploads/2016/06/31-02_php_scheme.png)).

Alors que les sites statiques sont simplement **des copies de fichiers sur votre
ordinateur**, ce qui vous permet de visualiser et de manipuler la structure de
votre site.

{% include figure.html
url="http://blog.teamtreehouse.com/wp-content/uploads/2017/09/layouts.png"
description="Un exemple typique du dossier <code>layouts</code> d'Hugo." %}

C'est un peu comme les systèmes d'exploitation ordinateur et mobile. Sur les
systèmes de fichiers d'un ordinateur, on peut parcourir l'arborescence de
fichiers (via le Finder, l'Explorateur, etc.) alors que les OS mobile essaient
de masquer cette hiérarchie et se contentent d'associer des fichiers à des
applications, vous évitant d'avoir à vous soucier de la structure interne.

Ici, Hugo se comporte comme un système d'exploitation d'ordinateur et WordPress
davantage comme un OS mobile. Ce n'est pas forcément une mauvaise chose, car
cela vous donne plus de transparence sur la navigation et la structure de votre
site web. Maintenant, c'est à vous de vous assurer de bien ranger les choses à
leur place.

Heureusement, Hugo fait preuve de consistence dans le nommage des fichiers.
C'est bien pratique que la fonction s'appelle `partial`, c'est une bonne manière
de se rappeler de placer vos fichiers partiels dans le dossier `partials`. 🙂

### Les modèles de section

Pour continuer de discuter des différences philosophiques entre Hugo et
WordPress, Hugo est beaucoup moins prescriptif quant à l'organisation de votre
site. Alors que WordPress utilise un modèle rigide d'articles et de pages, Hugo
est façonné à l'aide de "contenu" générique et de répertoires.

{% include figure.html
url="http://blog.teamtreehouse.com/wp-content/uploads/2017/09/pages.png"
description="Articles et pages dans WordPress" %}

{% include figure.html
url="http://blog.teamtreehouse.com/wp-content/uploads/2017/09/content-folder.png"
description="Répertoires de contenu dans Hugo" %}

L'hypothèse de base que fait Hugo à propos de votre contenu est que vous l'avez
organisé de manière délibérée. Une des conséquences est que la structure de
votre premier niveau d'arborescence vous permet de définir des comportements
différents à l'intérieur de chaque dossier.

La documentation d'Hugo explique que "bien qu'Hugo supporte l'imbrication de
contenu à tous les niveaux, les dossiers de **premier niveau sont spéciaux**".
Pour renforcer cette idée, les dossiers de premier niveau possèdent une
nomenclature à part entière dans Hugo, ils désignent une [**section de
contenu**](https://gohugo.io/content-management/sections/), ou `section` pour
faire plus court. L'analogie la plus proche dans le vocabulaire WordPress sera
de penser à une section d'Hugo comme à une catégorie WordPress.

Pour vous, cela signifie qu'Hugo facilite la création de différents modèles pour
chaque dossier("section") de contenu.

En terme d'arborescence de fichiers, nous passons du dossier `partials` au
dossier `section` situé lui aussi dans le dossier `layouts` d'Hugo. Une fois de
plus, la nomenclature des dossiers est importante.

Cela permet de créer un modèle de section, en le nommant comme le dossier de
contenu auquel il s'applique. Par exemple si vous avez un dossier de premier
niveau appelé "fonctionnalites", vous allez appeler votre modèle de section
"fonctionnalites.html". C'est aussi simple que cela.

Le truc chouette avec les modèles de section, c'est que vous n'avez rien de plus
à faire pour qu'ils soient pris en compte (contrairement aux fichiers partiels
que vous allez devoir explicitement référencer dans un modèle.) Si un fichier du
même nom qu'une section de contenu existe, Hugo va automatiquement utiliser ce
fichier comme modèle pour la section. S'il n'existe pas, il utilisera le modèle
par défaut.

Pour voir à quoi cela ressemble en pratique, jetons un œil à la structure du
[site de support de Balsamiq](https://support.balsamiq.com/) qui possède, entre
autres, des sections appelées “plugins”, “tutorials”, “sales”.

{% include figure.html
url="http://blog.teamtreehouse.com/wp-content/uploads/2017/09/sbc-content.png"
description="<a
href=\"https://github.com/balsamiq/support.balsamiq.com/tree/master/content\">Le
dossier content du site de support de Balsamiq</a>" %}

Dans le dossiers `section`, il y a des fichiers de modèles pour quelques-unes
d'entre elles, nommées en fonction du dossier de contenu (par exemple
"plugins.html").

{% include figure.html
url="http://blog.teamtreehouse.com/wp-content/uploads/2017/09/sbc-section.png"
description="<a
href=\"https://github.com/balsamiq/support.balsamiq.com/tree/master/themes/support-balsamiq-com/layouts/section\">Le
dossier section du site de support de Balsamiq</a>" %}

Chaque contenu qui se trouve dans un dossier et dont le nom correspond à l'un de
ces modèles de section se verra automatiquement appliqué ce modèle.

### Les shortcodes

Terminons avec une fonctionnalité sur laquelle Hugo et WordPress sont
entièrement d'accord. Hugo dispose d'une fonctionnalité familière bien utile
appelée… [shortcodes](https://gohugo.io/content-management/shortcodes/), bien
connue dans WordPress sous le nom de… `shortcodes`. 🙂

Un `shortcode` est un petit bout de texte, une sorte de raccourci pour un
portion de code plus importante.

Dans WordPress, vous écrivez un `shortcode` en l'entourant de crochets et en lui
passant des paramètres comme ceci:

```html
[gallery id="123" size="medium"]
```

Cela fonctionne presque de la même manière dans Hugo, la syntaxe diffère un peu.
On écrira le même shortcode ainsi dans Hugo :

{% raw %}

```go
{{ <gallery id="123" size="medium"> }}
```

{% endraw %}

Dans Hugo, chaque shortcode est un fichier de modèle HTML. Et où devez-vous
ranger ces fichiers ? Dans un dossier nommé `shortcodes` évidemment, vous vous
en doutiez.

Écrire vos propres shortcodes peut se révéler délicat - vous allez devoir
probablement récupérer les paramètres en écrivant des choses comme {% raw %}`{{
.Get 0 }}`{% endraw %} - mais écrire des [shortcodes pour
WordPress](https://codex.wordpress.org/Shortcode_API) n'est pas non plus une
partie de plaisir.

En pratique, vous allez vraisemblablement utiliser (ou peut-être personnaliser)
un shortcode existant, comme vous le faites dans WordPress. Hugo fournit
[quelques shortcodes bien pratiques par
défaut](https://gohugo.io/content-management/shortcodes/#use-hugo-s-built-in-shortcodes)
pour YouTube, Instagram, Twitter, etc.

Sur [le site de documentation de Balsamiq](https://docs.balsamiq.com/), nous
utilisons par exemple les shortcodes pour les messages d'alerte et
d'information, comme on peut le voir ici :

{% include figure.html
url="http://blog.teamtreehouse.com/wp-content/uploads/2017/09/alerts.png"
description="<a href=\"https://docs.balsamiq.com/\">Les messages
d'information et d'alerte dans la documentation de Balsamiq</a>" %}

[Ce thème pour
Hugo](https://themes.gohugo.io/theme/hugo-theme-learn/en/shortcodes/notice/)
présente quelques exemples sympas de ce qu'on peut faire avec des shortcodes en
pratique.

## La fin et le début

Dans cet article, nous avons mis en lumière quelques-unes des différences et des
similitudes entre WordPress et Hugo, ce qui, je l'espère, suffira à vous aider à
effectuer le changement de paradigme de l'un à l'autre.

Bien entendu, je suis loin d'avoir tout couvert. Hugo support aussi les tags
comme WordPress à l'aide des
[`taxonomies`](https://gohugo.io/content-management/taxonomies/) et les modèles
de contenu par défaut avec les
[`archetypes`](https://gohugo.io/content-management/archetypes/), mais vous
n'avez pas besoin d'être tout de suite (voire jamais) familier avec ces notions.

Une chose que j'ai remarqué dans l'évolution d'Hugo est qu'il devient **moins
ésotérique et beaucoup plus pratique** et fonctionnel dans ses réponses aux
besoins exprimés par les gens. Je vois ça comme une bonne chose et c'est
sûrement une des raisons pour laquelle Hugo est rapidement en train de gagner en
popularité.

Je me rappelle par exemple avoir passé des journées à essayer de comprendre
[cette explication des
taxonomies](https://gohugo.io/content-management/taxonomies/#example-taxonomy-movie-website)
au début. Alors que des fonctionnalités plus récentes comme les
[sections](https://gohugo.io/content-management/sections/) sont beaucoup plus
simples à appréhender.

Enfin, voici une liste d'excellentes ressources en anglais sur Hugo pour vous
aider dans votre périple. Si vous m'avez lu jusqu'ici c'est que vous avez au
moins envie d'en savoir un peu plus.

* [La documentation officielle d'Hugo](https://gohugo.io/documentation/).
* [Le forum officiel d'Hugo](https://discourse.gohugo.io/) – un bon endroit
  pour trouver des réponses à vos questions et débogguer votre code.
* [Les tutoriels vidéo de Giraffe Academy sur YouTube](https://www.youtube.com/playlist?list=PLLAZ4kZ9dFpOnyRlyS-liKL5ReHDcj4G3)
    – 23 videos !
* [Le thème “Learn” pour Hugo](https://themes.gohugo.io/theme/hugo-theme-learn/en)
  – Un bon endroit pour commencer à jouer.
* [D'autres thèmes pour Hugo](https://themes.gohugo.io/)
  – pour que vous n'ayez pas à commencer de zéro.
* [Un des nombreux billets de blog sur le passage de WordPress à Hugo](https://blog.philipphauer.de/moving-wordpress-hugo/).
* [Bien démarrer avec les sites statiques](http://blog.teamtreehouse.com/getting-started-static-sites)
  – mon article précédent sur les sites statiques.

Merci de m'avoir lu. Bonne génération de site !
