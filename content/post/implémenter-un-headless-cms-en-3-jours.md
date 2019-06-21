---
title: Implémenter un headless CMS en 3 jours
date: 2019-06-21T12:34:38+02:00
lastmod: 
description: Retour sur l'implémentation de Netlify CMS sur un Jekyll
author: Frank Taillandier
categories: []
images:
- "/assets/images///"
source:
  author: ''
  title: How We Implemented a headless CMS in 3 Days
  url: https://www.dwolla.com/updates/implementing-netlify-cms/
  lang: ''
commments: false
aliases: []
canonical_url: ''
keywords: []
draft: true

---
![](https://cdn.dwolla.com/com/prod/20190522141939/netlify-cms-blog-opengraph-image-02.png)

Let's say you're building the next great startup or putting together a
spectacular event---the first question anybody asks you is "What's the
website?"

A beautiful and usable online presence is simply table stakes in 2019
for businesses, nonprofits or even prospective employees---and it was no
different for [Monetery](https://monetery.com/), the inclusive tech
summit Dwolla puts on each spring. We needed to get a great site up and
running fast, so we initially landed on a reliable and proven solution
that we've used before: [GitHub Pages](https://pages.github.com/).

This worked well early on as we launched the Monetery homepage, but it
became clear that we needed a more complete solution. Because of our
robust controls process, engineering was quickly becoming a roadblock.
We needed to do a better job of enabling our content editors to move
fast and make necessary changes quickly.

So we took a look at our options:

1. Implement a traditional Content Management System (CMS) like
   WordPress
2. Find a Headless CMS to integrate into a Static Site Generator (SSG)

The landscape of potential products for both of these options is
monumental. We were familiar with traditional options, so we scoured
[headlesscms.org](https://headlesscms.org/) and [staticgen.com](https://www.staticgen.com) to see what else was out there. Dwolla affords its engineering staff with dedicated time for professional development each week, which gave us an opportunity to test drive potential solutions.

One of the most interesting solutions we tried came from a company
called [Netlify](https://www.netlify.com/), and their project [Netlify
CMS](https://www.netlifycms.org/).

We thought Netlify CMS might benefit us for the following reasons:

* It's built for use with Static Site Generators so we get to keep the
  speed, security and scalability benefits that drew us to SSGs in the
  first place
* It's SSG agnostic, so it would work with our existing
  [Jekyll](https://jekyllrb.com/) site but not prevent us from
  changing our mind down the road (hi there,
  [GatsbyJS](https://www.gatsbyjs.org/)!)
* There is no database backend since content changes are stored as Git
  commits -- which makes [InfoSec](https://www.dwolla.com/security/)
  folks happy!
* It provides a simple and usable editor experience
* It's open source, so there is no vendor lock-in, and we can
  contribute features that are important to us back to the community

With buy-in from our stakeholders, we decided to move forward. We'll
talk about the decisions we had to make and show you how to integrate
Netlify CMS with Jekyll on your own site.