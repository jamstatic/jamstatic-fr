---
title: Configurer Netlify CMS pour Jekyll
description: >-
  Netlify CMS est une application web qui vous permet d'éditer vos fichiers
  Markdown depuis une interface visuelle. Il permet de faciliter l'utilisation
  de générateurs de site statique pour les collaborateurs non techniques.
author: frank
image: /assets/images/netlify-cms.png
---
Les outils de gestion de contenus connectés aux générateurs de site statique continuent d’évoluer. Lors de la refonte de de Smashing Magazine, Netlify, la startup basée à San Francisco, spécialisée dans l’hébergement et le déploiement de sites statiques a développé un CMS headless pour faciliter la contribution des rédacteurs. Ce CMS  open-source est assez facile à configurer, cela ne vous prendra que quelques minutes. Nous utiliserons Jekyll, le générateur le plus populaire,  pour cet article, le principe est similaire pour Hugo ou d’autres générateurs.

Nous partirons du principe que vous avez une installation de Jekyll déjà fonctionnelle, dans le cas contraire, reportez vous à la documentation officielle.
Naturellement vous versionnez votre projet avec Git et vous poussez votre code sur GitHub, GitLab ou BitBucket.

La prochaine étape est de [se connecter chez Netlify](https://app.netlify.com/signup) afin de pouvoir relier votre dépôt Git à ce service d'hébergement et de déploiement continu. C'est gratuit et si vous travaillez sur un projet open-source, vous avez même le droit d'utiliser la formule pro.

L'ajout de site se fait en quelques clics, il n'y a qu'à sélectionner le service utilisé, définir la branche et la commande de build utilisée ainsi que le dossier de publication. Une fois le site configuré, nous allons pouvoir nous occuper d'autoriser l'édition de contenu via Netlify CMS.

La première chose est de [créer une nouvelle application Oauth sur GitHub](https://github.com/settings/applications/new) (ou le service que vous utilisez) et de mentionner `https://api.netlify.com/auth/done` comme URL de callback d'authentification.

Maintenant que l’authentification est configurée nous pouvons ajouter un dossier admin à la racine de notre dépôt qui contiendra deux fichiers : index.html et config.yml.

Le contenu du fichier index.html est le suivant : 

```html
<!doctype html>
<html>

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Netlify CMS</title>

  <link rel="stylesheet" href="https://unpkg.com/netlify-cms@latest/dist/cms.css" />

</head>

<body>
  <script src="https://unpkg.com/netlify-cms@latest/dist/cms.js"></script>
</body>

</html>
```

Comme vous pouvez le voir ce fichier se contente d'appeler des fichiers JS et CSS distants, le fait d'utiliser `@latest` vous permet d'utiliser la dernière version, les mises à jour seront donc automatiques.

Le fichier de configuration ressemble à ça : 

```yaml
backend:
  name: github
  repo: jamstatic/jamstatic-fr
  branch: master

publish_mode: editorial_workflow

media_folder: "assets/images"

collections:
  - name: "Articles"
    label: "Articles"
    folder: "_posts"
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields: # The fields for each document, usually in front matter
      - {label: "Titre", name: "title", widget: "string"}
      - {label: "Description", name: "description", widget: "string"}
      - {label: "Auteur", name: "author", widget: "string"}
      - {label: "Twitter Card", name: "image", widget: "image"}
      - {label: "Texte", name: "body", widget: "markdown"}

```

Il contient le chemin vers votre dépôt GitHub, ici le workflow éditorial est activé, vous pouvez commenter la ligne si vous n'en avez pas l'utilité, enfin la dernière section recense les champs habituellement utilisés dans les variables FrontMatter de vos posts que vous souhaitez pouvoir éditer dans l'interface du CMS. Vous pouvez [personnaliser cette section](https://github.com/netlify/netlify-cms/blob/master/docs/quick-start.md#collections) en fonction de vos besoins et ajouter les widgets dont vous avez besoin. 

Une fois les fichiers personnalisés, il ne vous reste plus qu'à les enregistrer dans votre projet et à pousser le tout. Ce commit va déclencher un build et un déploiement sur Netlify et vous devriez maintenant pouvoir accéder à `https://votredomaine.com/admin/`. Après avoir été authentifié via GitHub, vous aurez ensuite accès à l'interface d'édition des contenus. 

Dans notre exemple, nous avons un site Jekyll tout ce qu'il a de plus simple, avec la collection par défaut, celle des posts (renommés Articles dans notre interface). Si vous avez défini d'autres collections dans votre fichier de configuration, vous pourrez les gérer depuis le CMS.

Si vous souhaitez donner l'accès à plusieurs collaborateurs, rendez vous sur app.netlify.com dans l'onglet access et ajouter autant de collaborateurs que vous le souhaitez.

Et voilà, vous venez d'ajouter une interface d'administration pour la gestion de vos contenus avec un générateur de site statique. Vos collaborateurs peuvent se focaliser sur les contenus, sans avoir à se préoccuper de Git ou du déploiement, tout est automatique, vous bénéficiez même d'un workflow de publication de type Kanban. Netlify génère même une URL de prévisualisation pour chaque pull-request.

Pour les développeurs, sachez que Netlify CMS utilise des composants React pour et que vous pouvez donc ajouter vos propres widgets. Vous trouverez plus d'informations dans [la documentation du projet](https://www.netlifycms.org/docs/). Le projet est encore jeune et le développement assez actif, vous pouvez consulter [la roadmap du projet ](https://github.com/netlify/netlify-cms/projects/3) pour connaître les prochains ajouts de fonctionnalité.



