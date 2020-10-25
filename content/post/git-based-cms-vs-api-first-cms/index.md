---
title: "Git-based, API-first headless CMS : lequel choisir ?"
description: Les différences à connaître entre les headless CMS qui reposent sur Git et ceux qui fournissent une API.
date: 2019-10-30T09:26:33.000+00:00
images:
  - https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/w_1180,c_fit,co_white,g_north_west,x_80,y_80,l_text:poppins_80_ultrabold_line_spacing_-30:Git-based%20vs.%20API-first%20headless%20CMS%20%3A%20lequel%20choisir%20%3F/jamstatic/twitter-card.png
categories:
  - headless
source:
  author: Nebojsa Radakovic
  title: "Git-based CMS vs. API-first CMS: Which Headless CMS Should You Choose?"
  url: https://bejamas.io/blog/git-based-cms-vs-api-first-cms/
---

{{< intro >}}
L'agence [Bejamas](https://bejamas.io) s'est spécialisée dans le développement de sites Jamstack. Après avoir testé différentes solutions, elle se penche dans cet article sur les différences entre les CMS basés sur Git et ceux basés sur des APIs. L'article a le mérite de donner un aperçu des avantages et des inconvénients des deux types de plates-formes. Dans les faits la dichotomie n'est pas aussi binaire qu'on pourrait le penser.

En effet, rien n'empêche un CMS qui communique avec l'<abbr title="Interface de Programmation Applicative">API</abbr> d'une plate-forme Git de vous permettre d'accéder à votre tour à ces contenus via une <abbr title="Interface de Programmation Applicative">API</abbr> de votre cru. Générer des fichiers JSON, les générateurs actuels comme [Hugo](/categories/hugo) ou [Eleventy](/categories/eleventy) font ça [très](https://github.com/regisphilibert/juliette-hugo-component "Composant de thème Hugo pour exposer une API") [bien](https://forestry.io/blog/add-functionality-to-your-hugo-site-with-theme-components/ "Autre composant de thème Hugo pour exposer une API"). On peut considérer que les CMS basés sur des APIs offrent un confort d'utilisation en fournissant une API et sa documentation par défaut. Une iso fonctionnalité demandera naturellement un effort supplémentaire si vous devez développer vous-même votre API. À vous de peser le pour et le contre de l'approche <abbr title="Do It Yourself">DIY</abbr>, qui peut soit dit en passant tout à fait être réutilisable de projet en projet.

Il vous faut aussi prendre en compte dans l'équation _votre_ workflow éditorial, la taille de _votre_ site (et donc le temps nécessaire à la génération d'une nouvelle version) ainsi que _votre_ fréquence de publication. Autant de paramètres qui doivent peser dans le choix d'un [headless](/categories/headless) CMS. On rappellera que les CMS headless ne présentent aucun des inconvénients des CMS traditionnels, que ce soit en terme de workflow de développement, de performance ou de sécurité, et qu'ils offrent plus de flexibilité et une meilleure productivité, une fois l'investissement initial consenti.
{{</ intro >}}

---

Alors que le monde est en train de migrer vers le cloud, les systèmes de gestion de contenu (CMSs), en tout cas les plus populaires, sont encore embourbés dans des technologies et des architectures qui ont plus de 20 ans. Ils n'en sont pas moins fonctionnel pour autant.

WordPress par exemple (qui date du début des années 2000) est utilisé à l'heure actuelle par [34% des sites web](https://w3techs.com/technologies/details/cm-wordpress/all/all). Dans le même temps, il y a une forte demande d'innovation, et le souhait d'une meilleure expérience numérique pousse beaucoup d'entreprises à accélérer leur rythme de développement et à se tourner vers les outils de développement d'interfaces client modernes, ceci afin de créer des sites plus légers, plus performants et plus sécurisés.

Mais il faut bien que le contenu de votre site web vive quelque part, n'est-ce pas ?

