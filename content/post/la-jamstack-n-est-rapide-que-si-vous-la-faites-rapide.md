---
title: La jamstack n'est rapide que si vous la rendez rapide
date: 2020-10-04
lastmod: 2020-10-04T17:09:00+02:00
description: Trop de sites web construits sur le principe de la Jamstack sont lents.
author: Arnaud Ligny
categories:
- jamstack
- Mstack
images:
- "/assets/images/"
source:
  author: Nicolas Hoizey
  title: JAMstack is fast only if you make it so
  url: https://nicolas-hoizey.com/articles/2020/05/05/jamstack-is-fast-only-if-you-make-it-so/
  lang: en
canonical_url: https://nicolas-hoizey.com/articles/2020/05/05/jamstack-is-fast-only-if-you-make-it-so/
draft: true

---

La JAMstack se présente souvent comme un excellent moyen de fournir des sites performants. C'est même le premier avantage répertorié sur [jamstack.wtf](https://jamstack.wtf), un guide pour "comprendre le concept de JAMstack simplement de manière à encourager d'autres développeurs à adopter le workflow". Mais trop de sites JAMstack sont très lents.

Vous avez peut-être vu les diatribes fréquentes d'[Alex Russell](https://infrequently.org) à propos de Gatsby :

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Looking across the full set of traces, modern Gatsby seems to produce pages that take 2-3x as long as they should to become interactive. <br><br>This is not OK. Gatsby/NPM/React regressively tax access to content.<br><br>In less generous moments, I&#39;d go as far as to say it&#39;s unethical.</p>&mdash; Alex Russell (@slightlylate) <a href="https://twitter.com/slightlylate/status/1184959830819106816?ref_src=twsrc%5Etfw">October 17, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Gatsby est une cible facile (parmi tant d'autres) car il n'est actuellement pas optimisé pour être performant à sa sortie de boîte, malgré ce qui est [présenté](https://store.gatsbyjs.org/product/gatsby-sticker-6-pack). Il est possible corriger ça, par exemple avec [ce plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-no-javascript/), et je pense que les bons développeurs React peuvent le faire exceller, mais cela devrait être le cas par défaut, et non après coup.

Eleventy est très différent, comme Zach Leatherman nous le rappelle dans [*Eleventy’s New Performance Leaderboard*](https://www.zachleat.com/web/performance-dashboard/) :

> Eleventy n'effectue aucune optimisation particulière en sortie de boîte pour rendre vos sites rapides. Cela ne vous empêchera pas de créer un site lent. Mais surtout, il n’ajoute rien de plus non plus.

Le problème avec la plupart des sites JAMstack lents est qu'ils chargent un tas de JavaScript. N'oubliez pas que tout JavaScript ajouté doit être envoyé au navigateur, qui réclamera d’avantage de ressources pour traiter ça. Ça impacte rapidement les performances.

Parfois, l’utilisation du build côté serveur est suffisant pour obtenir les données depuis une API et servir le HTML à tous les visiteurs, ce qui est nettement plus performant.

Par exemple, [swyx](https://www.swyx.io) a écrit *[Clientside Webmentions](https://www.swyx.io/writing/clientside-webmentions/)* à propos de l’implémentation de Webmention avec [Svelte](https://svelte.dev). Tout article faisant la promotion de [Webmention](https://nicolas-hoizey.com/tags/webmention/) et facilitant son adoption est le bienvenu ! Mais même si c’est une démo de Webmention et Svelte, je ne recommanderais pas de le faire côté client.

to do
