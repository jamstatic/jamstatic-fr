---
title: "De WordPress à Hugo : adopter un nouvel état d'esprit"
date: 2019-02-06T17:12:14+01:00
lastmod: 2019-03-22T158:12:14+01:00
draft: true
description: "Comparons le fonctionnement de WordPress et de Hugo pour vous aider à vous familiariser avec ce nouvel environnement et vous imprégner de sa philosophie."
categories:
  - hugo
images:
  - https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1553351850/migration.png
source:
  author: "Régis Philibert"
  title: "From WordPress to Hugo, a mindset transition"
  url: "https://regisphilibert.com/blog/2019/01/from-wordpress-to-hugo-a-mindset-transition/"
---

Dans cet article, nous n'allons pas migrer un site de WordPress vers Hugo, nous allons voir comment passer des habitudes que vous avez prises avec WordPress à celles d'Hugo.

Nous allons soigneusement comparer les concepts d'Hugo et son vocabulaire avec ceux de WordPress, avec lesquels vous êtes déjà familier, afin que la courbe d'apprentissage soit un peu moins rude.

Nous allons partir de `the_post()`, `the_loop` et de la hiérarchie de modèle,  pour mieux comprendre comment Hugo fonctionne !

## De WordPress à Hugo

Vu que de nos jours WordPress fait tourner une bonne partie des sites web, nous pouvons supposer que beaucoup d'entre vous connaissent, voire sont experts de ce CMS très populaire.
Moi aussi je faisais principalement du développement avec WordPress, avant de devenir complètement accro à Hugo.

Et j'ai mis du temps à me familiariser avec sa logique de fonctionnement. Quand j'ai découvert Hugo, je comparais son vocabulaire et ses concepts avec ceux de WordPress.

Je me suis rapidement aperçu que cette comparaison systématique était une mauvaise idée. Hugo possède son propre lexique et sa logique lui est propre et elle diffère beaucoup de celle de WordPress.

Mais j'ai réalisé qu'une étude parallèle plus attentive aurait pu m'aider à apprendre Hugo plus vite, et ainsi m'éviter pas mal d'erreurs coûteuses en chemin.

Donc si vous débutez avec Hugo, et que vous connaissez WordPress, ce qui va suivre ne pourra que vous être bénéfique.

## Tout est page

Cette affirmation catégorique est essentielle pour mieux appréhender le fonctionnement d'Hugo, surtout en ce qui concerne la logique dans les gabarits.

Pour Hugo, tout fichier compilé et ajouté à votre dossier cible public est une page. En ce sens, un article, une page, une liste d'articles, une liste de catégories ou de tags : tout ça ce sont des pages.

On peut le voir ainsi : tout ce qui possède une URL, c'est une page !

Si pour Hugo, tout est page, il faut néanmoins faire quelques distinctions bien nettes. Parmi elles, il y a les les __Types__ et les __Kinds__.

### Type

Si dans WordPress, toute entrée est un __post__ avec un type distinct. Un article c'est un post de type `post`, une page c'est post de type `page` et une recette, c'est un post de type personnalisé `recipe` (ou ce qui vous chante).

Dans Hugo, chaque entrée ou fichier de contenu est une __page__ habituelle d'un type différent. Et comme il n'existe pas de type pré-établi, tout type est votre propre type personnalisé. Pour créer une page d'un certain type :

1. Vous ajoutez le `type` désiré dans le front matter
2. Ou plus généralement, vous laissez le premier niveau d'arborescence de contenu définir le type du fichier.

Donc pour créer une page de type recette, vous pouvez soit écrire le front matter suivant :

```Markdown
title: De délicieux cupcakes
type: recette
---
```

Ou vous reposer sur la structure de votre arborescence et laisser faire la magie :

```
content
  ├── post
  └── recette
      └── de-delicieux-cupcakes.md
```


### Kind

Dans WordPress nous pouvons distinguer les layouts des templates. La page d'index qui affiche vos articles est construite d'après le fichier `archive.php`, cela s'appelle une archive. Et la page qui affiche le détail d'un article est elle construite à partir du fichier `single.php`, et s'appelle une `single`.

D'où les fonctions booléennes `is_single()`, `is_archive()`!

Dans Hugo, une fois encore, tout est page. Et donc pour déterminer ce que nous sommes supposés afficher, nous allons utiliser le mot `Kind`.

