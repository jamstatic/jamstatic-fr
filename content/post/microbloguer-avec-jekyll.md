---
title: Microbloguer avec Jekyll
date: 2018-09-07 14:26:04 +0000
description: " Un microblog est un blog qui publie des articles courts, le plus souvent
  sans titre. Rejoignez la communauté IndieWeb et configurez votre site pour pour
  publier vos notes pour ensuite les envoyer sur Twitter."
categories:
- jekyll
source:
  author: Fiona Voss
  title: Microblogging in Jekyll
  url: http://fionavoss.blog/2018/04/01/microblogging-in-jekyll/
---

{{< intro >}}
Garder la main sur ses contenus est devenu une préoccupation pour beaucoup, on a pu le voir récemment avec l'annonce de Medium qui a décidé d'arrêter le support des noms de domaine personnalisés. Versionner ses contenus dans un format texte est la raison première de l'existence des générateurs comme Jekyll.
Et si pour être un peu plus indépendant des plate-formes des réseaux sociaux qui se nourrissent de nos données, on commençait par publier sur son site, quitte à republier automatiquement ensuite sur Medium ou Twitter ? Fiona Voss a tenté l'expérience et ça marche très bien ! 🎉{{< /intro >}}

---

Un microblog est un blog sur lequel figurent des articles courts, le plus souvent sans titre. Jusqu'à récemment je pensais que Twitter ou Tumblr étaient les seules plate-formes sur lesquelles les gens pouvaient microbloguer. Il s'avère que les membres enthousiastes de la vibrante communauté de l'[IndieWeb](https://indieweb.org/) microbloguent sur leurs sites web. À mon tour, j'ai décidé de faire de même et de configurer mon site pour pouvoir microbloguer.

