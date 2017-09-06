---
title: Un site ecommerce statique (très performant) avec Hugo
date: 2017-08-28 00:00:00 +02:00
description: 'Tutoriel : un site de ecommerce statique avec Hugo, Snipcart et Netlify
  (exemple et démo)'
image: https://snipcartweb-10f3.kxcdn.com/media/1173/toolbox.png
canonical_url: https://snipcart.com/blog/hugo-tutorial-static-site-ecommerce
source:
  title: 'Hugo Tutorial: How to Build & Host a (Very Fast) Static E-Commerce Site'
  url: https://snipcart.com/blog/hugo-tutorial-static-site-ecommerce
  author: Charles Ouellet
---

C'est fou tout ce qu'on peut faire avec un générateur de site, des APis et du
JavaScript. Et rien de mieux qu'un exemple parlant de mise en place d'une
boutique de e-commerce pour illustrer les possibilités qui vous sont offertes.
Dans cet exemple nous utiliserons le service [Snipcart](https://snipcart.com/)
pour la gestion du panier d'achat et [Hugo](https://gohugo.io/) pour générer le
site à la vitesse de l'éclair.
{: .intro }

> Pressé ? Passez directement au [tutoriel](#tutoriel) ou [à la démo et au code dispo sur GitHub](#demo-repo).

Il est temps de nous plonger à nouveau dans le monde en perpétuel mouvement de
la [JAMstack](https://frank.taillandier.me/2016/05/21/la-jamstack/) et du
développement web statique. Nos articles précédents sur la gestion d'un site
e-commerce avec des générateurs de site statique comme
[Middleman](https://snipcart.com/blog/static-site-e-commerce-integrating-snipcart-with-middleman)
et
[Jekyll](https://snipcart.com/blog/static-site-e-commerce-part-2-integrating-snipcart-with-jekyll)
ont eu pas mal de succès, alors pourquoi s'arrêter en si bon chemin ?

Mesdames et messieurs, aujourd'hui nous allons une fois de plus vous montrer
combien il est facile de configurer la partie e-commerce sur des sites
statiques. Et cette fois, nous allons le faire en vous proposant un tutoriel
complet pour [Hugo](https://gohugo.io/).

Dans ce tutoriel nous verrons :

1. Comment générer votre site statique avec le générateur de site Hugo,
2. Comment y intégrer ensuite facilement le panier d'achat de la plate-forme
   Snipcart,
3. Comment déployer votre site e-commerce sur Netlify.

Mais d'abord un petit mot sur l'outil central que nous allons utiliser pour
faire ceci.

## Hugo : un générateur de site statique super rapide

<figure markdown="1">
  ![Hugo]({{ "/assets/svg/hugo.svg" | relative_url }})
</figure>

Le nom **Hugo** peut véhiculer différents sens selon les personnes. Les grands
lecteurs penseront à l'auteur légendaire des Misérables. Les cinéphiles
penseront au petit garçon dans le film de Scorcese de 2011. Mais si vous êtes un
**développeur** (il y a de grandes chances que ce soit le cas si vous lisez ces
lignes), ça devrait plutôt vous évoquer ceci : un moteur de site statique
moderne et **rapide comme l'éclair**.

Écrit en [Go](https://golang.org/) par Steve Francia alias
[**spf13**](https://twitter.com/spf13) et Bjørn Erik Pedersen alias
[**Bep**](https://github.com/bep), Hugo se révèle être, d'après notre
expérience, une des manières les plus efficaces de générer, de gérer et de
mettre à jour des sites statiques modernes. Il s'installe facilement sur toutes
les plate-formes, de plus vous pouvez l'héberger n'importe où — nous vous
recommandons
[Netlify](https://www.netlify.com/blog/2016/09/21/a-step-by-step-guide-victor-hugo-on-netlify/)
comme nous le verrons tout à l'heure. Et les temps de génération sont
imbattables — environ ~1 ms par page. Si vous aimez la performance web comme
nous, vous allez à n'en pas douter adorer ce générateur de site en Go.

Aujourd'hui, nous allons voir comment utiliser Snipcart et Hugo pour réaliser
une boutique en ligne Star Trek sur un site statique. Pourquoi Star Trek me
direz-vous ? Parce que [nous l'avons déjà fait pour Star
Wars](https://snipcart.com/blog/integrating-snipcart-with-kirby-cms-to-enable-e-commerce).

> _Psst_: Si vous vous demandez encore ce que sont les générateurs de site
> statique et pourquoi il faut vous y intéresser, jetez-vous sur [l'intro
> d'Eduardo Bouças](https://davidwalsh.name/introduction-static-site-generators).

## Tutoriel Hugo : site, produits, modèles et déploiement {#tutoriel}

### 1. Installer Hugo et générer votre nouveau site web statique

Nous allons commencer par installer le générateur sur votre ordinateur et créer
un nouveau site web. Cela vous prendra peut-être 10 minutes en suivant la
[documentation pour démarrer avec
Hugo](https://gohugo.io/getting-started/quick-start/), ou juste **2 minutes** si
vous êtes aussi rapide que Dan Hersam.

Une fois que vous avez téléchargé [Hugo sur
GitHub](https://github.com/spf13/hugo/releases), l'installation est très rapide,
comme vous montre la
[documentation](https://gohugo.io/getting-started/installing#quick-install).
Concentrons-nous donc sur la création du nouveau site à l'aide d'Hugo.

Nous n'avons qu'à utiliser la ligne de commande prévue à cet effet:

```sh
hugo site new snipcart-hugo
```

#### Architecture

Cette commande va générer un squelette de base pour votre projet. Votre
répertoire devrait ressembler à ça :

```sh
│   config.toml
│
├───archetypes
├───content
├───data
├───layouts
├───static
└───themes
```

Les options de configuration se trouvent dans le fichier `config.toml`. Nous
n'aurons pas à nous plonger trop dedans vu que nous allons nous contenter de
faire au plus simple pour ce qui est du site.

Pas la peine de nous plonger dans les [rouages internes d'Hugo](https://gohugo.io/documentation/) ici.

En gros, dans ce tutorial, nous allons créer des fichiers dans le répertoire
`data` qui a pour but de stocker des données additionnelles qui peuvent être
utilisées lors de la génération du site.

Nous allons aussi ajouter quelques modèles dans le dossier `layouts`, l'endroit
où les modèles Hugo sont stockés par défaut.

Le dossier `static` peut être utilisé pour stocker des fichiers de type CSS,
JavaScript ou bien encore des images. Dans notre démo, nous ajouterons un
dossier `images` qui contiendra les images des produits.

Naturellement, il est préférable que vous soyez déjà un peu familiarisé avec la
documentation d'Hugo avant de vous attaquer à l'intégration complète de
Snipcart.

#### Les thèmes

Nous avons décidé de ne pas installer de thème particulier pour cette démo (nous
utiliserons un framework CSS pour mettre en forme notre site plus tard), mais il
existe plusieurs thèmes open source à disposition. [Cet
article](https://code.tutsplus.com/tutorials/make-creating-websites-fun-again-with-hugo-the-static-website-generator-written-in-go--cms-27319)
montre comment installer des thèmes pour votre site Hugo, peut-être voudrez-vous
y jeter un œil. Il explique aussi plus en détail la création basique de site
avec Hugo (Hello World, Blog, Galerie Photo, etc.).

Vous pouvez aussi aller parcourir l'annuaire officiel de [quelques-uns des meilleurs thèmes pour Hugo](http://themes.gohugo.io/).

### 2. Créer un fichier JSON statique pour les produits de notre boutique

Okay, passons donc à la configuration de nos produits : un dictionnaire Klingon
et un pistolet laser. Nous **aurions pu** utiliser un CMS headless ou statique
pour cette partie (comme nous l'avons déjà
[fait](https://www.siteleaf.com/blog/jamstack-ecommerce/)
[auparavant](https://www.contentful.com/blog/2016/02/10/snipcart-middleman-contentful/))

Vu le modeste objectif de cet article, nous allons simplement créer un fichier
`.json` statique pour référencer nos produits.

Hugo propose une super fonction appelée `getJSON` qui est bien utile lorsque vos
données proviennent d'un CMS Headless ou de n'importe quelle API qui retourne du
JSON. Ici, comme notre fichier JSON est directement stocké dans le dossier
`data`, nous aurions pu nous contenter d'utiliser `.Site.Data.Products` à place,
mais nous voulions vous monter qu'il était possible d'interagir avec des APIs
externes.

Nous allons devoir ajouter un nouveau fichier `products.json` dans le dossier
`data`.

```json
[{
    "id": "1",
    "name": "Dictionnaire Klingon",
    "price": 34.87,
    "image": "/images/dictionary.jpg",
    "description": "nIvbogh tlhIngan dictionary qaStaHvIS veng SuvwI'",
    "url": "http://snipcart-hugo.netlify.com"
}, {
    "id": "2",
    "name": "Phaser du Captain Kirk",
    "description": "The Original Series Phaser comprises a small, hand-held Type I Phaser, which slots into a larger Type II Phaser body with a removable pistol-grip.",
    "price": 145.98,
    "image": "/images/phaser.png",
    "url": "http://snipcart-hugo.netlify.com"
}]
```

### 3. Genération des modèles pour Hugo

La prochaine étape consiste à configuer les différents modèles pour notre site.
Le plus important est le modèle d'en-tête où nous ajouterons [les dépendances
pour Snipcart](https://docs.snipcart.com/getting-started/installation).

Nous allons aussi créer un modèle principal dans lequel nous bouclerons sur nos
produits pour en afficher une courte description et où nous ajouterons un bouton
Snipcart "Ajouter au panier".

Remarque: les produits Snipcart sont définis directement dans le code HTML à
l'aide de simples attributs data. [Plus de détails
ici](https://docs.snipcart.com/configuration/product-definition).
{: .info }

Dans le répertoire `layouts` nous allons ajouter un nouveau modèle
**index.html**. Ce fichier sera celui utilisé par défaut et sera le premier à
être généré par Hugo.

#### layouts/index.html

{% raw %}

```go
{{ partial "header.html" . }}

{{ $products := getJSON "/data/products.json" }}

<section class="container">
    <div class="row">
        {{ range $products }}
            {{ partial "product.html" . }}
        {{ end }}
    </div>
</section>

{{ partial "footer.html" }}
```

{% endraw %}

Nous avons mentionné la méthode `getJSON` un peu plus haut, nous allons
l'utiliser dans notre modèle de page `index.html`.

Nous allons récupérer les produits depuis le fichier JSON que nous avons créé un
peu plus tôt, puis nous allons boucler sur chaque produit pour appeler le
fichier de modèle partiel `product.html` qui va être chargé du rendu.

Comme vous pouvez voir, nous importons aussi les fichiers  **header.html**,
**footer.html** et **product.html**. Nous verrons ce qu'ils contiennent en
détail.

Avant d'aller plus loin, allons d'abord dans le répertoire `layouts` et créons
un dossier `partials`. Si les fichiers partiels ne se trouvent pas dans ce
dossier, Hugo ne sera pas capable de les trouver lorsque nous les déclarerons à
l'aide de la syntaxe {% raw %}`{{ partial ... }}`{% endraw %}. L'autre chose
importante à savoir est pourquoi nous avons mis un point `.` après
`product.html`. Cela signifie que nous incluons les données du produit courant
dans le modèle `product.html`.

#### layouts/partials/header.html

Comme nous vous l'avons déjà dit, ce fichier est le plus important. C'est un
simple fichier d'entête HTML qui va appeler les dépendances pour Snipcart.
Ajoutez-le dans le dossier `layouts/partials`.

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en-us">
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">

  <title> Intégration de Snipcart dans Hugo! </title>

  <link id="snipcart-theme" type="text/css" href="https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>

<body>
  <div class="container">
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">Star Trek shop</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li class="snipcart-summary">
            <a href="#" class="snipcart-checkout">
              View cart (<span class="snipcart-total-items">0</span>)
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
```

Nous avons choisi d'utiliser le framework
[MaterializeCSS](http://materializecss.com) pour cette démo, mais vous pouvez
bien entendu utiliser celui de votre choix. Celui-ci est assez simple à intégrer
et fournit suffisament de composants pour mettre en place quelque chose de pas
trop mal.

Vous pouvez également voir que les fichiers requis par Snipcart sont appelés
dans ce fichier et que nous avons ajouté un [raccourci vers le panier
d'achat](https://docs.snipcart.com/getting-started/the-cart#adding-a-cart-summary)
pour que les client puissent accéder à leur commande en cours.

Parfait ! Prochaine étape : le modèle partiel de pied de page pour terminer la
structure de base de notre fichier HTML.

#### layouts/partials/footer.html

```html
        <div class="container">
            <footer class="page-footer">
                <div class="footer-copyright">
                    <div class="container">
                        Snipcart integration with Hugo
                    </div>
                </div>
            </footer>
        </div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>

        <script type="text/javascript" id="snipcart" src="https://cdn.snipcart.com/scripts/2.0/snipcart.js" data-api-key="M2E5YjA3NjMtYzRiYS00YzVjLWEyYWYtNDY5ZDI0OWZhYjg5"></script>

        <script>
            Snipcart.execute('registerLocale', 'en', {
                powered_by:
                "HoS 'ej pong ngaQ "
            });
        </script>
    </body>
</html>
```

Enfin, nous allons devoir générer le modèle qui va afficher le détail d'un
produit. Appelons le **product.html**.

#### layouts/partials/product.html

{% raw %}

```html
<div class="col s6">
    <h2 class="header">{{ .name }}</h2>
    <div class="card horizontal">
        <div class="card-image">
        <img src="{{ .image }}">
        </div>
        <div class="card-stacked">
        <div class="card-content">
            <p>{{ .description }}</p>
        </div>
        <div class="card-action">
            <button
                class="snipcart-add-item waves-effect waves-light btn"
                data-item-id="{{ .id }}"
                data-item-name="{{ .name }}"
                data-item-price="{{ .price }}"
                data-item-url="{{ .url }}">
                    <i class="material-icons right">shopping_cart</i>
                    Add to cart
            </button>
        </div>
        </div>
    </div>
</div>
```

{% endraw %}

Puisque nous passons le produit en cours dans notre modèle **index.html**, nous
pouvons maintenant accéder à tous les champs des données de notre fichier
`JSON`. Ici, je les utilise pour renseigner les champs nécessaires pour le
bouton d'achat Snipcart et pour ajouter le titre et la description du produit.

Il est temps de lancer Hugo et de regarder à quoi ressemble ce site
fantaisiste !

```sh
hugo server
```

(Je garde ma capture d'écran de notre boutique Star Trek pour la fin, tenez-vous
prêts)

### 4. Configuration du déploiement d'Hugo sur Netlify

Dernier point et non des moindres : héberger tout ça !

Nous avons choisi de déployer notre démo avec Hugo à l'aide de l'extraordinaire
service de nos amis de chez [Netlify](https://netlify.com).

Avant de toucher à quoi que ce soit dans Netlify, je vous suggère de créer un
fichier `.gitkeep` dans votre dossier `content`. Ce dossier est requis par
Netlify pour générer le site. Et comme nous n'avons pas déposer de fichiers
dedans, Git ne va pas le prendre en compte.

Une fois le fichier `.gitkeep` ajouté, vous pouvez utiliser l'interface de
Netlify pour déployer facilement votre site en quelques secondes. Voici un
aperçu de la configuration du déploiement de notre boutique
Star Trek Old School :

![hugo-website-deployment-netlify](https://snipcart.com/media/10150/hugo-website-deployment-netlify.png)

Netlify va récupérer automatiquement le code depuis GitHub et déployer votre
site web.
Et voilà !

![hugo-tutorial-klingon](https://snipcart.com/media/10149/hugo-tutorial-klingon.jpg)

## Démo de site Hugo et dépôt GitHub {#demo-repo}

Bon, il est temps de vous monter notre chef-d'œuvre :

![static-ecommerce-shop-hugo-website-tutorial](https://snipcart.com/media/10151/static-ecommerce-shop-hugo-website-tutorial.png)

Alors c'est classe non ? Maintenant allez voir le site et le code source par
vous-même :

* Voir [Demo Snipcart + Hugo](http://snipcart-hugo.netlify.com)
* Voir [Dépot GitHub](https://github.com/snipcart/snipcart-hugo-integration)

## Conclusion et ressources supplémentaires

Bon, je crois que notre travail est terminé mes amis.

Au cas où vous vous demanderiez si le résultat final est assez rapide, vous
pouvez utiliser un autre outil assez cool de Netlify :
[Testmysite.io](https://testmysite.io). Notre démo obtient un score de 87/100,
c'est pas si mal.

Au fait, si vous développez un site JAMstack pour un client, vous voudrez peut
être effectuer un suivi de sa performance à l'aide de [Speedtracker, un outil
open source](https://speedtracker.org/). Les équipes techniques seront peut-être
intéressées par [ce workflow de publication pour
Hugo](https://www.keybits.net/post/publishing-workflow-for-teams-using-static-site-generators/).

### Pour les clients

Vous pensez que devoir gérer des fichiers de contenu statiques en Markdown, ça
ne va pas être possible pour vos clients ? Il existe des outils bien pratiques
pour gérer le contenu d'un site Hugo. Nous vous invitons à ajouter un des CMS
statiques suivants :

* [Forestry.io](https://forestry.io/)
* [DatoCMS](https://www.datocms.com/)
* [Netlify CMS](https://www.netlifycms.org/)
* [Appernatic](https://appernetic.io/)

Pour une revue plus détaillée des outils à destination des clients, des limites
et des bénéfices, reportez-vous à ce [guide
complet](https://snipcart.com/blog/jamstack-clients-static-site-cms).

Hugo est vraiment plaisant à utiliser. Sa documentation est à jour et sa vitesse
quasi-instantanée a le don de faire sourire l'ingénieur en moi à chaque fois que
je génère mon site. Mettre en place ce site Hugo avec Snipcart m'a pris environ
deux heures en tout, en comptant la mise en forme du site avec MaterializeCSS et
le déploiement sur Netlify.

C'est toujours agréable de voir à quel point un service de panier d'achat en
HTML/JS comme Snipcart s'intègre parfaitement avec des générateurs statiques
modernes. :smile:

Il est maintenant temps d'arrêter de lire ce blog et d'aller fabriquer quelque
chose de génial.
