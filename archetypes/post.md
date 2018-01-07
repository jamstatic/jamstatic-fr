---
title: "{{ replace .TranslationBaseName "-" " " | humanize }}"
date: {{ .Date }}
lastmod:
draft: true
description: ""
author:
categories:
  -
images:
  - /assets/images/{{ dateFormat "2006" .Date }}/{{ dateFormat "01" .Date }}/
source:
  author: ""
  title: ""
  url: ""
---
