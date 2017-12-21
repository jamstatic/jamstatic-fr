---
title: Créer votre premier thème pour Jekyll
date: "2017-10-03 13:45:36 +0100"
description: >
  Bonnes pratiques pour installer une gem de thème Jekyll.
images:
  - https://www.siteleaf.com/uploads/making-jekyll-theme-intro.jpg
source:
  lang: en
  title: "Making your first Jekyll theme: Part 1"
  url: https://www.siteleaf.com/blog/making-your-first-jekyll-theme-part-1/
  author: David Darnes
categories:
  - jekyll
---

{{% intro %}}
Si vous êtes designer web, que vous savez écrire des pages HTML,
les mettre en forme avec CSS, voire les enrichir avec du JavaScript, vous
n'aurez aucun mal à développer des thèmes pour Jekyll. Le langage de templating
[Liquid](https://shopify.github.io/liquid/) a été conçu par Shopify pour les web
designers et se prend rapidement en main. Dans cet article, [David Darnes](https://darn.es/), le développeur du thème [Alembic](https://alembic.darn.es) explique dans un premier temps comment utiliser une 💎 gem de thème pour Jekyll.
{{% /intro %}}

![](https://www.siteleaf.com/uploads/making-jekyll-theme-intro.jpg)

Tout site correctement structuré permet de présenter facilement ses contenus à
l'aide d'un thème, à l'image de ce que souhaite son propriétaire ou son
créateur. Jekyll n'échappe pas à la règle. Les pages, les articles et autres
formes de contenu formatés peuvent être présentés à l'aide de différents modèles.

Les thèmes pour Jekyll existent depuis un moment, mais le processus
d'installation laissait un peu à désirer. Il fallait recopier minutieusement les
fichiers de contenus et les différents modèles. Avec l'introduction des [gems de thèmes](https://jekyllrb.com/docs/themes/), les thèmes s'installent maintenant
en quelques lignes de code.

## Comment fonctionnent les thèmes ?

Les thèmes pour Jekyll permettent de packager tous les modèles et les fichiers
relatifs à la présentation dans une [`gem` Ruby](http://guides.rubygems.org/what-is-a-gem/), exactement comme c'est déjà le cas pour les plugins. Cela signifie qu'un design
peut s'appliquer simplement à un ou plusieurs sites, sans que la couche de
présentation ne vienne semer la pagaille dans les fichiers de votre site.

<figure>
<pre><code>source/
├── _posts/
│   └── mon-super-article-14-09-2017.md
├── index.html
├── Gemfile
├── _config.yml
├── 404.md
└── a-propos.md</code></pre>

<figcaption>Exemple de structure de site sous Jekyll utilisant une 💎 gem de thème</figcaption>
</figure>

Il est également possible de prendre le pas sur les fichiers de thèmes, un peu à la manière des [thèmes enfants dans WordPress](https://code.tutsplus.com/articles/how-to-modify-the-parent-theme-behavior-within-the-child-thème--wp-31006). Si vous ne connaissez pas le principe, cela signifie qu'un fichier de votre site sera prioritaire sur le fichier du thème situé au même endroit et qui porte le même nom.

## Comment utiliser un thème ?

Installer un thème est vraiment très simple, mais si vous découvrez Jekyll, vous
hésitez peut-être encore à les tester.

D'abord, il faut ajouter le thème que vous voulez utiliser à la liste des 💎 gems
que vous utilisez pour votre site:

```ruby
# La gem de base pour Jekyll
gem "jekyll" "~> 3.6"

# La gem du thème que vous souhaitez utiliser
gem "alembic-jekyll-thème", "~> 2.2"

# Les plugins que vous utilisez
group :jekyll_plugins do
  gem "jekyll-sitemap"
  gem "jekyll-paginate"
  gem "jekyll-seo-tag"
end
```

Le code ci-dessous est un exemple de fichier `Gemfile`. Ce fichier `Gemfile`
sert à gérer les 💎 gems de votre projet avec l'aide de [Bundler](http://bundler.io/).
Ici j'utilise le thème `alembic-jekyll-theme`, ainsi que d'autres plugins pour Jekyll.

Ensuite, il faut déclarer l'utilisation du thème dans votre fichier de configuration `_config.yml`:

```yaml
thème: alembic-jekyll-thème
```

Une fois que vous avez modifié ces deux fichiers, il va falloir utiliser
[Bundler](http://bundler.io/) pour installer notre nouveau thème et pouvoir
générer et prévisualiser notre site. Dans votre terminal tapez la commande
suivante :

```sh
bundle
```

Cela va installer les 💎 gems manquantes, puis tapez…

```sh
bundle exec jekyll build
```

…pour générer le site avec Jekyll.

Pour des exemples plus avancés [consultez la documentation de Siteleaf sur la gestion des thèmes Jekyll](https://learn.siteleaf.com/thèmes/gem-based-thèmes/).

## Quels thèmes puis-je utiliser ?

{{< figure src="https://www.siteleaf.com/uploads/making-jekyll-theme-slices.jpg" >}}

De nouvelles gems de thèmes arrivent régulièrement. Il existe des annuaires de thèmes pour Jekyll, mais ils recensent également les anciens types de thèmes (ceux à recopier à la main). Si vous cherchez des thèmes sous forme de 💎 gem, recherchez plutôt ['jekyll-theme' sur rubygems.org](https://rubygems.org/search?query=jekyll+thème).

Pour ma part j'en ai développé deux :

- [**Alembic**](https://alembic.darn.es) - un thème prêt à l'emploi, qui peut aussi servir de point de départ pour votre projet,
- [**Garth**](https://garth.darn.es) - un thème de blog très simple.

Ces deux thèmes sont compatibles avec Siteleaf, vous pouvez donc configurer un nouveau site sur Sileaf sans problème. Je vous recommande aussi [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/), un thème très complet développé par Michael Rose. Michael développe des thèmes pour Jekyll depuis un moment et son code est très propre.

Pour ceux d'entre vous qui utilisent GitHub Pages pour héberger leur site Jekyll,
seuls [quelques thèmes sont autorisés](https://pages.github.com/themes/) par
défaut.

C'est en partie la raison pour laquelle, selon moi, les thèmes n'ont peut être
pas encore l'ampleur qu'ils pourraient avoir.

Beaucoup d'utilisateurs de Jekyll se reposent sur GitHub Pages pour gérer et
héberger leur site, et sont donc limités à ces quelques thèmes. Il est néanmoins
possible de contourner cette limitation en utilisant par exemple la formule
[Siteleaf Team+ plan](https://www.siteleaf.com/plans/) qui vous permet
[d'utiliser n'importe quel thème
Jekyll](https://learn.siteleaf.com/thèmes/gem-based-themes/) et [n'importe quel
plugin](https://learn.siteleaf.com/themes/jekyll-plugins/#third-party-plugins).[^custom-plugins]

[^custom-plugins]: NdT: D'autres solutions d'hébergement gratuites comme [Netlify](https://netlify.com) ou [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/) permettent d'utiliser les gems de votre choix.

## Trucs et astuces pour créer un super thème

Si vous avez envie de développer votre propre thème, permettez-moi de partager
avec vous ce que mon expérience m'a enseigné.

![making-jekyll-theme-checklist.jpg](https://www.siteleaf.com/uploads/making-jekyll-theme-checklist.jpg)

Voici quelques trucs à garder en tête quand on développe son propre thème,
surtout que vous souhaitez qu'il soit utilisé par d'autres utilisateurs de
Jekyll (et de Sitelaf) :

1. **Testez votre thème :** Vous ne testerez jamais assez. Le meilleur moyen est encore de suivre votre propre documentation et de commencer de zéro. Testez votre thème avec différentes sortes de contenus. Les thèmes doivent pouvoir habiller différents types et différentes tailles de contenus.
2. **Fournissez une bonne documentation :** Tout bon thème s'accompagne d'une documentation claire et détaillée. C'est même un pré-requis spécifique si vous souhaitez soumettre votre thème sur des marketplaces comme ThemeForest. Assurez vous que le processus d'installation soit simple à suivre et que toutes les fonctionnalités et les options sont documentées. Je fais de mon mieux pour garder la [documentation de l'utilisation d' Alembic](https://github.com/daviddarnes/alembic#alembic) à jour.
3. **Évitez les choses trop complexes :** J'ai vu beaucoup de thèmes WordPress échoués, car ils voulaient trop en faire. Ce n'est pas forcément simple mais essayez de trouver un juste équilibre entre le nombre d'options proposé et celles activées par défaut. Vous ne voulez pas générer de frustration chez les gens en vous éloignant trop de l'aspect de la démo. De plus, Jekyll est un générateur de site statique qui prône la simplicité, votre thème devrait s'en inspirer.
4. **Définissez un usage :** Concevoir un thème susceptible de plaire au plus grand monde _et_ à un certaine type d'industrie peut s'avérer difficile. Je ne dis pas qu'il faut faire faire quelque chose de très spécifique pour l'agence immobilière du coin de la rue, mais peut-être quelque chose en relation avec les sites immobiliers en général. Il y a beaucoup de thèmes génériques qui essaient de répondre à un maximum d'attentes, et vous feriez peut-être bien de ne pas essayer d'aller sur ce terrain mais à la rencontre d'une audience plus ciblée.
5. **Concevez avec l'extensibilité en tête :** Il est fort probable que les utilisateurs de votre thème veuillent le personnaliser, essayez de concevoir votre thème de façon standard. Nommez vos modèles et vos fichiers en fonction [des conventions](https://jekyllrb.com/docs/structure/), et utilisez des noms explicites pour vos `_includes` (par exemple `icon.html` si c'est pour insérer une icône).

## Comment créer un thème pour Jekyll ?

Vous cherchiez quelque chose de plus concret ? Patience, ce sera le sujet de la
deuxième partie de cet article. Nous verrons comment créer un thème pour Jekyll.
