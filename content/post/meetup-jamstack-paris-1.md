---
title: "Meetup JAMstack Paris #1"
date: 2019-01-28T18:45:24+01:00
description: "Résumé des deux présentations dédiées à Gatsby."
categories:
  - gatsby
  - meetup
images:
  - https://i.ytimg.com/vi/xLQ4to7Ubn0/sddefault.jpg
---

{{< intro >}}
Au programme du premier meetup JAMstack Paris, un retour d'expérience sur la migration d'un site Angular vers Gatsby, et un exemple de développement en live d'un plugin Gatsby. [Les vidéos sont en ligne](https://www.youtube.com/channel/UC66eQOycjMnaqzpbRUhEK2w).
{{< /intro >}}

---

Dans la première présentation, [Louis Lafont](https://twitter.com/dot_louis), développeur front-end chez [MonBanquet](https://monbanquet.fr/), présente la stack qu'il a choisi pour la refonte du site, à savoir [Gatsby](https://gatsbyjs.org) pour la partie front, [Contentful](https://www.contentful.com/) pour la gestion de contenu et [Netlify](https://www.netlify.com/) pour héberger le tout.

Il aura fallu près de deux mois à Louis pour mener à bien cette tâche et apprécier la _developer experience_ offerte par Gatsby. Au final grâce notamment au plugin [gatsby-image](https://using-gatsby-image.gatsbyjs.org/), la PWA générée est bien entendu beaucoup plus rapide, le _Time to Interactive_ est passé sous les deux secondes. Autre gain appréciable, la prise en main rapide de Contentful par l'équipe marketing chargée de la mise à jour des contenus. Tout le monde a gagné en confort d'utilisation, en autonomie et en productivité.

Et le tout pour la modique somme de **zéro euro** 😲, puisque Gatsby et ses plugins sont sous license open source, et que pour le moment le volume de données consommé ne génère aucun frais d'abonnement aux différentes plate-formes Saas. Le pricing est une bénédiction pour les startups.

Tous le monde est ravi, la prochaine étape sera de s'attaquer à l'authentification utilisateur et d'ajouter un gestion de panier 💳 e-commerce.

<figure>{{< youtube xLQ4to7Ubn0 >}}</figure>

---

Pour la deuxième présentation, [Nicolas Goutay](https://twitter.com/Phacks), évangéliste performance web chez Theodo, se propose ni plus ni moins de développer un plugin Gatsby en direct. Nicolas avait déjà testé Gatsby sur [un projet qui liste les théâtres parisiens](https://github.com/phacks/theatres-parisiens).

Grand amateur de disques vinyles, Nicolas comme tout bon nerd a enregistré sa collection dans [Discogs](https://www.discogs.com/), qui propose une API pour récupérer les releases. Problème, le nombre d'appel est très limité, et [son premier mockup](https://phacks.github.io/showcase-for-discogs/), ne peut même pas afficher la totalité de sa collection, voire rien du tout si le nombre d'appel à la minute est déjà atteint. Pas glop.

L'application récupére les références des _releases_ sur Discogs pour pouvoir ensuite générer une tracklist de chaque album via l'API de YouTube. Pour contourner la limitation de Discogs, Nicolas a donc eu l'idée d'utiliser Gatsby et de générer son application au build, quitte a espacer les appels à l'API pour pouvoir tout récupérer. Pour cela il a donc développé [un plugin Gatsby source](https://www.gatsbyjs.org/docs/create-source-plugin/), qui va lui permettre de créer facilement des noeuds, qui pourront être ensuite requêter dans GraphQL. La démo permet d'apprécier encore une fois la _developer experience_ offerte par Gatsby, avec notamment une gestion automatique de la documentation de tous les attributs des noeuds.

<figure>{{< youtube 7pbFDBXiuAA >}}</figure>

---

👏 Un grand bravo aux organisateurs, le [prochain meetup aura lieu le 27 février](https://www.meetup.com/fr-FR/JAMstack-paris/events/257983707/).
Au programme encore du Gatsby, cette fois avec du Algolia et du WordPress dedans.

On espère voir toujours plus de retours d'expérience, pas forcément que sur Gatsby, même si les frameworks front-end sont devenus en quelques années le nouveau standard de facto. En tout cas ça fait rudement plaisir de voir que la communauté francophone se fédère, nul doute que ce genre d'évènement contribuera à inciter à l'adoption d'architectures décentralisées.
