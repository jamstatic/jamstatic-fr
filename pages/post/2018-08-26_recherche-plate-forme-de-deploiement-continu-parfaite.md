---
title: "À la recherche de la plate-forme de déploiement continu parfaite"
date: 2018-08-26T18:26:33+02:00
description: "Travis, Circle, Drone, GitLab, Jenkins : choisissez la solution d'intégration et de déploiement continu qui vous convient le mieux."
author: frank
categories:
 - deploiement
source:
  author: "DJ Walker"
  title: "In Search of the Best Continuous Deployment Service"
  url: "https://forestry.io/blog/5-options-for-automating-your-software-deployments/"
aliases:
  - /2018/08/26/recherche-plate-forme-de-developpement-continu-parfaite/
typora-copy-images-to: ../../assets/images/post/${filename}
---
:::intro
L'automatisation est une des composantes qui permet de bien travailler en versionnant son projet et en configurant une publication automatique. Cette bonne pratique issue du développement permet de s'assurer que tout le monde peut contribuer et que les changements seront bien publiés. DJ Walker a pris le temps de passer en revue différents services pour vous, c'est parti pour la visite guidée.
:::

Nous vous avons déjà parlé des [avantages du déploiement automatique,](https://forestry.io/blog/automate-deploy-w-circle-ci/) et plus particulièrement de ceux des sites statiques. L'intégration continue et le déploiement continu sont la stratégie qu'on retrouve le plus souvent quand il s'agit de gérer la publication logicielle. Il existe une multitude d'options pour la mise en place de pipelines CI/CD, avec leurs forces et leurs faiblesses. Quelle est celle qui est faite pour vous ? Dans cet article, nous nous penchons sur cinq services différents  avec lesquels vous pouvez développer, tester et déployer votre code.

## La configuration est clé

Lors de l'évaluation de l'utilité d'un outil de CI/CD, je veux d'abord connaître la réponse à deux questions :

**Quel niveau de contrôle ai-je sur l'environnement qui va générer une nouvelle version de mon application ?** Pouvoir configurer l'environnement dans lequel vous allez lancer vos étapes de build est essentiel. J'ai tendance à préférer lancer les étapes de build dans un conteneur Docker avec une image définie par mes soins. Les conteneurs sont devenus le moyen idéal pour faire tourner du code dans un environnement reproductible et isolé.

**Comment se configurent les étapes de build ?**
Vous pourriez simplement lancer vos tâches à l'aide d'un gros script shell ou d'un outil robuste comme `make`. Ces scripts peuvent toutefois devenir rapidement complexes et difficiles à déboguer. Idéalement, l'enchaînement des tâches est configuré à l'aide d'un langage de configuration qui offre des abstractions plus commodes pour éviter d'avoir à écrire de multiples scripts réutilisables. Bien qu'une syntaxe de configuration intuitive et facile à comprendre soit utile, quel que soit l'outil utilisé vous devrez en apprendre les rudiments, attendez-vous donc à lire leur documentation pour comprendre comment les utiliser.

Peu importe comment fonctionne la configuration, l'important est d'opter pour des outils qui vous permettent de stocker et versionner votre configuration de build dans votre dépôt. Stocker votre configuration présente plusieurs avantages. Lancer le build d'un commit précédent se fera avec la configuration correspondante à cette même période. Vous pouvez travailler votre configuration sur une branche à part, et tirer parti de la portabilité qui découle de l'utilisation de la gestion de version.

## CircleCI

![](https://res.cloudinary.com/jamstatic/image/upload/c_scale,f_auto,q_auto,w_960/v1603617610/jamstatic/circleci_hero.png)

CircleCI est un service d'hébergement de CI/CD qui se connecte à votre dépôt et exécute vos étapes de build à chaque nouveau commit. CircleCI peut exécuter vos tâches dans une image Docker, une machine virtuelle Linux, ou une VM MacOS pour vos projets iOS.

La configuration se fait à l'aide d'un fichier `.circleci/config.yml` dans votre dépôt. Ce fichier indique l'image Docker à utiliser pour votre environnement de build, ainsi que les commandes à exécuter afin de générer, tester et déployer votre application.

CircleCI est le service utilisé par Forestry pour lancer ses tests et déployer son code. Il s'intègre sans problème avec GitHub et Bitbucket.

### On aime

Le fait que ce soit à la fois hautement configurable et simple à intégrer avec les projets GitHub.

### On est pas super fan

On ne peut pas connecter de projets GitLab à CircleCI pour le moment.

:::info
Lire comment [déployer un site statique avec CircleCI](https://forestry.io/blog/automate-deploy-w-circle-ci/).
:::

## TravisCI

![](https://res.cloudinary.com/jamstatic/image/upload/c_scale,f_auto,q_auto,w_862/jamstatic/travis_pipeline.png)

TravisCI est une solution de CI/CD hébergée qui s'intègre avec vos projets GitHub. Les builds TravisCI se configurent dans un fichier `.travis.yml` présent dans votre dépôt.

Les scripts de build s'exécutent dans un environnement Ubuntu qui peut être configuré à l'aide de commandes shell pendant la phase d'installation de votre build. TravisCI fournit également des abstractions pour installer [différents langages de programmation](https://docs.travis-ci.com/user/languages/) dans votre environnement de build.

### On aime

TravisCI promet d'être gratuit à vie pour les projets open source. TravisCI travaille de pair avec Github et peut lancer automatiquement les tests d'intégration [lorsqu'une pull request est ouverte](https://docs.travis-ci.com/user/pull-requests/).

### On est pas super fan

Avec TravisCI, vos builds doivent tourner dans un environnement Ubuntu. Vous pouvez installer Docker dans cet environnement pour récupérer des images, mais c'est la solution la plus verbeuse de toutes. De plus, vous ne pouvez utiliser TravisCI que si vos projets sont hébergés sur GitHub.

:::info
[Guide de démarrage TravisCI](https://docs.travis-ci.com/user/getting-started/)
:::

## Drone

Drone est un serveur de CI/CD écrit en Go. Pour le moment vous devez héberger Drone sur votre serveur, mais une option d'hébergement dédiée est dans les tuyaux. Drone possède un système de plugin qui permet ainsi d'ajouter de nouvelles fonctionnalités.

Configurer un build pour Drone se fait à l'aide d'un fichier `.drone.yml`. On notera que la syntaxe de configuration de Drone est dérivée de la configuration de `docker-compose`. Si vous connaissez déjà `docker-compose`, vous serez en terrain connu avec le langage de configuration de Drone.

### On aime

Drone propose des [matrices de builds](http://docs.drone.io/matrix-builds/) pour permettre de tester simplement votre code dans de multiples configurations, par exemple différentes versions de vos dépendances.

### On est pas super fan

Drone est un arrivant relativement récent, et sa documentation aurait besoin d'un peu d'amour.

:::info
[Bien démarrer avec Drone CI](http://docs.drone.io/getting-started/)
:::

## GitLab CI

![](https://res.cloudinary.com/jamstatic/image/upload/c_scale,dpr_2.0,f_auto,q_auto,w_868/jamstatic/ci-cd-test-deploy-illustration_2x.png)

Si vous utilisez GitLab pour héberger votre code, vous avez déjà accès aux outils d'intégration continue de GitLab. Tout ce que vous avez à faire est d'ajouter un pipeline de CI à votre projet avec un fichier `.gitlab-ci.yml`. J'aime le fait de ne pas à avoir à parcourir une interface graphique pour configurer l'intégration continue d'un projet — si vous avez plein de projets et que vous souhaitez gérer leur intégration continue par lots, cette option vous donne des possibilités d'automatisation.

### On aime

GitLab CI est compatible avec toutes les versions de GitLab : vous pouvez l'utiliser sur gitlab.com ou sur votre instance GitLab hébergée. Le composant d'intégration continue de GitLab est écrit en Go, il est donc facile à exécuter sur les systèmes d'exploitation majeurs, y compris Windows et MacOS. Vous pouvez même [lancer vos tests d'intégration en local sur votre machine](https://gitlab.com/gitlab-org/gitlab-runner/issues/312) !.

### On est pas super fan

Forcément pour utiliser GitLab CI, vous devez héberger votre code source avec GitLab, le fait de pouvoir héberger vous-même votre suite logicielle devrait vous rassurer si vous avez peur d'être trop dépendant d'un service tiers.

:::info
[GitLab CI : guide de démarrage rapide](https://docs.gitlab.com/ee/ci/quick_start/)
:::

## Jenkins

![Jenkins logo](/images/jenkins-logo.svg)

Jenkins est un serveur d'intégration et de déploiement continu que vous installez et lancer sur votre propre serveur. Le projet Jenkins [a débuté en 2004](https://www.cloudbees.com/jenkins/about) et aujourd'hui c'est une solution adoptée par les entreprises qui souhaitent posséder leur propre infrastructure de CI.

Jenkins dispose d'une foule de plugins pour l'ajout de fonctionnalités à votre serveur de CI. Les builds sont configurés dans un fichier `Jenkinsfile`, à partir du moment où vous avez [installé le plugin Pipeline](https://www.jenkins.io/doc/book/pipeline/getting-started/) recommandé. Comme CircleCI, vous pouvez configurer votre environnement de build à l'aide d'une image Docker, même s'il existe également [beaucoup d'autres options](https://www.jenkins.io/doc/book/pipeline/syntax/#agent).

Jenkins est écrit en Java et est compatible avec les principaux systèmes d'exploitation. Les builds peuvent tourner sous environnement Linux, BSD, MacOS ou Windows.

### On aime

Jenkins est totalement libre d'utilisation et open source. Jenkins supporte les plugins et dispose d'une [bibliothèque très fournie](https://plugins.jenkins.io/) de par sa relative longévité dans le domaine de l'intégration continue.

Le fait de pouvoir faire tourner ses builds sur n'importe quel système d'exploitation, y compris Windows ou Mac OS, car Jenkins est écrit en Java.

### On est pas super fan

Pas grand-chose à redire à ce niveau : Jenkins peut faire à peu près tout ce que vous voulez ! Toutefois, il se peut que les petites équipes n'aient peut-être pas envie de devoir se coltiner la maintenance et l'hébergement de leur propre serveur d'intégration continue.

:::info
[Jenkins : Guide de démarrage](https://www.jenkins.io/doc/pipeline/tour/getting-started/)
:::

## Choisir l'outil qui vous convient le mieux

La variété d'options pour la mise en place de l'intégration et du déploiement continu a rendu l'automatisation plus accessible que jamais aux développeurs. Les projets open source qui possèdent des prérequis assez simples peuvent tirer parti de l'offre gratuite de **TravisCI**. Les utilisateurs de GitLab devraient se pencher sur l'utilisation de **GitLab CI**. Drone est une bonne solution pour ceux qui recherchent une solution simple à héberger soi-même, surtout s'ils apprécient la syntaxe de `docker-compose`. **CircleCI** est un bon choix pour ceux qui veulent de la souplesse mais qui ne souhaitent pas héberger leur serveur. **Jenkins** demandera quelques heures et de l'huile de coude, mais c'est un logiciel capable de faire beaucoup de choses.
