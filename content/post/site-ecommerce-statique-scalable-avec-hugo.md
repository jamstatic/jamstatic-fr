---
title: "Un site e-commerce statique et extensible avec Hugo"
description: "Les générateurs de site statique sont-ils une solution viable pour les sites de vente en ligne qui encaissent de fortes charges de trafic ?"
date: 2017-12-13T13:10:36+01:00
categories:
  - hugo
images:
  - https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523346937/cart.jpg
source:
  author: "Chris Marshall"
  title: "Scalable Static Ecommerce with Hugo"
  url: "https://medium.com/@GYMarshy/scalable-static-ecommerce-with-hugo-fa1382781f4c"
  lang: "en"
aliases:
  - /2017/12/13/site-ecommerce-scalable-avec-hugo/
---

> Les générateurs de site statique sont-ils une solution viable pour les sites
> de vente en ligne qui encaissent de fortes charges de trafic ?

{{< figure src="https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523346937/cart.jpg"
alt="" >}}

Les générateurs de site statique (GSS) attirent l’attention depuis quelques
années déjà. Pour quelqu'un comme moi qui a commencé par développer des sites à
la fin des années 90, l’idée de retourner à du pur, du vrai développement web
n'est pas dénuée de charme (en prenant bien soin de tirer un trait sur les
frames, les images au survol, les tableaux de mise en page et les inclusions
côté serveur, hein !)

