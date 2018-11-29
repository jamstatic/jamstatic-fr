---
title: "Optimisation du temps de compilation de Jekyll"
description: 
date: 2018-11-28
commments: true
author: Boris Schapira
images:
  - 
categories:
  - jekyll
---

{{% intro %}}

Il y a trois ans, fatigué par WordPress et de sa galaxie de plugins douteux, j'ai décidé de migrer vers un générateur de site statique. Après quelques essais avec diverses solutions, j'ai opté pour Jekyll, dont la communauté me semblait plus mature.

Trois ans plus tard, je commence à comprendre les forces et les faiblesses de la solution, mais je reste loin d'en maîtriser tous les mystères. Je l'ai bidouillée pour publier du contenu multilingue, j'ai développé mes propres plugins, j'ai intégré des éléments d'architecture piochés chez des amis… Disons que je suis désormais assez à l'aise.

Par contre, à force de manipulations, mon Jekyll ressemblait moins au célèbre docteur qu'au monstre de Frankenstein&nbsp;: un assemblage de portions de code grossièrement liées entre elles par des liens fragiles, se déplaçant lentement en gémissant… En un mot comme en cent&nbsp;: mon <em lang="en">build</em> était lent.

{{% /intro %}}

***

## TL;DR

* Constatant que ma compilation Jekyll était des plus lentes, j'ai contacté la communauté JAMstack francophone pour des conseils.
* Plusieurs choses ont émergé, chaque conseil permettant d'optimiser le temps de compilation.
* Le plus gros gain provient des évolutions de Jekyll lui-même, sur lequel l'équipe est en train de faire un énorme travail.

***

