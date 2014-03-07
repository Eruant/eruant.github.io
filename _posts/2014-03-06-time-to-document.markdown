---
layout: post
title: "Time to document"
date: 2014-03-06 13:00:00
categories: blog
tags:
  - development
---

It's very easy to get carried away writing code without making any notes about it. Have you ever come back to code and gone "what did that do?". Creating documentation shouldn't be hard. We will take a look at [JSDuck][jsduck] a tool for generating documentation for you.

Writing good documentation can take a long time, and so lots of us don't bother. At the very least you should be adding comments to your code, so that you will understand it six months later. Even better would be to make some documentation, so that other developers can understand what should be happening.

Even if you don't plan on making documentation today, six months down the line you may have changed your mind. Do you want to go back and re-edit all of your code?

## Adding documentation to your code

There are many tools out there for compiling your documentation. The one I will be coving in this article is called [JSDuck][jsduck]. First things first we need some files to document. Here is an example class for a player call `Person.js`.

{% highlight javascript %}
var Person = function (name) {
  if(!name) {
    return;
  }

  this.name = name;
};

Person.prototype.sayHello = function () {
  return "Hi I'm " + this.name + "!";
};

Person.prototype.renamePerson = function (newName) {
  var oldName = this.name;
  this.name = newName;
  return oldName + " has changed their name to " + this.name;
};

module.exports = Person;
{% endhighlight %}

Currently this file will not produce very good documentation, so lets change that by adding some comments at the top of the file.

{% highlight javascript %}
/**
 * @class Person
 * A human being in code form.
 *
 * @author Matt Gale <matt@littleball.co.uk>
 *
 * Usage:
 *     var Person = require('./Person');
 *
 *     var bob = new Person('Bob');
 *     bob.sayHello(); // output -> "Hi I'm Bob!"
 *
 * @constructor
 * Creates a new Person instance
 * @param {String} name The name of the person
 */
var Person = function (name) {
  if(!name) {
    return;
  }

  this.name = name;
};
{% endhighlight %}

Now the first thing you will notice is that all the code is wrapped in a comment. This is important because you don't want to change the way the code executes.

Each command we want JSDuck to take note of starts with an `@` sign. The first one we have added is `@class`. It lets the documentation know what the class name is. It's strickly not needed, as JSDuck tries to work out as much of it as possible automatically. I like to add it to be 100% clear. I've also added some text to explain this module, and how to use it. To make things easier, the JSDuck lets you use markdown to edit your code.

The Author tag (`@author`) lets you know who created the file. This won't be added to the documentation, but it can be useful in case you want to get more information on why things are added the way that they have been.

This module has a constructor method so you can call `var bob = new Person("Bob");`. To mark this use the `@constructor` tag, followed by a description of what the constructor does.

The parameter tag is used for each variable sent into the method or constructor. I've added all the information onto one line, which uses the following format: `@param <type> <name> <description>`.

Adding a documentation to a method is very similar to the constructor. Let's look at how we would document the `sayHello` method.

{% highlight javascript %}
/**
 * @method sayHello
 * Returns a personal greeting from this person
 *
 * @return {String} Personal Greeting
 */
Person.prototype.sayHello = function () {
    return 'Hi I\'m ' + this.name + '!';
};
{% endhighlight %}

You'll notice a new option displayed here, which is the return value. It's format is similar to the parameters.

If you want JSDuck to ignore any parts of your code, you can let it know with the `@ignore` tag.

{% highlight javascript %}
/**
 * @ignore
 * Exporting the module (the class has already been documented above)
 */
module.exports = Person;
{% endhighlight %}

## Creating the documentation

So you've added comments to your files, now it's time to generate your documentation.

First things first you need to install JSDuck. If you have ruby on your machine you can install it with the following command.

{% highlight bash %}
[sudo] gem install jsduck
{% endhighlight %}

Once that is done, you can generate your documentation by sending in your source directory. I also specify the output directory with into a folder called docs.

{% highlight bash %}
jsduck src/js src/js --output docs
{% endhighlight %}

Now if you look in your docs folder, you should see lots of files. Open the `index.html` file in your browser to see the documentation.

I also like to name my documentation by adding the name option: `--title "My project"`.

## Guides

Sometimes documentation isn't enough; you need to let the developer know extra information. This is where guides comes in.

First of all we need a configuration file names `guides.json`. I've put it in my src directory.

{% highlight json %}
[
  {
    "title": "My project name",
    "items": [
      {
        "name": "getting_started",
        "url": "guides/getting_started",
        "title": "Getting started",
        "description": "Getting up to speed with the project"
      }
    ]
  }
]
{% endhighlight %}

It's a simple file, that gives the guide a name, and a number of items (guides). I've stored each guide in a folder called guides. Here is my folder structure.

{% highlight javascript %}
src/
  guides.json
  guides/
    getting_started/
    README.md
    icon.png
    some-image.png
  js/
    classes/
      Person.js
      Enemy.js
{% endhighlight %}

You will notice that each guide has it's own folder with a `README.md` file inside. I've also added an `icon.png` file.

The `README.md` file contains the actual guide, written with markdown. For information see the [official documentation][guidelines].

By default a guide has an image icon, but you can override this like I have by adding an `icon.png` file.

You can also add any other resource to this folder, such as images. Then link them with `{@img some-image.png Alt text}`

The last step is to run the build command with a `--guides` option.

{% highlight bash %}
jsduck src/js/ --title "My project" --guides src/guides.json --output docs
{% endhighlight %}

All of this may seem like a lot of work the first time you do it, but for me it's become part of the development process. The more you do it, the easier it becomes. In six months, you may be thankful for it.

[jsduck]:       https://github.com/senchalabs/jsduck
[guidelines]:   https://github.com/senchalabs/jsduck/wiki/Guides#wiki-formatting
