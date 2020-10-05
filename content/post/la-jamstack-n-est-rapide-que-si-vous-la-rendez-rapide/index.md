---
title: La Jamstack n'est rapide que si vous la rendez rapide
date: 2020-10-05
description: Trop de sites web construits sur le principe de la Jamstack sont lents.
author: arnaud
categories:
- jamstack
source:
  author: Nicolas Hoizey
  title: JAMstack is fast only if you make it so
  url: https://nicolas-hoizey.com/articles/2020/05/05/jamstack-is-fast-only-if-you-make-it-so/
  lang: en
canonical_url: https://nicolas-hoizey.com/articles/2020/05/05/jamstack-is-fast-only-if-you-make-it-so/
draft: true
typora-root-url: ../../static
---
{{< intro >}}
Dans cet article [Nicolas Hoizey](https://nicolas-hoizey.com) nous partage sa vision de la Jamstack et le fait que celle-ci n’est performante que si vous faites en sorte qu’elle le soit.
{{< /intro >}}

---

La Jamstack se présente souvent comme un excellent moyen de fournir des sites performants. C'est même le premier avantage répertorié sur [jamstack.wtf](https://jamstack.wtf), un guide[^1] pour "comprendre le concept de Jamstack simplement, de manière à encourager d'autres développeurs à adopter le workflow". Mais trop de sites Jamstack sont très lents.

Vous avez peut-être vu les diatribes fréquentes d'[Alex Russell](https://infrequently.org) à propos de Gatsby :

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Looking across the full set of traces, modern Gatsby seems to produce pages that take 2-3x as long as they should to become interactive. <br><br>This is not OK. Gatsby/NPM/React regressively tax access to content.<br><br>In less generous moments, I&#39;d go as far as to say it&#39;s unethical.</p>&mdash; Alex Russell (@slightlylate) <a href="https://twitter.com/slightlylate/status/1184959830819106816">October 17, 2019</a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Gatsby est une cible facile (parmi tant d'autres) car il n'est actuellement pas optimisé pour être performant par défaut, malgré ce qui est [présenté](https://store.gatsbyjs.org/product/gatsby-sticker-6-pack). Il est possible corriger ça, par exemple avec [ce plugin](https://www.gatsbyjs.org/packages/gatsby-plugin-no-javascript/), et je pense que les bons développeurs React peuvent améliorer les choses, mais cela devrait être le cas par défaut, et non après coup.

Eleventy est très différent, comme Zach Leatherman nous le rappelle dans [*Eleventy’s New Performance Leaderboard*](https://www.zachleat.com/web/performance-dashboard/) :

> Eleventy n'effectue aucune optimisation particulière pour rendre vos sites plus rapides. Cela ne vous empêchera pas de créer un site lent. Mais avant tout, Eleventy n’ajoute rien qui ralentisse votre site.

Le problème avec la plupart des sites Jamstack lents est qu'ils chargent tout un tas de JavaScript. N'oubliez pas que tout code JavaScript ajouté doit être envoyé au navigateur, qui nécessitera davantage de ressources pour le traiter. Cela impactera rapidement les performances.

Parfois, la génération côté serveur est suffisante pour obtenir les données depuis une API et servir le HTML à tous les visiteurs, ce qui est nettement plus performant.

Par exemple, [swyx](https://www.swyx.io) a écrit *[Clientside Webmentions](https://www.swyx.io/writing/clientside-webmentions/)* à propos de l’implémentation de Webmention avec [Svelte](https://svelte.dev). Tout article faisant la promotion de [Webmention](https://indieweb.org/Webmention) et facilitant son adoption est le bienvenu ! Mais même si c’est une bonne démo de Webmention et Svelte, je ne recommanderais pas de le faire côté client.

## Privilégier le côté serveur

Je préfère [le faire sur le serveur](https://nicolas-hoizey.com/articles/2017/07/27/so-long-disqus-hello-webmentions/#how-does-it-work-on-this-site).

Ça permet de :

- appeler l’API [webmentio.io](http://webmentio.io) seulement au moment de générer le site, ce qui devrait être moins fréquent que la consultation des pages par les visiteurs.
- mettre en cache le résultat des requêtes à [webmentio.io](http://webmentio.io) et l’horodatage de la dernière, afin que la prochaine requête demande uniquement les nouvelles webmentions.

Ça sollicite moins [webmentio.io](http://webmentio.io), avec une unique requête simple par génération, alors que le client effectue une requête bien plus volumineuse (voire plusieurs, avec pagination) pour chaque page vue.

Par exemple :

- mon site web a reçu 75 webmentions en avril 2020. Je l’ai probablement généré une centaine de fois durant la même période, ce qui correspond à **100 requêtes à webmention.io avec des réponses peu volumineuses**.
- pendant la même période, 3 746 pages de mon site web ont été vues (sous estimé, je continue à utiliser Google Analytics 🤷‍♂️), ce qui équivaudrait à **3 746 requêtes à webmention.io avec des réponses volumineuses**.

Utiliser la génération côté serveur pour récupérer les webmentions offre de multiples avantages :

- La performance pour les utilisateurs est largement meilleure, avec du HTML déjà compilé sur le serveur et servi de manière statique.
- Beaucoup moins d’appel d’API, ce qui requière beaucoup moins de temps de compilation et d’énergie.
- Chacun devrait savoir que [Aaron Parecki](https://aaronparecki.com) propose l’impressionnant service [webmention.io](http://webmention.io) **gratuitement**, et la majorité des utilisateurs de Webmention l’utilisent aujourd’hui, alors ne pas surcharger son API donne meilleure conscience.

## Améliorer le côté client, s’il est indispensable

Si vous savez que vous recevez beaucoup de webmentions très utiles que vous devez afficher à vos visiteurs, vous pouvez améliorer la liste générée côté serveur via le côté client.

Mais rappelez-vous que chaque JavaScript ajouté à la page a un coût, donc les quelques webmentions supplémentaires doivent être vraiment utiles.

Alors, au lieu de faire ça sur chaque page vue, faites au moins :

D’abord, essayez d’**attendre un peu après la génération du site** avant de faire les appels API côté client. Garder l’horodatage de génération du site côté client via JavaScript, et attendre une heure, une journée, en fonction de la fréquence des webmentions. Vous pouvez même utiliser l’« age » de la page pour moins requêter [webmention.io](http://webmention.io) pour le contenu plus ancien, qui reçoit probablement moins de webmentions, comme l’a fait [Aaron Gustafson pour les appels côté serveur dans son plugin Jekyll](https://aarongustafson.github.io/jekyll-webmention_io/performance-tuning).

Ensuite, gardez une trace des appels API, par un utilisateur, dans le *localStorage* ou l’*IndexDB*, afin que vous ne répétiez pas ces appels peu de temps après. Vous pouvez même utiliser un Service Worker pour mettre en cache les requêtes et leur horodatage.

## Les appels à l’API uniquement côté client ont parfois plus de sens

Je suis d’accord que les webmentions ne sont pas le cas d’usage le plus complexe pour expliquer que la plupart du temps vous devez appeler les API côté serveur au moment de la génération plutôt que côté client :

- Les webmentions à afficher sont les mêmes pour tous les visiteurs.
- Manquer quelques-unes des plus récentes n’est probablement pas un problème.

Alors oui, de nombreux autres cas d’usage rendent les appels côté client nécessaires, ou meilleur que ceux côté serveur, je comprend ça.

Ce que je dis c’est que **ça ne devrait pas être le cas par défaut**.

## Promouvoir la ~~AJMstack~~ Mstack

<link rel="stylesheet" href="styles.css" />

C’est aussi quelque chose que je n’aime pas vraiment dans la tendance actuelle de la JAMstack, promouvoir **J**avaScript et les **A**PI bien plus que le balisage (NDT : « balisage » peut être traduit « **M**arkup » en anglais).

Voici pour l’exemple ce que vous pouvez voir sur [jamstack.wtf](https://jamstack.wtf/) (simplifié) :

{{< figure src="jamstack-horizontal.svg" caption="Jamstack à plat" >}}

Comme suggéré par [Yann](https://twitter.com/yann_yinn), j’aimerais commencer par utiliser cette meilleures présentation :

{{< figure src="jamstack-vertical.svg" caption="Jamstack empilé" >}}

Cela rend plus évident qu’il s’agit d’une pile de choses, très utile pour une « pile » (NDT : « stack » peut être traduit « pile » en français).

Mais j’aimerais suggérer cette modification :

{{< figure src="ajmstack.svg" caption="AJMstack" >}}

Bien sûr, ça se lit **AJMstack** au lieu de JAMstack, donc je parie que je n’aurais pas de succès dans la promotion… 🤷‍♂️

Mais au final ça semble plus adéquat, ça montre que JavaScript est le lien entre les API et le balisage.

Ça permet de présenter cela comme une excellente plate-forme d’amélioration progressive, car nous pouvons commencer avec du bon vieux (ai-je entendu « ennuyeux » ?) HTML…

Voici la **Mstack** :

{{< figure src="mstack.svg" caption="mstack" >}}

Assurez-vous que cette « pile » est excellente, et ensuite améliorez la avec JavaScript et des API.

[^1]: Il existe une [version française]({{< relref "c-est-quoi-la-jamstack.md" >}}) de ce guide
