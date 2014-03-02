---
layout: post
date: 2014-03-02 16:32:00
categories: blog
---

It's very easy to get carried away writing code without making any notes about it. Have you ever come back to code and gone "what did that do?".

At the very least you should be adding comments to your code, so that you will understand it six months later. Even better would be to make some documentation, so that other developers can understand what should be happening.

Writing good documentation can take a long time, and so lots of us don't bother. Getting that documentation generated for you is a good solution, so in this article I will introduce you to auto-generated documentation.

## Tools

There are many tools out there for compiling your documentation. The one I will be coving in this article is called [JSDuck][jsduck]. First things first we need some files to document; I'm going to use my [Phaser boilerplate][boilerplate]. Here is the first file:

{% highlight javascript %}
/*globals require*/

var Phaser = require('phaser/phaser'),
    boot = require('./scenes/boot.js'),
    preloader = require('./scenes/preloader'),
    mainMenu = require('./scenes/mainMenu'),
    level1 = require('./scenes/level1');

var game = new Phaser.Game(480, 320, Phaser.AUTO, 'content', null);

game.state.add('boot', boot, false);
game.state.add('preloader', preloader, false);
game.state.add('mainMenu', mainMenu, false);
game.state.add('level1', level1, false);

game.state.start('boot');
{% endhighlight %}

Currently this file will not produce very good documentation, so lets change that by adding some comments at the top of the file.

{% highlight javascript %}
{% endhighlight %}

## Creating your documents

Once you have your comments in place, you can now create your documents. You just need to call the command with your file directory `src/js` and an output directory `--output docs`.

{% highlight shell %}
jsduck src/js/ --output docs
{% endhighlight %}

## Let me Guide you

[jsduck]:       https://github.com/senchalabs/jsduck
[boilerplate]:  https://github.com/Eruant/phaser-boilerplate
