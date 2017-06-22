---
date: 2016-09-18T13:51:13Z
description: Automatiser la publication du site généré sur GitHub Pages pour pouvoir
  utiliser les plugins Jekyll sans restriction.
image: /assets/images/octojekyll.png
title: Utiliser des plugins Jekyll avec GitHub Pages
url: /2016/09/18/utiliser-des-plugins-jekyll-avec-github-pages/
---

La popularité de Jekyll est en partie due à son support natif par GitHub Pages. Si cette solution gratuite est bien pratique, elle n’en reste pas moins limitée en terme de support de plugins Jekyll et ce pour des raisons de sécurité. Si vous voulez utiliser des plugins comme [jekyll-cloudinary]({% post_url 2016-08-31-gestion-images-responsive-avec-jekyll-cloudinary %}) ou [jekyll-assets](https://github.com/jekyll/jekyll-assets), il vous faudra générer le site en local et le publier sur Github.
{: .intro }

Nous allons voir que cette opération est facilement automatisable à l'aide d'un fichier `Rakefile`, la manière la plus courante en Ruby de créer des tâches.

## Pré-requis

Nous partons du principe que vous avez déjà un site qui tourne avec Jekyll sur GitHub, si ce n’est pas le cas, reportez-vous à la [documentation officielle](https://help.github.com/articles/using-jekyll-as-a-static-site-generator-with-github-pages/).

Comme nous allons utiliser `rake` pour écrire une tâche automatisée, il vous faut ajoutez la dépendance à votre fichier `Gemfile`, si elle n'est pas déjà présente :

``` ruby
  gem "rake"
```

Une fois que c'est fait, lancez `bundle install` pour installer `rake`.

Maintenant que vous êtes parés sous allons voir les deux cas de figures possibles dans Github : les pages utilisateurs ou organisation et les pages projets.

## Pages utilisateur et organisation

Pour activer la génération automatique par GitHub Pages d’un dépôt de compte utilisateur ou organisation, il suffit de respecter la nomenclature  `username/username.github.io`.

GitHub va utiliser la branche `master` de ces dépôts et publier les pages. Cela fait que nous aurons une branche `master` qui contient le site généré et une branche `source` avec les sources de notre site.

### Configuration du dépôt

La préparation du dépôt se résume à créer la branche `source` en ligne de commande :

  $ git checkout -b source master
  $ git push -u origin source

Maintenant que vous avez crée la branche `source`, vous pouvez en faire la branche par _défaut_ dans GitHub :

![Paramètrage des branches dans GitHub](/assets/images/default-branch-github.png)

### Publication automatique

Maintenant que le dépôt est configuré, vous pouvez générer votre site et pousser les fichiers générés sur la branche `master`. Mais plutôt que de s'embêter à faire ça manuellement, créons un simple tâche `rake`.
Créez (si vous n'en avez pas déjà un) un fichier `Rakefile` à la racine de votre site et ajoutez le contenu suivant [^1] :

{% gist 24cb9c96b64173ecd85578f38bcc940d %}

Maintenant vous pouvez simplement lancer la commande `rake publish` pour générer et publier votre site sur GitHub Pages.

Si vous utilisez un nom de domaine personnalisé, vérifiez bien que le fichier CNAME est bien présent dans la branche générée.

## Pages projet

Les pages projet sont presque pareilles que les pages utilisateur et organisation, à une différence près : la branche `gh-pages` est utilisée à la place de la branche `master` pour générer et publier les pages.

Il n'y a aucune configuration supplémentaire à faire, il faut simplement apporter quelques petites modifications au fichier `Rakefile` :

{% gist 2eacfb7ecec18b3b738af1c3c8d1fe5e %}

Vous pouvez maintenant lancer `rake site:publish` pour générer votre site et le publier sur GitHub. Jetez également un coup d'œil au [fichier Rakefile de Jekyll][jekyll-rakefile] pour une implémentation alternation de la tâche `rake site:publish`.

[jekyll-rakefile]: https://github.com/jekyll/jekyll/blob/master/rake/site.rake#L55

![octojekyll]({{ page.image }})

Enfin, sachez qu'il existe d'autres solutions d'hébergement comme [GitLab Pages](https://pages.gitlab.io/), [Netlify](https://www.netlify.com), [Cloudcannon](http://cloudcannon.com), [Siteleaf](https://www.siteleaf.com/) ou [Forestry.io](https://forestry.io/) qui vous permettent d'utiliser les plugins de votre choix, sans avoir recours à ce genre de hack.

### Notes

[^1]: Les tâches utilisées dans ce billet ont été écrites par [Ixti](http://ixti.net/software/2013/01/28/using-jekyll-plugins-on-github-pages.html), le créateur du plugin `jekyll-assets`.