Voici différents exemples de valeurs pour `kind` :

- La page d'accueil de votre site web est la seule qui ait le `kind` `homepage`
- La page qui affiche vos recettes est une page avec le `kind` `section`
- La page qui affiche vos recettes catégorisées dans _chocolat_ est une page avec le `kind` `taxonomy`
- La page qui regroupe toutes les catégories de vos recette (dont celles au chocolat) est une page avec le `kind` `taxonomyTerm`
- Enfin la page qui affiche une recette est la page la plus commune est de `kind` `page`.

## Modèles et hiérarchie

Maintenant que nous avons vu _Type_ et _Kind_, plongeons nous dans la logique des gabarits de page d'Hugo.

Tout ce qui se trouve dans le dossier `layouts`, que ce soit celui de votre projet ou celui de votre thème est soumis à la hiérarchie de modèles, qui est un concept propre à Hugo, également désigné dans la documentation comme [l'ordre de consultation des modèles](https://gohugo.io/templates/lookup-order/).

En plus des conventions sur les noms de fichier, Hugo se base aussi sur l'arborescence des dossiers pour savoir quel modèle appliquer.

{{< notice info >}}
Comme évoqué précédemment, WordPress se base sur le fichier `archive.php` pour la mise en page de la liste d'articles de blog. Hugo se base lui sur un fichier `list.html` pour remplir cette fonction.
{{</ notice >}}

De nombreux paramètres dont `Kind`, `Type`, le format en sortie, la langue, les termes de taxonomie, peuvent déterminer le modèle qu'il faudra utiliser pour une page donnée.

{{< notice info >}}
La meilleure approche pour comprendre la logique de l'organisation des modèles avec Hugo est encore de [lire la documentation officielle](https://gohugo.io/templates/lookup-order/) à ce sujet.
{{</ notice >}}

### Les modèles de page personnalisés

C'est un des [trucs](https://developer.wordpress.org/themes/template-files-section/page-template-files/#creating-custom-page-templates-for-global-use) plus anciens de WordPress.

Si vous voulez qu'un éditeur puisse choisir la mise en page d'une page en particulier, vous devez créer un fichier de modèle de page, le déposer dans le dossier de votre thème et inclure cette saleté de gribouillage :

```php
<?php /* Template Name: Custom 🤮 */ ?>
```

Avec Hugo, vous pouvez assigner une mise en page personnalisée à n'importe quel fichier de contenu à l'aide d'un simple paramètre front matter : `layout`.

Ensuite nommez votre fichier d'après la valeur définie pour `layout`, placez-le dans le dossier `layouts/_default/` et c'est bon !

```yaml
---
title: À propos
layout: about
---
À propos de moi !

```

```txt
layouts
  └── _default
      └── about.html

```

### Les fichiers includes

Une bonne pratique WordPress consiste à utiliser la fonction `get_template_parts` pour inclure un fichier de votre thème. Cela permet d'hériter des variables globales définies par WordPress (`$post`, `$wp_query`, etc.) mais c'est tout.

Dans Hugo, on parle de fichiers partiels. Ce sont des fichiers stockés dans  `layouts/partials` qui seront chargés lors de l'appel à la fonction `partial`.

Le truc à savoir c'est que cette fonction prend comme paramètre un périmètre ou un contexte. Par défaut aucune information relative à votre page se sera transmise dans le fichier partiel.

On inclut un fichier partiel ainsi :

```go-html-template
{{ partial "post-head" . }}
```

Le point ci-dessus .............☝️ correspond à la page courante.

Le contexte de la page courante comprend toutes les variables de page dont vous aurez besoin dans votre fichier partiel et dans tous vos modèles, nous allons y venir.

{{< notice info >}}
Comprendre le contexte dans Hugo, c'est la clé. Si ce n'est pas encore clair pour vous, 👉 lisez [Hugo, le point sur le contexte]({{< relref "/post/hugo-le-point-sur-le-contexte" >}})
{{</ notice >}}

## La boucle et les données

### Les variables de Page

Dans WordPress, les données relatives à un article sont accessibles depuis les fichiers de gabarits de page via des fonctions comme `the_permalink()`, `the_title()`, `the_content()`, `the_date()` etc.

Hugo de son côté vous fourni un objet qui comprend des [variables et des méthodes](https://gohugo.io/variables/page/#readout) appelé le contexte de page et stocké dans le fameux point (`.`) mentionné plus tôt.

Dans Hugo, les équivalents aux expressions WordPress citées un peu plus haut sont `.Permalink`,  `.Title` , `.Content`, `.Date`.

Vous vous rappelez du fichier partiel de toute à l'heure ? Et bien une fois le contexte de page précisé, vous avez accès à toutes les variables de la page dans ce fichier :

```go-html-template
{{/* layouts/partials/post-head.html */}}
<div class="post-head">
  <h1><a href="{{ .Permalink }}">{{ .Title }}</a><h1>
  <time>{{ .Date }}</time>
</div>
```

### Boucler avec `range`

Pouvoir parcourir des articles pour construire des pages archives ou un widget _Derniers articles_ est essentiel pour un moteur de template.

Selon le gabarit de page que vous utilisez, WordPress vous donnera toujours accès à une liste d'articles à parcourir, même s'il n'y en a qu'un seul à afficher pour une page `single`.

Donc que ce soit pour le fichier des archives des posts de blog, des archives de la catégorie _chocolat_ des recettes, ces éléments sont dans la boucle _Loop_, paginés.

Avec Hugo, dans les gabarits de listes, les pages concernées sont stockées dans une _collection_ et sont accessibles via l'objet `.Pages`.

Cela fait que pour le modèle de liste de la section recettes, `.Pages` retournera la collection des pages correspondantes : recettes.

Pour une liste de taxonomie, `.Pages` contiendra la liste des pages qui utilisent cette taxonomie ainsi que les informations sur la taxonomie en elle-même stockés dans `.Data`, telles que `.Data.Singular`, `.Data.Plural` et [bien plus](https://gohugo.io/variables/taxonomy/).

Une chose à retenir, c'est que contrairement à WordPress, pour une page `single`, `.Pages` sera vide (arf) car toutes les informations de la page sont déjà disponibles dans le contexte de page `.`.

### Comparaison des boucles

Voici notre boucle WordPress tant aimée :

```php
// theme/archive.php
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
  <!-- post -->
  <h2>
    <a href="<?php the_permalink(); ?>"><?php the_title() ?></a>
  </h2>
  <h6><?php the_date(); ?></h6>
  <p>
    <?php the_excerpt(); ?>
  </p>
  <hr>
<?php endwhile; ?>
<?php else: ?>
<!-- aucun post trouvé -->
<?php endif; ?>
```

La même chose en beaucoup plus lisible et succinct avec Hugo, grâce à la transmission du contexte dans les fonctions :

```go-html-template
//layouts/_default/list.html
{{ with .Pages }}
  {{ range . }}
    <h2>
      <a href="{{ .Permalink }}">{{ .Title }}</a>
    </h2>
    <h6>{{ .Date.Format "January, 02 2006" }}</h6>
    <p>
      {{ .Summary }}
    </p>
    <hr>
  {{ end }}
{{ else }}
<!-- aucun élément trouvé -->
{{ end }}
```

### Qu'en-est-il des autres pages ?

Pour récupérer toutes les pages du site et ce depuis n'importe quel modèle de page, avec WordPress vous devrez écrire vous-même une requête.

Avec Hugo, nous avez simplement à appeler la collection `.Site.pages`. Comme tout est page, cette collection inclut aussi bien les pages normales, les pages de sections, les pages des taxonomies, la page d'accueil, etc. Pour ne sélectionner que les pages que WordPress appelle des _posts_, on utilisera `.Site.RegularPages`.

Voici un exemple de requête plus avancée avec WordPress, qui permet d'afficher un widget `Les dernières recettes` ordonnées en fonction d'un paramètre défini, et utilisable dans n'importe quel modèle de page :

```php
<?php
$recents = new WP_Query(
  [
    'post_type'=>'recipe',
    'posts_per_page'=>5,
    'orderby'   => 'meta_value_num',
    'meta_key'  => 'rating',
  ]
);
 if ( $recents->have_posts() ) : while ( $recents->have_posts() ) : $recents->the_post(); ?>
  <h2>
    <a href="<?php $recents->the_permalink(); ?>"><?php $recents->the_title() ?></a>
  </h2>
<!-- post -->
<?php endwhile; ?>
<?php else: ?>
<!-- aucune entrée trouvée -->
<?php endif; ?>
?>
```

Et voici son élégante variante avec Hugo :

```go-html-template
{{ $recents := (where .Site.RegularPages "Type" "recipe").ByParam "rating" }}
{{ range first 5 $recents }}
  <h2>
    <a href="{{ .Permalink }}">{{ .Title }}</a>
  </h2>
{{ end }}
```
{{< notice >}}
Pour apprendre comment filtrer et ordonner les collections de pages dans Hugo,
reportez-vous à la documentation de [range](https://gohugo.io/templates/introduction/#example-1-using-context), [where](https://gohugo.io/functions/where/#readout) et comment [ordonner le contenu](https://gohugo.io/templates/lists/#order-content).
{{</ notice >}}

## Les shortcodes

Dans WordPress, les shortcodes sont "des fonctions qui retournent quelque chose en sortie", ajoutées à l'aide de plusieurs `add_shortcode` dans votre fichier `functions.php`.

Hugo supporte également les [shortcodes](https://gohugo.io/templates/shortcode-templates/), ils sont crées en ajoutant des modèles particuliers dans `layouts/shortcodes/`. Le contenu du fichier est récupéré avec `.Inner` et ses paramètres avec `.Get`. Contrairement à WordPress, ses derniers n'ont pas forcément besoin d'être nommés.

- Si le paramètre est nommé 👉 `.Get "title"`.
- Sinon on utilise sa position 👉 `.Get 0`.

### Les shortcodes par l'exemple

Voici un exemple de shortcode WordPress tiré de la documentation. Il prendre en paramètre une classe, `caption` par défaut, et un contenu à insérer.

[^1]: [L'API Shortcode de WordPress](https://codex.wordpress.org/Shortcode_API#Enclosing_vs_self-closing_shortcodes) contient des exemples de shortcode.

```php
<?php
function caption_shortcode( $atts, $content = null ) {
  $a = shortcode_atts( array(
    'class' => 'caption',
  ), $atts );

  return '<span class="' . esc_attr($a['class']) . '">' . $content . '</span>';
}
add_shortcode( 'caption', 'caption_shortcode' );
```

Le shortcode s'utilise ensuite ainsi :

```html
[caption class="headline"]My Caption[/caption]
```

Voyons maintenant la réponse en une ligne d'Hugo :

```go-html-template
{{/* layouts/shortcodes/caption.html */}}
<span class="{{ default "caption" (.Get 0) }}">{{ .Inner }}</span>
```

On écrira dans son fichier Markdown :
```md
{{%/* caption "headline" */%}}My Caption{{%/* /caption */%}}
```

Nous avons opté pour l'utilisation de la _position_ ... car il n'y a qu'un seul paramètre 🤷

{{< notice >}}
[Tirer parti des shortcodes d'Hugo](https://jpescador.com/blog/leverage-shortcodes-in-hugo/) | [Julio Pescador](https://twitter.com/julio_pescador)
{{< /notice >}}


## Paramètres

Il y a de nombreuses pages de paramètres dans le tableau de bord de WordPress. Vous vous retrouvez souvent à naviguer entre le mode écriture et lecture de manière à pouvoir définir vos permaliens, votre titre de site, votre pagination, vos commentaires, etc.

Tout comme pour l'édition de contenu, la [configuration](https://gohugo.io/getting-started/configuration/) d'Hugo se fait dans des fichiers ! Et pour faire plaisir à tout le monde, vous pouvez choisir le format qui vous convient le mieux :

- YAML
- TOML
- JSON

Si vous ne connaissez aucun d'entre eux (le dernier devrait vous dire quelques chose), vous pouvez vous pencher sur cet [exemple de configuration](https://gohugo.io/getting-started/configuration/#example-configuration) que vous pouvez

Ces paramètres sont stockés dans un fichier config à la racine ou dans un [répertoire](https://gohugo.io/getting-started/configuration/#configuration-directory) dédié, qui vous permet de les grouper et d'écraser les variables d'environnement de façon plus intelligente.

## Formats de sortie

Hein, c'est quoi ça ?

Ah oui c'est vrai, WordPress ne vous a pas présenté.

Imaginons que pour chaque page vous ayez un fichier HTML `cette-page/index.html` et c'est tout. Hugo vous permet aussi de faire en sorte que chaque page possède aussi une version au format JSON ainsi qu'au format [AMP](https://www.ampproject.org/docs/). Ces pages sont générées à côté de leur soeur au format HTML, respectivement `cette-page/index.json` et `cette-page/index.amp.html`.

Tout ce que vous avez à faire pour cela est de dire à Hugo d'ajouter les formats de sortie pour les __Kinds__ desirés à l'aide du fichier de configuration évoqué juste avant, et d'ajouter les fichiers de templates correspondants.

Pour résumer :

```yaml
# config.yaml
outputs:
  homepage:
    - HTML
    - JSON
  page:
    - HTML
    - AMP
```

```
layouts
  ├── _default
  │   └── about.html
  ├── index.html
  ├── index.json
  └── recipes
      └── single.amp.html

```

Et c'est tout ! Du moment que ces fichiers de gabarit contiennent le code qui va bien, votre page d'accueil sera disponible en HTML ainsi qu'en JSON, alors que vos recettes pourront être servies en HTML ou au format AMP !

Je vous conseille vivement d'aller éplicher la documentation sur [les formats de sortie](https://gohugo.io/templates/output-formats#readout), grâce à eux vous pourrez ajouter une API à votre site où un fichier `.ics` pour vos évènements, ou qui sait ce dont vous aurez besoin sur votre prochain projet !

{{< notice >}}
[Bâtir une API JSON avec les formats de sortie personnalisés d'Hugo](https://forestry.io/blog/build-a-json-api-with-hugo/)
{{</ notice >}}

## Traitement des assets

WordPress ne propose rien en ce sens, c'est à vous d'utiliser votre propre gestionnaire de tâches et ses paquets de traitement des assets.

Hugo propose lui sa propre suite d'outils de traitement des assets !

-- Heeein?
-- Oui! Ça s'appelle les [tuyaux d'Hugo](https://gohugo.io/hugo-pipes/) et __sans aucune dépendance node__ vous pouvez :

- Minifier 🗜️
- Paquetter vos fichiers 📦
- Compiler vos fichiers [Sass/Scss](http://sass-lang.com/) 👓
- Ajouter une empreinte et un contrôle d'intégrité 🔑

Avec quelques dépendances vous pouvez :

- Exécuter [PostCSS](https://postcss.org/) sur vos feuilles de style

Le tout avec la même élégance à laquelle vous devez commencer à vous habituer :

```go-html-template
{{ $style := resources.Get "main.scss" | toCSS | minify | fingerprint }}
<link href="{{ $style.Permalink }}" rel="stylesheet">
```

Hugo s'assurera également que ces assets sont compilés et publiés uniquement si vous appelez leur `.Permalink` dans vos templates.

### Traitement des images

Le traitement d'image par défaut de WordPress se fait uniquement lors de l'étape initiale de téléversement.

WordPress stocke ensuite les nouveaux formats de tailles d'images crées aux côtés du fichier d'origine. Lorsque vous appelez votre image, peu importe la fonction, vous devrez utiliser un paramètre pour récupérer la taille de la variante souhaitée.

Hugo quant à lui procède au traitement des images lorsque vous en avez besoin, ce qui signifie que vous obtiendrez cette variation pour cet entête d'article seulement si vous appelez les fonctions `.Fit` ou `.Resize` dans votre gabarit de page.

```go-html-template
{{ $img := resources.Get "header.jpg" | .Resize "600x" }}
<img src="{{ $img.Permalink }}" alt="">
```

Je sais! Moi aussi je ne me lasse pas de ces instructions sur deux lignes !

Vous pouvez lancer des traitements d'images, soit à l'aide des tuyaux d'Hugo ou des [ressources de page](https://gohugo.io/content-management/page-resources/#readout).

{{< notice >}}
- [La révolution des tuyaux d'Hugo](https://regisphilibert.com/blog/2018/07/hugo-pipes-and-asset-processing-pipeline/)
- [Traitement des images responsive avec Hugo](https://laurakalbag.com/processing-responsive-images-with-hugo/) | [Laura Kalbag](https://twitter.com/laurakalbag)
- [Cache-bust et concatenation de fichiers JS/SCSS avec Hugo](https://blog.fullstackdigital.com/how-to-cache-bust-and-concatenate-js-and-sass-files-with-hugo-in-2018-9266fd3c411e) | [Ben Bozzay](https://twitter.com/BenBozzay)
- [Les ressources de page d'Hugo](https://regisphilibert.com/blog/2018/01/hugo-page-resources-and-how-to-use-them/)

{{</ notice >}}

## Thèmes et Plugins VS Composants de Thème

WordPress fait un usage immodérée des thèmes et des plugins, pour qu'en échange vous puissiez modeler l'apparence de vos sites et ajouter des fonctionnalités en codant le moins possible.

Pour les thèmes, WordPress ne vous donne que deux niveaux de personnalisation.
Vous pouvez créer un thème parent, et y mettre toutes les choses génériques. Et ensuite créer un thème enfant, qui pourra, pour tous les homonymes de fichiers partagés avec son parent, prendre le pas sur ceux-ci.

Si vous avez besoin d'un niveau supplémentaire de personnalisation en plus de ces deux, comme un ensemble de shortcodes ou un format de sortie en AMP, il faudra avoir recous à des plugins.

Dans Hugo, on ne parle pas de plugins et des thèmes mais plutôt de composants.
Vous pouvez en ajouter autant que vous voulez.

Fichiers de gabarit, JavaScript, Scss, images, fichiers de données, chaînes `i18n` (que nous couvrons plus bas), il est possible de presque tout écraser grâce aux homonymes de fichiers et vous pouvez définir l'ordre de précédence.

Voyez les composants comme des thèmes enfant illimités !

Certains composants peuvent être des thèmes complets qui contiennent un nombre important de fichiers. D'autres peuvent se contenter d'être une simple variation de votre thème principal, et ajouter leur propre ensemble de gabarits personnalisés par exemple. D'autres peuvent simplement ajouter quelques définitions de shortcodes, un nouvel ensemble de variables Sass, ou un format de sortie supplémentaire.

### Le thème par l'exemple

Prenons pour exemple un projet fictif de clinique dentaire, où personne ne veut avoir à trop mettre les mains dans le code. Vous aurez besoin :

- Un thème principal adapté pour le secteur de la santé 👩‍⚕️
- Une extension du thème principal adaptée pour le domaine dentaire 🦷
- Une extension saisonnière du thème principal 🎄
- Une solution pour gérer des menus de navigation riches
- Un ensemble de shortcodes en relation avec le médical à l'intention de l'équipe de rédaction
- Un fichier JSON pour chaque page.

Avec WordPress il vous faudrait :

- Thèmes
  - Un thème santé
  - Un thème dentaire enfant du thème santé
- Plugins
  - Un plugin thème santé saisonnier
  - Un plugin Mega Menu
  - Un plugin Shordcodes médicaux
  - Un plugin API REST

Notez bien que si en plus de cela, vous souhaitez créer vos propres fichiers de gabarit pour prendre le pas sur les thèmes parent et enfant… et bien à ce que je sâche, ce n'est pas possible. 🤷‍♂️

Dans Hugo, vous n'avez qu'à ajouter ces différents répertoires dans votre dossier `thèmes` et y faire appel dans votre fichier de configuration principal.

```yaml
theme:
  - health-theme
  - health-theme-dental-extension
  - health-theme-season-extension
  - mega-menu-component
  - medical-shortcodes-component
  - json-api-component

output:
  page:
    - HTML
    - JSON
```

L'exmple ci-dessus déclare les composants de thèmes à utiliser ainsi que leur ordre de précédence. Et comme vu auparavant, nous nous assurons que le format de sortie JSON est ajouté à toutes les pages de type `page`.

C'est tout. Si vous devez écraser n'importe quel des composants des fichiers de gabarit, il vous suffit de placer un fichier homonyme dans le dossier `layouts` à la racine de votre projet (à condition que les chemins soient identiques bien entendu).

{{< notice >}}
[Trucs et astuces pour développer un thème pour Hugo](https://medium.com/@jeffmcmorris/tips-and-tricks-for-building-a-theme-in-hugo-4806bdd747d7) | [Jeff McMorris](https://medium.com/@jeffmcmorris)
{{</ notice >}}

## On en parle de l'interface du CMS ou pas ?

Oui !

Comme vous le savez, l'interface graphique n'est pas du ressort d'Hugo. Mais il existe des tonnes de solutions, dont le formidable [Forestry.io](https://forestry.io) qui vous permet de générer une belle interface de CMS personnalisable à partir du dépôt git de votre projet Hugo !

Croyez-moi, elles sont toutes bien plus rapides et mieux conçues que ce bon vieux tableau de bord.

## Autres fonctionnalités notables

Avant de conclure, passons en revue sans ordre particulier les façons qu'ont WordPress et Hugo de gérer les fonctionnalités les plus communément demandées.

### Multilinguisme

Au revoir WPML! 🥳

Hugo gère nativement [le multilingue](https://gohugo.io/content-management/multilingual/#readout), y compris l'`i18n` et la traduction de chaînes de caractères.

Reportez-vous à l'article complet de Régis Philibert  [sur la gestion multilingue dans Hugo]({{< ref "contenu-multilingue-avec-hugo" >}}).

### Menus

Les menus Wordpress sont très puissants mais s'avèrent difficiles à maîtriser pour un développeur. La sortie est gérée à l'aide d'une fonction appelée _Walker_ pas forcément évidente à lire et à comprendre lorsqu'il s'agit de s'aventurer dans des menus à plusieurs niveaux.

La solution proposée par Hugo pour [les menus](https://gohugo.io/content-management/menus/#readout) vous laisse assigner n'importe quelle page à un menu ou à une url externe.

Concrètement, si vous avez deux menus sur votre site, vous assigner une page donnée à un menu de la sorte :

```yaml
# /content/a-propos.md
title: À propos
menu:
  main:
    name: Qui suis-je?
    weight: 2
  footer:
    weight: 1
```

Si vous avez besoin d'ajouter une url externe au menu `main`, ça se fait au niveau de la configuration de votre site :

```yaml
# /config.yaml
menus:
  main:
    - name: Blog
      url: https://blog.tumblr.com
      weight: 3
  footer:
    - name: Blog
      url: https://blog.tumblr.com
```

Dans l'exemple ci-dessus, votre lien de navigation vers votre page _À propos_ apparaîtra en seconde position dans votre menu principal avec l'intitulé _Qui suis-je ?_ Il apparaîtra également dans le menu de bas de page en première place en reprenant le titre de page: _À propos_.
En plus de cela, les deux menus incluent un lien externe _Blog_ qui pointe vers votre ancien blog tumblr.

Contrairement à WordPress, il n'y a pas de notion d'emplacement de menu.
Vous appelez votre objet où vous voulez dans votre gabarit de page avec  `.Site.Menus.main`, `.Site.Menus.footer` or `.Site.Menus.cequevousvoulez` et vous bouclez ensuite dessus avec `range`.

Encore une fois allez voir la [doc](https://gohugo.io/templates/menu-templates/#readout) pour apprendre à ajouter des menus dans vos gabarits de page, c'est une grande avancée par rapport aux bons vieux _Walkers_ (ici c'est plus 🏃‍♀️).

### Champs personnalisés

Avec WordPress, à moins que vous aimiez passer des heures à réinventer la roue, vous allez tout le temps vous reposer sur le plugin [ACF](https://www.advancedcustomfields.com/) pour récupérer et modifier les métadonnées des articles.

Hugo, comme Jekyll et d'autres générateurs basés sur Markdown, se repose sur [Front Matter](https://gohugo.io/content-management/front-matter/#readout) pour la gestion de toutes les variables "perso".
Cela permet de stocker tous les paramètres non réservés de votre contexte de page dans l'objet `.Params`.

Donc dans votre gabarit, plutôt que :

```php
<?php if ($subfield = get_field('subfield')){ echo $subfield; } ?>
```

vous écrivez :

```go-html-template
{{ with .Params.subtitle }}{{ . }}{{ end }}
```
.................................................... ☝️ Vous allez l'aimer ce point !


### Les options génériques du site

Qu'en est-il de ces options génériques non rattachées à une page en particulier ?

Et bien une fois de plus, si vous avez pratiqué WordPress après 2013, il y a des chances que vous ayez fait appel à ACF pour gérer ça, parce qu'ajouter des champs optionnels vous même à WordPress c'est vraiment une galère !

Hugo vous propose deux manière de faire. Vous pouvez ajouter des variables personnalisés comme `tagline` à l'objet `Params` dans le fichier de configuration principal de votre site et les récupérer avec `.Site.Params.tagline` par exemple.

Si vous avez des ensembles de données plus complexes, vous pouvez ajouter des fichiers  `yaml|toml|json` dans votre dossier `data/`. Tout ce qui s'y trouve sera agrégé dans un objet bien pratique `.Site.Data` accessible dans vos gabarits.

Donc si vous voulez que vos contributeurs puissent gérer les liens vers les réseaux sociaux ainsi que des options génériques, vous pouvez ajouter deux fichiers dans le répertoire `data`.

```yaml
# data/socials.yaml
- title: Facebook
  icon: fb
  url: https://facebook.com/hugo_rocks
- title: Twitter
  icon: tw
  url: https://twitter.com/hugoRocks
```

```yaml
# data/options.yaml
socials: true
tagline: Hugo rocks!
```

Et dans votre fichier partiel…

```go-html-template
{{/* layouts/partials/socials.html */}}
{{ if .Site.Data.options.social }}
<ul class="socials">
  {{ range .Site.Data.socials }}
    <li>
      <a href="{{ .url }}"><i class="icon icon-{{ .icon }}"></i> {{ .title }}</a>
    </li>
  {{ end }}
</ul>
{{ end }}
```
{{< notice >}}
[Utilisation des fichiers de données dans Hugo par l'exemple](https://novelist.xyz/tech/hugo-data-files/) | [Peter Y. Chuang](https://twitter.com/peterychuang)
{{</notice >}}

### Commentaires

Je doute que beaucoup d'entre vous utilisent encore les commentaires natifs de WordPress en 2019… mais il y a des chances pour que vous ayez envie de proposer des discussions à propos de vos articles.

Comme tous les générateurs Hugo se contente de produire des fichiers statiques, il vous faudra donc vous tourner vers un service tiers pour la gestion de vos commentaires.

Heureusement il existe un support natif de [Disqus](https://disqus.com/) [prêt à l'emploi](https://gohugo.io/content-management/comments/#add-disqus).

Et si vous n'êtes pas fans de Disqus, il existe bien d'autres solutions, qui ne demandent souvent qu'une simple balise script et le balisage correspondant.

{{< notice >}}
- [Remplacer Disqus avec les commentaires Github](http://donw.io/post/github-comments/) | [Don Williamson](https://twitter.com/Donzanoid)
- [Hugo + Staticman : réponses imbriquées et notifications par email](https://networkhobo.com/2017/12/30/hugo-staticman-nested-replies-and-e-mail-notifications/) | [ Dan C Williams](https://twitter.com/dancwilliams)
{{</notice >}}

### Formulaires

Là aussi, il faut passer par un service tiers, le plus souvent gratuit, par exemple :

- Formkeep.io
- Netlify's forms
- TypeForm

### Contenu relatif

Générer des suggestions du genre "Vous aimerez aussi" dans WordPress repose entièrement sur des plugins externes ou votre propre requête d'articles personnalisée.

Hugo sait faire ça tout seul comme un grand, et il le fait très bien, à l'aide de son propre système entièrement personnalisable de [relation de contenus](https://gohugo.io/content-management/related/#readout)

### Recherche

Comme pour tout ce qui est dynamique, rien de natif dans un générateur de site statique. Ce qui n'est pas pire que la recherche WordPress par défaut si vous voulez mon opinion. Maintenant il existe des douzaines de services qui vont proposer une expérience de recherche digne de ce nom pour vous, parmi eux :

- [Lunr.js](https://github.com/olivernn/lunr.js) 🆓
- [Algolia](https://www.algolia.com/) et leur incroyable widget [InstantSearch.js](https://community.algolia.com/instantsearch.js/) (🆓 pour les sites de petite et moyenne tailles)

{{< notice >}}
- [Recherche sur Bleve avec Hugo](http://blevesearch.com/news/Site-Search/)
- [Recherche côté client pour Hugo avec Fuse.js](https://gist.github.com/eddiewebb/735feb48f50f0ddd65ae5606a1cb41ae) | [Eddie Webb](https://twitter.com/edwardawebb/)
{{</ notice >}}

## Conclusion

Cet article n'est pas gravé dans le marbre, beaucoup de choses vont continuer d'évoluer dans Hugo, et il se peut que certaines comparaisons ne fassent plus sens.

Nous espérons simplement qu'en étudiant sur les concepts bien arrêtés depuis longtemps et rarement remis en question de WordPress, nous avons contribué à aider quelques utilisateurs de WordPress à mieux comprendre l'état d'esprit et la logique d'Hugo, et qui sait à les convaincre de franchir le pas vers la JAMstack en 2019 ! 🏃
