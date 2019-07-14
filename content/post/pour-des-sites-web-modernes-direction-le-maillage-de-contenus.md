---
title: Pour des sites web modernes, direction le maillage de contenus
date: 2019-07-10
lastmod: 2019-07-12T12:42:35.000+00:00
description: Agréger des données depuis différents services spécialisés, et les présenter
  à l'aide d'outils de développement web modernes facilite la création de sites riches
  et performants.
author: anthony
categories:
- gatsby
- headless
images:
- https://res.cloudinary.com/jamstatic/image/upload/c_scale,f_auto,q_auto,w_1200/v1562939172/jamstatic/content-mesh.png
- "/assets/images///"
source:
  author: Sam Bhagwat
  title: 'Delivering Modern Website Experiences: The Journey to a Content Mesh'
  url: https://www.gatsbyjs.org/blog/2018-10-04-journey-to-the-content-mesh/
  lang: en
commments: false
aliases: []
canonical_url: ''
keywords: []
draft: true

---
**Cet article du cofondateur de Gatsby à défaut d'être totalement objectif a le mérite de présenter l'écosystème et les enjeux actuels quand il s'agit de développer des sites web à la fois riches en données diverses et extrêmement performants. Ce n'est pas le seul moyen de le faire, la JAMstack est riche et variée,  mais c'est assurément un des plus populaires. Nous publions sa traduction afin que les développeurs, les décideurs et les clients soient bien en phase et possèdent le même niveau d'information lorsqu'il s'agit de mettre en place des architectures pour des site web modernes et rapides.**

Les systèmes de gestion de contenu (CMS) sont nés pour rendre l'édition de contenu de sites _possible_. Ils sont maintenant ré-imaginés pour la rendre _fantastique_.

Au début des années 2000, publier sur le web était difficile. Le CMS s'est petit à petit imposé comme l'application centrale pour stocker les contenus, générer les sites et les servir aux utilisateurs finaux.

Avec le temps, le paysage de fonctionnalités s'est étoffé — des domaines clé comme la recherche, le suivi de données, les paiements, la personnalisation et le e-commerce ont émergé. Dans chaque domaine, les outils spécialisés se sont vite améliorés, alors que dans le même temps la qualité des applications de gestion de contenu destinés aux entreprises comme Adobe Experience Manager ou Sitecore a plus ou moins stagné.

### Modulariser le CMS

