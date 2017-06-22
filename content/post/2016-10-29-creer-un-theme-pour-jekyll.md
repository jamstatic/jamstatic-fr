---
date: 2016-10-29T15:18:59Z
description: Jekyll permet de publier des thèmes sous forme de gem, afin de faciliter
  l'installation et les mises à jour.
title: Créer un thème pour Jekyll
url: /2016/10/29/creer-un-theme-pour-jekyll/
---

Depuis la version 3.2, les webdesigners ont la possibilité de créer des thèmes pour Jekyll. Le support des thèmes sous forme de gem est encore récent mais les premiers thèmes commencent à arriver. Nous allons voir dans cet article que l'opération est assez triviale si vous êtes déjà familiarisé avec Jekyll et Git. Packager un thème se fait en quelques minutes grâce à l'utilisation de `bundler`.
Voyons ensemble à quoi ressemble le workflow de création de thème pour Jekyll.
{: .intro }

## Pré-requis

Nous allons supposer que vous connaissez déjà Jekyll, que vous savez créer des modèles de pages, si ce n'est pas le cas, commencez par lire [la documentation officielle,](http://jekyllrb.com/docs/templates/) vous verrez c'est très accessible, c'est du HTML auquel on va ajouter un peu de [Liquid](http://shopify.github.io/liquid/), le langage de templating conçu pour les concepteurs de thèmes Shopify, pour accéder à nos données.

Nous ne nous étendrons donc pas pas sur cette partie, qui consiste à préparer vos différents modèles de pages, ce sont les conventions par défaut de Jekyll qui s'appliquent : les feuilles de styles sont stockées dans le dossier `_sass`, les modèles de pages dans le dossier `_layouts`, les composants réutilisables dans `_includes`. Enfin tous les assets (CSS, JS, images, fonts) sont regroupés dans un dossier `assets` (et non `_assets` pour éviter les conflits avec le plugin `jekyll-assets`).

On notera que pour le moment par défaut, seuls ces dossiers seront fournis par le thème, nous verrons comment y ajouter des contenus et des exemples un peu plus bas.

Les thèmes seront téléchargés sous forme de gem, vous devez donc avoir installé [bundler](http://bundler.io/) avec la commande `gem install bundler`, ce qui est généralement le cas puisque Jekyll encourage son utilisation pour la gestion des dépendances. Enfin, il vous faut [créer un compte sur Rubygems](https://rubygems.org/sign_up) pour publier votre thème, ça ne vous prendra que quelques secondes si vous avez déjà un compte GitHub.

## Préparer son thème

Vous avez donc un site statique sous Jekyll et vous souhaitez le partager avec la communauté sous forme de thème. Il y a deux façons de faire, selon vos préférences. L'une d'elle consiste à utiliser la commande `new-theme` pour générer une structure de base dans laquelle vous allez pouvoir ajouter vos fichiers :

```shell
bundle exec jekyll new-theme mon-super-theme
```

Cette commande va créer un dossier dans le répertoire courant, qui portera le même nom que celui que vous avez fourni en argument, étonnant non ?

Ce dossier comprend tous les dossiers évoqués plus haut : `_includes`, `_layouts`, `_sass` et `assets` ainsi qu'un fichier `Gemfile` et un fichier `mon-super-theme.gempsec` qui contient les informations sur votre thème.

Vous pouvez maintenant recopier les fichiers de votre thème dans cette structure d'exemple.

L'autre manière de faire, c'est de partir de votre site fonctionnel et d'adapter sa structure de manière à vous retrouver avec quelque chose qui ressemble à ça :

```shell
├── .gitignore
├── Gemfile
├── LICENSE.md
├── README.md
├── _includes
│   └── head.html
│   └── ...
├── _layouts
│   ├── default.html
│   ├── home.html
│   ├── page.html
│   └── post.html
│   └── ...
├── _sass
│   ├── _base.scss
│   ├── _variables.scss
│   ├── ...
├── assets
│   ├── favicons
│   ├── fonts
│   └── images
│   └── js
│   └── css
├── demo
│   ├── 404.html
│   ├── Gemfile
│   ├── _config.yml
│   ├── _posts
│   │   ├── 2016-10-20-presentation-de-jekyll.md
│   │   ├── 2016-01-02-exemple-de-contenu.md
│   │   └── 2016-01-03-introduction.md
│   │   └── ...
├── mon-super-theme.gemspec
└── screenshot.png
```

Parmi les différences avec un site Jekyll classique, on remarque la présence d'un fichier `Gemfile` un peu particulier, d'un fichier `gemspec` pour la spécification de la gem, d'un fichier LICENSE (MIT par défaut), d'un fichier `README.md`, d'une capture d'écran et d'un dossier `demo` (ou `example`, c'est selon).

