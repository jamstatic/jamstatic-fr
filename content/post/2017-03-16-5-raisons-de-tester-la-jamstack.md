---
date: 2017-03-16T20:04:01Z
description: Référencement, performance, sécurité, automatisation, communauté grandissante,
  les raisons de passer au statique ne manquent pas.
image: https://builtvisible.com/wp-content/uploads/2017/03/Go_Static.jpg
title: "Passer au statique : 5 raisons de tester la JAMstack sur votre prochain projet"
url: /2017/03/16/5-raisons-de-tester-la-jamstack/
---

Adopter une stack de développement Web moderne pour pouvoir générer des sites statiques présente bien des avantages et Tom Bennet en a listé cinq des principaux. Si vous n'aviez encore jamais entendu parlé de la JAMstack, cet article donne un aperçu global du processus et de l'écosystème actuel ainsi que des gains engendrés. Vous trouverez également des lectures pour approfondir votre connaissance sur le sujet.
{: .intro}

Que ce soit pour un mettre en place un blog, configurer un site de e-commerce ou développer une single page application en JavaScript, le temps où on se rabattait par défaut sur Wordpress pour tout ou presque est révolu. Les générateurs de site statique et les réseaux de CDN ultra-rapides propulsent une nouvelle génération de sites Web et c'est le bon moment pour embrasser le mouvement.

Avant d'expliquer plus en détail _pourquoi_, commençons déjà par regarder de _quoi_ on parle.

## JAMstack et développement statique

Le terme **JAMstack** désigne la stack JavaScript, APIs et Markup et une manière de construire des sites Web statiques sans base de données. Ce concept est _vraiment tout bête_ - le mot "statique" sous-entend de la simplicité ou un manque d'interactivité, mais c'est loin d'être le cas. Quand on parle de sites statiques, on fait surtout référence aux technologies utilisées pour les générer, les mettre en ligne et les héberger.

Le truc vraiment puissant c'est que le développement avec la JAMstack est bien plus simple à appréhender que le développement de sites dynamiques à base de CMS. Il est facile d'oublier le nombre d'étapes nécessaires pour satisfaire une simple requête de page et la complexité des opérations qui sont menées constamment côté serveur pour générer le HTML final affiché par le navigateur de l'utilisateur. Prenons l'exemple (très schématique) d'un site typique qui fonctionne sous Wordpress.

{% include figure.html url="https://36bvmt283fg61unuud3h7qua-wpengine.netdna-ssl.com/wp-content/uploads/2017/03/Toms_Diagram_1.png" description="Génération de page HTML à l'aide de PHP et d'un serveur MySQL" %}

Quand l'utilisateur demande à afficher une page, votre serveur fait une requête dans une base de données MySQL et utilise un interpréteur PHP, assemble les données avec le thème et les plugins pour en faire un document HTML qui pourra ensuite être affiché dans le navigateur de l'utilisateur. Ce qui fait que cette opération est extraordinairement complexe c'est surtout le **templating**. Vu qu'on ne va pas coder toutes les pages d'un blog, aussi modeste soit-il, à la main : séparer les contenus en composants réutilisables et automatiser leur assemblage fait sens.

Mais pourquoi donc cette opération de templating a besoin de se passer côté serveur ? Avons-nous vraiment besoin de bases de données et de logiciels côté serveur (qui nous exposent par la même occasion à des douzaines de failles de sécurité) pour créer un simple blog ? Maintenant que les navigateurs sont devenus des systèmes d'exploitation, capable d'interagir avec un nombre incalculable d'APIs et de faire tourner des applications complexes côté client, et que le développement front-end est dominé par JavaScript et les automatisations à l'aide de `npm`, n'avons nous pas déjà dépassé ce modèle ?

{% include figure.html url="https://36bvmt283fg61unuud3h7qua-wpengine.netdna-ssl.com/wp-content/uploads/2017/03/Toms_Diagram_2-768x314.png" description="Un site Web statique développé à l'aide d'un processus basé sur la JAMstack" %}

Les générateurs de site statique comme Jekyll et Hugo permettent de rendre cela possible. Ils nous servent essentiellement de système de templating à la place du PHP mais au lieu de tourner sur un serveur et de générer du contenu à la volée, ils tournent en local en tant que partie intégrante du processus de développement. Votre HTML est généré en amont et votre site Web — désormais un ensemble de fichiers statiques faciles à mettre en cache — peut être distribué par un CDN (réseau de distribution de contenu) rapide comme l'éclair.

