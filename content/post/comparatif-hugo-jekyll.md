---
title: "Hugo ou Jekyll ? Six points à prendre en compte"
date: 2018-04-06T20:10:03+02:00
title: "Hugo ou Jekyll ? Six critères de comparaison"
description: "Jekyll et Hugo sont les deux générateurs de site statiques les plus populaires. Quel est celui qu'il vous faut ?"
draft: false
categories:
  - hugo
  - jekyll
images:
  - https://res.cloudinary.com/forestry-demo/image/fetch/c_limit,dpr_auto,f_auto,q_80,w_auto/https://forestry.io/uploads/2018/02/hugo-jekyll-compared-1.png
source:
  author: "Chris Macrae"
  title: "Hugo or Jekyll? 6 Factors You Should Know"
  url: "https://forestry.io/blog/hugo-and-jekyll-compared/"
---

{{< figure src="https://res.cloudinary.com/forestry-demo/image/fetch/c_limit,dpr_auto,f_auto,q_80,w_auto/https://forestry.io/uploads/2018/02/hugo-jekyll-compared-1.png" caption="" attr="" attrlink="" >}}

Choisir les bons outils pour bâtir un site web n'est pas chose aisée de nos jours. Il y a tellement d'options ! Générer un site statique est une de ces options, qui comporte son lot d'avantages comme une sécurité de premier plan, une performance de feu et une réduction des coûts d'hébergement.

Quand il est question de générer des sites statiques, les deux solutions qui dominent actuellement le marché sont Jekyll et Hugo. La vraie question est de savoir quel est celui qui est le mieux pour vous ?

Pour répondre à cette question, nous allons examiner ensemble les fonctionnalités, la rapidité et l'extensibilité de chacun d'entre eux, peser les avantages et les inconvénients de ces deux générateurs. Après avoir lu cet article, vous saurez clairement lequel des deux est le bon pour démarrer votre projet.

*<strong>Version courte :</strong> Jekyll est un générateur de site statique flexible et parfait pour débuter. Hugo a une courbe d'apprentissage un peu plus élevée, mais il est très rapide et intègre plein de fonctionnalités. Lisez la suite pour en apprendre plus sur les différences entre ces deux outils.*

## Jekyll

Créé par Tom Preston-Werner, le fondateur de GitHub, Jekyll est à l'origine de la [mouvance des sites statiques](https://frank.taillandier.me/2016/03/08/les-gestionnaires-de-contenu-statique/) à laquelle nous assistons actuellement.

Commencé en 2008, Jekyll est présenté comme un "générateur de site statique simple, prêt-à-bloguer".

