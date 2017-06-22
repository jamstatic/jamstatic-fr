---
date: 2017-02-23T21:51:01Z
description: Netlify vous permet de créer simplement un environnement de pré-production
  pour votre site statique.
image: https://eduardoboucas.com/assets/posts/2017-02-22-creating-a-staging-environment-for-jekyll/netlify1.png
title: Créer un environnement de préproduction pour Jekyll
url: /2017/02/23/creer-un-environnement-de-preproduction-pour-jekyll/
---

Dans son article, [Eduardo Boucas](https://eduardoboucas.com/) révèle comment il a mis simplement en place [un site de préproduction pour Jekyll grâce à Netlify](https://eduardoboucas.com/blog/2017/02/22/jekyll-staging-environment.html). Ce blog est également déployé et hébergé grâce à Netlify. La nouvelle version de leur interface d'administration propose nativement des fonctionnalités comme le fait d'associer un sous-domaine à une branche ou le fait de pouvoir bloquer le site de production à un certain commit. Vous n'avez donc pas besoin de créer deux sites dans Netlify pour bénéficier d'une prévisualisation sur une URL dédiée. L'article d'Eduardo aborde néanmoins l'utilisation des variables d'environnements et utilise Jekyll comme exemple, la technique reste bien entendu valable pour d'autres générateurs comme Hugo, Hexo et les autres.
{: .intro }

Un environnement de préproduction ou de _staging_ est une infrastructure de test qui s'approche autant que possible de la configuration d'un site de production. Dans le cas d'un site statique, il peut servir à partager un nouvel article ou une nouvelle fonctionnalité avec un nombre de personnes restreintes avant de le rendre disponible publiquement. Dans cet article, je vais vous montrer comment j'ai fait pour en créer un et comment je m'en sers.

## Le workflow Git

Mon site est hébergé sur GitHub et servi grâce à [GitHub Pages](https://pages.github.com/), ce qui signifie que tout ce que je pousse sur la branche `master` enclenche une regénération du site et est publié presque immédiatement. Si je visite l'URL de mon site quelques secondes plus tard, je peux voir les contenus mis à jour.

Pour notre environnement de préproduction, ce que nous voulons c'est faire une copie basique de cette infrastructure de manière à faire passer notre contenu par un site distinct, avec une URL distincte. La démarche ressemblerait à quelque chose comme ça :

1. Pousser les changements sur GitHub
1. Le site de préproduction est régénéré, l'URL de préproduction peut être utilisée pour prévisualiser le nouvel état
1. Créer une pull request de la préproduction vers la production pour répercuter les changements
1. Le site de production est régénéré, l'URL de production reflète le nouvel état du site

Pour que notre système fonctionne uniquement avec GitHub Pages nous allons avoir besoin de deux dépôts, puisqu'on ne peut pas servir deux sites à partir d'un seul dépôt. Mais à moins qu'un dépôt ne soit le fork d'un autre, ce qui signifie avoir deux comptes GitHub ou utiliser un compte *organisation*, vous ne pouvez pas créer de pull request entre eux.

J'utilise donc [Netlify](https://netlify.com) à la place pour servir mon site de préproduction à partir de la branche `dev` de mon dépôt existant - GitHub Pages sert `eduardoboucas.com` à partir de la branche `master` et Netlify sert  `dev.eduardoboucas.com` à partir de la branche `dev`.

Pour créer cette branche, vous pouvez utiliser la commande suivante :

{{< highlight bash >}}
# Partir de la branche actuelle et en créer une nouvelle appelée dev
git checkout -b dev

# Pousser la nouvelle branche sur le dépôt distant
git push origin dev
{{< / highlight >}}

## Utilisation de Netlify

Pour commencer à utiliser Netlify, rendez vous sur [leur site](https://netlify.com) et connectez vous avec votre compte GitHub (c'est [gratuit pour les projets open-source](https://netlify.com/pricing/)). Cliquez sur Àjoutez un nouveau projet`, sélectionnez GitHub et sélectionnez le dépôt qui dans lequel se trouve votre site.

{% include figure.html url="https://eduardoboucas.com/assets/posts/2017-02-22-creating-a-staging-environment-for-jekyll/netlify1.png" description="Netlify : Configuration du dépôt" %}

Dans l'onglet `Paramètres de base`, sélectionnez votre branche de préproduction (par exemple `dev`). Pour un site avec Jekyll, le dossier de publication par défaut est `_site` et la commande de build `jekyll build`. Dans l'onglet `Paramètres avancés`, ajouter une variable d'environnement nommée `JEKYLL_ENV` avec la valeur `stage` — cela va servir à dire à Jekyll dans quel environnement tourne le site .

Ensuite, cliquez sur `Générer votre site` et attendez quelques secondes. Lorsque la génération du site est terminée, cliquez sur `Voir votre site` pour voir le résultat.

Un nom aléatoire vous sera attribué, comme `cartoonist-foreground-47121`, que vous pourrez ensuite modifier dans les paramètres. Vous pouvez également définir un nom de domaine personalisé pour ce site, pour cela vous devrez configurer votre DNS. Si vous avez choisi `dev-example-com` comme nom pour votre site, il vous faudra un CNAME qui pointe vers `dev-example-com.netlify.com`.

{% include figure.html url="https://eduardoboucas.com/assets/posts/2017-02-22-creating-a-staging-environment-for-jekyll/netlify2.png" description="Netlify: le panneau de configuration" %}

## Configuration de Jekyll

On peut accéder à la variable d'environnement que nous avons crée plus haut dans Jekyll, en utilisant la variable `jekyll.environment` dans n'importe quel modèle Liquid. Grâce à ça, nous pouvons effectuer quelques ajustements au site en fonction de l'environnement dans lequel il tourne.

Par exemple, nous ne voulons pas que le site de préproduction soit indexé par les moteurs de recherche.

{{< highlight html >}}{% raw %}{% if jekyll.environment == 'stage' %}
  <meta name="robots" content="noindex">
{% endif %}{% endraw %}{{< / highlight >}}

Vous pouvez même ajouter une bannière en haut de chaque page, pour avertir les visiteurs qu'ils consultent la version de développement de votre site.

{{< highlight html >}}{% raw %}{% if jekyll.environment == 'stage' %}
  <p class="banner">
    <a href="https://eduardoboucas.com">
      Ceci est la version de développement du site. Cliquez ici pour voir la version de production.
    </a>
  </p>
{% endif %}{% endraw %}{{< / highlight >}}

Et voilà mon [site de préproduction](http://dev.eduardoboucas.com) est configuré. Lorsque je veux demander à quelqu'un de relire un article avant qu'il ne soit publié, je le pousse sur la branche `dev` pour le publier sur le site de préproduction, pour le publier en production, j'ai juste à le fusionner dans la branche `master`.

Vous pourriez même vous passer complètement de GitHub Pages (NdT: et de ses limitations) et vous reposer entièrement sur Netlify pour servir vos environnements de production et de préproduction (ce que je risque de faire bientôt pour des raisons que je dévoilerai dans un prochain article)

Et voilà, vous avez maintenant un environnement de préproduction simple avec intégration continue pour un site statique et tout ça gratuitement. Pas mal, non ?

_Article original publié sur  [https://eduardoboucas.com/blog/2017/02/22/jekyll-staging-environment.html](https://eduardoboucas.com/blog/2017/02/22/jekyll-staging-environment.html)_
