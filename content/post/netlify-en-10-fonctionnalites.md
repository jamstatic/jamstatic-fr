---
title: "Netlify en 10 fonctionnalités"
date: 2018-01-07T21:05:43+01:00
categories:
  - netlify
images:
  - /assets/images/2018/01/paperplane.png
source:
  author: Phil Hawksworth
  title: "10 Netlify features to surprise and delight"
  url: "https://medium.com/netlify/10-netlify-features-to-surprise-and-delight-225e846b7b21"
---

{{% intro %}}
En l'espace de quelques années [Netlify](https://www.netlify.com/) est devenu un acteur incontournable de l'écosystème JAMstack - ils sont d'ailleurs à l'origine de cette appelation - et des sites statiques.
Nous sommes nous-mêmes des utilisateurs plus que satisfaits de ce service et l'article que vous lisez en ce moment est lui-même hébergé sur un de leurs CDN. Netlify c'est le genre de service qui a réussi à faire de ses clients ses premiers ambassadeurs, tant leur produit est plus que recommandable.

Netlify — la contraction de _Net_ et _Simplify_ — a pour but de simplifier la mise en production et de fournir tous les outils modernes nécessaires à des stratégies de déploiement agiles à tout un chacun, sans avoir besoin pour cela d'être un devops confirmé. Ce n'est pas simplement une solution pour héberger vos sites statiques à moindre frais, [le passage de Smashing Magazine à une architecture JAMstack]({{< relref "smashing-mag-va-dix-fois-plus-vite.md" >}}) hébergée par Netlify a montré que ça pouvait aller bien au delà en faisant appel à différentes APIs et microservices.
{{% /intro %}}

