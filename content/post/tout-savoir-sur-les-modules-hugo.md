---
title: "Tout ce que vous devez savoir sur les modules Hugo"
description: "Les modules Hugo permettent d'utiliser des fichiers stockés dans n'importe quel dépôt Git dans vos projets."
author: frank
date: 2020-09-05T13:55:22+02:00
lastmod: 2020-09-05T13:55:22+02:00
categories:
  - hugo
images:
  - https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/w_1200,c_fit,co_white,g_north_west,x_64,y_120,l_text:poppins_78_ultrabold_line_spacing_-30:Tout%20ce%20que%20vous%20devez%20savoir%20sur%20les%20modules%20Hugo/jamstatic/twitter-card.png
source:
  author: "Régis Philibert"
  title: "Hugo Modules: everything you need to know!"
  url: https://www.thenewdynamic.com/article/hugo-modules-everything-from-imports-to-create/
---

Les modules Hugo, apparus dans la version [0.56.0](https://gohugo.io/news/0.56.0-relnotes/), ajoutent un puissant système de dépendances dont vous auriez tort de vous passer. Ils permettent de rappatrier des fichiers stockés dans des dépôts Git dans vos projets. Les cas d'utilisation vont du simple usage d'un thème complet, à celui de sélection de composants de thèmes distants, comme des icônes, ou au partage de composants réutilisables (modèles, fichiers partiels, shortcodes, etc.) entre plusieurs projets.

Cet article vous propose de vous mettre la main à la pâte et après avoir vu comment **importer** un ou plusieurs modules dans votre site, nous développerons notre propre module!

### Initialiser votre projet en tant que module

{{< notice >}}

#### Tout est module

Il est important de comprendre qu'avant d'importer un module Hugo, votre projet doit lui même être un module !
{{< /notice >}}

Pour initialiser votre projet en tant que module, vous devez faire reférence à une URL de dépôt Git.

Partons du principe que votre projet Hugo est déjà sur GitHub à l'adresse `https://github.com/chez-moi/mon-depot`

Dans un terminal, à la racine de votre projet, lancez:

```bash
hugo mod init github.com/chez-moi/mon-depot
```

☝️ Cette commande génère un fichier `go.mod` à la racine du projet. Il ressemble à quelque chose comme:

```go
module github.com/chez-moi/mon-depot

go 1.15
```

Un fichier `go.sum` est également généré, mais ne nous en préoccupons pas pour le moment.

### Importer un dépôt distant

Prenons un exemple simple et ajoutons à notre projet les icônes mis à disposition par l'équipe de Bootstrap dans le dépôt [https://github.com/twbs/icons](https://github.com/twbs/icons).

La déclaration se fait dans votre fichier de configuration à l'aide du mot clé `module` et de sa liste d'`imports`:

```yaml
module:
  imports:
    - path: github.com/twbs/icons
```

Maintenant lancez la commande `hugo` et vous pouvez remarquer que le fichier `go.mod` comporte une nouvelle ligne:

```go
module github.com/chez-moi/mon-depot

go 1.15

require github.com/twbs/icons v1.0.0 // indirect
```

C'est bien, mais cela ne dit pas à Hugo ce qu'il doit faire de ces fichiers.

Grâce à la clé `mounts`, relative à notre import de Bootstrap, donnons plus de directives à Hugo:

```yaml
module:
  imports:
    - path: github.com/twbs/bootstrap
      mounts:
        - source: icons
          target: assets/icons
```

Comme pour les `imports`, on peut utiliser plusieurs `mounts`, pour le moment nous contenterons d'un seul avec les paramètres suivants:

- le paramètre `source` désigne la location des fichiers dans le dépôt distant. Ici nous voulons juste le réperetoire `icons` situé à la racine du dépôt.
- le paramètre `target` désigne l'endroit où Hugo doit monter les fichiers dans notre systéme de fichier Hugo unifié.

Une fois le montage effectué, nous pouvons accéder aux icônes SVG situées dans ce dossier comme à n'importe quel autre fichier de notre projet:

```go-html-template
{{ with resources.Get "icons/cart.svg" }}
  <div class="w-4 fill-current">
    {{ .Content | safeHTML }}
  </div>
{{ end }}
```

Et voilà !

Nous pouvons afficher cette icône de panier SVG sans avoir à la recopier dans notre projet.

Dans l'éventualité où vous voulez personnaliser cette icône de panier nous pouvons compter sur le système de fichiers unifié d'Hugo !

Tout ce que nous avons à faire est de créer un fichier d'icône du même nom et de le placer au même emplacement `assets/icons/cart.svg` dans notre projet pour qu'il soit utilisé à la place de l'icône de panier de Bootstrap.

Ou si nous voulions, nous pourrions aussi importer le fichier d'un autre dépôt distant pour une simple icône 🤪:

```yaml
- path: github.com/refactoringui/heroicons
    mounts:
    - source: src/solid/shopping-cart.svg
      target: assets/icons/cart.svg
- path: github.com/twbs/icons
	  mounts:
    - source: icons
      target: assets/icons
```

☝️ Ici nous importons deux dépôts, chacun avec son propre point de montage.

{{< notice tip >}}
Peu importe le nombre de fichiers montés, Hugo téléchargera quand même l'intégralité du dépôt, donc pensez-y à deux fois avant d'importer un dépôt de plusieurs MB pour un simple fichier SVG.
{{< /notice >}}

### Mise à jour

Et si le dépôt distant est mis à jour ? Par défaut lors du premier import Hugo va télécharger la dernière version publiée, à défaut le commit de tête de la branche par défaut. C'est pour cela qu'Hugo a ajouté `v1.0.0` à la fin du `require` dans le fichier `go.mod`.

Si [`github.com/twbs/icons`](https://github.com/twbs/icons/) sort une version `v1.1.0` et que vous souhaitez faire la mise à jour:

```bash
hugo mod get -u github.com/twbs/bootstrap
```

Cette commande mettra votre fichier `go.mod` à jour avec la dernière version publiée.

### Cibler une version

Si maintenant vous souhaitez utiliser une version bien précise d'un dépôt Git, ciblez son tag (prenons un autre dépôt pour cet exemple):

```bash
hugo mod get github.com/twbs/bootstrap@v3.4.1
```

Si vous souhaitez utiliser un commit bien précis, pointez vers son hash avec `@` comme ceci:

```bash
hugo mod get github.com/twbs/bootstrap@394812b61d4dc80bfb2e090de925ae0dfc4cc29b
```

{{< notice tip>}}
Vous devez bien entendu versionner les fichiers `go.mod` et `go.sum` afin que tous les collaborateurs du projet utilisent les mêmes versions !
{{< /notice >}}

{{< notice >}}

#### Développer un module en local

Cet article ne couvre pas le développemeent local d'un module, nous vous invitons à [lire notre note sur le sujet](https://www.thenewdynamic.com/note/develop-hugo-modules-locally/) avant d'embarquer pour le joyeux monde des modules Hugo.
{{< /notice >}}

## Créer un module Hugo

Bon c'est intéressant de savoir importer n'importe quel dépôt et d'intégrer ses fichiers dans notre projet, mais la vraie puissance vient de l'utilisation de modules Hugo complets, qui peuvent gérer des fichiers de modèles, des assets, des fichiers de données, voire des fichiers de **contenu** !

Et quel meilleur moyen d'apprendre que de créer nous-mêmes notre propre module ?

Créons pour l'exemple un petit module d'icônes. Pour cela nous voulons:

1. Importer les fichiers SVG d'un dépôt distant
2. Créer une page qui liste toutes les icônes disponibles
3. Utiliser notre propre fichier partiel `icon` pour faciliter l'affichage de n'importe quelle icône du projet.

Créons d'abord un dossier sur notre ordinateur et nommons-le `assets/hugo-icons` pour éviter tout conflit avec un dossier `assets/icons` existant.

### 1. Les imports

Nous avons tout d'abord besoin de lister les `imports` des fichiers de notre module dans un fichier `config.yaml`.

En effet, n'importe quel projet Hugo, que ce soit un site web, un thème ou un composant peut importer d'autres modules ou d'autres dépôts. Il n'y a pas de limite dans l'arborescence de dépendances, les modules sont une vraie de gestion de dépendences !

Nos imports seront très similaires à ce que nous avons vu plus haut, la seule différence est que nous importons les fichiers dans un dossier différent pour éviter tout conflit:

```yaml
# config.yaml
module:
  imports:
    - path: github.com/twbs/bootstrap
      mounts:
        - source: icons
          target: assets/hugo-icons/icons
```

### 2. La page de listing

Pour cela nous avons besoin de deux fichiers:

1. Un fichier de contenu,
2. Un fichier de modèle pour qu'Hugo puisse effectuer le rendu de notre fichier.

Puisque nous utilisons la directive `mounts`, nous n'avons pas besoin de nous respecter l'arborescence classique d'un projet Hugo. Nous sommes libres d'organiser les fichiers de notre module comme bon nous semble:

- `page/layout.html`
- `page/content.md`

Mettons à jour notre fichier `config.yaml`, vous pouveez noter que les paramètres `mounts` se situent à la racine de notre map `module`.

Les points de montage ne sont en effet pas réservés aux seuls `imports`. Vous pouvez attribuer des points de montage au module en question à l'aide de sa propre directive `mounts`:

```yaml
# config.yaml
module:
  mounts:
    - source: page/index.md
      target: content/hugo-icons-listing.md
      lang: en
    - source: page/template.html
      target: layouts/_default/hugo-icons-listing.html
  imports: [...]
```

{{< notice info >}}
Le paramètre `lang` n'a d'importance que pour les sites multilingues et même si vous l'omettez la page sera montée pour la langue par défaut du site.
{{< /notice >}}

Nos deux fichiers eux ressemblent à ça:

```yaml
# page/index.md
---
title: Liste des icônes
layout: hugo-icons-listing
---

```

```go-html-template
{{/* page/template.html */}}
{{ define "main" }}
  {{ range resources.Match "hugo-icons/icons/*.svg" }}
    <div style="fill:currentColor;width:3rem;margin:1rem 0">
    {{ .Content | safeHTML }}
    </div>
  {{ end }}
{{ end }}
```

{{< notice info >}}
Notez qu'ici nous partons du principe que votre modèle `baseof.html` contient un block `main`, sans quoi Hugo affichera une erreur.
{{< /notice >}}

### 3. Le fichier partiel

Plaçons notre fichier dans `partials/icon.html` et déclarons un nouveau point de montage:

```yaml
# config.yaml
module:
  mounts:
    [...]
    - source: partials
      target: layouts/partials/hugo-icons
  imports:
  [...]
```

Ici nous choississons de monter notre fichier dans un répertoire nommé pour éviter tout conflit avec un fichier partiel `icon` existant. Les utilisateurs pourront ainsi appeler `{{ partial "hugo-icons/icon" "cart" }}` en toute sécurité.

Notre fichier partiel:

```text
{{/*
  icon
  Affiche l'icône correspondant à la chaîne passée comme contexte

  @author @regisphilibert

  @context String (.)

  @access public

  @example - Go Template
    {{ partial "hugo-icons/icon" "cart" }}
*/}}
```

```go-html-template
{{- with resources.Get (print "hugo-icons/icons/" .) -}}
  {{- .Content | safeHTML -}}
{{- end -}}
```

### Finitions de notre module

Notre module comporte maintenant les fichiers nécessaires. Il nous faut encore ajouter quelque chose de très important à sa configuration: sa compatibilité avec les versions d'Hugo.

Nous utilisons la fonction `resources.Match` introduite dans [Hugo 0.57.0](https://gohugo.io/news/0.57.0-relnotes/). Quant au montage dans les sous-dossiers, il n'est supporté que depuis [Hugo 0.64.0](https://gohugo.io/news/0.64.0-relnotes/#other-1).

Il nous faut donc indiquer que notre module ne marchera qu'avec une version d'Hugo au moins égale à 0.64.0 ou sinon… patatra !

```yaml
# config.yaml
module:
  hugoVersion:
    # La version extended (Sass) n'est pas requise
    extended: false
    # Il n'y a pas de version maximale
    max: ""
    # Par contre il y a une version minimale
    min: "0.64.0"
```

Notre fichier `config.yaml` final:

```yaml
module:
  hugoVersion:
    min: "0.64.0"
  mounts:
    - source: page/index.md
      target: content/hugo-icons-listing.md
      lang: en
    - source: page/template.html
      target: layouts/_default/hugo-icons-listing.html
    - source: partials
      target: layouts/partials/hugo-icons
  imports:
    - path: github.com/twbs/icons
      mounts:
        - source: icons
          target: assets/hugo-icons/icons
```

Vous pouvez consulter [le dépôt de notre module d'exemple pour cet article](https://github.com/regisphilibert/hugo-module-icons).

{{< notice info >}}

#### Pense-bête

Nous avons vu les commandes `hugo mod init` et `hugo mod get -u`. Ces deux commandes sont aussi très utiles:

`hugo mod clean`

Cette commande va supprimer le cache du module. Je l'utiliss dès que quelque chose de marche pas comme prévu.

`hugo mod tidy`

Cette commande supprimera les entrées inutilisées dans votre fichier `go.sum`.
{{< /notice >}}

## Conclusion

Les modules Hugo sont la méthode à priviléger dès qu'il s'agit d'importer des fichiers issus de n'importe quel dépôt Git public dans vos projets et de contrôler leur versionnement.

Et maintenant que vous savez comment créer un module Hugo, vous devriez vous en servir pour gérer les composants réutilisables de vos projets et les [publier](https://www.thenewdynamic.com/open-source/) pour enrichir l'écosystème d'Hugo. :smile:

## Ressources complémentaires

- [Documentation officielle](https://gohugo.io/hugo-modules/)
- [Les modules Hugo pour les nuls](https://dev.to/craftsmandigital/hugo-modules-for-dummies-42j9)
- [Maîtriser les modules Hugo](https://www.hugofordevelopers.com/series/master-hugo-modules/)
