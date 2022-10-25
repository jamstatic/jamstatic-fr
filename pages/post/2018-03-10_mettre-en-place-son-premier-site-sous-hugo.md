---
title: "Mettre en place son premier site sous Hugo"
description: Créer un site statique fonctionnel sous Hugo en moins de 30 minutes
date: 2018-03-10T14:57:51+01:00
author: frank
categories:
  - hugo
source:
  author: Chris Macrae
  title: "Up & Running With Hugo Part I: Building Your First Site"
  url: https://forestry.io/blog/up-and-running-with-hugo/
---
:::intro
Pour créer un nouveau projet avec Hugo, [Forestry](https://forestry.io) propose
un kit de démarrage en libre téléchargement. Que vous ayez déjà utilisé le
générateur de site statique Hugo ou pas, ce kit est intéressant, car il propose
une configuration complète et un workflow de développement moderne basé sur les
outils de l’écosystème de `npm`.
[Chris Macrae](https://twitter.com/chrisdmacrae) nous montre comment s'en servir
pour créer votre premier site en moins de 30 minutes.
:::

[Hugo](https://gohugo.io), le générateur de site statique écrit en Go, a pris la
communauté de vitesse. Il présente tous les avantages d’un générateur de site
statique — 100% flexible, sécurisé et rapide — mais il vole également la vedette
quand on
[compare ses performances avec celles de Jekyll](https://forestry.io/blog/hugo-vs-jekyll-benchmark/).
Le site de [Forestry.io](https://forestry.io) est d’ailleurs développé avec
Hugo.

Nous allons voir comment configurer Hugo sur votre ordinateur, comment installer
et personnaliser un thème, en ajoutant nos propres fichiers CSS et JavaScript.

Quelle différence avec le guide de démarrage rapide de la documentation d’Hugo ?
Nous allons utiliser
[notre kit de démarrage](https://github.com/forestryio/hugo-boilerplate)
régulièrement mis à jour qui ajoute un workflow de développement moderne à Hugo.

**Sommaire**

[toc]

## 1. Configurer Hugo

Pou commencer, clonez ou
[téléchargez notre kit de démarrage pour Hugo](https://github.com/forestryio/hugo-boilerplate/archive/master.zip "Téléchargez depuis GitHub"),
et décompressez l’archive quelque part sur votre ordinateur. Vous avez aussi
besoin de [Node.js](https://nodejs.org) et d’[NPM](https://www.npmjs.com/), il
vous suffit de suivre les indications sur la
[page de téléchargement de Node](https://nodejs.org/fr/download/) si vous ne les
avez pas déjà installés.

Vous bénéficiez ainsi automatiquement d’une structure de départ pour Hugo. Dans
notre kit, elle est stockée dans le dossier `hugo`. À l’intérieur se trouvent
divers dossiers qui abritent le contenu de votre site, les gabarits de page et
les fichiers CSS, JS, images, etc. L'arborescence de la structure de base
ressemble à ceci — j'ai laissé quelques fichiers et dossiers de côté de façon à
ce que ce soit plus clair :

```sh
.
├── hugo/                  // Le site Hugo, avec les fichiers de contenu, de données, statiques.
|   ├── .forestry/         // rassemble les fichiers de configuration pour Forestry.io
|   ├── content/           // Tout le contenu du site est stocké ici
|   ├── data/              // Les fichiers de données du site au format TOML, YAML ou JSON
|   ├── layouts/           // Vos modèles de page
|   |   ├── partials/      // Les fichiers partiels réutilisables de votre site
|   |   ├── shortcodes/    // Les fichiers shortcodes de votre site
|   ├── static/            // Les fichiers statiques de votre site
|   |   ├── css/           // Les fichiers CSS compilés
|   |   ├── img/           // Les images du site.
|   |   ├── js/            // Les fichiers JS compilés
|   |   └── svg/           // Les fichiers SVG vont ici
|   └── config.toml        // Le fichier de configuration d’Hugo
└─── src/
     ├── css               // Les fichiers source CSS/SCSS à compiler vers /css/
     └── js                // Les fichiers source JS à compiler vers /js/
```

Pour démarrer le projet, ouvrez une fenêtre de terminal et positionnez-vous dans
le dossier qui contient la structure de départ (`hugo-boilerplate` par défaut) :

`cd chemin/vers/hugo-boilerplate/`

Installez ensuite toutes les dépendances du projet en lançant :

`npm install`

Pour lancer le serveur de développement et ouvrir le site dans votre navigateur,
lancez simplement :

`npm start`

## 2. Configurer votre site

Nous allons commencer par ajouter de nouveaux contenus au site. Pour ce faire,
nous allons devoir mettre à jour le contenu présent dans le dossier
`hugo/content`.

### Mettre à jour un article

Commencer par mettre à jour l’exemple d’article fourni dans notre structure de
départ. Ouvrez le fichier `hugo/content/posts/example.md` dans votre éditeur de
texte. Il est composé d’un en-tête _front matter_ avec un champ titre et d’un
texte d’exemple au format markdown.

````markdown
---
title: "Bienvenue dans Hugo !"
---

Vous trouverez la source de cet article dans le répertoire `content/posts`.

Pour ajouter un nouvel article, placez un nouveau fichier dans le dossier
`content/posts` en respectant la nomenclature `titre-de-l-article.md` et
ajoutez les métadonnées nécessaires dans l’en-tête de page Front Matter.
Jetez un œil au fichier source de cet article pour voir comment ça marche.

<!--more-->

Hugo also offers powerful support for code snippets:

    ```go
    package main
    import "fmt"
    func print_hi(name string) {
      fmt.Println("Hi, ", name)
    }

    func main() {
      print_hi("Tom")
    }
    //=> prints 'Hi, Tom' to STDOUT.
    ```

Check out the [Hugo docs][hugo-docs] for more info on how to get the most
out of Hugo. File all bugs/feature requests at [Hugo’s GitHub
repo][hugo-gh]. If you have questions, you can ask them on [Hugo
Community][hugo-community].

[hugo-docs]: https://gohugo.io/documentation/
[hugo-gh]: https://github.com/gohugoio/hugo
[hugo-community]: https://discourse.gohugo.io/
````

Cet article n'a pas de date ! Essayez d’en définir une en ajoutant l’entrée
suivante dans l’en-tête _Front Matter_ de l’article:

`date: "YYYY-MM-DDTHH:MM:SS-00:00"`

:::tip
_Remplacez_ `YYYY-MM-DDTHH:MM:SS-00:00` avec une date valide, comme…
`2018-01-01T12:42:00-00:00`. Si votre date se situe dans le futur, Hugo ne
générera pas cet article en production.
:::

Sauvegardez vos changements puis affichez l’article mis à jour dans votre
navigateur à l’adresse [http://localhost:3000/](http://localhost:3000/). La date
affichée devant le titre de l’article devrait avoir été mise à jour.

### Créer un nouvel article

Maintenant essayons de créer un nouvel article. Nous utiliserons pour cela la
commande fournie avec Hugo pour générer un nouvel article. Dans notre projet,
Hugo est déclaré comme une dépendance NPM, nous pouvons donc l’utiliser avec la
commande :

`npm run hugo -- <command> --<param>`

Créez votre premier article en lançant :

`npm run hugo -- new posts/mon-premier-article.md`

Cela va créer un nouvel article au format markdown dans
`hugo/content/posts/mon-premier-article.md`. Ouvrez ce fichier dans votre
éditeur de texte favori.

```yaml
---
title: "Mon Premier Article"
date: "2018-03-09T14:24:17-04:00"
draft: true
---

```

Ce fichier comporte un en-tête Front Matter (des métadonnées structurées
relatives à la page) dont on peut tirer parti dans les gabarits de page. Sous le
_front matter_, nous pouvons ajouter du contenu au format markdown :

Ajoutez par exemple le contenu suivant dans le fichier et sauvegardez vos
changements :

```md
## Bienvenue

Pratique ce modèle de projet _Hugo_. j'espère que vous appréciez ce guide !
```

Vous pouvez voir l’article mis à jour dans votre navigateur à l’adresse
[http://localhost:3000/posts/mon-premier-article/](http://localhost:3000/posts/mon-premier-article/).

### Utiliser un thème

Pour le moment votre nouveau site n'est pas très beau. Remédions à cela en
ajoutant un thème issu de
[la galerie de thèmes de Hugo](https://themes.gohugo.io/), développé par un des
meilleurs contributeurs de la communauté.

{{< figure src="https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523346998/up_running_w_hugo_I_1.jpg" alt="" caption="Le thème Casper de @vjeantet" >}}

Nous allons utiliser le thème
[Casper](https://github.com/vjeantet/hugo-theme-casper) de
[_@vjeantet_](https://github.com/vjeantet). Pour ce faire nous allons ajouter le
thème dans le dossier `hugo/themes`, plus exactement dans le dossier
`hugo/themes/hugo-theme-casper/`.

Clonez ou
[téléchargez le thème](https://github.com/vjeantet/hugo-theme-casper/archive/master.zip)
et décompressez l’archive dans `hugo/themes/hugo-theme-casper/`.

Ensuite, mettez à jour la configuration du site aves les options de
configuration spécifiques au thème.

Ouvrez le fichier `hugo/config.toml` dans votre éditeur de texte favori et
remplacer son contenu par celui-ci :

```toml
baseURL= "/"
languageCode= "fr"
title= "Hugo Boilerplate"
paginate = 5
copyright = "Tous droits réservés - 2018"
theme = "hugo-theme-casper"
disableKinds = ["taxonomy", "taxonomyTerm"]

[params]
  description = "Bien démarrrer avec Hugo"
  metadescription = "Utilisé dans la balise meta 'description' pour l’accueil et les pages d’index, faute de quoi c'est l’entrée 'description' du front matter de la page qui sera utilisé."
  cover = ""
  author = "VOTRE_NOM"
  authorlocation = "Terre, Galaxie de la Voie Lactée"
  authorwebsite = ""
  authorbio= ""
  logo = ""
  hjsStyle = "default"
  paginatedsections = ["posts"]
```

Reportez-vous à la
[documentation du thème](https://github.com/vjeantet/hugo-theme-casper#configuration)
pour prendre connaissance de toutes les options de configuration disponibles.

Pour finir, supprimez les exemples de gabarits de page fournis avec notre modèle
de départ. Pour cela lancez la commande :

```sh
rm -r hugo/layouts/
```

Regardez maintenant dans votre navigateur et vérifiez que votre site a bien été
mis à jour !

## 3. Personnaliser votre site

Maintenant que nous avons mis en place un site fonctionnel avec un thème, vous
avez probablement envie de le personnaliser.

Nous allons commencer par éditer les paramètres du site dans le fichier
`hugo/config.toml`. Mettez à jour les valeurs suivantes comme bon vous semble :

- `title = "Hugo Boilerplate"`
- `description = "Bien démarrer avec Hugo`
- `metadescription = "Utilisé dans la balise meta 'description' pour l’accueil et les pages d’index, faute de quoi c'est l’entrée 'description' du front matter de la page qui sera utilisé"`
- `author = "VOTRE_NOM"`

{{< figure src="https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523346962/casper-theme-default-config.png" alt="" caption="Le thème Casper avec du contenu et les styles par défaut" >}}

Bien, ajoutons maintenant une image de fond pour la bannière d’en-tête. Dans le
fichier `hugo/config.toml`, vous trouverez une section `[params]`. Modifiez le
paramètre `cover` pour qu'il ait la valeur `/img/darius-soodmand-116253.jpg`,
sauvegardez vos changements.

{{< figure src="https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523347009/casper-theme-cover.jpg" alt="" caption="Ajout d’une image de fond" >}}

Retournons maintenant voir notre site dans le navigateur. C’est déjà mieux, mais
il y a encore du travail.

## 4. Personnaliser votre thème

Maintenant que vous avez adapté le site pour le personnaliser en peu, nous
allons nous attarder sur l’aspect le plus puissant d’Hugo et de ce kit de
démarrage: **un templating simple et puissant**.

Nous venons d’ajouter le thème Casper au site, ce qui permet à Hugo d’utiliser
tous les gabarits HTML présents dans le dossier
`hugo/themes/hugo-theme-casper/layouts/` lors de la génération du site.

Nous allons maintenant _étendre_ le thème grâce à **l’héritage de gabarits**
d’Hugo.

Tous les fichiers de gabarits présents dans le dossier `hugo/layouts/`
surchargeront n'importe quel gabarit du même nom présent dans le répertoire des
gabarits du thème, nous permettant ainsi de personnaliser notre site sans
toucher au thème d’origine.

### CSS & Javascript personnalisé

À côté d’_Hugo_, ce kit de démarrage fourni un serveur de développement qui va
post-traiter automatiquement les fichiers CSS et JS pour le navigateur. Tous les
fichiers CSS, JS, images présents dans le dossier `src/` seront traités
automatiquement et déplacés dans le dossier `hugo/static/`.

Ajoutons-les à notre thème de manière à pouvoir le personnaliser comme nous
voulons. Nous allons copier des fichiers de gabarits du thème et ajouter les
fichiers CSS et JS personnalisés de notre kit dans ces gabarits.

Premièrement, nous allons copier le fichier partiel _header.html_ du thème dans
le dossier `hugo/layouts/partials/` :

```sh
mkdir -p hugo/layouts/partials/
cp hugo/themes/hugo-theme-casper/layouts/partials/header.html hugo/layouts/partials/header.html
```

Ouvrez le fichier `hugo/layouts/partials/header.html` dans votre éditeur de
texte et repérez les lignes suivantes :

```html
<link rel="stylesheet" type="text/css" href="{{ "css/screen.css" | relURL}}" />
<link rel="stylesheet" type="text/css" href="{{ "css/nav.css" | relURL}}" />
```

Ajoutez en dessous la ligne suivante :

```html
<link rel="stylesheet" type="text/css" href="{{ "css/styles.min.css" | relURL}}"
/>
```

Ensuite, recopions le fichier partiel `footer.html` dans le dossier
`hugo/layouts/partials/` de manière à pouvoir ajouter notre fichier JS
personnalisé :

```sh
cp hugo/themes/hugo-theme-casper/layouts/partials/footer.html hugo/layouts/partials/footer.html
```

Ouvrez maintenant le fichier `hugo/layouts/partials/footer.html` et repérez les
lignes suivantes :

```html
<script type="text/javascript" src="{{"js/jquery.js" | relURL}}"></script>
<script type="text/javascript" src="{{"js/jquery.fitvids.js" | relURL}}"></script>
<script type="text/javascript" src="{{"js/index.js" | relURL}}"></script>
```

Ajoutez juste en dessous:

```html
<script type="text/javascript" src="{{"js/scripts.min.js" | relURL}}"></script>
```

Maintenant tout notre code CSS et JS personnalisé sera utilisé sur le site.

Faisons un essai en augmentant la hauteur de l’en-tête principal. Ouvrez le
fichier `src/css/styles.css` et ajoutez le code suivant à la fin du fichier :

```css
.tag-head.main-header {
  height: 80vh;
}
```

{{< figure src="https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523346973/capser-theme-final.jpg" alt="" caption="Le résultat final" >}}

Admirez le résultat final dans votre navigateur !

## 5. Prochaine étape

Vous êtes maintenant prêt·e à commencer à créer un site statique avec Hugo !

Vous pouvez continuer à utiliser le thème Casper ou repartir du début en
utilisant les modèles du répertoire `hugo/layouts/`.

:::tip
Les fichiers des modèles de gabarits de page se trouvent dans le
[_dépôt de notre kit de démarrage_](https://github.com/forestryio-templates/hugo-boilerplate/tree/master/hugo/layouts)
si vous souhaitez repartir de zéro.
:::

Pour en apprendre un peu plus sur Hugo, reportez-vous aux sections suivantes de
la documentation officielle :

- [L'organisation des contenus dans Hugo](https://gohugo.io/content-management/organization/)
- [Introduction au langage de templating d’Hugo](https://gohugo.io/templates/introduction/)
- [Les options de configuration d’Hugo](https://gohugo.io/getting-started/configuration/)

Nous verrons dans un prochain article comment configurer le versionnement avec
Git pour faciliter l’intégration continue et le déploiement chez différents
hébergeurs avec Forestry, un CMS pour les sites statiques générés avec Hugo ou
Jekyll.
