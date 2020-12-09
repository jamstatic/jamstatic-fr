---
title: "Les startups de l’écosystème Jamstack"
description: "Les capital risqueurs de la Silicon Valley misent sur les startups qui forment l'écosytème de la Jamstack."
date: 2018-05-31T20:21:08+02:00
categories:
  - jamstack
images:
  - https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/w_1200,c_fit,co_white,g_north_west,x_80,y_120,l_text:poppins_80_ultrabold_line_spacing_-30:Les%20startups%20de%20l%E2%80%99%C3%A9cosyst%C3%A8me%20Jamstack/jamstatic/twitter-card.png
source:
  author: "CRV"
  title: "The Jamstack Startup Landscape"
  url: "https://medium.com/@CRVVC/the-jamstack-startup-landscape-c06cc3cdb917"
---

{{< intro >}}

Devant la tendance croissante de l'adoption d'outils et de services web modernes
pour gérer les sites ou les applications web, les investisseurs de la Silicon
Valley misent assez tôt sur les startups issus de cet écosystème : Netlify,
Algolia, Contentful et plus récemment Gatsby ont tous levé quelques millions de
dollars pour les aider dans leur développement. Et ce n'est que le début, les
annonces de financement devraient se poursuivre dans les prochains mois.

{{< /intro >}}

---