C'est le GSS (générateur de site statique) le plus populaire à l'heure actuelle avec plus de 33&npsp;000 étoiles sur GitHub ce qui est largement dû à son intégration dans [GitHub Pages](https://pages.github.com/).

La valeur ajoutée de Jekyll c'est qu'il vous permet de prendre le HTML statique de n'importe quel site web et de le transformer rapidement en site statique fonctionnel grâce à [Liquid](https://shopify.github.io/liquid/), un langage simple utilisé pour définir les gabarits de page.

### Installation

Installer Jekyll n'est pas une mince affaire, surtout sous Windows.

Jekyll est développé en **Ruby** et demande donc d'avoir une version récente de Ruby installé sur votre machine.

Ce n'est pas si terrible que ça, mais ce n'est pas aussi simple que de télécharger une application. Heureusement le procédé d'installation de Jekyll est [bien documenté](https://jekyllrb.com/docs/installation/).

### Contenu

Dans Jekyll, tout votre contenu est stocké dans des fichiers texte plutôt que dans une base de données. Vous pouvez donc manipuler votre modèle de contenu simplement en ouvrant des fichiers dans votre éditeur de texte favori.

La forme de contenu la plus simple dans Jekyll est stocké à la racine de votre projet sous forme de fichiers au format **Markdown ou HTML**. Ces fichiers de contenus sont traités pendant l'étape de génération, durant laquelle un fichier HTML correspondant est généré à partir des gabarits de votre thème.

Des champs [Front Matter](https://jekyllrb.com/docs/frontmatter/) peuvent être ajoutés à ces fichiers, ils vous permettent de définir les données qui peuvent être utilisées dans vos gabarits.

    ---
    title: Accueil
    date: 2017-01-30
    tags: [bonjour, monde]
    ---
    ## Bonjour monde
    C'est le contenu de ma page !

Jekyll supporte les contenus chronologiques (comme des articles de blog) qui sont stockés dans le dossier `_posts` et qui respectent la nomenclature `yyyy-mm-dd-titre-de-l-article.md`.

Jekyll supporte aussi le chargement de données modelées à partir de fichiers YAML, JSON ou CSV situés dans le répertoire `_data`. Ces données sont accessibles dans vos gabarits à l'aide de `{{ site.data }}`.

### Thèmes et gabarits

Jekyll possède une large communauté et un choix de thèmes gratuits ou payants prêts à l'emploi.

Les thèmes s'installent facilement, soit en les téléchargeant et en les ajoutant à votre projet Jekyll, soit en les installant comme une gem Ruby.

Les thèmes pour Jekyll sont développés à l'aide du **moteur de templating Liquid** de Shopify. Liquid est un moteur de templating sécurisé conçu pour faire tourner du code tiers sur leurs serveurs. Liquid est conçu pour vous aider à faire ce que vous voulez sans qu'il y ait besoin d'ajouter de code Ruby natif.

    <div class=“container”>
    {% for post in site.posts %}
        <div class="article">
        <h2>{{ post.title }}</h2>
        <p>{{ post.content }}</p>
        {% for tag in post.tags %}
            <span>{{ tag }}</span>
        {% endfor %}
        </div>
    {% endfor %}
    </div>

C'est génial pour les débutants et les développeurs qui veulent créer des modèles fonctionnels, propres et simples.

Toutefois, cela signifie que vous aurez à étendre les possibilités à l'aide d'extensions personnalisées en Liquid via des plugins Jekyll si vous souhaitez ajouter des fonctionnalités supplémentaires.

Pour les développeurs issus du monde des CMS traditionnels comme WordPress, Liquid devrait être facile à prendre en main.

### Workflow de développement

Développer avec Jekyll, c'est vraiment génial comparé au développement avec des CMS traditionnels propulsés par une base de données.

Jekyll intègre un **serveur de développement**, qu'on peut lancer avec la commande `bundle exec jekyll serve`.

Vous pouvez ainsi accéder à votre site statique généré sur une adresse IP locale et voir les changements apportés à votre contenu et à vos modèles.

#### Gestion des assets

Jekyll fournit aussi une gestion intégrée des assets très basique, elle compile les fichiers Sass et CoffeeScript.

Tous les fichiers `.scss`, `.sass` ou `.coffee` qui possèdent des délimiteurs Front Matter seront traités par Jekyll et transformés en fichiers `.css` et `.js`.

    ---
    ---
    alert "Hello world!

Le fait de devoir ajouter du Front Matter à chaque fichier fait que beaucoup de sites importants qui tournent en production sous Jekyll, optent pour des outils de génération plus modernes comme Gulp ou [Webpack](https://forestry.io/blog/write-better-javascript-with-webpack/).

Ces outils vous donnent plus de contrôle sur vos fichiers CSS, JS, vos images et votre HTML et permettent la minification et l'optimisation. Ces outils vous donnent aussi accès à BrowerSync ou LiveReload, qui facilitent le développement[^livereload].

[^livereload]: NdT: Les versions récentes de Jekyll [intègrent LiveReload](https://jekyllrb.com/news/2018/01/02/jekyll-3-7-0-released/) .

### Fonctionnalités utiles

Le cœur de Jekyll propose des fonctionnalités minimales[^core] et n'intègre pas une bonne partie des choses qu'on pourrait attendre d'un site web moderne comme :

[^core]: NdT: La philosophie de Jekyll est de garder un cœur [réduit et extensible](https://jekyllrb.com/philosophy#5-small--extensible)

* la gestion des menus,
* la génération de sitemap XML[^core-plugin],
* la génération d'un flux RSS/Atom[^core-plugin],
* la gestion des scripts Analytics,
* la gestion des commentaires,
* la gestion multilingue/i18n,
* et bien plus…

[^core-plugin]: NdT: L'équipe de Jekyll maintient des plugins qui permettent de [générer un sitemap XML](https://github.com/jekyll/jekyll-sitemap), générer [un flux ATOM pour les articles](https://github.com/jekyll/jekyll-feed), les [balises-meta pour le SEO](https://github.com/jekyll/jekyll-seo-tag). La plupart des thèmes comme [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) supportent l'insertion de scripts Google Analytics ou Disqus et la gestion des menus via des fichiers YAML.

Pour cela il faudra utiliser des plugins Jekyll tiers, qui sont de cinq types :

* les **générateurs**, qui permettent de compléter et de modifier le processus de génération de Jekyll,
* les **convertisseurs**, qui permettent d'ajouter le support de nouveaux formats de fichiers,
* les **commandes**, qui permettent d'étendre les options de la ligne de commande de Jekyll,
* les **tags**, qui permettent d'ajouter de nouvelles balises Liquid,
* les **filtres**, qui permettent de modifier le rendu des balises Liquid et des variables.

Par exemple, Forestry a dévelopé le [plugin jekyll-menus](https://github.com/forestryio/jekyll-menus) qui permet de gérer les menus dans le CMS Forestry.

Une autre fonctionnalité bien pratique de Jekyll est [l'import de contenus depuis WordPress](http://import.jekyllrb.com/docs/wordpress/). Avec 30% de l'Internet enfermé dans WordPress, il est bon de savoir que de migrer vers une stack moderne est aisé.

### Performance

Forestry a déjà publié un [comparatif des performances de Jekyll et Hugo](https://forestry.io/blog/hugo-vs-jekyll-benchmark/).

Les résultats des tests montrent que Jekyll est _bien plus lent_ qu'Hugo, qui s'avère 35 fois plus rapide en moyenne. Pour les sites de taille modeste, la différence n'est pas gênante, mais à force cela peut faire une grande différence.

Jekyll met dans la majorité de ces tests entre 1,4 et 6 secondes. Imaginez que vous ayez une équipe qui fasse une centaine de modifications par semaine sur votre site, votre blog ou votre documentation…

Cela représente potentiellement plus de 10 heures de perdues lors de la génération chaque année !

### Jekyll en résumé

Maintenant que nous avons passé en revue les fonctionnalités de base de Jekyll, prenons un peu de recul et examinons d'un œil externe ce générateur de site statique en pesant les pour et les contre.

**Pour :**

* Un **moteur de gabarits simple.** Les gabarits de page de Jekyll sont très semblables à la syntaxe qu'on trouve dans WordPress ou Craft.
* Un **large choix de thèmes.** Il existe plein de thèmes prêt à l'emploi pour Jekyll.
* Un **large choix de plugins.** Il existe des dizaines de plugins pour ajouter les fonctionnalités dont vous avez besoin.
* **Intégration dans GitHub Pages.** Installer un site avec Jekyll et GitHub Pages est un jeu d'enfant.

**Contre :**

* Une **génération lente.** Si vous développez un petit site, ce n'est pas un problème. Mais les sites plus importants pourraient voir les temps de génération augmenter.
* Un **manque de fonctionnalités natives.** Les fonctionnalités de premier ordre sont mieux supportées et intégrées. Ce point fait défaut à Jekyll.[^plugins]

[^plugins]: NdT: Les plugins de génération de Sitemap XML, de génération de Flux RSS/Atom ou de génération des balises meta pour le SEO sont développés par la core team et sont parfaitement bien intégrés à Jekyll.

{{% notice %}}

Vous pouvez consulter [le guide de Forestry pour développer avec Jekyll](https://forestry.io/docs/guides/developing-with-jekyll/) pour apprendre à développer un site avec Jekyll et le connecter au CMS Forestry.

{{% /notice %}}

## Hugo

Hugo est le générateur de site statique créé[^hugo] par Steve Francia, un des principaux contributeurs au langage de programmation Go de Google. Hugo est bien entendu développé en Go !

[^hugo]: Hugo a été depuis principalement développé par [Bjørn Erik Pedersen]({{< relref "interview-hugo-lead-developer.md" >}}).

Apparu en 2013, Hugo est rapidement devenu le deuxième GSS le plus populaire derrière Jekyll et compte à ce jour plus de 24&nbsp;000 étoiles sur GitHub.

Hugo possède un avantage énorme sur tous les autres GSS. Il est **rapide**.

Il possède aussi une des communautés les plus (si ce n'est _la_ plus) actives pour un GSS.

### Installation

Installer Hugo est plus simple que d'installer Jekyll, que vous utilisiez Windows ou un système basé sur UNIX.

Vu qu'Hugo est développé un Go – un langage compilé – installer ou mettre à jour Hugo consiste simplement à télécharger un fichier binaire et dire à votre système de l'utiliser.

Hugo propose [une documentation détaillée](https://gohugo.io/getting-started/installing/) pour faire cela.

### Contenu

Tout comme Jekyll, tous les contenus de votre projet sont stockés dans des fichiers textes.

Dans Hugo, dans les contenus destinés à être générés sont stockés dans le dossier `content` de votre projet. Vous pouvez utiliser différents formats: **Markdown, Mark,** et **HTML** sont supportés par défaut, et il existe des extensions tierces pour supporter **Asciidoc** and **reStructuredText**[^extensions].

[^extensions]: NdT: à l'heure actuelle comme ces extensions ne reposent pas sur des librairies natives en Go, vous perdrez donc le gain de performance apporté par Hugo.

Hugo supporte aussi **TOML, YAML, et JSON** pour le Front Matter, alors que Jekyll ne supporte que le YAML.

    +++
    title = "Accueil"
    date = "2017-01-30"
    tags = ["bonjour", "monde"]
    +++
    ## Bonjour Monde
    Ceci est un exemple de Front Matter en TOML


Hugo supporte également les données externes, qui peuvent être stockées dans le répertoire `/data` de votre projet ou bien récupérées depuis des sources de tierce-partie comme des APIs REST. Les formats supportés pour les sources sont JSON et CSV.

### Thèmes & gabarits

Même si Hugo n'a que 4 ans, de nombreux thèmes sont déjà disponibles pour ce GSS en forte croissance.

Si vous utilisez la ligne de commande, [installer des thèmes depuis le dépôt des thèmes d'Hugo](https://gohugo.io/themes/installing-and-using-themes/) est assez simple.

Hugo utilise le [package de template](https://golang.org/pkg/html/template/) de Go par défaut. Tout comme avec Liquid, il est possible d'ajouter un peu logique dans vos gabarits.

    <div class=“container”>
    {{ range .Site.Pages}
        <div class="article">
        <h2>{{ .Title }}</h2>
        <p>{{ .Content }}</p>
        {{ range .Tags }}
            <span>{{ . }}</span>
        {{ end }}
        </div>
    {{ end }}
    </div>

Une fois de plus, c'est très bien pour les débutants mais vous allez devoir étendre les possibilités du moteur de template à l'aide de *shortcodes* pour ajouter des fonctionnalités supplémentaires.

Malheureusement la syntaxe du package de template de Go n'est pas aussi évidente pour les débutants que celle de Liquid et ne semblera pas aussi familière à première vue.

Toutefois, Hugo propose aussi le support des deux moteurs de template [Amber](https://github.com/eknkc/amber) et [Ace](https://github.com/yosssi/ace).
Ces deux langages pourront sembler plus familiers aux développeurs issus des CMS traditionnels comme WordPress.

### Workflow de développement

Il est plus agréable de développer avec Hugo qu'avec Jekyll, car la génération est quasi-instantanée et le serveur LiveReload est actif par défaut.

Dans le dossier de votre projet, lancez la commande `hugo serve` pour lancer le serveur de développement.

Cela vous permet d'accéder à votre site sur une adresse IP locale. Chaque changement effectué dans votre projet, déclenche une génération et recharge automatiquement le site dans votre navigateur.

#### Gestion des assets

Hugo ne procède à aucune transformation de vos assets (CSS, JS, SVG, etc.), il se contente de recopier tous les fichiers qui se trouvent dans le répertoire `/static` de votre projet.

Si vous avez l'habitude d'utiliser Sass, CoffeeScript ou n'importe quel autre préprocesseur ou gestionnaire d'assets, il vous faudra regarder du côté d'outils comme Gulp ou Webpack. Cela signifie que vous allez devoir inclure Hugo dans votre processus de génération externalisé, ce qui peut s'avérer ennuyeux pour les débutants.

Une gestion plus avancée des assets est [en cours de développement](https://github.com/gohugoio/hugo/issues/4446), mais à l'heure actuelle, elle n'a pas encore été intégrée dans le cœur d'Hugo.

### Fonctionnalités utiles

Hugo brille par la multitude de fonctionnalités puissantes qu'il intègre par défaut comparativement à Jekyll et à d'autres GSS.

Avec le support par défaut des menus, des flux ou des sitemaps, la configuration d'un site web pour la production est un jeu d'enfant.

Mais Hugo brille encore plus quand vous travaillez sur un site avec beaucoup de contenus, comme un journal, un site gouvernemental ou un site de documentation.

Par exemple avec la fonctionnalité d'exports personnalisés, vous pouvez générer en même temps : votre site statique, sa version alternative pour Google AMP, ainsi que des fichiers JSON prêts à être consommés par une application mobile.

Parmi les fonctionnalités bien pratiques d'Hugo on peut citer :

* La gestion des menus,
* La génération de Sitemap XML,
* La génération de flux RSS/Atom,
* L'intégration d'Analytics (via Google Analytics)
* L'intégration de commentaires (via Disqus)
* La gestion du multilingue/i18n
* Les formats d'export personnalisés

{{% notice %}}

Envie de passer à Hugo, mais encore sous Jekyll? [Hugo peut importer votre site Jekyll en ligne de commande !](https://gohugo.io/commands/hugo_import_jekyll/)

{{% /notice %}}

### Performance

Hugo est extrêmement rapide. Forestry a publié un article sur la [performance de Hugo et de Jekyll](https://forestry.io/blog/hugo-vs-jekyll-benchmark/) et a comparé les deux. Hugo est sorti vainqueur haut la main.

Rendez-vous compte, lors de ces tests Hugo a généré les sites en moyenne 35 fois plus vite que Jekyll, la génération de la plupart de ces sites a pris moins d'une seconde.

Lors d'un test, @darinpope un utilisateur d'Hugo a réussi à [générer 600&nbsp;000 pages en moins de 5 minutes](https://discourse.gohugo.io/t/page-generation-performance-expectations/1335/12) !.

### Hugo en résumé

Maintenant que nous avons passé en revue les fonctionnalités natives d'Hugo, prenons un peu de recul et jetons un regard externe sur ce générateur de site statique en pesant le pour et le contre.

**Pour :**

* **Extrêmement rapide.** Des temps de génération de l'ordre de la seconde.
* **Extrêmement versatile.** Plein de fonctionnalités par défaut pour des sites web d'entreprises.
* **Paré pour l'entreprise** Avec le support des exports multiples et des sites multilingues, vous êtes opérationnel !
* **Une communauté florissante.** Il est facile d'avoir de l'aide. Posez une question sur le forum et vous _aurez_ une réponse.

**Contre :**

* **Pas d'extensions.** Hugo ne prend pas les plugins en charge, il n'est donc pas possible d'ajouter des fonctionnalités personnalisées.
* **Une syntaxe de gabarit compliquée.** Bien que le moteur de gabarits d'Hugo soit versatile, il est assez peu intuitif et compliqué pour les débutants.
* **Pas de gestion des assets.** Hugo n'intègre aucun traitement des assets, il vous faudra donc passer par des outils tiers.

{{% notice %}}

Reportez-vous au [guide de Forestry pour développer avec Hugo](https://forestry.io/docs/guides/developing-with-hugo/) pour apprendre comment développer un site avec Hugo et le connecter au CMS Forestry.

{{% /notice %}}

## En résumé

Nous avons passé en revue les fonctionnalités de base de Jekyll et Hugo, en soulignant la facilité d'installation, la gestion de contenu, les langages de gabarits de page, les workflows de développement, les fonctionnalités offertes et la performance.

Ces deux générateurs sont les leaders dans leur domaine, et il y a plein d'exemples de gros projets qui les utilisent comme [healthcare.gov](https://github.com/springmeyer/healthcare.gov), développé avec Jekyll, et le nouveau site de [Smashing Magazine](https://smashingmagazine.com/) développé avec Hugo.

Maintenant c'est l'heure de faire votre choix ! Voici un petit récapitulatif pour vous aider :

* **Jekyll** est un excellent choix, si vous êtes familier avec l'écosystème de Ruby ou si vous êtes débutant, grâce à son moteur de templating très simple et à ses nombreux plugins.
* **Hugo** est génial pour les sites web avec beaucoup de contenus. Il comble son manque d'extensibilité par un lot de fonctionnalités embarquées et une vitesse inégalée par aucun autre générateur de site statique.