Je peux créer deux types de posts, des notes et des articles, [ma page d'accueil](http://fionavoss.blog/) quant à elle affiche indifféremment les deux types de contenu. Je peux aisément poster sur mon blog Jekyll depuis n'importe où avec mon téléphone, et mes notes sont automatiquement republiées sur Twitter.

Pourquoi procéder ainsi ? Microbloguer sur mon site me donne plus de liberté que l'utilisation de Twitter. Je n'ai pas à respecter la limite du nombre de caractères de Twitter, et je peux baliser mes posts comme j'en ai envie. J'ai la maîtrise sur le design de mon site, je peux choisir ou pas d'afficher des publicités.

Puisque je poste aussi sur Twitter, je reste connecté aux personnes présentes sur cette plate-forme, mais si un jour je décide de quitter Twitter, je peux supprimer mon compte sans perdre mes notes ou me demander comme les exporter dans un format exploitable. De plus les gens peuvent me suivre sans avoir de compte Twitter, via mon flux RSS ou le site micro.blog.

Voici comment j'ai configuré mon site pour faire ça:

## Configuration de Jekyll

J'ai commencé par utiliser le thème [Lanyon](https://github.com/poole/lanyon) pour Jekyll, puis je suis passée à Minima le thème par défaut, parce que la navigation me plaisait davantage. Minima est un thème basé sur une gem, donc pour personnaliser l'apparence de mon site, j'ai dû recopier les fichiers de gabarits de page stockés dans la gem [comme indiqué dans la documentation](https://jekyllrb.com/docs/themes/#overriding-theme-defaults).

Voici à quoi ressemble le fichier Markdown d'une note. Ça ressemble à un post Jekyll standard, sauf que la chaîne de caractères pour le titre est vide. Si je supprime cette ligne, Jekyll utiliserait le slug, ici "343", comme titre. Ce ne serait pas très joli.

```md
---
layout: post
date: '2018-03-25T00:05:43.780Z'
title: ''
slug: '343'
---
Je poste sur mon site Jekyll depuis mon téléphone à l'aide de l'application iOS Micro.blog. Maintenant je peux représenter le web indépendant à la RailsConf !
```

J'utilise les catégories afin de pouvoir différencier les articles des notes. Jekyll affecte automatiquement la catégorie en fonction du chemin du fichier, dans mon cas ce sera soit `articles/_posts` soit `notes/_posts`. On peut créer des pages pour les notes et les articles en se basant sur [cet exemple de la documentation de Jekyll](https://jekyllrb.com/docs/posts/#displaying-post-categories-or-tags).

Ma page d'accueil se contente d'afficher tous les posts, elle se fiche des catégories. Pour éviter d'avoir des niveaux de titre vides et créer des sauts de ligne inutiles pour les notes qui n'ont pas de titre, dans mon gabarit je vérifie d'abord si le titre est vide. Pas super élégant, mais ça fait le job.

```go-html-template
{%- if post.title != "" -%}
  <h3>
    <a class="post-link" href="{{ post.url | relative_url }}">
      {{ post.title | escape }}
    </a>
  </h3>
{%- endif -%}
```

Si le post est un article, j'affiche un extrait (le premier paragraphe par défaut) avec un lien pour lire la suite. Si c'est une note, j'affiche l'intégralité de son contenu.

```go-html-template
{%- if post.categories contains 'articles' -%}
  {{ post.excerpt }}
  {% if post.content contains site.excerpt_separator %}
    <a href="{{ post.url | prepend: site.baseurl }}">Read more</a>
  {% endif %}
{% else %}
  {{ post.content }}
{%- endif -%}
```

La ligne `if post.content contains site.excerpt_separator` s'assure que nous n'affichons le lien Lire la suite que s'il y a du contenu supplémentaire. En pratique ce n'est pas nécessaire puisque tous mes articles comportent plus d'un paragraphe; En théorie je pourrais écrire un long post sans titre ou un court post avec un titre et il serait quand même affiché que ce soit un article ou une note, puisque la logique d'affichage ne prend pas en compte la catégorie à laquelle il appartient.

## POSSE avec Micro.blog

[POSSE](https://indieweb.org/POSSE) veut dire _Publish (on your) Own Site, Syndicate Elsewhere_ (Publiez sur votre propre site et syndiquez ailleurs), le but est d'avoir le meilleur des deux mondes : garder la main sur vos contenus en publiant d'abord sur votre site, tout en gardant le contact avec les autres sur les réseaux sociaux. C'était la partie la plus facile à configurer pour moi, car je me suis reposée sur le service [Micro.blog](https://micro.blog/) qui ressemble à Twitter mais en plus petit et en plus sympa.

Avec Micro.blog vous pouvez créer un compte et syndiquer les posts du flux RSS de votre blog vers celui de votre instance Micro.blog. Les posts courts apparaîtront en entier, comme des tweets. Les posts plus longs afficheront l'extrait ou le titre ainsi qu'un lien vers l'article complet sur votre blog. Les autres utilisateurs de micro.blog peuvent vous suivre et répondre à vos posts dans l'application Micro.blog.[Voilà à quoi ressemble mon flux.](https://micro.blog/fiona)

J'aime beaucoup la communauté Micro.blog. On sent plus d'humanité et moins de promotion que sur Twitter. La plate-forme n'affiche aucune publicité et le flux est strictement chronologique. Comme la communauté est restreinte, c'est plus facile de suivre les gens, et je pense que plus de personnes voient mes notes que sur Twitter. Bien qu'il y ait moins de gens, j'ai plus de discussions sur Micro.blog.

Micro.blog me permet aussi de rester en contact avec les gens qui sont sur Twitter, puisque mon flux est automatiquement publié là-bas. Ce service là me coûte deux dollars par mois.

Micro.blog peut aussi héberger votre blog pour 5 dollars par mois. Cela peut être une bonne solution, si vous ne voulez pas avoir à configurer et à maintenir votre site, ou si vous avez déjà un blog mais que vous souhaitez garder votre microblog à part.

## Publication

Micro.blog propose des applications pour macOS et iOS, qui peuvent poster sur votre blog s'il supporte Micropub. Micropub est la spécification d'une norme pour publier de manière standard sur un site qui peut fonctionner avec une variété d'applications clientes. Si vous bloguez sur un site dynamique, vous auriez à configurer un point d'accès pour recevoir les requêtes de type POST dans un format spécifique. Si vous utilisez WordPress, qui reste un choix populaire dans la communauté IndieWeb, il y a des plugins pour cela.

Comme j'utilise Jekyll, un générateur de site statique, je pensais que Micropub serait compliqué à configurer, mais heureusement il y a un super outil qui fait exactement ce qu'il faut : [webpage-micropub-to-github](https://github.com/voxpelli/webpage-micropub-to-github).
C'est une application qui crée un point d'accès Micropub pour les sites Jekyll hébergés sur GitHub Pages.

J'ai dû d'abord ajouter quelques lignes de code dans la balise `<head>` pour l'authentification :

```html
<link rel="authorization_endpoint" href="https://indieauth.com/auth">
<link rel="token_endpoint" href="https://tokens.indieauth.com/token">
<link href="https://twitter.com/fionajvoss" rel="me">
<link href="https://github.com/FionaVoss" rel="me">
```

Les deux premières lignes indiquent à Micropub quel service d'authentification
utiliser, les deux ligne suivantes lient mes profils sociaux à mon site web de
manière à ce que je puisse m'authentifier avec [IndieAuth.com](https://indieauth.com/).

L'un ou l'autre des profils aurait suffit, je n'ai pas vraiment besoin des deux liens. J'ai aussi dû ajouter l'URL de mon site à mes biographies Twitter et GitHub.

`webpage-micropub-to-github` est auto-hébergé, donc j'ai du ensuite déployé ma propre instance de cette application. Tout ce que j'ai eu à faire a été de cliquer sur le bouton "Deployer sur Heroku" dans  [README](https://github.com/voxpelli/webpage-micropub-to-github/blob/master/README.md) et de configurer quelques variables d'environnement, dont mon pseudonyme GitHub, ma clef d'API et le nom de mon dépôt. J'ai forké le dépôt même si ce n'était pas nécessaire puisque je n'ai fait aucune modification de code dans l'application.

Petite précision : pour configurer la variable optionnelle `MICROPUB_LAYOUT_NAME` j'ai du entré la valeur `"posts"`, entre guillemets; sans quoi ça faisait planter l'application. Même chose pour `MICROPUB_FILENAME_STYLE`, que j'ai défini à  `"notes/_posts/:year-:month-:day-:slug"` pour que mes posts aillent dans la catégorie Notes.

Une fois déployée, j'ai dû lier l'application dans ma balise `<head>` pour indiquer à micropub où poster:

```html
<link rel="micropub" href="https://jekyll-micropub-to-github.herokuapp.com/micropub/main">
```

Enfin, j'ai dû ajouter l'URL de mon site web dans mes préférences Micro.blog et suivre le processus d'authentification d'IndieAuth, qui consiste en tout en pour tout à m'authentifier avec mon compte Twitter.

Quand je poste, Micro.blog envoie une requête à `webpage-micropub-to-github`. Puis `webpage-micropub-to-github` formate correctement le post en Markdown pour Jekyll et ajoute le fichier à mon dépôt via l'API de GitHub. Et comme GitHub Pages régénère mon site à chaque nouveau commit sur la branche `master`, le post apparaît instantanément.

Passer par Micropub me permet non seulement d'utiliser les applications pour Micro.blog pour poster, mais également tout un tas d'autres. J'ai testé également [Quill](https://quill.p3k.io/). Puisque c'est une application web, c'est pratique pour poster depuis un ordinateur public sans avoir à installer quoi que ce soit. Pour poster depuis mon téléphone, je passe par Micro.blog.

Même si la configuration demande un peu d'effort, poster depuis mon site est aussi simple et rapide que de passer par Twitter, c'est un élément clef qui montre que microbloguer avec Jekyll est tout à fait faisable.