Dans cet article [CRV](https://www.crv.com/) montre une vue d'ensemble du
résultat de plusieurs tendances qui ont permis l'émergence d'une nouvelle
architecture frontend et par conséquence d'un écosystème fertile de
startups.

La manière dont les sites web et les applications sont développés est en train
de prendre un tournant architectural important — que ce soit les outils utilisés
par les développeurs pour les construire ou l'UI/UX proposée aux utilisateurs
finaux. C'est une véritable révolution qui est en train de chambouler le monde
du développement d'applications.

## Pourquoi maintenant ?

**L'explosion de JavaScript** :
JS est devenu tellement puissant, avec un haut niveau d'abstraction il permet le
développement d'applications plus interactives, plus rapides et l'amélioration
de l'expérience de l'utilisateur final.

**La prolifération des APIs** :
des microservices pour le backend à la popularité grandissante de
[GraphQL](https://graphql.org/) et aux frontends librement couplés, les APIs
sont un élément central du changement architectural auquel nous assistons.

**Davantage de développeurs** :
le nombre grandissant de développeurs et la réduction du niveau de compétences
moyen dans l'industrie. Tout cela fait qu'il y a beaucoup plus de développeurs
qui ont envie d'apprendre et de se former à de nouveaux outils.

**L'essor de Git** :
les processus basés sur Git sont désormais au cœur de la collaboration entre
développeurs et du versionnement de projet.

**Les progrès des infrastructures du Cloud** :
la réduction des coûts de fonctionnement, les architectures _serverless_ et un
outillage plus complet permettent aux développeurs de se concentrer sur le
design et le développement de l'interface client et de bâtir de façon plus
efficace des applications plus performantes.

Quelle que soit votre idéologie — les clients lourds/légers, les Single Page
Applications (SPA) avec rendu côté serveur, les sites dynamiques/statiques — la
manière dont la partie cliente est développée est en train de changer

## L'histoire de la Jamstack

Les sites dynamiques ont pris le pas sur les sites statiques, car ils
proposaient plus d'interactivité et de personnalisation, cela n'allait pas sans
problèmes de performance, de sécurité et s'accompagnait de coûts de
fonctionnement élevés. Avec les navigateurs web modernes, les enseignements
tirés du développement d'application mobile, les offres de cloud public arrivées
enfin à maturité, l'interactivité d'HTML5 couplé à JavaScript et à des APIs
comme [Disqus](https://disqus.com/) ou [Algolia](https://www.algolia.com/), nous
avons l'opportunité de revenir à la simplicité des sites web statiques. Pour
faire passer le message aux développeurs, des gens comme Matt Biilmann, le
créateur et le CEO de [Netlify](https://netlify.com/), ont diffusé le concept de
la Jamstack: une approche différente, _serverless_ pour développer des sites web
modernes et performants. JAM signifie JavaScript, APIs et Markup et l'idée
centrale est de ne plus avoir à gérer ses propres serveurs, d'héberger le code
sur des CDNs rapides, fiables et sécurisés et de faire interagir les navigateurs
avec les APIs qui peuvent s'occuper des composants « dynamiques ». La Jamstack
personnifie toutes les tendances soulignées plus haut.

## Le paysage de la Jamstack

Cette image illustre le paysage florissant des startups avec quelques projets
open source et des membres clés de la communauté, qui profitent des tendances
mentionnées plus haut.

{{< figure src="https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1527850625/jamstatic/jamstack-landscape.png" >}}

## Les bénéfices

Il en résulte des sites plus sécurisés, des déploiements et des temps de
chargement plus rapides, moins onéreux et plus faciles à gérer. Ça a l'air trop
beau pour être vrai ? Contrairement à la stack LAMP, il n'y a pas de base de
données dans la Jamstack, donc moins d'appels aux backend et une surface
d'attaque réduite. Les sites web (comme ceux développés avec WordPress) ont
particulièrement été la cible d'attaques malveillantes, mais en l'absence de
base de données et de plugins, les menaces sont considérablement réduites.

Le découplage de la partie client de la partie serveur permet également aux
développeurs de se connecter aux meilleures APIs tierces comme celle d'Algolia
pour la recherche par exemple. La partie CMS reste critique et des CMS headless
(ou API-first comme [Contentful](https://www.contentful.com/) or
[Tipe](https://tipe.io/)) permettent plus de collaboration entre le design, le
marketing et les développeurs. Avec un process de travail basé sur Git, il est
bien plus simple de mettre à jour un site ou une application, on peut déployer à
partir de GitHub, s'assurer que le contenu est à jour, revenir à une version
précédente et identifier l'origine des anomalies.

## Et ensuite ?

Permettre **une meilleure collaboration** entre toutes les parties prenantes du
frontend — les créateurs de contenus, les gens du marketing, du design et du
développement. _« Les développeurs détestent avoir à créer et éditer du texte,
les créateurs de contenu détestent devoir passer par les développeurs pour
apporter des modifications simples »_ — Scott Moss, CEO de
[Tipe](https://tipe.io/).

La **conception d'interface basée sur des composants** est en pleine expansion,
l'utilisation de [Storybook](https://storybook.js.org/) décolle (10% des
téléchargements React) et les composants réutilisables vont accélérer la vitesse
de développement, en particulier celle des équipes. « L'adoption de React, Vue et
Angular s'accompagne d'un changement de paradigme vers le développement basé sur
des composants et Storybook est au cœur de ce mouvement » — Zoltan Olah, CEO de
[Chroma](https://www.chromaticqa.com/).

**Des services pour le frontend** : des plate-formes comme [Vercel](https://vercel.com/)
et Netlify sont en train d'émerger, elles permettent de s'affranchir du temps et
de la difficulté des différents processus de génération de site, de compilation
des assets, de déploiement et de publication continue sur les serveurs
d'hébergement.

**L'Edge Computing** ouvre tant de nouvelles manières de concevoir des
applications. Une fois que vous avez accès à du stockage performant à la
périphérie du réseau, vous allez pouvoir facilement segmenter et personnaliser
le trafic, gérer le contenu, en devant rarement aller taper sur le serveur
d'origine ce qui vous permettra d'avoir des applications plus rapides.

## Conclusion

Les tendances du développement frontend et le changement architectural qui en
résulte est très prometteur pour l'écosystème des startups et des
capital-risqueurs. [CRV](https://www.crv.com/) aime prendre des risques au plus
tôt, et a déjà investi dans 6 startups qui font partie du paysage de la Jamstack
(dont 3 qui seront annoncées publiquement très bientôt). Si vous êtes un
créateur de startup lié à cet écosystème, un investisseur ou que vous voulez
simplement papoter, écrivez à reid@crv.com.
