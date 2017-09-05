---
title: Les nouveautés de Jekyll 3.3
date: 2016-10-07 11:10:38 +02:00
description: Cettte version intègre le support des assets dans les thèmes, de nouveaux
  filtres pour les URLs et bien plus encore.
image: https://avatars3.githubusercontent.com/u/3083652?v=3&amp;s=200
---

Plein de nouveautés pour vous simplifier la vie dans la version 3.3 de Jekyll.
On retiendra trois fonctionnalités à tester en priorite.
{: .intro }

## Les themes peuvent désormais fournir des assets statiques et dynamiques dans le dossier `/assets`

Depuis Jekyll 3.2, il est possible de packager un thème sous forme de
[gem](http://guides.rubygems.org/), il était déjà possible d'embarquer des
includes, des layouts et des fichiers Sass. Avec la version 3.3, il est enfin
possible d'ajouter aussi des assets à son thème. Les développeurs de thèmes vont
donc pouvoir fournir des thèmes complets et les utilisateurs pourront les tester
et les mettre à jour plus simplement. Cette fonctionnalité n'est pas encore très
mature et le support de fichier de configuration pour les thèmes ou l'ajout d'un
dossier `data` sont en cours de discussion.

Pour faciliter davantage la gestion de thème, tout fichier présent dans le
dossier `/assets` de votre thème sera considéré comme faisant partie du site de
l'utilisateur du thème. Vous pouvez donc ajouter du Sass, du JavaScript, du
CoffeeScript, des images, des fontes et tout ce qui sera utile à la présentation
et au comportement de votre thème. Les règles sont les mêmes que dans Jekyll :
si un fichier comporte des entêtes YAML Front Matter, il sera converti et traité
par le moteur de rendu. Si le fichier ne comporte aucun en-tête YFM, il sera
simplement copié comme un asset statique.

Notez bien que les fichiers de l'utilisateur avec le même chemin prennent
toujours le pas sur ceux de votre thème. Par exemple si un fichier
`/assets/main.scss` est présent dans le dossier du site de l'utilisateur, c'est
lui qui sera traité en lieu et place du fichier `/assets/main.scss` présent dans
la gem de votre thème.

Nous vous invitons à vous reporter à la [documentation officielle sur la gestion
des assets dans les thèmes](https://jekyllrb.com/docs/themes/#assets) pour plus
d'informations.

## Les filtres `relative_url` et `absolute_url`

Deux nouveaux filtres font leur apparition pour simplifier la gestion des URLs
dans vos templates. Fini de vous emmêler les pinceaux avec `baseurl` et `url`.
Lorsque vous développez en local, si vous définissez la valeur de `baseurl` afin
qu'elle corresponde à votre environnement de développement, mettons par exemple
`baseurl: "/mondossier"`, le filtre `relative_url` se chargera de préfixer cette
valeur pour toutes les URLs que vous appelerez :

{% highlight liquid %}
{% raw %}
{{ "/docs/assets/" | relative_url }} => /mondossier/docs/assets
{% endraw %}
{% endhighlight %}

Par défaut, `baseurl` est défini à `""` et sera remplacé tel quel (ne définissez
jamais cette valeur à `"/"`):

{% highlight liquid %}
{% raw %}
{{ "/docs/assets/" | relative_url }} => /docs/assets
{% endraw %}
{% endhighlight %}

Le résultat d'un appel à `relative_url` produira toujours une URL relative au
domaine racine. Le même principe s'applique au filtre `absolute_url`, il ajoute
les valeurs définies dans `baseurl` et `url` et facilite ainsi la création
d'URLs absolues :

{% highlight liquid %}
{% raw %}
{{ "/docs/assets/" | absolute_url }} => https://jamstatic.fr/mondossier/docs/assets
{% endraw %}
{% endhighlight %}

## `site.url` est maintenant défini pour le serveur de développement

Quand vous lancez la commande `jekyll serve` en local, elle va démarrer un
serveur web, généralement à l'adresse `http://localhost:4000`, sur lequel vous
allez pouvoir prévisualiser votre site durant la phase de développement. Si vous
utilisez le filtre `absolute_url` ou `site.url` dans votre code, vous avez
probablement dû créer un fichier de configuration pour le développement, qui va
réinitialiser la valeur d'`url` à `http://localhost:4000`.

C'est maintenant inutile ! Quand vous lancez la commande `jekyll serve`, Jekyll
va générer votre site avec les valeurs de `host`, `port` et des options
relatives à SSL. Par défaut ce sera donc `url: http://localhost:4000`. Quand
vous développez en local, la valeur de `site.url` sera donc remplacée par
`http://localhost:4000`.

C'est le comportement par défaut lorsque vous exécutez Jekyll en local. Ce ne
sera pas le cas si vous exécutez `jekyll serve` si vous prévisez un
environnement de production avec `JEKYLL_ENV=production`. Si la variable
d'environnement `JEKYLL_ENV` possède une autre valeur que `development` (sa
valeur par défaut), Jekyll n'écrasera pas la valeur du paramètre `url` définie
dans votre fichier de configuration. Attention, cela ne s'applique qu'à la
commande `serve`, pas à la commande build\`.

## Et bien plus encore

Pour avoir le détail de tous les correctifs et les améliorations mineures
apportées, vous pouvez [consulter le CHANGELOG
complet](https://jekyllrb.com/docs/history/#v3-3-0).

Jekyllez bien !
