---
title: "Publier des livres avec un générateur de site statique"
date: "2017-01-23 15:37:15 +0100"
description: Le web au secours de la modernisation du procédé de publication de livres numériques et papier.
author: antoine
image: http://blogs.getty.edu/iris/files/2016/05/eric_ruth_greg_1009_1200.jpg
---

Suite à la parution du [procédé de publication numérique basé sur Git et Middleman](http://blogs.getty.edu/iris/an-editors-view-of-digital-publishing/) d'un éditeur, [Antoine Fauchié](https://www.quaternum.net/) est allé poser quelques questions à [Eric Gardner](http://egardner.github.io/), développeur et designer, actuellement en charge de la modernisation de la chaîne de publication chez [The Getty](https://getty.edu/), un campus culturel et de recherche situé à Los Angeles.

> Comment et pourquoi en êtes vous arrivés à choisir un générateur de site statique comme clé de voûte de votre processus de publication aux éditions Getty ? Pourquoi ne pas avoir opté pour un développement natif ?

Lorsque j'ai commencé à travailler chez Getty, le programme de publication numérique était assez récent. Il y avait eu précédemment plusieurs expérimentations qui adoptaient toutes une approche CMS plus traditionnelle ainsi qu'une application mobile développée par un prestataire externe, mais au bout de quelques années ces projets sont devenus difficile à maintenir.

Je voulais expérimenter une chaîne de production statique pour plusieurs raisons. Premièrement, je voulais m'assurer que notre travail demeure accessible aussi longtemps que possible. Les évolutions technologiques sont rapides, mais l'édition universitaire est un processus lent – particulièrement dans les domaines comme l'histoire classique ou de l'histoire de l'art, où la recherche peut se faire sur des décennies. Personne ne voudrait publier chez nous s'ils avaient peur que leurs travaux disparaissent deux ans plus tard. Un logiciel complexe comme un CMS ou une application mobile nécessitent une maintenance constante pour rester viable ; vous ne pouvez pas continuer de publier de nouveaux livres si la contrainte de la maintenance augmente à chaque projet. C'est vraiment de ça dont il est question avec un générateur de site statique, on espère que le produit final fonctionne pendant longtemps. Et même si ce n'est pas le cas, les contenus sous-jacents subsisteront pour toujours sous la forme de fichiers texte lisibles par des humains dans un dépôt Git.

Notre deuxième préoccupation était la dépendance à des logiciels propriétaires. Des sociétés comme Adobe ou Apple ont créé des outils très bien faits, mais qui possède vraiment vos contenus à la fin de la journée ? Si un produit cesse d'être maintenu, vous ne pouvez pas faire grand chose en tant qu'éditeur – vos travaux seront perdus. Une plate-forme open source semble être l'unique solution pour assurer à vos auteurs et à vos éditeurs le contrôle de leurs documents.

Enfin, comme toute personne ayant une formation en design, je me soucie beaucoup du design et de l'expérience que nous proposons à nos utilisateurs. Les livres imprimés que Getty publie sont vraiment beaux, et je veux faire perdurer autant que possible cette tradition sur le web. Cela tombe bien, un site "statique" n'a pas besoin d'être ennuyeux – les applications statiques HTML, CSS et JavaScript peuvent proposer tout un tas de fonctionnalités interactives ainsi q'un design et une typographie de grande qualité.

> Comment votre équipe s'est appropriée ce nouveau workflow ? L'appropriation a-t-elle été facile ?

Il est vrai que publier de cette façon signifie que pas mal de choses vont changer. Heureusement j'ai de super collègues qui étaient prêts à se familiariser avec le nouveau procédé. Notre équipe en charge du numérique a bénéficié de quelques formations "Démarrer avec GitHub" qui ont été bien reçues, et écrire en Markdown n'est pas si différent qu'écrire dans n'importe quel autre traitement de texte. J'espère cependant toujours que nous pourrons rendre le procédé moins pénible – configurer l'environnement de développement pour prévisualiser son travail peut encore intimider. J'aimerais développer des outils pour aider à simplifier ce procédé pour les gens.

> Est-ce que tu penses qu'un process à base de technologies web peut remplacer le couple démoniaque Word et InDesign ? Particulièrement en ce qui concerne la facilité d'écriture et de structuration des contenus (WYSIWYG) ainsi que la mise en page (InDesign) ?

Je pense qu'on s'en rapproche (et je frémis à l'idée d'essayer d'obtenir un texte propre à partir d'un jeu de fichiers InDesign…). Mais nos outils ont encore du chemin à parcourir ; j'ai écris [un article là dessus](http://blogs.getty.edu/iris/digital-publishing-needs-new-tools/) sur le blog de Getty il y a un petit moment. Les gens utilisent Word et InDesign parce qu'ils sont intuitifs et bien pensés, notre workflow est encore un peu rude en comparaison. Toutefois le monde du texte brut possède des outils vraiment puissants lui aussi : une véritable gestion des versions (bien mieux que le système de révisions), des éditeurs étonnamment puissants comme Vim ou Emacs[^1], la possibilité de spécifier ce qu'on veut dire vraiment avec des languages de balisage simples comme [Markdown](https://learnxinyminutes.com/docs/fr-fr/markdown/) ou [Asciidoc](https://learnxinyminutes.com/docs/asciidoc/), etc. Je pense que l'équivalence visuelle exacte n'est plus l'objectif à atteindre ici. A contrario, des outils intuitifs et fiables, qui essaient avant tout d'aider les gens à exprimer du *sens* et ce dans plus d'un contexte de présentation, c'est plutôt ça la voie à suivre.

> Est-ce que ce nouveau process augmente la qualité des publications de Getty ?

Haha, j'ai l'impression que la barre est déjà assez haute donc je veux déjà produire un travail de qualité équivalente à nos livres papier. Mais l'édition numérique peut vous permettre de faire des choses qui ne seraient pas possible dans l'édition papier et j'ai espoir que ces nouvelles affordances du médium aideront à faire progresser la recherche de façon singulière. Nous travaillons actuellement sur un livre numérique dans lequel figure par exemple beaucoup de partitions musicales, pouvoir avoir des annotations, des discussions ainsi que de la lecture audio et vidéo dans un même document, c'est quelque chose de véritablement passionnant.

> Est-ce que ce nouveau workflow vous fait gagner du temps et de l'argent ? Y'a-t-il une différence de prix de revient pour les livres, y compris pour les livres papier ?

Cela varie en fonction des maisons d'édition, mais globalement je dirais que non. Des publications de qualité, cela demande beaucoup de travail de la part de gens spécialisés et le format numérique ne change rien à cela. Cependant il nous permet de rendre disponibles des choses qu'il ne serait autrement pas viable de publier. Depuis que je travaille chez Getty, nous avons travaillé sur plusieurs catalogues pour des collections d'œuvres d'art. Ce sont principalement des outils de recherche pour une audience assez spécifique. En publiant d'abord un catalogue en ligne, dans différents formats, nous pouvons rendre cette information (y compris des images interactives de grand qualité) disponible pour les spécialistes. Et la possibilité de générer un fichier PDF à partir de la version web signifie que les gens qui veulent une copie imprimée pourront toujours en acheter une, grâce à notre offre d'impression à la demande. Donc dans ce genre de situation, je pense que la publication numérique peut aider à certains projets à devenir plus rentables.

> Quelles sont les contraintes auxquelles vous vous heurtez encore aujourd'hui ? Quel serait votre workflow idéal ?

Tout à l'heure j'ai dit que le fait de configurer un environnement de développement, de travailler avec les outils de programmation plus bas-niveau (comme Git) peut s'avérer être frustrant et déroutant pour les non-programmeurs et que ces outils pourraient être améliorés. J'aimerais une application avec une interface simple qui facilite l'écriture en Markdown, branchée sur Git et qui permette de faire des choses comme choisir un modèle de livre, sans forcer l'utilisateur final à se soucier de la gestion de dépendances ou de l'installation de librairies[^2].

> Est-ce que tu penses que d'autres maisons d'édition vont adopter à leur tour cette stratégie avec des générateurs de site statique (pas de WYSIWYG, un balisage léger, pas de base de données, des métadonnées YAML, versionnement avec Git, etc.) ? Est-ce qu'un courant pourrait se former autour de ce concept ?

Des collègues qui travaillent pour d'autres musées m'ont fait part de leur interêt. Pour le moment, je ne pense pas que quelqu'un ait publié un livre à l'aide de ce procédé, mais j'espère bien que ça changera bientôt. Une fois que nous aurons un peu affiné notre procédé, je prévois de faire un peu plus d'"évangélisation" 😉

------

[^1]: NdT: Des éditeurs comme Sublime ou Atom sont aussi puissants et encore plus accessibles.
[^2]: NdT: Le projet [GitBook](https://www.gitbook.com) adopte cette démarche.
