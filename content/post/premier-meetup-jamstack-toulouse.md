---
title: "Meetup JAMstack Toulouse #1"
date: 2018-03-17T09:24:53+01:00
description: "Deux très bonnes présentations de Netlify et Alogilia au premier meetup JAMStack français."
author: Frank Taillandier
images:
  - /assets/images/2018/03/phil-meetup-jamstack.jpg
---

{{% intro %}}
  Ce premier meetup JAMstack français a été l'occasion d'accueillir Netlify et Algolia, deux acteurs incontournables du mouvement. Les deux start-ups sont maintenant devenues des références dans leur domaine, l'une pour le déploiement d'applications web servies en statique, l'autre comme service de recherche embarquée. Au programme deux présentations de Phil Hawksworth et Martyn Davies toutes deux axées sur la _developer experience_ et les bénéfices apportés par ces deux services de qualité.
{{% /intro %}}

## Making platforms promote performance

La présentation de [Phil Hawksworth](https://twitter.com/philhawksworth), developer relation chez Netlify, n'était pas aussi austère que le titre aurait pu le laisser penser. En effet Phil est revenu sur les mises en production stressantes de projets, où faute de workflow automatisé et prédictible, les équipes vont stresser jusqu'au bout, la prise de risque étant maximale et la sueur perlera sur le front de la personne chargée d'appuyer sur le bouton rouge. Personne ne souhaite vivre de telles expériences.

Pour s'éviter de tels tracas, autant commencer par s'assurer que le déploiement automatique fonctionne comme il faut en début de projet. Mieux encore, en versionnant correctement son projet avec Git, en le déployant régulièrement, on va permettre à tous les intervenants de s'investir et de faire des retours au plus tôt. C'est la garantie de plus de sérénité pour tout le monde lors du lancement _officiel_. Et cette façon de travailler est rendue très accessible par [Netlify](https://netlify.com), nul besoin d'avoir une équipe de devops chevronnés pour vous aider à mettre en place un tel workflow. En quelques clics c'est réglé.

Phil a pu observé comment Netlify utilisait Netlify pour développer et concevoir son application web, servie naturellement elle aussi en statique. Grâce au à la mise à disposition du résultat de la génération du site pour chaque commit, il a pu remonter aux origines, voir les premiers prototoypes et ainsi parcourir toute la timeline du projet. Si Git permet de faire ce genre de choses dans un terminal et de voir les différences, les ajouts et les suppressions de fichiers, Netlify propose la même chose mais sous forme visuelle, vous pouvez consulter n'importe quelle version du site sur une URL unique basée sur le hash du commit.

{{< figure src="/assets/images/2018/03/netlify-prototype.png" caption="Les premiers prototypes du site de Netlify sont encore accessibles en ligne" attr="" attrlink="" >}}

Un webdesigner pourra dès alors présenter une nouvelle itération sur le design du site en ouvrant une pull request sur GitHub et en retour toutes les parties prenantes pourront consulter une version utilisable du site en ligne. Il est même possible de comparer comment différentes versions d'un design performent grâce au split-testing.

Pour faire face à l'accélération et à l'exigeance croissante en terme de développement, il est bon de pouvoir déléguer des tâches aussi hardues que le déploiement continu à ceux dont c'est le métier.

## Ajouter une recherche sur un site statique

[Martyn Davies](https://twitter.com/martynd), nouvellement arrivé chez [Algolia](https://algolia.com), est venu nous montrer comment ajouter une recherche performante sur un site généré en statique. Pari réussi puisqu'à la fin de la présentation, son site généré avec [Jekyll](/categories/jekyll) disposait d'un champ de recherche avec autocomplétion sur des attributs qu'il avait lui même défini et affichait des résultats de manière quasi-immédiate à chaque touche tapée sur le clavier.

C'est toujours bluffant de voir à quel point l'intégration de tels services a été pensée pour être la plus simple possible pour les développeurs. Dans cet exemple, Martyn a utilisé le plugin [jekyll-algolia](https://github.com/algolia/jekyll-algolia) développé par Tim Carry, passé ingénieur open-source à plein temps chez Algolia.

Dans un premier temps, on va déclarer le plugin dans Jekyll, puis après avoir crée un compte sur Algolia ainsi qu'un premier projet, on va récupérer une clef d'API et un nom d'index de recherche qu'on va reporter dans les paramètres de configuration du plugin. Copier-Coller driven development.

Une fois que c'est fait, on va créer un modèle de page pour la recherche, qui fera appel à un script JS et à une feuille de style fournis par Algolia. Puis on va ajouter des widgets de recherche et personnaliser leur configuration. Après quelques aller-retours entre [les exemples documentés sur le site d'Algolia](https://www.algolia.com/doc/tutorials/search-ui/instant-search/build-an-instant-search-results-page/instantsearchjs/#binding-the-search-input) et le template de recherche pour Jekyll, ainsi que quelques ajustements sur les attributs à indexer et à retourner dans le dashboard Algolia, le site d'exemple disposait d'une recherche instantanée. À tel point que Phil a demandé s’il y avait vraiment des appels à l'API d'Algolia pour retourner les résultats aussi vite ou si c'était un cache en local. Martyn a répondu par l'affirmative, en souriant devant l'incrédulité de son homologue.

## Une chouette soirée

Deux présentations rondemment menées donc, qui ont été bien appréciées par les personnes présentes. Maxime Thirouin le développeur de [Phenomic](https://phenomic.io/) a bien envie de développer à son tour un plugin Algolia après la présentation de Martyn. Il pourra pour cela se baser sur le [code source ouvert](https://github.com/chrisdmacrae/atomic-algolia) du paquet [atomic-algolia](https://www.npmjs.com/package/atomic-algolia) développé par Chris Macrae de Forestry.

Nous espérons que ces deux présentations auront donné envie aux développeurs front-end d'utiliser des workflows et des outils matures et qu'ils auront bien compris qu'on peut faire des choses dynamiques avec des sites versionnés servis en statique en s'affranchissant de la gestion de serveur de base de données. Et si c'est toujours pas clair, nous ferons d'autres meetups :)

Et grâce au soutien de [Front-Commerce](https://www.front-commerce.com/en/home/), un front-end JS qui communique avec des APIS e-commerce, nous publierons les vidéos des deux présentations d'ici quelques semaines, merci à eux !
