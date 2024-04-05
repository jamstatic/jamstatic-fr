# [Jamstatic.fr](https://jamstatic.fr)

Vous utilisez [Jekyll](https://jamstatic.fr/categories/jekyll/), [Hugo](https://jamstatic.fr/categories/hugo/), [Eleventy](https://jamstatic.fr/categories/eleventy/) ou tout autre générateur de site statique ?  
Vous voulez échanger avec la communauté francophone et vous tenir informé de l'actualité de l'écosystème de la Jamstack ?

Vous pouvez :

* [Nous suivre sur Twitter](https://twitter.com/jamstatic_fr)
* [Rejoindre le Slack](https://jamstatic.fr/slack/)
* [Soumettre un article à la publication](https://github.com/jamstatic/jamstatic-fr/projects/1)

[![Netlify Status](https://api.netlify.com/api/v1/badges/5f02cf72-0ba6-4fd3-a606-29262d8d8606/deploy-status)](https://app.netlify.com/sites/jamstatic/deploys)

## Contribuer

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![Contributeurs](https://img.shields.io/badge/all_contributors-26-orange.svg?style=flat-square)](#contributeurs)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Le site est généré avec [Cecil](https://cecil.app).

1. Télécharger Cecil

```bash
curl -LO https://cecil.app/cecil.phar
```

2. Clôner le dépôt Git

```bash
git clone https://github.com/jamstatic/jamstatic-fr.git
```

3. Créer un nouvel article (dans une branche dédiée)

```bash
git switch --create post/nouvel-article
php cecil.phar new:page post/nouvel-article.md
```

4. Prévisualiser le site web

```bash
php cecil.phar serve -d -v --config=config/dev.yml
```

5. Envoyer l’article

```bash
git commit -am "Nouvel article"
```

6. Soumettre une PR (Pull Request)

```bash
gh pr create
```

## Développement

### Regénérer la feuille de styles avec [Tailwind CSS](https://tailwindcss.com)

```bash
npm install
npx tailwindcss -i ./tailwind.css -o ./assets/css/styles.css
```

## Production

Chaque commit dans la branche `master` génère une nouvelle version du site qui, s'il n'y a pas d'erreur, est automatiquement déployée.

Si vous souhaitez contribuer, proposer des articles, vous pouvez ouvrir une issue ou soumettre directement une pull request :heart:

## Contributeurs

Merci à ces personnes extraordinaires ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)) :

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://frank.taillandier.me"><img src="https://avatars3.githubusercontent.com/u/103008?v=4?s=100" width="100px;" alt="Frank Taillandier"/><br /><sub><b>Frank Taillandier</b></sub></a><br /><a href="#financial-DirtyF" title="Financial">💵</a> <a href="#audio-DirtyF" title="Audio">🔊</a> <a href="#blog-DirtyF" title="Blogposts">📝</a> <a href="https://github.com/jamstatic/jamstatic-fr/commits?author=DirtyF" title="Code">💻</a> <a href="#design-DirtyF" title="Design">🎨</a> <a href="#infra-DirtyF" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-DirtyF" title="Maintenance">🚧</a> <a href="#eventOrganizing-DirtyF" title="Event Organizing">📋</a> <a href="#translation-DirtyF" title="Translation">🌍</a> <a href="#tutorial-DirtyF" title="Tutorials">✅</a> <a href="#talk-DirtyF" title="Talks">📢</a> <a href="#video-DirtyF" title="Videos">📹</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://arnaudligny.fr/"><img src="https://avatars.githubusercontent.com/u/80580?v=4?s=100" width="100px;" alt="Arnaud Ligny"/><br /><sub><b>Arnaud Ligny</b></sub></a><br /><a href="#a11y-ArnaudLigny" title="Accessibility">️️️️♿️</a> <a href="#question-ArnaudLigny" title="Answering Questions">💬</a> <a href="#audio-ArnaudLigny" title="Audio">🔊</a> <a href="#blog-ArnaudLigny" title="Blogposts">📝</a> <a href="https://github.com/jamstatic/jamstatic-fr/issues?q=author%3AArnaudLigny" title="Bug reports">🐛</a> <a href="https://github.com/jamstatic/jamstatic-fr/commits?author=ArnaudLigny" title="Code">💻</a> <a href="#content-ArnaudLigny" title="Content">🖋</a> <a href="#data-ArnaudLigny" title="Data">🔣</a> <a href="#design-ArnaudLigny" title="Design">🎨</a> <a href="https://github.com/jamstatic/jamstatic-fr/commits?author=ArnaudLigny" title="Documentation">📖</a> <a href="#ideas-ArnaudLigny" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-ArnaudLigny" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-ArnaudLigny" title="Maintenance">🚧</a> <a href="#mentoring-ArnaudLigny" title="Mentoring">🧑‍🏫</a> <a href="#projectManagement-ArnaudLigny" title="Project Management">📆</a> <a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3AArnaudLigny" title="Reviewed Pull Requests">👀</a> <a href="#talk-ArnaudLigny" title="Talks">📢</a> <a href="#translation-ArnaudLigny" title="Translation">🌍</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://phacks.dev/"><img src="https://avatars1.githubusercontent.com/u/2587348?v=4?s=100" width="100px;" alt="Nicolas Goutay"/><br /><sub><b>Nicolas Goutay</b></sub></a><br /><a href="#financial-phacks" title="Financial">💵</a> <a href="#audio-phacks" title="Audio">🔊</a> <a href="#translation-phacks" title="Translation">🌍</a> <a href="#blog-phacks" title="Blogposts">📝</a> <a href="#eventOrganizing-phacks" title="Event Organizing">📋</a> <a href="#talk-phacks" title="Talks">📢</a> <a href="#video-phacks" title="Videos">📹</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://regisphilibert.com"><img src="https://avatars2.githubusercontent.com/u/1480503?v=4?s=100" width="100px;" alt="Regis Philibert"/><br /><sub><b>Regis Philibert</b></sub></a><br /><a href="#audio-regisphilibert" title="Audio">🔊</a> <a href="#blog-regisphilibert" title="Blogposts">📝</a> <a href="#tutorial-regisphilibert" title="Tutorials">✅</a> <a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Aregisphilibert" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/jamstatic/jamstatic-fr/commits?author=regisphilibert" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://boris.schapira.dev"><img src="https://avatars0.githubusercontent.com/u/284742?v=4?s=100" width="100px;" alt="Boris Schapira"/><br /><sub><b>Boris Schapira</b></sub></a><br /><a href="#financial-borisschapira" title="Financial">💵</a> <a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Aborisschapira" title="Reviewed Pull Requests">👀</a> <a href="#blog-borisschapira" title="Blogposts">📝</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://nicolas-hoizey.com/"><img src="https://avatars2.githubusercontent.com/u/78213?v=4?s=100" width="100px;" alt="Nicolas Hoizey"/><br /><sub><b>Nicolas Hoizey</b></sub></a><br /><a href="#financial-nhoizey" title="Financial">💵</a> <a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Anhoizey" title="Reviewed Pull Requests">👀</a> <a href="#blog-nhoizey" title="Blogposts">📝</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.goodmotion.fr"><img src="https://avatars2.githubusercontent.com/u/46760?v=4?s=100" width="100px;" alt="Patrick Faramaz"/><br /><sub><b>Patrick Faramaz</b></sub></a><br /><a href="#financial-ipatate" title="Financial">💵</a> <a href="#audio-ipatate" title="Audio">🔊</a> <a href="https://github.com/jamstatic/jamstatic-fr/commits?author=ipatate" title="Code">💻</a> <a href="#blog-ipatate" title="Blogposts">📝</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.webstoemp.com"><img src="https://avatars1.githubusercontent.com/u/657571?v=4?s=100" width="100px;" alt="Jérôme Coupé"/><br /><sub><b>Jérôme Coupé</b></sub></a><br /><a href="#blog-jeromecoupe" title="Blogposts">📝</a> <a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Ajeromecoupe" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://strapi.io"><img src="https://avatars0.githubusercontent.com/u/5550462?v=4?s=100" width="100px;" alt="Pierre Burgy"/><br /><sub><b>Pierre Burgy</b></sub></a><br /><a href="#blog-pierreburgy" title="Blogposts">📝</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://gastaud.io"><img src="https://avatars3.githubusercontent.com/u/1499325?v=4?s=100" width="100px;" alt="jygastaud"/><br /><sub><b>jygastaud</b></sub></a><br /><a href="#plugin-jygastaud" title="Plugin/utility libraries">🔌</a> <a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Ajygastaud" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.quaternum.net"><img src="https://avatars2.githubusercontent.com/u/6869488?v=4?s=100" width="100px;" alt="antoine"/><br /><sub><b>antoine</b></sub></a><br /><a href="#blog-antoinentl" title="Blogposts">📝</a> <a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Aantoinentl" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://bertrandkeller.info"><img src="https://avatars2.githubusercontent.com/u/1500301?v=4?s=100" width="100px;" alt="Bertrand Keller"/><br /><sub><b>Bertrand Keller</b></sub></a><br /><a href="#blog-bertrandkeller" title="Blogposts">📝</a> <a href="https://github.com/jamstatic/jamstatic-fr/commits?author=bertrandkeller" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Natouille"><img src="https://avatars0.githubusercontent.com/u/2006947?v=4?s=100" width="100px;" alt="Nathalie Rosenberg"/><br /><sub><b>Nathalie Rosenberg</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3ANatouille" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://tut-tuuut.github.io"><img src="https://avatars0.githubusercontent.com/u/1035145?v=4?s=100" width="100px;" alt="Agnès Haasser"/><br /><sub><b>Agnès Haasser</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Atut-tuuut" title="Reviewed Pull Requests">👀</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/P45QU10U"><img src="https://avatars2.githubusercontent.com/u/1941272?v=4?s=100" width="100px;" alt="P45QU10U"/><br /><sub><b>P45QU10U</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3AP45QU10U" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://blog.creaone.fr"><img src="https://avatars3.githubusercontent.com/u/34697?v=4?s=100" width="100px;" alt="Samuel Martin"/><br /><sub><b>Samuel Martin</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Amartinsam" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://inwardmovement.github.io"><img src="https://avatars0.githubusercontent.com/u/9438102?v=4?s=100" width="100px;" alt="Victor Massé"/><br /><sub><b>Victor Massé</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Ainwardmovement" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://christopheducamp.com/"><img src="https://avatars1.githubusercontent.com/u/174418?v=4?s=100" width="100px;" alt="Christophe Ducamp"/><br /><sub><b>Christophe Ducamp</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3AChristopheDucamp" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/inseo"><img src="https://avatars3.githubusercontent.com/u/2088264?v=4?s=100" width="100px;" alt="Corinne Durrmeyer"/><br /><sub><b>Corinne Durrmeyer</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Ainseo" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://laurent.la"><img src="https://avatars1.githubusercontent.com/u/6553086?v=4?s=100" width="100px;" alt="Laurent de Lacerda"/><br /><sub><b>Laurent de Lacerda</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Alaurent-d" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://polkatulk.com/en"><img src="https://avatars3.githubusercontent.com/u/164912?v=4?s=100" width="100px;" alt="Uxlco"/><br /><sub><b>Uxlco</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Ajonathanulco" title="Reviewed Pull Requests">👀</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/yvesdo"><img src="https://avatars2.githubusercontent.com/u/5601690?v=4?s=100" width="100px;" alt="yvesdo"/><br /><sub><b>yvesdo</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Ayvesdo" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://gitlab.com/yannicka"><img src="https://avatars0.githubusercontent.com/u/22885898?v=4?s=100" width="100px;" alt="Yannick A."/><br /><sub><b>Yannick A.</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3Ayannicka" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://zooly.surge.sh/"><img src="https://avatars1.githubusercontent.com/u/7328625?v=4?s=100" width="100px;" alt="Hugo Torzuoli"/><br /><sub><b>Hugo Torzuoli</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/pulls?q=is%3Apr+reviewed-by%3AHZooly" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.goodimpact.studio"><img src="https://avatars0.githubusercontent.com/u/11678850?v=4?s=100" width="100px;" alt="Yaacov"/><br /><sub><b>Yaacov</b></sub></a><br /><a href="#financial-yaaax" title="Financial">💵</a> <a href="#a11y-yaaax" title="Accessibility">️️️️♿️</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://blog.ticabri.com"><img src="https://avatars1.githubusercontent.com/u/701648?v=4?s=100" width="100px;" alt="Enguerran"/><br /><sub><b>Enguerran</b></sub></a><br /><a href="https://github.com/jamstatic/jamstatic-fr/commits?author=enguerran" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

Ce projet suit la specification [all-contributors](https://github.com/kentcdodds/all-contributors).  
Toutes les contributions sont les bienvenues !
