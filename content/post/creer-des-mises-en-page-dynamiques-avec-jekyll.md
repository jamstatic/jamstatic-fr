---
title: Créer des mises en page dynamiques avec Jekyll
description: Les secrets de fabrication du portfolio client d’une agence à l’aide
  des possibilités offertes par Jekyll
date: 2017-02-10
source:
  author: Zander Martineau
  title: Creating dynamic layouts with Jekyll
  url: https://medium.com/tmw-interactive/creating-dynamic-layouts-with-jekyll-3bbb7fc57d1f#.iac16fjec
  lang: en
images:
  - http://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523346708/canon-unleashprint-full.jpg
categories:
  - jekyll
---

{{% intro %}}

Dans [son article publié sur Medium](https://medium.com/tmw-interactive/creating-dynamic-layouts-with-jekyll-3bbb7fc57d1f#.iac16fjec),
Zander Martineau partage les secrets de fabrication du portfolio client de son
agence. Zander a dû faire preuve d’ingéniosité et de créativité afin de pouvoir
varier les mises en pages des différentes études de cas à l’aide de Jekyll.

{{% /intro %}}

> Voici comment nous avons tiré profit du YAML front matter pour pouvoir
> effectuer de nombreux changements au sein d’un même modèle pour différents
> articles sur le nouveau site de notre agence.

{{< figure src="http://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523346708/canon-unleashprint-full.jpg"
attr="Extrait de la campagne Canon #unleashprint"
attrlink="http://www.tmwunlimited.com/work/canon-unleashprint" >}}

Les sites web créés avec [Jekyll](http://jekyllrb.com/) sont généralement
simples et leurs mises en page prévisible. J'aimerais vous montrer comme j’ai
créé une mise en page pseudo-dynamique pour des études de cas sur
[le nouveau site de TMW](http://www.tmwunlimited.com), en utilisant du YAML
front matter et un peu de magie[^1]…

Chez TMW, nous travaillons sur des projets de toutes sortes et de toutes
tailles. Des modèles de page classiques ne suffiraient pas, car nous faisons un
travail extrêment varié et les mises en page doivent refléter cela. Nous avons
décidé, au tout début de la refonte de notre site, que chaque étude de cas
devrait changer en fonction du projet et des types de contenu spécifiques. Cela
constituait un défi intéressant à relever car Jekyll n'offre pas cette
fonctionnalité nativement, j'ai dû donc faire preuve d’un peu d’imagination…

## Du YAML front matter, une boucle `for` et pas mal de modules

Après quelques itérations, je me suis arrêté à une solution robuste et peu
orthodoxe, qui faisait appel à des variables définies dans le YAML front matter
(puis utilisées dans le Markdown de chaque étude de cas), une simple boucle for
(dans le modèle de page des études de cas) et à beaucoup de modules pour chaque
section.

### Le YAML front matter

Nous avons ajouté un tableau YAML `partials` dans les entêtes YAML front matter
de chaque étude de cas (comme vous pouvez le voir dans le code inséré
ci-dessous). Chaque élément du tableau possède une propriété `name` qui
correspond au `name` du partial/module qui sera utilisé.

{{< gist mrmartineau ee7cd73fcfdef19b45afd01c4d6b3b9f >}}

<figcaption>Extrait de <a href="http://www.tmwunlimited.com/work/canon-unleashprint/">l’étude de cas Canon. Unleashing Print.</a>
</figcaption>

### La boucle `for`

La boucle en question a été ajoutée dans le modèle `work` du dossier `_layouts`.
Ça a l’air un peu timbré — et ça l’est — mais s'il vous plaît, restez avec moi.
La façon intrinsèque dont Jekyll compile les fichiers fait que j'ai du listé
toutes les propriétés possibles pour chaque module utilisé dans le YAML.

La boucle parcourt le tableau `partials` et utilise la propriété `name` pour
inclure un module _différent_, comme ceci: `include {{item.name}}.html`. Ceux-ci
ont ensuite été transmis au module inclus en utilisant les paramètres suivants
de la balise `include`. Même si la propriété n'était pas nécessaire dans ce
module, elle devait néanmoins être transmise.

Très vite, j'ai compris que les propriétés du tableau `partials` devaient
partager les mêmes propriétés pour que ma boucle _for_ ne parte pas en sucette.

{{< gist mrmartineau e0ad7ae56552c9571e285e30e3469476 >}}

<figcaption>
  <a href="https://gist.github.com/mrmartineau/e0ad7ae56552c9571e285e30e3469476" data-href="https://gist.github.com/mrmartineau/e0ad7ae56552c9571e285e30e3469476" rel="nofollow noopener" target="_blank">https://gist.github.com/mrmartineau/e0ad7ae56552c9571e285e30e3469476</a>
</figcaption>

### Les modules

Créer des modules pour cette page n'avait vraiment rien d’ordinaire, comme vous
pouvez le voir dans celui montré un peu plus bas. Vous pouvez voir que certaines
des valeurs sont optionnelles (comme `{% if include.spaced %}`), ce qui veut
dire que j'ai poussé la personnalisation encore plus loin en ajoutant ou en
retirant des classes et du contenu pour donner à la page un caractère encore
plus singulier. Avec par exemple l’ajout optionnel d’images dans le module
`section-image` à une colonne égale à la largeur de l’élément `.l-container` ou
à une version un peu plus large via l’utilisation de la classe
`.l-container--wide`. Cette technique a été utilisé avec le plus bel effet sur
[l’étude de case de Lynx Bigger Issues](http://www.tmwunlimited.com/work/unilever-lynx-bigger-issues/).

{{< gist mrmartineau 8919159d58818c8530d516d118c3b838 >}}

### Les palettes de couleur

Une autre caractéristique des études de cas, était qu'ils avaient chacun leur
propre palette chromatique. Elle est génèralement influencée par les visuels ou
la marque dans ce cas particulier et défini encore une fois dans des entêtes
YAML front matter.

Les couleurs primaires, secondaires ainsi que celles du texte sont définies
dans du YAML et ajoutées ensuite dans un petit bloc `<style>` embarqué dans la
page et qui modifie certains aspects de la présentation de la page.

{{< gist mrmartineau 01bde36c11a6b799112148a8dc83cc16 >}}

Grâce à tout cela, nous avons pu ajouter pas mal de personnalisation à notre
nouveau site web, ci-dessous une sélection d’études de cas :

{{< figure src="https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523346747/canon-unleashprint-fullpage.jpg" >}}

{{< figure src="https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523346723/dogs-trust-fullpage.jpg"
attr="http://www.tmwunlimited.com/work/"
attrlink="http://www.tmwunlimited.com/work/" >}}

{{< figure src="https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523346706/lynx-fullpage.jpg" >}}

{{< figure src="https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523346792/lynx-calm-fullpage.jpg" >}}

### 👋

Comme vous pouvez le voir, on peut faire des trucs incroyables avec Jekyll. Si
vous avez des retours ou des commentaires à faire, n'hésitez pas.

[^1]: Réalisé sans trucages