Mais leurs bienfaits ne s'arrêtent pas là.

## 1. Référencement

Assurément, je vais commencer avec le référencement. Le développement statique présente une multitude de bénéfices pour la visibilité de votre site sur les moteurs de recherche et tous ne sont pas forcément toujours appréciés à leur juste valeur.

Premièrement, la simplification des URLs et de l'architecture du site est souvent plus simple avec la JAMstack qu'avec un site dynamique et un CMS. Plutôt que de se reposer sur des régles de réecritures complexes d'URLs côté serveur pour que votre contenu soit accessible via des URLS lisibles (`example.com/?p=12345` →
`example.com/clair-et-net/`), vos URLs sont ce que vous voulez qu'elles soient : elles reflètent simplement l'emplacement des fichiers de votre site[^1].

[^1]: NdT. Les URLs peuvent être également définies dans les métadonnées des fichiers de contenu.

Le risque de duplication de contenus est également très réduit. Beaucoup de CMS génèrent automatiquement des pages pour les catégories, les tags et les archives par date alors que vous n'en avez peut-être pas besoin. Généralement des directives `noindex` et des URLS canoniques sont ajoutées à l'aide de plugins supplémentaires pour gérer tout ça. Les générateurs de site statique à l'inverse vous permettent de créer des pages finement et de mettre en place la taxonomie qui correspond à _votre_ contenu. Si besoin, beaucoup de générateurs embarque des fonctions et une bonne logique pour créer, filtrer et paginer des pages d'archives.