Si on regarde le contenu du fichier `Gemfile` d'une gem, il est différent de ceux que vous avez l'habitude d'utiliser. Il fait simplement référence au fichier de spécification de la gem :

```ruby
source "https://rubygems.org"
gemspec
```

En effet, c'est le fichier `gemspec` qui va contenir toutes les infos sur notre thème : le numéro de version, sa description, ses dépendances, etc. Pour savoir tout ce que peut contenir ce type de fichier, je vous invite à consulter la [documentation de référence des spécifications d'une gem](http://guides.rubygems.org/specification-reference/).

Lorsque vous utilisez la commande `new-theme` de Jekyll, par défaut, le fichier de spécification de votre gem ressemble à ça :

```
# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "mon-super-theme"
  spec.version       = "0.1.0"
  spec.authors       = ["Frank Taillandier"]
  spec.email         = ["frank@taillandier.me"]

  spec.summary       = %q{TODO : Une courte description de votre thème, requise par Rubygems.}
  spec.homepage      = "TODO : Indiquez ici l'adresse du site de votre gem ou l'URL publique de son dépôt"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.add_development_dependency "jekyll", "~> 3.3"
  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 10.0"
end
```

Outre les méta-données à renseigner, il est intéressant de noter qu'une expression régulière basée sur une commande Git liste les fichiers à inclure dans la gem, cela implique donc que vos fichiers soient versionnés avec Git. Le minimum étant d'avoir initialisé votre dépôt, d'avoir ajouté tous les fichiers qui vont bien et d'avoir enregistré le tout : `git init && git add . && git commit -m "Initial commit"`.

On peut voir aussi à la fin du fichier que la version 3.3 ou supérieure de Jekyll est requise, en effet avant cette version, le dossier `assets` n'était pas géré et le support initial des thèmes n'est arrivé qu'avec la version 3.2.

On constate aussi que `bundler` est déclaré en tant que dépendance pour le développement, ainsi que `rake`, souvent utilisé pour ajouter des tests ou des tâches automatisées.

Vous pouvez très bien vouloir ajouter d'autres dépendances lors de l'exécution, si vous souhaitez utiliser des plugins dans votre thème. Dans notre exemple, nous voulons ajouter la gestion d'un flux RSS, la génération d'un sitemap et des méta-données pour le SEO.

Nous ajoutons donc les dépendances ainsi que les version minimales requises, comme nous le ferions dans un fichier `Gemfile` à l'aide de [`spec.add_runtime_dependency`](http://guides.rubygems.org/specification-reference/#add_runtime_dependency) :

```ruby
spec.add_runtime_dependency "jekyll-feed", "~> 0.8"
spec.add_runtime_dependency "jekyll-sitemap", "~> 0.12"
spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.0"
```

Une fois que votre fichier de spécification est complété, vous allez pouvoir tester votre thème.

## Tester son thème

Commencez par lancer `bundle install` pour installer les dépendances mentionnées dans le fichier `gemspec`.

### Fournir des exemples de contenu

Comme nous l'avons dit plus haut, pour le moment les thèmes sont livrés sans contenu et ne contiennent que les modèles et les assets. **Lors d'une mise à jour de thème, tous ces fichiers seront écrasés**, c'est le principal intérêt d'utiliser une gem pour le designer ou l'utilisateur, mais à aucun moment vous ne souhaitez écraser les contenus existants.

Cependant, même si la gem ne contient pas de contenus, rien ne vous empêche d'en ajouter dans le dépôt de votre thème pour fournir un exemple de thème entièrement fonctionnel à vos utilisateurs.

Afin de ne pas mélanger les fichiers d'exemple avec ceux de votre thème, il est donc conseillé de créer un dossier `demo` (ou `example` ou ce que vous voulez) et d'y stocker des contenus destinés à présenter aux utilisateurs le rendu de votre thème.

En plus des fichiers générés par la commande `new-theme`, nous ajouterons dans ce dossier `demo` tout ce qu'il faut pour faire tourner un site sous Jekyll :  un fichier `_config.yml`,  un fichier `Gemfile` ainsi que des pages et des posts bien entendu. Vous pouvez également ajouter des exemples de données dans le dossier `_data` voire des collections, comme vous le feriez dans n'importe quel site.

Le fichier `demo/Gemfile` ressemble à quelques détails près à celui que vous utiliseriez pour n'importe quel site :

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 3.3"
gem "mon-super-theme", path: "../"

group :jekyll_plugins do
  gem "jekyll-sitemap"
  gem "jekyll-seo-tag"
  gem "jekyll-feed"
end
```

Nous voyons qu'il fait référence à la gem de notre thème, mais comme pour le moment nous n'avons pas encore publié notre thème sous forme de gem, nous nous contentons de faire référence au dossier parent, qui contient les fichiers de notre thème. Cette notation est bien pratique pour tester votre thème en local. Une fois votre gem publiée, vous pourrez choisir de supprimer paramètre path de votre gem, pour que bundler aille télécharger la dernière version sur Rubygems.
Nous listons également les plugins utilisés dans notre thème.

Maintenant, pour que Jekyll utilise notre thème, nous allons devoir le lui indiquer dans le fichier `demo/_config.yml` en ajoutant la ligne :

```yaml
theme: mon-super-theme
```

Là encore, le nom utilisé doit être le même que celui de votre fichier `gemspec`. Nous indiquons également dans ce fichier de configuration que nous utilisons les plugins suivants :

```yaml
gems:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag
```

Nous pouvons maintenant tester notre thème en exécutant la commande `bundle exec jekyll serve --source demo` depuis le répertoire racine ou `cd demo && bundle exec jekyll serve`, c'est du pareil au même. N'oubliez pas d'ajouter le répertoire de destination - `_site` par défaut - à votre fichier `.gitignore`.

Vérifiez le rendu sur différents navigateurs et appareils, aidez vous d'[html-proofer](https://github.com/gjtorikian/html-proofer) si vous souhaitez vous assurer que tous les liens internes fonctionnent :

```shell
bundle exec htmlproofer ./demo/_site --disable-external
```

Vous êtes satisfait de la première version de votre thème ? Parfait ! Veillez maintenant à bien renseigner le fichier `README.md` pour expliquer comment installer et utiliser votre thème, c'est toujours agréable d'avoir une bonne documentation à sa disposition.

Afin de permettre aux utilisateurs d'avoir un aperçu de votre thème, il est également recommandé d'ajouter une capture d'écran nommée `screenshot.png` à la racine de votre dépôt et de l'insérer dans votre fichier `README.md`.

### Packager son thème

Une fois que votre thème est fonctionnel, documenté, vous êtes parés pour la publication. Cette étape est déjà [documentée sur le site de Jekyll](https://jekyllrb.com/docs/themes/#publishing-your-theme), nous nous contenterons simplement ici de rappeler qu'elle se fait en deux temps.

La première commande va créer la gem à proprement parlée à partir du fichier de spécification :

```shell
gem build mon-super-theme.gemspec
  Successfully built RubyGem
  Name: mon-super-theme
  Version: 0.0.1
  File: mon-super-theme-0.0.1.gem
```

Comme il est inutile de versionner la gem générée (mais cela ne vous dispense pas d'utiliser les tags git pour vous rappeler du moment où vous l'avez générée), pensez donc à ajouter la ligne suivante dans votre fichier `.gitignore` :

```
*.gem
```

Vous pouvez en profiter pour vérifier que l'installation de votre gem se déroule sans encombres :

```shell
gem install mon-super-theme-0.0.1.gem
Successfully installed mon-super-theme-0.0.1
1 gem installed
```

Si tout est OK, il ne vous reste maintenant plus qu'à publier votre thème sur [Rubygems](https://rubygems.org/) :

```shell
gem push mon-super-theme-0.0.1.gem
Pushing gem to https://rubygems.org...
```

Et voilà ! Votre thème peut maintenant être utilisé avec Jekyll. Il n'existe pas encore de site officiel qui répertorie tous les thèmes installables via des gems pour Jekyll, c'est donc à vous de communiquer sur la disponibilité de votre thème, par exemple sur [le forum de Jekyll](https://talk.jekyllrb.com/t/gem-based-themes/3089/), sur Twitter avec le hashtag `#jekyllrb` ou en commentaire de ce billet :).

Si vous cherchez des références, vous pouvez toujours prendre exemple sur des structures de thèmes accessibles sur Github, notamment :

* [Minima](https://github.com/jekyll/minima), le thème par défaut de Jekyll, idéal pour se familiariser avec la structure que nous venons de voir,
* [Alembic](https://github.com/daviddarnes/alembic/) un bon point de départ un plus complet proposé par David Darnes
* [Minimal mistakes](https://github.com/mmistakes/minimal-mistakes/), le thème très complet de Michael Rose, qui utilise des collections et tout un tas d'autres fonctionnalités plus avancées de Jekyll.

Voilà, maintenant c'est à vous de jouer, faites de beaux thèmes pour Jekyll !
