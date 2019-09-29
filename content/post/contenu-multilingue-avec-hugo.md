---
title: "Contenu multilingue avec Hugo"
date: 2018-08-17T11:36:38+02:00
description: "Comment gérer les traductions dans plusieurs langues avec Hugo"
categories:
  - hugo
  - i18n
images:
  - https://res.cloudinary.com/jamstatic/image/upload/q_auto/v1534498973/hugo-multilingual.png
source:
  author: "Régis Philibert"
  title: "Hugo Multilingual Part 1: Content translation"
  url: "https://regisphilibert.com/blog/2018/08/hugo-multilingual-part-1-managing-content-translation/"
---

Hugo gère parfaitement le multilingue par défaut et permet ainsi de facilement traduire les contenus et les chaînes de caractères pour la localisation. Tout est pensé pour que la gestion de langues supplémentaires soit aussi simple que possible pour les développeurs et les contributeurs, ils peuvent ainsi se focaliser sur l'essentiel.

Voyons ensemble comment configurer un projet Hugo multilingue et traduire votre contenu.

## Configurer les langues

La première chose à faire sur un projet multilingue est d'indiquer à Hugo les langues à prendre en compte. Dans notre exemple nous en aurons trois :

1. Anglais 🇬🇧
2. Français 🇫🇷
3. Espagnol 🇪🇸

Nous ajoutons donc les paramètres suivants dans notre fichier de configuration :

```yaml
# config.yaml
languages:
  en:
    languageName: English
    weight: 1
  fr:
    languageName: Français
    weight: 2
  es:
    languageName: Español
    weight: 3
```

Ces langues sont dorénavant accessibles via `.Site.Languages`, triées par le poids indiqué, la valeur la plus petite sera la plus importante.

Il est possible de personnaliser des paramètres globaux déjà définis dans `.Site.Params` ou `.Param`. Aucun souci à se faire donc pour le paramètre à appeler.

```yaml
# config.yaml
params:
  description: Everything you need to know about the three languages.
  twitter_handle: 3Languages

languages:
  en:
    languageName: English
    weight: 1
  fr:
    languageName: Français
    weight: 2
    description: Tous ce que vous avez toujours voulu savoir sur les trois langues.
    twitter_handle: 3Languages_france
  es:
    languageName: Español
    weight: 3
    description: Todo lo que necesitas saber sobre los tres idiomas.
    twitter_handle: 3Languages_espana

```

```go-html-template
<meta name="description" content="{{ .Param "description" }}">
<meta name="twitter:site" content="{{ .Param "twitter_handle" }}">
```

## Traduire nos pages

Hugo propose deux manière de faire pour traduire vos contenus.

La première consiste à inclure le code de la langue dans le nom du fichier de votre contenu, par exemple : `/content/about.fr.md`.

La deuxième suppose de créer un fichier dans un dossier dédié à une langue, par exemple : `/content/french/about.md`.

Nous allons voir en détail comment s'assurer de deux choses, quelle que soit la méthode utilisée :

1. Chaque page a une langue de définie.
2. Chaque page est reliée à ses traductions.

### Gérer les traductions avec les noms de fichiers 📄

Voici à quoi ressemble notre page `about` et ses traductions :

```sh
content
├── about.md
├── about.es.md
└── about.fr.md
```

Hugo assigne ici le français au fichier `about.fr.md` et la version espagnole au fichier `about.es.md`. C'est très intuitif.

Quid du fichier `about.md` ? Comme aucune langue n'est précisée, il se verra assigné celle par défaut.

Si vous n'avez pas défini la valeur de `DefaultContentLanguage` dans votre fichier de configuration, la langue par défaut est l'anglais.

Si vous souhaitez modifier ce comportement et assigner le français par défaut aux fichiers sans nomenclature de code de langue, il vous faut ajouter cette ligne à votre fichier de configuration :

```yaml
# config.yaml
DefaultContentLanguage: fr
```

### Gérer les traductions par dossier 📁

