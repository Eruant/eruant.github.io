---
layout: post
title: "Gulp introduction"
date: 2014-02-24 13:00:00
categories: blog
---

[Gulp][gulp] is a task running, that is useful for automating development tasks. In this article I will cover an introduction to using it, and why.

## Grunt vs Gulp

Both [Grunt][grunt] and [Gulp][gulp] are task runners build in [node][node]. Both are well supported, and have a large number of plugins.

Grunt pros:

- largest number of plugins

Gulp pros:

- very quick
- set up is done via a script

There isnt' much to separate the two, but for me Gulp wins hands down. Why, well although Grunt has more plugins, the development comminity have already translated the majority of plugins, and they have even created one that will also run Grunt tasks.

The speed at which Gulp runs means that you spend less time waiting for your site to be updated. Great for those little changes that you want to see instantly.

The main advantage for me is the ability to use a scrpit to configure it. You can set it up the way you want it set up

- add custom logs
- split the commands into multiple files
- re-use code (DRY)

## Installation

Installation is really simple, as long as you have [node][node] installed.

    npm install -g gulp

## Setup

Gulp setup can change from project to project, but the folling set up should cover the basics

### New projects

Add a file called `package.json` with a field for `devDependencies`.

    {
      "name": "my-new-project",
      "version": "0.0.1",
      "devDependencies": {
      }
    }

To add gulp or any gulp plugins just run the following command.

    npm install --save-dev gulp

Using the tag `--save-dev` will add this dependency to the package file, so that other developers can set up their copys of the repository the same as you.

### Existing projects

It should be quick and easy setting up a new project, just run the following command:

    npm install

## Gulpfile.js

Each project is controlled by a file named `gulpfile.js`. Here is a really simple file.

{% highlight javascript %}
var gulp = require('gulp');

gulp.taks('default', function () {
  console.log('Running the default command');
});
{% endhighlight %}

Once you've added the file running `gulp` will run this file. If you send in a command, it will look for it and run it. Otherwise it will look for a `default` task and run that. In the case above you would see "Running the default command" appear in the command line.

## Plugins

This is where the main power of Gulp lies. Here are the plugins I've found most useful

- [`gulp-compass`][gCompass] - converts `.scss` files to `.css` files
- [`gulp-concat`][gConcat] - copies multiple files into a single file
- [`gulp-imagemin`][gImagemin] - compresses images (make sure they get copied to another folder, so that you can keep originals)
- [`gulp-jshint`][gJshint] - alerts you to errors in your code
- [`gulp-minify-html`][gMinifyhtml] - compresses your markup and removes comments
- [`gulp-uglify`][gUglify] - compresses JavaScript

Other plugins that I like

- [`gulp-git`][gGit] - auto run `git` commands, such as branching and merging or pushing to server
- [`gulp-browserify`][gBrowserify] - write your JavaScript with CommonJS module format
- [`gulp-bump`][gBump] - updates the version number in the package file (useful with the git push)
- [`gulp-jasmine`][gJasmine] - run tests on your JavaScript

[grunt]:        http://gruntjs.com/
[gulp]:         http://gulpjs.com/
[node]:         http://nodejs.org/
[gCompass]:     https://github.com/appleboy/gulp-compass
[gConcat]:      https://github.com/wearefractal/gulp-concat
[gImagemin]:    https://github.com/sindresorhus/gulp-imagemin
[gJshint]:      https://github.com/wearefractal/gulp-jshint
[gMinifyhtml]:  https://github.com/jonathanepollack/gulp-minify-html
[gUglify]:      https://github.com/terinjokes/gulp-uglify
[gGit]:         https://github.com/stevelacy/gulp-git
[gBrowserify]:  https://github.com/deepak1556/gulp-browserify
[gBump]:        https://github.com/stevelacy/gulp-bump
[gJasmine]:     https://github.com/sindresorhus/gulp-jasmine

