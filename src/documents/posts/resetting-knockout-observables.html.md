---
title 	: 'Resetting Knockout Observables'
layout	: 'draft'
tags	: ['javascript', 'mvc', 'mvvm', 'kncokout', 'post']
date    : '11-feb-2014'
---

> don't repeat yourself, if your repeating yourself, you're doing it wrong

I used to see developers defining knockout observables somewhere in their modules, and later when hiding the module they go and reset those observables with the same value the observable has been initialized with.

but when you have a large module with tons of observables, things can go crazy, also whenever you add a new object to the module, you have always to remember to go and reset it.

life should be easier, and as a developers we always have the choice to make things easier for us.
the problem we're facing here, is that we don't have to provide the default value twice. once you define an observable, you know what value it will become once it will be resetted.
so the trick here is to define an easy way to tell the observbale that this is your default value.. so remember it.

I did a tiny extension to the knockout that hopefully will ease the pain here, let me show you the code:

```js
this.price = ko.observable().default( 0 );

// this.observableArray([]).default([]) will not work, because array is passed by reference
// so second time you do a reset, it won't work
this.itemList = ko.observableArray([]).default( function() { return [] });

// for the same previous reason, we use a factory to generate the default value
this.config = ko.observable().default( function() { return {} });

// later you can reset it like this
this.price.reset();
this.itemList.reset();
this.config.reset();
```

in case you don't like to reset every observable

```js
for( var obs in this ) {
	if( ko.isObservable( this[ obs ] ) ) {
		this[ obs ].reset();
	}
}
```

```js
// adding default value when initializing an observable
// for later resetting, preventing the observable from
// becoming undefined ( still you can set it to `null` )
// ====================================================
// example[1]: primitive types ( passed by value )
// -----------------------------------------------
// var username = ko.observable().default( 'guest' );
// username();              // 'guest'
// username( 'admin' );     // 'admin'
// username( undefined );   // 'guest'
// username( 'john doe' );  // 'john doe'
// username.reset();        // 'guest'
//
// example[2]: non-premitive types ( passed by reference )
// -------------------------------------------------------
// var userList = ko.observableArray([]).default(function() { return []; });
// var settings = ko.observable().default(function() { return { foo: 'bar' } });
// userList.reset();
// settings.reset();
ko.observable.prototype.reset = function() {
  this( typeof this._default === 'function' ? this._default() : this._default );
}
 
// * **param:** {object|factory}
ko.observable.prototype.default = function( value ) {
  if( typeof value === 'undefined' ) {
    return;
  }
 
  // store default value
  this._default = value;
 
  // observable defined with no arguments
  // use default
  if( typeof this() === 'undefined' ) {
    this.reset();
  }
 
  // whenever value changed to undefined, reset to default
  this.subscribe(function( newValue ) {
    typeof newValue === 'undefined' && this.reset();
  });
}
```