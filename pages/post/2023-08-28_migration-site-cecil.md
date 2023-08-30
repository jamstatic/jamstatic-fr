---
published: false
title: "Pourquoi et comment j'ai migré Jamstatic.fr de Hugo vers Cecil"
description: "Retour d'expérience sur la migration du site vers Cecil."
date: 2023-08-28
author: arnaud
categories:
  - Hugo
  - Cecil
---

À la fin de l'année dernière j'ai entrepris de pérenniser le travail de refonte du site, engagé avec Frank : nouveau logo, nouvelle charte et donc modification des templates et de la feuille de styles.

## Pourquoi ?

Au tout début je m'étais concentré sur la modification des styles via [Tailwind CSS](https://tailwindcss.com/) (comme [souhaité par Frank](https://github.com/jamstatic/jamstatic-fr/pull/255)) puis sur les [templates Go](https://gohugo.io/templates/introduction/).  
Puis je me suis rapidement arraché les cheveux avec le moteur de templating de Hugo : ne pratiquant pas régulièrement, j'étais systématiquement obligé d'ouvrir la documentation et de chercher comment manipuler une variable, gérer les héritages, les inclusions, etc. Bref, une perte de temps importante et une motivation se réduisant de jour en jour.

J'ai alors décidé de [sauter le pas](https://github.com/jamstatic/jamstatic-fr/pull/343) et de migrer vers [Cecil](https://cecil.app/) pour 2 raisons majeurs :

1. Je connais la solution sur le bout des doigts (et pour cause puisque j'en suis le créateur) ;
2. Je suis à l'aise (et donc très efficace) avec le moteur de template [Twig](https://twig.symfony.com/).

## Comment ?

Après le "pourquoi ?" intéressons nous maintenant à la partie la plus intéressante de ce billet, à savoir le "comment ?" 😊

Le principe de génération du site, la structure des contenus et l'organisation des templates étant relativement proche entre les deux solutions, j'ai décidé d'avancer par itérations successives : à chaque modification (majeures) exécution d'un nouveau build, puis application des ajustements selon les messages d'erreur retournés, encore et encore jusqu'à ce que le build soit valide.

