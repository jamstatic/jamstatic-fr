# jamstatic.fr

[![Netlify Status](https://api.netlify.com/api/v1/badges/5f02cf72-0ba6-4fd3-a606-29262d8d8606/deploy-status)](https://app.netlify.com/sites/jamstatic/deploys)
[![Slack Channel](https://jamstatic.herokuapp.com/badge.svg)](https://jamstatic.herokuapp.com)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![Contributeurs](https://img.shields.io/badge/all_contributors-24-orange.svg?style=flat-square)](#contributeurs)
<!-- ALL-CONTRIBUTORS-BADGE:END --> 


Vous utilisez Jekyll, Hugo, Eleventy ou tout autre générateur de site statique, vous
voulez échanger avec la communauté francophone et vous tenir informé de
l'actualité de l'écosystème de la Jamstack ?

Vous pouvez :

* [Nous suivre sur Twitter](https://twitter.com/jamstatic_fr)
* [Rejoindre le channel Slack](https://jamstatic.fr/slack/)
* [Soumettre un article à la publication](https://github.com/jamstatic/jamstatic-fr/projects/1)

## Développement

Le site est développé avec [Hugo](https://gohugo.io).

Pour installer Hugo sur macOS:

```bash
brew install hugo
```

Pour clôner le dépôt sur sa machine:

```bash
git clone https://github.com/jamstatic/jamstatic-fr.git
```

Pour créer un nouvel article:

```bash
git switch ---create post/nouvel-article
hugo new post/nouvel-article.md
```

### Prévisualiser en local

```bash
hugo server -D --environment development
```

### Ouvrir une pull request

```bash
git commit -am "chore: nouvel article"
gh pr create
```

## Production

Chaque commit dans la branche `master` génère un déploiement en production.

Si vous souhaitez contribuer, proposer des articles, vous pouvez ouvrir une issue ou soumettre directement une pull request :heart:

## Contributeurs

Merci à ces personnes extraordinaires ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://frank.taillandier.me"><img src="https://avatars3.githubusercontent.com/u/103008?v=4" width="100px;" alt=""/><br /><sub><b>Frank Taillandier</b></sub></a><br /><a href="#blog-DirtyF" title="Blogposts">📝</a> <a href="https://github.com/jamstatic/jamstatic-fr/commits?author=DirtyF" title="Code">💻</a> <a href="#design-DirtyF" title="Design">🎨</a> <a href="#eventOrganizing-DirtyF" title="Event Organizing">📋</a> <a href="#translation-DirtyF" title="Translation">🌍</a> <a href="#tutorial-DirtyF" title="Tutorials">✅</a> <a href="#talk-DirtyF" title="Talks">📢</a> <a href="#video-DirtyF" title="Videos">📹</a></td>
    <td align="center"><a href="https://phacks.dev/"><img src="https://avatars1.githubusercontent.com/u/2587348?v=4" width="100px;" alt=""/><br /><sub><b>Nicolas Goutay</b></sub></a><br /><a href="#translation-phacks" title="Translation">🌍</a> <a href="#blog-phacks" title="Blogposts">📝</a> <a href="#eventOrganizing-phacks" title="Event Organizing">📋</a> <a href="#talk-phacks" title="Talks">📢</a> <a href="#video-phacks" title="Videos">📹</a></td>
    <td align="center"><a href="https://regisphilibert.com"><img src="https://avatars2.githubusercontent.com/u/1480503?v=4" width="100px;" alt=""/><br /><sub><b>Regis Philibert</b></sub></a><br /><a href="#blog-regisphilibert" title="Blogposts">📝</a> <a href="#tutorial-regisphilibert" title="Tutorials">✅</a> <a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Aregisphilibert" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/jamstatic/jamstatic-fr/commits?author=regisphilibert" title="Code">💻</a></td>
    <td align="center"><a href="https://www.webstoemp.com"><img src="https://avatars1.githubusercontent.com/u/657571?v=4" width="100px;" alt=""/><br /><sub><b>Jérôme Coupé</b></sub></a><br /><a href="#blog-jeromecoupe" title="Blogposts">📝</a> <a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Ajeromecoupe" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://arnaudligny.fr"><img src="https://avatars0.githubusercontent.com/u/80580?v=4" width="100px;" alt=""/><br /><sub><b>Arnaud Ligny</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/commits?author=Narno" title="Code">💻</a> <a href="#blog-Narno" title="Blogposts">📝</a> <a href="#translation-Narno" title="Translation">🌍</a> <a href="#talk-Narno" title="Talks">📢</a> <a href="#infra-Narno" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-Narno" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://strapi.io"><img src="https://avatars0.githubusercontent.com/u/5550462?v=4" width="100px;" alt=""/><br /><sub><b>Pierre Burgy</b></sub></a><br /><a href="#blog-pierreburgy" title="Blogposts">📝</a></td>
    <td align="center"><a href="http://gastaud.io"><img src="https://avatars3.githubusercontent.com/u/1499325?v=4" width="100px;" alt=""/><br /><sub><b>jygastaud</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/commits?author=jygastaud" title="Code">💻</a> <a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Ajygastaud" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://boris.schapira.dev"><img src="https://avatars0.githubusercontent.com/u/284742?v=4" width="100px;" alt=""/><br /><sub><b>Boris Schapira</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Aborisschapira" title="Reviewed Pull Requests">👀</a> <a href="#blog-borisschapira" title="Blogposts">📝</a></td>
    <td align="center"><a href="https://nicolas-hoizey.com/"><img src="https://avatars2.githubusercontent.com/u/78213?v=4" width="100px;" alt=""/><br /><sub><b>Nicolas Hoizey</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Anhoizey" title="Reviewed Pull Requests">👀</a> <a href="#blog-nhoizey" title="Blogposts">📝</a></td>
    <td align="center"><a href="https://www.quaternum.net"><img src="https://avatars2.githubusercontent.com/u/6869488?v=4" width="100px;" alt=""/><br /><sub><b>antoine</b></sub></a><br /><a href="#blog-antoinentl" title="Blogposts">📝</a> <a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Aantoinentl" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://bertrandkeller.info"><img src="https://avatars2.githubusercontent.com/u/1500301?v=4" width="100px;" alt=""/><br /><sub><b>Bertrand Keller</b></sub></a><br /><a href="#blog-bertrandkeller" title="Blogposts">📝</a> <a href="https://github.com/jamstatic/jamstatic-fr/commits?author=bertrandkeller" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Natouille"><img src="https://avatars0.githubusercontent.com/u/2006947?v=4" width="100px;" alt=""/><br /><sub><b>Nathalie Rosenberg</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3ANatouille" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://tut-tuuut.github.io"><img src="https://avatars0.githubusercontent.com/u/1035145?v=4" width="100px;" alt=""/><br /><sub><b>Agnès Haasser</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Atut-tuuut" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/P45QU10U"><img src="https://avatars2.githubusercontent.com/u/1941272?v=4" width="100px;" alt=""/><br /><sub><b>P45QU10U</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3AP45QU10U" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://blog.creaone.fr"><img src="https://avatars3.githubusercontent.com/u/34697?v=4" width="100px;" alt=""/><br /><sub><b>Samuel Martin</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Amartinsam" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://inwardmovement.github.io"><img src="https://avatars0.githubusercontent.com/u/9438102?v=4" width="100px;" alt=""/><br /><sub><b>Victor Massé</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Ainwardmovement" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://christopheducamp.com/"><img src="https://avatars1.githubusercontent.com/u/174418?v=4" width="100px;" alt=""/><br /><sub><b>Christophe Ducamp</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3AChristopheDucamp" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/inseo"><img src="https://avatars3.githubusercontent.com/u/2088264?v=4" width="100px;" alt=""/><br /><sub><b>Corinne Durrmeyer</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Ainseo" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://laurent.la"><img src="https://avatars1.githubusercontent.com/u/6553086?v=4" width="100px;" alt=""/><br /><sub><b>Laurent de Lacerda</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Alaurent-d" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://polkatulk.com/en"><img src="https://avatars3.githubusercontent.com/u/164912?v=4" width="100px;" alt=""/><br /><sub><b>Uxlco</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Ajonathanulco" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/yvesdo"><img src="https://avatars2.githubusercontent.com/u/5601690?v=4" width="100px;" alt=""/><br /><sub><b>yvesdo</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Ayvesdo" title="Reviewed Pull Requests">👀</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://gitlab.com/yannicka"><img src="https://avatars0.githubusercontent.com/u/22885898?v=4" width="100px;" alt=""/><br /><sub><b>Yannick A.</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Ayannicka" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://zooly.surge.sh/"><img src="https://avatars1.githubusercontent.com/u/7328625?v=4" width="100px;" alt=""/><br /><sub><b>Hugo Torzuoli</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3AHZooly" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://www.goodimpact.studio"><img src="https://avatars0.githubusercontent.com/u/11678850?v=4" width="100px;" alt=""/><br /><sub><b>Yaacov</b></sub></a><br /><a href="#a11y-yaaax" title="Accessibility">️️️️♿️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

Ce projet suit la specification [all-contributors](https://github.com/kentcdodds/all-contributors).
Les contributions en tout genre sont les bienvenues !
