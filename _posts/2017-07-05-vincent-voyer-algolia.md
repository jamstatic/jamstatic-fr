---
title: Entretien avec Vincent Voyer, fullstack engineer chez Algolia
date: 2017-07-05 00:00:00 +02:00
description: Présentation d'Algolia, un service de recherche personnalisé pour votre
  site web.
image: "/assets/images/algolia-smashing.png"
---

<div class="intro" markdown="1">

Sur un site généré, l'interactivité est reléguée côté client, au navigateur,
donc à JavaScript. Si vous souhaitez intégrer une partie dynamique sur votre
site _statique_, il faudra donc faire appel à une API externe. C'est tout le
concept de la
[JAMStack]({% post_url 2017-03-16-5-raisons-de-tester-la-jamstack %})
dont nous parlons sur ce blog. Et c'est typiquement le cas si vous souhaitez
intégrer un moteur de recherche sur votre site généré. Heureusement pour nous,
en ce qui concerne la recherche, [Algolia](https://www.algolia.com/) propose une
API et des bibliothèques qui vont faciliter l'intégration d'une recherche de
qualité.

Avec une [formule community gratuite](https://www.algolia.com/pricing) qui
autorise 10 000 enregistrements et 100 000 opérations par mois, c'est une
solution intéressante à tester pour des sites statiques à trafic modeste. En
proposant une personnalisation et une expérience utilisateur poussée, on peut
dire qu'Algolia est ce qui se fait de mieux en la matière.

Nous sommes donc allés interroger Vincent Voyer, ingénieur JavaScript fullStack
chez Algolia pour qu'il nous en dise un peu plus sur ce service en pleine
croissance qui a réussi en l'espace de quelques temps à conquérir la communauté
des développeurs web.

</div>

### Bonjour Vincent, on va peut-être commencer par te présenter ?

{% include_cached figure.html
url="http://m.c.lnkd.licdn.com/mpr/mpr/shrinknp_400_400/p/2/005/070/3f2/1de75f6.jpg"
description="Vincent Voyer, développeur JS chez Algolia" %}

**Vincent Voyer** : Donc moi je suis Vincent Voyer, sur Twitter j'étais zeroload
maintenant je suis [vvoyer](https://twitter.com/vvoyer), je suis développeur
JavaScript. Pendant un moment j'ai fait expert performance web, j'ai travaillé
chez Fasterize dont j'étais cofondateur, j'ai travaillé chez Mappy, j'ai fait
du conseil en développement freelance pour lemonde.fr, France Télévision…
Aujourd'hui je suis chez Algolia où je suis toujours développeur JavaScript.
Je travaille principalement sur des bibliothèques open source qui permettent
d'intégrer Algolia sur tous les sites web.

J'aime le basket, j'essaie d'inviter des co-workers toutes les semaines, c'est
cool, ce soir on y va, on est trois plus le reste de l'équipe. J'ai 32 ans, une
femme et un enfant. Voilà.

### T'as l'air de bien t'éclater, qu'est-ce qui te plaît chez Algolia ?

**Vincent Voyer** : J'ai une petite anecdote à ce sujet. Quand j'étais
développeur freelance, je suis allé à DotJS, y'avait un stand Algolia, je suis
simplement passé devant. Après il y avait une conférence d'un gars qui
s'appelle [Substack](https://twitter.com/Substack), James Halliday, un gros
développeur JavaScript de la communauté npm, qui disait que la recherche sur
le site de npm n'était pas super, quand on met deux mots ça fait un ET et pas
un OU, y'a pas de tolérance aux fautes de frappe, c'est pas super.

Je repasse devant le stand Algolia et là y'avait une énergie, y'avait Alexandre
Colin, qui était Solution Engineer à cette époque-là, qui présentait Algolia.
Ils me disent qu'ils recrutent. Je me dis je pourrais faire un petit test avec
Algolia pour faire un moteur de recherche de paquets npm.

Du coup j'ai fait ça, en fin d'année 2014, un petit test de recherche de paquets
npm : j'ai pris 300 000 paquets npm, j'ai crée un index de recherche Algolia
avec. J'ai commencé à faire les premières requêtes, ça prenait 4 millisecondes.

J'étais capable de faire une recherche dans un champ de recherche, d'exécuter
une requête, élaborée à l'aide du framework Express et d'obtenir des résultats
en temps réel en 4ms en incluant le temps de latence réseau, etc. 4ms, 10ms, je
me suis dit : wouah c'est quand même incroyable !

Voilà, ma première rencontre avec Algolia c'était ça. Et très vite après j'ai
été en contact avec eux car je voulais refaire leur client JavaScript, qui ne me
plaisait pas en tant que développeur JavaScript…

### Comment définirais-tu l'activité d'Algolia ?

**Vincent Voyer** :
[Algolia](https://www.algolia.com/doc/guides/getting-started/what-is-algolia/)
c'est un moteur de recherche en Saas (Software as a Service), en gros c'est une
API qui permet de créer un index de recherche pour son propre site web. Par
exemple si vous avez un site web e-commerce avec 100 000 produits. Pour faire
votre moteur de recherche : soit vous le faites vous-même, ou vous prenez
ElasticSearch, etc. Du coup, vous devez gérer l'infrastructure, etc. Soit vous
optez pour une solution Saas comme Algolia, qui vous permet de mettre tous vos
produits dans un index de recherche et qui vous expose une API pour ajouter ou
modifier des produits mais aussi pour chercher vos produits.

Aujourd'hui les gros clients d'Algolia dont on peut parler c'est Stripe, Strava,
8tracks, CrunchBase, Periscope, Twitch, etc. Donc c'est des gros noms, ça marche
plutôt bien. Algolia existe depuis cinq ans maintenant.

### Pourquoi est-ce que le moteur de recherche d'Algolia est aussi rapide aujourd'hui ?

**Vincent Voyer** :
C'est parce qu'au début c'était un SDK pour développeurs d'applications mobiles,
pour les aider à mettre un champ de recherche dans leur application mobile sur
les données utilisateurs. Et comme il fallait que ce SDK tourne sur tous les
types de mobiles, que ça soit un vieux smartphone Nokia ou le dernier iPhone, du
coup tout le code était optimisé pour que ce soit vraiment rapide à tout moment,
donc optimisé à la milliseconde près.

Ce produit-là n'a pas fonctionné et quand ils ont fait Ycombinator, un
incubateur de startups aux États-Unis, ils leur ont dit : "C'est pas ça qu'il
faut faire en fait, c'est une API Web". Ils ont fait ça et ça a fonctionné et
aujourd'hui c'est notre principal produit, l'API et le moteur de recherche
d'Algolia.

### Google ne s'est jamais trop positionné sur les moteurs de recherche internes, d'ailleurs ils ont annoncé arrêter leur produit Google Site Search. Votre positionnement c'est de vous cantonner à la recherche sur site ?

**Vincent Voyer** :
Oui c'est ça. Généralement votre site de e-commerce, il a une base de données
avec des produits structurés. Beaucoup de gens passent par Google pour
rechercher des produits. Ils vont chercher par exemple "FNAC + iPhone" sur
Google. Le truc c'est qu'ils vont arriver sur le site de la FNAC et si ça se
trouve, ils vont vouloir faire une nouvelle recherche. Donc là sur le site de la
FNAC il y a un champ recherche et ce champ de recherche là il faut qu'il soit
beau. Ce que propose Google c'est une recherche dans l'Internet au global mais
ils ne proposent pas d'implémenter un bon moteur de recherche pour son site web.
En fait ils le proposaient, ça s'appelait [Google Site
Search](https://enterprise.google.com/search/products/gss.html), ils proposaient
aux éditeurs de site web de mettre un champ de recherche avec des pages de
résultats dédiées au site en cours, c'est pas les résultats dans le monde. Mais
c'est pas suffisant.

Nous ce qu'on a voulu proposer c'est qu'on sait qu'un site de e-commerce il a
une base de données avec des objets structurés et on s'est rendu compte que pour
fournir une bonne expérience de recherche, avec de la tolérance à la faute de
frappe, avec du filtrage par type d'objet, il fallait pouvoir connaître la
structure d'un objet. Il faut savoir qu'une page produit, elle a une catégorie,
pour pouvoir proposer aux gens de filtrer sur cette catégorie-là. Du coup Google
aujourd'hui il ne sait pas faire ça, il essaie de déterminer en fonction de ses
algorithmes ce dont parle une page, mais dans les résultats Google on va pas
pouvoir dire : "je veux tous les iPhone", on va pouvoir l'exprimer avec une
requête, mais s'il le faut, cette requête elle va nous renvoyer des iPhone, des
coques d'iPhone, des livres sur l'iPhone, etc. Nous ce qu'on propose c'est des
objets structurés qui permettent ensuite aux développeurs de site web de créer
des menus, des sliders pour filtrer, etc.

### La recherche à facettes ça existe déjà sur les sites de e-commerce, même s'il est vrai que l'expérience de recherche n'est pas toujours géniale. Je me rappelle que quand j'ai découvert [Algolia pour Magento](https://community.algolia.com/magento/), j'étais content de voir arriver un nouvel acteur qui décide de proposer une expérience de recherche au top

**Vincent Voyer** :
Les gens s'attendent aujourd'hui à avoir la meilleure expérience de recherche,
qui est celle de Google. Et Google ils ont fait un truc qui s'appelle _Instant
Search_, qui affiche des propositions au fur et à mesure qu'on tape notre
requête. Donc déjà tous les moteurs de recherche ont dû se baser sur ça et
proposer le _Search as you Type_. C'est super important car ça permet à la
personne de ne pas avoir à taper "iPhone" puis de taper sur la touche Entrée, se
rendre compte qu'elle veut changer, revenir en arrière, etc. Là c'est au fur et
à mesure, c'est naturel. Ça, ça vient aussi du fait que ça a été développé sur
mobile à la base, car c'est encore plus compliqué de faire des workflows de
navigation sur mobile, du coup sur mobile il faut que ce soit le plus simple
possible. L'autre paramètre qui a été pris en compte c'est la tolérance aux
fautes de frappe.

Toutes ces choses là il y a des moteurs de recherche qui les font, mais chez
Algolia on s'est rendu compte qu'il n'y en avait aucun qui remplissait tous les
critères : une bonne performance, la gestion des fautes de frappe, du faceting
avancé et des résultats personnalisés, à savoir la capacité à dire : j'ai une
liste d'iPhone, mais je veux en faire remonter certains dans les résultats. Par
exemple sur la requête "iPhone" je vais vouloir favoriser certains résultats.
Par exemple je ne veux pas que ce soit les coques d'iPhone qui apparaissent en
premier, je veux que ce soit les iPhone. Nous on a par exemple un _custom
ranking_ qui fait que ce sont les produits les plus consultés qui vont remonter
de façon naturelle. Au fur et à mesure que les gens vont sur la page iPhone, on
va mettre l'index de recherche à jour et l'affichage des résultats va être
naturel par rapport à ce que les gens demandent.

Algolia propose donc toutes ces fonctionnalités, performance, typo tolérance,
faceting et recherche avancés, que ne proposent pas forcément les autres moteurs
de recherche.

### OK, revenons un peu au statique. Vous êtes présents sur beaucoup de sites de documentation ou de [recherche de paquets comme yarn](https://yarnpkg.com/lang/fr/). Ces sites sont générés à l'aide de différents outils. Comment avez-vous implémenté tout ça ?

**Vincent Voyer** :
La stratégie d'Algolia c'est d'avoir une super bonne _Developer Experience_ et
d'essayer de capter un maximum de développeurs sur notre plate-forme forcément,
pour que tout le monde soit au courant qu'on est un super moteur de recherche.
Sachant que nous-mêmes nous sommes développeurs, et que nos outils c'est `npm`,
c'est `yarn`, ça va être Hacker News, les différents frameworks PHP comme
Laravel ou Symfony, React pour le monde JavaScript. Tout ça ce sont nos outils
de tous les jours.

Et on a fait un jour le constat que sur tous ces sites-là, c'est souvent
difficile de trouver l'information qu'on cherche. Donc on a fait un projet qui
s'appelle [DocSearch](https://community.algolia.com/docsearch/), qui est en gros
un crawler de documentation pour les développeurs. DocSearch fournit aujourd'hui
de la recherche pour les développeurs sur plus de 300 sites web. Donc quand vous
cherchez sur le site web de React, de Flow, de Symfony, de Laravel, en fait
c'est Algolia qui est derrière. On l'affiche, c'est pour ça qu'on rend ce
service gratuitement, c'est parce que derrière ça va faire parler de nous et ça
nous permet à nous en interne d'être plus efficaces.

En faisant cela, nous avons pollinisé d'autres communautés et plein d'autres
sites ce sont dit : "Hé, je veux la même recherche, c'est super !"

Donc on a construit au fur et à mesure ces différents projets.

### Comment ça fonctionne ?

**Vincent Voyer** :
DocSearch c'est un crawler de site web avec des configurations par site. Pour
chaque site on va dire : le nom d'une méthode dans l'API, c'est dans cette
balise HTML, etc. Ça ressemble un petit peu à ce que fait Google, mais là c'est
fait de façon contrôlée, c'est pas un algorithme générique, on cible exactement
ce à quoi on veut que ressemble la documentation.

Donc on a fait ça, c'était un des premiers gros trucs pour la communauté des
développeurs, et à côté de ça on a aussi tout ce qui est outillage qu'on fournit
aux développeurs qui utilisent Algolia.

Ce dont on a envie c'est qu'à aucun moment ils se disent "Algolia ça a l'air
d'être un super moteur de recherche, mais c'est juste une API, y'a rien
derrière, du coup je suis obligé de tout construire. Si j'utilise Symfony, il va
falloir que je développe mon propre connecteur Symfony-Algolia, si j'utilise
Jekyll pareil, si j'utilise React il va falloir que je fasse mes propres
composants qui vont faire la liaison entre des composants React et la recherche
sur Algolia."

Du coup c'est ce qu'on a fait au fur et à mesure, pour tous les langages de
programmation les plus utilisés. On a 14 clients d'API je crois (JavaScript,
Ruby, Python, Go, etc.).

Ce qui permet à chaque développeur de ne pas avoir à implémenter son propre
client d'API qui se base sur notre API. On les a vraiment créés pour eux. La
plupart des boîtes s'arrête à trois et ils se disent pour les autres "c'est la
communauté qui les fera à un certain moment". Ça marche ou ça ne marche pas, la
qualité est là ou pas. Nous on les a fait pour tout le monde, tout est open
source donc les gens participent.

Et après on est allé encore plus loin, car les clients d'API c'est assez bas
niveau, sachant que sur un site web ce que je veux c'est une page de recherche
avec un champ recherche, avec une navigation, un slider sur le prix, etc.

Donc on a crée des bibliothèques plus haut niveau qui permettent d'exprimer ça
pour le développeur. Il est capable à l'aide de widgets de dire "là je mets un
champ de recherche, là je mets un sélecteur sur les genres de films, là je mets
un slider sur l'année de sortie du film", ce genre de choses.

Tout ça il peut l'exprimer à l'aide
d'[InstantSearch](https://community.algolia.com/instantsearch.js/v2/), qui est
un projet qui englobe des sous-projets. InstantSearch c'est un ensemble de
bibliothèques haut-niveau pour implémenter de la recherche avec Algolia.

### C'est complémentaire avec DocSearch dont tu parlais tout à l'heure ?

**Vincent Voyer** :
Non, ce sont deux produits différents, on a plein de produits qu'on essaie de
regrouper au fur et à mesure. InstantSearch c'est vraiment pour les clients
d'Algolia généralement qui vont vouloir implémenter de la recherche sur leur
application React ou VueJS par exemple, de façon plus simple que de devoir faire
des appels à l'API d'Algolia qui est très puissante, certes, mais elle est
puissante parce qu'elle est modulaire, donc nous on cache un peu cette
modularité pour répondre à la plupart des cas d'utilisation qu'ont les gens,
tout en laissant la porte ouverte pour des trucs un petit peu plus avancés qui
seront faits avec des paramètres différents.

InstantSearch c'est disponible pour du Vanilla JavaScript, c'est à dire sans
framework, pour React, pour VueJS bientôt, pour iOS, etc.

Pour React c'est intéressant, on est capable de construire notre recherche
complète, web et application native, et même bientôt server-side rendering avec
une seule bibliothèque, sans avoir à mettre beaucoup de code entre les
différents éléments de connexion. Pour l'utilisateur c'est super simplifié.

### Ça inclut React Native ?

**Vincent Voyer** :
Oui, même si on n'a pas encore des widgets tout faits pour React Native, on ne
les a que pour le web, par contre on est capable de facilement abstraire la
création d'un menu de genre de films par exemple, si c'est un site de recherche
de films.

Tout ça pour en venir où ? Tu parlais des générateurs de site statique. Tous ces
sites-là, InstantSearch pour React, InstantSearch Vanilla, InstantSearch VueJS,
etc. ils ont des sites dédiés et ces sites-là on essaie de les faire du mieux
possible, donc y'a une documentation complète, des guides, des tutoriels, un
petit peu comme le site de documentation de React ou de Laravel, c'est vraiment
un site complet où la personne va pouvoir y passer du temps et progresser au fur
et à mesure dans sa connaissance du produit.

Ces sites-là au fil du temps on les a fait évoluer. On est parti de
[Jekyll](https://jekyllrb.com/), parce que le site d'Algolia c'est une appli
Ruby on Rails, du coup il y avait déjà des connaissances en Ruby. Au bout d'un
moment, on est arrivé aux limites de Jekyll et beaucoup de nos développeurs
JavaScript voulaient travailler avec un outil en JavaScript. On a aussi essayé
[Middleman](https://middlemanapp.com). Donc on a des sites en Jekyll, en
Middleman, aujourd'hui on utilise [MetalSmith](http://www.metalsmith.io/), qui
est un générateur assez bas niveau, très modulaire, qui nous a permis de créer
différents petits modules pour sites statiques, comme par exemple extraire
automatiquement depuis le code la [JSDoc](http://usejsdoc.org/), des pages
descriptives. Pour chaque widget InstantSearch par exemple c'est le cas : on
prend la JSDoc avec des exemples, on transforme tout ça en une page Markdown et
HTML qui décrit le widget. Idem pour d'autres parties de l'API, idem pour les
guides.

Donc aujourd'hui on utilise MetalSmith, et ça nous va bien, le seul truc c'est
qu'on a pas encore fait un module qui abstrait tous les sites web, parce qu'en
fait chaque site web est peu du copier-coller aujourd'hui, donc on aimerait bien
faire un truc qui nous permette de partager plus de code entre les différents
sites web. Ça nous plait bien parce qu'à chaque fois qu'on a un besoin pour
l'écrire c'est assez simple. Le flow de MetalSmith, il prend un répertoire
`source` et ensuite il applique des middleware qui font transformer les fichiers
de ce répertoire `source`, donc on peut faire vraiment ce qu'on veut à partir du
moment où on sait écrire du JavaScript, c'est assez cool.

### Aujourd'hui dans l'écosystème JS, beaucoup utilisent Hexo comme générateur, on voit aussi apparaître des générateurs qui embarquent React comme Gatsby ou Phenomic. Du coup on pourrait imaginer pouvoir avoir des composants Algolia. Vous seriez intéressés par des solutions aussi packagées ?

**Vincent Voyer** :
Nous on fait des sites super custom où on modifie vraiment beaucoup la source,
on n'a pas pris ces solutions là, on a peut-être loupé quelque chose, mais avec
MetalSmith on est bien aujourd'hui. Mais les gens poussent pour essayer d'autres
choses, donc on essaiera peut-être autre chose. À partir du moment où l'outil
nous facilite la vie. Il y a clairement des choses avec MetalSmith qui sont
difficiles à faire, par exemple faire du bon live-reload, c'est à nous de le
faire. Ce qui est possible aussi c'est qu'avec notre expérience avec MetalSmith,
on se fasse nous-mêmes notre propre générateur de site statique pour Algolia.

### Dans le monde des sites statiques, on a beaucoup parlé de [la refonte de Smashing Magazine]({% post_url 2017-03-17-smashing-mag-va-dix-fois-plus-vite %}) dernièrement dont la recherche a été développée avec Algolia, ça marche très bien. Le site est généré avec Hugo, un générateur écrit en Go, or, il n'y a pas de plugin natif Algolia pour Hugo, même si vous fournissez un client pour votre API en Go

{% include_cached figure.html url="/assets/images/algolia-smashing.png" description="La
recherche de la nouvelle version de Smashing Magazine avec Algolia" %}

**Vincent Voyer** :
Oui, on a des gens spécialisés en Go ici. En fait c'est vraiment en fonction des
besoins, certaines personnes vont parfois venir sur notre GitHub pour nous dire
"j'aimerais bien avoir un client d'API pour Rust", et là on va se dire OK on va
le faire. On fait vraiment comme ça, Après parfois on propose, mais seulement si
nous en avons l'utilité en interne, parce que sinon on ne saura pas si le plugin
est vraiment bien fait vu qu'on l'utilisera pas.

Le plugin Jekyll on l'a fait parce qu'on l'utilisait, le premier site
InstantSearchJS, on utilisait le plugin
[algoliasearch-jekyll](https://github.com/algolia/algoliasearch-jekyll) pour
transférer les données de Jekyll vers Algolia. Après on a fait DocSearch, car
tous ces sites web-là, comme ils ont plein de générateurs de site statique
différents, nous on propose un niveau d'abstraction supplémentaire et on crawle
à partir du HTML. Ce qui fonctionne aussi très bien et nous permet de ne pas à
avoir à faire de plugins pour chaque générateur.  Maintenant s'il y a quelqu'un
qui veut un plugin Hugo ou Phenomic, du coup il faudra venir nous en parler et
on pourra faire.

### Pour info Hugo et Gatsby sont les deux générateurs qui ont la côte en ce moment, ce sont deux projets très actifs

**Vincent Voyer** : OK, je me le note.

### Algolia a levé 53 millions de dollars récemment, vous recrutez pas mal de gens, c'est quoi les prochaines priorités pour vous ?

**Vincent Voyer** :
Notre ambition est d'être un acteur principal du monde de la recherche,
aujourd'hui il y a ElasticSearch qui est aussi un énorme acteur. Et le scope
d'Algolia n'est pas terminé. Beaucoup de clients nous challengent sur des choses
qu'Algolia ne sait pas encore faire. Tous nos clients e-commerce veulent
généralement avoir un contrôle plus précis sur la gestion des résultats, des
promotions, etc.

Aujourd'hui on n'a pas vraiment beaucoup d'outils pour faire ça, Algolia c'est
vraiment un outil orienté pour les développeurs, donc c'est quelque chose sur
lequel on travaille à fond, le fait de répondre encore plus finement aux besoins
des sites e-commerce et aux gens qui veulent faire du businness sur les sites de
e-commerce, qui veulent avoir des outils de contrôle des résultats de recherche.

Donc on fait des évolutions sur les APIs pour permettre aux développeurs de
construire des outils plus orientés business et e-commerce.

Sur tout ce qui est bibliothèques, InstantSearch c'est vraiment notre
sous-produit phare de création d'interface de recherche, on en fait une vraie
marque. Le mot InstantSearch regroupe plein de sous-projets et ces projets on
les fait évoluer et on en crée des nouveaux.

Je t'ai parlé de VueJS, parce que c'est un framework qui est vraiment beaucoup
utilisé, on va avoir potentiellement Angular s'il y a un énorme besoin Angular.
Toujours dans l'optique de dire qu'il faut que l'expérience de développement
soit la meilleure.

Sur une roadmap plus précise des évolutions d'Algolia, c'est assez compliqué, je
suis pas forcément le plus à même de t'en parler. Moi je travaille beaucoup sur
InstantSearch par exemple, mais oui le moteur de recherche d'Algolia évolue
énormément et va continuer d'évoluer énormément en fonction des besoins de nos
clients qui nous challengent beaucoup dessus.

On travaille aussi beaucoup sur les datasets. Aujourd'hui Algolia sait bien
répondre à des jeux de plusieurs millions de données, qu'est-ce qui se passe
quand on arrive à des centaines de millions ou à des milliards de données ? Ça
c'est un gros challenge pour la plupart des moteurs de recherche et les bases de
données donc on est en train de travailler sur ça. C'est important pour pouvoir
passer de 100 millions d'objets — ce qui est déjà énorme —  à 800 millions ou 1
milliard.

### Toujours sur des données structurées ? Si j'ai des données non structurées, est-ce qu'Algolia peut faire quelque chose ?

**Vincent Voyer** :
On travaille sur des outils qui vous nous permettre d'aller chercher des clients
qui n'ont pas forcément des données structurées, mais dans tous les cas, ce
qu'on fait c'est que ces outils-là vont permettre de transformer ce qui n'est
pas structuré en données structurées. Ça peut être un outillage en PHP pour
pouvoir extraire, depuis une page HTML ou un article de blog sous Wordpress par
exemple, de la donnée structurée pour la faire rentrer dans le moteur d'Algolia,
donc scinder en paragraphes, en titres, etc. Donc ça ce sont des choses qu'on
fait parce qu'effectivement, tout le monde n'a pas forcément une base de données
structurée et pourtant ils ont quand même besoin d'un bon moteur de recherche.
Mais au final on est convaincu qu'on n'ira pas vers ce que fait Google où on a
des mots-clés en surbrillance dans les pages au complet. On essaiera de toujours
extraire de la donnée structurée d'un site web, car il y a toujours de la
structure. Un article de blog, une page qui liste des fonctionnalités, tout ça a
une structure, c'est simplement qu'il faut la trouver.

### Et pour les données enfermées dans des tableurs, des fichiers PDF ?

**Vincent Voyer** :
Même chose, ce sont des outils qui vont être capables d'aller chercher de la
donnée et de l'indexer pour Algolia.

Dans les sujets qui nous intéressent, il y a aussi la recherche vocale. Moi-même
je fais beaucoup de choses avec Siri sur mon téléphone, j'envoie des textos, je
lance des recherches, etc. Et ça c'est quelque chose qu'on va devoir supporter,
prévoir des fonctionnalités qui permettront aux gens de faire des recherches
avec la voix.

On a des projets qui tournent avec Alexa (la voix d'Amazon Echo). On peut
développer des _skillsets_ qui vont permettre de dire à un client dans son
application Alexa de faire une recherche sur son site plus facilement. Nous,
notre responsabilité là-dedans, ça va être de se connecter de la bonne façon
dans le moteur Alexa, définir comment on va scinder la phrase de l'utilisateur
et comment ça, ça va être appliqué à la recherche.

**Frank** : Merci Vincent, merci pour toutes ces informations sur Algolia. C'est
vraiment un chouette produit qui on l'a compris permet de fournir une recherche
vraiment pertinente pour l'utilisateur. Pour en savoir plus rendez-vous sur
[Algolia.com](https://algolia.com).
