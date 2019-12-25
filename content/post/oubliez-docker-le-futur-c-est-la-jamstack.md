---
title: "Oubliez Docker, le futur c'est la JAMstack"
date: 2018-12-07T01:21:13+01:00
lastmod: 2018-01-26T01:09:11+01:00
description: À l'heure où les entreprises se débattent pour devenir plus agiles et rester pertinentes, elles peuvent compter sur les dernières évolutions des technologies.
categories:
  - jamstack
images:
  - https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1548402220/jamstatic/1_uD1IkSE1cwF1Yr_njKu9qA.png
source:
  author: "Mike Carlisle"
  title: "Forget Docker, the future is JAMstack"
  url: "https://hackernoon.com/forget-docker-the-future-is-jamstack-aae5bcaf4616"
---

{{< intro >}}
La popularité croissante des architectures décentralisées s'explique par l'évolution de l'offre de services disponibles. Que ce soit pour héberger du code source, gérer ses contenus, fournir une authentification, une gestion des paiements, etc. faire appel à des services distants fait de plus en plus sens pour les entreprises dont l'informatique n'est pas le coeur de métier mais simplement un moyen de fournir un service à leurs clients.
{{< /intro >}}

---

À l'heure où les entreprises se débattent pour devenir plus agiles et rester
pertinentes, elles peuvent compter sur les dernières évolutions des
technologies. Oubliez Docker, JAMstack marque la prochaine évolution du
développement web moderne.

JAMstack c'est pour JavaScript, APis et Markup. C'est la merveilleuse union de
technologies modernes, du logiciel _as a service_ et des langages au coeur des
fondations du web. Cette stack procure :

- une réduction des coûts,
- une mise sur le marché plus rapide,
- une sécurité accrue,
- plus de fiabilité, de disponibilité, et une meilleure adaptation à la montée en charge,
- une réduction de la dépendance à des technologies propriétaires.

Les technologies comme Docker vont continuer à jouer un rôle primordial dans le
futur du numérique, mais elles devraient devenir de plus en plus transparentes
pour la majorité des entreprises et seront utilisées sans que vous le sachiez.
Le fait de devoir gérer et maintenir soi-même sa propre infrastructure
appartiendra bientôt au passé.

Si votre coeur de métier n'est pas de fournir des services dans le Cloud, cet
article vous explique pourquoi la JAMstack devrait devenir votre première
préoccupation si vous tenez à fournir un avantage stratégique et une agilité
accrue à la majorité de vos activités en ligne.

### La JAMstack ?

La JAMstack c'est en partie du JavaScript et du code généré qui peuvent être
hébergés en statique n'importe où. Elle est parfaitement complémentaire avec les
technologies serverless et peut faire appel à des fonctions serverless exécutées
dans le Cloud. Les serveurs d'applications traditionnelles sont en passe d'être
totalement superflus, en leur lieu et place une bonne partie de la complexité
est résolue lors de l'étape de génération à l'aide de l'outillage fourni par
entre autres par JavaScript.

Des générateurs de site statiques comme Next.js ou Gatsby sont souvent utilisés
pour combler le besoin de faire du rendu côté serveur. Ces outils s'intègrent
parfaitement avec des services du Cloud pendant l'étape de génération et
produisent en sortie une application complète composée de pages pré-rendues. Par
exemple, ces outils peuvent récupérer des contenus stockés dans un CMS headless
et générer l'ensemble de votre site sous forme de pages statiques en quelques
secondes. Un instantané immuable de toutes ces pages peut alors être déployé en
production et distribué partout dans le monde.

Il est possible de déclencher des modifications à partir de n'importe quel
service en aval grâce à des webhooks et de générer une nouvelle version en
quelques secondes après avoir récupéré le contenu mis à jour.

Bien que les applications JAMstack soient hébergées de manière statique, cela ne
veut pas dire qu'elles n'en sont pas moins dynamiques ou interactives que des
pages dont le rendu est effectué côté serveur. Ces applications peuvent être
conçues pour interagir avec des APIs web côté client et peuvent fournir du
contenu dynamique et de l'interactivité comme n'importe quelle application
classique. On peut toujours authentifier des utilisateurs et enrichir les pages
progressivement en fonctionnalités.

