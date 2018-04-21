---
title: Des commentaires statiques avec Jekyll et Staticman
description: Utilisation de Staticman pour ajouter des commentaires et des notifications
  de réponses sur un site statique sous Jekyll
date: 2016-12-09
source:
  author: Michael Rose
  title: Improving Static Comments with Jekyll & Staticman
  url: https://mademistakes.com/articles/improving-jekyll-static-comments/
  lang: en
images:
  - https://res.cloudinary.com/jamstatic/image/upload/c_scale,f_auto,q_auto,w_1200/v1523364658/improving-jekyll-static-comments-feature.jpg
categories:
  - jekyll
---

{{% intro %}}

[Michael Rose](https://github.com/mmistakes), l’auteur du
[thème Jekyll Minimal Mistakes](https://mademistakes.com/work/minimal-mistakes-jekyll-theme/),
revient sur les détails de l’implémentation de commentaires statiques — les
commentaires sont versionnés au format YAML dans le dépôt GitHub — à l’aide de
[Staticman](https://eduardoboucas.com/blog/2016/08/10/staticman.html), un
service open-source développé par [Eduardo Bouças](https://eduardoboucas.com),
qui permet d’insérer des contenus générés par les utilisateurs sur un site plus
si statique que ça, proposant ainsi une alternative à Disqus au même titre que
[Jekyll AWS comment](https://github.com/ummels/jekyll-aws-comments).

{{% /intro %}}

{{< figure
src="https://res.cloudinary.com/jamstatic/image/upload/c_scale,f_auto,q_auto,w_1024/v1523364658/improving-jekyll-static-comments-feature.jpg"
attr="Photo Gabriel Santiago" attrlink="https://unsplash.com/@gabrielssantiago" >}}

Depuis que j'ai quitté Disqus pour
[un système de commentaires statiques](https://mademistakes.com/articles/jekyll-static-comments/),
[**Staticman**](https://staticman.net/) a muri avec des ajouts de
fonctionnalités comme _les fils de commentaires_ et _les notifications par
mail_.

À l’aide des instructions fournies par Eduardo Bouças dans
[cette issue GitHub](https://github.com/eduardoboucas/staticman/issues/42 "Email notification upon replies"),
je me suis lancé dans l’amélioration de l’expérience relative aux commentaires
sur **[Made Mistakes](https://mademistakes.com)**. Voici comme j'ai procédé.

## Passer à la version 2 de Staticman

Pour tirer parti de ces nouvelles fonctionnalités, il était nécessaire de migrer
les paramètres de Staticman du fichier `_config.yml` de Jekyll vers un nouveau
fichier `staticman.yml` [^staticman-yml]. Comme il n'y a eu aucun changement
dans les paramètres, la transition vers la version 2 était grandement
simplifiée.

[^staticman-yml]: Un des avantages du nouveau fichier de configuration c'est qu'on peut utiliser Staticman avec d’autres générateurs de site statique. La `v2` ne vous oblige plus à utiliser un fichier `_config.yml` spécifique à Jekyll.

```yaml
comments:
  allowedFields     : ['name', 'email’, 'url’, 'message']
  branch            : "master"
  commitMessage     : "Nouveau commentaire."
  filename          : "commentaire-{@timestamp}"
  format            : "yaml"
  moderation        : true
  path              : "src/_data/comments/{options.slug}"
  requiredFields    : ['name', 'email’, 'message']
  transforms:
    email           : md5
  generatedFields:
    date:
      type          : "date"
      options:
        format      : "iso8601"
```

### Nouvelles options de configuration

Assurez-vous de jeter un œil au
[modèle de fichier de configuration](https://github.com/eduardoboucas/staticman/blob/master/staticman.sample.yml)
et à la
[liste complète des paramètres](https://staticman.net/docs/configuration) pour
vous faire une idée des possibilités de configuration.

Par exemple, vous pouvez configurer plusieurs propriétés (commentaires, avis et
autres types de contenus générés par les utilisateurs), modifier le message de
commit et le corps de texte de la pull request, activer les notifications par
mail et bien plus à partir du fichier `staticman.yml`.

### Supprimer/Ajouter Staticman en tant que collaborateur

Je ne suis pas vraiment certain que l’opération suivante soit nécessaire. Je me
suis heurté à des erreurs lors de mes tests de commentaires et cela a eu l’air
de régler le problème. Il est possible que je me sois trompé quelque part
ailleurs dans la configuration et que l’origine du problème était ailleurs…

Quoi qu’il en soit, vous pouvez toujours partager votre expérience de la mise à
jour de la version 1 à la version 2 de Staticman dans les commentaires de ce
billet.

1.  Révoquez les droits de collaboration de Staticman `v1` dans les paramètres
    de votre dépôt GitHub.
    ![Supprimer staticmanapp en tant que collaborator](https://mademistakes.com/assets/images/staticman-remove-collaborator.png)
2.  Ajoutez de nouveau Staticman en tant que
    [collaborateur](https://mademistakes.com/articles/jekyll-static-comments/#setting-up-staticman).
3.  Faites un appel sur ce endpoint de la version 2 de l’API
    `https://api.staticman.net/v2/connect/{votre nom d’utilisateur GitHub}/{nom de votre dépôt}`
    pour accepter l’invitation de collaboration.

### Mettre à jour l’appel POST du formulaire de commentaires

Pour faire une requête `POST` correcte à Staticman, l’attribut `action` de mon
formulaire de commentaire avait besoin d’une petite mise à jour. Remplacer `v1`
par `v2` dans
[**_includes/page__comments.html**](https://github.com/mmistakes/made-mistakes-jekyll/blob/f0074b7b9e64b6d4b63dd13a371cedc576dae49d/src/_includes/page__comments.html#L34),
puis suffixer avec `/comments`[^property] et le tour était joué pour moi.

```html
<form id="comment-form" class="page__form js-form form" method="post" action="https://api.staticman.net/v2/entry/{{ site.repository }}/{{ site.staticman.branch }}/comments">
```

[^property]: Les propriétés de site sont optionnelles. Se reporter à la documentation de Staticman pour plus de détails sur comment [connecter vos formulaires](https://staticman.net/docs/#step-3-hook-up-your-forms).

## Ajout du support des fils de commentaires

Réussir à faire marcher les commentaires imbriqués s'est révélé assez pénible.
Plusieurs erreurs Liquid, plusieurs tentatives avant d’arriver à faire marcher
des boucles `for` à l’intérieur d’autres boucles `for`, des filtres de tableau
qui pétaient des trucs et tout un tas de galères font que j'ai mis un moment
avant de m'en sortir.

### Ajout d’un identifiant au parent

Pour imbriquer correctement les réponses, j'avais besoin de pouvoir déterminer
leur hiérarchie. La `v2` de Staticman possède un nouveau champ nommé
`options[parent]`[^parent-field] qui peut être utilisé pour aider à établir
cette relation. Avant d’aller plus loin, ajoutons déjà cet identifiant à mon
formulaire dans un champ caché.

[^parent-field]: Staticman nomme ce champ `_parent` dans les entrées.

```html
<input type="hidden" id="comment-parent" name="options[parent]" value="">
```

### Mise à jour des boucles Liquid

Afin d’éviter d’afficher des doublons, j'avais besoin d’exclure les réponses et
de ne montrer que les commentaires parents dans la boucle principale. C'était le
moment idéal pour utiliser le filtre `where_exp` de Jekyll.

{{% notice tip %}}

#### Le filtre d’expression where de Jekyll

Sélectionne tous les objets d’un tableau pour lesquels la condition est vraie,
depuis la version 3.2.0 de Jekyll.

**Exemple:** `site.members | where_exp:"item","item.graduation_year == 2014"`

{{% /notice %}}

Si le champ caché `options[parent]` que j'ai ajouté au formulaire fonctionne
correctement, je devrais obtenir des fichiers de données de commentaires
similaires à ceux-ci :

#### Exemple de commentaire parent

```yaml
message: Ceci est le message du commentaire parent
name: Prénom Nom
email: md5g1bb3r15h
date: '2016-11-30T22:03:15.286Z'
```

#### Exemple de commentaire enfant

```yaml
_parent: '7'
message: Ceci est un message de commentaire enfant
name: Prénom Nom
email: md5g1bb3r15h
date: '2016-11-02T05:08:43.280Z'
```

Comme vous pouvez le voir ci-dessus, le commentaire "enfant" a une donnée
`_parent` renseignée à partir du champ caché `options[parent]` du formulaire.
Sachant cela, j'ai tenté d’utiliser `where_exp:"item","item._parent == nil"`
pour créer un tableau ne contenant que les commentaires "parents".

Malheureusement, le code suivant n'a pas marché :

```liquid
{% assign comments = site.data.comments[page.slug] | where_exp:"item","item._parent == nil" %}
{% for comment in comments %}
  {% assign avatar = comment[1].avatar %}
  {% assign email = comment[1].email %}
  {% assign name = comment[1].name %}
  {% assign url = comment[1].url %}
  {% assign date = comment[1].date %}
  {% assign message = comment[1].message %}
  {% include comment.html index=forloop.index avatar=avatar email=email name=name url=url date=date message=message %}
{% endfor %}
```

À la place, j'ai eu tout un tas de commentaires vides avec le balisage suivant :

```html
<article id="comment-1" class="js-comment comment">
  <div class="comment__avatar">
    <img src="" alt="">
  </div>
  <h3 class="comment__author-name"></h3>
  <div class="comment__timestamp">
    <a href="#comment-1" title="Permalien vers ce commentaire">
      <time datetime=""></time>
    </a>
  </div>
  <div class="comment__content"></div>
</article>
```

Hmm… j'imagine qu'il était temps d’ajouter des filtres `inspect` à mes tableaux
pour voir ce qui se passait.

```liquid
{{ site.data.comments[page.slug] | inspect }}
```

#### Exemple de tableau avant filtrage avec `where_exp`

```yaml
{
  "comment-1471818805944" => {
    "message" => "Ceci est un message de commentaire parent.",
    "name"    => "Prénom Nom",
    "email"   => "md5g1bb3r15h",
    "url"     => "",
    "hidden"  => "",
    "date"    => "2016-08-21T22:33:25.272Z"
  },
  "comment-1471904599908" => {
    "message" => "Ceci est un autre message de commentaire parent.",
    "name"    => "Prénom Nom",
    "email"   => "md5g1bb3r15h",
    "url"     => "",
    "hidden"  => "",
    "date"    => "2016-08-22T21:42:48.075Z"
  }
}
```

#### Exemple de tableau après filtrage avec `where_exp`

```json
[
  {
    "message" => "Ceci est un message de commentaire parent.",
    "name"    => "Prénom Nom",
    "email"   => "md5g1bb3r15h",
    "url"     => "",
    "hidden"  => "",
    "date"    => "2016-08-21T22:33:25.272Z"
  },
  {
    "message" => "Ceci est un autre message de commentaire parent.",
    "name"    => "Prénom Nom",
    "email"   => "md5g1bb3r15h",
    "url"     => "",
    "hidden"  => "",
    "date"    => "2016-08-22T21:42:48.075Z"
  }
]
```

Apparemment l’utilisation du filtre `where_exp` aplatit quelque peu les choses
en supprimant les objets `comment-xxxxxxxxxxxxx`. Cela fait que mes tags
`assign` retournent des valeurs nulles parce que `comment[1]` n'existe plus.

```liquid
{% assign avatar  = comment[1].avatar %}
{% assign email   = comment[1].email %}
{% assign name    = comment[1].name %}
{% assign url     = comment[1].url %}
{% assign date    = comment[1].date %}
{% assign message = comment[1].message %}
```

Une fois cela découvert, la solution était simple --- supprimer `[1]` pour
chacun des noms des propriétés.

```liquid
{% assign avatar  = comment.avatar %}
{% assign email   = comment.email %}
{% assign name    = comment.name %}
{% assign url     = comment.url %}
{% assign date    = comment.date %}
{% assign message = comment.message %}
```

{{< figure
src="https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523364804/staticman-parent-comments-only.png"
alt="Seulement des commentaires parents"
caption="Ça marche, nous avons des commentaires parents.">}}

#### Note : `sort` et les filtres `where` ne font pas bon ménage

Je suis tombé sur des comportements étranges et des erreurs dus à l’utilisation
du filtre de tri `sort` avec les filtres de recherche `where` et `where_exp`.
J'en suis arrivé à la conclusion que ce n'était pas nécessaire, car les éléments
étaient déjà classés par ordre alphabétique en fonction de leurs noms de fichier
et j'ai donc supprimé les filtres.

J'utilise le format suivant : `filename: \"comment-{@timestamp}\"`. Tout dépend
donc de comment vous nommez vos fichiers de commentaires.

#### Afficher les commentaires imbriqués

Voici ce que je cherchais à accomplir… avant que le mal de tête ne commence
😧 🔫

* Déclarer une boucle et, à chaque itération, créer un nouveau tableau nommé
  `replies` ne contenant que les réponses aux commentaires.
* Évaluer la valeur de `_parent` pour ces réponses.
* Si `_parent` est égal à l’index de la boucle parente alors il doit être traité
  comme un commentaire "enfant".
* Sinon, on passe à l’entrée suivante du tableau
* Et ainsi de suite.

J'ai déterminé que la manière la plus simple d’assigner un identifiant unique à
chaque commentaire parent était de le faire à l’aide d’une séquence.
Heureusement Liquid nous permet de faire cela à l’aide de `forloop.index`.

```liquid
{% assign index = forloop.index %}
```

Ensuite j'ai imbriqué une copie modifiée de la boucle _parent_ précédente à
l’intérieur d’elle-même --- pour faire fonction de boucle "enfant" ou `replies`.

```liquid
{% assign replies = site.data.comments[page.slug] | where_exp:"item","item._parent == include.index" %}
{% for reply in replies %}
  {% assign parent  = reply._parent %}
  {% assign avatar  = reply.avatar %}
  {% assign email   = reply.email %}
  {% assign name    = reply.name %}
  {% assign url     = reply.url %}
  {% assign date    = reply.date %}
  {% assign message = reply.message %}
  {% include comment.html parent=parent avatar=avatar email=email name=name url=url date=date message=message %}
{% endfor %}
```

Malheureusement le filtre `where_exp` s'est révélé problématique une fois de
plus, obligeant Jekyll à générer l’erreur suivante :
`Liquid Exception: Liquid error (line 47): Nesting too deep in /_layouts/page.html`.

Après avoir brièvement songé un moment au film **Inception**, j'ai appliqué un
filtre `inspect` pour m'aider à m'en sortir avec la boucle `replies`. J'en ai
conclu que la condition `where_exp` échouait[^integer-string] parce que je
tentais de comparer un entier avec une chaîne de caractères 😳.

[^integer-string]: `15` n'est pas la même chose que `'15'`. Ces guillemets simples font toute la différence…

Pour résoudre cela, j'ai placé une balise `capture` autour de la variable
d’index pour la convertir en chaîne de caractères. Puis j'ai modifié la
condition du filtre `where_exp` afin de comparer `_parent` avec cette nouvelle
variable `{{ i }}` --- pour corriger le problème et me permettre de passer à la
suite.

```liquid
{% capture i %}{{ include.index }}{% endcapture %}
{% assign replies = site.data.comments[page.slug] | where_exp:"item","item._parent == i" %}
```

#### `_includes/page__comments.html`

```html
<section class="page__reactions">
  {% if site.repository and site.staticman.branch %}
    {% if site.data.comments[page.slug] %}
      <!-- Start static comments -->
      <div id="comments" class="js-comments">
        <h2 class="page__section-label">
          {% if site.data.comments[page.slug].size > 1 %}
            {{ site.data.comments[page.slug] | size }}
          {% endif %}
          Commentaires
        </h2>
        {% assign comments = site.data.comments[page.slug] | where_exp:"item","item._parent == nil" %}
        {% for comment in comments %}
          {% assign index   = forloop.index %}
          {% assign p       = comment._parent %}
          {% assign parent  = p | to_integer %}
          {% assign avatar  = comment.avatar %}
          {% assign email   = comment.email %}
          {% assign name    = comment.name %}
          {% assign url     = comment.url %}
          {% assign date    = comment.date %}
          {% assign message = comment.message %}
          {% include comment.html index=index parent=parent avatar=avatar email=email name=name url=url date=date message=message %}
        {% endfor %}
      </div>
      <!-- End static comments -->
    {% endif %}

    {% unless page.comments_locked == true %}
    <!-- Début du nouveau formulaire de commentaire -->
    <div id="respond">
      <h2 class="page__section-label">Laisser un commentaire <small><a rel="nofollow" id="cancel-comment-reply-link" href="{{ page.url | absolute_url }}#respond" style="display:none;">Annuler la réponse</a></small></h2>
      <p class="instruct"><a href="https://daringfireball.net/projects/markdown/syntax">Markdown</a> est autorisé. Les adresses mail ne seront pas affichées.</p>
      <form id="comment-form" class="page__form js-form form" method="post" action="https://api.staticman.net/v2/entry/{{ site.repository }}/{{ site.staticman.branch }}/comments">
        <fieldset>
          <label for="comment-form-message"><strong>Commentaire</strong> <span class="required">*</span></label>
          <textarea type="text" rows="6" id="comment-form-message" name="fields[message]" spellcheck="true"></textarea>
        </fieldset>
        <fieldset>
          <label for="comment-form-name"><strong>Nom</strong> <span class="required">*</span></label>
          <input type="text" id="comment-form-name" name="fields[name]" spellcheck="false" />
        </fieldset>
        <fieldset>
          <label for="comment-form-email"><strong>Email</strong> <small>(utilisé pour l’image <a href="https://en.gravatar.com/">Gravatar</a> et les notifications de réponses)</small></label>
          <input type="email" id="comment-form-email" name="fields[email]" spellcheck="false" />
        </fieldset>
        <fieldset>
          <label for="comment-form-url"><strong>Site</strong> <small>(optionnel)</small></label>
          <input type="url" id="comment-form-url" name="fields[url]" spellcheck="false" />
        </fieldset>
        <fieldset class="hidden" style="display:none;">
          <input type="hidden" name="options[origin]" value="{{ page.url | absolute_url }}">
          <input type="hidden" id="comment-parent" name="options[parent]" value="">
          <input type="hidden" id="comment-post-id" name="options[slug]" value="{{ page.slug }}">
          <label for="comment-form-location">Laissez vierge si vous êtes un humain</label>
          <input type="text" id="comment-form-location" name="fields[hidden]" autocomplete="off"/>
        </fieldset>
        <!-- Début du message d’alerte du formulaire de commentaire -->
        <p class="hidden js-notice">
          <span class="js-notice-text"></span>
        </p>
        <!-- Fin du message d’alerte du formulaire de commentaire -->
        <fieldset>
          <button type="submit" id="comment-form-submit" class="btn btn--large">Soumettre mon commentaire</button>
          <label for="comment-form-reply">
            <input type="checkbox" id="comment-form-reply" name="options[subscribe]" value="email">
            M’informer des nouveaux commentaires par mail.
          </label>
        </fieldset>
      </form>
    </div>
    <!-- Fin du nouveau formulaire de commentaire -->
    {% else %}
      <p><em>Les commentaires sont fermés. Si vous avez une question concernant le contenu de cette page, vous pouvez <a href="{{ site.url }}/contact/">me contacter</a>.</em></p>
    {% endunless %}
  {% endif %}
</section>
```

#### `_includes/comment.html`

```html
<article id="comment{% if p %}{{ index | prepend: '-' }}{% else %}{{ include.index | prepend: '-' }}{% endif %}" class="js-comment comment {% if include.name == site.author.name %}admin{% endif %} {% if p %}child{% endif %}">
  <div class="comment__avatar">
    {% if include.avatar %}
      <img src="{{ include.avatar }}" alt="{{ include.name | escape }}">
    {% elsif include.email %}
      <img src="https://www.gravatar.com/avatar/{{ include.email }}?d=mm&s=60" srcset="https://www.gravatar.com/avatar/{{ include.email }}?d=mm&s=120 2x" alt="{{ include.name | escape }}">
    {% else %}
      <img src="{{ site.url }}/assets/images/avatar-60.png" srcset="{{ site.url }}/assets/images/avatar-120.png 2x" alt="{{ include.name | escape }}">
    {% endif %}
  </div>
  <h3 class="comment__author-name">
    {% unless include.url == blank %}
      <a rel="external nofollow" href="{{ include.url }}">
        {% if include.name == site.author.name %}<svg class="icon"><use xlink:href="#icon-mistake"></use></svg> {% endif %}{{ include.name }}
      </a>
    {% else %}
      {% if include.name == site.author.name %}<svg class="icon"><use xlink:href="#icon-mistake"></use></svg> {% endif %}{{ include.name }}
    {% endunless %}
  </h3>
  <div class="comment__timestamp">
    {% if include.date %}
      {% if include.index %}<a href="#comment{% if p %}{{ index | prepend: '-' }}{% else %}{{ include.index | prepend: '-' }}{% endif %}" title="Permalink to this comment">{% endif %}
      <time datetime="{{ include.date | date_to_xmlschema }}">{{ include.date | date: '%B %d, %Y' }}</time>
      {% if include.index %}</a>{% endif %}
    {% endif %}
  </div>
  <div class="comment__content">
    {{ include.message | markdownify }}
  </div>
  {% unless p or page.comments_locked == true %}
    <div class="comment__reply">
      <a rel="nofollow" class="btn" href="#comment-{{ include.index }}" onclick="return addComment.moveForm('comment-{{ include.index }}', '{{ include.index }}', 'respond’, '{{ page.slug }}')">Reply to {{ include.name }}</a>
    </div>
  {% endunless %}
</article>

{% capture i %}{{ include.index }}{% endcapture %}
{% assign replies = site.data.comments[page.slug] | where_exp:"item","item._parent == i" %}
{% for reply in replies %}
  {% assign index   = forloop.index | prepend: '-' | prepend: include.index %}
  {% assign p       = reply._parent %}
  {% assign parent  = p | to_integer %}
  {% assign avatar  = reply.avatar %}
  {% assign email   = reply.email %}
  {% assign name    = reply.name %}
  {% assign url     = reply.url %}
  {% assign date    = reply.date %}
  {% assign message = reply.message %}
  {% include comment.html index=index parent=parent avatar=avatar email=email name=name url=url date=date message=message %}
{% endfor %}
```

### HTML et JavaScript pour la réponse à un commentaire

L'étape suivante a consisté à ajouter quelques touches finales pour que le tout
fonctionne.

Habitué à la manière dont [**WordPress**](https://wordpress.org/) gère les
formulaires de réponse, j'y ai pioché de l’inspiration. En mettant le nez dans
le code JavaScript qui se trouve dans
[`wp-includes/js/comment-reply.js`](https://core.svn.wordpress.org/trunk/wp-includes/js/comment-reply.js)
j'ai trouvé tout ce dont j'avais besoin:

* une fonction `respond` pour déplacer le formulaire dans la vue,
* une fonction `cancel` pour supprimer un formulaire de réponse et le
  repositionner à son état d’origine,
* passer l’identifiant unique du parent à `options[parent]` lors de la
  soumission du formulaire.

J'ai commencé par utiliser une condition `unless` pour n'afficher que les liens
"répondre" sur les commentaires _parents_. J'avais seulement envisagé un seul
niveau de profondeur pour les réponses, donc cela m'a semblé être un bon moyen
pour m'en tenir à ça.

```html
{% unless p %}
  <div class="comment__reply">
    <a rel="nofollow" class="btn" href="#comment-{{ include.index }}">Répondre à {{ include.name }}</a>
  </div>
{% endunless %}
```

{{< figure
src="https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523364852/staticman-nested-comments.png"
alt="Commentaires imbriqués"
caption="Commentaires imbriqués sur un seul niveau de profondeur." >}}

Pour donner vie au **lien répondre** j'ai lui ai ajouté l’attribut `onclick`
suivant et du
[JavaScript](https://github.com/mmistakes/made-mistakes-jekyll/blob/49632d19977e341b51c91dad8e71bf6ef88e79c3/src/assets/javascripts/main.js#L84-L181).

```javascript
onclick =
  "return addComment.moveForm('comment-{{ include.index }}', '{{ include.index }}', 'respond’, '{{ page.slug }}')";
```

J'ai juste eu à modifier quelques noms de variables dans le script
`comment-reply.js` de WordPress pour que tout marche bien avec le balisage de
mon formulaire.

{{< figure
src="https://res.cloudinary.com/jamstatic/image/upload/f_auto,q_auto/v1523364901/comment-reply-animation.gif"
alt="Les réponses aux commentaires en action"
caption= "Appuyer sur le **bouton répondre** déplace le formulaire du commentaire dans la vue et remplit le champ `<input type=\"hidden\" id=\"comment-parent\" name=\"options[parent]\" value=\"\">` avec la bonne `value` du _parent_. Alors qu'appuyer sur **Annuler réponse** remet le formulaire dans son état d’origine." >}}

## Ajout du support des notifications par mail

Comparées aux réponses de commentaires imbriqués, les notifications par mail
furent très simples à mettre en place.

### Mise à jour de la configuration `staticman.yml`

Pour s'assurer que les liens dans les mails de notifications sont sûrs et ne
proviennent que de domaines de confiance, définissez `allowedOrigins` en
fonction.

**Exemple :**

```yaml
allowedOrigins: ["mademistakes.com"]
```

Le(s) domaine(s) autorisé()s doi(ven)t correspondre à ceux passés par le champ
`options.origin` que nous allons ajouter à la prochaine étape. Seuls les
domaines correspondants déclencheront les notifications à envoyer, faute de quoi
l’opération échouera.

{{% notice tip %}}

#### ProTip : Utilisez votre propre compte Mailgun

L'instance publique de Static man utilise un compte
[**Mailgun**](http://www.mailgun.com/) limité à 10 000 emails par mois. Je
vous encourage à créer un compte et à ajouter votre propre
[API et domaine Mailgun](https://staticman.net/docs/configuration#notifications.enabled)
dans le fichier `staticman.yml`. Assurez-vous de bien chiffrer les deux en
utilisant le chemin suivant :
`https://api.staticman.net/v2/encrypt/{TEXTE À CHIFFRER}`.

{{% /notice %}}

### Mise à jour du formulaire de commentaire

Pour terminer, ajoutons deux champs au formulaire de commentaire.

**Champ 1:** Un champ caché qui passe la valeur d’`origin`[^origin] défini dans
le fichier `staticman.yml`:

```html
<input type="hidden" name="options[origin]" value="{{ page.url | absolute_url }}">
```

**Champ 2:** Un `input` de type case à cocher pour s'inscrire aux notifications
par mail.

```html
<label for="comment-form-reply">
  <input type="checkbox" id="comment-form-reply" name="options[subscribe]" value="email">
  Me prévenir par mail des nouveaux commentaires.
</label>
```

Rien de bien surprenant ici, `name=options[subscribe]` and `value="email"` sont
ajoutés au champ pour associer les données d’abonnement avec l’adresse mail.

[^origin]: Cette URL sera ajoutée dans la notification par mail envoyée aux abonnés pour leur permettre d’ouvrir directement la page.

Si tout est correctement configuré, l’utilisateur devrait recevoir un mail dès
qu'un nouveau commentaire est posté sur le billet ou la page auxquels il s'est
abonné.

{{< figure src="https://res.cloudinary.com/jamstatic/image/upload/c_scale,f_auto,q_auto,w_1024/v1523365018/staticman-email-notification.png" alt="Staticman reply email notification"
caption="Exemple d’un mail de notification \"Nouvelle réponse\" de Staticman." >}}

Voilà, vous avez mis en place un système de commentaires basé sur des fichiers
statiques dans Jekyll et qui gère les commentaires imbriqués et les
notifications de réponse. Maintenant j'aimerais gagner une minute de temps de
génération pour pouvoir ajouter les nouveaux commentaires encore plus vite 😦.
