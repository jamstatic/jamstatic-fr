---
title: Entretien avec Bud Parr, ingénieur JAMstack
date: "2017-11-27 08:45:36 +0100"
author: Frank Taillandier
description: >
  Bud Parr, créateur et gérant de TheNewDynamic, partage son expérience et sa
  vision sur l'écosystème actuel de la JAMstack
image: https://github.com/budparr.png
---

Bud est impliqué dans la communauté qui gravite autour des générateurs de site
statique depuis plusieurs années. Il possède [sa propre
agence](https://www.thenewdynamic.com/) et aggrège sa curation autour de
l'écosystème de la JAMstack sur [thenewdynamic.org](https://thenewdynamic.org).
Bud organise également des [meetups à
New-York](http://www.meetup.com/the-new-dynamic/) et est à l'origine du récent
redesign du [site d'Hugo](https://gohugo.io/). Il a gentiment accepté de
répondre à nos questions.
![Bud Parr](https://github.com/budparr.png)

## Bonjour Bud, tu es un observateur et un défenseur de ce que beaucoup désignent encore comme de simples sites statiques. Comment les choses ont-elles évoluées depuis dix ans ?

Pour être tout à fait honnête, cela m'a causé pas mal d'insomnies au début. Ce
paradigme faisait totalement sens pour moi, mais il y avait peu de personnes
impliquées ou qui avaient conscience de tout cela. J'étais vraiment inquiet que
s'il m'arrivait quelque chose, mes clients éprouveraient des difficultés à
trouver des développeurs pour prendre la suite de leur projet. Et puis, il n'y
avait pas énormément de choix dans l'écosytème. Le manque d'un bon éditeur pour
les profils non-techniques était un vrai problème. J'ai même du apprendre à
quelques clients comment utiliser Markdown et GitHub, mais ce n'est clairement
pas l'idéal.
Nous voyons que les choses ont bien évoluées depuis, certains des
[éditeurs](https://thenewdynamic.org/tools/content-management/) actuels sont
aussi bons si ce n'est meilleurs que ceux que l'on trouvent dans les CMS
traditionnels. Cette année, nous avons assisté à l'écclosion de [CMS headless](https://www.thenewdynamic.org/tools/content-management/headless-cms/)
propriétaires, à vous de voir si vous préférez privilégier une approché basée
sur Git ou sur l'utilisation d'une API.

Nous avons aussi assisté à l'émergence du [Serverless
d'Amazon](https://aws.amazon.com/serverless/) ou des ["Cloud functions" de
Google](https://cloud.google.com/functions/) et de services bâtis autour du
concept de microservices. Ces services facilitent l'accès à des fonctions qui
auraient nécessité la gestion d'un serveur auparavant : la gestion de
formulaires, l'authentification, les bases de données en temps réel et bien
plus.

## En 2015 Tom Preston-Werner disait lors de la JekyllConf que [80% du Web pourrait être statique](https://www.youtube.com/watch?v=BMve1OCKj6M&t=39m55s), est-ce le cas aujourd'hui ?

Peter Levine, un des associés d'Andreessen Horowitz, fait également ce constat
lorsqu'il écrit : [<q>Il y a plus de 300 millions de sites Web déployés chaque
année, la plupart de ces sites et application Web pourraient être hébergées chez
Netlify</q>](https://a16z.com/2017/08/09/netlify/). Par Netlify, il sous-entend
déployé en statique ou basé sur la [JAMstack](https://jamstack.org/). Il me
semble que nous sommes encore loin du compte.

Divisons le Web en trois grandes catégories : le Web développé par des
ingénieurs, le Web manipulé par des utilisateurs (de thèmes Wordpress par
exemple) et le Web complètemet abstrait (avec Squarespace par exemple). Je suis
d'être persuadé que les deux derniers groupes s'intéressent à l'adoption de ces
technologies, pourtant c'est une part important du Web. Le premier groupe lui
sera largement composé d'applications Web et de sites statiques. On devrait
assister à un rapprochement de ces deux mondes, et les outils que nous utilisons
pour développer ces types de sites vont continuer d'évoluer dans les années à
venir.

## Les administrations publiques aux États-Unis (avec [18F](https://18f.gsa.gov/)), au Royaume-Uni (avec [Alphagov](https://github.com/alphagov)) ou en France (avec [Etalab](https://www.etalab.gouv.fr)) semblent privilégier ce type de workflow. Pourquoi à ton avis est-ce si intéressant pour les administrations publiques et les organismes ouverts ?

Ce sont des organismes qui ont un large public et une forte exigence de qualité
de service : performance, stabilité et sécurité. Il est donc naturel qu'ils
veuillent bénéficier des avantages du statique. De plus ces organismes sont en
général composés d'équipes distribuées, qui peuvent être réparties dans
différents services, la collaboration permise par un processus de travail basé
sur Git - donc sur de la gestion de versions -  fait totalement sens. Tout le
monde est gagnant et cela facilite l'adoption de cette technologie, puisqu'elle
utilisée par des acteurs majeurs et donc crésibles.

## Nous voyons aussi de plus en plus d'agences, de start-ups adopté cette manière de travailler par défaut quand il s'agit de publier des contenus. Quel sont selon toi les projets les plus suceptibles de faire réfléchir à deux fois avant de dégaîner son bon vieux CMS ?

L'équipe qui s'était occupée de la dernière campagne de Barack Obama - site
propulsé par Jekyll - s'est également occupée du site de campagne d'Hillary
Clinton - site généré avec Assemble en NodeJS. C'étaient des sites relativement
importants et assez sophistiqués. Nous avons [une galerie sur The New
Dyanmic](https://www.thenewdynamic.org/showcase/) qui a pour but de mettre en
avant des projets bien conçus. L'idée c'est de montrer que ce n'est pas
uniquement fait pour [blogguer comme un
hacker](http://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html),
on peut utiliser ces outils pour maintenir de la documentation, présenter des
services et des produits et faire des choses assez sophistiquées. [Smashing
Magazine](https://www.smashingmagazine.com/) est un des parfaits derniers
exemples en date. C'est un site complet avec beaucoup de contenus, de la vente
en ligne, un espace membre, etc. C'est vraiment une chouette vitrine pour la
JAMstack.

## Mais alors pourquoi les agences n'adoptent-elles pas ce processus de travail ?

C'est difficile à dire pour moi, vu que j'ai choisi de travailler _uniquement_
de cette façon. J'imagine que tout le monde n'a pas encore conscience des
possibilités offertes. Je lis encore souvent que la JAMstack, c'est juste bon
pour les sites vitrines et les blogs, cette idée reçue est encore tenace. Les
CMS les plus utilisés c'est la sécurité, même si ce n'est pas forcément la bonne
solution. Quand un client me dit "Je veux un site Wordpress", ce que je
comprends c'est qu'il veut "un éditeur Web riche que je pourrais utiliser sans
l'aide d'un profil technique". Je crois que malheureusement beaucoup de
gens prennent encore ce genre de demande au pied de la lettre.

## Si ce workflow est naturel pour les développeurs Web, les utilisateurs finaux préfèrenet utiliser une interface graphique complète. Ces deux manières de travailler sont-elles compatibles ?

Tout à fait. On a le choix entre deux approches : une basée sur Git, où tout
votre contenu est stocké dans un dépôt Git, et une autre basée sur une API, où
vous générez vos contenus qui sont ensuite mis à disposition via une API, pour
que vous puissiez les récupérer et les afficher dans votre application ou votre
site. Il existe de bons éditeurs Web pour les sites dont le contenu est stockée
dans un dépot Git : [Forestry.io](https://forestry.io/),
[Siteleaf](https://siteleaf.com), [Cloudcannon](https://cloudcannon.com), and
[Netlify CMS](http://netlifycms.org/). Jusqu'à encore recemment il n'y avait que
quelques acteurs majeurs du côté des APIs de contenu (comme Contentul ou
Prismic), mais il existe maintenant [des dizaines de CMS
headless](https://www.thenewdynamic.org/tools/content-management/headless-cms/)
sans base de données. Il y a donc le choix entre différents approches et de plus
en plus de compétition sur ce plan. C'est une très bonne nouvelle !

## Quel est _ton_ workflow actuel ? Qu'est-ce qui te plaît tant dedans ?

En ce moment j'utilise des services et des outils qui me permettent de répondre à
des projets variés : [Hugo](https://gohugo.io) pour la génération de site, [la
bibliothèque CSS Tachyons](http://tachyons.io/) pour construire des interfaces,
[Webpack](https://Webpack.js.org/) pour la gestion des assets,
[Netlify](https://netlify.com) pour le déploiemet et l'hébergement,
[Forestry](https://forestry.io/) pour que mes clients puissent rédiger leurs
contenus.

Je trouve ce workflow particulièrement efficace. Hugo peut gérer n'importe quel
type de site, quelle que soit sa taille. Netlify me permet de déployer des mises à
jour en quelques secondes et Forestry permet à mes clients d'êtres autonomes
pendant la phase d'édition. En gros, cet ensemble d'outils me permet d'être plus efficace
dans mon travail et de me concentrer en priorité sur les besoins de mes clients.

Cela dit, je continue de tester les nouveaux outils qui sortent, un des
avantages d'avoir sa propre agence de développement et de design Web est que je
peux faire évoluer ma façon de travailler en adoptant les outils les mieux
adaptés.

Par exemple, pour le projet [www.retroreport.org](https://www.retroreport.org/)
que j'ai réalisé avec Hugo, je me suis reposé sur les [formats d'export
personnalisés d'Hugo](https://gohugo.io/templates/output-formats/) pour générer
des versions alternatives du contenu dans des fichiers JSON pour le lecteur
vidéo. La JAMstack est parfaitement adaptée pour ce projet, car le site subit de
forts pics de charge quand une des vidéos devient virale sur le Web et il est
rassurant de savoir que nous n'aurons pas à nous soucier de la latence lorsque
ces pics de charge aléatoires se produisent.

[![retroreport.org](https://www.thenewdynamic.org/uploads/retroreportorg.jpg)](https://www.retroreport.org)

## Comment vends-tu cette manière de travailler à tes clients ?

Je n'ai pas à le faire. Mes clients m'engagent pour que je prenne ce genre de
décision à leur place. Si je dois aborder le sujet, je vais insister sur les
gains de performance, cet argument à lui-seul suffit à les convaincre, et les
sites statiques permettent une continuité de service proche de 100% tout en
réduisant fortement la probabilité de se faire hacker. Ce que je ne mentionne
pas trop, mais dont ils bénéficient, c'est la facilité avec laquelle on peut
publier les changements suite à leurs retours.

## Que souhaites-tu pour cette stack Web moderne à court terme ?

Je pense que le découplage qu'induit naturellement la JAMstack peut perturber
ceux qui ne sont pas encore familiers avec le concept. Et il n'y a pas vraiment
d'acteur dominant qui impose une "manière standard de faire", comme le font React ou Angular
dans le domaine du développement de *Single Page Applications*. Je trouve que Netlify a fait un
super boulot de vulgarisation, en nommant le concept et en faisant la promotion de la
JAMstack, mais de ce que je peux en voir, les gens sont encore assez
désorientés, ils ne savent pas trop par où commencer et quel serait le meilleur
outil à utiliser dans leur cas de figure. J'aimerais donc que les gens puissent
se familairiser davantage avec cet écosystèmme, je ne sais pas très bien comment. La
mission de The New Dynamic est de contribuer à cela, et il y a encore beaucoup
de travail à faire.

[Lire la version originale en anglais sur thenewdynamic.org](https://www.thenewdynamic.org/article/interview-bud-parr/)
