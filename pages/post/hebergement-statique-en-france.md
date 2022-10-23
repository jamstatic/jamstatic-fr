---
title: "Héberger du statique en France, avec Matthias Dugué et Hubert Sablonnière"
description: "Quelles différences entre les plate-formes françaises et les géants américains du Cloud, quand il s’agit de déployer des sites Jamstack ?"
date: 2020-12-08
author: frank
images:
  - https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/w_1000,c_fit,co_white,g_north_west,x_80,y_80,l_text:poppins_80_ultrabold_line_spacing_-30:H%25C3%25A9berger%2520du%2520statique%2520en%2520France%2520avec%2520Matthias%2520Dugu%25C3%25A9%2520et%2520Hubert%2520Sablonni%25C3%25A8re/jamstatic/twitter-card.png
categories:
  - podcast
  - deploiement
podcast:
  url: https://anchor.fm/jamstatic/episodes/Hberger-du-statique-en-France-enhc1t
---

{{< intro >}}
Dans ce deuxième épisode de _Génération Statique_ Frank Taillandier et Arnaud Ligny reçoivent Matthias Dugué, en charge des relations avec les développeurs chez [Alwaysdata](https://alwaysdata.com), et Hubert Sablonnière, développeur web chez [Clever Cloud](https://www.clever-cloud.com). Avec eux nous évoquons la différence entre les plate-formes françaises et les géants américains du Cloud, quand il s'agit de déployer des sites Jamstack.
{{</ intro >}}

<!--<iframe src="https://anchor.fm/jamstatic/embed/episodes/Hberger-du-statique-en-France-enhc1t" height="174px" width="100%" frameborder="0" scrolling="no"></iframe>-->{{< player episode=2 >}}

{{< podcast apple="1000501729148" google="NzIwZDUxN2UtN2ZhOS00Njk5LTljYTEtNDRjNDc5ZjA2MGIy" spotify="1CSXBJ0p3xub84Jcikg8rQ" >}}

L'émergence de solutions dédiées au déploiement automatisé de sites statiques est principalement l'apanage de sociétés américaines (Netlify, Vercel, Amazon, Microsoft, Digital Ocean, etc.). La bataille a commencé outre-atlantique pour s'arroger les parts de marché, maintenant que Netlify revendique plus d'un million d'utilisateurs. Il existe des hébergeurs en France, mais pas uniquement dédié à du déploiement automatisé de statique sur des CDNs.

Les offres dédiées Jamstack sont un terreau d'innovation, on a vu ainsi arriver les développements atomiques (une URL pour chaque commit), les intégrations au workflow Git avec mise à disposition d'un lien de prévisualisation lors de la soumission d'une modification sur le dépôt Git, l'ajout simplifié de fonctions Lambda, etc.

Matthias et Hubert nous confient que le statique ne représente pas plus de 5% des projets actuellement chez les hébergeurs plus généralistes, et rappellent que le besoin applicatif représente encore leur cœur de leur activité. Les documentations respectives des ces services sont générées avec Hugo et les deux hébergeurs permettent de pousser via Git. L'automatisation et l'expérience utilisateur n'est pas aussi poussée mais le workflow est similaire. On commence néanmoins à réfléchir à l'amélioration de la DX (_Developer Experience_), via l'amélioration des outils en ligne de commande dans un premier temps.

L'UX n'est cependant pas le premier facteur de choix des entreprises françaises, qui veulent avant tout pouvoir héberger au plus près de leurs utilisateurs quand elles visent le marché français.

Il est difficile de comparer des services spécialisés qui focalisent leurs efforts sur le frein à l'adoption et qui se content de recopier des fichiers statiques. Les services plus génériques qui gèrent de l'infrastructure et des serveurs ont beaucoup d'autres aspects à gérer, ne serait-ce que pour s'assurer de la sécurité de leur infrastructure.

Hubert précise que des fonctionnalités très prisées comme la prévisualisation automatisée de branche Git sont possibles pour des sites statiques chez Clever Cloud à condition de connaître leur API. Ce genre de fonctionnalité est beaucoup plus complexe à mettre en place pour des applications dynamiques.

Matthias confesse que l'importance de la Developer Experience (DX) est grandissante dans la communauté et que le déploiement de sites Jamstack est quelque chose qu'on voit se développer aussi chez des acteurs majeurs comme Amazon Web Services, Microsoft Azure, Digital Ocean ou Cloudflare récemment.

Il n'est pas aisé de pour nos hébergeurs français plus modestes de rivaliser avec les géants du secteur. Force est de constater q'il est plus facile aujourd’hui de déployer un projet statique chez les "gros". Les outils en ligne de commande, les APIs, les outils de monitoring continuent d'être au centre de l'attention des hébergeurs traditionnels, c'est leur cœur de métier. Il y a bien d'autres paramètres à prendre en compte, comme par exemple la qualité et la réactivité d'un support technique à visage humain, qui accompagnent les clients pour s'assurer de répondre à leurs besoins au plus vite.

Les gros acteurs comme AWS ne sont pas non plus à l'abri de pannes, comme [on a pu le voir encore recemment](https://www.theverge.com/2020/11/25/21719396/amazon-web-services-aws-outage-down-internet).

Chez Clever Cloud, on peut déjà déployer des fonctions en mode PaaS (Platform as a Service), voire des _functions as a service_ (FaaS) avec support de Web Assembly. Lors du développement de sa documentation en mode Jamstack Alwaysdata a pu expérimenté le besoin en fonctions dynamiques comme l'envoi de mail, un besoin qu'il est toujours possible de combler en développant soi-même la fonction manquante ou en se reposant sur des services et des APis externes.

Arnaud souligne qu'il est peut-être plus rassurant pour des entreprises de pouvoir stocker leurs fonctions métier dans son Cloud privé afin de maîtriser son environnement. "La valeur ajoutée de notre métier c'est l'accompagnement et la gestion de la complexité" commente Matthias.

Cette complexité est aussi présente chez des acteurs comme AWS, et on est pas à l'abri pour autant d'un certain degré d'enfermement propriétaire lorsqu'on développe son application pour tourner sur ces plate-formes.

Les problématiques de protections des données, la volonté de ne pas dépendre d'entreprises étrangères qui ne sont pas soumises aux mêmes règles fiscales, des choix éthiques liés aux politiques énergétiques sont autant de critères qui entrent de plus en plus dans le processus de décision.

Le déploiement automatisé systématique c'est très pratique dans plein de cas, mais au prix de quel coût énergétique ? Il reste encore aux différents outils (CMS, plate-forme de déploiement) à donner plus de maîtrise (et de métriques) pour nous permettre de pouvoir estimer correctement l'empreinte énergétique de son _workflow_ et de l'infrastructure utilisée.
