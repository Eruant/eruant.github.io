---
layout: post
title: "Phaser Introduction"
date: 2014-02-26 13:00:00
categories: blog
---

I've always been interested in building games, and I've made a few quick ones for [Ludum Dare][ludum]. Previously I've made them using raw JavaScript, without any libraries. I've learn alot doing it this way, but it's time to get a helping hand. I'm trying out a game engine called [Phaser][phaser].

There are lots of tutorials out there, and they are great for learning the basics. One thing I've noticed is that while they are great for demonstrating the simple games; for production games you may want to organise your code a little better.

## Get set up

To organise my code I'm using [browserify][browserify] to split my code into modules. I've mentioned in a previous post that I'm using [gulp][gulp] to manage tasks like compiling my code, so here is how I've set that up

{% highlight javascript %}
gulp.task('script-compile', function () {
  return gulp.src('src/js/base.js')
    .pipe(browserify({
      debug: true
    })
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('bin/js'));
});
{% endhighlight%}

This code takes my `base.js` file, looks for any dependencies and adds them. Renames the file to `bundle.js` and saves it to my output folder.

Inside the `base.js` file we can load in the modules we require.

{% highlight javascript %}
var Phaser = require('phaser/phaser'),
  boot = require('./scenes/boot.js');
{% endhighlight %}

This is trying to load two modules. `Phaser` from our `node_modules` and `boot` from our own JavaScript folder. This is where I ran into my fist issue, Phaser isn't a node module. I found a great module called [napa][napa], which allows you to use any repository as a node module. To install it simpley run the command

{% highlight bash %}
npm install --save-dev napa
{% endhighlight %}

Then update your `package.json` to configure what scripts to run

{% highlight json %}
{
  "scripts": {
    "install": "napa"
  },
  "napa": {
    "phaser": "nDmitry/bower-phaser"
  }
}
{% endhighlight %}

This then adds and repositories in the `napa` object to your node modules folder. So that you can install them with `npm install`. You'll notice I found a [repository][bowerPhaser] with a node friendly copy of Phaser.

## Starting the game

Back to the `base.js` file we can now kick off our [Phaser Game][phaser]

{% highlight javascript %}
var game = new Phaser.Game(480, 320, Phaser.AUTO, '', null);
game.state.add('boot', boot, false);
game.state.start('boot');
{% endhighlight %}

We create a new Phaser game that is 480 pixels wide and 320 pixels high. Phaser will create a canvas that uses WebGL if possible, otherwise it falls back to the 2D context.

In the second line we add a scene called boot, which is loaded as a node module.

The last line sets Phaser to start the boot scene.

## Setting the scene

Scenes are a great way of splitting up code into different views. I like to work with the following scenes

- boot
- preload
- mainMenu
- level

I use boot to load any files for the pre-loader (as little as possible, so that the user doesn't see a black screen for ages). It also useful for setting things like how many pointers (mouse or fingers) to detect, pausing the game if it looses focus or scaling the canvas.

The preload scene shows a loading bar while the user waits for all of the assets to load. You should keep the number of assets down, so that this page isn't seen for long.

The main menu is the first place where users can interact with the game. It can be as simple as 'click anywhere to start'.

The last on the list is the level scene. I'm still working on the naming of this file as it could be called game, level1, mainGame, newGame etc. It's where the core of your game sits.

## Inside a scene

Let's take a look inside an example scene

{% highlight javascript %}
module.exports = {
  preload: function () {
    // load things
  },
  create: function () {
    // initiate things
  },
  update: function () {
    // animate things
  }
};
{% endhighlight %}

The three main functions Phaser looks for are `preload`, `create` and `update`. They are optional, so you won't see them in every scene.

[ludum]:        http://www.ludumdare.com/compo/author/littleball/
[phaser]:       http://phaser.io/
[browserify]:   http://browserify.org/
[gulp]:         http://gulpjs.com/
[napa]:         https://github.com/shama/napa
[bowerPhaser]:  https://github.com/nDmitry/bower-phaser
