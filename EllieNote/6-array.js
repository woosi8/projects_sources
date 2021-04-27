"use strict";

// 1.Declaration ////////////////////////////////////////
const arr1 = new Array();
const arr2 = [1, 2];

// 2. Index position ////////////////////////////////////////
const fruits = ["apple", "banana"];
// console.log(fruits);
// console.log(fruits.length);
// console.log(fruits[0]);
// console.log(fruits[fruits.length - 1]); // find last one

// 3. Looping over an array ////////////////////////////////////////
// print all fruits
// a. for
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// b. for of
for (let fruit of fruits) {
  console.log(fruit);
}

// c. forEach
fruits.forEach((fruit, index, array) => console.log(fruit, index));

// 4. Addition, delection ,copy ////////////////////////////////////////
// Push : add an item to the end
fruits.push("star", "peach");

// Pop : remove an item from the end
const poped = fruits.pop(); // pop has return
fruits.pop();
fruits.pop();

// Unshift : remove an item from the beginning
fruits.unshift("lemon", "melon", "monkey");

// Shift: remove an item from the beginning
fruits.shift();
console.log(fruits);
// note!! shift,unshift are slower than pop,push
console.clear();

// splice : remove an item by index position
// fruits.splice(1, 1);
// fruits.splice(2);
fruits.splice(1, 1, "kiwi", "water"); // replace
console.log(fruits);
fruits.splice(1, 0, "kiwi", "water"); // plus
console.log(fruits);

// combine two arrays
const fruits2 = ["cat", "dog"];
const newFruits = fruits.concat(fruits2);
console.log(newFruits);

// 5. Searching ////////////////////////////////////////
// indexOf: find the index
console.log(fruits);
console.log(fruits.indexOf("kiwi"));
console.log(fruits.indexOf("apple"));
console.log(fruits.indexOf("star"));

// includes
console.log(fruits.includes("star"));
console.log(fruits.includes("banana"));

//lastIndexof
fruits.push("melon");
console.log(fruits);
console.log(fruits.indexOf("melon")); //it will return when it finds first "melone"
console.log(fruits.lastIndexOf("melon"));
