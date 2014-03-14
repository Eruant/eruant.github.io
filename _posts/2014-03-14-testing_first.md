---
layout: post
title: "Testing first"
date: 2014-03-14 21:20:00
categories: blog
tags:
 - developments
 - mocha
---

Take a look at another way of developing, test first - code later. Changing the way you think will mean that you plan out what you want to build better, and save time later on when you come to build it. It took me a while to get my head around this concept, but I don't think I will go back to my old ways anytime soon.

I will be taking a look at [mocha][mocha] and [should][should] to test the code and make sure it works as planned.

## Defining what we want to create

First of all we need to plan what we want to create. In this article I will be creating a car class. I will describe what it is I want to end up with.

- it should have an ID to distinguish it from other cars
- it should have a colour
- the colour should be red by default
- it should have a fuel tank
- the fuel tank should have a maximum level
- we should be able to get the current fuel level

I could extend the car class further, but for this example I think that will be enough to get out teeth sunk into.
The main reason why I have written this, is to work out what I want to create. I have planned what I want to do, and what the car class expects.

## Lets test this out

So the next stage is to build a test to see if the car acts the same way as we have planned it.

The first stage is to describe what we are testing, and let mocha find the files we need to test.

{% highlight javascript %}
describe('An instance of the Car class', function () {

  var should = require('should'),
    Car = require('./path/to/Car');

  // do some tests

});
{% endhighlight %}

This should be simple enough for you to read. It "describes" what we are trying to test. You should also see that I've included `should` and `Car`. The `Car` is the module we are testing, and `should` lets us describe the tests in a easy to read format.

Lets replace our comment with our first test.

{% highlight javascript %}
it('should throw an error if an ID is not set', function () {
  should(function () {
    return new Car();
  }).throw();
});
{% endhighlight %}

A test has a statement `it()`, which adds a description of what it should do. In this test anything inside the `should()` function is evaluated, and the result is passed on to the next link in the chain.

We are testing to see if an ID has been set `new Car("anID")`. We have missed it off, so we are expecting it to throw an error.

Next lets test to see what we would expect to happen if we did set an ID.

{% highlight javascript %}
it('should set the ID of the car', function () {
  var car = new Car('myCar');
  should(car.id).equal('myCar');
});
{% endhighlight %}

You may notice a pattern here. We set something up, and then test to see that it should match an answer we give it.

You can write lots of tests, that do different things. Here are just a few examples.

{% highlight javascript %}
should(6 + 4).equal(10);
(6 + 4).should.equal(10);
should({}).be.an.instanceOf(Object);
should(20).be.above(10);
should(20).not.be.above(40);
should(Object).exist();
{% endhighlight %}

Back to our `Car` class, we want to set a colour for the car. We might want to set this on the constructor, as well as having it's own method.

{% highlight javascript %}
it('should default to red', function () {
  var car = new Car('myCar');
  should(car.colour).equal('red');
});

it('should take a colour as an argument in the constructor', function () {
  var car = new Car('myCar', 'blue');
  should(car.colour).equal('blue');
});

it('should change the car colour with "setColour"', function () {
  var car = new Car('myCar');
  car.setColour('blue');
  should(car.colour).equal('blue');
});
{% endhighlight %}

Finally we should test the fuel tank.

{% highlight javascript %}
it('should have a fuel tank, which defaults to 100', function () {
  var car = new Car('myCar');
  should(car.tankSize).be.an.instanceOf(Number).and.equal(100);
});

it('should have a current level of fuel', function () {
  var car = new Car('myCar');
  should(car.fuel).be.an.instanceOf(Number);
});

it('should start with no fuel', function () {
  var car = new Car('myCar');
  should(car.fuel).equal(0);
});

it('should be able to be filled with fuel', function () {
  var car = new Car('myCar');
  car.fillFuelTank(50);
  should(car.fuel).equal(50);
});

it('should have no more fuel than the car can hold', function () {
  var car = new Car('myCar');
  car.fillFuelTank(150);
  should(car.fuel).not.be.above(car.tankSize);
});
{% endhighlight %}

