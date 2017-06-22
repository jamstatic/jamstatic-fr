---
author: Nicolas Hoizey
date: 2016-08-31T00:00:00Z
description: Nicolas Hoizey présente les fonctionnalités de gestion d'images responsive
  offertes par le plugin Cloudinary qu'il a développé pour Jekyll.
image: http://res-1.cloudinary.com/cloudinary/image/upload/c_fill,w_560/dpr_1.0/jekyll_cloudinary_plugin.png
title: Gérer les images responsive dans Jekyll avec le plugin Cloudinary
url: /2016/08/31/gestion-images-responsive-avec-jekyll-cloudinary/
---

J'ai récemment mis à jour [mon site perso](https://nicolas-hoizey.com) avec [la dernière version de Jekyll](https://jekyllrb.com/news/2015/10/26/jekyll-3-0-released/) et j'en ai profité pour changer quelques outils.
{: .intro }

Les plugins que j'utilisais ne répondaient pas à mes exigences pour les images reponsive, j'ai donc décidé de trouver d'autres moyens de satisfaire ces besoins.

Pour générer le code HTML des images responsive (dois-je vous vraiment vous rappeler qu'utiliser les [images responsive natives](http://responsiveimages.org/) devrait ête un réflexe de nos jours ?), j'ai resté le plugin [Jekyll Responsive Image](https://github.com/wildlyinaccurate/jekyll-responsive-image). Il est vraiment sympa, il vous laisse définir vos propres gabarits de balisage d'image, vous pouvez donc utiliser `srcset` ou `<picture>` selon votre envie. Mais il ne répondait à tous mes besoins :

- Lors de la première génération d'un site statique Jekyll avec ce plugin vous devez générer toutes les variantes à partir des images originales. J'ai actuellement environ 750 images sur mon blog et cela entraîne des temps de compilation extrêment longs,
- Envoyer toutes ces variantes au serveur prend également du temps, car je n'ai pas un accès très rapide chez moi,
- Et bien entendu toutes ces images sont servies sur le même serveur que les pages, dans mon cas sur un hébergement mutualisé sympa et bon marché.

Je voulais revenir à un workflow plus simple et plus rapide et qui génère moins de charge côté serveur.

La plupart des sites web responsive que ma société développe pour ses client utilisent des solutions ad hoc pour les images responsive, mais j'avais connaissance de quelques solutions SaaS d'images responsive. J'ai donc décidé de voir si l'une d'entre elles pouvait répondre à mes besoins.

[Cloudinary](http://cloudinary.com/) est une des solutions disponibles qui offre le plus de fonctionnalités **et** qui peut être utilisée gratuitement si vous avez des besoins légers. Difficile pour les autres solutions de rivaliser avec cette offre…

Avec un compte gratuit, j'ai pu tester ce que je voulais, essayer différentes fonctionnalités et décider si je continuais ou si j'allais voir ailleurs.

Les fonctions principales que je cherchais et que fournit Cloudinary sont :

- **[La possibilité d'utiliser le service comme un proxy](http://cloudinary.com/documentation/upload_images#auto_fetching_remote_images):** les images originales sont stockées sur mon serveur, mais toutes les images servies à mes visiteurs le sont depuis Cloudinary, générées à la volée à partir des originales. Encore mieux, je n'ai pas besoin d'uploader les images originales - Cloudinary les récupère automatiquement à partir de mes versions publiées en local. Entre d'autres termes, le seul "client" pour mes images d'origine c'est Cloudinary. Du coup, je consomme très peu de bande passante pour mes images chez mon hébergeur.
- **Recadrage et options de redimensionnement des images :** actuellement, je ne fais que retailler mes images à partir des originaux en large résolution pour les adapter aux mises en page responsive. Je me penche sérieusement sur la possibilité de faire de la direction artistique avancée à l'aide des [fonctionnalités de recadrage automagiques de Cloudinary](http://cloudinary.com/blog/introducing_smart_cropping_intelligent_quality_selection_and_automated_responsive_images).
- **[Optimisation du format des images](http://cloudinary.com/documentation/image_transformations#automatic_format_selection):** Si je publie des images JPEG dans mes billets, Cloudinary peut envoyer des images au format WebP aux visiteurs s'il est supporté par leur navigateur. Le mois dernier, deux tiers des images servies par Cloudinary à mes visiteurs étaient au format WebP, que Cloudinary génére et sert pour moi automatiquement. C'est un gain énorme à la fois pour la performance et les forfaits de données de mes visiteurs et également pour mon quota de bande passante chez Cloudinary.
- **[Optimisation de la compression d'image](http://cloudinary.com/documentation/image_transformations#automatic_quality_and_encoding_settings):** Cloudinary est capable de calculer le meilleur niveau de compression pour réduire le poids de chaque image, sans pour autant dégrader la qualité du visuel.

Persuadé que Cloudinary répondait à toutes mes attentes, il me fallait encore développer un plugin Jekyll qui puisse utliser ces fonctionalités.

Après réflexion, j'ai décidé de partir avec une  [balise Liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) `{% cloudinary %}` qui simplifierait la publication d'image avec Cloudinary et qui était relativement simple à développer. Je me suis inspiré d'autres plugins, j'ai trouvé de l'aide sur StackOverflow quand j'en avais besoin et j'ai fini par publier la premier version du [plugin Jekyll Cloudinary](https://nhoizey.github.io/jekyll-cloudinary/) en juillet 2016.

La syntaxe est assez intuitive :

{% raw %}
```markdown
{% cloudinary [preset] path/to/img.jpg alt="alt text" caption="image caption" %}
```
{% endraw %}

À partir de cette entrée, le plugin génère le HTML de l'image responsive, en utilisant les attributs `srcset` et `sizes` pour la balise `<img>` tag (voir [la section “varier la taille et la densité” de ce billet](https://jakearchibald.com/2015/anatomy-of-responsive-images/#varying-size-and-density) pour comprendre comment fonctionnent ces attributs et [ce billet qui explique pourquoi vous devriez les utiliser plutôt que `<picture>`, la plupart du temps](https://cloudfour.com/thinks/dont-use-picture-most-of-the-time/)).
L'attribut `srcset` et son fallback `src` contiennent les URLs Cloudinary qui récupèrent les images originales du billet à la volée et les retaillent en plusieurs tailles alternatives.

Par exemple, comme indiqué dans [la documentation](https://nhoizey.github.io/jekyll-cloudinary/#live-example), ce code dans un fichier Markdown :

{% raw %}
```markdown
{% cloudinary logo /assets/logos/cloudinary.png alt="Cloudinary logo" %}
```
{% endraw %}

va générer le code HTML suivant :

```html
<img
  src="https://res.cloudinary.com/<cloud_name>/image/fetch/c_limit,w_480,q_auto,f_auto/https://<domain>/assets/logos/cloudinary.png"
  srcset="
    https://res.cloudinary.com/<cloud_name>/image/fetch/c_limit,w_80,q_auto,f_auto/https://<domain>/assets/logos/cloudinary.png 80w,
    https://res.cloudinary.com/<cloud_name>/image/fetch/c_limit,w_240,q_auto,f_auto/https://<domain>/assets/logos/cloudinary.png 240w,
    https://res.cloudinary.com/<cloud_name>/image/fetch/c_limit,w_400,q_auto,f_auto/https://<domain>/assets/logos/cloudinary.png 400w"
  sizes="
    (min-width: 50rem) 13rem,
    (min-width: 40rem) 25vw,
    45vw"
  class="logo"
  alt="logo Cloudinary"
  width="480"
  height="350"
/>
```

Vous avez entièrement la main sur le nombre d'images générées, leurs résolutions et les attributs `sizes` (qui aident le navigateur à décider quelle image télécharger).
Cela se fait à partir des options de configuration à votre disposition dans votre
fichier `_config.yml`. Voici l'extrait de mon fichier de configuration où je définis les régles pour les logos :

```yaml
cloudinary:
  cloud_name: …
  presets:
    logo:
      min_width: 80
      max_width: 400
      fallback_max_width: 200
      steps: 3
      sizes: '(min-width: 50rem) 13rem, (min-width: 40rem) 25vw, 45vw'
      figure: never
      attributes:
        class: logo
```

- `cloud_name: …` votre ID personnel Cloudinary
- `presets:` englobe la liste des préréglages que vous définissez pour vote site
- `logo:` est le nom d'un des préréglages, que j'utilise dans le tag Liquid avant le nom du fichier image
- `min_width: 80` définit la largeur minimum d'image générée
- `max_width: 400` définit la largeur maximale d'image générée
- `fallback_max_width: 200` définit la largeur de l'image de la solution de repli (`src`)
- `steps: 3` définit le nombre d'images à générer
- `sizes: '(min-width: 50rem) 13rem, (min-width: 40rem) 25vw, 45vw'` définit l'attribut `sizes` de l'image responsive, qui dépend du design et des breakpoints
- `figure: never` empêche la génération d'un bloc `<figure>`/`<img>`/`<figcaption>`  (Je n'en veux généralement pas sur les logos)
- `attributes:` englobe la liste d'attributs à toujours ajouter aux éléments `<figure>` et/ou `<img>`
- `class: logo` ajoute l'attribut `class` ayant pour valeur `logo`, que j'utilise dans mon CSS pour m'assurer que le logo ne prenne pas plus d'un quart de la largeur de son conteneur et le fait flotter à droite.

Vous pouvez définir toutes ces régles pour autant de préréglages dont vous aurez besoin.

Avec ce plugin et mon compte Cloudinary, **le temps de génération de mon site a été réduit de 90% et la capacité de stockage utilisée sur mon serveur de 60%** et je n'ai plus à me soucier du tout de l'optimisation de mes images. C'est un gain énorme.

Et après ? Au début, je voulais permettre aux auteurs d'utiliser simplement [la syntaxe Markdown pour les images](http://kramdown.gettalong.org/syntax.html#images), mais je n'y suis pas encore parvenu, malgré [quelques](http://stackoverflow.com/questions/35614552/with-jekyll-3-can-i-transform-a-posts-markdown-before-actual-markdown-parsing) [réponses](https://github.com/jekyll/jekyll/issues/5099) [valables](http://stackoverflow.com/questions/38126629/how-is-the-priority-flag-in-jekyll-plugins-supposed-to-work) à mes questions du principal mainteneur de Jekyll [Parker Moore](https://github.com/parkr) lui-même. Il faudra que je creuse les hooks Jekyll à l'avenir.

Au final, cela a était un bon moyen d'apprendre un peu de Ruby, de comprendre les rouages internes de Jekyll, comment fonctionnent les plugins et comment publier une Gem… J'ai tellement appris en peu de temps grâce à ce petit projet si utile et important à mes yeux.

Bien entendu, toute aide est la bienvenue pour aider à améliorer le plugin. Il y a déjà [quelques anomalies et demandes de fonctionnalités ouvertes](https://github.com/nhoizey/jekyll-cloudinary/issues). N'hésitez pas à me signaler tout problème ou à partager vos idées, voire même à contribuer via des [pull requests](https://github.com/nhoizey/jekyll-cloudinary/pulls) !

_[Read original English version of this post on Cloudinary's blog ](http://cloudinary.com/blog/how_i_used_cloudinary_to_solve_responsive_image_needs_in_my_jekyll_website_and_shared_the_magic_in_a_plugin)_
