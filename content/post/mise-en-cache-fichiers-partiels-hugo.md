---
title: "Gestion du cache des fichiers partiels avec Hugo"
date: 2019-12-03T18:10:24+01:00
lastmod: 2019-12-07T18:13:54+01:00
description: "Apprenez à optimiser le cache des fichiers partiels pour reduire plus encore vos temps de génération avec Hugo."
categories:
  - hugo
images:
  - https://regisphilibert.com/blog/2019/12/hugo-partial-series-part-1-caching-with-partialcached/images/featured.png
source:
  author: "Régis Philibert"
  title: "The Full Partial Series Part 1: Caching!"
  url: "https://regisphilibert.com/blog/2019/12/hugo-partial-series-part-1-caching-with-partialcached/"
---

{{< figure src="https://regisphilibert.com/blog/2019/12/hugo-partial-series-part-1-caching-with-partialcached/images/featured.png" caption="" attr="" attrlink="" >}}

Les fichiers partiels sont parmi les modèles de fichiers les plus utilisés pour la maintenance de sites Hugo. C'est eux qui nous permettent d'isoler nos composants, inclusions, ou autres morceaux de code et même plus récemment nos fonctions.

Nous n'allons pas revenir dans cet article sur les bases des
[partiels](https://gohugo.io/templates/partials/) comme leur _contexte_ que nous avons déjà [détaillé auparavant]({{< relref "/post/hugo-le-point-sur-le-contexte" >}}).

Nous allons voir comme tirer parti au mieux des fonctionnalités de ces fichiers, bien au-delà des inclusions habituelles. Nous verrons comment Hugo peut mettre en cache vos fichiers partiels pour réduire le temps de génération, comment les utiliser comme des fonctions, nous verrons enfin quelles sont les meilleures pratiques à adopter en termes d'organisation et de commentaires pour nous assurer de leur pérennité.

Entrons dans le vif du sujet sans plus attendre avec la solution dédiée à la mise en cache des fichiers partiels : [`partialCached`](https://gohugo.io/functions/partialcached/)

## Pourquoi utiliser partialCached ?

Comme vous le savez peut-être déjà, le but d'un fichier partiel est de permettre de refactoriser les parties de code utilisées souvent dans vos modèles.

Si comme moi vous avez horreur de _copier-coller_ des bouts de code un peu partout dans vos projets, vous devez avoir beaucoup recours aux fichiers partiels !

Le rendu du code de votre fichier partiel peut être identique sur une majorité des pages et quelque peu différent pour certaines, ou bien il peut être complètement différent d'une page à l'autre. Ce deuxième scénario bénéficiera rarement des bienfaits d'une mise en cache, concentrons-nous donc ici sur le premier.

Songez à l'entête de page de votre site par exemple.

Votre entête de page affichera presque toujours le même balisage. Même logo, même lien vers la page d'accueil, même menu de navigation, même liens vers vos comptes sur les réseaux sociaux. Il sera affiché sur chacune des pages de votre site.

Si votre projet Hugo nécessite la création de milliers de fichiers HTML, alors, à chaque génération Hugo va devoir inspecter mille fois la configuration de votre menu, celle de vos profils sociaux pour au final générer le même balisage.

Avec `partialCached` vous pouvez dire à Hugo que ce bout de code ne bouge jamais et qu'il peut donc l'inspecter une seule fois, le mettre en cache et le réutiliser&#8239;:

```go-html-template
{{ partialCached "header.html" . }}
```

C'est 999 fois où Hugo n'aura pas à interpréter le code de votre fichier partiel. En fonction de la complexité de votre menu de navigation, **vous venez de potentiellement gagner pas mal de précieuses millisecondes** ⏱️!

Mais notre entête de page est-il vraiment identique sur toutes les pages ?

Non, car il est fort probable que les liens du menu principal soient soulignés ou mise en forme pour indiquer aux visiteurs où ils se trouvent actuellement sur le site.

Le code de notre menu Hugo contient souvent quelque chose comme :

```go-html-template
<nav>
{{ range .Site.Menus.main }}
  <a
    class="{{ if eq $currentPage.Section .Page.Section }} active {{ end }}"
    href="{{ .URL }}"
  >
    {{ .Name }}
  </a>
{{ end }}
</nav>
```

Le code ci-dessus parle quasiment de lui-même. Notre projet comporte un menu principal avec cinq entrées, chacune pointant vers une section du site. Pour rendre active l'entrée **Blog** du menu lorsqu'on se trouve sur une page de la section Blog, nous comparons la section de la page visitée (`$currentPage.Section`) avec celle de l'entrée de menu (`.Page.Section`).

Avec le `{{ partialCached "header.html" . }}` actuel, Hugo va maintenant évaluer une seule fois la condition de ce `if` et appliquer son résultat à toutes les pages suivantes générées,  et ce quelle que soit leur section.

Heureusement il y a les variantes de partiel.

## Les variantes de partiel

Nous savons que notre entête va seulement être modifié cinq fois, en fonction de la `.Section` de la page courante. Nous devons donc dire à Hugo de mettre en cache une différente variante du partiel en fonction de ce facteur.

Contrairement à la fonction `partial`, les arguments de `partialCached` ne se limitent pas au contexte.

Pour nos cas d'utilisation, il est clair que la variante est la  `.Section` de la page courante, nous pouvons donc écrire ceci :

```go-html-template
{{ partialCached "navigation.html" . .Section }}
```

🎉 C'est 995 fois où Hugo n'aura pas à interpréter le code de ce partiel.

Bien. Cela fait une variante en moins, mais quid si quelque chose d'autre doit changer et que ce n'est pas lié à la section ?

Par exemple [sur mon site](https://regisphilibert.com/contact/), les liens sociaux sont bien en vue sur la page de contact, du coup sur cette page ils ne sont pas affichés "en double" dans l'entête.

Le code ressemble à ça :

```go-html-template
{{ if ne .Layout "contact" }}
  {{ range site.Socials }}
    {{/* vous voyez l'idée */}}
  {{ end }}
{{ end }}
```

Nous avons donc maintenant besoin de deux variantes, la variante `.Section` et la variante `Est-ce la page de contact ?`.

Heureusement pour nous, le nombre de variantes n'est pas limité, alors allons-y gaiement :

```go-html-template
{{ partialCached "navigation.html" . .Section "contact" }}
```

OK, c'était simplement à des fins de clarté et de lisibilité mais soyons réaliste, vous aurez vraisemblablement besoin de quelque chose de plus "dynamique" :

```go-html-template
{{ $layout := cond (eq .Layout "contact") "contact" "other" }}
{{ partialCached "navigation.html" . .Section $layout }}
```

🎉 C'est maintenant 994 fois où Hugo n'aura pas à interpréter le code de ce partiel.

## Haussons le niveau d'un cran 💪

Plongeons-nous maintenant dans quelque chose d'un peu plus complexe.

Notre blog possède un emplacement pour afficher les auteurs d'un article. Il y a trois auteurs pour le site, cet emplacement pourra donc en lister un seul, ou alors une combinaison d'entre eux en fonction de la liste d'auteurs présente dans le front matter de l'article. On peut dire avec certitude que sur nos mille articles, beaucoup partageront la même liste d'auteurs.

Ici, la variante idéale serait donc de passer notre liste d'auteurs dans un ordre défini, et nous serions tentés de pouvoir écrire :

```go-html-template
{{ partialCached "authors-box.html" . .Params.authors }}
```

Malheureusement à l'heure actuelle, les variantes passées en argument de la fonction `partialCached` doivent être **des chaînes de caractères** 🤷.

Pour respecter ce prérequis, nous devons transformer cette liste en chaîne de caractères avant de la passer en option, et la manière la plus sûre de le faire, comme souvent, c'est d'utiliser la fonction [`printf`](https://gohugo.io/functions/printf/#readout) avec le bon [verbe](https://golang.org/pkg/fmt/#hdr-Printing).

Personnellement j'aime bien `%x`, car il va générer la représentation d'une valeur en chaîne hexadécimale, quelque que soit le type de structure.

Admettons que nous ayons :

```yaml
authors:
  - Bud Parr
  - Frank Taillandier
  - Régis Philibert
```

```go-html-template
{{ $variant := printf "%x" .Params.authors }}
```

🖨️👇
`[42756420506172724672616e6b205461696c6c616e6469657252c3a9676973205068696c6962657274]`

Nous avons maintenant une chaîne de caractères que nous pouvons passer comme variante du partiel :

```go-html-template
{{ with .Params.authors }}
	{{ $authors := sort . }}
	{{ $variant := printf "%x" $authors }}
	{{ partialCached "authors-box.html" . $variant }}
{{ end }}
```

Grâce à cela, nous sommes maintenant assurés qu'Hugo ne génèrera qu'une seule variante par combinaison d'auteurs, soit 7 au maximum.

{{< notice info >}}
 ### Pourquoi ordonner les auteurs ?
 En les classant par ordre alphabétique, nous nous assurons de ne pas créer des variantes inutiles, et ce que quel que soit l'ordre dans lequel les auteurs ont été listés dans le front matter.
{{< /notice >}}

{{< notice tip >}}
Cette solution pour utiliser les variantes marche pour les listes et les tableaux associatifs simples. Effectuez des tests si vous l'utiliser pour des structures de données imbriquées plus complexes.
{{< /notice >}}

## Et les langues ? 🇫🇷🇬🇧

Dans un contexte multilingue, si nous repensons à notre partiel pour l'entête de page, il se pourrait que nous y trouvions aussi un sélecteur de langue et que nous soyons tentés d'ajouter une autre variante :

```go-html-template
{{ partialCached "navigation.html" . .Section .Lang }}
```

Mais ce n'est pas la peine de le faire, car par défaut Hugo va générer autant de caches de partiels que de langues déclarées.
Dans notre cas de figure, Hugo va donc calculer le balisage de notre entête dix fois.

{{< notice title="🧮" >}}
La règle d'or pour connaître le "calcul" du nombre de partiels est :

`partiel x variantes x langues`
{{< /notice >}}

## Améliorer votre temps de génération ⏱️

Pour les sites que vous avez développé vous-même, il est relativement facile d'aller inspecter votre dossier `partials` et d'identifier ceux qui pourraient être mis en cache. Mais pour les projets dont vous avez hérité ou que vous avez développé il y a moment, il existe deux options que vous pouvez passer à la ligne de commande: `hugo --templateMetrics --templateMetricsHints`.

La première option même utilisée seule est déjà très utile puisqu'elle vous affiche le détail des durées de génération. Cependant tout ne peut pas être mis en cache, seulement les fichiers partiels.

Ces options vous aideront à identifier les principaux goulots d'étranglement, cependant vous devriez tout le temps garder ces trois points en tête:

1. Le niveau de complexité de votre fichier partiel et sa durée de génération ajoutée au temps total.
2. La comparaison entre le nombre de fois où un partiel sera traité et son potentiel de variantes.
3. L'adaptation de votre code de façon à ce qu'il puisse être mis en cache (identifier tôt les variantes vous dispensera de pas mal de refactorasition)

## Conclusion

Lorsque vous créez ou maintenez un projet Hugo, vous devez toujours garder en tête que chaque ligne de code peut réduire potentiellement le temps de génération. Laissez Hugo faire le gros du travail seulement quelques fois et non systématiquement!

Allez donc jeter un œil à vos fichiers partiels, créez vos propres variantes, et économisez du temps et de l'argent en vous reposant autant que possible sur `partialCached`!