Il est également possible d'affecter un dossier à chaque langue pour y déposer vos contenus traduits. Pour ce faire, vous devez spécifier le paramètre `contentDir` dans la configuration des langues :

```yaml
languages:
  en:
	languageName: English
	weight: 1
	contentDir: content/english
  fr:
	languageName: Français
	weight: 2
	contentDir: content/french
  es:
	languageName: Español
	weight: 3
	contentDir: content/spanish
```

Vous pouvez spécifier un chemin relatif à votre projet ou un chemin absolu. L'utilisation d'un chemin absolu signifie que vos dossiers de traduction ne se trouvent pas forcément dans votre projet, mais ailleurs sur votre ordinateur.

En reprenant l'exemple précédent, notre arborescence de contenus ressemble maintenant à quelque chose comme :

```sh
content
├── english
│   └── about.md
├── french
│   └── about.md
└── spanish
    └── about.md
```

Hugo peut désormais assigner une langue à chacune des pages en fonction du dossier dans lequel elles se trouvent.

## Créer des liens vers les traductions 🔗

La création de lien vers les traductions est fondamentale.

En règle générale, nous allons vouloir indiquer à nos visiteurs les traductions disponibles de la page en cours, que ce soit via un menu ou des métadonnées pour le SEO.

Nous avons vu qu'Hugo sait assigner une langue à une page, mais qu'en est-il de la possibilité de lier des traductions entre elles ?

Dans les deux cas, Hugo va se baser sur le nom de fichier et sa localisation par rapport au dossier `content`. En fonction du système utilisé, on peut utiliser les nomenclatures suivantes :

| Par nom de fichier         |                             |     |
| :------------------------- | --------------------------- | --- |
| `content/about.md`         | `content/about.fr.md`       | ✅   |
| `content/about.fr.md`      | `content/about.es.md`       | ✅   |
| `content/about/index.md`   | `content/about/index.fr.md` | ✅   |
| `content/about.md`         | `content/a-propos.fr.md`    | 🚫  |
| `content/company/about.md` | `content/about.fr.md`       | 🚫  |

| Par dossier                        |                                 |    |
| :--------------------------------- | ------------------------------- |--- |
| `content/english/about.md`         | `content/french/about.md`       | ✅  |
| `content/english/about/index.md`   | `content/french/about/index.md` | ✅  |
| `content/english/about.md`         | `content/french/a-propos.md`    | 🚫 |
| `content/english/company/about.md` | `content/english/about.md`      | 🚫 |

Notez bien qu'on peut forcer la liaison si elle ne correspond pas à celle par défaut. Il suffit pour cela d'ajouter le paramètre `translationKey` dans le Front Matter aux pages qui partagent le même contenu.

```markdown
# Dans les trois pages : about.md, a-propos.fr.md, acerda.es.md
---
translationKey: about
---
```

Grâce à cette clé de traduction, en l'absence de nomenclature commune, Hugo se fera un plaisir de relier ces pages entre elles.

### Ajouter des liens vers les traductions dans les modèles de page

Maintenant que nos contenus dans différentes langues sont reliés entre eux, comment en tirer parti dans les gabarits de page ?

Hugo stocke les traductions liées dans deux variables de page :

- `.Translations` pour les autres traductions liées à un contenu,
- `.AllTranslations` pour toutes les traductions liées y compris celle en cours.

Les traductions sont ici également triées en fonction du paramètre `Weight` défini dans le fichier configuration.

Pour indiquer aux moteurs de recherche qu'il existe des traductions de contenu, il nous suffit d'ajouter le code suivant dans la balise  `<head>` :

```go-html-template
{{ if .IsTranslated }}
	{{ range .Translations }}
	<link rel="alternate" hreflang="{{ .Language.Lang }}" href="{{ .Permalink }}" title="{{ .Language.LanguageName }}">
	{{ end }}
{{ end }}
```

Si nous préférons lister toutes les langues, y compris celle de la page en cours il nous suffit de boucler plutôt sur `.AllTranslations`.