Enfin, il y a beaucoup d'avantages potentiels pour le SEO pour les sites qui utilisent beaucoup le rendu côté client et les frameworks JavaScript. Étant donné le caractère statique de votre code source, le mécanisme qui consiste à servir des versions pré-rendues de votre HTML aux moteurs s'en retrouve nettement simplifié. Certains hébergeurs spécialisés dans les sites statiques comme Netlify [offrent même le pré-rendu](https://www.netlify.com/docs/prerendering/) de base grâce à l'utilisation d'`_escaped_fragment_`, ça s'installe _litérallement_ en un clic.
Les personnes intéressées par ce sujet feraient bien d'aller lire l'étude de cas de Phil Hawksworth sur le [rendu isomorphique avec les sites statiques](https://www.hawksworx.com/blog/isomorphic-rendering-on-the-jam-stack/).

## 2. Performance

La performance est étroitement liée au référencement car elle joue un rôle prépondérant en terme d’expérience utilisateur.

Les avantages des sites statiques en terme de performance peuvent être phénoménaux. Avec la génération en amont du HTML et l'élimination des requêtes vers les bases de données, vos contenus peuvent être délivrés instantanément depuis un CDN comme Amazon Cloudfront. Les tests effectués par Mathias Biilmann avec [Smashing Magazine](https://www.smashingmagazine.com/2015/11/modern-static-website-generators-next-big-thing/#dynamic-websites-and-caching) ont montré que même avec un site dynamique très optimisé (et une solide stratégie de cache), le temps de début de chargement était en moyenne **six fois plus rapide** avec une version statique distribuée via CDN. Smashing Magazine ont d'ailleurs [migré vers la JAMstack et Netlify]({% post_url 2017-03-17-smashing-mag-va-dix-fois-plus-vite %}) à l'occasion de leur refonte.

La mise en cache s'en retrouve grandement simplifiée. Avec WordPress (ou n'importe quel CMS dynamique) les URLs peuvent retourner différents contenus en fonction des requêtes passées en paramètre et de facteurs comme si l'utilisateur à l'origine de la demande est authentifié ou non. Toute modification sur les tags, les catégories, les commentaires, les pages des auteurs, etc. peut avoir une incidence sur le fait qu'une page en cache est à jour ou pas. Avec un site Web statique, toutes les URLs retournent le _même_ fichier HTML à tous les utilisateurs et les mises à jour sont propagées dans le monde entier presque instantanèment. Tout contenu "dynamique" est alors géré côté client grâce à l'utilisation de JavaScript et d'APIs comme  [Disqus](https://disqus.com/) pour les commentaires ou
[FormKeep](https://formkeep.com/) pour les formulaires.

## 3. Securité

On va pouvoir passer rapidement sur ce point car les sites Web statiques sont de véritables **forteresses**.

Sans bases de données, sans plugins, sans logiciel dynamique qui tourne sur votre serveur, la possibilité d'injection de code et de hacks est fortement réduite. Quand votre site Web consiste en un ensemble de fichiers statiques, toutes les fonctionnalités dynamiques sont alors prises en charge par les APIs et le JavaScript côté client, on élimine ainsi le besoin de se reposer sur des plugins de CMS. Bien qu'il soit tout à fait possible qu'une API externe chargée de traiter des données persistantes expose une vulnérabilité,  le fait d'éliminer votre CMS entraîne la suppression de nombreux points de défaillance  et de multiples vecteurs d'attaque. Pour les les blogs statiques, il n'est pas exagéré d'affirmer que la sécurité devient essentiellement un **faux problème**, du moins comparé à une installation typique de Wordpress.

Les certificats SSL sont également faciles à installer et sont disponibles gratuitement grâce à des autorités de certications automatisées comme
[LetsEncrypt](https://letsencrypt.org/).

## 4. Déploiement & Workflow

Une fois que vous avez travaillé sur un site Web avec la JAMstack - que vous avez déployé des mises à jour et publié des contenus régulièrement - vous commencez à ressentir le potentiel disruptif de cette manière de développer. Ça évolue rapidement et on peut parfois se sentir un peu comme dans le Far West, avec tous ces nouveaux outils et ces nouveaux services qui arrivent tous les jours, mais ne vous y trompez pas : c'est puissant, flexible, on a atteint le stade de la maturité.

Un des principes de base du développement avec la JAMstack c'est que tout vit dans un dépôt Git, que ce soit les composants de notre site statique, les fichiers de configuration de notre générateur, nos fichiers CSS et JS, nos contenus écrits (sauvegardés sour forme de documents Markdown en texte brut). Avec votre service de déploiement et d'hébergement configuré pour refléter en permanence l'état de la branche de votre dépôt, appliquer une modification est aussi simple que de pousser un commit sur un dépôt GitHub. L'ensemble de votre site Web - le code et le contenu - vit dans un endroit centralisé, protégé par un versionnement robuste et peut être configuré pour être déployé en continu.

**Oui mais et les clients dans tout ça ?** Quid des utilisateurs non techniques ? Les experts de la production de contenu qui sont à l'aise avec des éditeurs comme celui de WordPress mais qui ne connaissent pas Markdown et GitHub ?


Le problème a été identifié il y a maintenant plusieurs années et beaucoup de solutions réjouissantes commencent à apparaître. Certaines sont extraodinairement simples. Si les éditeurs de vos contenus sont déjà familiers avec [les bases de Markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) - c'est à dire `# titre`, `**gras**`, `*italique*` - alors il n'y a aucune raison qu'il ne puissent éditer le dépôt sous-jacent. Des outils comme [Prose.io](http://prose.io/) s'intègrent à GitHub pour proposer une interface utilisateur plus adaptée pour les auteurs non techniques. Créez une branche pour les éditeurs de contenu puis fusionnez simplement leurs modifications pour publier de nouveaux contenus.

Sinon il y a aussi des dizaines de [CMS "headless"](https://css-tricks.com/what-is-a-headless-cms/) qui sont parfaits pour les sites Web statiques. Ce sont avant tout des gestionnaires de contenus reposant sur une API qui permettent de dissocier vos contenus du côté client chargé de l'affichage de votre site. [Siteleaf](https://www.siteleaf.com/), par exemple qui fonctionne avec Jekyll et GitHub propose une édition dans le cloud compatible avec vos outils existants — comme c'est écrit sur leur site **les sites Web devraient survivre à leurs CMS**.

Comme je le disais, c'est un secteur qui se développe rapidement, vous _serez_ confrontés à des challenges pour vous adapter à un workflow statique, particulièrement pour les projets ambitieux. Quiconque s'intéresse à l'utilisation de sites statiques pour un projet commercial ou à grande échelle devrait aller lire [l'article de Stefan Baumgartner](https://www.smashingmagazine.com/2016/08/using-a-static-site-generator-at-scale-lessons-learned/) sur Smashing Magazine.

## 5. Une communauté en pleine expansion

La popularité grandissante du développement de site statique a donné naissance à quelques nouveaux services assez incroyables.

Prenez le e-commerce par exemple. Pour les petits vendeurs - ceux qui se reposeraient typiquement sur Wordpress et WooCommerce - un site statique est désormais une option parfaitement valable. [Snipcart](https://snipcart.com/) est un système de panier et de paiement basé sur JavaScript qui permet aux développeurs d'ajouter des fonctionnalités de e-commerce sur n'imporque quel site Web. L'inventaire des produits et des ventes est géré via le tableau de bord de Snipcart et son API permet l'intégration de systèmes de gestion d'inventaires, de livreurs, etc. Il existent d'autres solutions comme
[Foxycart](http://www.foxycart.com/) et le [bouton d'achat Shopify](https://www.shopify.co.uk/buy-button).

Pour les **blogueurs** qui voudraient utiliser un thème tout fait pour leur site, il en existe maintenant des centaines — allez faire un tour sur les annuaires de thèmes pour [Hugo](http://themes.gohugo.io/) et [Hexo](https://hexo.io/themes/). Il convient de mentionner que certaines connaissances techniques sont requises pour être opérationnel avec ces générateurs statiques.

Ces annuaires ne sont pas encore prêts de devenir des places de marché de thèmes prospères en tant que telles, mais en un sens c'est une bonne chose : les thèmes bourrés de plugins inutiles et d'outils de construction de pages ne sont pas un problème ici !

Il y a aussi des **fournisseurs d'hébergement** spécialisés dans les sites Web statique. [Netlify](https://www.netlify.com/features/) est le plus connu et à juste titre. Ils offrent un CDN mondial, des domaines personnalisés et des certificats SSL gratuits ainsi qu'une intégration avec GitHub pour permettre de générer et de faire des déploiements atomiques depuis la ligne de commande. Le service se vante aussi d'une bonne interface pour faire des choses gérées typiquement sur votre serveur, comme les redirections, les pages d'erreur personnalisées, la protection par mot de passe, la proxyfication, etc. (oui ça veut dire **fini les htaccess**).

## Est-ce que c'est fait pour moi ?

Bien entendu, il y a plein de sites Web pour lesquels le développement avec la JAMstack n'est pas approprié. Il y a également des problèmes légitimes et quelques obstacles — auxquels vous ferez face même sur de tous petits projets — qui doivent être surmontés. Et plus particulièrement les services destinés aux utilisateurs non techniques et aux éditeurs de contenu doivent être encore plus soignés. La vitesse à laquelle la plupart de ces outils évoluent peut s'avérer déconcertante pour les nouveaux arrivants.

Toutefois je crois que l'écosystème autour du développement de site statique a maintenant atteint un **point critique**. Dans bien des cas les avantages du développement statique surpassent maintenant les inconvénients. Une utilisation plus répandue de ces outils, de ces plate-formes et de ces services va les pousser à s'étoffer.

**Alors est-ce que c'est fait pour vous ?**  Si vous êtes vaguement familier avec le développement Web et que vous n'avez pas encore tester un générateur de site statique moderne, c'est le moment idéal pour le faire et de répondre vous-même à cette question. Prenez connaissance des ressources ci-dessous, regardez [le talk de Mathias Biilmann](https://vimeo.com/163522126) lors de la SmashingConf, puis essayez de remonter votre site perso à l'aide des outils de développement statique modernes, laissez tomber les base de données et passez sur un CDN rapide.

Vous aurez du mal à faire machine arrière et de nouvelles possibilités feront leur apparition un peu plus chaque jour.

### Ressources

-   Critiques de générateurs de site statique : Jekyll, Middleman, Roots, Hugo –
    [Smashing
    Magazine](https://www.smashingmagazine.com/2015/11/static-website-generators-jekyll-middleman-roots-hugo-review/)
-   Utilisation d'un générateur de site statique à grande échelle : leçons apprises – [Smashing
    Magazine](https://www.smashingmagazine.com/2016/08/using-a-static-site-generator-at-scale-lessons-learned/)
-   JAMstack pour les clients : bénéfices, CMS pour site statique et limitations –
    [Snipcart](https://snipcart.com/blog/jamstack-clients-static-site-cms)
-   Passez au statique sans perdre votre serveur –
    [Netlify](https://www.netlify.com/blog/2016/03/10/go-static-without-losing-your-server/)
-   C'est quoi un CMS Headless ? –
    [CSS-Tricks](https://css-tricks.com/what-is-a-headless-cms/)
-   Gestionnaires de contenus pour sites statiques –
    [headlesscms.org](https://headlesscms.org/)
-   JAMstack | JavaScript, APIs et Markup –
    [jamstack.org](https://jamstack.org/)
-   Générateurs de site statique open-source –
    [staticgen.com](https://www.staticgen.com/)
-   {static is} The New Dynamic –
    [thenewdynamic.org](https://www.thenewdynamic.org/)

_Article original publié sur [builtvisible.com](https://builtvisible.com/go-static-try-jamstack/)_
