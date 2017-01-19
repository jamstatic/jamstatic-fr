---
title: Comment marche Jekyll ?
date: 2017-01-17 17:53:42 +01:00
description: À partir du code source, nous pouvons mieux comprendre le process de génération au cœur de Jekyll.
author: frank
image: "assets/images/jekyll-rendering-rules.png"
---

Si vous suivez ce blog, vous savez déjà que Jekyll est un générateur de site statique développé en Ruby. Jack Phelan a décidé d'aller jeter un œil dans le moteur de Jekyll histoire de mieux comprendre comment sont traités les différents types fichiers qui sont passés en entrée. Nous traduisons son article afin de vous inciter à plonger un peu dans le code de Jekyll et prendre connaissance des concepts fondamentaux de ce générateur. Nous espérons que cela vous permettra de mieux appréhender la philosophie de Jekyll ou que cela vous sera utile si vous songez à développer un plugin.

-----

[Article original](https://www.bytesandwich.com/jekyll/software/blogging/2016/09/14/how-does-jekyll-work.html)

[Jekyll](https://jekyllrb.com) peut paraître un peu déroutant au début. En effet Jekyll ne fait pas grand chose à vos fichiers, si ce n'est qu'il les classifie de différentes façons.

Jekyll va soit copier, soit omettre, soit transformer les fichiers du répertoire source dans le répertoire de destination[^1]. Lorsque Jekyll transforme vos fichiers, c'est toujours de cette manière, si ce n'est que la deuxième étape peut être potentiellement sautée.[^2]

Si un fichier commence par une entête [YAML FrontMatter](https://jekyllrb.com/docs/frontmatter/) Jekyll va appliquer les transformations suivante au fichier:

1. **Interprétation du code Liquid** : Le contenu du fichier est d'abord parcouru par le parser de [Liquid](http://shopify.github.io/liquid/), les variables comme `site` ou `page` auxquelles le modèle Liquid veut accéder sont alors interprétées.
1. **Conversion du contenu** : en fonction de l'extension de fichier, Jekyll fait appel à un convertisseur dédié, par example Kramdown pour les fichiers `.md` ou `.markdown`, qui est chargé de convertir le résultat obtenu après l'étape 1.
1. **Parsing du modèle**: Le résultat de cette conversion est alors transmis dans la variable `{{content}}`, soit au modèle de page par défaut, soit à celui qui est spécifié dans l'entête YAML FrontMatter..
1. Le résultat de cette dernière conversion du modèle de page, généralement un fichier HTML, est écrit dans votre répertoire de destination.

J'aimerais maintenant vous montrer un exemple où Jekyll applique cette transformation. Ensuite, lors d'un [test complet](#test-d-une-generation-complete) de génération de site, nous irons étudier la structure générale de l'algorithme au [cœur de Jekyll](#au-cœur-de-jekyll) pour voir quels traitements sont effectués sur les différents types de fichiers.

La transformation de Jekyll

Le mécanisme de transformation de Jekyll est situé dans [la méthode run du fichier renderer](https://github.com/jekyll/jekyll/blob/2b15b0b3251d35c290dc96eb07e18fa31a58bcc6/lib/jekyll/renderer.rb#L32-L79), qui fait essentiellement la chose suivante, en sautant potentiellement quelques étapes :

```ruby
after_liquid = render_with_liquid(file_content) # line 62
after_markdown = convert(after_liquid) # line 66
place_in_layout(after_markdown) # line 71
```

Donc si nous transformons l'article livré avec Jekyll par défaut :

```markdown
 ---
 layout: post
 title:  "Bienvenue dans Jekyll !"
 date:   2016-08-17 13:50:36 +0100
 categories: jekyll update
 ---
 You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

 To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

 Jekyll also offers powerful support for code snippets:

 {% highlight ruby %}
 def print_hi(name)
   puts "Hi, #{name}"
 end
 print_hi('Tom')
 #=> prints 'Hi, Tom' to STDOUT.
 {% endhighlight %}

 Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

 [jekyll-docs]: http://jekyllrb.com/docs/home
 [jekyll-gh]:   https://github.com/jekyll/jekyll
 [jekyll-talk]: https://talk.jekyllrb.com/{% raw %}
```

… vous pouvez voir le résultat des deux premières étape de la transformation :

input 1. liquified 2. converted

INSERT CODE HERE

Puis vient la dernière étape où nous mettons tout cela dans la variable `{{ content }}` de notre modèle :

template body 3. final output

INSERT CODE HERE

Ceci est juste un exemple de conversion avec kramdown pour le markdown et d'insertion du résultat dans un modèle. Jekyll intègre d'autres convertisseurs comme [smartypants](https://github.com/jekyll/jekyll/blob/2b15b0b3251d35c290dc96eb07e18fa31a58bcc6/lib/jekyll/converters/smartypants.rb). Jekyll inclut aussi par défaut un [convertisseur pour Sass](https://github.com/jekyll/jekyll-sass-converter) dans le [fichier de spécification de sa gem Ruby](https://github.com/jekyll/jekyll/blob/499b83236c0289471118991bd5fe743effe9b348/jekyll.gemspec), qui n'est pas un convertisseur intégré, mais vous comprendrez quand vous lancerez la commande `jekyll new`. Vous pouvez installer d'autres convertisseurs à l'aide de plugins. Les modèles sont des fichiers qui sont soit stockés dans votre dossier `_layouts`, soit dans celui empaqueté dans la gem du thème utilisé par votre fichier de configuration.

## Le cœur de Jekyll

Maintenant que vous comprenez l'étape de transformation de Jekyll, regardons comme elle s'intègre dans un processus de génération de site plus global à partir de fichiers en entrée.

Si nous pitons le code exécuté lors de l'invocation de la commande `jekyll build`, nous nous apercevons que [`site.process`](https://github.com/jekyll/jekyll/blob/2b15b0b3251d35c290dc96eb07e18fa31a58bcc6/lib/jekyll/site.rb#L65) représente le cœur de Jekyll. Vous trouverez les parties importantes un peu plus bas accompagnées de mes commentaires explicatifs. Reportez vous à [la partie sur le debug](#debug) si vous souhaitez vous baladez à votre tour dans l'appel de la méthode.

```ruby
# Public: Lit, processe et écrit le Site dans la destination.
#
# Ne retourne rien.
def process
  reset # vide tous les layouts/pages/static_file/data/collections du site.
  read # lit les fichiers de votre répértoire et les stocke dans un objet Site, les classer dépend
  # d'où ils se trouvent, ce qu'ils contiennent et de votre fichier de configuration.
  generate # Vous donne la chance de lancer des générateurs pour ajouter plus de choses au site..
  render # c'est la méthode chargée de la conversion.
  cleanup # se débarasse de tous les fichiers qui auraient pu restés d'une génération précédente ou qui traitentn des metadonnées.
  write # écrit les fichiers dans votre dossier de destination.
  print_stats
end
```

`render`  applique la transformation de Jekyll aux fichiers qui possèdent une entête [YAML FrontMatter](https://jekyllrb.com/docs/frontmatter/). Les documents sont créés à partir des fichiers de collection qui possèdent des entêtes YAML FrontMatter et les pages sont d'autres documents avec des entêtes YAML. Vous devez déclarer les collections dans votre fichier `_config.yml`, comme ça vous saurez que vous en avez. Vous devez également savoir que [les posts et les brouillons de posts sont simplement des collections spéciales](https://jekyllrb.com/docs/frontmatter/), ce sont donc aussi des documents.

```ruby
def render
    ...
    render_docs(payload) # cette fonction s'occupe du rendu des fichiers de collections qui possèdent des entêtes FrontMatter, y compris le dossier _posts (les brouillons sont ajoutés aux posts avec l'option --drafts)
    render_pages(payload) # cette fonction s'occupe du rendu des fichiers qui n'appartiennent pas à des collections mais qui ont des entêtes FrontMatter
    # cela peut être vos fichiers `feed.xml`, `index.html`, `main.scss`, etc.
    ...
end
...

def render_docs(payload)
  collections.each do |_, collection|
    collection.docs.each do |document|
      if regenerator.regenerate?(document)
        document.output = Jekyll::Renderer.new(self, document, payload).run
        document.trigger_hooks(:post_render)
      end
    end
  end
end
...
def render_pages(payload)
  pages.flatten.each do |page|
    if regenerator.regenerate?(page)
      page.output = Jekyll::Renderer.new(self, page, payload).run
      page.trigger_hooks(:post_render)
    end
  end
end
```

## Test exhaustif d'une génération

Regardons à présent ce que nous obtenons lors d'un exemple de génération à partir de quelques types de fichiers dans différents répertoires, avec et sans l'option `--drafts` (active ou non la génération des brouillons). Le conteneur Docker de ce test est dispos sur [bytesandwich/jekyll-outcomes](https://github.com/bytesandwich/jekyll-outcomes).

Il recopie ces fichiers :

-   **2016-05-05-post-normal.md** *# un post normal avec une date passée*
-   **2016-05-05-post-without-frontmatter.md** *# un post sans frontmatter, avec une date passée*
-   **2020-02-02-post-future.md** *# un post standard, daté dans le futur*
-   **frontmatter-not-post.md** *# un fichier avec du frontmatter qui n'est pas un post*
-   **text.txt** *# un fichier texte normal*
-   **yaml.yml** *# un fichier YAML normal*

… dans chacun de ces répertoires :

- **/**
- **/_posts**
- **/_drafts**
- **/_data**
- **/_my_output_collection**
- **/_my_non_output_collection**
- **/_underscore_dir**
- **/regular_dir**

Sauf que pour chaque association de fichier et de répertoire, le nom du répertoire de destination est ajouté à la fin du fichier de manière à ce que nous puissions mieux appréhender les corresponsances entre les fichiers d'entrée et les fichiers de sortie. Vous retrouvez un aperçu du résultat de la commande `tree` après les deux tableaux.

J'ai fait un tableau avec une ligne par répertoire et une colonne par fichier, la cellule contient l'opération effectuée sur le fichier, qui peut être :

-   *copié* sans altération
-   *omis*
-   *transformé* et placé dans le répertoire correspondant
-   *post transformé*, qui est ensuite placé dans une arborescence de dossiers, crées d'après la date du post.

## Génération des fichiers sans l'option brouillons

|                           | text.txt                  | frontmatter-not-post.md | 2016-05-05-post-without-frontmatter.md |     yaml.yml     | 2020-02-02-post-future.md | 2016-05-05-post-normal.md |
|---------------------------|:-----------------------:|:--------------------------------------:|:----------------:|:-------------------------:|:-------------------------:|:----------------:|
| /                         |          copié         |               transformé              |      copié      |           copié          |        transformé        |    transformé   |
| /posts                    |         omis         |                 omis                | post transformé |          omis          |          omis          | post transformé |
| /drafts                   |         omis         |                 omis                |      omis     |          omis          |          omis          |      omis     |
| /data                     |         omis         |                 omis                |      omis     |          omis          |          omis          |      omis     |
| /my_output_collection     |          copié         |               transformé              |      copié      |           copié          |          omis          |    transformé   |
| /my_non_output_collection |          copié         |                 omis                |      copié      |           copié          |          omis          |      omis     |
| /underscore_dir           |         omis         |                 omis                |      omis     |          omis          |          omis          |      omis     |
| /regular_dir              |          copié         |               transformé              |      copié      |           copié          |        transformé        |    transformé   |


## Génération des fichiers avec l'option brouillon


|                           | text.txt                  | frontmatter-not-post.md | 2016-05-05-post-without-frontmatter.md |     yaml.yml     | 2020-02-02-post-future.md | 2016-05-05-post-normal.md |
|---------------------------|:-----------------------:|:--------------------------------------:|:----------------:|:-------------------------:|:-------------------------:|:----------------:|
| /                         |          copié         |               transformé              |      copié      |           copié          |        transformé        |    transformé   |
| /posts                    |         omis         |                 omis                | post transformé |          omis          |          omis          | post transformé |
| /drafts                   |           None          |            post transformé            | post transformé |      post transformé     |          omis          | post transformé |
| /data                     |         omis         |                 omis                |      omis     |          omis          |          omis          |      omis     |
| /my_output_collection     |          copié         |               transformé              |      copié      |           copié          |          omis          |    transformé   |
| /my_non_output_collection |          copié         |                 omis                |      copié      |           copié          |          omis          |      omis     |
| /underscore_dir           |         omis         |                 omis                |      omis     |          omis          |          omis          |      omis     |
| /regular_dir              |          copié         |               transformé              |      copié      |           copié          |        transformé        |    transformé   |


source site site with drafts

INSERT CODE HERE

```shell
bash-4.3# tree .
.
├── 2016-05-05-post-normal.md
├── 2016-05-05-post-without-frontmatter.md
├── 2020-02-02-post-future.md
├── Gemfile
├── Gemfile.lock
├── _config.yml
├── _data
│   ├── 2016-05-05-post-normal-data.md
│   ├── 2016-05-05-post-without-frontmatter-data.md
│   ├── 2020-02-02-post-future-data.md
│   ├── frontmatter-not-post-data.md
│   ├── text-data.txt
│   └── yaml-data.yml
├── _drafts
│   ├── 2016-05-05-post-normal-drafts.md
│   ├── 2016-05-05-post-without-frontmatter-drafts.md
│   ├── 2020-02-02-post-future-drafts.md
│   ├── frontmatter-not-post-drafts.md
│   ├── text-drafts.txt
│   └── yaml-drafts.yml
├── _layouts
│   └── special.html
├── _my_non_output_collection
│   ├── 2016-05-05-post-normal-my_non_output_collection.md
│   ├── 2016-05-05-post-without-frontmatter-my_non_output_collection.md
│   ├── 2020-02-02-post-future-my_non_output_collection.md
│   ├── frontmatter-not-post-my_non_output_collection.md
│   ├── text-my_non_output_collection.txt
│   └── yaml-my_non_output_collection.yml
├── _my_output_collection
│   ├── 2016-05-05-post-normal-my_output_collection.md
│   ├── 2016-05-05-post-without-frontmatter-my_output_collection.md
│   ├── 2020-02-02-post-future-my_output_collection.md
│   ├── frontmatter-not-post-my_output_collection.md
│   ├── text-my_output_collection.txt
│   └── yaml-my_output_collection.yml
├── _posts
│   ├── 2016-05-05-post-normal-posts.md
│   ├── 2016-05-05-post-without-frontmatter-posts.md
│   ├── 2016-09-14-welcome-to-jekyll.markdown
│   ├── 2020-02-02-post-future-posts.md
│   ├── frontmatter-not-post-posts.md
│   ├── text-posts.txt
│   └── yaml-posts.yml
├── _underscore_dir
│   ├── 2016-05-05-post-normal-underscore_dir.md
│   ├── 2016-05-05-post-without-frontmatter-underscore_dir.md
│   ├── 2020-02-02-post-future-underscore_dir.md
│   ├── frontmatter-not-post-underscore_dir.md
│   ├── text-underscore_dir.txt
│   └── yaml-underscore_dir.yml
├── about.md
├── css
│   └── main.scss
├── feed.xml
├── frontmatter-not-post.md
├── index.html
├── regular_dir
│   ├── 2016-05-05-post-normal-regular_dir.md
│   ├── 2016-05-05-post-without-frontmatter-regular_dir.md
│   ├── 2020-02-02-post-future-regular_dir.md
│   ├── frontmatter-not-post-regular_dir.md
│   ├── text-regular_dir.txt
│   └── yaml-regular_dir.yml
├── text.txt
└── yaml.yml

9 directories, 57 files
```

Jekyll’s objects: Posts, Drafts, Pages, Data, Collections, Layouts, & Includes

The best place to continue to learn is jekyll directory structure, where you can find further descriptions of the types of files in these directories.

## Debugging

Sous Mac OS X, avec `rbenv`, en ligne de commande l'exécutable de Jekyll est un script situé dans une Gem Ruby qui appelle `~/.rbenv/versions/2.3.3/lib/ruby/gems/2.3.0/gems/jekyll-3.3.1`[^3] où nous pouvons commencer à  débugguer à l'aide de `pry-byebugù si nous ajoutons deux lignes (la 8 et la 10 dans l'extrait ci-dessous) :

Le fichier ~/.rbenv/versions/2.3.3/lib/ruby/gems/2.3.0/gems/jekyll-3.3.1 /exe/jekyll @ line 12 :

```ruby
     7: require "mercenary"
     8: require "pry-byebug"
     9:
    10: binding.pry
    11:
 => 12: Jekyll::PluginManager.require_from_bundler
    13:
    14: Jekyll::Deprecator.process(ARGV)
    15:
    16: Mercenary.program(:jekyll) do |p|
    17:   p.version Jekyll::VERSION
```

Une fois les modifications effectuées, lors du lancement d'un build, le debug est désormais actif :

```sh
$ bundle exec jekyll build
[1] pry(main)>break ~/.rbenv/versions/2.3.3/lib/ruby/gems/2.3.0/gems/jekyll-3.3.1/lib/jekyll/site.rb:66
```

Jekyll embarque sa propre interface de ligne de commande, Mercenary, qui
va appeler la méthode `build(site, options)` dans `build.process` qui appelle à son tour `process_site`, qui va charger la configuration par défaut et définir les posts comme des collections, comme nous l'avons vu plus haut.

```ruby
Mercenary.program(:jekyll) do |p|
  ...
  p.command(:build) do |c|
    ...
    Jekyll::Commands::Build.process(options)
    ...
  end
```

`process_site` appelle ensuite `site.process`.




[^1]: Lorsque Jekyll omet un fichier, il se peut qu'il lise le fichier comme une donnée à laquelle vous pouvez accéder à l'aide de variables Liquid dans d'autres fichiers de modèles Liquid.

[^2]: Il se peut très bien dans ce cas que vous ayez omis les entêtes YAML FrontMatter.

[^3]: Pour savoir où se trouve l'exécutable de Jekyll, lancez la commande `bundle show jekyll`.