On peut utiliser la même logique pour ajouter un sélecteur de langue qui ne s'affiche que si une ou plusieurs traductions sont disponibles :

```go-html-template
{{ if .IsTranslated }}
	<nav class="LangNav">
	{{ range .Translations }}
		<a href="{{ .Permalink }}">{{ .Language.LanguageName }}</a>
	{{ end}}
	</nav>
{{ end }}
```

{{< notice tip >}}
L'objet `.Language` est disponible pour toutes les pages. En plus des paramètres principaux de langues, il contient les valeurs personnalisées définir dans la configuration des langues comme la description et le pseudo twitter dans notre exemple.
{{< /notice >}}

## Les bundles de page

Hugo vous permet de partager des ressources entre traductions et vous laisse aussi la possibilité de traduire une ressource !

Revenons à nos pages `about` et transformons les en bundles (un dossier qui permet de stocker un contenu et ses ressources associées : images, etc.). Afin que ce soit plus clair, nous opterons pour la gestion par dossiers :

```sh
content
├── english
│   └── about
│       ├── index.md
│   └── header.jpg
├── español
│   └── about
│       └── index.md
└── french
    └── about
        └── index.md
```

```sh
content
├── english
│   └── about
│       ├── index.md
│   └── header.jpg
├── spanish
│   └── about
│       └── index.md
└── french
    └── about
        └── index.md
```

Dans cette configuration, toutes les traductions utilisent la ressource de la langue anglaise `header.jpg`. Hugo nous évite des duplications inutiles en partageant les ressources avec toutes les traductions d'une même page. On peut donc utiliser cette image quelque que soit la langue utilisée à l'aide de la fonction `.Resources`, en écrivant par exemple ici `.Resources.GetMatch "header.jpg"`. Vous n'êtes pas obligé de stocker la ressource dans le dossier de la langue par défaut, ça marchera aussi si la ressource se trouve dans un autre dossier de langue.

C'est bien pratique.
Mais que se passe-t-il si nous devons localiser cette image pour notre audience espagnole ? Comment ajouter une image spécifique pour la page espagnole ?

Il suffit de déposer notre image dans le dossier de la langue espagnole :

```sh
content
├── english
│   └── about
│       ├── index.md
│   └── header.jpg
├── spanish
│   └── about
│       ├── index.md
│   └── header.jpg ✨
└── french
    └── about
        └── index.md
```

C'est tout, Hugo prendra en compte qu'une ressource dédiée pour la version espagnole de notre page `about`.

Et pour la version française ? Quelle image va-t-elle utiliser ? Celle de la version espagnole ou celle de la version anglaise ?

Dans ce cas Hugo va se baser sur la langue qui a le plus de poids et retourner la version correspondante. Comme dans notre configuration des langues, l'anglais a un indice de poids de 1, la version française héritera de la version de la ressource en anglais.

Sachez qu'il est possible de renommer n'importe quel fichier pour lui affecter une langue. Si nous avions choisi ici de nous baser sur la méthode qui repose sur la nomenclature des fichiers, notre bundle pour la page `about` ressemblerait à ceci :

```sh
content
└── about
    ├── index.md
    ├── index.es.md
    ├── index.fr.md
    ├── header.jpg
    └── header.es.jpg
```

{{< notice tip >}}
Comme la fonction `.GetMatch` teste la valeur `.Title` d'une ressource, qui correspond par défaut à son nom de fichier (langue incluse), faites bien attention si vous vous basez sur les nomenclatures de fichier de bien englober toutes les ressources quelle que soit leur langue, comme ceci : `.Resources.GetMatch "header*.jpg"`
{{< /notice >}}

## Configurer nos URLs

Qu'en est-il des URLs de nos pages ? Nous pouvons redefinir le slug d'une URL depuis le front matter d'une page, mais qu'en est-il de l'URL de base de chacune de nos langues ?

Par défaut, Hugo va stocker les pages de la langue par défaut à la racine du dossier de destination `public` et les autres langues dans leurs répertoires respectifs.

Donc pour un site en anglais par défaut, les URLs de la page `about` et de ses traductions seront :

