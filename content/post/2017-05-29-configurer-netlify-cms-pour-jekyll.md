---
date: 2017-05-29T00:00:00Z
description: Netlify CMS est une application web qui vous permet d'éditer vos fichiers
  Markdown depuis une interface visuelle. Cette application web facilite l'utilisation
  de générateurs de site statique pour les collaborateurs non techniques.
image: /assets/images/netlify-cms/netlify-cms.png
title: Configurer Netlify CMS pour Jekyll
url: /2017/05/29/configurer-netlify-cms-pour-jekyll/
---

Les outils de gestion de contenus connectés aux générateurs de site statique continuent d’évoluer. Lors de [la refonte de Smashing Magazine]({% post_url 2017-03-17-smashing-mag-va-dix-fois-plus-vite %}), Netlify la startup basée à San Francisco spécialisée dans l’hébergement et le déploiement de sites statiques a développé un [CMS headless](https://www.netlifycms.org/) pour faciliter la contribution des rédacteurs. Ce [CMS open source](https://www.netlify.com/blog/2017/03/17/an-open-source-cms-with-a-git-centric-workflow/) est simple à configurer, cela ne vous prendra que quelques minutes. Dans cet article, nous utiliserons [Jekyll](https://jekyllrb.com/), le générateur le plus populaire, sachez que le principe est similaire pour [Hugo](https://gohugo.io/) ou d’autres générateurs.
{: .intro }

Nous partirons du principe que vous avez une installation de Jekyll déjà fonctionnelle, dans le cas contraire, reportez vous à la [documentation officielle](https://jekyllrb.com/docs/installation/). Nous présupposons également que vous versionnez votre projet avec Git et vous poussez votre code sur [GitHub](https://github.com), [GitLab](https://gitlab.com) ou [BitBucket](https://bitbucket.org/).

## Configurer Netlify

La première étape est de [se connecter chez Netlify](https://app.netlify.com/signup) afin de pouvoir relier votre dépôt Git à ce service d'hébergement et de déploiement continu. C'est **gratuit** et si vous travaillez sur un [projet open source](https://www.netlify.com/open-source/), vous pouvez utiliser la formule pro.

{% include figure.html url="/assets/images/netlify-cms/new-site-netlify.png" description="Ajout de site, étape 2 : choix du dépôt" %}

L'ajout de site se fait en quelques clics, il n'y a qu'à sélectionner le service utilisé (GitHub pour nous), définir la branche (`master` dans notre cas) et la commande de build utilisée (`jekyll build` pour Jekyll) ainsi que le dossier de publication(`_site` par défaut avec Jekyll). Une fois le site configuré, nous allons pouvoir nous occuper d'autoriser l'édition de contenu via Netlify CMS.

{% include figure.html url="/assets/images/netlify-cms/deploy-settings-netlify.png" description="Ajout de site, étape 3 : configuration du déploiement" %}

## Authentification via GitHub

Maitenant il nous faut [créer une nouvelle application Oauth sur GitHub](https://github.com/settings/applications/new) (ou le service que vous utilisez) et de mentionner `https://api.netlify.com/auth/done` comme URL de callback d'authentification. Vous donnez ainsi l'autorisation à Netlify CMS d'accéder aux fichiers du dépôt.

{% include figure.html url="/assets/images/netlify-cms/edit-oauth-app-github.png" description="Configuration de l'application Oauth dans GitHub" %}

## Ajout des fichiers de l'admin

Maintenant que l'authentification est configurée nous pouvons ajouter un dossier `admin` à la racine de notre dépôt qui contiendra deux fichiers : `index.html` et `config.yml`.

Le contenu du fichier `index.html` est le suivant : 

{% gist efa029c00cccf7c45300d5f10b0afd7c index.html %}

Comme vous pouvez le voir ce fichier se contente d'appeler des fichiers JS et CSS distants, le fait d'utiliser `@latest` vous permet de bénéficier automatiquement de la dernière version, il n'y aura donc aucune mise à jour à faire 😃.

Notre fichier de configuration ressemble à ça :

{% gist efa029c00cccf7c45300d5f10b0afd7c config.yml %}

Il contient le chemin vers votre dépôt GitHub (à adapter donc à votre cas de figure), ici l'option `editorial_workflow` est activée mais vous pouvez commenter la ligne si vous n'en avez pas l'utilité.

{% include figure.html url="/assets/images/netlify-cms/editorial-workflow-netlify-cms.png" description="Aperçu du workflow de publication de Netlify CMS" %}

Vous pouvez préciser le dossier dans lequel vous sauvegardez vos images, ici elles vont dans le dossier `assets/images/`.

La dernière section `collections` recense les champs habituellement utilisés dans les variables FrontMatter des [collections](https://jekyllrb.com/docs/collections/) que vous souhaitez pouvoir éditer dans l'interface du CMS. Vous pouvez [personnaliser cette section](https://github.com/netlify/netlify-cms/blob/master/docs/quick-start.md#collections) en fonction de vos besoins et ajouter les widgets dont vous avez besoin.

{% include figure.html url="/assets/images/netlify-cms/netlify-cms-edit.png" description="Édition des champs personnalisés d'un article" %}

Une fois les champs personnalisés ajoutés, il ne vous reste plus qu'à les enregistrer dans votre projet et à pousser le tout. Grosso modo ça revient à taper quelque chose comme :

```sh
git add admin
git commit -m "Admin de Netlify CMS"
git push
```

## Accéder à l'administration

Ce commit va déclencher un build et un déploiement sur Netlify et vous devriez maintenant pouvoir accéder à `https://votredomaine.com/admin/`. (Notez que ça ne marchera pas en local à l'instar de plugin comme [`jekyll-admin`](https://github.com/jekyll/jekyll-admin)).

Après avoir été authentifié via GitHub, vous avez maintenant accès à l'interface d'édition des contenus. L'UI est encore très sommaire, mais c'est fonctionnel et ça fait le job, cet article a été en partie rédigé via le CMS.

Netlify est en train de travailler sur son [Styleguide](https://styleguide.netlify.com/) et à n'en pas douter son CMS devrait en bénéficier quand il sera plus abouti.

{% include figure.html url="/assets/images/netlify-cms/netlify-cms.png" description="La liste des articles dans Netlify CMS" %}

Dans notre exemple, nous avons un site Jekyll tout ce qu'il y a de plus simple, avec la collection par défaut, celle des posts (renommés Articles dans notre interface via le fichier de configuration). Si vous avez défini d'autres collections dans votre fichier de configuration, vous pourrez également les gérer depuis le CMS.

Si vous souhaitez donner l'accès à plusieurs collaborateurs, rendez vous sur [app.netlify.com](https://app.netlify.com/) dans l'onglet access de votre site et ajoutez autant de collaborateurs que vous le souhaitez.

{% include figure.html url="/assets/images/netlify-cms/access-netlify.png" description="Configuration de l'accès au site Netlify" %}

## Et voilà !

Félicitations, vous venez d'ajouter une interface d'administration pour la gestion de vos contenus gérés à l'aide d'un générateur de site statique. Vos collaborateurs peuvent se focaliser sur la rédaction et l'édition de contenus, sans avoir à se préoccuper des commandes Git ou du déploiement, tout est automatisé ! Vous bénéficiez d'un workflow de publication de type Kanban si vous le désirez et Netlify va jusqu'à génèrer une [URL unique de prévisualisation](https://www.youtube.com/watch?v=s_4UL9oAcVE) accessible depuis GitHub pour chaque pull-request créée. Elle est pas belle la vie ?

{% include figure.html url="/assets/images/netlify-cms/pull-request-netlify-cms.png" description="Lors de la sauvegarde d'un nouvel article, une pull request est créée sur GitHub avec un lien vers une URL de prévisualisation" %}

Et si vous êtes développeur, sachez que Netlify CMS utilise des composants React que vous pouvez étendre pour ajouter vos propres widgets. Vous trouverez plus d'informations à ce sujet dans [la documentation du projet](https://www.netlifycms.org/docs/).

Ce projet de Netlify est encore jeune et le développement assez actif, on peut lui faire confiance vu qu'il est utilisé en production par Smashing Magazine - et Jamstatic à un bien plus modeste niveau. Ce n'est pas le seul service qui permette d'éditer des contenus dans une interface visuelle, mais contrairement à [Siteleaf](https://siteleaf.com) ou [Forestry](https://forestry.io), il est auto-hébergé.

Vous pouvez consulter [la roadmap](https://github.com/netlify/netlify-cms/projects/3) pour suivre l'avancée du projet.

Il est important de noter que le fait d'ajouter ce type de CMS en parallèle de votre générateur de site statique ne change en rien vos habitudes. Les fichiers sont toujours versionnés avec Git puis partagés sur un service de type Github. Contrairement à Drupal ou Wordpress - utilisés en mode monolithique - ici **les développeurs et les rédacteurs partagent un worflow commun**. C'est un gain de sérénité et l'assurance de pouvoir travailler indépendamment des modifications effectuées par un autre profil, tout en gardant une totale autonomie pour publier en production.

Nous sommes convaincus que ce type de workflow va continuer de se répandre de plus en plus dans les équipes, pas seulement avec Netlify CMS mais avec toutes les solutions de CMS headless qui sont désormais disponibles.

La solution présentée ici a l'avantage d'être totalement open source, gageons que le projet gagnera en maturité avec l'aide de la communauté, c'est tout le mal qu'on lui souhaite.
