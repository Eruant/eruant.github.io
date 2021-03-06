---
layout: post
title: "Working with slush"
date: 2014-05-25 14:20:00
categories: blog
description: "Introducing the Phaser Template"
tags:
  - development
  - phaser
  - slush
---

A little while ago a wrote a post about [Phaser][phaser], a JavaScript game framework. Since then been working on ways to improve my boilerplate. My current solution is [slush][slush], a [gulp][gulp] based framework generator.

In my day job we were looking into different code generators. The main ones we looked at were for grunt, but my personal preference is to user gulp. Slush uses the basis of gulp to generate your projects from templates. It's very easy to pick up because a `slushfile` is identical to a `gulpfile`.

Today I'm putting what I've learn out there for everyone to benefit from. I've taken my boilerplate code and transfered it for use as a template.

If this is the first time using it, you'll need to download it and set it as a global npm repository.

{% highlight bash %}
npm install -g slush-phaser-node
{% endhighlight %}

Once installed you can create your Phaser games by creating a new folder, run the slush template script and run gulp.

{% highlight bash %}
$ cd /path/to/your/directory
$ mkdir myNewGame
$ cd myNewGame
$ slush phaser-node
{% endhighlight %}

Now there is already a Phaser template for slush, but I like to organise my code with node like modules. My template uses [browserify][browserify] to produce CommonJS like files. The other major difference is that I use [BrowserSync][browsersync] to server the files. This gives you the benefit of being able to easily test your files over your local Wi-Fi network.

I still have a few ideas up my selves for features to add to the template, so it should continue to improve over time.

Here is the [source files][template] for my template, and the [npm package][npm]. I can't wait to see what you make!

[phaser]:       http://phaser.io/
[slush]:        https://github.com/slushjs/slush
[gulp]:         http://gulpjs.com/
[template]:     https://github.com/Eruant/slush-phaser-node
[browserify]:   http://browserify.org/
[browsersync]:  http://www.browsersync.io/
[npm]:          https://www.npmjs.org/package/slush-phaser-node