Des fonctions exécutées depuis le Cloud peuvent fournir des capacités de
services additionnelles au besoin, et peuvent être elles aussi être écrites en
JavaScript.

![Exemple d'architecure JAMstack](https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1548402220/jamstatic/1_uD1IkSE1cwF1Yr_njKu9qA.png)

### Pourquoi la JAMstack ?

Un application JAMstack réduit les dépendances nécessaires lors de l'exécution
pour des performances, une fiabilité, une capacité de montée en charge et une
sécurité maximales. En effet comme elles n'ont pas besoin de serveurs
d'application dédiés pour servir les pages, cela réduit considérablement la
surface d'attaque possible. Le contenu statique est extrêmement facile à mettre
en cache et à distribuer via un fournisseur d'accès au Cloud. Vous ne dépendez
pas d'un fournisseur en particulier.

Les entreprises peuvent développer des solutions à l'aide de la JAMstack pour se
lancer plus rapidement sur le marché et ce à moindre coût. C'est dû au fait
qu'il y a besoin de beaucoup moins de ressources pour gérer et maintenir
l'application en production et en développement. Une petite équipe agile
multi-disciplinaire aura seulement besoin d'être en capacité de livrer du HTML,
du CSS et du JavaScript. Pas besoin d'avoir beaucoup d'autres compétences quand
il s'agit de publier pour le web.

Dans les applications traditionnelles, les mises à jour de dépendances se font
généralement sur le serveur. Cela augment le risque d'interruption. Avec la
JAMstack comme tout se fait en aval, il y a beaucoup moins de chances que
quelque chose puisse impacter les utilisateurs finaux — et encore moins si les
générations sont testées automatiquement avant la mise en production.

La JAMStack sur repose sur les services dans le Cloud pour l'extension de
fonctionnalités. Elle suit la tendance du développement JavaScript full-stack
facilité par des outils comme React et les offres de "functions as a service" du
Cloud. Fini les serveurs d'applications et les systèmes monolithiques avec des
bases de données SQL. Plus besoin d'une infrastructure disponible en permanence
pour effectuer du rendu côté serveur à l'aide de langages compilés comme Java ou
.NET.

Une architecture JAMstack n'est jamais aussi performante que lorsqu'elle utilise
les services d'un hébergeur spécialisé comme Netlify. Netlify est une
plate-forme complète de Cloud pour les architectures JAMstack, qui se connecte
directement à votre dépôt de code. Chaque sauvegarde permet d'à la fois
versionner et déployer votre application et ses fonctions de support dans le
Cloud sur votre environnement de production en quelques secondes.

Netlify déploie vos applications sur son réseau global de CDN pour une
performance optimale et propose également d'autres fonctionnalités à forte
valeur ajoutée, que vous auriez dû autrement développé ou configurer vous-mêmes.

### Verrou logiciel

Beaucoup d'entreprises utilisent des logiciels tiers qu'elles hébergent
elles-mêmes, ces logiciels demandent d'avoir des équipes importantes chargées de
leur développement, de leur déploiement et de leur maintenance, avant même que
vous n'ayez songé à développeur votre application. Parfois les deux sont
indissociables et cela augmente considérablement les compétences minimales
requises dont vous auriez normalement besoin pour développer votre application.

Les systèmes de gestion de contenu (CMS) en sont un parfait exemple. Quand ces
fonctionnalités ne sont pas au coeur de votre activité, aujourd'hui cela n'a
plus aucun sens d'investir du temps et des ressource spécialisées pour leur
maintenance, leur disponibilité et leur support. Ce fut pendant longtemps la
seule option disponible et un sacrifice à consentir pour essayer de tirer parti
de la valeur ajoutée que ces outils pouvaient vous procurer en retour.

Depuis les offres de services ont évolué et les solutions adaptatives du Cloud
entièrement gérées et maintenues pour une fraction du prix ont changé la donne.
Prismic et Contentful sont des exemples de solutions de CMS découplés qui
offrent des APIs web hautement interopérables. Plus besoin des compétences d'un
expert maison, ces services s'intègrent facilement à une architecture JAMstack,
quelle que soit la technologie choisie.

Sur le même principe, presque n'importe quelle fonctionnalité peut être lancée
ou générée par des services offerts par le Cloud. Cela inclut des serices
d'intégration et de déploiement continus qui peuvent être déclenchés à la
demande. Dans la plupart des cas, il n'y a plus besoin d'héberger et de gérer
vos propres serveurs qu'ils soient chez vous ou dans le Cloud.

### Commodités logicielles

Étant donnée que les offres Saas (_Software as a service_) transforment les
produits en services dans le Cloud, les entreprises doivent repenser leur
stratégie pour rester agiles.

Il est critique pour une entreprise de comprendre l'offre actuelle et de faire
appels à ces services distants lorsque c'est possible de façon à réduire ses
coûts et éviter de fournir un effort inutile en reproduisant ces infrastructures
disponibles partout en interne à un coût plus important.

Les commodités, c'est quand des produits sont disponibles à grande échelle, en importante quantité et qu'ils sont hautement standardisés. Les commodités répondent à un but très précis et évoluent au fil du temps à travers les répliques et les affinements d'un produit.

Ici le terme commodité fait référence à [la technique de cartographie de Wardley](https://medium.com/wardleymaps) et décrit la façon dont les produits évoluent : de leur genèse à des solutions sur mesure, puis à des produits et enfin à des commodités. Parmi les composants de la topologie d'un business qui favorisent l'évolution des process, et en fonction de leur valeur pour le client, vous pouvez établir une stratégie et décider sur quoi votre entreprise doit porter ses efforts afin de vous focaliser uniquement sur votre canal de vente.

Avec la JAMstack, on tire parti des services du Cloud comme suit :

- hébergement de fichiers statiques plutôt que des serveurs d'application,
- intégration et déploiement dans le Cloud plutôt que chez soi en fonction de ses capacités,
- partenaires Saas plutôt que des produits tiers hébergés en interne,
- fonctions déclenchées à la demande dans le Cloud plutôt que sur des serveurs qui tournent en permanence,
- des développeurs JavaScript full-stack plutôt que des compétences et des langages variés.

### En résumé

Les technologies comme Docker sont au coeur des infrastructures modernes. Elles
simplifient le provisionnement de ressources de manière très consistante et très
fiable.

Toutefois, à moins que vous soyez un expert qui fournit des services dans le
Cloud, se focaliser sur l'infrastructure ne fait plus sens.

Une grande partie de la complexité de l'infrastructure de développement d'un
produit interne provient de dépendances lourdes comme celles à des systèmes de
gestion de contenu. Pendant longtemps il a fallu héberger des logiciels tiers,
les configurer pour qu'ils soient tout le temps disponibles, et posséder des
compétences variées pour développer et maintenir l'ensemble. Cela pousse les
entreprises à s'engouffrer dans de faux problèmes en se focalisant sur
l'infrastructure et le déploiement, plutôt que de se défaire de ces dépendances
qui peuvent s'avérer douloureuses à gérer.

La JAMstack propose un modèle d'architecture efficace pour remplacer l'approche
traditionnelle du développement web et permet à une petit équipe agile d'adopter
un bon rythme. Plus besoin de se préoccuper de l'infrastructure et des serveurs.
Elle encourage également l'intégration d'autres offres SaaS qui fournissent des
APIs interopérables et s'affranchit des systèmes

La JAMstack rend les mises à jour, le support et le redimensionnement de ses
applications trivial. C'est l'assurance d'une agilité accrue et d'un lancement
sur le marché plus rapide, avec de meilleures performances. Le monde de
l'entreprise bouge lentement et ceux qui pourront s'adapter en tireront un
avantage compétitif.
