---
layout: post
title: "Testing first"
date: 2014-03-11 18:00:00
categories: blog
tags:
 - developments
 - mocha
---

Take a look at another way of developing, test first - code later. Changing the way you think will mean that you plan out what you want to build better, and save time later on when you come to build it. It took me a while to get my head around this concept, but I don't think I will go back to my old ways anytime soon.

I will be taking a look at [mocha][mocha] to test the code and make sure it works as planned.

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
    var car = new Car();
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

Next we want to set a colour for the car. We might want to set this on the constructor, as well as having it's own method.

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

[mocha]:  http://visionmedia.github.io/mocha/
[should]: https://github.com/visionmedia/should.js/
