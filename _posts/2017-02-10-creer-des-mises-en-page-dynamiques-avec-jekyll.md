---
title: Créer des mises en page dynamiques avec Jekyll
date: 2017-02-10 22:33:24 +01:00
description: Les secrets de fabrication du portfolio client d'une agence à l'aide
  des possibilités offertes par Jekyll
image: https://cdn-images-1.medium.com/max/400/1*rS4n3wyRac82CtdSpi3Mpg.jpeg
source:
  url: https://medium.com/tmw-interactive/creating-dynamic-layouts-with-jekyll-3bbb7fc57d1f#.iac16fjec
  title: Creating dynamic layouts with Jekyll
  author: Zander Martineau
---

Dans son article publié sur Medium, Zander Martineau partage les secrets de
fabrication du portfolio client de son agence. Zander a du faire preuve
d'ingéniosité et de créativité afin de pouvoir varier les mises en pages des
différentes études de cas à l'aide de Jekyll.
{: .intro }

> Voici comment nous avons tiré profit du YAML front-matter pour pouvoir
> effectuer de nombreux changements au sein d'un même modèle pour différents
> articles sur le nouveau site de notre agence.

{% include_cached figure.html
url="https://cdn-images-1.medium.com/max/800/1*rS4n3wyRac82CtdSpi3Mpg.jpeg"
description="Extrait de la <a
href=\"http://www.tmwunlimited.com/work/canon-unleashprint/\">campagne Canon
#unleashprint</a>" %}

Les sites web crées avec [Jekyll](http://jekyllrb.com/) sont généralement
simples et leurs mises en page prévisible. J'aimerais vous montrer comme j'ai
crée une mise en page pseudo-dynamique pour des études de cas sur [le nouveau
site de TMW](http://www.tmwunlimited.com), en utilisant du YAML front-matter et
un peu de magie[^1]…

Chez TMW, nous travaillons sur des projets de toutes sortes et de toutes
tailles. Des modèles de page classiques ne suffiraient car nous faisons un
travail extrêment varié et les mises en page doivent refléter cela. Nous avons
décidé, au tout début de la refonte de notre site, que chaque étude de cas
devrait changer en fonction du projet et des types de contenu spécifiques. Cela
constituait un défi intéressant à relever car Jekyll n'offre pas cette
fonctionnalité nativement, j'ai du donc faire preuve d'un peu d'imagination…

## Du YAML front-matter, une boucle `for` et pas mal de modules

Après quelques itérations, je me suis arrêté à une solution robuste et peu
orthodoxe, qui faisait appel à des variables définies dans le YAML front-matter
(puis utilisées dans le Markdown de chaque étude de cas), une simple boucle for
(dans le modèle de page des études de cas) et à beaucoup de modules pour chaque
section.

### Le YAML front-matter

Nous avons ajouté un tableau YAML `partials` dans les entêtes YAML front-matter
de chaque étude de cas (comme vous pouvez le voir dans le code inséré
ci-dessous). Chaque élément du tableau possède une propriété `name` qui
correspond au `name` du partial/module qui sera utilisé.

{% gist ee7cd73fcfdef19b45afd01c4d6b3b9f %}

<figcaption markdown="1">

Extrait de [l'étude de cas Canon. Unleashing Print.](http://www.tmwunlimited.com/work/canon-unleashprint/)

</figcaption>

### La boucle `for`

La boucle en question a été ajoutée dans le modèle `work` du dossier `_layouts`.
Ça a l'air un peu timbré - et ça l'est - mais s'il vous plaît, restez avec moi.
La façon intrinsèque dont Jekyll compile les fichiers fait que j'ai du listé
toutes les propriétés possibles pour chaque module utilisé dans le YAML.

La boucle parcourt le tableau `partials` et utilise la propriété `name` pour
inclure un module _différent_, comme ceci: `include {{item.name}}.html`. Ceux-ci
ont ensuite été transmis au module inclus en utilisant les paramètres suivants
de la balise `include` . Même si la propriété n'était pas nécessaire dans ce
module, elle devait néanmoins être transmise.

{% gist e0ad7ae56552c9571e285e30e3469476 %}

<figcaption markdown="1">

[https://gist.github.com/mrmartineau/e0ad7ae56552c9571e285e30e3469476](https://gist.github.com/mrmartineau/e0ad7ae56552c9571e285e30e3469476)

</figcaption>

Très vite, j'ai compris que les propriétés du tableau `partials` devaient
partager les mêmes propriétés pour que ma boucle _for_ ne parte pas en sucette.

### Les modules

Créer des modules pour cette page n'avait vraiment rien d'ordinaire, comme vous
pouvez le voir dans celui montré un peu plus bas. Vous pouvez voir que certaines
des valeurs sont optionnelles
(comme `{% raw %}{% if include.spaced %}{% endraw %}`),
ce qui veut dire que j'ai poussé la personnalisation encore plus loin en
ajoutant ou en retirant des classes et du contenu pour donner à la page un
caractère encore plus singulier. Avec par exemple l'ajout optionnel d'images
dans le module `section-image` à une columne égale à la largeur de l'élément
`.l-container` ou à une version un peu plus large via l'utilisation de la classe
`.l-container--wide`. Cette technique a été utilisé avec le plus bel effet sur
[l'étude de case de Lynx Bigger
Issues](http://www.tmwunlimited.com/work/unilever-lynx-bigger-issues/).

{% gist 8919159d58818c8530d516d118c3b838 %}

### Les palettes de couleur

Une autre caractéristique des études de cas, était qu'ils avaient chacun leur
propre palette chromatique. Elle est génèralement influencée par les visuels ou
la marque dans ce cas particulier et défini encore une fois dans des entêtes
YAML front-matter.

Les couleurs primaires, secondaires ainsi que celles du textes sont définies
dans du YAML et ajoutées ensuite dans un petit bloc `<style>` embarqué dans la
page et qui modifie certains aspects de la présentation de la page.

{% gist 01bde36c11a6b799112148a8dc83cc16 %}

Grâce à tout cela, nous avons pu ajouter pas mal de personnalisation à notre
nouveau site web, ci-dessous une sélection d' études de cas :

{% include_cached figure.html
url="https://cdn-images-1.medium.com/max/800/1*UVZ-0lHLA702VVWUGAAmTA.png"
description="" %}

{% include_cached figure.html
url="https://cdn-images-1.medium.com/max/800/1*rmRNs1tb1D7vCOr_eRBO5Q.png"
description="<a href=\"http://www.tmwunlimited.com/work/\">http://www.tmwunlimited.com/work/</a>" %}

{% include_cached figure.html
url="https://cdn-images-1.medium.com/max/800/1*Q8RQduFxoRUMSJauZ0ED-Q.png"
description="" %}

{% include_cached figure.html
url="https://cdn-images-1.medium.com/max/800/1*M5f4_au8Xo05A8CyRRdmYQ.png"
description="" %}

### 👋

Comme vous pouvez le voir, on peut faire des trucs incroyables avec Jekyll. Si
vous avez des retours ou des commentaires à faire, n'hésitez pas.

[^1]: Aucun tour de magie n'a été utilisé.
