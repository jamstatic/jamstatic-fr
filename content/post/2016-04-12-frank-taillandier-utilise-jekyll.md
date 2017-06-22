---
author: Bertrand Keller
date: 2016-04-12T00:00:00Z
description: Questions à un utilisateur de Jekyll
published: false
title: Frank Taillandier utilise Jekyll
url: /2016/04/12/frank-taillandier-utilise-jekyll/
---

Cet article est le premier d’une série qui présente des utilisateurs de Jekyll, nous commençons avec Frank Taillandier, contributeur à Jamstatic. Si vous souhaitez vous aussi répondre à ces questions, merci de [soumettre une pull request sur Github](https://github.com/{{ site.repository }}/pulls).
{: .intro }

**Bonjour, pourrais-tu te présenter ?**

Bonjour, je m’appelle Frank, je m’intéresse au développement web front-end depuis de nombreuses années. J’ai travaillé successivement dans le public, puis dans le privé, où j’ai contribué pendant quelques années à un CMS open-source et où j’accompagnais les équipes dans une amélioration continue. Parallèlement, je participe à l’organisation de [Sud Web](//sudweb.fr/), une conférence annuelle destinées aux gens du web depuis six ans. Actuellement sans emploi, j’en profite pour [m’intéresser aux gestionnaires de site statique](http://frank.taillandier.me/2016/03/08/les-gestionnaires-de-contenu-statique/) et à Jekyll en particulier.

**Pourquoi utilises-tu Jekyll ?**

J’aime la philosophie des gestionnaires de site statique, leur simplicité, et le fait de pouvoir adapter la courbe d’apprentissage à son propre rythme. Jekyll est pensé dès le début comme un outil de publication de contenus versionnés et stockés en local, la transition est toute naturelle quand vous versionnez déjà du code. Vous pouvez ensuite héberger vos fichiers statiques où bon vous semble, sans avoir à configurer quoi que ce soit sur votre serveur et sans avoir peur de vous faire hacker — on l’a vu encore récemment avec la fuite d’information des *Pananama Papers*, dont [la faille d’un plugin Wordpress serait peut-être à l’origine](http://www.numerama.com/tech/161800-panama-papers-wordpress-et-drupal-a-lorigine-de-la-fuite.html).

Le format Markdown qu’on rencontre dans de plus en plus de services est aussi à mon sens un vrai plus pour les rédacteurs. Vu qu’il est possible d’y incorporer du HTML, on dispose ainsi du meilleur des deux mondes.

Enfin et c’est important il y a un très bon état d’esprit dans la communauté Jekyll. Outre le fait que ce soit inscrit noir sur blanc dans le [code de conduite](https://jekyllrb.com/docs/conduct/), les mainteneurs du projet comme Parker Moore font un gros effort pour faciliter les contributions, [il m’a même proposé de travailler avec lui sur l’apprentissage de Ruby avec Jekyll](https://talk.jekyllrb.com/t/core-data-driven-content/2213/5?u=dirtyf) !

Je crois comme d’autres que nous allons assister à une utilisation de plus en plus massive de ce type de solution et qu’elles vont influencer de plus en plus les architectures ; celles-ci ne seront plus forcément entièrement monolithiques. Nous assistons déjà à un rapprochement entre les CMS statiques et dynamiques, avec d'un côté l'apparition d'interfaces pour gérer du statique, des _flat_ CMS et de l'autre la possibilité de générer du statique à partir du dynamique. Les deux peuvent être complémentaires et cohabiter côte à côte. Une page d'accueil peut-être générée en statique tandis que d'autres parties avec plus d'interactions utilisateurs continuent d'être gérées avec du dynamique. Tout est possible.

**Comment voudrais-tu voir Jekyll évoluer ?**

J’aimerais déjà voir les [propositions faites dans le cadre du Summer of Code](https://github.com/github/mentorships/issues?q=is%3Aissue+is%3Aopen+label%3A%22project%3A+Jekyll%22) se réaliser : internationalisation, régénération plus fine et plus rapide, générer des versions des contenus dans plusieurs formats comme `amp` ou `epub`, un site dédié pour les thèmes et les plugins.

Jekyll a déjà huit ans et bénéficie d’un écosystème déjà assez riche pour palier le manque de fonctionnalités du cœur.

Je regrette un peu le manque de vision sur le projet et jusqu’à aujourd’hui Jekyll ne bénéficiait pas encore de feuille de route, mais cela devrait être [chose faite](https://github.com/jekyll/jekyll/blob/roadmap/site/roadmap.md#v32) d’ici peu. La seule fonctionnalité annoncée pour le moment est le support de [l’installation des thèmes via des gems Ruby](https://github.com/jekyll/jekyll/pull/4595). C’est une bonne chose pour les nouveaux utilisateurs.

Enfin j’aimerais surtout pouvoir bénéficier de services qui permettent d’enrichir les sites statiques en fonctionnalités, là aussi il y a déjà des choses intéressantes, mais il y a encore de la place pour innover.
