---
title: "Entretenir de bonnes relations avec Hugo"
date: 2018-04-04T22:25:16+02:00
lastmod:
draft: false
description: "Définissez des relations entre vos différents types de contenus dans Hugo de façon performante."
categories:
  - hugo
source:
  author: "Régis Philibert"
  title: "Better Relationships in Hugo with Hugo's Related Content"
  url: "https://regisphilibert.com/blog/2018/04/hugo-optmized-relashionships-with-related-content/"
---

{{% intro %}}
Même s'il est le plus rapide des générateurs de site statiques, Hugo continue de s'améliorer et de proposer de nouvelles fonctionnalités pour nous simplifier la vie. [Régis Philibert](https://regisphilibert.com/) a testé pour vous la gestion des contenus relatifs apparus dans la version `0.27`.
{{% /intro %}}

Je me suis enfin décidé à améliorer la façon dont je gère les relations entre les contenus dans mes projets en utilisant la fonctionnalité dédiée aux contenus relatifs proposée par Hugo.[^1]

__En faisant cela, j'ai diminué le temps de génération du site d'environ 70%__ ⏱️ 👀!

[^1]: Merci à [@budparr](https://twitter.com/budparr) pour m'avoir initialement suggéré de regarder du côté de cette fonctionnalité pour la gestion des relations entre contenus dans Hugo.

Dans cet article, nous allons voir comme l'implémentation de relations entre vos contenus est facile à ajouter sur un projet existant et comment cela va changer à jamais la façon dont nous définissons les relations dans Hugo !

<!--more-->

## Le Projet

J'ai crée et commencé à maintenir un site web open source en français sur la saga des [Rougon-Macquart](http://rougon-macquart.com) d'[Émile Zola](https://fr.wikipedia.org/wiki/%C3%89mile_Zola) bien avant que je commence à coder.

Copier-coller la biographie de tous mes personnages dans WordPress m'a pris pas mal de temps, mais je me retrouve maintenant avec le projet idéal pour tester de nouveaux outils : l'API Rest de WordPress, AngularJS et plus récemment Hugo !

Avec un millier d'entrées qui partagent des relations saines, c'est le projet parfait pour tester une nouvelle manière de gérer nos relations.

- Chacun des quelques 1300 personnages apparaît dans quelques romans. La liste des romans où il apparaît est affichée sur la page de chaque personnage.
- Dans chacun des 20 romans apparaissent de nombreux personnages. Sur la page de chaque roman figure tous les personnages qui y apparaissent.

## Statut des relations avant _Related Content_: c'est compliqué

Il n'y avait pas de méthode claire pour connecter des pages entre elles et créer des relations durables et efficaces. La première chose qui venait souvent à l'esprit était d'utiliser les taxonomies, mais ça ne marchait pas lorsqu'il s'agissait de connecter des pages entres elles.

Une fois les taxonomies écartées, si vous deviez gérer des relations [de plusieurs à un](https://fr.wikipedia.org/wiki/Relation_de_plusieurs_%C3%A0_un), vous avez peut-être utilisé les `sections` avec la plus grande prudence.

Mais quand il s'agit d'implémenter la plus commune des [relations de plusieurs à plusieurs](https://en.wikipedia.org/wiki/Many-to-many_(data_model)), je trouve que la solution la plus sensée est de créer une relation via une entrée Front Matter dans les pages concernées. Pour les Rougon-Macquart de Zola, c'était indéniablement le cas.

### L'implementation dans le Front Matter

Dans ce projet, les romans peuvent compter jusqu'à 90 personnages. Ce qui signifie qui si nous devions lister tous les personnages présents dans un roman, nous nous retrouverions avec un tableau de 90 entrées en entête de notre fichier Markdown. C'est vraiment loin d'être idéal.

De plus nous n'avons pas vraiment besoin de référencer la connexion de notre relation à la fois dans les pages de romans *et* dans les pages des personnages. Les personnages ne sont présents que dans 4 à 5 romans tout au plus, il vaut donc mieux déclarer les __quelques__ romans dans lesquels ils apparaissent plutôt que de lister les __nombreux__ personnages pour chaque roman.

Par exemple pour le personnage d'_Eugène Rougon_, qui figure dans 4 romans, cela donne :

```yaml
title: Rougon (Eugène)
novel:
  - argent
  - curee
  - fortune
  - excellence
```

Maintenant dans le Front Matter du roman, nous avons juste à ajouter une clef d'identifiant.
Pour le roman « Son Excellence Eugène Rougon » dans lequel apparaît ce bon vieil Eugène nous ajoutons :

```yaml
title: Son excellence Eugène Rougon
id: excellence
```

{{< notice >}}
Nous pourrions choisir un identifiant existant comme le nom de fichier, mais je préfère un identifiant unique, facile à lire et à écrire.
{{</ notice >}}

#### Les relations dans nos gabarits de page

Sur [la page d'Eugène](http://rougon-macquart.com/personnage/2010-03-15-rougon-eugene/) nous voulons afficher les romans dans lesquels il apparaît. Nous pouvons utiliser `intersect` pour construire notre liste :

```go
{{ $characters := where .Site.Pages.ByTitle ".Params.novel" "intersect" (slice .Params.id)}}
```

Pour afficher la liste des personnages du roman sur la page [Son Excellence Eugène Rougon](http://rougon-macquart.com/roman/1876-son-excellence-eugene-rougon/), nous utilisons l'opérateur `in` avec `where`:

```go
{{ $novels := where .Site.Pages.ByTitle ".Params.id" "in" .Params.novel }}
```

Et voilà, nous avons réussi à implémenter une relation de type plusieurs à plusieurs comme si nous étions en 2016 !

Car cela a le mérite de fonctionner mais…

2. `interesect` ? `where "in"` ? N'en faisons-nous pas un peu trop ?
3. 🐌 Le temps de génération est __7 fois__ supérieur à la moyenne : ~7 secondes pour 1300 pages.
1. 💩 C'est moche.

OK… mais que pouvons-nous y faire ? 🤷‍♂️

Rien…  enfin jusqu'à la version 0.27 d'Hugo.

## La fonctionnalité _Related Content_ d'Hugo

[Les contenus relatifs natifs](https://gohugo.io/content-management/related/) ont fait leur apparition dans Hugo 0.27 en Novembre 2017.

Ils ont été conçus pour aider à ajouter facilement une section __« Vous aimerez aussi : »__ dans les thèmes et les projets tout en gardant un maximum de contrôle sur l'algorithme de pondération.
Vous pouvez définir plusieurs facteurs ou index en leur affectant leur propre niveau d'importance. Les tags, le mois de publication, les auteurs, tout ce qui peut vous aider à construire une liste de contenus relatifs pertinente.

C'est de loin de meilleur outil pour récupérer des pages relatives à une autre à l'aide de votre *propre* formule et si vous ne l'utilisez pas déjà pour générer votre widget "Articles/Produits liés", vous devriez aller de ce pas consulter [la documentation](https://gohugo.io/content-management/related/) pour commencer à jouer avec. C'est top !

Néanmoins dans notre cas, nous n'avons pas besoin d'un module "romans relatifs", nous avons juste besoin d'établir une relation solide et consistante qui n’impacte pas le temps de génération du site. Et il se trouve que c'est justement ce que propose la fonctionnalité _Related Content_ !

Nous n'avons même pas besoin de recourir à l'ingénieux facteur de poids d'index puisque `novel` est notre seul et unique index.

### Établir des relations avec _Related Content_

#### Déclarer notre index

En premier nous devons déclarer la liste de nos index dans notre fichier de configuration `config.yaml`. Vu qu'ici nous n' avons que `novel` comme index…

```yaml
related:
 indices:
   - name: novel # Le nom de l'index, tel qu'il est défini la clef `.Param` du Front Matter.
     weight: 1 # Nous n'avons pas vraiment besoin, mais si nous l'omettons cela désactivera notre index.
     includeNewer: true # Ici notre relation est sans fin ! Cette option empêche Hugo d'ignorer les nouveaux articles.
```

#### Bien se connecter

L'entête Front Matter de notre personnage est très bien comme elle est. Elle liste déjà les romans à l'aide d'une clef qui correspond au nom de notre index `novel`.

Par contre, nos romans utilisent `id` pour s'identifier, il faut changer ça car ils doivent également utiliser le même nom d'index. Donc l'entête Front Matter de notre roman devient :

```yaml
title: Son Excellence Eugène Rougon
novel: excellence # 'id' précédemment
```

Bien, nos romans et nos personnages partagent maintenant un `.Page.Param` commun qui utilise le nom de notre index nouvellement déclaré : `novel`.

#### _Related Content_ dans les gabarits de page

Dans nos gabarits de page, _Related_ offre différentes fonctions pour récupérer les pages relatives. Nous allons en voir deux succinctement, mais allez lire [la documentation](https://gohugo.io/content-management/related/#list-related-content) si vous souhaitez en apprendre davantage.

__.Related__ _permet de récupérer toutes les pages relatives d'une page donnée en fonction des index et du poids déclarés dans le fichier de configuration. Elle prend un seule paramètre en argument : la page donnée._

__.RelatedIndices__ _permet de récupérer toutes les pages qui comportent un ou plusieurs index donnés. Le premier paramètre est la page donnée, les autres paramètres sont les index utilisés._

Dans nos gabarits de page de détail, nous allons utiliser la fonction `.RelatedIndices` pour récuperer les romans ou les personnages reliés. Ceci afin de limiter les pages reliées à notre index `novel` et empêcher que de futures index comme des tags ou un auteur viennent interférer dans notre relation existante.

Dans le gabarit de page de détail d'un roman comme "Son Excellence Eugène Rougon", nous pouvons lister tous ses « characters », en anglais dans le texte, de la façon suivante :

```go
{{ $characters := where (.Site.RegularPages.RelatedIndices . "novel" ) "Type" "personnage" }}
```

_Le premier paramètre c'est le contexte de notre page, le second c'est notre fameux index._

Et pour la page de présentation d'un personnage comme Eugène, pour récupérer toutes ses « novels » :

```go
{{ $novels := where (.Site.RegularPages.RelatedIndices . "novel" ) "Type" "roman" }}
```

Et voilà ! Nous utilisons maintenant la fonction _Related Content_ d'Hugo pour gérer nos relations de type plusieurs à plusieurs !

Et qu'avons nous gagné outre un code plus propre ?

🚀 __6 secondes de moins !__  …sur les ~7s auparavant…

Le temps de génération n'excède maintenant pas les 1.5s. Dans le mille Émile !

{{% notice %}}
Si vous êtes curieux, vous pouvez cloner le [repo](https://github.com/regisphilibert/rougon) et vous en donner à cœur joie avec la commande `hugo --templateMetrics`. Vous pouvez même passer sur la branche [`oldRelationship`](https://github.com/regisphilibert/rougon/tree/oldRelationships) et comparer avec l'implémentation précédente des relations.
{{%/ notice %}}

## Conclusion

En ayant simplement recours à la fonction _Related Content_ native dans Hugo plutôt qu'à un horrible patch fait maison, __nous avons réduit le temps de génération de plus de 70%__ et tout ça avec un __minimum de changement dans notre code__.

Il y a un énorme avantage à tirer profit des super pouvoirs des nouvelles fonctionnalités natives d'Hugo et ce modeste article a tenté de vous montrer à quel point il est simple de commencer à utiliser et à implémenter l'une d'entre elles dans vos projets existants.
