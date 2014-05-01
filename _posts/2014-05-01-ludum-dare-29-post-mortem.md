---
layout: post
title: "Ludum Dare 29 Post Mortem"
date: 2014-05-01 20:00:00
categories: blog
tags:
  - ludum dare
---

What a weekend! [Ludum Dare][ludum] is always full on, but I never seem to remember it weeks down the line. My [entry][entry] went quite well, but I bit off slightly more than I could chew. I build an underwater platformer called "Aqua", based on the theme "Beneath the surface".

## What went well

I finished a playable game. I always like to have a finished game, it annoys me when you get half way through something good and it just stops.

[Phaser][phaser] definitely helped speed up my game development, as it took care of the physics and collision detection. Previously I had written everything from scratch. Writing it from scratch had taught me a lot, but now that I have the knowledge I don't feel like I have to do it any time soon.

[Browserify][browserify] also made it simple to separate out my code into modules. So I'm glad I spent time learning about it before the competition.

Testing my code was also easy using [browser-sync][sync]. I could load the game on a local server and access it with any device on my local network. If you haven't seen if before, you should check it out as it makes developing any web application simple.

Spending time before the competition building a [boilerplate][boilerplate] really helped me. It meant that I could jump straight into developing my game. No need to set up a local server or load in the games libraries. Just a simple `git clone` and I was off.

I got to play with my [kaossilator][kaossilator] to generate the sounds. I almost used it for the music too, but I ran out of time, so added a few clips together with [Garage band][garage]. I'm getting more interested in music production, so any excuse to play is always good.

## What could have gone better

Although the game was finished, it wasn't as exciting as it could have been. I would have liked to add some AI, so something to make it more challenging. The game just ended up being lots of linked up rooms with keys to find.

There were some collision issues that I didn't manage to solve. Some of it could be down to the framework I used, but I suspect I missed some vital element. Once I've worked out what was missing, I'm sure it will be clear. Bugs always are.

The map I made was quite big, which was a good thing. I felt like I could have made filled it more, but time was against me. Having mobs or other AI would have helped with variety, so maybe the size the game ended up with was good.

## Conclusions

At the end of the day I got out of the weekend what I wanted. I've got another game under my belt, and I felt like I've learnt a little more about game development. That's the main reason why I enter [Ludum Dare][ludum]. Now I will challenge you all to do the same.

Voting lasts for another few weeks, lets hope I get a good ranking.

[Play the game][entry]

[ludum]:        http://www.ludumdare.com/compo/
[entry]:        http://www.ludumdare.com/compo/ludum-dare-29/?action=preview&uid=14756
[boilerplate]:  https://github.com/Eruant/phaser-boilerplate
[phaser]:       http://phaser.io/
[browserify]:   http://browserify.org/
[sync]:         https://github.com/shakyShane/browser-sync
[kaossilator]:  http://www.korg.com/us/products/dj/kaossilator_pro_plus/
[garage]:       https://www.apple.com/uk/mac/garageband/
