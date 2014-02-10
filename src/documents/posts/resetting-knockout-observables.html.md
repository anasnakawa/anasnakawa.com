---
title 	: 'Resetting Knockout Observables'
layout	: 'post'
tags	: ['javascript', 'mvc', 'mvvm', 'kncokout', 'post']
date    : '10-feb-2014'
---

Qoute: don't repeat yourself, if your repeating yourself, you're doing it wrong

A regular lifecycle for a given model in any application is that it will get initialized ( sometimes with an initial value )
then it will get manipulated with some data, at the end of the module lifecycle, a model should be resetted to its default value so it won't display irrelevant information the next time you open that module.

I used to see developers defining knockout observables in their modules with some initial values, and they go 