Each test is designed to do one thing. The more tests you add, the more robust your code should be. However if you spend all of your time writing tests, you will end up wasting your time. I can't give you a magic fix for how many tests you should write. You should at least test the methods that will be available outside of this module.

## Running the tests

Okay, so a test is quite useless without something to run it with, so lets set up our test suit. Make sure that you have a simple `package.json` file.

{% highlight javascript %}
{
  "name": "test-example"
}
{% endhighlight %}

Then we need to install our dependencies:

{% highlight bash %}
npm install --save-dev mocha should
{% endhighlight %}

Last of all we need to add a test call to run mocha:

{% highlight json %}
{
  "name": "test-example",
  "devDependencies": {
    "mocha": "~1.18.0",
    "should": "~3.1.3"
  },
  "scripts": {
    "test": "node ./node_modules/.bin/mocha --reporter spec"
  }
}
{% endhighlight %}

And finally run the test

{% highlight bash %}
npm test
{% endhighlight %}

If all has gone well, you should see an output like this.

    An instance of the Car class
      1) should throw an error if an ID is not set
      2) should set the ID of the car
      3) should default to red
      4) should take a colour as an argument in the constructor
      5) should change the car colour with "setColour"
      6) should have a fuel tank, which defaults to 100
      7) should have a current level of fuel
      8) should start with no fuel
      9) should be able to be filled with fuel
      10) should have no more fuel than the car can hold


    0 passing (6ms)
    10 failing

    1) An instance of the Car class should throw an error if an ID is not set:
       AssertionError: expected [Function] to throw exception

    ...

The list of errors goes on. Let me reassure you that the errors are a good thing. We know what we need to do to fix them, so lets get coding. The first test failed because we didn't throw an error.

{% highlight javascript %}
function Car(id) {
  if (!id) {
    throw new Error('Car: An ID must be set');
  }
}
{% endhighlight %}

Try the test again, and you should see that the test now passes 1, and fails the other 9. So lets continue. The next test was seeing if an `id` has been set.

{% highlight javascript %}
function Car(id) {
  if (!id) {
    throw new Error('Car: An ID must be set');
  }

  this.id = id;
}
{% endhighlight %}

Now we have passed 2 and failed 8, so we must continue on. I will fix the next two tests, by adding a default to red, and also being able to send in a new colour.

{% highlight javascript %}
function Car(id, colour) {
  if (!id) {
    throw new Error('Car: An ID must be set');
  }

  this.id = id;
  this.colour = colour || 'red';
}
{% endhighlight %}

Now it's asking for a function to change the colour

{% highlight javascript %}
Car.prototype.setColour = function (colour) {
  this.colour = colour;
};
{% endhighlight %}

As you can see, building the code is now simple. All I should need to do is get all the tests to pass. I will leave that as an exercise for you to do. You may also notice other issues that you did not think about while you wrote your tests. For example, I realise that I did not test for calling the `setColour` function without an argument. That could come back to haunt me later. We should go back and add a test just to be safe.

## Finishing touches

Now that you should know how to build your tests, you can add a badge to your site letting people know of the build status. This can be done through a service called [Travis][travis]. You will sign up for an account and let it get access to your code. We can then add a `.travis.yml` file to the root of our repository, and let Travis run our tests.

{% highlight yaml %}
language: node_js
node_js:
  - "0.11"
{% endhighlight %}

Travis will then call `npm test` and see if the build passes or fails. It will then give you a badge to put on your site. Like this one:

[![Build Status](https://travis-ci.org/Eruant/ludum-dare-29-warm-up.png?branch=master)](https://travis-ci.org/Eruant/ludum-dare-29-warm-up)

If your build fails for any reason it will update automatically, and so alert you to any issues that might have occurred.

[mocha]:  http://visionmedia.github.io/mocha/
[should]: https://github.com/visionmedia/should.js/
[travis]: https://travis-ci.org
