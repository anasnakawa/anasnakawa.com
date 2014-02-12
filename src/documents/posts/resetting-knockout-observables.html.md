---
title 	: 'Resetting Knockout Observables'
layout	: 'draft'
tags	: ['javascript', 'mvc', 'mvvm', 'kncokout', 'post']
date    : '11-feb-2014'
---

> don't repeat yourself, if your repeating yourself, you're doing it wrong

> everything that has a beggining, has an end

A regular lifecycle for a given model in any application is that it will get initialized ( sometimes with an initial value )
then it will get manipulated with some data, at the end of the module lifecycle, a model should be resetted to its default value so it won't display irrelevant information the next time you open that module.

I used to see developers defining knockout observables in their modules with some initial values, and they go 