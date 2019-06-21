---
title: Implémenter un headless CMS en 3 jours
description: Retour sur l'implémentation de Netlify CMS sur un Jekyll
categories: []
source:
  author: Frank
  title: How We Implemented a headless CMS in 3 Days
  url: 'https://www.dwolla.com/updates/implementing-netlify-cms/'
images: []
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

## Should you move from GitHub Pages to Netlify Hosting?

This was the first choice we needed to make. Switching seemed like it would add additional time and complexity to our project, and thus initially our decision was "no." Using Netlify CMS with your existing hosting provider is a perfectly valid choice.

So why did we change our mind and move to Netlify hosting? The answer is that we found two features very compelling: [Git Gateway](https://www.netlify.com/docs/git-gateway/) and [branch deploys](https://www.netlify.com/docs/continuous-deployment/#branches-deploys).

Git Gateway works as an intermediary between the CMS and your Git repository. In concrete terms, this means you can do things like have your users log into the CMS admin with Google instead of requiring them to each have a GitHub account. Netlify then makes commits on your behalf using a GitHub account that granted access to a repo via OAuth. Although the Git Gateway is [open source](https://github.com/netlify/git-gateway) software as well, it was clear that learning to host that ourselves was going to involve a considerable learning curve.

Branch deploys give you the ability to have more than one version of your site live at a time. In comparison, GitHub Pages has a serious limitation in that only a single branch (usually master or gh-pages) can be deployed. This may not sound particularly exciting, but it enables a wonderful feature that we'll get back to in a bit.

### Migrating from GitHub Pages to Netlify

In general, publishing your site from Netlify is as easy as creating a Netlify account, signing in to your Git provider (GitHub, GitLab or Bitbucket) and selecting a repo. As soon as you provide a build command, Netlify can start deploying your site. Tasks like setting up SSL are explained by the [Netlify Docs](https://www.netlify.com/docs/) so we won't cover that here.

If you were using the built-in Jekyll gems and build process that GitHub provided, you'll need a few additional things to get the build working. You'll need a Gemfile for your dependencies, and it's also a good idea to check your build command into source control as well:

Gemfile

```
source "https://rubygems.org"
gem 'github-pages'
```

netlify.toml

```
[build]
publish = "_site/"
command = "jekyll build"
```

Once you're satisfied that everything looks good and is deploying correctly from Netlify, you can proceed to claim your domain name on Netlify and migrate DNS over to Netlify's name servers. After your DNS is fully cut over, you can safely turn off the GitHub Pages site from your repo.## Adding Netlify CMS to an Existing Site

Netlify CMS itself consists of a [Single Page Application](https://en.wikipedia.org/wiki/Single-page_application) built with [React](https://reactjs.org/) that lives in an admin folder on your site. For Jekyll, it goes right at the root of your project. It will contain two files:

```
admin
├ index.html
└ config.yml
```

The [Netlify CMS Docs](https://www.netlifycms.org/docs/add-to-your-site/) explain this better than we can:

> The first file, `admin/index.html`, is the entry point for the Netlify CMS admin interface. This means that users navigate to `yoursite.com/admin/` to access it. On the code side, it's a basic HTML starter page that loads the Netlify CMS JavaScript file. In this example, we pull the file from a public CDN:

admin/index.html

```
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>

  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <!-- Include the script that builds the page and powers Netlify CMS -->
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
</body>
</html>
```

> The second file, `admin/config.yml`, is the heart of your Netlify CMS installation, and a bit more complex. The [Configuration](https://www.netlifycms.org/docs/add-to-your-site/#configuration) section covers the details.

To start with, the config file might look something like this:

admin/config.yml

```
backend:
  name: git-gateway
  branch: master
  identity_url: "https://yoursite.com/.netlify/identity"
  gateway_url: "https://yoursite.com/.netlify/git"
  squash_merges: true

publish_mode: editorial_workflow
media_folder: "assets/img/uploads"

site_url: https://yoursite.com
logo_url: https://yoursite.com/assets/img/logo.svg

collections:
```

The `backend` section covers the basics like which branch to update and sets up the Git Gateway connection that we talked about earlier. The `publish_mode` property sets up our workflow to use the [editorial](https://www.netlifycms.org/docs/add-to-your-site/#editorial-workflow) mode. In short, this means that we have the ability to save page drafts as pull requests in Git before we decide to publish them. Combined with the branch deploys feature of Netlify, this is going to give us live previews of unpublished content from a static site generator!

_Note: as of June 2019, the editorial workflow is only supported when you use GitHub as a provider_

Now we just need to drop in the Netlify Identity Widget on the main site. This is needed because after a user logs in they'll be redirected to the homepage of the site. We need to redirect them back to the CMS admin, so add the following script before the closing body tag:

```
<script>
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
</script>
```

With this in place, and the appropriate authentication and Git Gateway configuration on netlify.com, you should be able to log into the Netlify CMS admin for your site at [https://yourdomain.com/admin](https://yourdomain.com/admin "https\://yourdomain.com/admin").
