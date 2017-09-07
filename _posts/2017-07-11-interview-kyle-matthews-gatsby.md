---
title: Questions au créateur de Gatsby
date: 2017-07-11 00:00:00 +02:00
description: Entretien avec Kyle Mathews, le créateur de Gatsby, un générateur de
  site statique basé sur React
image: "/assets/images/gatsby/architecture.png"
source:
  title: Q&A with Kyle Mathews, Creator of React-Based Static Site Generator Gatsby
  url: https://www.infoq.com/news/2017/07/gatsby-kyle-mathews-interview
  author: David Iffland
---

Après deux ans de développement, Gatsby vient de passer en version 1.0. Ce
générateur intègre beaucoup d'outils notamment React et GraphQL et permet déjà
d'interagir avec les versions headless des CMS Wordpress et Drupal. InfoQ vient
de publier une interview de son créateur, Kyle Mathews, plus motivé que jamais
pour continuer à faire évoluer ce générateur, qui devrait connaître une
popularité grandissante. Nous en publions ici la retranscription en français,
car nous pensons que Gatsby devrait séduire la communauté JavaScript et devenir
un des outils phares pour développer des applications Web très performantes.
{: .intro }

Après avoir travaillé pour différentes startups, Kyle Mathews a démissioné pour
se consacrer à l'un de ses projets personnels [à temps
plein](https://www.bricolage.io/gatsby-open-source-work/). Ce projet,
[Gatsby](https://www.gatsbyjs.org/), est né de sa volonté de créer un site web
qui lui évite d'avoir à utiliser autre chose que ReactJS.

Entre temps, Gatsby est passé en version 1.0 et s'est étoffé d'un large éventail
d'outils comme un système de plugins, une couche de données traitée lors du
build à l'aide de GraphQL, le support des Progressive Web Apps (PWA). Gatsby
inclut également un utilitaire en ligne de commande et un processus de build
préconfiguré basé sur Babel et Webpack.

Pour illustrer à quel point Gatsby est rapide, Mathews a écrit [un clone
d'Instagram](https://www.gatsbyjs.org/blog/gatsbygram-case-study/) conçu pour
démontrer l'utilisation du [pattern
PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/)
de Google afin d'obtenir le plus tôt possible un affichage des pixels à l'écran.

Cette vitesse est en partie dûe au fait qu'il crée "un rendu HTML statique de
chaque page pour que l'affichage initial soit aussi rapide que possible. À côte
de ça, le téléchargement en arrière-plan réalise le gros du travail",
[explique](https://www.reddit.com/r/javascript/comments/6locuu/announcing_gatsby_100/djwxqyq/)
Mathews.

> Gatsby est bien plus rapide puisque qu'il télécharge en arrière-plan les
> ressources et les transitions du côté client. Beaucoup de gens ont fait la
> remarque que cliquer sur des liens sur un site fait avec Gatsby, c'est comme
> naviguer sur un site en local

{% include_cached figure.html url="/assets/images/gatsby/architecture.png"
description="Vue d'ensemble de Gatsby" %}

Dans une interview à InfoQ, Mathews parle des motivations pour lesquelles il
développe Gastby et de son avenir.

### Quels problèmes Gatsby essaie-t-il de résoudre ?

**Kyle Mathews :**
Gatsby essaie de résoudre la problématique de ce à quoi un framework de site web
devrait ressembler en 2017. La plupart des positions adoptées par les frameworks
web datent des premières générations du Web. Bien que ce soit d'excellents
frameworks matures, ils ne sont pas conçu pour la majorité du web d'aujourd'hui,
dominé par des milliards de personnes qui accèdent au web avec des smartphones
bon marché sur des réseaux peu fiables.

Pour qu'un site web soit rapide sur un smartphone, il doit rester assez
indépendant du serveur, être capable de pré-extraire du code et des données et
d'effectuer le rendu du contenu côté client.

Les smartphones et les navigateurs sont largement assez rapides pour proposer de
bonnes expériences de navigation sur le web - nous sommes juste ralentis par de
vieux frameworks qui assument des connexions filaires, rapides et obligent les
petits super-ordinateurs qui se trouvent dans notre proche d'attendre après des
réseaux cellulaires peu fiables.

Gatsby intègre assez d'intelligence pour s'assurer que les sites se chargent
rapidement et que naviguer sur un site soit visiblement rapide quel que soit
l'état du réseau.

Le design adaptatif a été une première étape importante pour le web mobile mais
nous devons absolument aller vers un modèle d'architecture où les sites sont
rendus côté client et téléchargent le contenu de manière intelligente.

### Comment se positionne Gatsby par rapport aux autres générateurs de sites statiques, qu'ils soient basés sur React ou non ?

**Kyle Mathews :**
Il hérite de tous les bénéfices des générateurs de site statique traditionnels,
à savoir une super performance, une sécurité accrue, un côut de montée en charge
moindre ainsi qu'une meilleure expérience de développement (une migration de
bases de données ça vous rappelle quelque chose ?). La v1 de Gatsby marque une
nouvelle étape pour les générateurs de site statique, en permettant
l'intégration de CMS comme Contentful, Wordpress et Drupal, et en embarquant
tout un tas de fonctionnalités, activées par défaut, qui rendent votre site
rapide dès le début - découpage du code en fonction du chemin demandé, Service
Workers, le support du hors-ligne et bien plus.

Tous les autres générateurs de site statique ne font pas grand chose pour aider
les développeurs à travailler de manière moderne avec CSS et JS. Ils se
contentent de compiler (généralement du Markdown) en HTML et vous laisse le soin
de configurer votre processus de génération d'assets vous-même. Gatsby prend
tout ça en charge par défaut pour vous permettre de développer des sites web
sophistiqués à l'aide des derniers outils et des dernières techniques.

### Quelle longévité peut-on espérer pour Gatsby ?

**Kyle Mathews :**
Gatsby connait un bel essor et est déjà le 4e générateur de site statique après
seulement deux ans. Il y a déjà quelques sites très visibles qui ont été lancé
ou qui sont en cours de développement avec Gatsby. Nous avons récemment dépassé
les 200 contributeurs au niveau du cœur et les 500 000 téléchargements pour
Gatsby. Pour que Gastby continue dans la durée, il va falloir trouver un modèle
économique rentable pour soutenir le développement du cœur de Gatsby et une
solide communauté open-source qui développe et maintienne des modèles et des
intégrations de sources de données.

### Que prévoyez-vous ensuite ?

**Kyle Mathews :**
Mon objectif personnel est de travailler sur comment financer le développement
du cœur de Gatsby. La priorité principale du projet est de proposer de plus en
plus d'intégration avec des APIs, des CMS et des bases de données pour rendre
triviale la migration de sites existants ou de les refaire avec un framework web
moderne. Gatsby est déjà capable de faire tourner en production des sites
sophistiqués et très rapides. La prochaine case à cocher de la liste sera de
s'assurer de rendre aussi trivial l'import de données dans Gatsby - où qu'elles
se trouvent actuellement.

Bien que Gatsby ait bientôt deux ans, le projet en est encore à ses débuts et
beaucoup de parties utiles vont bientôt faire leur arrivée. Le système de
plugins devrait permettre à la communauté de combler les manques et il en existe
déjà plus d'une trentaine qui permettent d'utiliser des technologies comme Sass,
Typescript ou Preact.

Pour en savoir plus, rendez vous sur [le dépôt GitHub](https://github.com/gatsbyjs/gatsby)ou [le site de Gatsby](https://www.gatsbyjs.org/).
