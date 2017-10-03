---
title: Entretien avec Bjørn Erik Pedersen, le développeur principal d'Hugo
date: "2017-10-03 13:45:36 +0200"
description: >
  Bjørn Erik Pedersen répond à nos questions sur Hugo, le gestionnaire de sites
  statiques ultra-rapide.
slug: interview-hugo-lead-developer
image: /assets/images/hugo/hugo-bjorn-erik-pedersen.jpg
---

[Hugo](https://gohugo.io) est rapidement devenu l'un des gestionnaires de sites
statiques les plus populaires comme en attestent ses bientôt [20 000 étoiles sur
GitHub](https://github.com/gohugoio/hugo). C'est dû en partie à sa vitesse de
génération : en effet il ne lui faut qu'une petite milliseconde pour générer une
page. Oui, cela fait 1000 pages à la seconde et c'est plutôt impressionnant je
trouve. Mais ce n'est pas la seule raison qui devrait vous faire adopter Hugo.

Heureusement ce <abbr title="Générateur de sites statiques">GSS</abbr> propose
aussi tout un tas de fonctionnalités comme les contenus imbriqués, les fichiers
partiels, les shortcodes, la gestion de l'<abbr title="internationalisation">i18n</abbr>, les exports personnalisés (JSON,
AMP, epub, Atom, etc.) et bien d'autres… Les nouvelles versions et les
nouveautés se succèdent à un rythme soutenu. Depuis la v0.14, [Bjørn Erik
Pedersen](https://github.com/bep) dirige les développements, il a gentiment
accepté de répondre à nos quesions.

{% include figure.html url="/assets/images/hugo/hugo-bjorn-erik-pedersen.jpg"
description="<a href=\"https://github.com/bep\">Bjørn Erik Pedersen</a>" %}

## Bonjour Bjørn Erik, comment t'es-tu retrouvé impliqué dans Hugo ?

J'ai passé un dimanche à migrer mon [blog](http://bepsays.com/en/) de WordPress à
[Jekyll](https://jekyllrb.com), et quand j'ai eu fini je me suis dit "OK, et
maintenant je fais quoi ?". J'espérais que cela me pousserait à écrire davantage
sur mon blog. Au cours de ce même après-midi je cherchais déjà des
alternatives à Jekyll sur le net et je suis tombé sur Hugo.

J'ai vu des choses que je souhaitais améliorer. Je suis un développeur très
expérimenté mais mes premières lignes de Go avaient pour but d'améliorer la
façon de gérer le livereload des CSS, du JavaScript et des images dans Hugo. Je
crois que ce patch a survécu à tous mes autres changements ultérieurs. À partir
de là j'ai continué à soumettre des _Pull Requests_, motivé en partie par
l'apprentissage d'un nouveau langage mais également encouragé par [Steve
Francia](https://stevefrancia.com/), qui a crée les premières versions d'Hugo.
Il est très bon pour motiver les gens à contribuer à un projet open source.

## Quels problèmes résout Hugo ?

Hugo est une excellente façon de créer et de publier **de nombreux contenus**
sur le web. Nous recevions beaucoup de questions du genre "comment créer un page
unique de présentation de produit" au début. Même si nous savons également très
bien faire cela, ce n'est pas le cas d'utilisation typique.

Comme Gutenberg en son temps, Hugo est un générateur de sites web pour de la
documentation, des livres, des journaux, des magazines, des blogs, etc. C'est
manifeste quand vous voyez les dernières fonctionnalités ajoutées comme les
[sections imbriquées](https://github.com/gohugoio/hugo/releases/tag/v0.22) et
[les contenus relatifs](https://github.com/gohugoio/hugo/releases/tag/v0.27) :
structurez bien votre contenu et trouvez-le facilement.

Nous nous soucions également beaucoup de la typographie et des langues. Hugo est
très utilisé en Chine et au Japon, ce qui nous amène à relever de nouveaux
défis. Le fait de développer avec le langage Go nous aide bien. Deux de ses
créateurs, Ken Thompson et Rob Pike, sont également les créateurs
d'[UTF-8](https://en.wikipedia.org/wiki/UTF-8). J'ai justement passé pas mal de
temps sur le support des guillemets français dans Hugo il y a peu. Forcément
c'est très répandu en France, mais je n'en avais jamais entendu parlé jusqu'ici.

## Comment fait Hugo pour aller si vite ?

Je lis souvent qu'"Hugo est rapide parce qu'il est écrit en Go". C'est en partie
vrai, mais Hugo a doublé sa vitesse deux fois d'affilée dans les dernières
versions, il y a donc d'autres facteurs. Le mot "rapide" figure dans le slogan
d'Hugo depuis le premier jour, donc nous devons faire très attention à celà.

J'essaie de m'amuser à ne pas ajouter de temps supplémentaire lors de l'ajout de
nouvelles fonctionnalités :  Le temps de traitement ajouté par la nouvelle
fonctionnalité doit être compensé par des améliorations dans les fonctionnalités
existantes, et Go joue un rôle vital à ce niveau. C'est mieux et ça va plus vite à
chaque nouvelle version mais ce n'est pas simplement que c'est un langage de
programmation compilé avec un modèle de concurrence simple et une bibliothèque
standard très robuste. C'est aussi grâce à tous les excellents outils fournis
pour créer rapidement des applications performantes : un compilateur rapide, le
support intégré des tests et un analyseur de code très simple d'utilisation.

Les ralentissements de performance surviennent toujours là où on les attend le
moins, vous devez donc faire des tests. Les gains et les pertes de performance
sont dûs à une succession de petits changements au fil du temps. Et la vitesse
compte. Essayez le serveur d'Hugo avec le Livereload et vous verrez par
vous-même.

## Quels sont les sites les plus visibles qui utilisent Hugo&nbsp;?

{% include figure.html
url="https://thenewdynamic.imgix.net/showcase-labs-us-gov-hugo.jpg?w=700"
description="<a href=\"https://labs.usa.gov/\">https://labs.usa.gov/</a>" %}

Parmi les sites que je connais et que j'aime bien il y a
[labs.usa.gov](https://labs.usa.gov/), [netlify.com](https://www.netlify.com),
[cdnplanet.com](https://www.cdnplanet.com/),
[support.balsamiq.com](https://support.balsamiq.com/),
[crossref.org](https://www.crossref.org/),
[1password.com](https://1password.com/), [borisfx.com](http://borisfx.com/),
[Urban Airship Documentation](https://docs.urbanairship.com/).

Il y en a plein d'autres qui arrivent. Par exemple, [Smashing
Magazine](https://www.smashingmagazine.com) a annoncé qu'ils étaient en train de
travailler sur une [refonte entièrement basée sur Hugo]({% post_url
2017-03-17-smashing-mag-va-dix-fois-plus-vite %}).

{% include figure.html
url="https://thenewdynamic.imgix.net/screenshot-smashing-mag-hugo.jpg?w=700"
description="<a
href=\"https://next.smashingmagazine.com\">La nouvelle version de Smashing Magazine</a>" %}

## Comment se porte le projet actuellement ?

Nous avons adopté maintenant un processus de publication plus ou moins
automatisé, je publie donc une nouvelle version à chaque fois que je peux écrire
un titre et une note de version à partir des nouveautés, soit environ toutes les
cinq semaines. Et Hugo est très utilisé, c'est difficile à mesurer parce qu'il
peut être installé à partir de différentes sources, mais j'ai été supris
d'apprendre qu'il y avait plus de 8000 installations mensuelles rien qu'avec
`brew` sous macOS.
Et le site [gohugo.io](https://gohugo.io/) encaisse un trafic élevé.

## Hugo est open source. Comment se passe la gestion du projet ?

Je n'ajoute que les fonctionnalités que j'aimerais avoir; si c'est aussi un
challenge technique, cela me procure un peu de motivation supplémentaire. Quand
Hugo a commencé à devenir populaire et que le coût de chaque erreur a augmenté,
j'ai commencé à écrire de la documentation technique pour pouvoir discuter de
certains éléments de conception et les affiner avec l'aide de la communauté. Les
fonctionnalités peuvent rester un bon moment dans le backlog tant qu'une
solution simple et élégante ne me vient pas à l'esprit pendant que je pêche la
truite.

Quand vous n'êtes pas nombreux pour maintenir un logiciel open source, vous
devez être efficaces. Nous essayons d'être carrés : des instructions précises
pour soumettre des modifications, pas de questions ou de discussions sur GitHub.
Le [forum d'Hugo](https://discourse.gohugo.io/) est fait pour ça. Steve Francia
m'a dit une fois de toujours rester poli, même avec ceux qui font des remarques
désobligeantes comme souvent sur Internet. Ça pourrait paraître contre-intuitif,
mais cela fonctionne très bien.

## Qui vous soutient dans le développement ?

[Netlify](https://netlify.com) héberge nos sites gratuitement et
[Discourse](https://www.discourse.org/) se charge de la maintenance du forum.
[Travis](https://travis-ci.org/), [Appveyor](https://www.appveyor.com/) et
[CircleCI](https://circleci.com/) pour les tests d'intégration continue. Mais à
part ça personne, nous n'avons pas de sponsors. Nous en avons juste parlé
brièvement entre nous.

## Quelle est la prochaine étape pour Hugo ?

La version 1.0 d'Hugo ne _devrait_ pas tarder. Il manque encore quelques trucs
qui sont inscrits dans ma feuille de route mentale, mais rien qui ne demande
trop de temps. La fonctionnalité la plus importante et la plus intéressante qui
arrivera peut-être dans la prochaine version, et sur laquelle je travaille
encore, ce sont les ["pages
bundles"](https://github.com/gohugoio/hugo/issues/3651)  : la possibilité
d'associer des contenus comme une page et des images par exemple.

J'ai encore plein d'autres idées. Je testerai peut-être si Hugo est adapté pour
de très très gros sites avec des millions de pages, mais j'ai peur que la
tâche soit un peu trop ardue par rapport au temps libre que je peux y
consacrer.
