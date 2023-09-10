---
title: Gatsby + Contentful + Netlify et Algolia
description: >
  Retour d’expérience sur la mise en place d’un site statique à l’aide de Contentful, Gatsby, Algolia et Netlify pour une qualité et un coût défiant toute concurrence.
author: frank
date: 2017-12-05
source:
  lang: en
  title: Gatsby + Contentful + Netlify (and Algolia)
  url: https://www.gatsbyjs.org/blog/2017-12-06-gatsby-plus-contentful-plus-netlify/
  author: Josh Weaver
categories:
  - gatsby
  - contentful
  - netlify
  - algolia
  - cms
  - headless
---
:::intro
Le passage d’un CMS traditionnel comme WordPress à un processus moderne de développement faisant appel à différents services dans le Cloud et à des générateurs de site statique open source peut sembler encore risqué. C’est sans doute pour cela qu'une fois le pas franchi, vous avez immédiatement envie de partager votre enthousiasme, afin de montrer que non seulement c'est possible, mais que ça peut se faire sans douleur et à moindre coût. Le témoignage de [Josh Weaver](https://twitter.com/3cordguy) sur la migration d’un site de documentation vient s'ajouter à la longue liste des heureux convertis à la [Jamstack](page:post/5-raisons-de-tester-la-jamstack).
:::

Gatsby connaît un vif succès et une [adoption](https://github.com/gatsbyjs/gatsby#showcase) croissante depuis peu et ce pour de bonnes raisons. C’est un outil suffisamment flexible pour s'adapter à pas mal de situations.

Si votre budget est serré et que vous ne voulez pas sacrifier l’expérience de développement ou les déploiements à la pointe, je me suis arrêté sur un ensemble d’outils (dont Gatsby bien entendu) pour développer des sites statiques, qui résolvent plusieurs problématiques d’un coup.

L'exemple que je vais couvrir ici est [le site de documentation][rollcalldocs] pour le principal logiciel édité par notre entreprise. Le site regroupe beaucoup de contenus avec des centaines d’articles.

La liste de prérequis pour ce site est la suivante :

- Vitesse — autant pour le développement que pour la performance du site
- Facilité d’utilisation — autant pour le développeur que pour le contributeur
- Recherche — c'est un site de documentation après tout
- Hébergement pas cher — maximisation de la valeur (qui ne la recherche pas ?)
- Déploiement en continu automatisé

Voici donc un retour d’expérience global sur l’utilisation de [Gatsby](https://www.gatsbyjs.org) avec [Contentful](https://www.contentful.com/), [Netlify](https://netlify.com) et [Algolia](https://algolia.com), les problèmes qu'ils aident à résoudre — sans mettre le nez dans le code.

Je sais que ce n'est pas bien de formuler des hypothèses, mais je vais quand même partir du principe que si vous lisez ceci c'est que vous en savez déjà un peu sur [les avantages offerts par les sites statiques et la Jamstack](page:post/5-raisons-de-tester-la-jamstack). Si ce n'est pas le cas, allez faire un tour sur [jamstack.org](https://jamstack.org/) pour comprendre en détail pourquoi le développement web, à défaut d’une meilleure formule, "revient aux sources".

Je me suis pas mal pris la tête avec Joomla dans un passé, en passe d’être enfoui et plus récemment avec WordPress, je suis alors entré en quête d’une façon de simplifier les choses. Je ne veux pas à avoir à m'inquiéter qu'un plugin ou qu'un thème puisse se faire hacker ou à être constamment obligé d’appliquer des mises à jour. J'aimerais tant qu'à faire ne pas avoir à gérer de thèmes du tout et simplement avoir à ma disposition des blocs de construction flexibles pour définir l’apparence de mon site à l’aide de mon propre code. Les sites statiques excellent dans ce domaine.

Mais si les sites statiques possèdent de nombreux avantages, ils ne sont pas dépourvus de nouveaux défis à relever.

Bien qu'ils soient rapides par défaut, les sites statiques ne font rien pour faciliter l’édition de contenu. Après tout, le contenu d’un site statique est juste statique. Cela veut dire que traditionnellement vous devez modifier le code de la page ou ajouter un fichier Markdown, lancer une génération, puis un déploiement. Bien que les générateurs de sites statiques aient résolu cela de façons diverses, j'ai le sentiment que Gatsby résout ce problème de façon particulièrement élégante à l’aide de sa couche d’abstraction des données avec GraphQL (on y reviendra) et son vaste écosystème de [plugins de sources de données](https://www.gatsbyjs.org/docs/plugins/).

Avant que j'aborde la thématique du contenu et des données, je voudrais juste dire que développer un gabarit de page pour un site statique avec une architecture basée sur React et le rechargement à chaud des modules, c'est juste du bonheur. L'outil en ligne de commande de Gatsby vous aide à faire ça très vite. C’est vraiment super plaisant à utiliser. À en croire les [nombreux tweets](http://twitter.com/gatsbyjs) qui clament la même chose, je pense que c'est un sentiment partagé.

OK, revenons aux problèmes posés par le statique.

Notre site a beaucoup de contenus (environ 300 articles) qui ont besoin d’être maintenus par mes collègues, qui ne sont pas des développeurs. Nous avions donc besoin d’une interface accessible pour copier et modifier le contenu. Je voulais que ce soit aussi simple que de se connecter dans WordPress et pouvoir publier depuis l’outil, mais sans WordPress. L'expérience de rédaction ne pouvait donc pas se résumer à la création d’un fichier et à enregistrer les changements dans un dépôt Git.

:::tip
Il existe un plugin [Gatsby-Source-WordPress](https://www.gatsbyjs.org/packages/gatsby-source-wordpress/) qui récupère le contenu via l’API de WordPress. Toutefois, en ce qui me concerne, ce n'était pas vraiment souhaitable, car je voulais éviter d’avoir à héberger un CMS traditionnel.
:::

Contentful est un CMS headless hébergé avec une expérience utilisateur fantastique. C’est comme avoir une interface comme WordPress, sauf que vous êtes entièrement responsable de la couche client. La beauté de Contentful est triple :

- Une interface utilisateur attractive et intuitive,
- Un modèle de contenu simple,
- [Une formule gratuite](https://www.contentful.com/pricing/).

L'utilisation de l’interface d’administration de Contentful est intéressante et la modélisation du contenu est bien plus avancée comparé à ce que proposent d’autres gestionnaires de contenu headless. Contenful ne se contente pas de faire le job, le service se révèle très agréable à l’utilisation. Et ils viennent juste d’inclure [de nouvelles fonctionnalités](https://www.contentful.com/blog/2017/11/28/work-smarter-with-our-new-search-features/) qui permettent de rechercher et de filtrer les articles encore plus facilement.

Contentful propose également [une formule gratuite généreuse](https://www.contentful.com/pricing/) avec des fonctionnalités bien utiles pour une petite agence ou pour quelques projets. Actuellement, l’offre comprend plusieurs espaces (ou projets si vous préférez), dix mille enregistrements et cinq utilisateurs qui peuvent être administrateurs, éditeurs ou auteurs de contenu. Tout ce que Contentful demande en échange c'est d’afficher leur logo dans votre pied de page ou de les mentionner dans le fichier README de votre dépôt.

Maintenant que je vous ai fait ce petit topo, comment Contentful vient s'interfacer avec un site sous Gastsby ?

Notre documentation est composée de 40 entrées et chaque entrée comporte plusieurs articles. Notre gros challenge était de concevoir une navigation par entrée.

![Navigation documentation](https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523346549/jamstatic/rollcall-docs.png "Navigation documentation.")

La façon dont Gastby gère les données permet de résoudre facilement ce genre de problématique, car il est très simple de récupérer des données depuis des sources externes. Ce n'est pas le _seul_ générateur de site statique à faire cela — il existe aussi des plugins pour d’autres générateurs qui permettent de récupérer du contenu, mais je trouve l’insertion des données dans vos composants React et vos pages à l’aide de GraphQL très élégante.

Après avoir installé le [plugin](https://www.gatsbyjs.org/packages/gatsby-source-contentful/) `gatsby-source-contentful` avec NPM et avoir ajouté vos paramètres de connexion à l’API de Contentful au fichier `gatsby-config`, on va pouvoir enfin s'amuser.

Dès que vous lancez la commande `develop` ou `build` de Gatsby, le plugin va vérifier à l’aide de l’API de Contentful si de nouveaux contenus sont disponibles et les télécharger. Toutes ces données sont dès lors disponibles pour que vous puissiez faire vos requêtes dans votre environnement de développement. Cela veut dire que vous pouvez commencer à récupérer les assets et le contenu depuis Contentful (les assets comprennent les images et autres médias, le contenu désigne les pages, les articles, tous vos contenus texte et vos fichiers Markdown) à l’aide de requêtes GraphQL directement dans vos fichiers de gabarits de page.

:::tip
J'ai mis en place un blog pour ma femme à l’aide de Gatsby avant de travailler sur ce site de documentation, j'avais donc un peu d’expérience dans l’utilisation des APIs de Gatsby. Mais je me considère encore comme un grand débutant dès qu'il s'agit de travailler avec GraphQL. Heureusement pour moi, les tutos de Gatsby et de la communauté sont excellents et répondent aux questions qu'on peut se poser, ainsi qu'à celles liées à l’utilisation globale.
:::

À l’aide d’une seule requête GraphQL, j'ai été capable de récupérer toutes les entrées et les articles relatifs définis dans mon modèle de contenu dans Contentful pour la navigation. Grâce à l’efficacité de React et à un peu de GraphQL, j'ai été capable de créer une barre de menu latérale générée dynamiquement à partir du contenu récupéré depuis Contentful. Je dois dire que c'est un sentiment assez grisant de pouvoir créer du contenu statique à partir de données dynamiques de la sorte.

Les articles quant à eux sont écrits en Markdown dans l’éditeur de Contentful. Ils sont convertis en HTML à l’aide d’un plugin dans Gatsby. L'édition de contenus en Markdown est super pratique grâce à des fonctionnalités similaires à celles que l’on retrouve dans n'importe quel éditeur WYSIWYG. J'ai n'ai eu aucun retour négatif de mes collègues.

Un autre "problème" avec les sites statiques, c'est qu'ils n'embarquent pas une recherche par défaut. La plupart des solutions de recherche fait appel à un serveur et à une base de données. Sur un site de documentation, les utilisateurs s'attendent à bénéficier d’une recherche efficace. Il existe quelques bibliothèques front-end uniquement en JavaScript (comme [lunr.js](https://lunrjs.com/)) qui vont prendre une requête et parcourir un index pré-construit au format JSON de votre contenu.

J'aurais pu créer cet index en allant taper dans la méthode `onPostBuild` de l’API de Gatsby. Cet évènement se déclenche une fois que toutes les pages ont été générées, tous les nœuds de pages sont prêts à être parcourus pour créer un index de recherche.

J'ai rapidement compris que cette approche n'aurait pas bien fonctionné dans notre cas à cause du nombre important d’articles. Le fichier d’index à lui seul aurait été assez gros et aurait représenté une grosse part du téléchargement du site, ce qui me semblait être complètement antithétique avec les bénéfices de performance offerts par l’utilisation de Gatsby (ou d’un site statique). J'avais besoin d’une solution qui opère côté client, mais dont la logique applicative réside quelque part dans le Cloud. Et même si ça aurait pu être une option, je n'avais pas le temps de développer ma propre solution.

La solution s'est profilée petit à petit en testant et en échouant. Lors de mes pérégrinations de développeur j'avais vu que pas mal de sites de documentation utilisaient Algolia en production. Je savais qu'Algolia propose une formule gratuite (là aussi en faisant figurer leur logo) avec un nombre d’appels à l’API suffisant pour notre audience. Par contre je ne savais pas comment faire pour que tout mon contenu soit indexé proprement. La documentation d’Algolia est d’une grande aide en ce qui concerne l’indexation.

Le plus difficile était de savoir comment découper le contenu des articles en petits morceaux pour respecter les prérequis de l’indexation. [La documentation d’Algolia](https://www.algolia.com/doc/guides/indexing/structuring-your-data/?language=php#indexing-long-documents) indique que les enregistrements de l’index ne doivent pas dépasser 10kb chacun, ce qui équivaut à peu près à un ou deux paragraphes. C’est devenu soudainement un défi de parcourir le contenu de mes articles par section. Il n'y avait pas d’exemple assez parlant à ma disposition pour savoir comme faire cela.

J'ai fini par me tourner vers une bibliothèque HTML vers JSON qui transforme la hiérarchie de la page en objet JSON parcourable. J'ai ajouté un script sur l’évènement `onPostBuild` de l’API de Gatsby qui récupère le HTML généré de chaque article. La bibliothèque s'est occupée de transformer magiquement le HTML en JSON, je n'avais plus qu'à parcourir le JSON. Tout en gardant la trace du dernier niveau de titre lié (les balises `h`), j'ai défini le lien de page de l’enregistrement d’index en conséquence pour chaque section d’article. L'index est en suite transféré chez Algolia via leur client en node.js.

C'était pas super propre, mais ça marchait.

J'ai fini par coupler la méthode d’indexation avec [React InstantSearch](https://community.algolia.com/react-instantsearch/). C’est la bibliothèque du composant React officiel d’Algolia pour utiliser leur service. Au final j'avais un champ de recherche avec des suggestions de résultats en surbrillance qui permettaient aux gens de cliquer sur un de ces résultats pour être amené directement sur le titre parent d’un article en particulier.

Sympa.

Toutefois une fois que j'ai eu mis tout ça en place, il s'est avéré que j'avais quelques problèmes dans mon implémentation qui m'ont obligé à demander de l’aide au support. Je recevais des mails relatifs à l’utilisation du quota alors que j'étais persuadé d’être encore très loin d’avoir atteint les limites de l’usage autorisé.

L'ironie a voulu que je découvre [DocSearch](https://community.algolia.com/docsearch/) d’Algolia à ce moment-là. Et comme le ferait tout bon développeur, j'ai mis tout mon travail à la poubelle et je me suis inscrit sur DocSearch. Pour faire cours, DocSearch va crawler votre site toutes les 24 heures et mettre à jour l’index pour vous. Vous ajoutez une balise script qui relie votre champ de rechercher à leur API. Vous affinez les styles avec un peu de CSS et hop, c'est terminé.

![Algolia DocSearch FTW](https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523346556/jamstatic/algolia-search.png "Algolia DocSearch FTW.")

Et ça marchait bien mieux que mon implémentation. Je me suis senti tout bête d’avoir dû fournir autant d’efforts pour rien, car j'ai réalisé que la réponse était dans le [code source](https://github.com/reactjs/reactjs.org/search?utf8=%E2%9C%93&q=docsearch&type=) du dépôt de Reactjs.org. Ils utilisent DocSearch au lieu de construire leur propre indexation et leur propre interface de recherche. Très bien.

Un truc qui est super avec les sites statiques, c'est qu'on peut les héberger partout. Vous vous retrouvez avec un dossier rempli de fichiers générés que vous pouvez déposer sur n'importe quel serveur et vous êtes bons. Vous pouvez même le mettre dans un bucket Amazon S3 et économiser un paquet d’argent pour un effort minime.

Mais si l’hébergement est aisé, les sites statiques demandent une étape supplémentaire pour déployer les changements effectués sur le contenu ou le code d’un site — à l’inverse de WordPress et des autres CMS traditionnels où chaque changement est immédiatement enregistré sur le serveur.

Si vous ne mettez pas en place une sorte de déploiement automatisé, vous devez déclencher une génération manuellement et la mettre en ligne vous-même. Je voulais un processus de déploiement continu — je pousse un _commit_ sur mon dépôt et Gatsby lance une génération dans le Cloud et déploie automatiquement une nouvelle version du site chez un hébergeur.

Est-ce que je peux faire ça avec AWS ? Bien sûr, mais ça demande un peu de paramétrage et du travail ingrat de configuration. Est-ce que je ne pourrais pas faire ça ailleurs sans avoir autant de choses à configurer ? Est-ce que tout ça peut être gratuit ?

Heureusement je connaissais déjà les réponses à ces questions, car j'avais déjà découvert Netlify à l’occasion de projets précédents.

Brancher mon site statique sur le workflow de Netlify se fait tout seul, et après être tombé sur Gatsby, je savais que c'était la seule option possible. Les deux sont parfaitement complémentaires !

Netlify a récemment revu [ses tarifs](https://www.netlify.com/pricing/) pour améliorer ce qui était déjà un hébergement au top vu le prix. Je suis obligé de lister dans cette partie toutes les raisons qui font que Netlify est tellement extra :

- Formule gratuite dans le cadre de projets personnels ou commerciaux (c'est vraiment une super offre gratuite),
- activation du HTTPS en un clic grâce à Let's Encrypt,
- réseau de CDN ultra-rapide,
- support des noms de domaines personnalisés,
- déploiements automatiques
- un moteur de génération intégré super cool,
- [et bien plus…](https://www.netlify.com/features/)
- Et si je vous dis que tout ça est GRATUIT ?

Voyons maintenant son utilisation avec Gatsby.

Après avoir lié votre site Netlify à un de vos dépôts de code, les robots chargés de la génération chez Netlify s'occupent de tout le reste. À partir de là, dès qu'il y aura un changement dans votre dépôt, le bot va dire "Hé regarde : un changement ! Il faut que je lance la commande `gatsby build`", ensuite il va respecter ce qui est défini dans le fichier `package.json` (ou dans le fichier de yarn) du dépôt et télécharger les dépendances nécessaires si elles ne sont pas encore en cache, enfin il va générer le site statique.

Et pendant le processus de génération, les APIs intelligentes de Gatsby vont prendre soin de rapatrier le contenu de Contentful et de générer les pages statiques pour les articles. Trop bien. Quand c'est terminé, vous pouvez même recevoir une notification sur Slack ou par mail.

Netlify c'est le robot magique qui résout votre problème de déploiement et d’hébergement.

Associé à votre site Gatsby, la performance du site est exceptionnelle. Que ce soit la performance perçue ou la performance mesurée. Les temps d’obtention du premier byte sont de l’ordre de quelques millisecondes. Le découpage du code et les avantages de pré-téléchargement de Gatsby aident aussi à ce que votre site obtienne de bons scores aux tests de performances. Tout ça sans n'avoir rien à faire.

![Indicateurs de performance de la page](https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523346563/jamstatic/webpage-test.png "Indicateurs de performance de la page.")

Pour boucler la boucle, nous avions besoin de pouvoir déclencher une nouvelle génération du site à chaque édition ou ajout de contenu depuis Contentful. Une fois de plus Contentful et Netlify disposent de tout ce qu'il faut.

Contentful propose une fonctionnalité de _webhook_ qui vous permet de déclencher une requête quand une action est effectuée sur un contenu ou qu'un contenu est crée. Parfait, à l’aide de ce hook Contentful va pouvoir indiquer à Netlify quand il y a un changement, et Netlify va générer le site et le déployer.

![Déclenchement de la génération par webhook](https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523346571/jamstatic/netlify-build-webhook.png "Déclenchement de la génération par webhook.")

C’est l’association rêvée au paradis de la Jamstack.

La génération avec Gatsby se fait sous soucis et sans stress. Gatsby sait se faire oublier pour vous permettre d’exprimer votre créativité et votre habilité — et offre quelques avantages de folie comme la gestion des images reponsive et le _lazy loading_, sans que cela ne nécessite beaucoup d’effort de votre part. Contentful vous permet de vous concentrer sur vos contenus, de la même manière que Gatsby vous laisse vous concentrer sur votre développement et Netlify… marche, tout simplement. Il vous suffit de cliquer sur quelques boutons et vous vous retrouvez à vous demander "Non, mais c'est vraiment aussi simple que ça ?".

Maintenant, j'espère que nos clients partageront ce sentiment avec notre site.

[rollcalldocs]: http://rollcalldocs.netlify.com/ "Version beta"
