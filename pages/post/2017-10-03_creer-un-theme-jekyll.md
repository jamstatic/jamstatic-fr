---
title: Créer votre premier thème pour Jekyll
description: Un guide complet pour installer et créer un thème pour Jekyll par David Darnes.
author: frank
date: "2017-10-03 13:45:36 +0100"
lastmod: "2018-01-17 10:10:00 +0100"
source:
  lang: en
  title: "Making your first Jekyll theme: Part 1"
  url: https://www.siteleaf.com/blog/making-your-first-jekyll-theme-part-1/
  author: David Darnes
categories:
  - jekyll
---
:::intro
Si vous êtes designer web, que vous savez écrire des pages HTML, les mettre en forme avec CSS, voire les enrichir avec du JavaScript, vous n’aurez aucun mal à développer des thèmes pour Jekyll. Le langage de templating [Liquid](https://shopify.github.io/liquid/) a été conçu par Shopify pour les web designers et se prend rapidement en main. Développer un thème pour Jekyll demande de respecter quelques conventions et de se familiariser avec la gestion des gems Ruby, rien de bien sorcier. Dans cet article, [David Darnes](https://darn.es/), développeur du thème [Alembic](https://alembic.darn.es), explique comment utiliser une 💎 gem de thème pour Jekyll, puis comment développer la vôtre.
:::

![](https://res.cloudinary.com/jamstatic/image/upload/c_scale,q_auto,w_1028/v1523345884/jamstatic/making-jekyll-theme-intro.jpg)

Tout site correctement structuré permet de présenter facilement ses contenus à l’aide d’un thème, à l’image de ce que souhaite son propriétaire ou son créateur. Jekyll n’échappe pas à la règle. Les pages, les articles et autres formes de contenu formatés peuvent être présentés à l’aide de différents modèles.

Les thèmes pour Jekyll existent depuis un moment, mais le processus d’installation laissait un peu à désirer. Il fallait recopier minutieusement les fichiers de contenus et les différents modèles. Avec l’introduction des [gems de thèmes](https://jekyllrb.com/docs/themes/), les thèmes s’installent maintenant comme les plugins à l’aide de bundler.

## Comment fonctionnent les thèmes ?

Les thèmes pour Jekyll permettent de packager tous les modèles et les fichiers relatifs à la présentation dans une [`gem` Ruby](https://guides.rubygems.org/what-is-a-gem/), exactement comme c’était déjà le cas pour les plugins. Cela signifie qu’un design peut s’appliquer simplement à un ou plusieurs sites, sans que la couche de présentation ne vienne semer la pagaille dans les fichiers de votre site.

**Exemple de structure de site sous Jekyll utilisant une gem de thème :**

```
source/
├── _posts/
│   └── mon-super-article-14-09-2017.md
├── index.html
├── Gemfile
├── _config.yml
├── 404.md
└── a-propos.md</code></pre>
```

Il est également possible de prendre le pas sur les fichiers de thèmes, un peu à la manière des [thèmes enfants dans WordPress](https://code.tutsplus.com/articles/how-to-modify-the-parent-theme-behavior-within-the-child-thème--wp-31006). Si vous ne connaissez pas le principe, cela signifie qu’un fichier de votre site sera prioritaire sur le fichier du thème situé au même endroit et qui porte le même nom.

## Comment utiliser un thème ?

Installer un thème est vraiment très simple, mais si vous découvrez Jekyll, vous hésitez peut-être encore à les tester.

D’abord, il faut ajouter le thème que vous voulez utiliser à la liste des gems que vous utilisez pour votre site :

```ruby
# La gem de base pour Jekyll
gem "jekyll" "~> 3"

# La gem du thème que vous souhaitez utiliser
gem "alembic-jekyll-theme", "~> 2.2"

# Les plugins que vous utilisez
group :jekyll_plugins do
  gem "jekyll-sitemap"
  gem "jekyll-paginate"
  gem "jekyll-seo-tag"
end
```

Le code ci-dessous est un exemple de fichier `Gemfile`. Ce fichier `Gemfile` sert à gérer les gems de votre projet avec l’aide de [Bundler](https://bundler.io/). Ici j’utilise le thème `alembic-jekyll-theme`, ainsi que d’autres plugins pour Jekyll.

Ensuite, il faut déclarer l’utilisation du thème dans votre fichier de configuration `_config.yml`:

```yaml
theme: alembic-jekyll-thème
```

Une fois que vous avez modifié ces deux fichiers, il va falloir utiliser [Bundler](https://bundler.io/) pour installer notre nouveau thème et pouvoir générer et prévisualiser notre site. Dans votre terminal tapez la commande suivante :

```sh
bundle
```

Cela va installer les gems manquantes, puis tapez…

```sh
bundle exec jekyll build
```

…pour générer le site avec Jekyll.

Pour des exemples plus avancés [consultez la documentation de Siteleaf sur la gestion des thèmes Jekyll](https://learn.siteleaf.com/thèmes/gem-based-thèmes/).

## Quels thèmes puis-je utiliser ?

![](https://res.cloudinary.com/jamstatic/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_862/v1603642926/jamstatic/making-jekyll-theme-slices.jpg)

De nouvelles gems de thèmes arrivent régulièrement. Il existe des annuaires de thèmes pour Jekyll, mais ils recensent également les anciens types de thèmes (ceux à recopier à la main). Si vous cherchez des thèmes sous forme de gem, recherchez plutôt ['jekyll-theme' sur rubygems.org](https://rubygems.org/search?query=jekyll+theme).

Pour ma part j’en ai développé deux :

- [**Alembic**](https://alembic.darn.es) - un thème prêt à l’emploi, qui peut aussi servir de point de départ pour votre projet,
- [**Garth**](https://garth.darn.es) - un thème de blog très simple.

Ces deux thèmes sont compatibles avec Siteleaf, vous pouvez donc configurer un nouveau site sur Siteleaf sans problème. Je vous recommande aussi [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/), un thème très complet développé par Michael Rose. Michael développe des thèmes pour Jekyll depuis un moment et son code est très propre.

Pour ceux d’entre vous qui utilisent GitHub Pages pour héberger leur site Jekyll, seuls [quelques thèmes sont autorisés](https://pages.github.com/themes/) par défaut.

C’est en partie la raison pour laquelle, selon moi, les thèmes n’ont peut-être pas encore l’ampleur qu’ils pourraient avoir.

Beaucoup d’utilisateurs de Jekyll se reposent sur GitHub Pages pour gérer et héberger leur site, et sont donc limités à ces quelques thèmes. Il est néanmoins possible de contourner cette limitation en utilisant par exemple la formule [Siteleaf Team+ plan](https://www.siteleaf.com/plans/) qui vous permet [d’utiliser n’importe quel thème Jekyll](https://learn.siteleaf.com/thèmes/gem-based-themes/) et [n’importe quel plugin](https://learn.siteleaf.com/themes/jekyll-plugins/#third-party-plugins).[^custom-plugins]

[^custom-plugins]: NdT: D’autres solutions d’hébergement gratuites comme [Netlify](https://netlify.com) ou [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/) permettent d’utiliser les gems de votre choix. Il est également possible de [passer par Travis CI pour générer votre site](https://ayastreb.me/deploy-jekyll-to-github-pages-with-travis-ci/) avant de pousser le résultat sur GitHub Pages.

## Trucs et astuces pour créer un super thème

Si vous avez envie de développer votre propre thème, permettez-moi de partager avec vous ce que mon expérience m’a enseigné.

![checklist d’un thème jekyll](https://res.cloudinary.com/jamstatic/image/upload/c_scale,q_auto,w_1024/v1523346069/jamstatic/making-jekyll-theme-checklist.jpg "checklist d’un thème jekyll.")

Voici quelques trucs à garder en tête quand on développe son propre thème, surtout que vous souhaitez qu’il soit utilisé par d’autres utilisateurs de Jekyll (et de Sitelaf) :

1. **Testez votre thème :** Vous ne testerez jamais assez. Le meilleur moyen est encore de suivre votre propre documentation et de repartir de zéro. Testez votre thème avec différentes sortes de contenus. Les thèmes doivent pouvoir habiller différents types et différentes tailles de contenus.
2. **Fournissez une bonne documentation :** Tout bon thème s’accompagne d’une documentation claire et détaillée. C’est même un prérequis spécifique si vous souhaitez soumettre votre thème sur des marketplaces comme ThemeForest. Assurez-vous que le processus d’installation soit simple à suivre et que toutes les fonctionnalités et les options sont documentées. Je fais de mon mieux pour garder la [documentation de l’utilisation d’Alembic](https://github.com/daviddarnes/alembic#alembic) à jour.
3. **Évitez les choses trop complexes :** J’ai vu beaucoup de thèmes WordPress échouer, car ils voulaient trop en faire. Ce n’est pas forcément simple mais essayez de trouver un juste équilibre entre le nombre d’options proposées et celles activées par défaut. Vous ne voulez pas générer de frustration chez les gens en vous éloignant trop de l’aspect de la démo. De plus, Jekyll est un générateur de site statique qui prône la simplicité, votre thème devrait s’en inspirer.
4. **Définissez un usage :** Concevoir un thème susceptible de plaire au plus grand monde _et_ à un certaine type d’industrie peut s’avérer difficile. Je ne dis pas qu’il faut faire faire quelque chose de très spécifique pour l’agence immobilière du coin de la rue, mais peut-être quelque chose en relation avec les sites immobiliers en général. Il y a beaucoup de thèmes génériques qui essaient de répondre à un maximum d’attentes, et vous feriez peut-être bien de ne pas essayer d’aller sur ce terrain mais à la rencontre d’une audience plus ciblée.
5. **Concevez avec l’extensibilité en tête :** Il est fort probable que les utilisateurs de votre thème veuillent le personnaliser, essayez de concevoir votre thème de façon standard. Nommez vos modèles et vos fichiers en fonction [des conventions](https://jekyllrb.com/docs/structure/), et utilisez des noms explicites pour vos `_includes` (par exemple `icon.html` si c’est pour insérer une icône).

Maintenant que vous en savez un peu plus sur les thèmes pour Jekyll, voyons ensemble quelles sont les choses à savoir pour développer sa propre gem de thème pour Jekyll.

## Bien configurer son environnement

Avant de rentrer dans le vif du sujet, il y a quelques prérequis à respecter. Il est préférable de connaître un minimum le fonctionnement de Jekyll, l’arborescence de fichiers d’un thème ressemble à celle d’un site Jekyll, même chose pour le processus de développement et le versionnement des fichiers avec Git.

Jekyll doit donc être installé sur votre machine à l’aide de Ruby. Si vous êtes sous macOS High Sierra livré avec Ruby 2.3 vous ne devriez avoir qu’à taper une ligne de commande :

```sh
gem install bundler jekyll
```

La documentation officielle propose une méthode pour [installer Jekyll sur une machine Windows](https://jekyllrb.com/docs/windows/).

Si vous préférez utiliser [la gem de GitHub en vue d’utiliser GitHub Pages](https://github.com/github/pages-gem), vous serez limité aux gems supportées par cette plate-forme.

Vous aurez dans tous les cas besoin de [Bundler](http://bundler.io/), pour la gestion des gems utilisées par votre thème.

Enfin, si vous souhaitez proposer votre thème sous forme de gem au public, vous aurez besoin d’un compte sur [RubyGems.org](https://rubygems.org/).

## C’est parti

Nous allons commencer par créer une base pour notre thème à l’aide de la commande `new-theme` de Jekyll :

```sh
jekyll new-theme mon-theme
```

Cette commande va générer les fichiers nécessaires pour commencer à développer notre thème avec le nom que vous aurez choisi, ici je l’ai appelé `mon-theme`.

Nous devons ajouter quelques informations à notre thème avant de continuer : une courte description et une URL pour donner plus d’informations sur notre thème, généralement c’est l’URL du dépôt GitHub du thème — ou celle du site web du thème si vous en générez un. Pour cela nous éditons le fichier `.gemspec` qui porte le nom de votre thème. Les deux champs à renseigner sont :

```ruby
spec.summary       = "Une brève description de mon thème"
spec.homepage      = "http://url-de-mon-theme.com"
```

Une fois que c’est fait et que vous avez sauvegardé vos changements, nous pouvons installer les gems dont dépend notre thème.

Vous remarquerez que plus bas dans le fichier `.gemspec`, il y a des lignes qui commencent par `spec.add_runtime_dependency` et `spec.add_development_dependency`. C’est ici que nous allons pouvoir spécifier les gems dont notre thème aura besoin pour fonctionner : _runtime_ quand le thème est utilisé et comme son nom l’indique _development_ pour le développement du thème à proprement parlé. L’installation des dites gems se fait ensuite via la commande :

```sh
bundle
```

Pour prévisualiser votre thème et vous assurer qu’il fonctionne bien, vous devez avoir un fichier `index.html` à la racine de votre répertoire avec quelque chose comme :

```md
---
title: Accueil
layout: home
---

# Du Markdown en plus (ou pas)
```

Ce fichier va vous permettre de prévisualiser votre thème localement, comme vous le feriez avec n’importe quel site Jekyll. Pour lancer la génération et la prévisualisation dans votre navigateur, utilisez la commande suivante :

```sh
bundle exec jekyll serve
```

:::tip
Si vous utilisez Jekyll v3.7.0, vous pouvez passer l’option `--livereload` en paramètre pour que votre navigateur rafraîchisse automatiquement la page après modifications des fichiers.
:::

La sortie sur la console devrait ressembler à ça :

```sh
$ bundle exec jekyll serve --livereload
Configuration file: none
            Source: /Users/frank/code/jekyll/themes/mon-super-theme
       Destination: /Users/frank/code/jekyll/themes//mon-super-theme/_site
 Incremental build: disabled. Enable with --incremental
      Generating…
                    done in 0.095 seconds.
 Auto-regeneration: enabled for '/Users/frank/code/jekyll/themes/mon-super-theme'
LiveReload address: http://127.0.0.1:35729
    Server address: http://127.0.0.1:4000
  Server running… press ctrl-c to stop.
        LiveReload: Browser connected
```

Pour ceux qui ne sont pas encore très familiers avec l’écosystème Ruby, préfixer la commande par `bundle exec` permet de nous assurer que nous utilisons bien les gems définies dans le fichier `Gemfile` du dossier courant. Ici comme nous travaillons sur une gem, il pointe vers le fichier `.gemspec`. Ainsi nous sommes dans la même configuration que les futurs utilisateurs de notre thème.

## La structure de fichiers

Pour le moment nous avons donc la structure suivante :

```sh
├── _includes
├── _layouts
│   ├── default.html
│   ├── page.html
│   ├── post.html
├── _sass
│   ├── LICENSE.txt
│   ├── README.md
│   ├── assets
│   ├── index.html
│   └── mon-super-theme.gemspec
├── assets
├── index.html
├── mon-super-theme.gemspec
├── Gemfile
├── Gemfile.lock
├── LICENSE.txt
├── README.md
```

Voyons à quoi servent les différents dossiers et fichiers présents :

- `_includes` : vide pour le moment, il sert à stocker les fichiers de gabarits partiels,
- `_layouts` : contient pour le moment trois exemples de gabarits : `default.html`, `post.html` and `page.html`,
- `_sass` : vide pour le moment, destiné à stocker vos fichiers Sass,
- `assets` : également vide pour le moment, ce dossier contiendra tous les fichiers statiques dont vous aurez besoin pour votre site : CSS, JS, polices de caractères, images, etc. C’est dans ce dossier que nous placerons le fichier de styles principal `styles.scss` qui génèrera un fichier `styles.css` auquel nous ferons référence dans notre modèle de page,
- le fichier `Gemfile` - qui indique à Bundler quelles gems sont nécessaires, et qui pointe vers le fichier `.gemspec`,
- le fichier `mon-super-theme.gemspec` dans lequel nous stockons toutes les inforamtions relatives à notre thème, ainsi que les gems dont il dépend. On y définira le numéro de version ainsi que la liste des fichiers de notre thème défini à l’aide de `spec.files`. Vous n’avez pas besoin d’éditer cette liste, qui respecte déjà la [convention standard des thèmes Jekyll](https://jekyllrb.com/docs/themes/#creating-a-gem-based-theme),
- des fichiers `LICENSE.txt` et `README.md` qui contiendront le fichier de licence de votre theme ainsi qu’un fichier README pour les instructions d’installation et d’utilisation de votre thème. Nous avons vu plus haut qu’il est important de [bien documenter votre thème](#trucs-et-astuces-pour-créer-un-super-thème).

Voilà pour la structure d’un thème - tout le reste, comme les exemples de contenu qui vous pourriez fournir devraient être ignorés par les fichiers `.gitignore` et `.gemspec`.

## Développer votre thème

La base d’un thème Jekyll n’a plus de secrets pour vous. Notez bien les plugins utilisés par votre thème dans le fichier `.gemspec` et rappelez-vous que par défaut GitHub pages n’autorise qu’une [liste limitée de plugins](https://pages.github.com/versions/). Sachez que le [formule Team plan](https://www.siteleaf.com/plans/) de Siteleaf vous permet de vous affranchir de cette limitation, même chose chez [Netlify](https://netlify.com).

## Ajouter des contenus d’exemple

![Exemple de contenu du thème Alembic](https://res.cloudinary.com/jamstatic/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_862/v1523346121/sample_content.png)

Nous venons d’ajouter un fichier `index.html` pour vérifier que la génération fonctionne comme prévu. On pourrait aussi s’en servir pour tester des contenus type. Néanmoins, la page d’accueil ne suffira pas pour effectuer un test complet de notre thème. Créons un dossier `_posts` et ajoutons-y quelques billets types. Utilisez de vrais articles plutôt que du faux texte, ajoutez des images, des exemples de code, voire des vidéos. Il est important de tester tous les types de contenu possible qu’une personne pourrait vouloir ajouter sur son site.

Au cœur de tout site Jekyll, on trouve le fichier de configuration principal (`_config.yml`). Il permet de définir tout un tas de paramètres comme le nom et la description de votre site. Le thème Alembic possède un [exemple de fichier de configuration](https://github.com/daviddarnes/alembic/blob/master/_config.yml) qui permet aux utilisateurs du thème d’avoir une configuration de référence sur laquelle se baser. Si vous voulez en savoir plus sur les possibilités de configuration de Jekyll, reportez-vous [à la documentation officielle](https://jekyllrb.com/docs/configuration/).

## Soumettre sa gem de thème

Une fois que vous êtes satisfait du résultat de la première itération de votre thème, que vous avez bien enregistrer vos modifications, puis que vous les avez poussées sur votre dépôt Git, vous pouvez procéder à la génération de votre gem. Le fichier `.gem` va empaqueter tous vos modèles de page, vos styles dans un seul fichier. Il faudra ensuite publier ce fichier sur le [RubyGems.org](https://rubygems.org).

Pour générer votre gem, il vous suffit d’utiliser cette commande :

```sh
gem build mon-super-theme.gemspec
```

Une fois que c’est fait, un nouveau fichier est présent à la racine de votre projet - du type `mon-super-theme-0.1.0.gem`. La nomenclature correspond au nom de votre gem et au numéro de version indiqués dans votre fichier `.gemspec`. Une fois la gem générée, il ne reste plus qu’à la pousser en ligne avec la commande :

```sh
gem push mon-super-theme-0.1.0.gem
```

Lors de la première soumission de gem, vous devrez entrer vos identifiants de connexion à RubyGems.org. Une fois connecté, votre gem est mise en ligne et rendue publique ! Et voilà, vous venez de publier votre première gem de thème pour Jekyll. Elle dispose maintenant de sa propre URL.

![Exemple de page Rubygems](https://res.cloudinary.com/jamstatic/image/upload/c_scale,dpr_auto,f_auto,q_auto,w_862/v1523346185/sample_rubygems_page.png "Exemple de page Rubygems")

## Les thèmes distants sur GitHub Pages

Récemment GitHub Pages a ajouté le [support des thèmes distants](https://github.com/blog/2464-use-any-theme-with-github-pages), tout dépôt de thème Jekyll public sur GitHub peut être utilisé comme un thème Jekyll.

L’installation d’un thème distant demande l’utilisation du plugin [jekyll-remote-theme](https://github.com/benbalter/jekyll-remote-theme), qui est donc autorisé sur GitHub Page. Pour l’installer il vous faut déclarer le plugin dans votre fichier `_config.yml` et utiliser une clé spécifique `remote_theme` dont la valeur correspond au nom d’utilisation GitHub suivi du nom du dépôt de votre thème. Dans mon cas ça donne :

```yaml
plugins:
  - jekyll-remote-theme

remote_theme: daviddarnes/alembic
```

En pratique ça change quoi pour le développement de votre thème ? Et bien si vous voulez rendre votre thème utilisable sur GitHub Pages, il faudra vous assurer que vous n’utilisez que des plugins autorisés par GitHub. Et donc tester votre thème avec la gem GitHub Pages et vous assurer que tout fonctionne correctement.

Le plugin jekyll-remote-theme vous permet de pointer vers des numéros de releases ou des branches particulières. Générer une release GitHub est un bon moyen pour les gens de pouvoir s’en tenir à une version définie de votre thème, comme ceci :

```yaml
remote_theme: daviddarnes/alembic@2.3.1
```

## Tests et mises à jour

Une fois votre thème en ligne, assurez-vous une dernière fois qu’il fonctionne [comme n’importe quel autre thème Jekyll](https://jekyllrb.com/docs/themes/#installing-a-theme). Notez les difficultés qu’un utilisateur pourrait rencontrer.

Si vous devez publier des corrections ou des mises à jour, vous allez devoir [incrémenter le numéro de version de façon appropriée](https://guides.rubygems.org/patterns/#semantic-versioning) dans votre fichier `.gemspec`, générer une nouvelle version de votre gem et la publier sur Rubygems.org.

N’hésitez pas à [m’envoyer un tweet si vous avez des questions](https://twitter.com/DavidDarnes). Si vous utilisez Siteleaf, vous pouvez venir discuter avec la communauté sur [http://chat.siteleaf.com/](http://chat.siteleaf.com/) pour poser vos questions et partager votre travail.