Mais la nostalgie ne saurait expliquer l’intérêt suscité. Les générateurs de
site statique représentent une alternative bien plus simple aux CMS liés à des
bases de données comme WordPress et Drupal, pour des sites Web modestes où le
contenu est roi. Mais cela marche aussi pour des sites plus importants —
[https://www.smashingmagazine.com/](https://www.smashingmagazine.com/) est un
des sites importants les plus en vue à être passé au statique.

## Avantages

Les avantages des sites statiques sont clairement documentés, et s'il fallait
résumer :

* **Performance** : pas d’application, pas de base de données, tout le HTML est
  pré-rendu. Le temps pour télécharger le premier byte (TTFB) est réduit au
  minimum  —  les sites statiques sont en réalité un bon gros cache, stocké au
  chaud sur un <abbr title="Content Delivery Network">CDN</abbr>.
* **Montée en charge** : par conséquence, la charge du serveur est très réduite,
  la possibilité de servir le site entier depuis un CDN implique que les pics de
  trafic peuvent être aisément absorbés. Moins de temps de consommation CPU, pas
  de ralentissement dus aux bases de données, une infrastructure simplifiée et
  bien moins onéreuse.
* **Sécurité** : Tout est dans le code source des pages HTML.

Ce sont de très bonnes raisons d’utiliser un
<abbr title="Générateur de Site Statique">GSS</abbr> pour des sites de contenu.
Mais pour quelqu'un qui travaille exclusivement dans le
[e-commerce](http://www.onstate.co.uk/) depuis 10 ans — cela semble être de
_formidables_ raisons d’utiliser un générateur de site statique pour une
boutique en ligne.

Vous trouverez plein de tutoriels et de guides qui montrent comment mettre en
place un site ecommerce basique à l’aide de générateurs de site statique — avec
des produits simples, en quantité limitée. L'avis général est toutefois que les
GSS ne sont pas adaptés pour des boutiques en ligne dynamiques, plus importantes
et plus complexes. Est-ce vraiment le cas ? En y réfléchissant, je me suis
demandé comment développer une architecture ecommerce statique extensible (ou
SSEA pour Scalable Static Ecommerce Architecture en anglais).

## Prise de conscience

Maintenant, toutes les boutiques n'ont pas les mêmes contraintes. Je ne suggère
pas une seule seconde qu'Amazon doive considérer de passer au statique. Ni
aucune boutique importante avec un catalogue de dizaines de milliers de
produits.

Mais la plupart des boutiques sont loin d’être aussi importantes. Nous
travaillons avec bon nombre de marques à la mode très connues. Elles proposent
généralement quelques centaines de produits — voire 1000 ou 2000 grand maximum.
En faisant quelques recherches, je me suis aperçu que c'était aussi le cas pour
d’autres marques, qui ne figurent pas dans notre portfolio — attention, je parle
bien ici de produits, une fois les différentes déclinaisons de taille, de
couleur prises en compte, un millier de produits peut représenter disons environ
5000 unités de stock.

Et vous savez quoi ? Ces sites ne sont pas si dynamiques que ça. Les nouveaux
produits apparaissent en général lors des nouvelles collections. Les catégories
ne bougent plus beaucoup. En fait la seule fois où une page produit a besoin
d’être mise à jour c'est quand un produit n'est plus en stock ou que son prix
est modifié — et ça n'arrive pas en permanence.

Si un produit simple vient à manquer (un produit sans déclinaison de taille ou
de couleur), le bouton _ajouter au panier_ doit être désactivé — on peut aussi
éventuellement vouloir le supprimer de la vue de liste des produits. Pour un
produit configurable qui serait épuisé il faudrait désactiver la possibilité de
sélectionner les différentes options (de taille, couleur ou autre) dans la page.

## Les fonctionnalités dynamiques

Et qu'en est-il des fonctionnalités dynamiques comme les recommandations et la
recherche ? Étonnamment dans une majorité des cas — même sur des solutions
populaires auprès des entreprises comme Magento — ces fonctionnalités sont
assurées par des technologies tierces. Nosto peut assurer
[les recommandations personnalisées de produits](http://www.nosto.com/fr/fonctionnalites/recommandations-produits-personnalisees/).
Algolia peut proposer une excellente
[expérience de recherche pour le Ecommerce](https://www.algolia.com/ecommerce).
Les plateformes d’optimisation comme [Optimizely](https://www.optimizely.com/)
fonctionnent sur le même principe, les sites statiques peuvent aisément intégrer
toutes ces technologies.

## Le panier d’achat

Les fonctionnalités de gestion du panier d’achat peuvent être également
intégrées de la sorte. Les plates-formes _headless_ comme
[moltin](https://moltin.com/) ou les paniers gérés en JS comme
[Snipcart](https://snipcart.com/) vont vous permettre de fournir toutes les
fonctionnalités nécessaires à une expérience d’achat complète avec gestion des
promotions, des commandes, des paiements, de la livraison, des comptes clients,
etc. Et ne croyez pas que vous y perdrez en flexibilité au passage. Ces systèmes
sont entièrement capables, extensibles et peuvent se connecter à des solutions
tierces d’<abbr title="Enterprise resource planning">ERP</abbr>, de
<abbr title="Warehouse Management System ">WMS</abbr> ou
d’<abbr title="Order Management System">OMS</abbr> — tout comme les
plates-formes "Entreprise" qui coûtent des milliers d’euros par mois et qui
demandent des centaines de milliers d’euros à mettre en place.

## En résumé

Nous disposons donc de toutes les fonctionnalités nécessaires pour un site
transactionnel. Comment faire pour l’assembler et faire en sorte qu'il soit
toujours à jour ? Comment répercutons-nous les changements de stock décrits
précédemment ?

Pour y parvenir, notre architecture extensible ecommerce statique doit répondre
à plusieurs critères :

* **Vitesse** : elle doit être capable de générer le site rapidement. Même si
  les changements de fichiers ne sont pas si fréquents, lorsqu'ils se
  produisent, les changements doivent être répercutés sur le site de production
  aussi vite que possible pour éviter de frustrer le client.
* **Données** : le modèle de données doit être suffisamment flexible pour
  pouvoir gérer les informations liées aux produits : description, niveau de
  stock, prix, mais aussi pages de contenu, articles de blog et systèmes de
  navigation.

## Hugo

Lorsqu'il est question de vitesse de génération de site, on pense forcément à
[Hugo](https://gohugo.io/). J'ai lu pas mal de choses à son sujet et j'ai voulu
le mettre à l’épreuve. Combien de temps cela prendrait-il pour générer toutes
les pages produits d’un site ? Pour le mesurer, j'ai repris des exemples de
données de produits issues du site d’un de nos clients. Ce site propose des
[pages de produits très riches en contenu](https://www.crockettandjones.com/charlton-black-calf/),
avec des blocs de contenu inclus dynamiquement dans la page en fonction des
attributs du produit. Cela est possible grâce à une pseudo-intégration entre
Magento et WordPress, mais il s'avère que c'est extrêmement simple à réaliser à
l’aide du langage de gabarit de page d’Hugo.

Afficher les informations d’un produit se fait très simplement :

```html
<p>
   Ajustement : <strong>{{ .Params.fitting }}</strong> </br>
   Finition : <strong>{{ .Params.last }}</strong> </br>
   Taille (UK) : <strong>{{ .Params.uksize }}</strong> </br>
   Semelle : <strong>{{ .Params.sole }}</strong>
</p>
```

Ajouter la logique dans les blocs inclus dynamiquement demande un peu plus
d’effort, mais même un piètre développeur comme moi peut y arriver sans peine :

```go-html-template
{{ $f1path := (print "shoefeatures/" $.Params.feature1 ".html") }}
{{ partial $f1path}}
{{ $f2path := (print "shoefeatures/" $.Params.feature2 ".html") }}
{{ partial $f2path}}
{{ $f3path := (print "shoefeatures/" $.Params.feature3 ".html") }}
{{ partial $f3path}}
{{ $f4path := (print "shoefeatures/" $.Params.feature4 ".html") }}
{{ partial $f4path}}
```

Tout ce que nous faisons ici, c'est générer les chemins vers les fichiers
partiels à inclure dans la page de manière (semi-)dynamique.

## Performance

Bon et maintenant en pratique, est-ce que ça va vite ? J'ai créé 1000 fiches
produit (en les dupliquant) — sous la forme de fichiers JSON qui contiennent
chacun le nom, le prix et les différentes données dans les variables
[`front matter`](https://gohugo.io/content-management/front-matter/). Ces
données sont ensuite insérées dans les gabarits de page et les fichiers
d’inclusion, qui sont ensuite assemblés et transformés en pages HTML.

En plus des 1000 pages produit, Hugo a aussi généré une cinquantaine de pages de
listes (à raison de 20 produits par page), une page d’accueil et un plan de site
au format XML.

Quand je lance la commande `hugo` pour générer le site, la tâche prend moins
d’une seconde — en moyenne 720ms sur un MacBook Pro pour être précis :

```
Built site for language fr:
0 draft content
0 future content
0 expired content
1000 regular pages created
8 other pages created
0 non-page files copied
50 paginator pages created
0 tags created
0 categories created
total in 724 ms
```

Je trouve cela très impressionnant. Il y a tout de même quelques points à
prendre en compte :

* **La complexité** : bien que ces gabarits de page présentent quelques
  difficultés, le code HTML généré est encore très basique et ne saurait suffire
  à proposer une interface similaire à celle montrée en exemple. Cela dit j'ai
  par la suite augmenté la complexité du HTML petit à petit lors de mes tests et
  je n'ai pas remarqué d’impact significatif sur la performance suite à mes
  différents changements.
* **La gestion des assets** : contrairement à d’autres générateurs, Hugo ne
  s'occupe pas de compiler et d’optimiser les fichiers CSS et JS. Vous pouvez
  toujours décider de faire appel à des outils comme Gulp, Grunt ou équivalent
  pour cela. Ce n'est pas gênant en ce qui nous concerne, car les déploiements
  liés aux outils de développement n'ont pas lieu si souvent que ça, la plupart
  des mises à jour concernent les données, à savoir les contenus, l’inventaire
  ou les prix.

Malgré cela, les temps de génération restent tout à fait acceptables selon moi.
Même en doublant la taille du catalogue et en ajoutant le support de deux
langues supplémentaires, le tout serait généré en moins de 5 secondes.

## Les données

Maintenant que nous avons évacué la problématique de la performance, qu'en
est-il de celle des données ? Le modèle de données du produit ne pose pas de
problème, ni tout ce qui est type de contenu éditorial ou article de blog que
nous pourrions avoir envie d’ajouter : Hugo gère parfaitement tout cela. Hugo
intègre aussi par défaut la gestion de
[systèmes de navigation hiérarchiques](https://gohugo.io/content-management/menus/).

Et pour les données typiques d’un site d’ecommmerce comme le prix ou la mise à
jour des quantités en stock ? Il faudrait que nous puissions pousser ces
informations sur le site car elles impacteront potentiellement le code HTML des
pages.

Si on considère le scénario discuté précedemment : quand une taille n'est plus
disponible, nous devons l’indiquer sur la page produit. Le menu déroulant ou le
sélecteur doit être mis à jour. Dans la configuration classique d’un site de
ecommerce, cette information est souvent remontée par le logiciel ERP.

Idéalement, nous voudrions avoir à n'envoyer que les prix et les informations de
stock, nous n'avons pas besoin d’avoir toutes les données des produits à chaque
échange. Ça tombe bien, Hugo intègre nativement la gestion des fichiers de
données.

Ici mes produits sont des chaussures. Dans les données _front matter_ de chaque
produit, j'ai entré les détails relatifs aux différentes variantes de taille de
la façon suivante :

```json
"variants": [
      {
        "title": "6",
        "sku": "9000-6"
      },
      {
        "title": "7",
        "sku": "9000-7"
      },
      {
        "title": "8",
        "sku": "9000-8"
      },
      {
        "title": "9",
        "sku": "9000-9"
      }
    ]
```

La gestion des fichiers de données d’Hugo permet de stocker des données
additionnelles qui sont ensuite insérées lors de chaque génération du site. Dans
ce cas de figure, j'ai besoin de créer des fichiers pour les prix et des
fichiers pour l’inventaire. Ces fichiers peuvent être générés et exportés par un
logiciel ERP. J'ai créé un fichier d’inventaire très simple au format JSON qui
contient les niveaux de stock des différentes références produit :

```json
{
 "stock": {
    "9000-1": {
     "allocation": 3
    },
    "9000-2": {
     "allocation": 9
    },
    "9000-3": {
     "allocation": 3
    },
    "9000-4": {
     "allocation": 1
    },
    …
  }
}
```

J'ai 6000 enregistrements en tout, puisqu'il y a six tailles de disponibles pour
les 1000 produits, cela génère donc un fichier de taille non négligeable. Je
range ce fichier dans `data/inventory/gb.json` (dans Hugo les fichiers de
données sont censés être stockés dans le répertoire `data`).

Dans le gabarit de la page produit, je peux accéder à la valeur de la variable
`allocation` de cette manière :

```go-html-template
<ul>
    {{ range .Params.variants }}
        <li>{{ .sku }}, {{ (index $.Site.Data.inventory.gb.stock .sku).allocation  }}</li>
    {{ end }}
</ul>
```

Cela va permettre d’afficher le stock correspondant à une taille. Vous
procéderiez peut-être différemment pour l’affichage une fiche produit sur le
site, mais la construction d’une interface à partir de ces données se ferait de
manière très similaire.

Nous voilà donc avec 6000 données additionnelles à prendre en compte et à
afficher dans les gabarits de page. Cela devrait pas mal augmenter le temps de
génération non ? C’est effectivement le cas :

```sh
Built site for language fr:
0 draft content
0 future content
0 expired content
1000 regular pages created
8 other pages created
0 non-page files copied
50 paginator pages created
0 tags created
0 categories created
total in 826 ms
```

…mais ça reste acceptable, nous sommes toujours sous la seconde pour un site
comportant 1000 pages produit.

## Exemple d’architecture

Il semble donc que nous ayons à notre disposition tous les éléments nécessaires
pour bâtir une architecture ecommerce statique extensible. Une vue d’ensemble
simplifiée de notre système pourrait ressembler à ça :

{{< figure
src="https://cdn-images-1.medium.com/max/800/1*n0-iGP2oqbfhiHZOstrLgg.png" >}}

* **ERP** : chargé de l’enregistrement des commandes, de la gestion du stock et
  des prix. Ces données sont transmises à la plate-forme de Ecommerce et
  également à Hugo.

* **CMS** : Drupal ou si possible une solution _headless_ comme
  [Contentful](https://www.contentful.com/) ou
  [Directus](https://getdirectus.com/). Son rôle est de fournir une interface
  conviviale pour l’édition de contenus ainsi que pour l’enregistrement des
  données de produits enrichis, les contenus éditoriaux et le contenu statique.

* **Hugo** : éventuellement combiné à Gulp, Grunt ou équivalent pour la gestion
  des assets.

* **Plate-forme Ecommerce** : le workflow précis dépend des possibilités
  offertes par la plate-forme. Si elle permet de déclencher une génération des
  prix et du stock à chaque modification, l’ERP n'aurait sûrement même pas
  besoin de communiquer avec Hugo.

## Déploiement

Pour une efficacité maximale, seuls les fichiers modifiés auraient besoin d’être
déployés après un changement. La majorité des mises à jour de l’inventaire
n'impacteraient pas forcément le HTML — si le stock passe de 6 à 3, cela n'a
aucun impact sur la fiche produit, le produit est toujours disponible. Si le
stock passe à 0 ou de 0 à un chiffre positif, alors il faut déclencher un
changement. Et seuls les fichiers impactés doivent être déployés.

{{< figure
src="https://cdn-images-1.medium.com/max/800/1*7M-yRW33AfLA-ZUGMLVjRg.png" >}}

Les changements relatifs au prix ou à la description du produit doivent eux
toujours déclencher une génération, mais cela se produirait déjà moins souvent.

Pour les besoins de ma preuve de concept, j'ai testé si
[Netlify](https://www.netlify.com/) pouvait gérer cela. J'ai été ravi de
constater que c'est comme cela que Netlify gère les déploiements par défaut.

Afin de tester cela, j'ai mis à jour les niveaux de stock de quelques produits
et j'ai poussé le fichier modifié sur le dépôt Git. Netlify a déclenché une
génération avec Hugo comme prévu, en identifiant les fichiers modifiés et en ne
mettant à jour que ceux-ci. L'opération a pris une vingtaine de secondes en
tout.

```sh
Built site for language fr:
0 draft content
0 future content
0 expired content
1000 regular pages created
8 other pages created
0 non-page files copied
50 paginator pages created
0 tags created
0 categories created
total in 834 ms
9:10:18 PM: Build complete: exit code: 0
9:10:19 PM: Cleaning up docker container
9:10:19 PM: Starting to deploy site from 'public'
9:10:19 PM: Deploying to CDN
9:10:22 PM: Uploading 5 files
9:10:22 PM: Uploading file product/cadogan-tobacco-calf-16/index.html
9:10:22 PM: Uploading file product/cadogan-tobacco-calf-340/index.html
9:10:22 PM: Uploading file product/cadogan-tobacco-calf-1/index.html
9:10:22 PM: Uploading file product/cadogan-tobacco-calf-267/index.html
9:10:22 PM: Uploading file product/cadogan-tobacco-calf-102/index.html
9:10:23 PM: Starting post processing
9:10:28 PM: Finished uploading cache in 473.751738ms
9:10:28 PM: Post processing done
9:10:28 PM: Site is live
9:10:28 PM: Finished processing build request in 20.097144616s
```

## Questions en suspend

Nous approchons du but, cependant il reste encore des questions auxquelles nous
n'avons pas encore totalement répondu, par exemple :

### Workflow

Des services comme Netlify gère les déploiements de code via Git. Dans la
configuration proposée ici, cela implique un nouveau commit pour chaque mise à
jour d’inventaire, ce qui n'est peut-être pas forcément l’idéal. On pourrait
imaginer gérer des branches distinctes pour le code et les contenus et les
fusionner ensuite au besoin, mais ça pourrait vite devenir problématique.

### Mises à jour de l’inventaire en temps réel

Les inventaires sont en général remis complètement à jour pendant la nuit et des
deltas sont appliqués au cours de la journée pour refléter le mouvement des
stocks dans les entrepôts. Ici nous nous sommes penchés seulement sur le premier
cas de figure, je n'ai pas encore réfléchi à comment nous pourrions gérer le
second.

### Aperçu et préproduction

Cela pourrait s'avérer problématique si des développeurs, des contributeurs et
des processus automatisés mettent tous le code à jour.

## Pour aller plus loin

Voilà où j'en suis de mes expérimentations, mais tout cela me pousse à penser
que c'est tout à fait envisageable et que cette architecture présente des
avantages intéressants. Cela semble particulièrement adapté pour des boutiques
de marques de taille moyenne — avec une taille de catalogue produit raisonnable
et des fiches produits potentiellement complexes en termes de contenus.

En plus des aspects liés à la sécurité, à la performance et à la montée en
charge déjà cités, j'aimerais aussi ajouter :

* **Gestion de contenu** : Hugo est capable de gérer différents types de contenu
  contrairement aux plates-formes de Ecommerce qui ne brillent généralement pas
  dans ce domaine. À une époque où les vendeurs et les marques doivent mettre de
  plus en plus du contenu intégré en avant, c'est un vrai plus.

* **Flexibilité** : les modèles de données dans Hugo sont très flexibles et
  [le langage de gabarits de pages](https://gohugo.io/templates/) suffisamment
  puissants pour gérer les différents scénarios possibles — je n'ai fait
  qu'effleurer ce qu'il est possible de faire dans cet article.

* **Simplicité** : les gérants de boutiques sont souvent tributaires des
  développeurs quant à la connaissance des arcanes des plates-formes de
  Ecommerce utilisées. Ce type de configuration est beaucoup plus accessible —
  vous avez surtout à vous familiariser avec la modélisation des données et
  comprendre les bases du langage de gabarits des pages.

Je continuerais d’explorer cette preuve de concept en fonction du temps que je
pourrais y consacrer, mais je serais d’ores et déjà très intéressé par des
retours de personnes qui auraient testé, considéré ou écarté l’approche décrite
ici.
