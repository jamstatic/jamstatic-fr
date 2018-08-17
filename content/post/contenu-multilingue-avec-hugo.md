---
title: "Contenu multilingue avec Hugo"
date: 2018-08-17T11:36:38+02:00
description: "Comment gérer les traductions dans plusieurs langues avec Hugo"
categories:
  - hugo
images:
  - https://res.cloudinary.com/jamstatic/image/upload/q_auto/v1534498973/hugo-multilingual.png
source:
  author: "Régis Philibert"
  title: "Hugo Multilingual Part 1: Content translation"
  url: "https://regisphilibert.com/blog/2018/08/hugo-multilingual-part-1-managing-content-translation/"
---

Hugo gère parfaitement le multilingue par défaut et permet ainsi de facilement traduire les contenus et les chaînes de caractères pour la localisation. Tout est pensé pour que la gestion de langues suppléméntaires soit aussi simple que possible pour les développeurs et les contributeurs, ils peuvent ainsi se focaliser sur l'essentiel.

Voyons ensemble comment configurer un projet Hugo multilingue et traduire votre contenu.

## Configurer les langues

La première chose à faire sur un projet multilingue est d'indiquer à Hugo les langues à prendre en compte. Dans notre exemple nous en aurons trois : e’ll have three:

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

Ces langues sont dorénavant accessibles via .Site.Languages`, triées par le poids indiqué, la valeur la plus petite sera la plus importante.

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

```
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

En reprenant l'exemple précédent, notre arboresence de contenus ressemble maintenant à quelque chose comme :

```
content
  ├── english
  │   └── about.md
	├── french
	│   └── about.md
	└── spanish
	    └── about.md
```

Hugo peut désormais assigner une langue à chacune des pages en fonction du dossier dans lequelle elles se trouvent.

## Créer des liens vers les traductions 🔗

La création de lien vers les traductions est fondamentale.

En régle générale, nous allons vouloir indiquer à nos visiteurs les traductions diponibles de la page en cours, que ce soit via un menu ou des métadonnées pour le SEO.

Nous avons vu qu'Hugo sait assigner une langue à une page, mais qu'en est-il de la possibilité de lier des traductions entre elles ?

Dans les deux cas, Hugo va se baser sur le nom de fichier et sa localisation par rapport au dossier `content`. En fonction du système utilisé, on  :

For both systems, Hugo will look at the filename and its location relative to its content directory. So depending on your translation management system, we can check those linkings:

Par nom de fichier | | 
:---|---|---
`content/about.md`|`content/about.fr.md`| ✅
`content/about.fr.md`|`content/about.es.md`|✅
`content/about/index.md`| `content/about/index.fr.md` |✅
`content/about.md`|`content/a-propos.fr.md`|🚫
`content/company/about.md`|`content/about.fr.md`|🚫

Par dossier | | 
:---|---|---
`content/english/about.md`|`content/french/about.md`|✅
`content/english/about/index.md`|`content/french/about/index.md`|✅
`content/english/about.md`|`content/french/a-propos.md`|🚫
`content/english/company/about.md`|`content/english/about.md`|🚫


Notez bien qu'on peut forcer la liaison si elle ne correspond pas à celle par défaut. Il suffit pour cela d'ajouter le paramètre `translationKey` dans le Front Matter aux pages qui partagent le même contenu.

```markdown
# Dans les trois pages : about.md, a-propos.fr.md, acerda.es.md
---
translationKey: about
---
```

Grâce à cette clé de traduction, en l'absence de nomenclature commune, Hugo se fera un plaisir de relier ces pages entre elles.

### Using linked translations in your template.

Maintenant que nos contenus dans différentes langues sont reliés entre eux, comment en tirer partie dans les gabarits ?

Hugo stocke les traductions liées dans deux variables de page :

* `.Translations` pour les autres traductions liées à un contenu,
* `.AllTranslations` pour toutes les traductions liées y compris celle en cours.

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
L'objet `.Language` est disponible pour toutes les pages. En plus des paramètres principaux de langues, il contient les valeurs personnalisées définir dans la configuration des langues comme la description et le peudo twitter dans notre exemple.
{{< /notice >}}
## Page Bundles

Not only does Hugo make it possible to share resources among translations, it also lets you localize a resource!

Let’s go back to our about pages and turn them into Bundles. For clarity we’ll use the "_By Directory_" management system.

```
content
    ├── english
    │   └── about
    │       ├── index.md
	│		└── header.jpg
	├── spanish
	│	└── about
	│		└── index.md
	└── french
	    └── about
	        └── index.md
```


```
content
    ├── english
    │   └── about
    │       ├── index.md
	│		└── header.jpg
	├── spanish
	│	└── about
	│		└── index.md
	└── french
	    └── about
	        └── index.md
```

For now, every pages share the same `header.jpg`, the one in the English translation. This has nothing to do with it being the default language though.

Hugo help save on duplicates here by making any ressource available to every linked translations. Meaning we can access this header image regardless of the current language using our favorite `.Resources` method, say `.Resources.GetMatch "headers.jpg"`

This is very convenient.
But what if we want a header image better aligned with our Spanish audience.
How to add a dedicated `header.jpg` for the Spanish page?

By doing exactly that!

```
content
    ├── english
    │   └── about
    │       ├── index.md
	│		└── header.jpg
	├── spanish
	│   └── about
	│       ├── index.md
	│		└── header.jpg ✨
	└── french
		└── about
			└── index.md
```

That’s it, when building the Spanish translation of the about page our `.Resources` method will return the Spanish bundle’s very own `header.jpg`.

Now what about the French?
There is no `header.jpg` in that bundle, so which header will be returned for the french translation? The Spanish one? The English one?

Well here, Hugo will look at the languages respective `Weight` and return the winners’s file. If we look at our initial configuration file, the French should get the English header.

You should know that any file, content or not, can be renamed to match a language. For this Page Bundle localization, we chose to manage our translations by __content directory__ but had we chosen to manage them by __filename__, this is how our About page's Bundle would have looked like:
```
content
	└── about
		├── index.md
		├── index.es.md
		├── index.fr.md
		├── header.jpg
		└── header.es.jpg
```
{{< notice >}}
Because `.GetMatch` tests on a Resource’s `.Title` which defaults to its filename (language included), always try, with a _By Filemane_ bundle, to make your resource call _language-agnostic_, like so: `.Resources.GetMatch "header*.jpg"`
{{< /notice >}}

## Configurer nos URLs

Qu'en est-il des URLs de nos pages ? Nous pouvons redefinir le slug d'une URL depuis le front matter d'une page, mais qu'en est-il de l'URL de base de chacune de nos langues ?

Par défaut, Hugo va stocker les pages de la langue par défaut à la racine du dossier de destination `public` et les autres langues dans leurs répertoires respectifs.

Donc pour un site en anglais par défaut, les URLs de la page `about` et de ses traductions seront :

- `about/index.html` 🇬🇧
- `fr/about/index.html` 🇫🇷
- `es/about/index.html` 🇪🇸

Nous pourrions décider de stocker les pages en anglais dans un répertoire dédié simplement en définissant le paramètre `defaultContentLanguageInSubdir` à `true` dans notre fichier `config.yaml`

## Conclusion

Voilà, vous savez maintenant comment gérer plusieurs langues pour un site généré avec Hugo, avouez que c'est plutôt simple. La prochaine fois nous verrons comment traduire les chaîne de caractères de vos modèles.
