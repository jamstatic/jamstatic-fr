---
date: 2017-02-09T15:21:52Z
description: Jetons un coup d'œil au fonctionnement interne de Harp, un générateur
  de site statique écrit en JavaScript
image: https://cdn.css-tricks.com/wp-content/uploads/2017/02/terraform-1.jpg
title: Qui y'a t-il dans un générateur de site statique ?
url: /2017/02/09/y-a-quoi-dans-un-generateur-de-site-statique/
---

Après être aller regarder [sous le capot de Jekyll]({% post_url 2017-01-17-comment-fonctionne-jekyll %}) et toujours dans l'idée de continuer à nous familiariser avec différents générateurs de site statique, voici la traduction d'un [article de Brian Rinaldi paru chez CSS-tricks](https://css-tricks.com/really-makes-static-site-generator/), qui nous entraîne cette fois-ci dans les entrailles de [Harp](https://harpjs.com/), un générateur de fichiers statiques développé en JavaScript, qui résume bien le périmètre fonctionnel de ces outils.
{: .intro }

Je parle beaucoup des générateurs de site statique mais je parle toujours de comment _utiliser_ des générateurs de site statique. Ils sont souvent perçus comme une boîte noire. Je crée un modèle, j'écris un peu de Markdown et hop j'obtiens une page entièrement formatée en HTML. C'est magique !

Mais qu'est-ce vraiment un générateur de site statique ? Qu'y-a-t-il dans cette boîte noire ? De quelle magie Vaudou s'agit-il ?

Dans cet article, nous allons examiner les différentes parties qui constituent un générateur de site statique. Premièrement, nous parlerons des généralités et ensuite nous regarderons de plus prêt un vrai bout de code source en plongeant au plus profond d'[HarpJS](https://harpjs.com/). Alors, enfilez votre casquette d'aventurier et partons en exploration.

Pourquoi Harp ? Pour deux raisons. La première est qu'HarpJS est, de par sa conception, un générateur de site statique très simple. Il ne possède pas beaucoup de fonctionnalités qui feraient que nous nous perdrions en route en voulant explorer un générateur de site statique plus complet (comme [Jekyll](http://jekyllrb.com/) par exemple). La deuxième raison à cela, bien plus pragmatique, est que je connais bien JavaScript alors que je ne connais pas très bien Ruby.

## Les rudiments d'un générateur de site statique

En vérité, un générateur de site statique c'est un concept très simple. Les ingrédients clefs d'un générateur de site statique sont typiquement :

-   Un ou des langage(s) de gabarit pour créer les modèles de pages/articles,
-   Un langage de balisage léger (en général Markdown) pour rédiger le contenu,
-   Un langage de balisage structurel (souvent YAML) pour définir la configuration et les métadonnées (par exemple "[front
    matter](https://jekyllrb.com/docs/frontmatter/)"),
-   Un ensemble de règles et de structure pour organiser et nommer les fichiers qui seront exportés/compilés, les fichiers qui ne le seront pas et comment ces fichiers seront traités (par exemple préfixer un fichier ou un fichier avec un tiret bas(`_`) signifie qu'il ne sera pas recopié avec les fichiers du site final ou encore tous les articles vont dans un dossier `posts`),
-   Un moyen de compiler les modèles et le balisage en HTML (le support pour des pré-processeurs CSS ou JavaScript est également fréquemment inclus),
-   Un server local pour tester.

C'est tout. Si vous vous dites "Hé… mais je pourrais en développer un!" vous avez sûrement raison. Les choses se compliquent quand vous commencez à ajouter des fonctionnalités, comme la plupart des générateurs de site statique le font.

Regardons donc maintenant comment Harp gère tout cela.

## Allons au cœur du problème

Voyons comment Harp fait pour gérer les ingrédients clefs décris ci-dessus.
Harp offre plus que cet ensemble de fonctionnalités, mais pour l'examen qui nous intéresse, nous nous limiterons à ces éléments.

Premièrement, parlons des rudiments de Harp.

## Les rudiments de Harp

Harp supporte [Jade](https://pugjs.org) et
[EJS](http://www.embeddedjs.com/) (pour les modèles) et Markdown comme langage de balisage léger (pour le contenu). Remarquez que bien que Jade d'appelle maintenant Pug, Harp n'est pas officiellement mis à jour sa documentation ou son code, donc nous parlerons encore de Jade dans cet article. Harp offre aussi le support pour d'autres pré-processeurs comme Less, Sass et Stylus pour CSS et CoffeeScript pour JavaScript.

Par défaut, Harp n'a pas trop besoin de configuration ou de métadonnées. Il tend à favoriser [une convention plutôt que de la
configuration](https://harpjs.com/docs/development/rules). Toutefois, il permet de configurer ou d'ajouter des métadonnées à l'aide de fichiers JSON. Il se distingue de beaucoup d'autres générateurs de site statique car le fichier de métadonnées est stocké en dehors du fichier le concernant dans un fichier `_data.json`.

Bien qu'il soit configurable jusqu'à un certain point, Harp a établi des règles strictes sur la manière de structurer les fichiers. Typiquement, comme dans beaucoup d'applications, les fichiers qui sont servis sont stockés dans un dossier `public`. Et tout fichier ou dossier préfixé d'un tiret bas(`_`) ne sera pas servi.

Enfin, Harp intègre un serveur web local basique de test qui offre quelques options de configuration. Et bien entendu, Harp va compresser les fichiers HTML, CSS et JavaScript finaux pour le déploiement.

###  Regardons donc le code source de Harp

Comme l'essentiel de ce qui fait un générateur de site statique ce sont les règles et les conventions, le code s'occupe principalement de servir et de compiler (en grande partie). Fouillons tout ça.

### La fonction serveur

Dans Harp, servir votre projet se fait généralement en lançant la commande `harp server` depuis votre terminal. Regardons le [code for cette
fonction](https://github.com/sintaxi/harp/blob/master/lib/index.js):

```js
exports.server = function(dirPath, options, callback){
      var app = connect()
      app.use(middleware.regProjectFinder(dirPath))
      app.use(middleware.setup)
      app.use(middleware.basicAuth)
      app.use(middleware.underscore)
      app.use(middleware.mwl)
      app.use(middleware.static)
      app.use(middleware.poly)
      app.use(middleware.process)
      app.use(middleware.fallback)

      return app.listen(options.port || 9966, options.ip, function(){
        app.projectPath = dirPath
        callback.apply(app, arguments)
      })
    }
```

Bien que la fonction ait l'air simple, il y a manifestement un paquet de choses qui se passent dans  [middleware](https://github.com/sintaxi/harp/blob/master/lib/middleware.js)
et qui n'est pas visible ici.

Le reste de cette fonction lance un serveur avec les options spécifiées (s'il y en a). Ces options comprennent un port, une adresse IP à laquelle se connecter et un répertoire. Par défaut le port est le 9000 (et pas le 9966 comme pourrait le laisser penser le code), le répertoire est le répertoire courant (celui dans lequel Harp est lancé) et l'adresse IP est `0.0.0.0`.

Ces options par défaut sont détaillées dans le [code source de l'exécutable en ligne de commande](https://github.com/sintaxi/harp/blob/master/bin/harp).

### La fonction de compilation

Restons dans le fichier
[index.js](https://github.com/sintaxi/harp/blob/master/lib/index.js) et jetons maintenant un coup d'œil à la fonction suivante `compile`.

```js
exports.compile = function(projectPath, outputPath, callback){

      /**
       * Both projectPath and outputPath are optional
       */

      if(!callback){
        callback   = outputPath
        outputPath = "www"
      }

      if(!outputPath){
        outputPath = "www"
      }


      /**
       * Setup all the paths and collect all the data
       */

      try{
        outputPath = path.resolve(projectPath, outputPath)
        var setup  = helpers.setup(projectPath, "production")
        var terra   = terraform.root(setup.publicPath, setup.config.globals)
      }catch(err){
        return callback(err)
      }


      /**
       * Protect the user (as much as possible) from compiling up the tree
       * resulting in the project deleting its own source code.
       */

      if(!helpers.willAllow(projectPath, outputPath)){
        return callback({
          type: "Invalid Output Path",
          message: "Output path cannot be greater then one level up from project path and must be in directory starting with `_` (underscore).",
          projectPath: projectPath,
          outputPath: outputPath
        })
      }


      /**
       * Compile and save file
       */

      var compileFile = function(file, done){
        process.nextTick(function () {
          terra.render(file, function(error, body){
            if(error){
              done(error)
            }else{
              if(body){
                var dest = path.resolve(outputPath, terraform.helpers.outputPath(file))
                fs.mkdirp(path.dirname(dest), function(err){
                  fs.writeFile(dest, body, done)
                })
              }else{
                done()
              }
            }
          })
        })
      }

      /**
       * Copy File
       *
       * TODO: reference ignore extensions from a terraform helper.
       */
      var copyFile = function(file, done){
        var ext = path.extname(file)
        if(!terraform.helpers.shouldIgnore(file) && [".jade", ".ejs", ".md", ".styl", ".less", ".scss", ".sass", ".coffee"].indexOf(ext) === -1){
          var localPath = path.resolve(outputPath, file)
          fs.mkdirp(path.dirname(localPath), function(err){
            fs.copy(path.resolve(setup.publicPath, file), localPath, done)
          })
        }else{
          done()
        }
      }

      /**
       * Scan dir, Compile Less and Jade, Copy the others
       */

      helpers.prime(outputPath, { ignore: projectPath }, function(err){
        if(err) console.log(err)

        helpers.ls(setup.publicPath, function(err, results){
          async.each(results, compileFile, function(err){
            if(err){
              callback(err)
            }else{
              async.each(results, copyFile, function(err){
                setup.config['harp_version'] = pkg.version
                delete setup.config.globals
                callback(null, setup.config)
              })
            }
          })
        })
      })

    }
```

La première portion de code définit le chemin de destination passé en argument de l'appel à `harp compile` via la ligne de commande ([le source
est ici](https://github.com/sintaxi/harp/blob/master/bin/harp)). Par défault, comme vous pouvez le voir c'est `www`. `callback` est une fonction de callback passée en argument de la ligne de commande qui n'est pas configurable.

La portion suivante commence par appeler la fonction `setup` du [module helpers](https://github.com/sintaxi/harp/blob/master/lib/helpers.js). Pour faire court, nous n'irons pas examiner le code de la fonction (libre à vous d'aller regarder par vous-même), mais en gros ça lit la configuration du site (c'est à dire le fichier `harp.json`).

Vous aurez peut-être remarqué un appel à un truc qui s'appelle `terraform`. Cela revient ensuite de nouveau au sein de cette fonction.
[Terraform](https://github.com/sintaxi/terraform) est en fait projet séparé dont Harp dépend pour la gestion de la [pipeline des assets](https://launchschool.com/blog/rails-asset-pipeline-best-practices).
C'est dans le pipeline des assets qu'est fait tout le difficile travail de compilation et de génération du site final (nous irons jeter un œil au code de Terraform sous peu).

La portion de code suivante, comme elle l'indique, essaie de vous empêcher de définir un dossier de destination qui écraserait votre code source (ce qui serait malheureux puisque vous perdriez tout votre travail depuis votre dernier commit).

Les fonctions `compileFile` et `copyFile` parlent d'elles-mêmes. La fonction `compileFile` se repose sur Terraform pour effectuer la compilation. Ces deux fonctions permettent à la fonction `prime` qui s'aide de la fonction (`fs`) pour parcourir les dossiers, compiler ou copier les fichiers nécessaires pendant le processus.

### Terraform

Comme je l'ai dit, Terraform fait le sale travail pour compiler les fichiers Jade,
Markdown, Sass et CoffeeScript en HTML, CSS et JavaScript (et pour assembler ces pièces comme voulu par Harp). Terraform est constitué d'un nombre de fichiers qui définissent ces processeurs pour JavaScript,
CSS/feuilles de style et modèles (qui ici comprennent Markdown).
{% include figure.html url="https://cdn.css-tricks.com/wp-content/uploads/2017/02/terraform-1.jpg" description="" %}
Dans chacun de ces dossiers se trouve un dossier `processors` qui renferme le code pour chacun des processeurs spécifiques que Terraform (c'est à dire Harp) supporte.
Par exemple, dans le dossiers des modèles se trouvent les fichiers qui permettent de compiler les fichiers EJS, Jade, and Markdown.
{% include figure.html url="https://cdn.css-tricks.com/wp-content/uploads/2017/02/terraform_processors.png" %}

Je ne vais pas aller creuser le code de chacun d'entre eux, mais pour la plupart, ils se reposent sur des modules npm externes qui gèrent le processeur supporté.
Par exemple, le support de Markdown dépend de  [Marked](https://www.npmjs.com/package/marked).

Le cœur de la logique de Terraform se trouve dans sa fonction `render`.

```js
/**
        * Render
        *
        * This is the main method to to render a view. This function is
        * responsible to for figuring out the layout to use and sets the
        * `current` object.
        *
        */

    render: function(filePath, locals, callback){

        // get rid of leading slash (windows)
        filePath = filePath.replace(/^\\/g, '')

        // locals are optional
        if(!callback){
        callback = locals
        locals   = {}
        }


        /**
        * We ignore files that start with underscore
        */

        if(helpers.shouldIgnore(filePath)) return callback(null, null)


        /**
        * If template file we need to set current and other locals
        */

        if(helpers.isTemplate(filePath)) {

        /**
            * Current
            */
        locals._ = lodash
        locals.current = helpers.getCurrent(filePath)


        /**
            * Layout Priority:
            *
            *    1. passed into partial() function.
            *    2. in `_data.json` file.
            *    3. default layout.
            *    4. no layout
            */

        // 1. check for layout passed in
        if(!locals.hasOwnProperty('layout')){

            // 2. _data.json layout
            // TODO: Change this lookup relative to path.
            var templateLocals = helpers.walkData(locals.current.path, data)

            if(templateLocals && templateLocals.hasOwnProperty('layout')){
            if(templateLocals['layout'] === false){
                locals['layout'] = null
            } else if(templateLocals['layout'] !== true){

                // relative path
                var dirname = path.dirname(filePath)
                var layoutPriorityList = helpers.buildPriorityList(path.join(dirname, templateLocals['layout'] || ""))

                // absolute path (fallback)
                layoutPriorityList.push(templateLocals['layout'])

                // return first existing file
                // TODO: Throw error if null
                locals['layout'] = helpers.findFirstFile(root, layoutPriorityList)

            }
            }

            // 3. default _layout file
            if(!locals.hasOwnProperty('layout')){
            locals['layout'] = helpers.findDefaultLayout(root, filePath)
            }

            // 4. no layout (do nothing)
        }

        /**
            * TODO: understand again why we are doing this.
            */

        try{
            var error  = null
            var output = template(root, templateObject).partial(filePath, locals)
        }catch(e){
            var error  = e
            var output = null
        }finally{
            callback(error, output)
        }

        }else if(helpers.isStylesheet(filePath)){
        stylesheet(root, filePath, callback)
        }else if(helpers.isJavaScript(filePath)){
        javascript(root, filePath, callback)
        }else{
        callback(null, null)
        }

    }
```

(Si vous avez bien lu l'intégralité de ce code, vous aurez peut-être relevé quelques TODO et un commentaire assez drôle "comprendre à nouveau pourquoi nous faisons cela".
C'est ça le code dans la vraie vie!)

La grande partie du code dans la fonction `render` s'occupe de la gestion des modèles. Des trucs comme CoffeeScript et Sass génèrent fondamentalement un seul fichier. Par exemple, `style.scss` donnera un fichier `style.css`.
Même s'il y a des includes c'est géré par le pré-processeur. La toute fin de la fonction `render` s'occupe de ces types de fichiers.

[Les modèles dans Harp](https://harpjs.com/docs/development/layout), à l'opposé, sont imbriqués les uns dans les autres de différentes manières qui peuvent aussi dépendre de la configuration. Par exemple, le fichier `about.md` peut être rendu par le modèle  `_layout.jade` (ce qui, pour être précis, est défini par l'utilisation de `!= yield` à l'intérieur du modèle ). Toutefois,
`_layout.jade` pourrait également lui-même faire appel à plusieurs autres modèles en son sein grâce au support des fichiers  [partiels](https://harpjs.com/docs/development/partial) dans
Harp.

Les fichiers partiels sont une façon de découper un modèle en plusieurs fichiers. Ils sont particulièrement utiles pour réutiliser du code. Par exemple, j'aurais pu mettre l'entête du site dans un fichier partiel. Les fichiers partiels sont importants pour rendre la gestion des modèles plus maintenable mais ils ajoutent aussi un bon degrés de complexité dans la compilation des modèles. Cette complexité est gérer à l'intérieur de la fonction `partial` du [traitement des modèles](https://github.com/sintaxi/terraform/blob/master/lib/template/index.js).

Enfin, nous pourrions écraser le modèle par défaut en définissant un modèle spécifique ou pas de modèle du tout pour un fichier particulier à l'intérieur du fichier de  configuration `_data.json`. Tous ces scénarios sont gérés( et même numérotés) dans la logique de la fonction `render`.

## C'est pas si compliqué, non ?

Pour rendre tout cela digeste, j'ai fait l'impasse sur pas mal de détails. À la base, chaque générateur de site statique que j'ai utilisé (et j'en ai utilisé
[un paquet](https://github.com/remotesynth/Static-Site-Samples))fonctionne de manière similaire : un ensemble de règles, de conventions et de configuration qui est traité à travers des compilateurs de langages supportés variés. C'est peut-être pour ça qu'il y a un [nombre ridicule](https://staticsitegenerators.net/) de générateurs de site statique dans la nature.

Ceci étant dit, je ne me lancerais pas dans le développement du mien!

## Mon rapport et mon livre

Si vous voulez apprendre comment faire des sites à l'aide d'un générateur de site statique, j'ai écris un rapport et co-écrit un livre pour O'Reilly qui pourrait vous intéresser. Mon rapport, simplement intitulé [Les générateurs de site statique
](http://www.oreilly.com/web-platform/free/static-site-generators.csp)
est gratuit et essaie d'aborder l'historique, le paysage actuel et les fondamentaux des générateurs de site statique.

{% include figure.html url="https://cdn.css-tricks.com/wp-content/uploads/2017/02/books-1.jpg" %}

Le livre que j'ai co-écrit avec [Raymond
Camden](https://twitter.com/raymondcamden) s'appelle [Travailler avec les
sites statiques](http://shop.oreilly.com/product/0636920051879.do) et est disponible en pré-publication, mais devrait bientôt être disponible en version papier.