**Bienvenue dans le monde des CMS headless.** Plutôt que de [lister quelques uns des headless CMS](https://bejamas.io/blog/headless-cms/) de cet écosystème — ce que nous avons déjà fait de manière opiniâtre — dans cet article, nous allons couvrir les différences, les défis, et les bénéfices de l'utilisation des CMS basés sur Git et de ceux accessibles par défaut via une API. [^git]

[^git]: NdT: Les CMS basés sur Git, utilisent eux aussi une API pour communiquer avec votre dépôt Git, et vous permettent également de générer _manuellement_ une API à consommer depuis différents terminaux clients.

## Les CMS basés sur Git

{{< figure src="git-based-cms.png" >}}

Avec un CMS basé sur Git, les changements sont d'abord enregistrés dans votre dépôt Git, ce qui ensuite peut produire une nouvelle génération de votre site. Sans entrer trop dans les détails, sachez juste que vous allez travailler principalement avec des fichiers stockés dans votre dépôt Git. Voyons quels sont les avantages et les inconvénients de ce type de CMS.

### Pour

- Pas de verrou propriétaire sur vos contenus.
- Gestion de version de _tous_ les contenus par défaut.
- Tous les contenus étant disponibles sous forme de fichiers texte, les développeurs peuvent continuer d'utiliser leurs outils habituels.
- Facilite l'annulation de changements.
- C'est l'approche la plus homogène pour la plupart des développeurs web, qui utilisent déjà un workflow basé sur Git.
- Facile à configurer.

### Contre

- Si vous avez plusieurs sites ou applications qui récupèrent des contenus depuis un même CMS, ce n'est pas forcément la meilleure solution.
- Si votre site a une quantité très importante de contenus, vous préférerez peut-être regarder du côté d'une base de données.
- Si vous prévoyez des mises à jours en continu, des articles publiés chaque minute par exemple, la génération et le déploiement continu n'est pas la meilleure option.
- Moins d'options de modélisation de contenu et de formatage.

## Les CMS API-first

{{< figure src="api-first-cms.png" >}}

Avec les CMS dotés d'une API par défaut, vous avez accès à une API, généralement une API REST ou GraphQL, qui sert le contenu. Donc, vous récupérez vos données de la façon dont elles sont structurées mais c'est à vous de choisir le framework ou le langage que vous allez utiliser pour travailler avec ces données.

### Pour

- C'est la meilleure solution si vous maintenez plusieurs applications et sites web qui récupèrent le même contenu structuré.
- Facile à utiliser avec de multiples terminaux client.
- Beaucoup d'options disponibles pour vous permettre de personnaliser le CMS.
- Vous avez des quantités très importantes de données à gérer.

### Contre

- Pas de gestion de version dans Git, ni d'intégration dans le workflow de développement.
- Va souvent de paire avec une limitation de stockage ou d'utilisation de l'API. Peut revenir cher si vous ne calculez pas bien votre coût.
- Dépendance aux développeurs pour des gros changements.

Maintenant que nous savons tout cela, regardons de plus près les bénéfices et les défauts de ces systèmes que vous devriez gardez en tête lors du choix du headless CMS pour votre prochain projet.

## Les bénéfices des CMS basés sur Git

### La gestion de version multi-objets

Les plates-formes de CMS traditionnelles comme **Drupal**, **Kirby**, ou **Wordpress** proposent un gestion de version limitée, soit elle surveillent les graphes d'un unique objet soit elles maintiennent des structures de données bancales.

Cette approche ne pose pas de problèmes pour des besoins de gestion de contenu basiques — par exemple un blog ou un site web très simple, mais elle est loin d'offrir une expérience numérique multi-fichiers, qui est une nécessité pour la plupart des marques de nos jours.

Bien souvent, il existe une relation entre le contenu et le code (CSS ou JavaScript) et cela doit être pris en compte. Surveiller les modifications unitaires ne suffit pas.

La possibilité de restaurer la version précédente d'un fichier peut suffire pour un besoin éditorial basique mais pas pour la majorité des scénarios dans la vraie vie comme des audits d'accessibilité, un renouvellement d'identité de marque, et de futurs développements qui demandent un CMS plus sophistiqué.

C'est pourquoi une approche de gestion de version des différents types de fichiers, comme celle utilisée par les développeurs est nécessaire. De plus Git est aujourd'hui le système de gestion de version le plus populaire pour surveiller les changements dans le code source et on comprend aisément pourquoi l'expérience numérique actuelle nécessite à la fois des composants techniques et du contenu.

### Dépôt distribué

Contrairement aux CMS traditionnels, Git permet aux développeurs d'avoir leurs propres dépôts locaux et intermédiaires, tous issus d'un dépôt parent.

La gestion de version distribuée et le flux de développement sont simples et rapides.

Avec un système basé sur Git, les développeurs peuvent travailler en local tout en faisant parti du CMS. Ainsi ils peuvent continuer d'utiliser au quotidien leurs outils de prédilection, sans restriction aucune.

### Ramifications

Grâce aux branches de Git, vous pouvez créer un nombre illimité d'environnements, ce qui facilite en général pas mal le développement.

Les développeurs ainsi que les auteurs peuvent expérimenter et travailler en parallèle sur des fonctionnalités majeures et des améliorations du site.

_NdT: [la conférence de Shawn Erquhart](https://www.youtube.com/embed/Y2ak5o0IqLw?start=103) explique en détail pourquoi les CMS basés sur Git sont des outils plus puissants qu'il n'y paraît._

{{< youtube id="Y2ak5o0IqLw" class="" >}}

## Les bénéfices des CMS basés sur des APIs

### Atteindre les consommateurs sur des terminaux variés

Beaucoup de personnes se tournent aujourd'hui vers des appareils à commande vocale comme [Amazon Echo](https://www.amazon.com/all-new-amazon-echo-speaker-with-wifi-alexa-dark-charcoal/dp/B06XCM9LJ4) et [Google Home](https://store.google.com/gb/product/google_home) pour écouter les actualités, faire leurs achats en ligne, définir des rappels, rechercher sur le web, etc.

Les plate-formes traditionnelles de gestion de contenu, ne peuvent fournir ce type d'expérience utilisateur, contrairement aux CMS qui fournissent une API de contenu. Les marques doivent donc développer une <abbr title="Interface de Programmation Applicative">API</abbr> pour ces terminaux pour les faire communiquer avec leur système.

Vous pouvez alors fournir différentes expériences sur absolument n'importe quel périphérique sans restriction aucune.

### Meilleure intégration pour le marketing

Dans un environnement basé sur une API de contenu, les marques peuvent greffer leurs applications marketing préférées comme des outils d'automatisation, un CRM ou des services d'analyse. Elles peuvent aussi décider à tout moment de ne plus les intégrer. Cela donne la possibilité aux marques d'adapter rapidement leur stratégie digitale comme elles l'entendent.

### Rediffusion du contenu plus rapide

Avec les CMS basés sur des APIs, tous vos contenus sont stockés en un unique point central qui permet aux marques de publier leurs contenus sur différents canaux. Les créateurs de contenus écrivent donc une seule fois et peuvent les rediffuser sur chaque canal ou terminal. Dans le monde [omnicanal](https://fr.wikipedia.org/wiki/Stratégie_omnicanale#Définition_de_l’omnicanal) d'aujourd'hui, c'est un gros avantage et un énorme gain de temps car il éviter à avoir à créer séparément des contenus pour chaque canal.

## Les défis posés par les CMS basés sur Git

### Adopter des mesures spécifiques pour le SEO

Faute de solution dédiée, l'amélioration du SEO avec Git dépendra de vous. Pour bénéficier d'une meilleure visibilité, vous devrez vous assurer de la compatibilité mobile de votre site, de la génération de sitemap, de l'insertion des balises meta et open graph.

### Les limitations de GitHub Pages

GitHub Pages est gratuit mais ne supporte par défaut que quelques plugins Jekyll, si vous utilisez un autre générateur ou que vous utilisez d'autres plugins, il est toujours possible de générer vos contenus localement, via GitHub Actions ou autre plate-forme d'intégration continue [^deploiement].

[^deploiement]: Il existe d'autres solutions dédiées pour le déploiement de sites statiques comme [Netlify](https://netlify.com) ou [Zeit Now](https://zeit.co) pour n'en citer que deux.

## Les défis posés par les CMS basés sur des APIs

### Une grande dépendance aux développeurs web

Créer plusieurs interfaces client personnalisées, représente un travail supplémentaire pour votre équipe. Cela demandera donc une communication constante entre les équipes marketing et celles de développements dès que des modifications devront être apportées. [^developpeurs]

[^developpeurs]: C'est aussi vrai pour les CMS basés sur Git, le moindre changement apporté dans la structure de données devra être reporté pour être affiché sur le site généré.

### (Pour certains) la prévisualisation de contenu est problématique

Les CMS d'APIs de contenu proposent des interfaces d'administration qui permettent aux éditeurs d'entrer leur contenu. Toutefois, tous les CMS ne permettent pas une prévisualisation avant publication, même chose pour la gestion des brouillons qui devra être ajoutée manuellement. Ne pas pouvoir juger du rendu utilisateur final est souvent un inconvénient qui laisse peu de place à l'erreur.

### Les coûts

Vous devrez gardez en tête les coûts induits par l'utilisation des CMS qui proposent des APIs de contenu, même ceux qui sont open source. Cela inclut les coûts d'infrastructure (hébergement, CDNs, etc. pour les CMS à héberger soi-même) mais aussi les coûts de développement, de maintenance et de sécurité, puisque vous travaillerez avec une interface d'administration entièrement personnalisée.

## Alors quel CMS headless devez vous choisir ?

Ce n'est pas une question à laquelle il est facile de répondre. Par exemple, nous nous sommes rendus compte que si vous n'avez pas besoin de créer des centaines d'articles ou de pages, et régénérer le site constamment, les CMS basés sur Git sont une bien meilleure option.

Bien entendu, cela dépend surtout de vos besoins. C'est à l'ensemble de votre équipe (marketing et développement) de bien comprendre la taille, le budget et le temps (oui c'est aussi un facteur de décision) consacré au projet, en plus de toutes les technologies à l'œuvre derrière.

## Liste de plate-formes CMS basées sur Git

- Forestry - [https://forestry.io](https://forestry.io)
- Netlify CMS - [https://www.netlifycms.org](https://www.netlifycms.org)
- TinaCMS - [https://tinacms.org](https://tinacms.org)
- Publii - [https://getpublii.com](https://getpublii.com)
- Prose - [http://prose.io](http://prose.io)
- Crafter CMS - [https://craftercms.org](https://craftercms.org)

## Liste de plates-formes CMS basées sur des APis

- Sanity - [https://sanity.io](https://sanity.io)
- Dato CMS - [https://www.datocms.com/](https://www.datocms.com/)
- Strapi - [https://strapi.io](https://strapi.io)
- Storyblok - [https://www.storyblok.com/](https://www.storyblok.com/)
- Prismic - [https://prismic.io](https://prismic.io)
- Contentful - [https://www.contentful.com](https://www.contentful.com)
- Ghost - [https://ghost.org](https://ghost.org)
- Cloud CMS - [https://www.cloudcms.com](https://www.cloudcms.com)
- Directus - [https://directus.io](https://directus.io)
- Rooftop - [https://www.rooftopcms.com](https://www.rooftopcms.com)
