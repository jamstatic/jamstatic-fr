---
title: "La gestion des assets avec Hugo"
date: 2018-07-21T20:54:26+02:00
description: "Hugo offre une gestion des assets: Sass, minification, support de postCSS, concaténation des fichiers JS, et plus encore depuis la version 0.43."
categories:
  - hugo
images:
  - http://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1532283632/pipes.jpg
---

{{% intro %}}

Depuis la [version 0.43](https://gohugo.io/news/0.43-relnotes/), Hugo comble un des reproches qui lui a souvent été fait, le manque de solution native pour gérer les assets, à savoir la génération de fichiers CSS et JS pour la production — et le développement). Cette nouvelle possibilité fait d'Hugo une solution toujours plus performante pour le développement de sites statiques.

{{% /intro %}}

Hugo est surtout apprécié pour sa performance et son modèle de structuration de contenu, mais en ce qui concerne le traitement des fichiers CSS et JS, il fallait jusqu'ici avoir recours à l'écosystème `npm`, tout ça pour simplement pouvoir compiler des fichiers Sass, voire concaténer et minifier des fichiers JS. C'est désormais une dépendance dont on pourra se passer. Vous pouvez dire adieu à Webpack, Gulp et à votre `package.json` jamais à jour.

## Traitement des assets

{{< figure src="http://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1532283632/pipes.jpg" caption="" attr="Photo de Neil Cooper sur Unsplash" attrlink="https://unsplash.com/photos/KX2fCzuQoaQ" >}}

Le principe est simple : tout ce qui se trouve dans le dossier `/assets` (que ce soit dans un thème ou pas) pourra être ensuite traité par des fonctions spécifiques aux assets. Pour les plus exigeants, ce chemin par défaut est bien entendu paramétrable via la directive `assetDir` dans votre fichier de configuration.

On peut donc par exemple écrire ceci dans un fichier de layout :

```go-html-template
{{ $styles := resources.Get "scss/main.scss" | toCSS | minify }}
<link rel="stylesheet" href="{{ $styles.Permalink }}" media="screen">
```

Ici on récupère le contenu du fichier `/assets/scss/main.scss` et on lui applique successivement deux fonctions : d'abord `toCSS` (alias de `resources.ToCSS`) pour compiler le fichier Sass puis `minify` (alias de `resources.Minify`). La syntaxe des _pipes_ en Go template est la même que celle que vous utilisez déjà dans votre shell UNIX ou que celle des filtres Liquid, ça rend les choses plutôt intuitives.
Difficile de faire plus concis et plus simple vous en conviendrez.

Maintenant vous pourriez argumenter que pendant le développement, vous n'avez pas besoin de la minification. Par contre vous aimeriez bien générer des fichiers _source map_ pour développer dans votre navigateur web préféré. Qu'à cela ne tienne, grâce à la fonction `isServer` qui détecte si vous êtes en train de développer localement avec `hugo server` ou pas, vous pouvez personnaliser ce qui est généré.

Prenons donc un exemple un peu plus réaliste :

```go-html-template
{{ if .Site.IsServer }}
  {{ $cssOpts := (dict "targetPath" "assets/css/main.css" "enableSourceMap" true) }}
  {{ $styles := resources.Get "scss/main.scss" | toCSS $cssOpts }}
  <link rel="stylesheet" href="{{ $styles.Permalink }}" media="screen">
{{ else }}
  {{$cssOpts := (dict "targetPath" "assets/css/main.css") }}
  {{ $styles := resources.Get "scss/main.scss" | toCSS $cssOpts | postCSS | minify | fingerprint }}
  <link rel="stylesheet" href="{{ $styles.Permalink }}" media="screen">
{{ end }}
```

Ici, pendant le développement avec `hugo server`, on stocke d'abord les options à passer à la fonction `toCSS` dans une liste de clés-valeurs, le chemin où nous voulons générer notre fichier CSS ainsi que le mapping avec le fichier Sass source.
Puis comme précédemment on applique le tout à notre fichier principal Sass. Enfin on pointe vers l'URL du fichier généré dans la balise `link`.

Les options de la fonction `toCSS` sont légèrement différentes si c'est pour être hébergé en production, à ce moment-là on ne génère pas de fichier _source map_. Par contre on peut choisir d'appliquer d'autres fonctions à notre fichier CSS, comme par exemple un post-traitement avec postCSS, au hasard _autoprefixer_ ou l'application d'une empreinte unique pour faciliter l'invalidation de cache à chaque nouvelle version du fichier. Notez que si vous utilisez la fonction `postCSS`, cela implique d'avoir les packages `npm` qui vont bien sur votre machine, que ce soit en global ou en local.

## Et ensuite ?

Vous pouvez aller jeter un œil au dépôt d'exemple de [l'utilisation de Sass avec Hugo](https://github.com/bep/hugo-sass-test) sur GitHub pour un exemple plus complet, qui montre notamment comment surcharger des variables Sass depuis le fichier de configuration d'Hugo.

Pour le JS, sachez qu'il existe une [fonction pour la concaténation](https://gohugo.io/hugo-pipes/bundling/), qui vous permettra de faire vos bundle en fonction des fichiers dont vous avez besoin dans vos layouts.

Je vous recommande chaudement de lire [l'article de Régis Philibert qui détaille l'utilisation des différentes fonctions offertes par Hugo pour la gestion des assets](https://regisphilibert.com/blog/2018/07/hugo-pipes-and-asset-processing-pipeline/) et bien entendu de vous référer à [la documentation officielle](https://gohugo.io/hugo-pipes/) qui est toujours à jour.

Mine de rien, non seulement ces ajouts vont vous permettre de supprimer des dépendances à vos projets Hugo mais en plus ils permettent de bénéficier d'une meilleure expérience de développement. Non parce que lancer Webpack pour démarrer le serveur d'Hugo, c'est lourd.

On notera qu'il existe maintenant deux versions des binaires d'Hugo, celui avec le support de la gestion des assets c'est la version `extended`.

Si comme moi vous utilisez Netlify pour générer automatiquement votre site à chaque commit, sachez que la version _extended_ n'est pas encore disponible à l'heure où j'écris ces lignes, mais c'est en cours.

Maintenant la génération des fichiers CSS et des fichiers JS n'est pas quelque chose que vous avez besoin de lancer à _chaque_ build, ou à chaque fois qu'un contributeur édite un fichier Markdown dans votre [headless CMS]({{< relref "cms-headless.md" >}}) le plus simple est donc encore de _commiter_ les fichiers générés par Hugo dans le répertoire `resources` après avoir fait vos modifications et de mettre à jour vôtre dépot Git.

## Conclusion

Hugo continue de se tailler une bonne place dans le monde des générateurs de site statique et mérite plus que jamais que vous tentiez l'expérience. Il se définit désormais comme un véritable _framework_ de développement, si l'on en croit [sa baseline officielle](https://gohugo.io/). Hugo n'en reste pas moins une application monolithique comparée aux autres SSG de l'écosystème `npm` comme Gatsby ou Next, à vous de voir si l'ensemble de fonctionnalités dont il dispose maintenant suffit pour votre projet.