- `about/index.html` 🇬🇧
- `fr/about/index.html` 🇫🇷
- `es/about/index.html` 🇪🇸

C'est pas mal, mais je doute que l'équipe chargée du référencement soit vraiment satisfaite. Pour nous assurer que les URLs des pages correspondent à leur titre, il nous faut encore mettre à jour le slug des pages traduites :

```yaml
# about.fr.md
title: À Propos
slug: a-propos
```

```yaml
# acerda.es.md
title: Acerda
slug: acerda
```

Ce qui a pour effet d'avoir des URLs traduites :

- `fr/a-propos/index.html` 🇫🇷 👌
- `es/acerda/index.html` 🇪🇸 👌

Nous pourrions décider de stocker les pages en anglais dans un répertoire dédié simplement en définissant le paramètre `defaultContentLanguageInSubdir` à `true` dans notre fichier `config.yaml`

## Localisation des chaînes de caractères

La convention pour la traduction des chaînes de caractères avec Hugo ressemble un peu à celle des fichiers `.po` de gettext. Les chaînes de chaque langue sont enregistrées dans un fichier nommé en fonction du code de la langue utilisée et stockées dans un dossier `i18n/`.

Ce dossier peut se trouver à la racine de votre projet ou d'un thème.

-   `i18n/en.yaml` ✅
-   `themes/academic/i18n/en.yaml` ✅

Pour nos trois langues, ça ressemble à quelque chose comme :

```yaml
# i18n/en.yaml 🇬🇧
- id: hello
  translation: "Hello"
- id: how_are_you
  translation: "How are you doing?"
```

```yaml
# i18n/fr.yaml 🇫🇷
- id: hello
  translation: "Bonjour"
- id: how_are_you
  translation: "Comment allez-vous ?"
```

```yaml
# i18n/es.yaml 🇪🇸
- id: hello
  translation: "Hola"
- id: how_are_you
  translation: "¿Como estas?"
```

Comme vous pouvez le voir dans l'exemple ci-dessus, tout ce dont nous avons besoin c'est d'une chaîne qui servira de clé unique et d'une chaîne de caractère pour la traduction.

