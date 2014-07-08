---
layout: post
title: "Extending Phaser Sprites"
date: 2014-07-08 12:00:00
categories: blog
description: "How to create a custom sprite for use within Phaser"
tags:
 - development
 - phaser
---

After building a few experiments and other simple games I came across a small issue with sprites. I would store an array of them, and inside this array store a reference to a sprite. It worked, but what I needed was a way of extending the sprite class.

It turns out that it is quite simple. All you need to do is create an object that has the same `prototype` as a `Phaser.Sprite`.

Start by creating you constructor as a regular function.

{% highlight javascript %}
var CustomSprite = function () {};
{% endhighlight %}

Next we need to set the prototype to inherit the `Phaser.Sprite` object.

{% highlight javascript %}
CustomSprite.prototype = Object.create(Phaser.Sprite.prototype);
CustomSprite.prototype.constructor = CustomSprite;
{% endhighlight %}

Finally we need to send our variables to the parent object. I have also added some extra options for setting the position and image texture.

{% highlight javascript %}
var CustomSprite = function (x, y, texture) {
  Phaser.Sprite.call(this, game, x, y, texture);
};
{% endhighlight %}

Currently our new sprite does exactly the same as the original sprite. Feel free to add custom options or functions. Below is an example using CommonJS.

{% highlight javascript %}
var game = require('./game');
var Phaser = require('phaser');

var Monster = function (x, y, texture) {
  Phaser.Sprite.call(this, game, x, y, texture);

  // add custom animations
  this.animations.add('stand', [0, 1], 20, true);
  this.animations.add('run', [2, 3, 4, 5], 20, true);
  this.animations.add('walk', [6, 7, 8, 9], 20, true);
  this.animations.play('stand');
};

Monster.prototype = Object.create(Phaser.Sprite.prototype);
Monster.prototype.constructor = Monster;

Monster.prototype = {

  customFunction: function () {
    // custom function code
  }

};

module.exports = Monster;
{% endhighlight %}

Now that you know how to extend your sprites, you can save lots of duplicated code. Just start with a monster class that has basic actions, and extend it for different mosters. Remember, if you need to share a function just add it to a sprite that the shared classes will inherit from.
