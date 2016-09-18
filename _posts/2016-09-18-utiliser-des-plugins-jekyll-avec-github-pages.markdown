---
title: "Utiliser des plugins Jekyll avec GitHub Pages"
description: Automatiser la publication du site généré sur GitHub Pages pour pouvoir utiliser les plugins Jekyll sans restriction.
date: "2016-09-18 13:51:13 +0200"
author: frank
---

La popularité de Jekyll est en partie due à son support par GitHub Pages. Si cette solution gratuite est bien pratique, elle n'en reste pas moins limitée en terme de support de plugins pour des raisons de sécurité. Si vous voulez utiliser des plugins comme [jekyll-cloudinary]({% post_url 2016-08-31-gestion-images-responsive-avec-jekyll-cloudinary %}) ou jekyll-assets, il vous faudra générer le site en local et le publier sur Github Pages. Cette opération est facilement automatisable à l'aide d'un ficher `Rakefile` par exemple.

## Pages utilisateur et organisation

Pour activer automatique Pages dans un dépôt de compte utilisateur ou organisation, il vous suffit de respecter la convention de nommage `username/username.github.io`, par exemple

GitHub will use `master` branch of such repo to build and publish the Pages. That leads us into having `master` branch with compiled web-site and `source`
branch with our website sources.


#### Prepare repository

Repo preparation is very simple, just create a `source` branch in your repo:

    $ git checkout -b source master
    $ git push -u origin source

Now as you have created `source` branch you can make it _default_ on GitHub:

IMAGE

#### Automate publishing

Once repo is ready you can render your website and push compiled sources into
master branch. But doing it manually is a pain, so let's add simple rake task.
Create (if you don't have one yet) a Rakefile and add following into it:

``` ruby
require "rubygems"
require "tmpdir"

require "bundler/setup"
require "jekyll"


# Change your GitHub reponame
GITHUB_REPONAME = "ixti/ixti.github.com"


desc "Generate blog files"
task :generate do
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => ".",
    "destination" => "_site"
  })).process
end


desc "Generate and publish blog to gh-pages"
task :publish => [:generate] do
  Dir.mktmpdir do |tmp|
    cp_r "_site/.", tmp

    pwd = Dir.pwd
    Dir.chdir tmp

    system "git init"
    system "git add ."
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m #{message.inspect}"
    system "git remote add origin git@github.com:#{GITHUB_REPONAME}.git"
    system "git push origin master --force"

    Dir.chdir pwd
  end
end
```

Now you can simply call `rake publish` to compile and publish your web-site to
GitHub Pages.


### Project Pages

Unlike User and Org Pages, Project Pages are kept in the same repo as the
project they are for. These pages are almost exactly the same as User and
Org Pages, with one main difference: `gh-pages` branch is used instead of
`master` to build and publish Pages.

There's no extra repo preapration steps needed. All that you'll need is a
similar, rake task with tiny changes in it:

``` ruby
require "rubygems"
require "tmpdir"

require "bundler/setup"
require "jekyll"


# Change your GitHub reponame
GITHUB_REPONAME = "ixti/jekyll-assets"


namespace :site do
  desc "Generate blog files"
  task :generate do
    Jekyll::Site.new(Jekyll.configuration({
      "source"      => ".",
      "destination" => "_site"
    })).process
  end


  desc "Generate and publish blog to gh-pages"
  task :publish => [:generate] do
    Dir.mktmpdir do |tmp|
      cp_r "_site/.", tmp

      pwd = Dir.pwd
      Dir.chdir tmp

      system "git init"
      system "git add ."
      message = "Site updated at #{Time.now.utc}"
      system "git commit -m #{message.inspect}"
      system "git remote add origin git@github.com:#{GITHUB_REPONAME}.git"
      system "git push origin master:refs/heads/gh-pages --force"

      Dir.chdir pwd
    end
  end
end
```

Now you can run `rake site:publish` to compile and publish your web-site to
GitHub Pages. Take a look on [Jekyll's own Rakefile][jekyll-rakefile] as well
for alternative implementation of `rake site:publish`.

[jekyll-rakefile]: https://github.com/mojombo/jekyll/blob/master/Rakefile
