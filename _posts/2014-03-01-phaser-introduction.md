---
layout: post
title: "Phaser Introduction"
date: 2014-03-01 11:45:00
categories: blog
description: "An introduction to the Phaser framework"
tags:
  - development
  - phaser
---

I've always been interested in building games, and I've made a few quick ones for [Ludum Dare][ludum]. Previously I've made them using raw JavaScript, without any libraries. I've learn alot doing it this way, but it's time to get a helping hand. I'm trying out a game engine called [Phaser][phaser].

There are lots of tutorials out there, and they are great for learning the basics. One thing I've noticed is that while they are great for demonstrating the simple games; for production games you may want to organise your code a little better.

In this article I will look at creating a boilerplate set of code that you can use as a starting point for building your games. I've put the files up on [Github][boilerplate], so that you can always fork the code and start creating your own games. I will update the boilerplate code as I develope new games, and find better solutions.

If you're not familiar with Gulp, check out my [previous post][gulpPost].

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
  boot = require('./scenes/boot.js'),
  preload = require('./scenes/preload.js'),
  mainMenu = require('./scenes/mainMenu.js'),
  level = require('./scenes/level.js');
{% endhighlight %}

This is trying to load our modules: `Phaser` from our `node_modules` and `boot`, `preload`, `mainMenu` and `level` from our own JavaScript folder.

This is where I ran into my fist issue, Phaser isn't a node module. I found a great package called [napa][napa], which allows you to use any repository as a node module. To install it simpley run the command

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
game.state.add('preload', preload, false);
game.state.add('mainMenu', mainMenu, false);
game.state.add('level', level, false);

game.state.start('boot');
{% endhighlight %}

We create a new Phaser game that is 480 pixels wide and 320 pixels high. Phaser will create a canvas that uses WebGL if possible, otherwise it falls back to the 2D context.

The next four lines we add our scenes modules.

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

The three main functions Phaser looks for are `preload`, `create` and `update`. They are optional, so you won't see them in every scene. For example only the boot and preloader scenes in my example will need the `preload` function, because after that we should have already loaded all the resources we need.

Now we have most of the setup code in place lets look at some of the scenes in detail.

## Booting the game

Let's take a closer look at the `boot.js` file.

{% highlight javascript %}
module.exports = {
  preload: function () {
    this.load.image('loadingBar', 'assets/loadingBar.png');
  },
  create: function () {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;
    this.game.state.start('preloader', true, false);
  }
};
{% endhighlight %}

The whole file is quite simple, with two functions. The `preload` function is nice a simple, it just loads our loading bar. Remember we want the preloader to show as quickly as possible, so don't load all your assets here.

The `create` funtion has three commands. The first sets how many pointers (mouse or fingers) to look out for. I like to set this as low as possible so that the code has to do less work. The next command will pause the game if you are not looking at it. You may click on another tab, or mimify the browser window. Finally we set the next scene to begin.

## Loading our assets

The scene we told our code to go to is `preload.js`. Lets take a look at what functions we will need.

{% highlight javascript %}
var Phaser = require('phaser/phaser');
module.exports = {
  preload: function () {
    // ...
  },
  create: function () {
    // ...
  },
  startMainMenu: function () {
    // ...
  }
};
{% endhighlight %}

The first function is where we will show our loading bar, and load in the rest of the assets. The following code will goes inside our `preload` function.

{% highlight javascript %}
this.loadingBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loadingBar');
this.loadingBar.anchor.setTo(0.5, 0.5);
this.load.setPreloadSprite(this.loadingBar);

// all of the assets we want to load for the game
this.game.load.image('menuBackground', 'assets/menuBackground.png');
this.game.load.spritesheet('gameSprites', 'assets/gameSprites.png');
{% endhighlight %}

First we set `this.loadingBar` as a sprite. Aligning it to the center of the screen. Initially the sprites top left corner will sit in the middle of the screen, which is not what we what. We can change it's anchor point to be set to the center. The figures are a percentage so that `0` is the far left, and `1` is the far right (or top to bottom). Once we have set the anchor, we then tell Phaser to use this as a preloader. It will do its magic and we will see a loading bar fill up from our static image.

Next we list out all of the other assets we wish to load in the game. You will probably keep coming back to this file to add new resources as your game expands.

Inside the `create` function we will add the following:

{% highlight javascript %}
var tween = this.add.tween(this.loadingBar)
  .to({
    alpha: 0
  }, 1000, Phaser.Easing.Linear.None, true);
tween.onComplete.add(this.startMainMenu, this);
{% endhighlight %}

Once we get to the `create` function, all of our assets have loaded. We could have gone straight to our next scene, but to add some style lets make the loading bar animate out. To do this we have added a tween that changes the alpha (visibility) to 0 over 1 second (1000 ms).

We then listen for the animation to complete, and when it does call the function `startMainMenu`.

The `startMainMenu` function is the simplest of them all. In fact we have already seen the code from the previous scene.

{% highlight javascript %}
this.game.state.start('mainMenu', true, false);
{% endhighlight %}

That's the preloader complete.

## The main menu

The main menu shows lots of code we have already seen. Adding sprites, tweens and listening for animations to complete.

{% highlight javascript %}
module.exports = {
  create: function () {
    var tween, style;

    this.background = this.add.sprite(0, 0, 'menuBackground');
    this.background.alpha = 0;

    style = {
      font: '30px Arial',
      fill: '#333'
    };
    this.labelTitle = this.game.add.text(20, 20, "Tap to start", style);
    this.labelTitle.alpha = 0;

    tween = this.add.tween(this.background)
      .to({
        alpha: 1
      }, 1000, Phaser.Easing.Linear.None, true);
    this.add.tween(this.labelTitle)
      .to({
        alpha: 1
      }, 1000, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(this.addPointerEvents, this);
  },
  addPointerEvents: function () {
    this.input.onDown.addOnce(this.startGame, this);
  },
  startGame: function () {
    this.game.state.start('level', true, false);
  }
};
{% endhighlight %}

The two new parts of this code that we havent' yet covered are the text and the click / tap events.

Text is very much like adding an image, except that we have to give it a style. In this case I've added it as a variable within the function, but if you are going to use it within other scenes, it may be best to add it as another module, so that you can share the code.

The click events are very simple and are added in the `addPointerEvents` function. The function is similar to the `onComplete` listener.

The code for the main menu is very simple, but here are a few ways in which you could expand it:

- add a logo sprite that animates in from the top
- add some background music
- add multiple options

## and finally...

The last file I will leave to you. This after all is just a boilerplate. You should have your game all set up and ready to go. Just remember you will only need to add the `create` function, and from there you can add as many other functions as your need.

Probably the best place to go now is the [Phaser examples][examples] page. There are a ton of simple examples that will help you, as well as a few games too. Now go and take over the world!

[ludum]:        http://www.ludumdare.com/compo/author/littleball/
[phaser]:       http://phaser.io/
[boilerplate]:  https://github.com/Eruant/phaser-boilerplate
[gulpPost]:     /blog/2014/02/24/gulp-introduction/
[browserify]:   http://browserify.org/
[gulp]:         http://gulpjs.com/
[napa]:         https://github.com/shama/napa
[bowerPhaser]:  https://github.com/nDmitry/bower-phaser
[examples]:     http://examples.phaser.io/
