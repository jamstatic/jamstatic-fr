---
author: Bertrand Keller
date: 2016-04-19T00:00:00Z
description: Traduction française de l'entretien publié le 11 mars 2016 sur Netlify.
image: https://cdn.netlify.com/a3dc6515430891d6df896d718dd7e54f6941d647/99084/uploads/parker-moore-jekyll.jpg
title: Entretien avec Parker Moore de Jekyll
url: /2016/04/19/entretien-avec-parker-moore/
---

Nous vous proposons la traduction d'un entretien de Parker Moore, le mainteneur principal de Jekyll, avec Aaron Autrand, [publié le 11 mars 2016 sur le blog de la société Netlify](https://www.netlify.com/blog/2016/03/11/interview-with-parker-moore-from-jekyll).
{: .intro }

<img src="{{ page.image }}" alt="Parker Moore">

Alors que nous constatons une augmentation constante du nombre d'outils permettant de générer des sites statiques à destination des développeurs, profesionnels ou amateurs, aucun d'entre eux n'attire autant l'attention que [Jekyll](https://jekyllrb.com/).

Sa popularité n'est pas vraiment surprenante quand on sait que Jekyll a été crée par un des cofondateurs de GitHub et que c'est le moteur qui fait tourner GitHub pages.

Il y a quelques temps, nous avons pu assister au lancement de Jekyll 3.0, avec la [publication en direct du commit final](https://youtu.be/sPZK8w55cBQ?t=37m58s) pendant une présentation de Parker Moore, actuellement en charge de la maintenance de Jekyll, lors du Meetup Static Web à San Francisco. Après sa présentation, Moore a pris quelques minutes pour parler avec nous de Jekyll, de son développement et du future des sites web statiques.

**Qu'est ce que vous faites quand vous ne travaillez pas sur Jekyll ?**

Je suis ingénieur logiciel chez Github, entreprise dans laquelle j'aide au développement du service Github Pages. Mon travail consiste aussi à maintenir Jekyll et à faire grandir la communauté autour du projet.

**Peux tu nous dire comment tu as été amené à t'impliquer dans Jekyll et ce qui s'est passé depuis pour aboutir à la mise en ligne de la version 3.0 de Jekyll ?**

Le parcours était intéressant. J'ai été améné à utiliser Jekyll pour un job d'été à l'université de Cornell. Il s'agissait de la refonte du site cals.cornell.edu, nous voulions réaliser un nouveau site, et ce de manière rapide. Nous voulions garder l'existant et le migrer sur un nouveau système. Nous avions de nouvelles maquettes et de nouveaux contenus. J'avais déjà entendu parler de Jekyll ; je l'avais déjà utilisé. J'ai réussi à convaincre mon supérieur, je ne sais pas comment j'ai fait, mais il a accepté. Pour moi, Jekyll correspondait exactement à la demande, je devais juste servir du contenu. Au final, nous avons même utilisé Jekyll pour servir des pages PHP avec un serveur LAMP qui permet d‘envoyer des Emails ou de générer des PDF. J‘ai donc utilisé un peu Jekyll à cette période et ça m'a beaucoup plu.

J'ai regardé les bugs majeurs, il y en avait tellement : plus de 800 sur le dépôt, ce qui est énorme. Beaucoup trop pour un projet Open Source majeur, selon moi. J'ai perçu un besoin, j'ai pensé que j'avais suffisament de temps libre - même si ce n'était pas le cas -  pour aider la communauté sur ces corrections. Peu avant, j'étais parti travailler en Allemagne pour une société du nom de 6 Wunderkinder — l'éditeur de Wunderlist – j'ai bombardé Tom (NdT: Prester-Werner le créateur de Jekyll) d'emails, sans cesse. Au final, j'ai publié une lettre ouverte sur mon blog, ce qui avec le recul était assez fou et immature, mais qui a eu les effets escomptés. Peu de temps après, Tom m'a répondu : "Il faut qu'on parle, tu as l'air vraiment intéressé, qu'en dis-tu ?"

Je venais juste d'avoir un échange avec Brandon Mathis, qui travaille sur Octopress, et il m'a ajouté comme contributeur au projet. Et ainsi j'ai pu dire à Tom : "regarde, je suis aussi contributeur d‘Octopress, je connais les sites statiques". Brandon a du approuver ma canditature j'imagine. Quelques semaine plus tard alors que j'étais en visite chez ma sœur à San Fransisco, j'ai rencontré Tom au siège de GitHub pour parler de Jekyll pendant une heure. Il m'a donné les accès, j'ai corrigé quelques bugs et j'ai commencé à travailler sur Jekyll 1.

**Tu as débuté avec la 0.12.1 ?**

Effectivement, je l'utilisais, et il y avait tant de choses qui ne fonctionnaient pas. Je savais que je pouvais corriger tout ça ; je connaissais Ruby, j'avais fait un peu de Ruby on Rails avant, et j'avais beaucoup appris sur le développement web à cette occasion.

**Quelle fut ta première expérience de programmation ?**

À la Rochester Institute of Technology, je m'étais rendu avec des camarades d'écoles à des journées de codes pour élèves de collège. J'avais 13 ans. Il y a eu un cours de 30 minutes sur HTML. J'ai adoré. Je n'arrêtais pas d'en écrire, encore et encore. Je changeais la couleur de fond avec un attribut… je faisais tous ces trucs bêtes et ordinaires.

**Quel fut ta première rencontre avec les générateurs de site statique modernes ?**

Je ne me souviens pas plus loin que de mon expérience avec Jekyll à Cornell. Je savais que les générateurs de site statique marcheraient car j'avais codé du HTML, de la CSS et du JavaScript et je sais ce qu'ils font. J'ai donc décidé de partir de ça, j'ai regardé plusieurs outils et Jekyll était celui qui avait le plus d'étoiles sur Github et avait l'air d'être le plus populaire. Les gens écrivaient dessus et l'utilisaient. GitHub Pages existait déjà. Du coup j'ai emprunté cette direction.

**C'était donc une question de masse critique ? Il y avait pas mal de gens donc tu savais que c'était vivant et actif.**

Tu sors dans les endroits branchés en général non ? Je me suis dit qu'il y aurait des contributeurs. Un projet open-source a besoin de gens plus que de tout autre chose, parce qu'il y a besoin de code.

**La pire chose à faire sur un forum est de poser une question et de retourner voir tous les jours s'il y a une réponse, mais toujours rien.**

Personne n'a répondu !

**Que souhaites-tu aux générateurs de site statique ?**

Qu'ils soient mieux compris. Je les comprend et tu les comprends, mais je rêve d'un monde où ce serait le cas pour tout le monde… et j'imagine que cela arrivera, car   l'informatique s'apprend de plus en plus tôt, la création de sites web est un bon moyen pour commencer à apprendre le code. Mon plus grand souhait c'est qu'ils soient mieux compris de tous et perçus comme une vraie solution, honnête et prête pour la production, pour les sociétés intéressées dans la réalisation de sites web.

**Comment est-il possible de faire cela ?**

Un truc dont j'ai parlé avec Christian et Matt, les fondateurs de Netlify (NdT : Service d'hébergement et de déploiement de sites statiques) ; c'est que les sites statiques, les générateurs de sites statiques, les générateurs statiques, le site statique, tout ça a l'air plutôt ennuyeux, ça sonne très technique…

**Le dynamique a l'air bien plus intéressant !**

C'est ça ! Drupal et Wordpress sont basés sur le principe de "l'installation en 1 clic". Sur wordpress.com, il est possible d'avoir un site gratuitement avec un thème en place. C'est toutes ces petites barrières qui ne sont pas grand chose mais qui font la différence. Donc que je pense que l'accessibilité c'est important. Des entreprises comme Netlify ou CloudCannon y travaillent. Plusieurs sociétés font en sorte qu'il soit plus simple d'apprendre à construire des sites statiques. Je pense qu'il faut faire évoluer le dialogue et notre vocabulaire, pour ne pas intimider ceux qui sont en train d'apprendre ce que sont les générateurs de sites statiques. Qu'est-ce que ça veut dire un site statique ? C'est un terme qui parle de lui même site statique. Mais vous avez à apprendre la différence entre le statique et le dynamique… qui n'est pas un terme que les gens emploient tous les jours. Quelle est la dernière fois où vous avez utilisez le mot statique en dehors du cadre professionnel ?

**Oui statique ça fait un peu péjoratif dans ce contexte**

Oui, il faut véhiculer une vision claire, accessible et s'outiller d'un meilleur lexique. Quelque chose qui explique tout ça très bien, sans utiliser de mots qui font peur.

**En tant que mainteneur de Jekyll, qu'aimerais-tu dire, communiquer à ceux qui s'intéressent aux technos autour du web statique moderne ? La tribune est à toi.**

Si j'avais une tribune, je dirais "N'abandonnez pas". Prenez  vous la tête dessus un petit moment. Si cela ne marche pas au bout d'une heure, d'un jour, allez demander de l'aide. Je dirai que ne pas abandonner et se prendre la tête sur quelque chose est la meilleure façon d'apprendre, d'affronter les problèmes. De manière générale, ma génération n'est vraiment pas douée quand il s'agit de perséverer…que ce soit travailler quelque part plus d'un an ou affronter une grande difficulté pendant plus de 15 minutes. C'est comme si tout était éphémère de nos jours, contrairement à ce que j'ai pu apprendre à travers les livres d'histoires ou les histoires que mes parents et mes grand-parents m'ont raconté. Ne pas abandonner, c'est avoir confiance dans la technologie du web statique, c'est avoir confiance dans les personnes qui développent tout ça, qui font des sites web et qui apprennent de ça, c'est avoir confiance dans notre futur.

**Et lorsqu'on n'abandonne pas, on a plus de chance de faire partie de la solution, car on s'est investi dedans.**

Oui, c'est exactement ça.
