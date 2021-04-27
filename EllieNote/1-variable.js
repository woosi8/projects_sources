1. Use strict
// added in ES 5
// use this for vanila JavaScript. (for preventing crazy in javascript too flexible)
'use strict'

2. Variable (mutable) rw(read/write)
// let (added in ES6)

// why we don't use var anymore ? var is too flexible(it can called before you declarate var), has no block scope{},
// var hoisting (move declartion from bottome to top)

3. Constant (immutable) (read only)
// favor immutable data type always for a few reaons;
// -security
// thread safety
// reduce human mistakes

// Immutable data types: premitive types, frozen objects (i.e. object.freeze())
// Mutable dta tyapes: all objects by default are mutable in JS
// favor immutable data type always for a few reasons:
// - secrurity
// - thread safety
// - reduce human mistakes

4. Variable types
// primitive - single item : number, string, boolean, null, undefined, symbol
// object - box container (reference)
// function, first-class function

5. Dynamic typing : dynamically typed language // That's why we need TypeScript
// It doesn't have a type, so it can be changed when it runs
  
    let text = 'hello';
    console.log(`value:${}, type: ${}`); //string
    text = 1;
    console.log(`value:${}, type: ${}`); // changed number\ 
    text = '7' + 5 ; // string
    text = '8' /'2' // number
    