[Phil Hawksworth](https://twitter.com/philhawksworth), nouvellement en charge des relations avec les développeurs chez Netlify a publié une liste de fonctionnalités disponibles quelle que soit [la formule utilisée](https://www.netlify.com/pricing/), même celle entièrement gratuite.

![](/assets/images/2018/01/paperplane.png)

## Mais d'abord, comment démarrer simplement

Si vous ne connaissez pas encore ce service, sachez que c'est extrêmement simple d'héberger un site chez Netlify. Nul besoin de connaître toutes les fonctionnalités avancées pour vous lancer.

La manière la plus simple d'héberger un site chez Netlify est de [glisser-déposer un dossier](https://www.netlify.com/docs/manual-deploys/) contenant vos fichiers dans un navigateur sur https://app.netlify.com.

<figure>
  {{< youtube fiw2P-UAlII >}}
  <figcaption>Déploiement facile par glisser-déposer sur Netlify</figcaption>
</figure>

Vous pouvez aussi déployer directement grâce à [l'utilitaire en ligne de commande](https://www.netlify.com/docs/cli/), mais je prefère vous renvoyer à [la documentation](https://www.netlify.com/docs) pour ça, sinon vous allez croire que j'essaie de caser discrètement des éléments en plus dans ma liste. Bon OK, c'est ce que je faisais, vous m'avez démasqué.
Passons maintenant à la liste à proprement parler.

## 1. Déploiements atomiques avec publication et retour en arrière immédiats.

Si vous avez déjà rencontré des problèmes de mise en production ou de déploiement sur des projets de développement web, vous apprécierez grandement cette fonctionnalité.

Chaque génération réussie sur Netlify entraîne le déploiement d'une nouvelle instance de votre site. La publication sur les différents extrémités des nœuds du réseau de CDN de Netlify et l'invalidation de cache se font automatiquement et de manière quasi-instantanée, à tel point que que je trouve inutile de mesurer combien de temps ça prend.

Les déploiements sont immutables. Cela signifie que chaque résultat de déploiement correspond à une version du site qui ne changera jamais. Les mises à jour créent de nouvelles instances du site pour remplacer les versions précédentes (qui sont gentiment remerciées pour leur service et mises au repos, sans être supprimées pour autant). Cela veut dire que vous pouvez revenir à tout moment à une version précédente de votre site d'un simple clic dans l'interface d'administration ou via l'API.

En fait, _tout_ ce que vous pouvez faire dans l'interface d'admisnitration, vous pouvez le faire aussi avec l'API. La [documentation de l'API](https://open-api.netlify.com/) vous explique comment faire tout cela. Je ne compte pas même pas ça comme une fonctionnalité à part entière ici, c'est juste un petit bonus de plus !

## 2. Notifications et permaliens

Une fois encore, il y a plus d'une fonctionnalité dans cet élément de ma liste, il faudra vous y faire.

Netlify vous permet de configurer des notifications en fonction des différents types d'évènement liés à un déploiement. Vous pouvez définir qui sera informé en cas de nouveau déploiement, ou lorsqu'un déploiement réussit, échoue, est vérouillé ou dévérouillé (je ne vous ai pas dit mais on peut aussi choisir de faire pointer la version du site vers un déploiement en particulier).

Vous pouvez envoyer des notifications par mail ou sur un canal Slack (je suis fan, tous mes projets ont un canal Slack dédié à l'intégration continue). Vous pouvez même décider qu'une notification va déclencher un webhook, ajouter des messages à des commits Git ou commenter sur des pull requests.

Ce qui rend ces notifications encore plus utiles, c'est qu'elles incluent un lien unique vers le déploiement en question. Je vous ai dit que tous les déploiements sont immutables et toujours actifs. Cela signifie que chacun d'eux possède sa propre URL pour qu'on puisse y accéder et voir ce déploiement en particuier.

Avoir des liens uniques pour chaque déploiement c'est énorme. Vous pouvez partager à tout moment n'importe quelle version de votre site avec votre équipe en charge des tests, votre client, ou n'importe qui d'autre. "À quoi ressemblait la version 3.2.14 du site déjà ? Tiens, voilà le lien."

Et cet accès instantané vous est partagé directement à chaque notification.

### 3. Branches de déploiement et sous-domaines

C'est bien pratique de pouvoir déployer d'autres branches que celle de production. Pouvoir développer de nouvelles fonctionnalités dans des branches dédiées et ensuite pouvoir les tester et les passer en revue sur votre environnement de production, c'est incroyablement puissant.

Netlify vous permet de garder le contrôle sur la façon dont vous déployez. Vous pouvez choisir de déployer uniquement la branche de production, toutes vos branches, ou seulement certaines branches.

{{< figure src="/assets/images/2018/01/controle-deploiement-continu.png" caption="Paramètres du déploiement continu" >}}

Une fois déployée, chaque branche sera accessible depuis un sous-domaine généré en fonction du nom de la brance utilisée. Ça donne un truc comme ça :

`ma-branche--mon-site.netlify.com`

Grâce à la [gestion des DNS de Netlify](https://www.netlify.com/blog/2017/12/19/an-easier-way-to-manage-domains-and-dns-on-netlify/), vous pouvez aussi choisir d'affecter vos propres sous-domaines à des branches. Vous avez une liberté totale pour définir comment les différentes branches vont pousser du contenu sur les différents sous-domaines de votre site.

### 4. Tests A/B, Tests A/B avec plusieurs variantes ou tests séparés

Il existe plusieurs variantes et termes pour désigner les tests A/B, Netlify appelle cela le _split testing_ parce que c'est ce que ça fait : découper le trafic de votre site entre les différentes branches de votre choix.

Vous pouvez partager le trafic de votre site en autant de branches que vous le souhaitez et définir le pourcentage de trafic attribué à chacune des branches.

{{< figure src="/assets/images/2018/01/split-testing.png" caption="La configuration du split testing chez Netlify" >}}

Cette fontionnalité me bluffe. Elle rend les différents types de tests A/B vraiment trivial à mettre en place. Si vous tirez déjà parti du déploiement de branches, il n'y a pas grand chose à faire de plus.

Vous me direz que beaucoup d'entreprises peuvent vous vendre des services de tests A/B pour votre site. J'ai été un grand adepte de ces services. Mais la plupart, si ce n'est tous, vont faire ça en magouillant un peu à coup de JavaScript une fois votre site servi et chargé dans le navigateur.

Vu le mal qu'on se donne, en tant de développeurs web, à minimiser l'impact qu'ont les ressources externes en JavaScript sur le rendu de nos sites, c'est vraiment bête de réduire tous ces efforts à néant en introduisant un ralentissement de la performance dans notre rendu.

De plus, si la performance des différentes variantes que nous testons diffère de la production, alors comment pouvons nous bénéficier d'une comparaison vraiment fiable de la performance de ces options ? Les tests sont faussés.

L'approche de Netlify c'est de servir chaque variante de test directement depuis son CDN optimisé. Tous les trucs super intelligents comme la répartition du trafic, les variantes de tests et l'assurance de la consistence d'utilisation se passent au niveau du CDN - sur les nœuds les plus proches possibles de l'utilisateur.

Chaque variante de test est servie et rendue comme sur la "production". Fantastique.

### 5. Commandes de génération contextuelles

Non seulement vous pouvez déployer différentes branches, mais vous pouvez aussi personnaliser le contenu et les environnements de vos déploiements en fonction de différents contextes comme la pré-production, la qualification et la production.

Il fut un temps où c'était compliqué de mettre en place différents environnements de déploiement pour votre projet. Netlify rend les choses plus simples que je ne l'ai jamais vu. Vous pouvez créer `staging.votre-projet.com` et `testing.votre-projet.com` et tout ce que vous voulez à côté de votre `www.votre-projet.com` simplement à l'aide d'un peu de configuration. Et ils tournent tous sur des environnements identiques, c'est très important pour la fiabilité du développement et la stratégie de déploiement.

Vous pourriez vouloir lancer des commandes de génération légèrement différentes en fonction de l'environnement sur lequel vous déployez, ou générer une fonctionnalité pas encore disponible en production. Vous pouvez faire tout celà en configurant différents contextes de déploiement.

Cela vous permet de faire des choses comme générer la production avec `npm run build:prod` et une branche de fonctionnalité avec `npm run build:ma-fonctionnalite`. Pratique !

Cela se paramètre à l'aide d'un fichier de configuration `netlify.toml` qu'on peut laisser à la racine du projet pour accéder à toutes sortes d'options pour vos déploiements sur Netlify.

Par exemple :

{{< gist philhawksworth 61715131c5d229c06f161e82e93db803 >}}

Vous trouverez plus d'informations à ce sujet dans la [documentation des contextes de déploiement](https://www.netlify.com/docs/continuous-deployment/#deploy-contexts).

### 6. SSL Management and free SSL from Let’s Encrypt

Même si ce n'est pas forcément éivdent à première vue, il est très important de servir les sites web en HTTPS plutôt qu'en HTTP, même si ce sont des sites servis en statique.

Un des créateurs de Netlify explique tout ça très bien en donnant [cinq bonne raisons de servir votre site en HTTPS](https://www.netlify.com/blog/2014/10/03/five-reasons-you-want-https-for-your-static-site/) et Google a également publié de bons articles qui expliquent [pourquoi HTTPS est si important](https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https), quelle que soit l'architecture utilisée.

Vous êtes convaincu et vous voulez acheter un certificat numérique ? N'ayez crainte, l'opération peut être bien plus simple que vous ne pourriez le penser.

Netlify rend triviale la configuration de [HTTPS sur vos noms de domaines](https://www.netlify.com/docs/ssl/#https-on-custom-domains). Vous avez le choix entre la gestion automatisée de SSL, la gestion personnalisée de SSL et même une adresse IP dédiée SSL pour les entreprises qui en ont besoin.

La plupart des gens peuvent se contenter de la gestion automatisée grâce aux certificats offerts par [Let's Encrypt](https://www.netlify.com/blog/2016/01/15/a-worlds-first.-free-ssl-with-lets-encrypt/). La configuration se fait en un clic (bon ok peut-être trois, mais ça m'a pris moins d'une minute). En plus le certificat est renouvelé automatiquement, pour que vous n'ayez pas à le faire tous les ans.

{{< figure src="/assets/images/2018/01/ssl-config.png" caption="La configuration de SSL chez Netlify avec renouvellement automatique des certificats grâce à Let’s Encrypt" >}}

### 7. Lancer des tests avec l'intégration continue de Netlify

Une des choses qui fait que Netlify est très puissant c'est qu'en plus d'un réseau optimisé de CDN pour héberger vos sites, ils fournissent aussi un environnement de conteneurs pour lancer vos builds. Cela signifie que n'importe quel _build_ lancé dans votre environnement de développement ou sur un serveur d'intégration continue peut en fait être directement exécuté sur Netlify.

Si votre script de déploiement inclus des tests, Netlify les éxécutera pour vous et qu'il en résulte un succès ou un échec, [vous serez prévenus](https://www.netlify.com/blog/2016/07/18/shiny-slack-notifications-from-netlify/) de l'issue finale.

Remplacer mon infrastructure d'intégration continue, mon infrastructure d'hébergement ainsi que mes scripts de déploiement par un seul et unique service ? Je suis partant.

### 8. Gestion des formulaires

Si votre site a besoin d'intégrer des formulaires, vous vous êtes peut-être dit par le passé que ce n'était pas compatible avec un site statique. Pourtant Netlify propose une solution simple pour régler ce problème.

Si vous avez besoin d'ajouter un formulaire sur votre site qui récolte des informations entrées par vos utilisateurs, Netlify peut s'en charger pour vous. En ajoutant un simple attribut au code HTML de votre formulaire, [Netlify va exposer le point d'accès qui va bien pour le formulaire](https://www.netlify.com/docs/form-handling/) et rendre toutes les données postées accessibles pour vous depuis l'interface d'administration et l'API.

Comme les données sont accessibles via l'API, vous pouvez accéder à ces contenus lors de l'étape de génération afin de les utiliser sur votre site. Avec un peu d'imagination, cela ouvre pas mal de possibilités intéressantes.

Les [soumissions de formulaires](https://www.netlify.com/docs/form-handling/#receiving-submissions) peuvent aussi déclencher des notifications. Tout devient alors possible : des messages Slack, des webhooks ou même des [intégrations Zapier](https://zapier.com/app/dashboard).

### 9. Redirections, réécritures et proxy

N'oubliez aucune URL en route ! En ajoutant un fichier `_redirects` dans votre dossier déployé nous avez accès à tout plein d'options de configuration en ce qui concerne les redirections et les réécritures d'URLs. Elles sont déclenchées sur les nœuds finaux des CDN, ce qui les rend particulèrement rapides et efficientes.

Vous avez aussi la possibilité de préciser le code de réponse HTTP dans le fichier `_redirects`, ce qui vous permet de personnaliser vos erreurs 404 ou même de rendre d'autres ressources accessibles au travers d'un proxy.

Voici un exemple :

{{< gist philhawksworth 7b12a0785266f8dcf1960d2df93dfc59 >}}

Vous voulez des _splats_, des _placeholders_, des paramètres de requêtes et plus encore ? Jetez un œil à la [documentation sur les redirections](https://www.netlify.com/docs/redirects/).

### 10. Contrôle des entêtes personnalisés

Celui là ravira toux ceux qui ont hébergé leur site sur GitHub Pages et qui ont couru après le score parfait sur [Lighthouse](https://developers.google.com/web/tools/lighthouse/) ou [Page Speed Insights](https://developers.google.com/speed/pagespeed/insights/). Vous avez tout bien fait, mais vous avez besoin de pouvoir définir vos entêtes de cache HTTP pour bénéficier de cette dernière optimisation de performance qui vous manque tant… malheureusement vous n'en avez pas la possibilité.

Maintenant vous l'avez.

Netlify utilise pour cela une approche similaire à celle de la gestion des redirections que nous venons de voir plus haut. Grâce à un fichier `_headers` déposé dans votre dossier de déploiement, vous pouvez ainsi contrôler les entêtes HTTP de toutes les ressources de votre site.

Et vous pouvez faire bien plus que contrôler les entêtes de cache. La possibilité de configurer vos entêtes à l'aide de fichier `_headers` vous permet de définir votre politique de sécurité en matière de contenu (CSP), vos options `X-Frame` et plein d'autres choses toutes aussi importantes pour vous aider à contrôler la sécurité de votre site.

{{< gist philhawksworth d1deda75c8bc3d025e7d62639f904222 >}}

Bénéficier d'une telle granularité pour ce type de contrôle est souvent bien plus complexe que cela. Il me semble que cette fonctionnalité rend accessible le contrôle de la sécurité à davantage de développeurs.

## Ça en fait 10, mais ce n'est pas tout

J'aurais pu mentionner bien d'autres choses, mais vous ne voulez pas d'une liste interminable.

Plus je creuse, plus je découvre qu'il est possible de contrôler pas mal de choses. Il est important que les développeurs puissent bénéficier d'une solution simple pour mettre en ligne leurs sites statiques, et comme l'écosystème de la JAMstack évolue en permanence, les possibilités sont de plus en plus grandes.

Ça vaut le coup de garder un œil sur Netlify, d'autres fonctionnalités prometteuses sont actuellement testées par des alpha-testeurs enthousiastes.

Vous pouvez [suivre Netlify sur Twitter](https://twitter.com/Netlify) pour rester informé des nouvelles fonctionnalités, plonger dans la [documentation](https://www.netlify.com/docs/), ou prendre connaissance des [nos projets open source](https://www.netlify.com/open-source/) pour étendre les possibilités de l'écosystème [JAMstack](https://www.jamstack.org/).
