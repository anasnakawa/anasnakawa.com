---
title 	: 'Better Array'
layout	: 'draft'
tags	: ['javascript', 'mvc', 'mvvm', 'kncokout', 'post']
date    : '11-feb-2014'
---

last month I was asked at a job interview how do I detect if an object is an Array or not.
the problem is that I have always depended on other libraries for type detection ( mostly underscore or is.js ).

my answer was to detect if an object has a length property, which I knew it was not accurate since any object can have a length property,
I took a minute to think, and I told the interviewer that I do remember something related to a `toString` method could generate a result something like `[object Array]`
but it seemed to me something is wrong about this, because if I had an object with values `[1, 2]` for example, then calling `obj.toString()` should give me a concatinated result as `1, 2`.

the question sticked to my mind, and once I got home, I have opened both underscore.js & is-js source code to see how do they detect Arrays, and I found out the following:

```js
function isArray( obj ) {
	return toString.call( obj ) === '[object Array]';
}
```

what I didn't know is that there are a global `toString` method that takes no arguments, and returns the string value of `this` object.

### Something Better ?

type detection methods are really small, but they are very essential to any JavaScript application, due to the nature of JavaScript being loosly types, you have always to make sure
what kind of object your method are getting, and because type detection is something that gets called tons of times in any web application, is it good to make it perform as fast as possible.

the previous implemetation tells me there has to be something better, so I opened up my developer tools and tried to find if there are any better way to find if an object is a real Array or not

the result is

```js
function isArray( obj ) {
	return obj instanceof Array;
}
```

I did a tiny performance benchmarking on [jsperf](http://jsperf.com/array-type-detection), and the result came out pretty much faster that I thought!

