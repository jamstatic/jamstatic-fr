---
title: "Meetup Jamstack Toulouse"
description: "Deux présentations de Netlify et Algolia lors premier meetup Jamstack en France."
date: 2018-03-17T09:24:53+01:00
author: frank
categories:
  - meetup
  - algolia
  - netlify
images:
  - https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/w_1200,c_fit,co_white,g_north_west,x_80,y_80,l_text:poppins_80_ultrabold_line_spacing_-30:Meetup%20Jamstack%20Toulouse%20avec%20Netlify%20et%20Algolia/jamstatic/twitter-card.png
---

{{< intro >}}

Ce premier meetup Jamstack français a été l’occasion d’accueillir Netlify et
Algolia, deux acteurs incontournables du mouvement. Les deux start-ups sont
maintenant devenues des références dans leur domaine, l’une pour le déploiement
d’applications web servies en statique, l’autre comme service de recherche
embarquée. Au programme deux présentations de Phil Hawksworth et Martyn Davies
toutes deux axées sur la _developer experience_ et les bénéfices apportés par
ces deux services de qualité.

{{< /intro >}}

---

{{< figure src="https://res.cloudinary.com/jamstatic/image/upload/dpr_2.0,f_auto,q_auto/v1523347003/jamstatic/thefrontisback.jpg"
caption="The Front is back !" attr="Photo : Nicolas Manaud"
attrlink="https://twitter.com/nmanaud/status/974957331279695872" >}}

Lors de l’introduction, j'ai rapidement rappelé comment nous en sommes arrivés à
ces workflows de déploiement et comment ils permettent aux développeurs
front-end de reprendre la main sur ce qui est produit en sortie, puisqu'ils sont
libres de choisir la solution de templating qui va générer le HTML et qu'ils ne
seront pas contraints par la structure de la base de données d’un CMS. Une vraie
aubaine pour les artisans qui aiment faire les choses bien et se soucient de la
qualité.

## Making platforms promote performance

