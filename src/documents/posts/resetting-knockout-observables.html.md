---
title 	: 'Resetting Knockout Observables'
layout	: 'post'
tags	: ['javascript', 'mvc', 'mvvm', 'kncokout', 'post']
date    : '19-feb-2014'
---

I used to see developers defining knockout observables somewhere in their modules, and later when hiding the module they go and reset those observables with the same value the observable has been initialized with.

not a big deal, but the more you have observables in your module, the more annoying it will become to reset them.

life should be easier, and as developers we always have the choice to make things easier for us.
the problem we're facing here, is that we shouldn't provide the default value twice. once you define an observable, you know what default value for this observable should be.

so the trick here is to come up with an easy way to tell the observbale when you initialize it that this is your default value.

I did a tiny extension to the knockout that hopefully will ease the pain here, let me show you the code:

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
  typeof this() === 'undefined' && this.reset();
 
  // whenever value changed to undefined, reset to default
  this.subscribe(function( newValue ) {
    typeof newValue === 'undefined' && this.reset();
  });
  
  return this;
}
```

after you include this tiny extension to your application ( Note that it should be added after loading `knockout.js` file ),
you can define your own observable using the `default` extension as follows

```js
this.price = ko.observable().default( 0 );

// this.observableArray([] ).default([ ]) will not work, because array is passed by reference
// so second time you do a reset, it won't work
this.itemList = ko.observableArray([ ]).default( function() { return [ ] });

// for the same previous reason, we use a factory to generate the default value
this.config = ko.observable().default( function() { return {} });
```

later when you want to reset those observables, you can call the `reset` method..

```js
// later you can reset it like this
this.price.reset();
this.itemList.reset();
this.config.reset();
```

and in case you don't like to reset every observable

```js
for( var obs in this ) {
  ko.isObservable( this[ obs ] ) && this[ obs ].reset();
}
```

---

Note here that when our default value is a primitive, we just pass it to the `default` method as is, while when our default value is an Array or an Object, we need to provide the default value using a factory method, and thats because unlike primitives, Arrays and Objects are passed by reference, so the factory method here will make sure everytime we do a reset, we'll get a fresh copy of the desired default value.

hope it will ease your life a bit :)
