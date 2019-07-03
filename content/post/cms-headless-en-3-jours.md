---
title: Intégrer un CMS en 3 jours
description: Retour d’expérience sur la mise en place de Netlify CMS sur un site Jekyll.
author: arnaud
date: 2019-06-22
draft: true
categories:
- headless
images:
- https://res.cloudinary.com/jamstatic/image/upload/c_scale,f_auto,q_auto,w_1200/v1561132474/jamstatic/netlify-cms.png
source:
  author: Shea Daniels
  title: How We Implemented a headless CMS in 3 Days
  url: https://www.dwolla.com/updates/implementing-netlify-cms/
  lang: en
---
Imaginons que vous soyez en train de créer la prochaine grande startup ou d'organiser un super évènement — la première question que tout le monde va vous poser est : « C'est quoi le site web ? ».

Une présence en ligne séduisante et utilisable est tout simplement primordial en 2019, que ce soit pour les entreprises, les organisations à but non lucratif ou encore pour les employés potentiels — et il en va de même pour [Monetery](https://monetery.com/), le sommet technologique — inclusif — organisé chaque printemps par Dwolla. Nous avions besoin d’un site opératonnel rapidement et performant, nous avons donc d’abord opté pour une solution fiable et éprouvée que nous avions déjà utilisé : [GitHub Pages](https://pages.github.com/).

Cette solution a été rapidement opérationnelle quand nous avons lancé la page d’accueil de Monetery, mais il était évident que nous avions besoin d’une solution plus complète. En raison de notre processus de validation exigeant, la technique est rapidement devenue un obstacle.  
Nous devions travailler à une meilleure solution afin de migrer nos contributeurs et effectuer les changements nécessaires rapidement.

Nous avons alors étudié nos options :

1. Mettre en place un outil de gestion de contenu (CMS) traditionnel tel que WordPress
2. Trouver un CMS headless à intégrer dans un générateur de site statique (SSG)

Le nombre de solutions potentielles pour ces deux options est très vaste. Connaissant déjà bien les options traditionnelles, nous avons donc fouillé du côté de [headlesscms.org](https://headlesscms.org/) et de [staticgen.com](https://www.staticgen.com) pour voir ce qui se passait ailleurs. Dwolla offre à son équipe d’ingénieurs du temps dédié au développement professionnel chaque semaine, ce qui nous a permis de tester les solutions potentielles.

L’une des solutions les plus intéressantes que nous avons testées vient de la société [Netlify](https://www.netlify.com/), et de son projet [Netlify CMS](https://www.netlifycms.org/).

Nous avons pensé que Netlify CMS pourrait être avantageux pour les raisons suivantes :

- Il est conçu pour être utilisé avec des générateurs de sites statiques, ce qui nous permet de conserver les avantages en terme de vitesse, de sécurité et d’évolutivité qui nous ont attirés vers les SSG
- Il est SSG agnostique, et fonctionne donc avec notre site [Jekyll](https://jekyllrb.com/) existant mais ne nous empècherait pas de changer d’avis (salut [GatsbyJS](https://www.gatsbyjs.org/) !)
- Il n’y a pas de base de données car les modifications de contenu sont enregistrées en tant que commits Git — ce qui ravi les gens d‘[InfoSec](https://www.dwolla.com/security/) !
- Il fournit une expérience d’édition simple et fonctionnelle
- Il est open source, il n’y a donc pas de dépendance à un fournisseur, et nous permet de reverser les fonctionnalités importantes à la communauté 

Suite à l’adhésion des parties prenantes, nous avons décidé d’aller ves cette solution. Nous allons parler des décisions que nous avons dû prendre et vous montrer comment intégrer Netlify CMS avec Jekyll sur votre propre site.

Devez-vous passer de GitHub Pages à Netlify ?
-----------------------------------------------------

C’était le premier choix à faire. Changer d’hébergement nous a semblé ajouter du temps et de la complexité au projet, ainsi notre décision était donc « non ». Utiliser Netlify CMS avec votre fournisseur d’hébergement existant est un choix parfaitement valable.

Alors pourquoi avons-nous changé d’avis et opté Netlify ? La réponse tient dans deux fonctionnalités très convaincantes : [Git Gateway](https://www.netlify.com/docs/git-gateway/) et le [déploiement de branches](https://www.netlify.com/docs/continuous-deployment/#branches-deploys).

Git Gateway fonctionne comme un intermédiaire entre le CMS et votre dépôt Git. Concrètement cela signifie que, par exemple, vos utilisateurs peuvent se connecter à l’administration du CMS en utilisant leur compte Google au lieu de leur demander d’avoir un compte GitHub. Ensuite Netlify effectue les commits via un compte GitHub autorisé à accéder au dépôt via OAuth. Bien que Git Gateway soit également un logiciel [open source](https://github.com/netlify/git-gateway), il était clair qu’apprendre à l’héberger nous-mêmes allait impliquer une courbe d’apprentissage considérable.

Les déploiements de branches vous permettent d’avoir plusieurs versions de votre site en même temps. À titre de comparaison, GitHub Pages est très limité puisqu’il ne permet de déployer qu’une seule branche (généralement “master“ or “gh-pages“). Ça peut sembler sans intérêt, mais ça offre une possbilité très intéressante que nous allons détailler dans un instant.

Migrer de GitHub Pages à Netlify
--------------------------------------

En général, publier votre site depuis Netlify est aussi simple que de créer un compte Netlify, connectez vous à votre fournisseur (GitHub, GitLab ou Bitbucket) et sélectionnez un dépôt. Dès que vous indiquez une commande de *build*, Netlify peut alors commencer à déployer votre site. Les tâches telles que configurer le SSL sont expliquées par la [documentation Netlify](https://www.netlify.com/docs/), nous ne les détaillerons donc pas ici.

Si vous utilisez les gemmes Jekyll intégrées et le processus de *build* proposé par GitHub, vous aurez besoin de quelques outils complémentaire pour que ça fonctionne. Vous aurez besoin d’un *Gemfile* pour vos dépendances, et c’est aussi une bonne idée de maitriser la commande de *build* via le gestionnaire de source :

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

Une fois que tout vous semble bon et que le déploiement Netlify se passe correctement, vous pouvez demander à gérer votre nom de domaine sur Netlify et migrer vos DNS vers les serveurs de nom de Netlify. Une fois vos DNS complètement coupés, vous pouvez désactiver le site GitHub Pages en toute sécurité depuis votre dépôt.

Ajouter Netlify CMS à un site existant
--------------------------------------

Netlify CMS se compose d’une [application web monopage](https://fr.wikipedia.org/wiki/Application_web_monopage) (en anglais *single-page application* ou SPA) construite avec React qui réside dans un dossier admin de votre site. Pour Jekyll, il doit être placé à la racine  du site. Il contiendra deux fichiers :

``` {#file-structure}
admin
├ index.html
└ config.yml
```

La [documentation de Netlify CMS](https://www.netlifycms.org/docs/add-to-your-site/) explique ça très bien :

> The first file, `admin/index.html`, is the entry point for the Netlify CMS admin interface. This means that users navigate to `yoursite.com/admin/` to access it. On the code side, it's a basic HTML starter page that loads the Netlify CMS JavaScript file. In this example, we pull the file from a public CDN:

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

> The second file, `admin/config.yml`, is the heart of your Netlify CMS installation, and a bit more complex. The [Configuration](https://www.netlifycms.org/docs/add-to-your-site/#configuration) section covers the details.

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

La section `backend` couvre les basiques tel que le choix de la branche à modifier et la configuration de la connexion Git Gateway dont avons parlé plus haut. La propriété `publish_mode` configure notre flux de travail de manière à utiliser le mode [*editorial*](https://www.netlifycms.org/docs/add-to-your-site/#editorial-workflow). En bref, cela signifie que nous avons la possibilité de sauvegarder les brouillons sous la forme de *pull requests* Git afin de décider de les publier. Combiné à la fonctionnalité de déploiement de branches de Netlify, cela va nous permettre d’avoir un aperçu immédiat du contenu non publié depuis un générateur de site statique !

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

Ceci mis en place, avec l’authentification adéquate et la Git Gateway configurée sur netlify.com, vous devriez être en mesure de vous connecter à l’administration de Netlify CMS de cotre site via l’URL `https://yourdomain.com/admin/`.

### Qu’est-ce que les Collections ?

Bien qu'à ce stade vous puissiez vous connecter, vous ne pouvez pas encore faire grand chose ! Aucune structure de données n’est configurée pour les champs du CMS dont vous aurez besoin pour éditer votre site. Vous avez peut-être remarqué le champ vide `collections` dans le fichier de configuration, et c’est là que la magie opère. Tous les champs des données que vous souhaitez enregistrer doivent appartenir à une collection.

Il existe deux [types de collections](https://www.netlifycms.org/docs/collection-types/), le dossier de collections et le fichier de collections. Pour comprendre la différence, voyons ce que Netlify CMS fait réellement lorsque vous modifiez un contenu : les données doivent être stockées quelque part et nous savons qu’il utilise Git comme *back-end*. Cela signifie que les données que vous enregistrez doivent se retrouver dans un un fichier de votre projet. Ainsi, lorsque nous configurons une collection, nous donnons à Netlify CMS l’information de structure et la convention de nommage des fichiers que vous voulons créer. C’est ensuite à votre générateur de site statique de déterminer comment interpréter ces fichiers et d’extraire les données dans des modèles. Dans ce billet, nous expliquerons comment ça fonctionne avec Jekyll.

Sachant cela, pouvez-vous deviner pourquoi il existe deux types de collections ? Dans le cas d’options de paramétrage, nous pouvons dire au CMS de mettre ce champ dans un fichier spécifique de notre projet. Dans le cas de contenus répétés tels que des billets de blog ou des pages fabriqués à partir de composants modulaires, nous souhaitons configurer Netlify CMS de manière à ce qu’il puisse générer un certain nombre de formats de fichier différents — il supporte YAML, JSON, Markdown avec un [front matter](https://jekyllrb.com/docs/front-matter/), et quelques autres.

### Paramétrage d’un fichier de collection pour les options globales

Un fichier de collection est l’endroit idéal pour définir les champs de donnée pour les éléments qui sont valables pour l’ensemble du site, tels que la navigation globale, le pied de page et les valeurs par défaut. Jetons un oeil à un fichier de collection issu d’un cas réel :

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

Cela définira une nouvelle collection qui apparaîtra à gauche de l’interface utilisateur de l’administration du CMS, et créera une page “Menu de navigation” au sein de cette collection. À l’intérieur se trouvent des champs qui définissent les entrées de navigation du site qui incluent chacun un nom, une URL, etc. Nous définissons le type de données et l’interface d’édition des champs à l'aide de [widgets](https://www.netlifycms.org/docs/widgets/). Lorsqu'une modification est apportée, elle sera enregistrée dans le fichier `_data/nav.yml` de votre projet.

![](https://cdn.dwolla.com/com/prod/20190529161537/Screen-Shot-2019-05-29-at-4.14.23-PM.png)

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

Voyons comment extraire ces données dans un template Jekyll. Voici un template *Liquid* qui utilise nos données de navigation :

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

Dans Jekyll, toutes les informations du dossier `_data` sont accessibles en utilisant la syntaxe `site.data.{file}.{field}`. Vous pouvez boucler et obtenir des champs comme vous le souhaitez.

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

Ceci définit une nouvelle collection appelée “Pages” qui contiendra de nombreux fichiers stockés dans le dossier `/_pages/` de votre projet. Les fichiers seront nommés en fonction du modèle définit dans le champ *slug*, lequel est configuré pour prendre la valeur de la variable pas très explicite `{{slug}}`. Ne vous inquiétez pas, dans ce cas, cela signifie simplement que nous utiliserons la valeur par défaut, à savoir le contenu du champ `Titre`. Vous pouvez configurer cela de différentes façons pour inclure une date ou tout autre élément selon votre besoin, mais dans le cas de notre exemple c’est parfait.

![](https://cdn.dwolla.com/com/prod/20190529161807/Screen-Shot-2019-05-29-at-4.17.02-PM.png)

Veuillez noter les champs `permalink` et `preview_path`. Nous utiliserons le champ *permalink* pour définir le chemin d’accès à notre page dans jekyll, et le champ de *preview* permet à Netlify CMS de savoir comment pointer vers la bonne URL de prévisualisation (déploiement de branche :+1:).

Voici un exemple de ce à quoi peut ressembler le fichier de données d’une page :

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

### Comment utiliser un dossier Collection dans Jekyll ?

Si vous lisiez avec attention, vous avez sans doute remarqué qu’une collection de fichiers génère des fichiers YAML, alors qu‘une collection de dossiers génère des fichiers Markdown avec un *front matter*. Vous pensez peut-être que c’est un peu étrange d’avoir un fichier Markdwon sans contenu en dessous du *front matter* (séparé par trois tirets), mais soyez rassuré : c’est pour une bonne raison !

We'll work in concert with Jekyll's own [collections feature](https://jekyllrb.com/docs/collections/) to pair our markdown files with a template, read the data in the front matter and then use it to generate our page output. This lets us do neato things later like use the [variable type list widget](https://www.netlifycms.org/docs/beta-features/#list-widget-variable-types) to make a component based page builder!

Nous travaillerons de concert avec la fonctionnalité de [collections](https://jekyllrb.com/docs/collections/) propre à Jekyll afin de coupler nos fichiers Markdwon avec un template, lire les données du *front matter* et ensuite générer notre page. Cela nous permet de faire des choses ordonnées plus tard, comme utiliser le [widget liste avec types de variable](https://www.netlifycms.org/docs/beta-features/#list-widget-variable-types) pour créer un composant de *page builder* !

Avant de commencer, nous avons besoin de compléter le fichier de configuration de Jekyll :

*\_config.yml*

``` {#jekyll-collections}
collections:
  pages:
    output: true
```

Ceci indique à Jekyll qu’il doit générer une nouvelle page pour chaque fichier Markdown présent dans le dossier `pages`.

Mais comment Jekyll fait-il pour savoir quel template à utiliser ? Dans ce cas, le champ `layout` que nous avons défini dans Netlify CMS fait exactement ça. Jekyll fait correspondre la valeur du champ dans le *front matter* directement avec le nom du fichier de template présent dans le dossuer `_layouts` du projet.

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

Toutes les données qui nous intéresse provenant du *front matter* sont accessibles en utilisant la syntaxe Jekyll `{collection}.{field}`. Nous pouvons utiliser les templates parents et toutes les autres fonctionnalités comme souhaité. 

*[WIP]*

### Making a Page Builder in Jekyll

We're off to a great start, but we didn't need to go to all that trouble with our folder collection if we weren't going to take it one step farther: let's make a flexible, component-based page builder!

First, we need to define our components in the Netlify CMS config file:

\_admin/config.yml

``` {#define-components}
collections:
  - label: "Pages"
      ...
      - label: "Content Blocks"
        label_singular: "Content Block"
        name: blocks
        widget: list
        types:
          - label: "Hero"
            name: hero
            widget: object
            fields:
              - {label: "Heading", name: heading, widget: string}
              - {label: "Content", name: content, widget: markdown, buttons: ["bold", "italic", "link"], required: false}
          - label: "Rich Text Block"
            name: textBlock
            widget: object
            fields:
              - {label: "Heading", name: heading, widget: string, required: false}
              - {label: "Content", name: content, widget: markdown}
          ...
```

Here we've extended our pages collection to include a variable type list widget that contains several different types of objects that the content editor will be able to dynamically add and rearrange from the CMS Admin.

![](https://cdn.dwolla.com/com/prod/20190529162003/Screen-Shot-2019-05-29-at-4.19.06-PM.png)

Now let's make a new layout to render our widgets:

\_layouts/blocks.html

``` {#render-widgets}
---
layout: default
---

{% for block in page.blocks %}
  {% include blocks/{{ block.type }}.html block=block %}
{% endfor %}
```

Here we're looping through each component on the page, and including another template file that knows how to render it. Here's what a component template might look like:

\_includes/blocks/hero.html

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

Because we passed along our block variable, everything is right where we need it. You'll also notice we took special care to translate our markdown into HTML with markdownify since that isn't being automatically done for us any more.

Our Experience with Netlify + Netlify CMS
-----------------------------------------

Using these techniques, our engineers were able to integrate Netlify CMS into our existing Jekyll site for [Monetery](https://monetery.com/) and launch a working CMS within a matter of days (three, to be exact).  
Content editors were able to onboard quickly and start publishing changes and new pages shortly after launch. During that time we also onboarded a new engineer who was able to start making meaningful contributions on their second day of work!

That said, [we're never done](https://www.dwolla.com/about/core-beliefs/). We're constantly learning from our experiences and trying to improve. Let's take a balanced look at both the pros and cons of using Netlify + Netlify CMS:

### Pros

-   Hosting on Netlify is a breeze and we haven't experienced any issues with the site itself
-   Netlify CMS was very easy to retrofit onto an existing Jekyll project and intuitive for new engineers to learn
-   It's easy and very useful to get a copy of your entire project, including content, and run it locally using docker
-   The Netlify CMS interface is simple and easy to learn for content editors
-   Branch deploys and previews are amazing
-   Netlify's free plans give you the freedom to evaluate the offering before committing
-   There is an active and very helpful [community](https://gitter.im/netlify/NetlifyCMS) for Netlify CMS on Gitter
-   Netlify CMS is open source and welcomes contributions

### Cons

-   Our content editors like the editorial workflow but don't like the multiple steps to save and publish
-   Saving and publishing is relatively slow, sometimes up to a few seconds
-   We experience occasional---but frustrating---errors when using the CMS admin
-   Some widgets or functionality that you might be looking for, such as conditional logic for displaying fields in the admin UI, hasn't been implemented yet
-   The CMS UI doesn't work to save content to your machine during local development, it will always commit back to your Git repository, so be careful
-   You are better off hosting with Netlify instead of another provider if you want features like branch deploys and a hosted Git Gateway -- this may incur more cost to your business

The Community & Contributing Back
---------------------------------

The Netlify CMS community has been nothing short of wonderful to interact with, so we encourage you to reach out and give this technology a try. Dwolla also believes in linking our words with our actions, so we're committed to giving back to the open source community. We're happy to report that our first pull request contributing to Netlify CMS is already live!

Check out the code on GitHub: <https://github.com/netlify/netlify-cms>

Start building in our [sandbox](https://accounts-sandbox.dwolla.com/sign-up) for free, right now. Get a feel for how our API works before going live in production.
