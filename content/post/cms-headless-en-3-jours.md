---
title: 'Intégrer un CMS en 3 jours'
description: 'Retour d’expérience suite à l’intégration de Netlify CMS à un site Jekyll.'
author: arnaud
date: 2019-06-22
draft: false
categories:
  - cms
  - headless
images:
  - /assets/images/cms-headless-en-3-jours/netlify-cms-blog-featured-image-02.png
source:
  author: 'Shea Daniels'
  title: 'Implementing a CMS in 3 Days'
  url: https://www.dwolla.com/updates/implementing-netlify-cms/
  lang: en
typora-root-url: ../../static/
---
![](/assets/images/cms-headless-en-3-jours/netlify-cms-blog-featured-image-02.png)

Imaginons que vous soyez en train de créer la prochaine grande startup ou d'organiser un super évènement — la première question que tout le monde va vous poser est : « C'est quoi le site web ? ».

Une présence en ligne séduisante et fonctionnelle est tout simplement primordial en 2019, que ce soit pour les entreprises, les organisations à but non lucratif ou encore pour le recrutement de nouveaux employés — et il en va de même pour [Monetery](https://monetery.com/), l'événement technologique — inclusif — organisé chaque printemps par Dwolla. Nous avions besoin d’un site rapidement opératonnel et performant, nous avons donc d’abord opté pour une solution fiable et éprouvée que nous avions déjà utilisé : [GitHub Pages](https://pages.github.com/).

Cette solution a été rapidement opérationnelle lorsque nous avons lancé la page d’accueil de Monetery, mais il était évident que nous avions besoin d’une solution plus complète. En raison de notre processus de validation exigeant, la technique est rapidement devenue un obstacle.  
Nous devions travailler à une meilleure solution afin de migrer nos contributeurs de contenu et effectuer les changements nécessaires rapidement.

Nous avons alors étudié les options qui s’offraient à nous :

1. Mettre en place un outil de gestion de contenu (CMS) traditionnel tel que WordPress
2. Trouver un CMS headless à intégrer dans un générateur de site statique (SSG)

Le nombre de solutions potentielles pour ces deux options est très vaste. Connaissant déjà bien les solutions traditionnelles, nous avons donc fouillé du côté de [headlesscms.org](https://headlesscms.org/) et de [staticgen.com](https://www.staticgen.com) pour voir ce qui se passait ailleurs. Dwolla offre à son équipe d’ingénieurs du temps dédié au développement professionnel chaque semaine, ce qui nous a permis de tester les solutions potentielles.

L’une des solutions les plus intéressantes que nous avons testées vient de la société [Netlify](https://www.netlify.com/), et de son projet [Netlify CMS](https://www.netlifycms.org/).

Nous avons pensé que Netlify CMS pourrait être avantageux pour les raisons suivantes :

- Il est conçu pour être utilisé avec des générateurs de site statique, ce qui nous permet de conserver les avantages en terme de vitesse, de sécurité et d’évolutivité qui nous ont attirés vers les SSG
- Il est SSG agnostique, et fonctionne donc avec notre site [Jekyll](https://jekyllrb.com/) existant mais ne nous empècherait pas de changer d’avis (salut [GatsbyJS](https://www.gatsbyjs.org/) !)
- Il n’y a pas de base de données car les modifications de contenu sont enregistrées via des *commits* Git — ce qui ravi les gens d‘[InfoSec](https://www.dwolla.com/security/) !
- Il fournit une expérience d’édition simple et fonctionnelle
- Il est open-source, il n’y a donc pas de dépendance à un fournisseur, et nous permet de reverser les fonctionnalités importantes à la communauté 

Suite à l’adhésion des parties prenantes, nous avons décidé de nous orienter vers cette solution. Nous allons parler des décisions que nous avons dû prendre et vous montrer comment intégrer Netlify CMS avec Jekyll sur votre propre site.

## Devez-vous passer de GitHub Pages à Netlify ?

Ça a été le premier choix à faire. Changer d’hébergement nous a semblé augmenter le temps et la complexité du projet, aussi notre décision à donc été « non ». Utiliser Netlify CMS avec votre hébergeur actuel est un choix parfaitement valable.

Alors pourquoi avons-nous changé d’avis et opté pour Netlify ? La réponse tient dans deux fonctionnalités très convaincantes : [Git Gateway](https://www.netlify.com/docs/git-gateway/) et le [déploiement de branches](https://www.netlify.com/docs/continuous-deployment/#branches-deploys).

Git Gateway fonctionne comme un intermédiaire entre le CMS et votre dépôt Git. Concrètement cela signifie que, par exemple, vos utilisateurs peuvent se connecter à l’administration du CMS en utilisant leur compte Google au lieu de leur demander d’avoir un compte GitHub. Ensuite Netlify effectue les commits via un compte GitHub autorisé à accéder au dépôt via OAuth. Bien que Git Gateway soit également un logiciel [open-source](https://github.com/netlify/git-gateway), il était clair que l’héberger nous-même allait ajouter une complexité considérable.

Le déploiement de branches vous permet d’avoir plusieurs versions de votre site en même temps. À titre de comparaison, GitHub Pages est très limité puisqu’il ne permet de déployer qu’une seule branche (généralement “master“ ou “gh-pages“). Au premier abord ça peut sembler sans intérêt, mais ça offre une possbilité très intéressante que nous allons détailler dans un instant.

## Migrer de GitHub Pages à Netlify

En général, publier votre site depuis Netlify est aussi simple que de créer un compte Netlify, connectez vous à votre fournisseur (GitHub, GitLab ou Bitbucket) et sélectionnez un dépôt. Dès que vous définissez la commande de *build*, Netlify peut commencer à déployer votre site. Les tâches telles que configurer le SSL sont expliquées dans la [documentation Netlify](https://www.netlify.com/docs/), nous ne les détaillerons donc pas ici.

Si vous utilisez les *gems* intégrées à Jekyll et le processus de *build* proposé par GitHub, vous aurez besoin de quelques outils complémentaires pour que ça fonctionne. Vous aurez besoin d’un *Gemfile* pour vos dépendances, et c’est aussi une bonne idée d’intégrer la commande de *build* au code source :

*Gemfile*

``` {#gemfile}
source "https://rubygems.org"
gem 'github-pages'
```

*netlify.toml*

``` {#netlify.toml}
[build]
publish = "_site/"
command = "jekyll build"
```

Une fois que tout vous semble bon et que le déploiement Netlify se déroule correctement, vous pouvez demander à gérer votre nom de domaine via Netlify et migrer vos DNS vers les serveurs de nom de Netlify. Une fois vos DNS complètement coupés, vous pouvez désactiver le site GitHub Pages en toute sécurité depuis votre dépôt.

## Ajouter Netlify CMS à un site existant

Netlify CMS se compose d’une [application web monopage](https://fr.wikipedia.org/wiki/Application_web_monopage) (NDT : en anglais *single-page application* ou SPA) construite avec React qui réside dans un dossier admin de votre site. Pour Jekyll, il doit être placé à la racine du site. Il contiendra deux fichiers :

``` {#file-structure}
admin
├ index.html
└ config.yml
```

La [documentation de Netlify CMS](https://www.netlifycms.org/docs/add-to-your-site/) explique ça très bien :

> Le premier fichier, `admin/index.html`, est le point d’entrée à l’admin de Netlify CMS. Cela signifie que les utilisateurs y accèdent via `votresite.com/admin/`. Du côté du code, c’est une page HTML qui charge le fichier Javascript de Netlify CMS. Dans cet exemple, nous chargeons le fichier depuis un CDN public :

*admin/index.html*

``` {#index.html}
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <!-- Include the script that builds the page and powers Netlify CMS -->
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
</body>
</html>
```

> Le second fichier, `admin/config.yml`, est le coeur de l’installation de Netlify CMS, et il est un peu plus complexe. La section [Configuration](https://www.netlifycms.org/docs/add-to-your-site/#configuration) rentre dans les détails.

Pour commencer, voici à quoi peut ressembler le fichier de configuration :

*admin/config.yml*

``` {#config.yml}
backend:
  name: git-gateway
  branch: master
  identity_url: "https://yoursite.com/.netlify/identity"
  gateway_url: "https://yoursite.com/.netlify/git"
  squash_merges: true

publish_mode: editorial_workflow
media_folder: "assets/img/uploads"

site_url: https://yoursite.com
logo_url: https://yoursite.com/assets/img/logo.svg

collections:
```

La section `backend` couvre la configuration de base tel que le choix de la branche à modifier et la connexion Git Gateway dont nous avons parlé plus haut. La propriété `publish_mode` est paramétrée de manière à ce que notre flux de travail utilise le mode [*editorial*](https://www.netlifycms.org/docs/add-to-your-site/#editorial-workflow). En bref cela signifie que nous avons la possibilité de sauvegarder les brouillons sous la forme de *Pull Requests* Git avant de décider de les publier. Combiné à la fonctionnalité de déploiement de branches de Netlify, cela va nous permettre d’avoir un aperçu immédiat du contenu non publié !

*Remarque : depuis mai 2019, le flux de travail editorial n’est pris en charge que lorsque vous utilisez GitHub.*

Maintenant il ne nous reste plus qu’à déposer le widget Netlify Identify sur le site principal. C’est nécessaire car après s’être connecté l’utilisateur est redirigé vers la page d’accueil du site. Nous devons rediriger les utilisateurs vers l’administration du CMS, en ajoutant le script suivant avant la fermteture de la balise *body* :

``` {#netlify-identity}
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
```

Uen fois ceci mis en place, avec l’authentification adéquate et la Git Gateway configurée sur netlify.com, vous devriez être en mesure de vous connecter à l’administration de Netlify CMS de votre site via l’URL `https://yourdomain.com/admin/`.

### Qu’est-ce que les Collections ?

Bien qu'à ce stade vous pouvez vous connecter, vous ne pouvez pas encore faire grand chose ! Aucune structure de données n’est configurée pour les champs du CMS dont vous aurez besoin pour éditer votre site. Vous avez peut-être remarqué le champ vide `collections` dans le fichier de configuration, et c’est là que la magie opère. Tous les champs des données que vous souhaitez enregistrer doivent appartenir à une collection.

Il existe deux [types de collections](https://www.netlifycms.org/docs/collection-types/), le dossier de collections et le fichier de collections. Pour comprendre la différence, voyons ce que Netlify CMS fait réellement lorsque vous modifiez un contenu : les données doivent être stockées quelque part et nous savons qu’il utilise Git comme *back-end*. Cela signifie que les données que vous enregistrez doivent se retrouver dans un un fichier de votre projet. Ainsi, lorsque nous configurons une collection, nous donnons à Netlify CMS l’information de structure et la convention de nommage des fichiers que nous voulons créer. C’est ensuite à votre générateur de site statique de déterminer comment interpréter ces fichiers et injecter les données dans des templates. Dans ce billet, nous allons expliquer comment ça fonctionne avec Jekyll.

Sachant cela, pouvez-vous deviner pourquoi il existe deux types de collections ? Dans le cas de données de configuration, nous pouvons dire au CMS de mettre ces champs dans un fichier spécifique de notre projet. Dans le cas de contenus répétés tels que des billets de blog ou des pages construites à partir de composants modulaires, nous souhaitons configurer Netlify CMS de manière à ce qu’il puisse générer un certain nombre de formats de fichier différents — il supporte YAML, JSON, Markdown avec un [front matter](https://jekyllrb.com/docs/front-matter/), et quelques autres.

### Paramétrage d’un fichier de collection pour les données de configuration

Un fichier de collection est l’endroit idéal pour définir les champs des données pour les éléments qui sont valables sur l’ensemble du site, tels que la navigation globale, le pied de page et les valeurs par défaut. Jetons un oeil à un fichier de collection issu d’un cas réel :

*admin/config.yml*

``` {#config.yml-edit}
collections:
  - label: "Options transverses"
    name: options
    editor:
      preview: false
    files:
      - label: "Menu de navigation"
        name: nav
        file: "_data/nav.yml"
        fields:
          - label: "Entrées de menu"
            label_singular: "Entrée de menu"
            name: topLevelItems
            widget: list
            fields:
              - {label: "Texte affiché", name: displayText, widget: string}
              - {label: URL, name: url, widget: string}
              - label: "Type d'objet"
                name: itemType
                widget: select
                options: ["Link", "Button"]
```

Cela définira une nouvelle collection qui apparaîtra à gauche de l’interface utilisateur de l’administration du CMS, et créera une page “Menu de navigation” au sein de cette collection. À l’intérieur se trouvent des champs qui définissent les entrées de navigation du site qui incluent chacune un nom, une URL, etc. Nous définissons le type de donnée et l’interface d’édition des champs à l'aide de [widgets](https://www.netlifycms.org/docs/widgets/). Lorsqu'une modification est apportée, elle sera enregistrée dans le fichier `_data/nav.yml` de votre projet.

![](/assets/images/cms-headless-en-3-jours/Screen-Shot-2019-05-29-at-4.14.23-PM.png)

Voici un exemple de ce à quoi peut resembler un fichier de données :

*\_data/nav.yml*

``` {#nav.yml}
topLevelItems:
  - displayText: 'Une page'
    itemType: Link
    url: '/une-page/'
  - displayText: 'Lien externe'
    itemType: Link
    url: 'https://google.com'
```

### Comment utiliser un fichier de collection dans Jekyll ?

Voyons comment exploiter ces données dans un template Jekyll. Voici un template *Liquid* qui utilise nos données de navigation :

``` {#nav-data}
<ul>
  {% for item in site.data.nav.topLevelItems %}
    <li>
      {% if item.itemType == 'Link' %}
        <a href="{{ item.url }}">{{ item.displayText }}</a>
      {% else %}
        ...
      {% endif %}
    </li>
  {% endfor %}
</ul>
```

Dans Jekyll, toutes les informations du dossier `_data` sont accessibles en utilisant la syntaxe `site.data.{file}.{field}`. Vous pouvez itérer et obtenir les champs que vous souhaitez.

### Paramétrer un dossier de collection de pages

Une dossier de collection est utilisé chaque fois que nous avons besoin de générer un certain nombre de fichiers selon un template, mais sans savoir combien. Par exemple, si vous créez un blog, c’est ce dont vous aurez besoin pour vos billets.  
Dans cet exemple, nous allons utiliser une fonctionnalité intéressante de Jekyll afin de permettre aux contributeurs de créer les pages de notre site à la volée et selon la destination de leur choix.

Regardons la structure d’un dossier de collection provenant d’un fichier de configuration réel pour voir comment ça marche :

*admin/config.yml*

``` {#config-collection}
collections:
 - label: "Pages"
    label_singular: "Page"
    name: pages
    folder: "_pages"
    create: true
    slug: "{{slug}}"
    preview_path: "{{permalink}}"
    editor:
      preview: false
    fields:
      - {label: "Titre", name: title, widget: string}
      - {label: "Lien permanent", name: permalink, widget: string}
      - label: "Template"
        name: "layout"
        widget: "select"
        default: "blocks"
        options:
          - { label: "Défaut", value: "blocks" }
          - { label: "Page d'accueil", value: "home" }
      - {label: "Meta description", name: metaDescription, widget: text, required: false}
      - label: "Partage sur les réseaux sociaux"
        name: social
        widget: object
        required: false
        fields:
          - {label: "Image OpenGraph", name: ogImage, widget: image, required: false}
          - {label: "Image Twitter", name: twitterImage, widget: image, required: false}
```

Ceci définit une nouvelle collection appelée “Pages” qui contiendra de nombreux fichiers stockés dans le dossier `/_pages/` de votre projet. Les fichiers seront nommés en fonction du modèle définit dans le champ *slug*, lequel est configuré pour prendre la valeur de la variable pas forcément très explicite `{{slug}}`. Ne vous inquiétez pas, dans ce cas, cela signifie simplement que nous utiliserons la valeur par défaut, à savoir le contenu du champ `Titre`. Vous pouvez configurer cela de différentes façons pour y inclure une date ou tout autre élément selon votre besoin, mais dans le cas de notre exemple c’est parfait.

![](/assets/images/cms-headless-en-3-jours/Screen-Shot-2019-05-29-at-4.17.02-PM.png)

Veuillez noter les champs `permalink` et `preview_path`. Nous utiliserons le champ *permalink* pour définir le chemin d’accès à notre page dans Jekyll, et le champ de *preview* permet à Netlify CMS de savoir comment pointer vers la bonne URL de prévisualisation (déploiement de branches :+1:).

Voici un exemple de ce à quoi peut ressembler le fichier de contenu d’une page :

*\_pages/home.md*

``` {#home.md}
---
Title: Accueil
permalink: /
layout: home
metaDescription: Dites nous de quoi il s'agit !
social: {}
---
```

### Comment utiliser un dossier de collection dans Jekyll ?

Si vous lisiez avec attention, vous avez sans doute remarqué qu’une collection de fichiers génère des fichiers YAML, alors qu‘une collection de dossiers génère des fichiers Markdown avec un *front matter*. Vous pensez peut-être que c’est un peu étrange d’avoir un fichier Markdown sans contenu sous le *front matter* (séparé par trois tirets), mais soyez rassuré : c’est pour une bonne raison !

Nous travaillerons de concert avec la fonctionnalité de [collections](https://jekyllrb.com/docs/collections/) propre à Jekyll afin de coupler nos fichiers Markdown avec un template, lire les données du *front matter* et ensuite générer notre page. Cela nous permettra de faire des choses plus travaillées plus tard, comme utiliser le [widget liste à types de variable](https://www.netlifycms.org/docs/beta-features/#list-widget-variable-types) pour créer un composant de *page builder* !

Avant de commencer, nous avons besoin de compléter le fichier de configuration de Jekyll :

*\_config.yml*

``` {#jekyll-collections}
collections:
  pages:
    output: true
```

Ceci indique à Jekyll qu’il doit générer une nouvelle page pour chaque fichier Markdown présent dans le dossier `pages`.

Mais comment Jekyll fait-il pour savoir quel template utiliser ? Dans le cas présent c’est champ `layout` défini dans Netlify CMS qui s’occupe de ça. Jekyll fait correspondre la valeur du champ dans le *front matter* directement avec le nom du fichier de template présent dans le dossuer `_layouts` du projet.

Regardons un exemple de template :

*\_layouts/home.html*

``` {#layouts-home}
---
layout: default
---

<h1>{{ page.title }}</h1>

<section class="home">
  {{ content }}
</section>
```

Toutes les données provenant du *front matter* qui nous intéresse sont accessibles en utilisant la syntaxe Jekyll `{collection}.{field}`. Nous pouvons utiliser les templates parents et autres comme on veut.

### Réaliser un *page builder* dans Jekyll

C’est un bon début, mais nous n’aurions pas besoin de tout ça dans notre dossier de collection si nous n’allions pas plus loin : créons un *page builder* flexible, basé sur des composants.

Pour commencer, nous devons définir nos composants dans le fichier de configuration de Netlify CMS :

*\_admin/config.yml*

``` {#define-components}
collections:
  - label: "Pages"
      ...
      - label: "Blocs de contenu"
        label_singular: "Bloc de contenu"
        name: blocks
        widget: list
        types:
          - label: "Mise en avant"
            name: hero
            widget: object
            fields:
              - {label: "En-tête", name: heading, widget: string}
              - {label: "Contenu", name: content, widget: markdown, buttons: ["bold", "italic", "link"], required: false}
          - label: "Bloc de texte riche"
            name: textBlock
            widget: object
            fields:
              - {label: "En-tête", name: heading, widget: string, required: false}
              - {label: "Contenu", name: content, widget: markdown}
          ...
```

Ici nous avons étendu notre collection de pages afin d’y inclure un widget de liste à type de variable qui contient différents types d’objets que l’éditeur de contenu pourra ajouter dynamiquement et réorganiser depuis l’administration du CMS.

![](/assets/images/cms-headless-en-3-jours/Screen-Shot-2019-05-29-at-4.19.06-PM.png)

Créons maintenant un nouveau template pour le rendu de nos widgets :

*\_layouts/blocks.html*

``` {#render-widgets}
---
layout: default
---

{% for block in page.blocks %}
  {% include blocks/{{ block.type }}.html block=block %}
{% endfor %}
```

Ici nous itérons sur chacun des composants de la page et incluons un autre fichier de template qui lui s’occupe du rendu. Voici à quoi pourrait ressembler un template de composant :

*\_includes/blocks/hero.html*

``` {#component-template}
<header class="page-hero">
  <h1>{{ block.heading }}</h1>
  {% if block.content and block.content != '' %}
    <div class="max-width--330">
      {{ block.content | markdownify }}
    </div>
  {% endif %}
</header>
```

Parce que nous avons transmis notre variable `block`, nous avons tout ce dont nous en avons besoin. Vous remarquez égelement que nous avons veillé à transformer notre Mardown en HTML avec *markdownify* car ce n’est pas fait automatiquement.

## Notre retour d'expérience avec Netlify + Netlify CMS

Grâce à ces techniques, nos ingénieurs ont pu intégrer Netlify CMS à notre site jekyll existant pour [Monetery](https://monetery.com/) et mettre en oeuvre un CMS opérationnel en l’espace de quelques jours (trois pour être exact).  
Les contributeurs de contenu ont été en mesure de s’intégrer rapidement et de commencer à publier des modifications et de nouvelles pages peu de temps après le lancement. Pendant ce temps, nous avons également intégré un nouvel ingénieur qui a pu commencer à contribuer de manière significative dès son deuxième jour de travail !

Cela dit, [ce n’est jamais terminé](https://www.dwolla.com/about/core-beliefs/). Nous apprenons constamment de nos expériences et nous essayons de nous améliorer. Jetons un oeil critique sur les avantages et les inconvénients quant à l’utilisation de Netlify + Netlify CMS :

### Pour

- Héberger son site avec Netlify est un jeu d’enfant et nous n’avons rencontré aucun problème avec le site lui-même
- Netlify CMS à été très facile à installer sur un projet Jekyll existant et il est intuitif pour les nouveaux ingénieurs
- Il est facile et très pratique de créer une copie de l’ensemble de votre projet, y compris le contenu, et de l’exécuter localement à l’aide de Docker
- L’interface de Netlify CMS est simple et facile à prendre en main pour les contributeurs de contenu
- Le déploiement et l‘aperçu par branche est extraordinaire
- L‘offre gratuite de Netlify vous donnent la liberté d’évaluer le service avant de vous engager
- Il existe une [communauté](https://gitter.im/netlify/NetlifyCMS) active et très utile pour Netlify CMS sur Gitter
- Netlify CMS est open-source et les contributions sont bienvenues

### Contre

- Nos contributeurs de contenu apprécient le flux de travail éditorial, mais n’aiment pas les nombreuses étapes nécessaires pour enregistrer et publier
- L’enregistrement et la publication sont relativement lents, parfois jusqu’à plusieurs secondes
- Nous rencontrons des erreurs occasionnelles — mais frustrantes — lors de l’utilisation de l’administration du CMS
- Certains widgets ou fonctionnalités que vous pourriez rechercher, tels que l‘affichage conditionnel des champs de l’interface utilisateur de l’administration, n’ont pas encore été implémentés
- L’interface utilisateur du CMS ne permet pas de sauvegarder le contenu sur votre ordinateur lors du développement en local, il sera toujours nécessaire de *commiter* sur votre dépôt Git, alors soyez prudent
- Il est préférable d’utiliser Netlify comme hébergeur plutôt qu’un autre fournisseur si vous souhaitez utiliser des fonctionnalités telles que le déploiement de branches et un Git Gateway déjà hébergé — Cela peut ajouter des coûts supplémentaires à votre projet

## Communauté et contribution

Les échanges avec la communauté Netlify CMS ont été merveilleux, nous vous encourageons donc à essayer cette technologie. Dwolla croit également qu’il faut associer les mots et les actes, aussi nous sommes résolus à reverser à la communauté open-source. Nous sommes heureux d’annoncer que notre première *Pull Request* est déjà en ligne !

Découvrez le code sur GitHub : <https://github.com/netlify/netlify-cms>

