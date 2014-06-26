---
layout: post
title: "Extending Phaser Sprites"
date: 2014-06-26 18:00:00
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
};

Monster.prototype = Object.create(Phaser.Sprite.prototype);
Monster.prototype.constructor = Monster;

module.exports = Monster;
{% endhighlight %}