Ensuite dans nos modèles de page, [la fonction i18n](https://gohugo.io/functions/i18n/#readout) d'Hugo se charge du reste.

1.  Elle va tester si la clé passée en argument existe et retourner la traduction correspondante si elle existe.
2.  Si la clé n'existe pas pour la langue courante dans le fichier, elle affichera la traduction de la langue par défaut.
3.  Si la clé n'existe pas pour la langue par défaut, elle retourne une chaîne vide.

```go-html-template
<header>
    {{ i18n "hello" }}
    <hr>
    {{ i18n "how_are_you" }}
</header>
```

```go-html-template
<!-- /es/index.html 🇪🇸 -->
<header>
    Hola
    <hr>
    ¿Como estas?
</header>
```

```go-html-template
<!-- /fr/index.html 🇫🇷 -->
<header>
    Bonjour
    <hr>
    Comment allez-vous ?
</header>
```

La fonction `i18n` a comme alias `T`. Si taper `i18n` est trop fatiguant pour vos petits doigts, vous pouvez donc utiliser la syntaxe abrégée : `{{ T "how_are_you" }}`.

## Mettre les chaînes au pluriel

Les chaînes ne font pas toujours référence à une entité unique. Elles peuvent parfois qualifier une seule chose, parfois plus. Comment donc nous assurer qu'une phrase sera fidèlement traduite au singulier comme au pluriel ?

Hugo possède bien une fonction [`pluralize`](https://gohugo.io/functions/pluralize/#readout), mais elle ne gère que l'anglais.

Heureusement pour nous, les chaînes de traduction d'Hugo nous permettent de gérer parfaitement les autres langues.

Afin de mieux illustrer cette fonctionnalité, nous allons utiliser des exemples dans lesquels figurent… des rongeurs 🐭 ! N'ayez pas peur, ce sont simplement des pluriels intéressants dans les trois langues.

Comment ça marche ? Hé bien, il s'avère que la valeur de notre traduction peut également être une liste de pluriels.

```yaml
# i18n/en.yaml 🇬🇧
- id: mouse
  translation:
    one: Mouse
    other: Mice
```

Excellent, notre chaîne a maintenant un singulier (`one`) et une autre version (`other`) qui sera donc notre pluriel.

Renseignons donc nos autres fichiers :

```yaml
# i18n/es.yaml 🇪🇸
- id: mouse
  translation:
    one: Ratón
    other: Ratones
```

```yaml
# i18n/fr.yaml 🇫🇷
- id: mouse
  translation:
    other: Souris
```

Comme en français le mot souris est invariable au singulier et au pluriel, nous n'avons qu'à renseigner la version générique `other`.

La fonction `i18n` peut prendre un entier comme deuxième paramètre, afin de préciser à combien d'éléments fait référence notre chaîne et à pouvoir la mettre au pluriel si nécessaire.

```go-html-template
{{ range .Pages }}
    <h3>{{ $.Title }}</h3>
    {{ with .Params.mice }}
        {{ i18n "this_story_has" }} {{ . }} {{ i18n "mouse" . }}.
    {{ end }}
    <hr>
{{ end }}
```

Imaginons que nous avons deux histoires, la première avec 24 souris et la seconde avec une seule, voici quel serait le HTML compilé :

```html
<h3>Cinderella</h3>
This story has 24 Mice.
<hr>
<h3>Fantasia</h3>
This story has 1 Mouse.
<hr>
```

### Inclure le nombre d'unités dans la traduction

Vous pouvez même ajouter le nombre exact à la traduction de votre chaîne à l'aide de `.Count` et fusionner l'ensemble dans une seule chaîne de caractère (notez l'utilisation des guillemets) :

```yaml
- id: story_mice
  translation:
    other: "This story has {{ .Count }} Mice"
    one: This story has only one Mouse
```

Dorénavant le nombre de souris sera retourné en sortie de la fonction `i18n`, nous pouvons mettre à jour notre code pour qu'il utilise plutôt cette chaîne unique :

```diff
- {{ i18n "this_story_has" }} {{ . }} {{ i18n "mouse" . }}
+ {{ i18n "story_mice" . }}
```

Le HTML compilé correspondant sera :

```html
<h3>Cinderella</h3>
This story has 24 Mice.
<hr>
<h3>Fantasia</h3>
This story has only one Mouse.
<hr>
```

{{% notice tip %}}
Vous pensez peut-être déjà au cas où il n'y a pas de souris quand le total est `0` ?
Comme [expliqué plus bas](#traduction-des-chaînes-avec-le-système-de-fichier-d-hugo), cela ne sera pas possible 🙅‍♂️.
{{% /notice %}}

### Inclusion du contexte dans la traduction

Vous pouvez également passer en second paramètre un contexte à la fonction `i18n` plutôt qu'un entier.
Là encore cela peut nous éviter de découper nos phrases en plusieurs chaînes de traduction, quand nous avons besoin de plus que de `.Count`.

```yaml
# i18n/en.yaml
- id: intro
  translation:  "This is the story of {{ .Params.lead }}{{ with .Params.location }} which takes place in {{ . }}{{ end }}"
```

```yaml
# i18n/en.yaml
- id: intro
  translation:  "Voici l'histoire de {{ .Params.lead }}{{ with .Params.location }} qui se déroule à {{ . }}{{ end }}"
```

C'est le même principe que le contexte d'un fichier partiel.

```go-html-template
<h3>{{ .Title }}</h3>
<div class="intro">{{ i18n "intro" . }}</div>
```

```html
<h3>The Great Mouse Detective</h3>
<div class="intro">This is the story of Basil which takes place in London</div>
```

Lorsque vous passez un contexte en paramètre d'`i18n`, vous devez garder certaines choses en tête :

1.  `i18n` ne pourra évaluer ce paramètre comme un nombre (puisque ce n'en est pas un), donc impossible de mettre cette chaîne au pluriel à l'aide de `one` et `other`.
2. Si cette chaîne est appelée à différents endroits, assurez-vous de toujours lui passer le même contexte ou bien utilisez `with` comme nous l'avons fait ci-dessus, si vous ne voulez pas vous retrouver avec une erreur bien moche du type `can't evaluate field`.

### Traduction des chaînes avec le système de fichier d'Hugo

Rappelez-vous que nos fichiers `i18n` sont inclus dans le système de fichier global d'Hugo. En conséquence, tous les fichiers `en.yaml` présents dans l'arborescence de notre projet Hugo seront fusionnés.

Si une des traductions du thème que nous utilisons ne nous plaît pas, nous n'avons qu'à créer un fichier `i18n/en.yaml` à la racine de notre projet (ou de notre composant de thème prioritaire) pour y ajouter notre version de cette traduction et uniquement celle-ci.

```yaml
# i18n/en.yaml
- id: mouse
  translation:
    one: Rodent
    other: Rodents
```

C'est tout ! Pour les autres langues, Hugo se basera sur les _Souris_ et les _Ratones_ 🐁 déclarés dans `themes/miceandmen/i18n/`.

### Un dernier mot sur les singuliers et les pluriels

L'anglais comme le français, l'espagnol et bien d'autres langues ne connaît que deux formes de pluralisation, c'est soit du **singulier** soit du **pluriel**.

Donc dans Hugo assez logiquement, pour le traitement d'une chaîne en anglais, les seules possibilités  de mettre au pluriel seront `one` ou `other`.

La version à utiliser est déterminée par ce test tout simple :

**si** l'entier passé en paramètre de `i18n` **==** `1` 👉 `one`<br>
**sinon** 👉 `other`

C'est tout pour la plupart des langues européennes !

Maintenant, d'autres langues comme le Russe ont des pluriels spécifiques pour `few` et `many`, l'arabe a une forme pour `zero` et une pour `two` [^1]

Si nous pouvons deviner sans mal le nombre correspondant au pluriel de `zero` ou `two`, connaître le nombre exact d'éléments correspondants à `few` ou `many` en Russe ressemble davantage à un casse-tête.

Heureusement, nous pouvons nous reposer sur Hugo et [go-i18n](https://github.com/nicksnyder/go-i18n) de [Nick Snyder](https://github.com/nicksnyder) pour nous aider à assembler toutes les pièces du puzzle.

{{% notice info %}}
Voici tous les pluriels supportés pour l'ensemble des langues :
`zero` `one` `two` `few` `many` `other`
{{% /notice %}}

Mais, cela ne veut pas dire pour autant que vous pouvez les utiliser en anglais.

Si la langue courante est l'anglais, que votre total de souris est nul, et que vous précisez que le pluriel pour `zero` est `This story has no mouse`, vous vous retrouverez quand même avec la valeur utilisée pour `other` : `This story has 0 Mice.`

La valeur `zero` n'est prise en compte que si la langue courante est l'arabe ou si cette langue supporte un pluriel pour `zero`.

## Conclusion 🏁

Traduire des chaînes de caractères dans Hugo consiste à écrire un ou plusieurs fichiers de données pour chacune des langues supportée par votre projet.

Nous avons vu qu'Hugo offre une solution de localisation très simple et très efficace, que ce soit pour aider les contributeurs à traduire des contenus, ou permettre aux développeurs de supporter plusieurs langues dans les modèles de page.

Si vous avez été amenés à gérer des projets multilingues plus complexes que ceux présentés ici, si vous pensez pouvoir enrichir cet article ou que vous avez vérifié le nombre exact de souris présentes dans Cendrillon[^2], [faite-le savoir en commentaire](https://regisphilibert.com/blog/2018/08/hugo-multilingual-part-2-i18n-string-localization/#disqus_thread).

[^1]: <http://www.unicode.org/cldr/charts/33/supplemental/language_plural_rules.html>

[^2]: Evidemment, j'ai pris un nombre au pif !