Pour générer [mon site](https://borisschapira.com) ([source](https://github.com/borisschapira/borisschapira.com "Dépôt Github borisschapira.com")), j'ai développé un ensemble de commandes Rake[^rake] qui se chargent de nettoyer l'espace de travail, de déterminer l'environnement de destination et de configurer la compilation en conséquence, de vérifier l'intégrité des en-têtes front-matter de mes articles, de générer le site avec Jekyll et, enfin, de contrôler ce qui est produit en utilisant [la gemme `html-proofer`](https://rubygems.org/gems/html-proofer/). Je n'exécute pas tout cela sur mon ordinateur&nbsp;: à la place, je délègue cette tâche à Netlify, branché sur mon dépôt Github pour compiler et déployer mes branches.

Toutes ces tâches prenaient individuellement du temps, mais la partie dédiée à la génération avec Jekyll restait la plus consommatrice de CPU, prenant plusieurs minutes. Résultat&nbsp;: pendant des mois, mes compilations Netlify ont duré plus de 10 minutes. Chaque compilation était plus lente que la précédente.

Il y a quelques jours, Netlify a complètement arrêté le déploiement du site web car mes compilations prenaient tellement de temps qu'elles dépassaient la limite imposée par le système d'intégration continue de Netlify[^netlimit].

Il était temps d'agir.

***

Un proverbe africain dit&nbsp;: 

> Seul, on va plus vite. Ensemble, on va plus loin.

Je ne pense pas que ce soit tout à fait vrai. Je crois que lorsque nous nous entourons des bonnes personnes, nous pouvons aller _ailleurs_, vers des possibilités que nous n'avions même pas envisagées.

***

Quand j'ai pensé que j'atteignais la limite de mes compétences, j'ai demandé l'aide à la communauté que je connais le mieux&nbsp;: les membres de JAMstatic. Et parmi eux, un membre de la <span lang="en">Core Team</span> de Jekyll, [Frank](https://github.com/DirtyF). Il m'a beaucoup aidé (et continue de le faire) en me montrant des possibilités que je n'avais pas envisagées.

## Inclusions&nbsp;: à consommer avec modération

L'expérience m'a appris qu'il est souvent plus difficile de maintenir un projet que de le réaliser en premier lieu. Pour augmenter ses chances de succès, mieux vaut trouver des techniques d'organisation du code qui soient adaptées à sa compréhension sur le long terme. À mon sens, diviser le code en portions significatives est l'une des astuces de maintenance les plus efficaces.

Dans Jekyll, cela se fait avec des inclusions, via la balise `{% include %}`. Mais attention, une décomposition de code trop ambitieuse aura un coût sur votre temps de compilation, que vous pourrez visualiser avec le [profileur Liquid [EN]](https://jekyllrb.com/docs/configuration/options/#build-command-options).

D'après [Pat Hawks](https://github.com/pathawks/), membre de la <span lang="en">Core Team</span> Jekyll&nbsp;:

> Chaque fois que vous utilisez une balise `{% include %}`, Jekyll doit ouvrir le fichier concerné, lire son contenu en mémoire, puis analyser le gabarit avec Liquid.  
> Cela se produit à chaque `{% include %}`, et pas une seule fois par fichier&nbsp;! Donc l'utilisation d'une même inclusion sur 100 pages provoquera le chargement et l'analyse de cette inclusion 100 fois. Le problème s'aggrave très rapidement si vous commencez à faire des inclusions dans vos inclusions…

Une façon de surmonter ce coût supplémentaire est de mettre en cache les blocs compilés pendant l'interprétation de votre `{% include %}`. Il y a un plugin pour cela&nbsp;: le plugin [jekyll-include-cache](https://github.com/benbalter/jekyll-include-cache) de Ben Balter. Mais attention à deux choses très importantes&nbsp;:

1. assurez-vous de passer toutes les données nécessaires à votre `{% include %}` en paramètres, car elles seront utilisées comme clés pour le cache&nbsp;;
2. si vous le pouvez, n'utilisez des inclusions que pour générer des portions de code réutilisables. Si les paramètres de l'inclusion la rendent si spécifique qu'elle n'est pas réutilisable ailleurs, alors le cache relatif à cette inclusion aura été construit pour rien et n'apportera aucun gain de performance.

Ces deux contraintes sont si fortes qu'elles m'ont obligé à réintégrer plus de la moitié de mes inclusions dans mes gabarits (_\_layouts_). Je ne suis pas entièrement satisfait de cette situation (car, en conséquence, je trouve que les capacités de maintenance sont dégradées) mais je dois avouer que j'ai gagné près de **10&nbsp;%** de temps de compilation[^parole] en sacrifiant ce petit confort.

Et avec des commentaires Liquid (`{% comment %}This is a comment{% endcomment %}}`), je peux toujours organiser efficacement mon code, même réintégré dans un seul fichier.

## Faites confiance aux gemmes compilées en C

Par défaut, Jekyll est basé sur un ensemble de gemmes écrites en Ruby. Récemment, de nouvelles gemmes sont apparues, partiellement écrites en C, ce qui améliore leur performance d'exécution. L'équipe Jekyll a eu la gentillesse d'ajouter des tests conditionnels dans le générateur pour utiliser ces gemmes si elles sont référencées dans votre Gemfile. Vous n'avez donc qu'à ajouter les gemmes à votre Gemfile pour tirer parti de ces améliorations.

Il en existe certainement d'autres, mais en voici au moins deux&nbsp;:

- [la gemme `liquid-c`](https://github.com/Shopify/liquid-c), pour optimiser la compilation Liquid&nbsp;;
- [la gemme `sassc`](https://github.com/sass/sassc-ruby), si vous avez besoin de Jekyll pour compiler des fichiers Sass plus efficacement.

Je n'ai pas besoin de Jekyll pour mes fichiers Sass mais en utilisant `liquid-c`, j'ai économisé **9&nbsp;%** du temps de compilation.

## Si vous pouvez l'éviter, n'utilisez pas LSI

Jekyll est livré avec une option très pratique appelée <em lang="en">Latent Semantic Indexing</em> (LSI) dont le rôle est d'analyser tout le contenu avant de générer le site, afin d'alimenter, pour chaque article, une collection qualitative d'articles connexes (au lieu des dix articles les plus récents). LSI fait un très bon travail mais si vous avez des centaines d'articles comme moi, il fonctionnera lentement, très lentement[^gsl].

Après une très rapide non-analyse des données analytiques dont je ne dispose pas[^analytics], j'ai décidé de me séparer de la proposition d'articles associés et d'économiser **17&nbsp;%** du temps de compilation.

## Markdown&nbsp;: choisissez la bonne variante

Markdown est un langage à balisage léger vraiment sympa mais il lui manque une chose très importante&nbsp;: une standardisation. Il existe des douzaines de parseurs Markdown, chacun avec ses caractéristiques spécifiques. Depuis quelque temps, une initiative de standardisation émerge autour de [CommonMark](https://commonmark.org/), et les projets l'implémentant fleurissent.

Par défaut, Jekyll utilise [kramdown](https://kramdown.gettalong.org/), un surensemble de Markdown développé en Ruby qui fait du très bon boulot. Pour le remplacer par CommonMark, j'ai voulu utiliser [commonmarker](https://github.com/gjtorikian/commonmarker) qui est, encore une fois, un wrapper Ruby pour une implémentation en C. Pour en tirer parti dans Jekyll, vous pouvez utiliser [le plugin jekyll-commonmark de Pat Hawks](https://github.com/jekyll/jekyll-commonmark).

Attention, la transition n'est pas sans adaptations. kramdown et CommonMark sont assez différents&nbsp;: en passant de l'un à l'autre, j'ai dû sacrifier quelques sucres syntaxiques. 

Par exemple, CommonMark ne supporte pas les attributs de bloc tels que `{ :.myclass}` pour décorer un paragraphe de contenu. Vous aurez besoin d'utiliser de bonnes vieilles balises HTML. N'oubliez pas d'activer l'option `UNSAFE` dans votre configuration Jekyll (`_config.yml`) si vous ne voulez pas générer beaucoup de commentaires du type `<!-- raw HTML omitted -->`&nbsp;:

```
markdown: CommonMark
commonmark:
  options: ["SMART", "FOOTNOTES", "UNSAFE", "HARDBREAKS"]
  extensions: ["strikethrough", "autolink", "table"]
```

Vous remarquerez peut-être aussi que CommonMark est moins tolérant que kramdown, qui corrige à la volée de nombreuses approximations de contribution. Passer à cet analyseur m'a aidé à détecter des problèmes dans mes articles que je n'avais jamais remarqué auparavant. Si vous avez un contenu conséquent, attendez-vous à devoir corriger quelques coquilles.

Un petit prix à payer pour gagner encore **9&nbsp;%** de temps de compilation.

## Faites confiance à la <em lang="en">Team</em> pour aller dans la bonne direction

Enfin, l'une des dernières améliorations apportées a été le passage à la version `master` de Jekyll. Depuis la version 3.8.5 (ma version précédente), de nombreuses améliorations ont été apportées, et le gain de performance est vraiment considérable&nbsp;: **93&nbsp;%**&nbsp;! 

Je n'arrivais tellement pas à y croire que j'ai temporairement versionné mon dossier `_site` et vérifié qu'il n'y avait rien de cassé en changeant de version. Et dans mon cas&nbsp;: rien à redire, tout est parfait.

Si vous ne deviez retenir, ou tester, qu'une seule optimisation, c'est celle-ci. Faites confiance à la <span lang="en">Core Team</span>, la performance est une de leurs priorités.

## Qu'en est-il de mon chantier multilingue&nbsp;?

Avec toutes ces optimisations, ma compilation Jekyll est passée de plus de 15 minutes à environ une minute. C'est encore beaucoup, et je sais pourquoi&nbsp;: ma gestion "fait maison" de l'internationalisation, et plus particulièrement de la traduction de mes articles, est sous-optimale.


Elle est basée sur une clé front-matter `i18n-key` qui me permet de faire se correspondre mes articles et pages d'une langue à l'autre et sur un plugin qui, pour chaque contenu, scanne tous les autres contenus pour trouver ceux qui sont des traductions du contenu courant. Cette stratégie O(n²), bien que facile à mettre en œuvre, n'est pas efficace du tout et pénalise mes performances de compulation.

[Ashwin Maroli](https://github.com/ashmaroli), l'un des membres de la <em lang="en">Jekyll Plugin Core Team</em>, travaille sur un plugin qui utilise une convention d'organisation des fichiers pour trouver les traductions, ce qui devrait considérablement améliorer les choses&nbsp;: [jekyll-locale](https://github.com/ashmaroli/jekyll-locale). J'ai essayé d'implémenter le plugin sur mon blog mais j'ai rencontré quelques impondérables lors de cette première tentative. J'y reviendrai plus tard, une fois que j'aurais simplifié mon organisation des contenus. J'aurais également besoin que certains autres plugins soit modifiés pour être compatibles, comme [jekyll-paginate-v2 de Sverrir Sigmundarson](https://github.com/sverrirs/jekyll-paginate-v2), qui me sert pour la pagination.

Je ne manquerai pas d'en parler quand j'attaquerai à nouveau ce chantier

***

## Protocole expérimental

Comme les optimisations ci-dessus nécessitent également de modifier le contenu, je n'ai pas effectué de benchmark en parallèle de l'implémentation itérative des optimisations. J'ai attendu d'avoir complètement terminé, et donc d'avoir le contenu final, puis j'ai repris ma configuration d'avant optimisation et j'ai analysé les gains étape par étape.

Voici mon protocole de test&nbsp;: Je suis parti d'une installation sans aucune de ces optimisations, puis j'ai écrit un script implémentant les optimisations une par une et compilant le site (sauf la suppression des inclusions, car… j'étais trop paresseux pour scripter la modification des gabarits, je l'avoue). J'ai ensuite programmé l'exécution du script 10 fois et je me suis couché pendant que mon ordinateur passait près de 16 heures à passer ces optimisations au banc d'essai.

Voici les données brutes, si certains veulent jouer avec&nbsp;:

| Run     	| Step                     	| Done in… (s) 	|
|---------	|--------------------------	|--------------	|
| Test 1  	| 1 - Before               	| 1337,872     	|
| Test 1  	| 2 - Switch to liquid-c   	| 1509,997     	|
| Test 1  	| 3 - Remove LSI           	| 1264,981     	|
| Test 1  	| 4 - Switch to CommonMark 	| 1282,607     	|
| Test 1  	| 5 - Switch to master     	| 64,949       	|
| Test 2  	| 1 - Before               	| 1510,356     	|
| Test 2  	| 2 - Switch to liquid-c   	| 1457,161     	|
| Test 2  	| 3 - Remove LSI           	| 1239,278     	|
| Test 2  	| 4 - Switch to CommonMark 	| 1058,934     	|
| Test 2  	| 5 - Switch to master     	| 72,335       	|
| Test 3  	| 1 - Before               	| 2148,253     	|
| Test 3  	| 2 - Switch to liquid-c   	| 1465,446     	|
| Test 3  	| 3 - Remove LSI           	| 1253,785     	|
| Test 3  	| 4 - Switch to CommonMark 	| 886,152      	|
| Test 3  	| 5 - Switch to master     	| 92,384       	|
| Test 4  	| 1 - Before               	| 1621,322     	|
| Test 4  	| 2 - Switch to liquid-c   	| 1506,737     	|
| Test 4  	| 3 - Remove LSI           	| 1225,414     	|
| Test 4  	| 4 - Switch to CommonMark 	| 1057,497     	|
| Test 4  	| 5 - Switch to master     	| 87,943       	|
| Test 5  	| 1 - Before               	| 1589,323     	|
| Test 5  	| 2 - Switch to liquid-c   	| 1607,33      	|
| Test 5  	| 3 - Remove LSI           	| 1261,815     	|
| Test 5  	| 4 - Switch to CommonMark 	| 914,124      	|
| Test 5  	| 5 - Switch to master     	| 77,526       	|
| Test 6  	| 1 - Before               	| 1643,596     	|
| Test 6  	| 2 - Switch to liquid-c   	| 1481,98      	|
| Test 6  	| 3 - Remove LSI           	| 1237,843     	|
| Test 6  	| 4 - Switch to CommonMark 	| 1336,47      	|
| Test 6  	| 5 - Switch to master     	| 69,099       	|
| Test 7  	| 1 - Before               	| 1456,432     	|
| Test 7  	| 2 - Switch to liquid-c   	| 1487,558     	|
| Test 7  	| 3 - Remove LSI           	| 1268,737     	|
| Test 7  	| 4 - Switch to CommonMark 	| 1106,233     	|
| Test 7  	| 5 - Switch to master     	| 69,562       	|
| Test 8  	| 1 - Before               	| 2943,453     	|
| Test 8  	| 2 - Switch to liquid-c   	| 1492,383     	|
| Test 8  	| 3 - Remove LSI           	| 1229,34      	|
| Test 8  	| 4 - Switch to CommonMark 	| 1321,156     	|
| Test 8  	| 5 - Switch to master     	| 70,332       	|
| Test 9  	| 1 - Before               	| 1587,532     	|
| Test 9  	| 2 - Switch to liquid-c   	| 1586,698     	|
| Test 9  	| 3 - Remove LSI           	| 1264,424     	|
| Test 9  	| 4 - Switch to CommonMark 	| 950,634      	|
| Test 9  	| 5 - Switch to master     	| 69,907       	|
| Test 10 	| 1 - Before               	| 1643,22      	|
| Test 10 	| 2 - Switch to liquid-c   	| 1581,063     	|
| Test 10 	| 3 - Remove LSI           	| 1229,119     	|
| Test 10 	| 4 - Switch to CommonMark 	| 1332,547     	|
| Test 10 	| 5 - Switch to master     	| 69,022       	|

[^parole]: Vous allez devoir me croire sur parole, parce que mon protocole d'expérimentation ne contenait pas de test avec et sans inclusions. Il s'agit donc d'une estimation personnelle.

[^rake]: Rake est un orchestrateur similaire à make, mais en Ruby ([en savoir plus](https://rubygems.org/gems/rake/)).

[^gsl]: Il semblerait que [la gemme gsl](https://rubygems.org/gems/gsl) permette d'améliorer cela, mais je ne l'ai pas testé. Vos retours m'intéressent.

[^netlimit]: 15 minutes, comme confirmé par Chris McCraw dans son article "[How Our Build Bots Build Sites](https://www.netlify.com/blog/2016/10/18/how-our-build-bots-build-sites/)".

[^analytics]: Parce que je n'ai pas besoin de ça pour connaître les personnes qui me lisent, car elles interagissent souvent avec moi dans les commentaires ou sur Twitter.

