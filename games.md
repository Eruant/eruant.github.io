---
layout: default
title: Games
---

# Games

Here are just a few of the games I've created. All of them are on github, so you can see the source code if you want to learn something.

<div class="posts">
  {% for post in site.tags.games %}
    <div class="post">
      <h2>
        <a href="{{ post.url }}">{{ post.title }}</a>
        <span>{{ post.date | date_to_string }}</span>
      </h2>
      {{ post.excerpt }}
    </div>
  {% endfor %}
</div>

## Experiments

<div class="posts">
  {% for post in site.tags.experiments %}
    <div class="post">
      <h2>
        <a href="{{ post.url }}">{{ post.title }}</a>
        <span>{{ post.date | date_to_string }}</span>
      </h2>
      {{ post.excerpt }}
    </div>
  {% endfor %}
</div>
