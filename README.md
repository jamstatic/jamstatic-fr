# jekyll-fr.org / jamstatic.fr

[![Build Status](https://travis-ci.org/jekyll-fr/jekyll-fr.github.io.svg?branch=master)](https://travis-ci.org/jekyll-fr/jekyll-fr.github.io)

Vous utilisez Jekyll ou un autre générateur de site statique, vous voulez échanger avec la communauté francophone ?

Vous pouvez :

* [Nous suivre sur Twitter](https://twitter.com/jamstatic_fr)
* [Rejoindre le channel Slack jamstatic-fr](https://jekyll-fr.herokuapp.com/)
* [Soumettre une proposition d'article de blog](https://github.com/jekyll-fr/jekyll-fr.github.io/projects/1)

Vous pouvez aussi nous aider nous à constituer une liste de [sites statiques francophones](https://github.com/jekyll-fr/jekyll-fr.github.io/wiki/Sources-des-sites-francophones).

## Développement

La branche par défaut est la branche `source`.
Merci de travailler sur une branche et d'ouvrir une PR pour soumettre votre contribution.

Le fichier `Rakefile` contient plusieurs tâches :

  * `rake generate` pour générer le site
  * `rake test` pour tester les liens internes du site
  * `rake publish` pour publier le site généré sur la branche `master`
