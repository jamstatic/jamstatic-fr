---
title: Des bibliothèques de composants avec Shadow DOM en Markdown
description:
  Apprenez à inclure facilement des démos de composants dans du Markdown,
  à l'aide des shortcodes de Hugo et de l'encapsulation Shadow DOM.
image: /assets/images/markdown-shadowdom.png
source:
  title: Building Pattern Libraries With Shadow DOM In Markdown
  url: "https://www.smashingmagazine.com/2017/07/pattern-libraries-in-markdown/"
  author: Heydon Pickering
---

S'il est un domaine où les générateurs de site statique se sont rapidement
imposés c'est bien celui des sites de documentation. Avec la nécessaire
rationalisation des interfaces multi-supports, beaucoup d'équipes en charge du
front-end doivent aujourd'hui maintenir une bibliothèque de composants qui sert
de référence à toutes les équipes et qui permet donc d'assurer la cohérence et
l'évolutivité des composants dans les diverses sites et applications web de
l'entreprise. Un composant comme un formulaire de recherche associe du code
HTML, du CSS et du JavaScript et il n'est pas forcément aisé d'isoler le
comportement de vos composants quand vous les insérez en tant qu'exemples dans
une documentation. Heydon Pickering, consultant UX et accessibilité chez
Paciello Group et auteur du livre [Inclusive Design
Patterns](https://shop.smashingmagazine.com/products/inclusive-design-patterns)
s'est dit qu'il pouvait tirer partie des fonctionnalités de templating et de
modularisation du générateur Hugo pour mener à bien cette tâche, il nous
explique tout cela en détail. Une bonne occasion pour découvrir les
fonctionnalités liées aux snippets de code dans Hugo et d'apprendre à créer des
éléments Shadow DOM en JavaScript.
{: .intro }

Il y a des gens qui détestent écrire de la documentation et d'autres qui
détestent écrire tout court. Il se trouve que j'aime écrire, sinon vous
ne seriez pas en train de lire ceci. Ça tombe bien car en tant que consultant
en Design qui fournit un suivi professionnel, écrire représente une part
importante de mon travail. Par contre je déteste, mais alors je déteste les
traitements de texte.

Mon workflow habituel de travail avec un traitement de texte ressemble un peu à
ça :

1. Sélectionner du texte que je veux copier dans une autre partie du document,
2. S'apercevoir que l'application en a sélectionné un peu plus que ce que
   je lui avais demandé,
3. Essayer de nouveau,
4. Laisser tomber et me résoudre à ajouter la partie manquante (ou supprimer
   la partie en trop) de la sélection visée plus tard,
5. Copier-coller la sélection,
6. S'apercevoir que le formatage du texte collé est quelque peu différent
   de l'orignal,
7. Tenter de trouver le style prédéfini qui correspond au text d'origine,
8. Essayer d'appliquer le style,
9. Laisser tomber et appliquer la police de caractère et la taille à la main,
10. S'apercevoir qu'il y a un espace trop important au dessus du texte collé,
    et appuyer sur “Backspace” pour le supprimer,
11. S'apercevoir que la taille du texte a brusquement changé car il a été
    associé au titre qui le précède et a hérité de ses propriétés,
12. Réfléchir au sens de la vie.

Lorsque vous devez écrire de la documentation pour le web (comprenez [des bibliothèques de composants](https://www.smashingmagazine.com/taking-pattern-libraries-next-level/))
les traitements de texte ne sont pas simplement désobéissants, mais totalement
inadaptés.
Idéalement je voudrais pouvoir écrire de manière à pouvoir inclure les
composants que je documente dans le flux du texte, et cela n'est possible que si
la documentation elle-même est écrite en HTML en CSS et en JavaScript. Dans cet
article, je vais vous montrer comme inclure facilement des démos de code dans
des documents Markdown avec l'aide de snippets et de l'encapsulation du Shadow
DOM.

{% include figure.html url="/assets/images/markdown-shadowdom.png"
description="Un M, une flèche qui pointe vers le bas et un détective caché dans
l'obscurité pour symboliser Markdown et Shadow Dom" %}

### CSS And Markdown

On pourra dire ce qu'on veut sur CSS, c'est un outil de composition
certainement plus consistent et plus sûr qu'un éditeur WYSIWYG ou qu'un
traitement de texte. Pourquoi ? Parce qu'il n'y a pas de boîte noire renfermant
des algorithmes de haut-niveau qui essaient de deviner où les styles doivent
_vraiment_ s'appliquer. Au contraire, c'est beaucoup plus explicite : vous
définissez les [circonstances dans lesquelles les styles s'appliquent aux
éléments](https://www.smashingmagazine.com/2016/11/css-inheritance-cascade-global-scope-new-old-worst-best-friends/))
et ces règles sont respectées.

Le seul problème avec CSS c'est que ça vous demande d'écrire du HTML en
contre-partie. Même les amoureux du HTML voudront bien concéder que c'est
pénible lorsque vous souhaitez simplement écrire de la prose. C'est là où
Markdown entre en jeu. Avec sa syntaxe concise et son jeu de fonctionnalités
réduit à l'essentiel, il offre un façon d'écrire qui est simple à apprendre et
qui peut tirer parti — une fois converti automatiquement en HTML — des
fonctionnalités de composition puissantes et prédictives de CSS. Ce n'est pas
par hasard qu'il est devenu le format _de facto_ des générateurs de site
statique et des plate-formes moderne de blog comme Ghost.

Pour des besoins plus complexes, quand un balisage spécifique est requis, la
majorité des parseurs Markdown vous permettent d'écrire directement du HTML.
Toutefois, plus il y a de balisages complexes, moins vote système de création
est accessible aux personnes moins techniques, ou à ceux qui n'ont pas beaucoup
de temps et de patience. C'est là où les snippets de code rentrent en jeu.

### Les _shortcodes_ d'Hugo

[Hugo](https://gohugo.io)
est un générateur de site statique écrit en Go — un langage polyvalent compilé
développé par Google. Grâce à la parallélisation (et sans doute, à d'autres
fonctionnalités bas-niveau que je ne comprends pas vraiment), Go permet à Hugo
d'être un générateur de contenu statique ultra-rapide. C'est l'une des
nombreuses raisons pour lesquelles Hugo a été sélectionné pour la nouvelle
version du site de Smashing Magazine.

En dehors de la performance, il fonctionne de la même manière que les
générateurs en Ruby ou en NodeJS avec lesquels vous êtes peut-être déjà
familiers : du Markdown et des méta-données (en YAML, TOML ou JSON) transformés
à l'aide de modèles. Sara Soueidan a écrit une
[excellente introduction aux principales fonctionnalités d'Hugo]({% post_url
2017-06-07-migration-de-jekyll-a-hugo %}).

Pour moi la fonctionnalité qui tue dans Hugo c'est son [implémentation des snippets de code](https://gohugo.io/extras/shortcodes/).
Les habitués de WordPress seront peut-être déjà familier avec ce concept : un
raccourci syntaxique destiné principalement à insérer des bouts de codes
complexes ou issus de services tiers. Par example WordPress inclus un raccourci
pour Vimeo qui prend juste l'ID de la vidéo Vimeo en question.

```html
[vimeo 207263942]
```

Les crochets indiquent que le contenu doit être traité et remplacé par le
balisage HTML complet lorsque le contenu est parsé.

À l'aide des fonctions de templating de Go, Hugo fourni une API très simple pour
créer des _shortcodes_ personnalisés. Par exemple, j'ai crée un _shortcode_
CodePen très simple que peux inclure dans mon contenu en Markdown :

{% raw %}
```html
Un peu de contenu en Markdown avant le shortcode. Aliquam sodales rhoncus dui,
sed congue velit semper ut. Class aptent taciti sociosqu ad litora torquent.

{{ <codePen VpVNKW> }}

Un peu de contenu en Markdown après le shortcode. Nulla vel magna sit amet dui
lobortis commodo vitae vel nulla sit amet ante hendrerit tempus.
```
{% endraw %}

Hugo recherche automatiquement le modèle nommé  `codePen.html` dans le
sous-dossier `shortcodes` pour pouvoir parser le _shortcode_ pendant l'étape de
compilation. Mon implémentation ressemble à ça :

{% raw %}
```html
{{ if .Site.Params.codePenUser }}
  <iframe height='300' scrolling='no' title="démonstration CodePen" src='//codepen.io/{{ .Site.Params.codepenUser | lower }}/embed/{{ .Get 0 }}/?height=265&theme-id=dark&default-tab=result,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>
    <div>
      <a href="//codepen.io/{{ .Site.Params.codePenUser | lower }}/pen/{{ .Get 0 }}">Voir la démo sur CodePen</a>
    </div>
  </iframe>
{{ else }}
  <p class="site-error"><strong>Attention :</strong> Le paramètre <code>codePenUser</code> n'a pas été renseigné dans le fichier <code>config.toml</code></p>
{{ end }}
```
{% endraw %}

Pour vous faire une meilleure idée de la manière dont fonctionne le langage de
templating de Go, vous devrez consulter [l'introduction à Go
Template](https://gohugo.io/templates/go-templates/) d'Hugo. En
attendant, retenez simplement cela :

* C'est pas super sexy mais c'est très puissant.
* {% raw %}`{{ .Get 0 }}`{% endraw %} sert à récupérer le premier (et dans cet
  exemple le seul) argument fourni — l'ID du CodePen. Hugo supporte également
  les arguments nommés, qui sont déclarés comme des arguments HTML.
* Le `.` référence le contexte actuel. Donc `.Get 0` signifie
  “Récupère le premier argument fourni pour le _shortcode_ courant.”

Quoi qu'il en soit, je pense que les _shortcodes_ sont la meilleure chose qui
existe depuis le pain de mie en tranches et l'implémentation d'Hugo pour écrire
des _shortcodes_ personnalisés est vraiment impressionnante. Je me dois aussi de
mentionner qu'il est possible d'utiliser les [includes de Jekyll](https://jekyllrb.com/docs/includes/)
pour parvenir à un résultat similaire, mais je les trouve moins souples et
moins puissants.

### Démos de code sans tierce partie

J'aime beaucoup CodePen (et toutes les autres aires disponibles pour jouer avec
du code), mais on se heurte à des problèmes inhérents à ces plate-formes
lorsqu'on veut inclure ces extraits de code dans une bibliothèque
de composants :

* On dépend d'une API et il n'est pas toujours facile de faire fonctionner cela
  efficacement en mode hors-ligne.
* Cela ne représente pas un simple composant, c'est une interface complexe à
  part entière qui embarque les styles du service utilisé.
* Cela crée du bruit et une distraction inutile alors que le focus devrait être
  sur le composant.

Pendant un temps, j'ai tenté d'inclure mes démos de composants en utilisant mes
propres iframes. Je faisais pointer l'iframe vers un fichier en local qui
contenait la page web de la démo. Grâce aux iframes, j'étais capable
d'encapsuler les styles et le comportement des éléments sans me reposer sur une
tierce partie.

Malheureusement, les iframes sont difficiles à manier et à redimensionner
dynamiquement. En terme de complexité de création, cela demande de maintenir des
fichiers distincts et de créer des liens. Je préfèrerais pouvoir écrire
mes composants _in situ_ et inclure juste le code nécessaire pour les faire
fonctionner. Je voudrais pouvoir écrire des démos comme j'écris de la
documentation.

### Le _shortcode_ `demo`

Heureusement, Hugo vous permet de créer des _shortcodes_ qui incluent du contenu
entre des balises de _shortcode_ ouvrantes et fermantes. Ce contenu est
disponible dans le fichier _shortcode_ en utilisant {% raw %}`{{ .Inner }}`{%
endraw %}. Imaginons donc que je veuille utiliser un _shortcode_ `demo` de la
façon suivante :

{% raw %}
```html
{{ <demo> }}
    C'est le contenu !
{{ </demo> }}
```
{% endraw %}

“C'est le contenu !” serait accessible via {% raw %}`{{ .Inner }}`{% endraw %}
dans le fichier de modèle `demo.html` qui va le parser. C'est un bon point de
départ pour insérer des démos de code en ligne, mais il reste encore le problème
de l'encapsulation.

#### Encapsulation du style

Il y a trois choses dont il faut se soucier pour l'encapsulation des styles :

* les styles hérités de la page parente par le composant,
* les styles hérités du composant par la page parente,
* les styles partagés involontairement entre les composants.

Une solution consiste à bien cibler les sélecteurs CSS de manière à ce qu'ils ne
s'appliquent à différents composants ou aux composants et aux pages. Cela
voudrait dire utiliser des sélecteurs ésotériques pour chaque composant, et ce
n'est pas une possibilité que j'ai envie de considérer, alors que je pourrais
écrire du code concis et lisible. Un des avantages des iframes est que le styles
sont encapsulés par défaut donc je pourrais écrire `button { background: blue }`
et être sûr que ce ne serait appliqué qu'à l'intérieur de l'iframe.

Une manière plus simple d'empêcher l'héritage de styles entre composants dans la
page est d'utiliser la propriété `all` avec la valeur `initial`  sur l'élément
parent de son choix. Je peux définir cet élément dans le fichier `demo.html` :

{% raw %}
```html
<div class="demo">
    {{ .Inner }}
</div>
```
{% endraw %}

Ensuite, je dois appliquer la règle `all: initial` à toutes les instances de cet
élément pour qu'elle se propage aux éléments enfants de chaque instance.

```css
.demo { all: initial }
```

Le comportement de `initial` est assez… particulier. En pratique, tous les
éléments affectés sont censés retrouver les styles par défaut du user
agent (comme  `display: block` pour les éléments `<h2>`). Toutefois, l'élément
auquel il est appliqué — `class="demo"` — a besoin qu'on redéfinisse
explicitement certains des styles de l'agent utilisateur. Dans notre cas, c'est
juste `display: block`, puisque `class="demo"` est un `<div>`.

```css
.demo {
  all: initial;
  display: block;
}
```

**Remarque** :
`all` n'est pour l'instant pas supporté par Microsoft Edge mais c'est en
considération.
À part ça le support est [assurément large](https://caniuse.com/#feat=css-all).
Pour nos besoins, la valeur `revert` aurait été plus robuste et plus sûre mais
elle n'est pas encore supportée.

#### Faire du shortcode un ShadowDOM

L'utilisation de `all: initial` ne met pas nos composants en ligne totalement à
l'abri de toute influence externe (la spécificité s'applique toujours) mais nous
pouvons raisonnablement estimer que les styles sont désactivés puisque nous
n'utilisons que la classe `demo`. Les styles hérités de sélecteurs génériques
comme `html` et `body` seront généralement exclus.

Toutefois, cela ne règle que le problème des styles issus de l'élément parent
sur les composants. Pour empêcher les styles écrits pour les composants
d'affecter d'autres parties de la page, nous allons avoir besoin de [shadow
DOM](https://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/) afin de créer
une sous-arborescence encapsulée.

Imaginez que je veuille documenter un élément `<button>` stylé. J'aimerais
pouvoir écrire quelque chose d'aussi simple que l'exemple qui suit, sans
craindre que le sélecteur de l'élément `button` ne s'applique aussi aux éléments
`button` de la bibliothèque de composants elle-même ou à d'autres composants
présents sur la même page.

{% raw %}
```html
{{ <demo> }}
<button>Mon bouton</button>
<style>
button {
    background: blue;
    padding: 0.5rem 1rem;
    text-transform: uppercase;
}
</style>
{{ </demo> }}
```
{% endraw %}

L'astuce est d'utiliser la variable {% raw %}`{{ .Inner }}`{% endraw %} du
modèle de _shortcode_ et de l'inclure en tant qu'`innerHTML` d'un nouveau
`ShadowRoot`. On pourrait l'implémenter de cette façon :

{% raw %}
```html
{{ $uniq := .Inner | htmlEscape | base64Encode | truncate 15 "" }}
<div class="demo" id="demo-{{ $uniq }}"></div>
<script>
    (function() {
        var root = document.getElementById('demo-{{ $uniq }}');
        root.attachShadow({mode: 'open'});
        root.innerHTML = '{{ .Inner }}';
    })();
</script>
```
{% endraw %}

* `$uniq` est une variable définie pour identifier le conteneur du composant.
* Elle est passée à plusieurs fonctions de templating de Go pour créer une
* chaîne de caractères unique… enfin espérons-le ! — ce n'est pas une méthode
* infaillible, c'est simplement pour l'exemple. `root.attachShadow` fait du
* conteneur du composant un hôte shadow DOM. Je peuple le `innerHTML` du
* `ShadowRoot` avec {% raw %}`{{ .Inner }}`{% endraw %}, qui inclus le CSS
* maintenant encapsulé.

#### Autoriser le comportement avec JavaScript

J'aimerais aussi inclure des comportements JavaScript dans mes composants.
Au début je pensais que ce serait facile, malheureusement le code JavaScript
inséré via `innerHTML` n'est ni parsé ni exécuté. On peut résoudre ce problème
en important le contenu d'un élément `<template>`. J'ai corrigé
mon implémentation en conséquence.

{% raw %}
```html
{{ $uniq := .Inner | htmlEscape | base64Encode | truncate 15 "" }}
<div class="demo" id="demo-{{ $uniq }}"></div>
<template id="template-{{ $uniq }}">
    {{ .Inner }}
</template>
<script>
    (function() {
        var root = document.getElementById('demo-{{ $uniq }}');
        root.attachShadow({mode: 'open'});
        var template = document.getElementById('template-{{ $uniq }}');
        root.shadowRoot.appendChild(document.importNode(template.content, true));
    })();
</script>
```
{% endraw %}

Maintenant, je peux inclure la démo d'un bouton interrupteur par exemple:

{% raw %}
```html
{{ <demo> }}
<button>Mon bouton</button>
<style>
button {
    background: blue;
    padding: 0.5rem 1rem;
    text-transform: uppercase;
}

[aria-pressed="true"] {
    box-shadow: inset 0 0 5px #000;
}
</style>
<script>
var toggle = document.querySelector('[aria-pressed]');

toggle.addEventListener('click', (e) => {
  let pressed = e.target.getAttribute('aria-pressed') === 'true';
  e.target.setAttribute('aria-pressed', !pressed);
});
</script>
{{ </demo> }}
```
{% endraw %}

**Note** :
J'ai écris un article détaillé sur [l'accessibilité des
interrupteurs](https://inclusive-components.design/toggle-button/) pour
Inclusive Components.

#### L'encapsulation de JavaScript

JavaScript n'est pas, à ma grande surprise, [encapsulé
automatiquement](http://robdodson.me/shadow-dom-javascript/) comme CSS l'est
dans shadow DOM. C'est à dire que, si il y avait un autre bouton
`[aria-pressed]` dans la page parente situé avant l'exemple de ce composant,
alors `document.querySelector` ciblerait plutôt celui-là.

Ce dont j'ai besoin c'est d'un équivalent de `document` qui se limite à la
sous-arborescence de l'élément `demo`.
C'est possible à faire, mais de manière assez verbeuse :

{% raw %}
```js
document.getElementById('demo-{{ $uniq }}').shadowRoot;
```
{% endraw %}

Je n'avais pas envie de devoir écrire cette expression à chaque fois que je
devais cibler des éléments dans les conteneurs de démo. J'en suis donc venu à
écrire un hack dans lequel j'assigne cette expression à une variable `demo`
locale et à des scripts préfixés fournis via le _shortcode_ avec cette
assignation :

{% raw %}
```js
if (script) {
  script.textContent = `(function() { var demo = document.getElementById(\'demo-{{ $uniq }}\').shadowRoot; ${script.textContent} })()`
}
root.shadowRoot.appendChild(document.importNode(template.content, true));
```
{% endraw %}

Grâce à cela, `demo` devient l'équivalent de `document` pour n'importe quel
composant de la sous-arborescence et je peux utiliser `demo.querySelector` pour
cibler facilement mon bouton interrupteur :

```html
var toggle = demo.querySelector('[aria-pressed]');
```

Remarquez que j'ai entouré le contenu du script de la démo avec une fonction
immédiatement exécutée (IIFE) de manière à ce que la variable `demo` - et toues
les variables traitées et utilisées pour le composant - n'appartiennent pas au
périmètre global. Comme ça `demo` peut être utilisé dans n'importe quel script
présent dans un _shortcode_ mais se réfèrera uniquement au _shortcode_ en cours.

Lorsque ECMAScript6 est disponible, il est possible de parvenir à localiser la
portée à l'aide du ["block
scoping"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block) ,
en entourant les déclarations `let` ou `const` de simples accolades. Toutefois,
toutes les autres définitions de variables à l'intérieur du block seraient
obligées d'utiliser également `let` et `const` (et d'éviter `var`).

{% raw %}
```js
{
    let demo = document.getElementById('demo-{{ $uniq }}').shadowRoot;
    // Author script injected here
}
```
{% endraw %}

#### Support de Shadow DOM

Bien tout ce qui précède n'est possible que si la version 1 de Shadow DOM est
supportée. Tout a l'air de bien marcher dans Chrome, Safari, Opera et Android,
mais c'est plus problématique avec Firefox ou les navigateurs de Microsoft. On
peut toujours détecter le support de cette fonctionnalité et fournir un message
d'erreur lorsque `attachShadow` n'est pas disponible :

```js
if (document.head.attachShadow) {
  // Do shadow DOM stuff here
} else {
  root.innerHTML = 'L\'affichage des démos encapsulées demande le support de Shadow DOM. Ce n\'est pas le code de la démo en lui même qui pose problème au navigateur.';
}
```

Ou alors vous pouvez inclure Shady DOM et l'extension Shady CSS, ce qui veut
dire ajouter une dépendance non négligeable (+60KB) et une API différente. Rob
Dodson a été assez gentil pour me fournir une [démo
basique](https://gist.github.com/robdodson/287030402bad4b496a0361314138f0f9),
que je suis ravi de vous partager pour vous aider à vous lancer.

### Des légendes pour les composants

Maintenant que notre petite démo de base fonctionne, écrire des démos et les
insérer dans la documentation est super simple, pour notre plus grand bonheur.
Cela permet de nous poser des questions comme : "Et si je veux ajouter une
légende pour identifier la démo ?" C'est parfaitement faisable puisque - comme
nous l'avons déjà vu auparavant - le Markdown permet d'embarquer du code HTML.

{% raw %}
```html
<figure role="group" aria-labelledby="legende-bouton">
    {{<demo>}}
    <button>Mon bouton</button>
    <style>
    button {
        background: blue;
        padding: 0.5rem 1rem;
        text-transform: uppercase;
    }
    </style>
    {{</demo>}}
    <figcaption id="legende-bouton">Un bouton standard</figcaption>
</figure>
```
{% endraw %}

Toutefois, la seule nouveauté apportée par cette modification est la formulation
de la légende. Il serait préférable de fournir une interface de saisie simple,
pour faire gagner du temps à mon futur moi - et à tous ceux qui utiliseront le
_shortcode_ - et minimiser par la même occasion les possibles erreurs de saisie.
C'est faisable en fournir un paramètre nommé au _shortcode_ - ici simplement
appelé `legende` :

{% raw %}
```html
{{<demo legende="Un bouton standard">}}
    ... le contenu de la démo ...
{{</demo>}}
```
{% endraw %}

Il peut ensuite assez simple d'accéder au paramètre nommé dans le modèle en
utilisant {% raw %}`{{ .Get "legende" }}`{% endraw %}. Je peux rentre optionnel
l'insertion des balises `<figure>` et `<figcaption>` en insérant une condition,
comme ça je n'affiche la légende que si elle est passée en argument du
_shortcode_ :

{% raw %}
```html
{{ if .Get "legende" }}
    <figcaption>{{ .Get "legende" }}</figcaption>
{{ end }}
```
{% endraw %}

Voici maintenant à quoi ressemble notre modèle `demo.html` (le code n'est pas
très élégant, mais ça fait le job) :

{% raw %}
```html
{{ $uniq := .Inner | htmlEscape | base64Encode | truncate 15 "" }}
{{ if .Get "legende" }}
<figure role="group" aria-labelledby="legende-{{ $uniq }}">
{{ end }}
    <div class="demo" id="demo-{{ $uniq }}"></div>
    {{ if .Get "legende" }}
        <figcaption id="legende-{{ $uniq }}">{{ .Get "legende" }}</figcaption>
    {{ end }}
{{ if .Get "legende" }}
</figure>
{{ end }}
<template id="template-{{ $uniq }}">
    {{ .Inner }}
</template>
<script>
  (function() {
      var root = document.getElementById('demo-{{ $uniq }}');
      root.attachShadow({mode: 'open'});
      var template = document.getElementById('template-{{ $uniq }}');
      var script = template.content.querySelector('script');
      if (script) {
          script.textContent = `(function() { var demo = document.getElementById(\'demo-{{ $uniq }}\').shadowRoot; ${script.textContent} })()`
       }
       root.shadowRoot.appendChild(document.importNode(template.content, true));
  })();
</script>
```
{% endraw %}

Une dernière remarque : si jamais je veux autoriser la syntaxe Markdown dans la
légende, je peux la faire passer dans la fonction `markdownify` d'Hugo. De cette
manière l'auteur peut s'il le souhaite insérer du Markdown (et du HTML).

{% raw %}
```go
{{ .Get "legende" | markdownify }}
```
{% endraw %}

### Conclusion

De par ses performances et son lot de super fonctionnalités, je trouve qu'Hugo
est parfait pour la génération de site statique. Et l'insertion de _shortcodes_
est ce que je préfère. Ici j'ai été capable de répondre à un besoin pour de la
documentation, que j'avais depuis un bon moment.

De même qu'avec les web components, une bonne partie de la complexité du
balisage (souvent pour rendre le code accessible) peut être masquée à
l'utilisateur grâce aux _shortcodes_. Ici je pense notamment à l'inclusion de
`role="group"` et de la relation `aria-labelledby`, qui fournit un meilleur
support pour "group label" à la balise `<figure>` - le genre de choses que
personne ne prend plaisir à coder plus d'une fois, surtout quand il faut créer
des valeurs d'attribut uniques pour chaque instance.

Je crois que les _shortcodes_ d'Hugo sont à Markdown et au contenu ce que les
web composants sont à HTML et à la fonctionnalité : une manière de rendre
l'écriture plus facile, plus sûre et plus consistante. Il me tarde de voir
comment ce curieux petit coin du Web va évoluer.

#### Ressources

* [La documentation d'Hugo](https://gohugo.io/overview/introduction/)
* [Package Template du langage Go](https://golang.org/pkg/text/template/)
* [Les _shortcodes_ d'Hugo](https://gohugo.io/extras/shortcodes)
* [all (propriété CSS)](https://developer.mozilla.org/en/docs/Web/CSS/all),
  Mozilla Developer Network
* [initial (CSS)](https://developer.mozilla.org/en-US/docs/Web/CSS/initial), sur
  le Mozilla Developer Network
* [Shadow DOM v1 : Self-Contained Web Components](https://developers.google.com/web/fundamentals/getting-started/primers/shadowdom),
  Eric Bidelman, Web Fundamentals, Google Developers
* [Introduction à l'élément template](https://www.webcomponents.org/community/articles/introduction-to-template-element)
  Eiji Kitamura, WebComponents.org
* [Les includes de Jekyll](https://jekyllrb.com/docs/includes/)