De nos jours, l'équipe web d'un site de e-commerce peut gérer son inventaire produit dans [Shopify](https://www.shopify.com/), les listings de produit dans [Salsify](https://www.salsify.com/) et les évaluations dans [Bazaarvoice](https://www.bazaarvoice.com/). Une équipe qui fait tourner un site avec des contenus payants peut écrire des articles dans [Wordpress](https://wordpress.org/), stocker des vidéos dans [JWPlayer](https://www.jwplayer.com/), des données utilisateur dans [Auth0](https://auth0.com/), et les données d'inscription dans [Recurly](https://recurly.com/).

Lorsque les équipes web ont besoin d'ajouter de la recherche, elles peuvent se tourner vers [Algolia](https://www.algolia.com/); vers [Stripe](http://stripe.com) pour des paiements; vers [Segment](https://segment.com/) pour des données statistiques; vers [Optimizely](https://www.optimizely.com/) pour du A/B testing ; vers [Evergage](https://www.evergage.com/) pour de la personnalisation.

Les équipes adoptent ces services car chacun d'entre eux est fait pour répondre à un besoin bien précis, alors que de leur côté les CMS destinés aux entreprises ne sont souvent pas optimisés pour grand chose.

![](/v1562938736/jamstatic/modular-cms-architecture.png)

### L'émergence du maillage de contenus

Cet article a pour but d'expliquer l'émergence du "maillage de contenus" (ou "agrégateur de contenus") — une couche structurelle pour un site web découplé. Le maillage de contenus assemble différents systèmes de contenus, dans un environnement de développement moderne, tout en optimisant la performance du site web généré.

La précédente génération de CMS dédiés aux entreprises offrait souvent une expérience d'édition de contenu générique, basée sur des développement et des environnements de déploiement dépassés. La nouvelle stratégie pour la gestion de contenu tant à ne conserver que les meilleurs solutions, adaptables à des cas d'utilisation spécifiques comme le e-commerce ou le blogging; elle apporte un cadre de travail moderne permettant des itérations rapides et génère des sites web légers et rapides nativement.

Le maillage de contenus donne plus de possibilités aux développeurs tout en conservant le workflow des contributeurs. Il vous donne accès aux meilleurs services _sans_ la difficulté de devoir les intégrer manuellement.

### Trois domaines où l'innovation est rapide

Le changement est stimulé par la convergence de trois révolutions dans la façon dont nous créons et consommons le contenu :

* _La gestion du contenu_ : les applications de type CMS monolithiques sont remplacées par des systèmes de gestion modulaires et spécialisés.
* _Les techniques de développement_ : les frameworks pour des interfaces modernes comme React ont un rôle prépondérant pour les expériences enrichies de l'utilisateur.
* La performance : étant donné que le mobile représente plus de 50% du traffic internet, la haute performance est devenue obligatoire et non plus optionnelle.

![](/v1562938846/jamstatic/three-website-revolutions.png)

Ces changements ont rendu les technologies modernes aussi _essentielles_ pour créer des expériences digitales novatrices qu'_accessible_ pour les entreprises.

Chaque changement touche directement les principaux protagonistes : respectivement le marketing, les développeurs et enfin les utilisateurs finaux.

Le challenge clé réside dans le fait que sans agrégateur de contenu, intégrer plusieurs systèmes de données ensemble représente un travail considérable. Forrester titre dans l'un de ses [rapports](https://www.tangomodem.com/wp-content/uploads/2017/09/the-rise-of-the-headless-cms.pdf) : "Attention : les CMS Headless sont dédiés aux boutiques faites-maison". Néanmoins, _avec_ l'utilisation d'un agrégateur de contenu, tous les systèmes de données peuvent être fusionnés dans un seul système unifié, peu coûteux et stable.

En d'autres termes, l'agrégateur de contenu permet aux développeurs, aux contributeurs et aux internautes d'être _tous_ content.

## Le découplage du CMS

Les exigences des internautes suivent une règle simple : elles augmentent en permanence.

Créer des expériences de contenu web attrayantes est devenu crucial sur le champ de bataille de la fidélisation de la clientèle. Mais vous ne pouvez pas avoir quelque chose de frais, novateur et engageant sans un contenu et des architectures de développement à jour.

Aujourd'hui, les entreprises du textile et de biens de consommation font face à une double menace de la part d'Amazon et des sociétés dites "DNVB" (Digitally Native Vertical Brands) comme Dollar Shave Club et Bonobos. Les entreprises de voyages d'affaires sont en concurrence avec Kayak et Expedia. Les organismes de presse ont subi de lourdes pertes à cause des sites de contenu "à chaud" et de Facebook/Google. Et ainsi de suite…

Mais il n'est pas simple de mettre en place des expériences pertinentes et universelles :

* Les équipes marketing ont besoin de systèmes de contenu qui donnent une bonne vue d'ensemble du site pour créer des messages convaincants.
* Les équipes de développement ont besoin de Framework Front qui facilite la personnalisation de l'interface pour maintenir l'apparence du site et sa fraicheur.
* Les gérants d'entreprises ont besoin d'outils complémentaires de grande qualité tels que la recherche, l'analyse, les formulaires et le paiement afin de démontrer la plus-value et justifier l'investissement continu. De plus, ils ont besoin que leurs sites soient rapides.

### Générique contre spécifique

Si on compare des CMS spécialisés comme Shopify pour le e-commerce ou WordPress pour le blogging, les applications de gestion de contenu d'entreprise comme Sitecore, Evog ou Adobe Experience Manager (AEM) proposent des modules de contenu générique.

Les expériences de développement des CMS d'entreprise sont basées sur des langages et des frameworks en C#, ASP.NET, et J2EE —  qui ont dix ans de retard en terme de développement front-end si on les compare aux alternatives des protagonistes actuels.

Les produits spécialisés ont émergés pour proposer des alternatives de première ordre dans chacun de ses domaines, mais se sont avérés difficile à intégrer.

Un site d'actualités payant qui stocke actuellement tous ses contenus et ses données dans Drupal 7 est en train de migrer vers une architecture de microservices. Ils géreront les articles dans [Wordpress](https://wordpress.org/), les vidéos avec  [JWPlayer](https://www.jwplayer.com/), les données utilisateurs dans [Auth0](https://auth0.com/). Ils développent avec React et  utilisent [Segment](https://segment.com) pour le suivi des usages, [Stripe](http://stripe.com) pour les paiements et [Recurly](https://recurly.com/)  pour les abonnements.

Une autre marque numérique bien connue qui utilisait Sitecore comme plate de développement et de contenus est passée à  [Contentful](https://www.contentful.com/) comme CMS headless, [Yotpo](https://www.yotpo.com/)  pour le contenu généré par les utilisateurs — principalement des commentaires, et en a profité pour transitionner vers React afin de fournir un look and feel moderne.

![Les architectures modulaires des CMS](/v1562938736/jamstatic/modular-cms-architecture.png)

### Intégrer des services modulaires

Une meilleure description de cette approche, qui consiste à architecturer des sites web grâce à des APIs serait peut-être "modulaire" ou "microservices" plutôt que "headless". 

À l'aide de ces solutions, les clients peuvent choisir des services à la carte. La principale proposition de valeur des solutions globales comme Sitecore ou AEM a diminuée car elles ne procurent pas la meilleure solution possible à un besoin donné.

With these solutions available, customers can pick vendors _à la carte_. The core value proposition of one-stop solutions like Sitecore or AEM has diminished as they do not provide the best solution for any given need.

Enterprises who have purchased these CMS solutions are left asking themselves one of the oldest questions in corporate IT: should they stick with their single-vendor application suite, with inferior but integrated modules? Or, unlock a way to integrate the best-of-breed solutions?

![](/v1563012604/jamstatic/headless-cms-landscape.png) The headless CMS landscape

### Rendre l'intégration possible à l'aide du maillage de contenus

Over the next three posts, we’ll discuss the rise of a content mesh that makes integration _feasible_ for most digital agencies and enterprise customers.

## L'évolution du développement Web moderne

Developing for the web is _hard_. With millions of properties on the Internet, website developers have to create experiences that are compelling enough to engage audiences when new destinations are only a few keystrokes away.

And while creating rich user experiences is never an easy task, walled-garden CMS development environments introduce additional challenges. Teams are forced to work around them, but ultimately deliver less rich experiences at higher cost.

### Les CMS traditionnels présentent des défis

Some challenges of traditional CMS development environments include:

* **Walled-garden development.** Work on projects across CMS systems often requires reimplementing basic functionality like carousels or banners. Development can be blocked due to CMS access restrictions or code freezes. Upgrade paths can be challenging when CMSs don’t support component UI versioning.
* **Maintaining local environments**. Setting up a local app server and database and keeping it up to date with team members’ changes is time-consuming, especially when switching between projects or returning after a gap in development.
* **Project organization.** Reliably installing and managing third-party dependencies, including cross-compatibility and handling bugs in upstream, is challenging. Vanilla JavaScript offers no standard project organization or code bundling patterns.
* **A difficult target environment.** Cross-browser API incompatibilities, global DOM application state, and imperative DOM APIs make it easy to inadvertently introduce bugs.

### L'évolution des frameworks modernes

Luckily, we know how to fix these problems. Over the last five years, two modern web frameworks, React and Angular, have taken the web world by storm.

![React et Angular représentent plus de 60% des frameworks JS utilisés](/v1563011179/jamstatic/react-angular-interest-javascript.png)

React and Angular interest as % of JavaScript

_Source_: [Google Trends](https://trends.google.com/trends/explore?date=2012-01-01%202018-08-31&geo=US&q=%2Fm%2F012l1vxv,%2Fm%2F0j45p7w,%2Fm%2F02p97)

### Les frameworks modernes offrent de la stabilité et un développement plus rapide

Modern frameworks offer built-in performance and testing patterns/tools, encourage componentized/modular code, enable code reuse across teams, enable monolithic apps to be broken into smaller, more maintainable services, and offer a rich ecosystem to allow developers to quickly solve common problems instead of wasting cycles reinventing wheels.

Their _ubiquity_ adds stability to the landscape; React and Angular have become universal. With ubiquity comes an ecosystem of high-quality components -- tables, forms, date-pickers, whole design systems -- that are open-source and available for plugging into any site.

Modern frameworks also represent a core _technology advance_ over previous solutions that make it much easier to create visually rich, low-defect frontends:

* **Reusable UIs.** Key UI elements, such as headers, dropdowns, typeaheads, buttons, tables and so forth may be reused across the application, without copy-pasta.
* **Local application state.** Previous methods of modifying web page display relied on global state. When code at any place can modify state everywhere, the result at scale is spaghetti code. In React/Angular’s component model, components cannot modify outside state without being granted explicit permission.
* **A declarative virtual DOM.** Instead of imperatively changing specific page elements’ state in reaction to specific user actions, developers can specify desired UI state as a "view" on application state, making code more readable and less buggy.

React and Angular, along with mature ES2015+ JavaScript, and stable dependency/bundling solutions like npm and webpack, are blowing away conceptions of JS as an unserious language. They are in production of leading Fortune 500 companies, including Facebook, Twitter, Microsoft, Autodesk, Airbnb, and McDonalds.

### Les frameworks modernes permettent des expériences de contenus fascinantes

While React and Angular were originally created as web _app_ solutions, with the rise of the headless CMS, usage of React and Angular on _websites_ has skyrocketed, growing 5-10X since early 2017.

React and Angular usage among top 10k sites

![React et Angular sont déjà utilisés par plus de10% des 10000 sites les plus visités au monde](/v1563011252/jamstatic/react-angular-usage-top10k.png)

_Source_: [React](https://trends.builtwith.com/javascript/React), [Angular](https://trends.builtwith.com/framework/Angular) (builtwith.com)

Headless & decoupled setups allow a modern frontend to be placed over a 2000s-era [ASP.NET](http://www.dnnsoftware.com/)/[J2EE](https://www.adobe.com/marketing/experience-manager.html)/[C#](https://www.sitecore.com/)/[PHP](https://wordpress.com/) CMS and present a fresh user experience — without sacrificing the powerful content management workflows that established these CMS platforms as industry leaders in the first place.

And the evidence? Increasingly, award-winning websites such as the leading "corporate" website winners of the 2018 Webby awards, are powered by modern frontend JavaScript frameworks.

![](/v1563011066/jamstatic/bmw-arch-digest-spotify.png) <a href="[https://bmw.com](https://bmw.com "https://bmw.com")">bmw.com</a> -- Angular   //   <a href="[https://architecturaldigest.com](https://architecturaldigest.com "https://architecturaldigest.com")">AD (Conde Nast)</a> -- React // <a href="[https://spotify.me](https://spotify.me "https://spotify.me")">Spotify.me</a> -- Vue

Modern web development frameworks like React and Angular are the latest step transforming the content web from its original simple, document-based model to a complex, rich web experience and app platform -- and it’s happening _fast_.

![](https://www.gatsbyjs.org/static/d98d0312e3d56599a8dbd61859a83914/74085/headless-cms-landscape.png) The rise of modern frameworks

## Pourquoi la performance sur mobile est cruciale

Mobile traffic now makes up over half of all site visits, and more than half of mobile site visits are abandoned if a page takes [over 3 seconds to load](https://www.thinkwithgoogle.com/data-gallery/detail/mobile-site-abandonment-three-second-load/).

With the Fortune 500 spending millions of marketing dollars on marketing initiatives aimed at driving traffic to their site, the business impact of bouncing visitors is clear -- [every 100ms of latency costs 1% of sales.](https://www.digitalrealty.com/blog/the-cost-of-latency/)

Unfortunately, in practice, great performance is surprisingly hard to achieve -- average page load times _haven’t improved_ over several years of increasing connection speed.

Why is that? Increased site complexity often distributes bottlenecks across multiple code points and teams of stakeholders. While performance checklists exist, they’ve ballooned to 40+ items -- making them costly and time-consuming for teams to implement.

As Gatsby's co-founder Kyle Mathews likes to say (paraphrasing Tolstoy):

> All fast websites are alike, but all slow websites are slow in different ways.

Ultimately, we’ll argue, performance must be solved _at the framework level_ -- that is, in the content mesh.

### L'augmentation de l'usage des smartphones

Between 2014 and 2017, mobile usage (including tablets) rose from 20% of site visits to 50% of site visits.

Mobile visits as % of total site traffic

![](/v1563017605/jamstatic/mobile-visits.png)

Source: [StatCounter](http://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/worldwide/2011)

When smartphones were first created, the first key challenge of website teams was to offer a responsive version of their site that worked on mobile devices _at all._

As mobile has grown to half of internet traffic, the key challenge has shifted to performance.

### Des connexions plus rapides n'ont pas entrainé des sites plus rapides

While average phone connection speed, as well as processing power, has increased over the last several years, sites haven’t gotten faster. In fact, load times **have increased**.

Data from the HTTPArchive shows how long it's taken for the average page on the Internet to completely load all content (including images, script files, CSS files, etc.):

Web performance over time

![](/v1563015625/jamstatic/web-perf-over-time.png)

Source: [HTTPArchive](https://httparchive.org/reports/loading-speed?start=2014_02_01&end=latest&view=list#ol)

Why is that?

Connection speeds for mobile device have increased, while Moore's Law has made devices faster. However, these speed dividends have been eaten up by two things.

First, [**heavier page weights**](https://www.keycdn.com/support/the-growth-of-web-page-size/).

This has generally driven by increased page complexity driven by increased user expectations.

Second, the **growing complexity of websites**. Non-critical images, CSS, JS libraries, and 3rd party tracking software will often unintentionally end up on the critical path to page load:

* A marketing analyst drops a `<script>` tag from a hot new vendor inside a Google Tag Manager container. This triggers a blocking network call to a pixel provider on page loads. Time To Interactive (TTI) now averages 800ms longer.
* After a team whiteboarding session, the lead designer for a popular lifestyle magazine decides to switch to a custom default site font. On Friday afternoon, a developer scans the JIRA ticket, thinks "this should be easy" and implements a two-line code change. The site now takes 20% longer to load.
* The business unit of an e-commerce store needs additional inventory management tools, so they purchase a popular plugin in their CMS ecosystem that offers this functionality. What they don’t know is that this plugin adds additional database calls every time a user loads a product page, delaying overall page loads by 500ms.

With website performance rarely tracked, almost never systematically, and with no performance "owner", it's easy to see how load times can balloon.

Like factory floors before the advent of [just-in-time manufacturing](https://en.wikipedia.org/wiki/Just-in-time_manufacturing), website page loading paths are clogged with work being done prematurely, creating resource contention and increasing cycle time.

### L'attention grandissant à la crise de la performance sur mobile

In the last 2-3 years, there’s been growing attention to the crisis of mobile performance from a number of different corners:

* As e-commerce grows globally, enterprises are increasingly targeting users on smartphones, often outside the fast-connection First World.
* In January 2018, Google announced that [it would use mobile page speed](https://webmasters.googleblog.com/2018/01/using-page-speed-in-mobile-search.html) as a ranking for mobile SEO. In July 2018, those changes took effect.
* Movements such as [Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/) and the [JAMstack](https://jamstack.org/) have brought attention to site performance as a first-order goal.

_Performant_ is the new _responsive_.

For digital agencies and enterprises, the challenge becomes: how to achieve performance, while delivering websites on time and within project budgets?

### L'optimisation de la performance, comment ça marche ?

There are two _types_ of performance optimizations.

Teams can optimize the _payload_ -- what they’re serving users. Or they can optimize _delivery_ -- how it gets to the client.

**Payload optimization**

_Payload optimizations_ involve items like reducing image and JS weight, deferring below-the-fold image calls, and inlining critical CSS.

When the amount of content and number of requests sent over the wire are minimized, users can interact with your site more quickly.

**Delivery optimization**

_Delivery optimizations_ involve serving files from a content delivery network (CDN) -- whether you’re compiling to files or caching -- rather than letting each request hit your app server and database.

CDNs are globally available, so they’ll be closer to your customer than your systems, which reduces [round-trip time](https://en.wikipedia.org/wiki/Round-trip_delay_time) (RTT). Serving files means that users get content immediately without requests waiting in queues or requiring database queries.

**You may need to do both**

Payload optimization and delivery optimization are complementary approaches. That’s both good news -- you _can_ do both -- and bad news -- you often _need_ to do both.

For example, if you use a CDN to serve 3MB JavaScript bundles, your site is still going to be slow, especially on medium- and low-end mobile devices.

![](/v1563017771/jamstatic/network-requests-adobe-com.png) Part of a network request waterfall chart for a typical enterprise website (<a href="[https://www.adobe.com](https://www.adobe.com "https://www.adobe.com")">adobe.com</a>). The full waterfall chart is three times longer.

Performance is an _emergent characteristic_ of a system. It requires getting a lot little things right and is easy to mess up. That's _why_ fast websites are similar, but slow websites are slow in different ways.

### L'optimisation de la performance est difficile et coûteuse

The challenge for digital agencies and enterprises is that both payload and delivery optimizations can require significant developer time to implement.

**Delivery optimization**

For delivery optimization, one approach is to use a JAMStack solution like Hugo or Gatsby, which compile your site to static files that can be served from a global CDN, rather than scaling app servers and databases. This approach, when used for initial site construction, requires little developer time in return for large performance gains.

Caching a traditional CMS website is another possibility -- though this often creates bugs (what if an item goes out of stock?), as well as confusion around the content go-live process.

**Payload optimization**

But if delivery optimization is _hard_, payload optimization can be _near impossible_ to deliver within time and budget for many agencies and enterprises.

Comprehensive checklists [weigh in at around 40 items](https://www.smashingmagazine.com/2019/01/front-end-performance-checklist-2019-pdf-pages/), including points like route-based code splitting, HTTP/2 asset serving, background prefetching, lazy-loading non-critical assets, service workers, dead code elimination, and server-side rendering. Each of these points is technically feasible but quite rare.

Among the many implementation challenges are:

* **Time and budget**. Performance optimization happens at the end of projects, which means that even in the rare case time is allocated, it can be dropped in the rush to fix bugs and make up for inevitable schedule slippage.
* **Skill mismatches**. Performance optimization is not in the skillset of many frontend developers. Simple changes by non-performance-oriented developers can easily undo days or weeks of dedicated performance work without dedicated training or stringent code review.
* **Lack of executive visibility**. Regular site performance reporting is rare, and difficult to track over time.
* **Lack of developer visibility**. While systems like Bugsnag can tie errors to specific lines of code, performance visibility is much higher level, even with detailed tools like Google Lighthouse. For non-experts, it’s difficult to pinpoint performance regressions to specific code commits.

### La performance devrait être réglée au niveau du framework

Web performance is critical for retaining and engaging users, especially on mobile. If [every 100ms of latency costs 1% of sales](https://www.digitalrealty.com/blog/the-cost-of-latency/), reducing average page load times from 5 seconds to 1-2 seconds could generate 30-40% more sales.

But just because performance is the _right_ thing doesn’t make it the _easy_ thing. Implementing performance optimizations on a _per-site basis_ is often _difficult_ and _costly_.

To overcome these obstacles, high-performing website teams should look to a content mesh that bakes in performance on a _framework_ level.

One example is Gatsby, which includes [both delivery optimization and payload optimization out of the box](/features/#legend).

In the next and final post in this series, [Creating Compelling Experiences](/blog/2018-10-18-creating-compelling-content-experiences), we’ll explain how to implement a content mesh and get all the benefits of best-of-breed content systems, modern development frameworks, and high-performing websites.

![](/v1563017849/jamstatic/modern-website-performance.png)

Achieving modern website performance

## Créer des expériences de contenu fascinantes

In the last three sections, we’ve described the different facets of how to create modern, compelling content experiences. We’ve covered trends in [content management](/blog/2018-10-10-unbundling-of-the-cms), [web development](/blog/2018-10-11-rise-of-modern-web-development), and [website performance](/blog/2018-10-16-why-mobile-performance-is-crucial).

While these trends target different stakeholders, they’re deeply interrelated. That’s because to adopt a new architecture in one area, you often need to adopt new technologies in the other two.

With users after user writing headlines like "[Gatsby + Contentful + Netlify (and Algolia)](/blog/2017-12-06-gatsby-plus-contentful-plus-netlify/)" -- grouping a React-based website framework, a headless CMS, a static host + CDN, and a search provider -- it’s clear these these technologies are meant to be used together.

Website teams moving to this space have to plan four steps -- one for each category, plus integration.

### Vers le maillage de contenus

#### D'abord, choisir ses systèmes de contenu

In a modular CMS system, website teams can [use preferred workflows to choose your content systems](/blog/2018-10-10-unbundling-of-the-cms).

This allows content teams to replace their heavyweight CMS monolith with their choice of:

* A spreadsheet and text files (for extremely simple sites).
* Specialized systems tailored to their use case, such as Shopify + Salsify + Bazaarvoice for an e-commerce site.
* A headless cloud CMS with rich content modelling capabilities, such as Contentful.

#### Ensuite, choisir une bibliothèque pour développer une interface utilisateur

[React and Angular are both excellent, ubiquitous, modern choices](/blog/2018-10-11-rise-of-modern-web-development), with rich community ecosystems to address website-specific concerns like:

* SEO
* Routing
* Accessibility
* i18n

#### Puis, décider d'une stratégie pour la performance

There are two main approaches to performance -- [payload optimization and delivery optimization](/blog/2018-10-16-why-mobile-performance-is-crucial#how-performance-optimization-works).

Payload optimization involves performance-enhancing development practices. Delivery optimization means compiling websites to static files that can be served from a global CDN, rather than running servers and databases.

Often, to ensure a fast site, you'll need both.

To do delivery optimization, you'll need to pick a JAMStack site generator like Hugo or Gatsby.

To do payload optimization, your team will need to implement a [long performance checklist](https://www.smashingmagazine.com/2019/01/front-end-performance-checklist-2019-pdf-pages/), or pick a framework such as Gatsby that [performs payload optimization](/features/#legend) out of the box.

#### Enfin, établir son maillage de contenus

To truly engage users, you need a modern website -- a modular CMS architecture, modern development framework, and cutting-edge performance.

The challenge for website teams is: how to achieve this without a lot of costly, time-intensive custom integration work?

The answer: choose a content mesh. A content mesh:

* pulls in data from your headless CMS systems
* enables you to develop in your preferred UI library while providing website tooling
* automatically makes your site fast out of the box

![](/v1562939172/jamstatic/content-mesh.png)

The Content Mesh integrates <b>headless</b> content systems, modern development tools, and website performance

### Les alternatives au maillage de contenus

Website teams searching for a content mesh can consider:

* utilizing vendor integrations
* assorted JAMStack solutions
* Gatsby

While some solutions have _part_ of the puzzle, only Gatsby comes with out-of-the-box CMS integrations, a modern development framework, and cutting-edge performance.

**Content vendor integrations**

One option for website teams is to use existing vendor integrations to glue CMS systems together.

For example, a team could build a site with Shopify, using their Liquid Template engine, pull in product listing data from Salsify, and reviews from Bazaarvoice.

While this can solve the CMS integration problem, it locks the website in an idiosyncratic development environment without helping solve website performance.

**Un assortiment de solutions JAMStack**

Un autre option possible est de regarder ce qui est mis à disposition dans l'écosystème JAMstack, qui connaît une prolifération d'outils pour servir des sites rapides. La plupart de ces outils tendent à proposer _soit_ un environnement de développement moderne, _soit_ la connexion à des systèmes de contenus, mais rarement les deux.

Par exemple Nuxt.js et VuePress permettent aux équipes de générer des sites avec Vue, mais n'offrent pas de connexion native aux systèmes de gestion de contenu — de plus ils demandent que le contenu soit stocké sous forme de fichiers Markdown ou JSON dans le dépôt de code.

Des générateurs comme Jekyll ou Middleman permettent la connexion à seulement quelques CMS come DatoCMS et Contentful.

**Gatsby**

Gatsby est une des meilleures options pour le maillage de contenu et la création de site web rapides, le support de frameworks de développement moderne _et_ la connexion à des systèmes de gestion de contenu pour les entreprises. Gatsby propose :

* **Plus de 120 intégrations avec des services**, dont plus de 15 systèmes de gestion de contenu pour l'entreprise comme Wordpress, Drupal, Contentful, Contentstack, Salsify et Shopify, avec également la possibilité d'ajouter des sources additionnelles.
* **Un environnement de développement React**, ainsi que des plugins essentiels qui procurent des fonctionnalités clé comme l'optimisation pour les moteurs de recherche, l'accessibilité ou l'internationalisation.
* **Une performance ultra-rapide par défaut,** avec des optimisation de chargement et de publication.

## Conclusion

Il fut un temps où il était difficile de publier sur le web. Les CMS ont émergés et sont devenus l'application centrale pour le stockage des contenus et la création de sites.

Aujourd'hui, le CMS est entièrement  réimaginé.

La maturité entraîne plus de fonctionnalités et de complexité, et un passage des architectures monolithiques aux architectures modulaires.

Il y a maintenant une multitude d'acteurs, de frameworks et d'approches pour modeler des contenus, gérer l'authentification, la recherche, les données de suivi, les paiements, les environnements de développement, la performance, etc.

La question clé est alors : comment assembler ces différentes parties pour en faire un tout unifié ?

Hier, notre défi était de _créer des expériences numériques_.

Aujourd'hui, notre défi est de _rendre cette expérience incroyable_.