La présentation de [Phil Hawksworth](https://twitter.com/philhawksworth),
developer relation chez Netlify, n'était pas aussi austère que le titre aurait
pu le laisser penser. En effet Phil est revenu sur les mises en production
stressantes de projets, où faute de workflow automatisé et prédictible, les
équipes vont stresser jusqu'au bout, la prise de risque étant maximale et la
sueur perlera sur le front de la personne chargée d’appuyer sur le bouton rouge.
Personne ne souhaite vivre de telles expériences.

<figure>
{{< youtube dphhk_7eqGw >}}
<figcaption><p>Phil Hawksworth - Deploy early, deploy often</p></figcaption>
</figure>

Pour s'éviter de tels tracas, autant commencer par s'assurer que le déploiement
automatique fonctionne comme il faut en début de projet. Mieux encore, en
versionnant correctement son projet avec Git, en le déployant régulièrement, on
va permettre à tous les intervenants de s'investir et de faire des retours au
plus tôt. C’est la garantie de plus de sérénité pour tout le monde lors du
lancement _officiel_. Et cette façon de travailler est rendue très accessible
par [Netlify](https://netlify.com), nul besoin d’avoir une équipe de devops
chevronnés pour vous aider à mettre en place un tel workflow. En quelques clics
c'est réglé.

Phil a pu observer comment Netlify utilisait Netlify pour développer et
concevoir son application web, servie naturellement elle aussi en statique.
Grâce à la mise en ligne du résultat de la génération du site pour chaque
commit, il a pu remonter aux origines, voir les premiers prototypes et ainsi
parcourir toute la timeline du projet. Si Git permet de faire ce genre de choses
dans un terminal et de voir les différences, les ajouts et les suppressions de
fichiers, Netlify propose la même chose mais sous forme visuelle, vous pouvez
consulter n'importe quelle version du site sur une URL unique basée sur le hash
du commit.

{{< figure src="https://res.cloudinary.com/jamstatic/image/upload/dpr_2.0,f_auto,q_auto/jamstatic/netlify-prototype.png"
caption="Les premiers prototypes du site de Netlify sont encore accessibles en ligne" >}}

Un webdesigner pourra dès alors présenter une nouvelle itération sur le design
du site en ouvrant une pull request sur GitHub et en retour toutes les parties
prenantes pourront consulter une version utilisable du site en ligne. Il est
même possible de comparer comment différentes versions d’un design performent
grâce au [split-testing](https://www.youtube.com/watch?v=5VgpJJUOng4).

Pour faire face à l’accélération et à l’exigeance technique croissante en termes
de développement, il est bon de pouvoir déléguer des tâches aussi hardues que le
déploiement continu à ceux dont c'est le métier.

## Ajouter une recherche sur un site statique

<figure>
{{< youtube mnySRW94NL4 >}}
<figcaption><p>Martyn davies - Adding search to your stack</p></figcaption>
</figure>

[Martyn Davies](https://twitter.com/martynd), nouvellement arrivé chez
[Algolia](https://algolia.com), est venu nous montrer comment ajouter une
recherche performante sur un site généré en statique. Pari réussi puisqu'à la
fin de la présentation, son site généré avec [Jekyll](/categories/jekyll)
disposait d’un champ de recherche avec autocomplétion sur des attributs qu'il
avait lui-même défini et affichait des résultats de manière quasi-immédiate à
chaque touche tapée sur le clavier.

C’est toujours bluffant de voir à quel point l’intégration de tels services a
été pensée pour être la plus simple possible pour les développeurs. Dans cet
exemple, Martyn a utilisé le plugin
[jekyll-algolia](https://github.com/algolia/jekyll-algolia) développé par
[Tim Carry](https://twitter.com/pixelastic), passé ingénieur open-source à plein
temps chez Algolia.

Dans un premier temps, on va déclarer le plugin dans Jekyll, puis après avoir
créé un compte sur le site d’Algolia ainsi qu'un premier projet, on va récupérer
une clef d’API et un nom d’index de recherche qu'on va reporter dans les
paramètres de configuration du plugin. On est sur du _Copier-Coller driven
development_.

Une fois que c'est fait, on va créer un modèle de page pour la recherche, qui
fera appel à un script JS et à une feuille de style hébergés par Algolia sur un
CDN. Puis on va ajouter des widgets de recherche et personnaliser leur
configuration. Après quelques aller-retours entre
[les exemples documentés sur le site d’Algolia](https://www.algolia.com/doc/tutorials/search-ui/instant-search/build-an-instant-search-results-page/instantsearchjs/#binding-the-search-input)
et le template de recherche pour Jekyll, ainsi que quelques ajustements des
attributs à indexer et à retourner dans l’interface d’administration d’Algolia,
le site d’exemple disposait d’une recherche instantanée. À tel point que Phil a
demandé s’il y avait vraiment des appels à l’API d’Algolia pour retourner les
résultats aussi vite ou si c'était un cache en local. Martyn a répondu par
l’affirmative, en souriant devant l’incrédulité de son homologue.

## Une chouette soirée

Deux présentations rondemment menées donc, qui ont été
[bien appréciées par les personnes présentes](https://twitter.com/nmanaud/status/974957331279695872).

Maxime Thirouin le développeur de [~~Phenomic~~](https://phenomic.io/) a bien envie
de développer à son tour un plugin Algolia après la présentation de Martyn. Il
pourra pour cela se baser sur le
[code source ouvert](https://github.com/chrisdmacrae/atomic-algolia) du paquet
[atomic-algolia](https://www.npmjs.com/package/atomic-algolia) développé par
Chris Macrae de Forestry. C’est beau l’open source.

Nous espérons que ces deux présentations auront donné envie aux développeurs
front-end d’utiliser des workflows et des outils matures et qu'ils auront bien
compris qu'on peut faire des choses dynamiques avec des sites versionnés servis
en statique en s'affranchissant de la gestion de serveur de base de données. Et
si c'est toujours pas clair, nous ferons d’autres meetups. :)

Et grâce au soutien de
[Front-Commerce](https://www.front-commerce.com/en/home/), un front-end JS qui
communique avec des APIS e-commerce, nous publierons les vidéos des deux
présentations d’ici quelques semaines, merci à eux !
