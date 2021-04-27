// Objects
// one of the JavaScript's data types.
// a collection of related data and/or functionality
// Nearly all objects in JavaScript are instances of Object

// 1. Literals and properties ////////////////////////////////////////
// two ways of making object
const obj1 = {}; // 'object Literal' syntax
const obj2 = new Object(); // 'object constructor' syntax

function print(person) {
  console.log(person.name);
  console.log(person.age);
}

const ellie = { name: "ellie", age: 4 };
print(ellie);
delete ellie.name; //

// 2. Computed properties ////////////////////////////////////////
console.log(ellie.name);
console.log(ellie["name"]); // key should be always string''
ellie["hasjob"] = true; //add but not good method

// 3. property value shorthand ////////////////////////////////////////
const person1 = { name: "bob", age: 2 };
const person2 = Person("ellie", 30);
const person3 = new Person("ellie", 30);
console.log(person3);

// 4. Constructor Function ////////////////////////////////////////
function Person(name, age) {
  // return {
  //     name, // name: name,
  //     age, // age: age,
  // }
  // this = {};
  this.name = name;
  this.age = age;
  //  return this
}

// 5. in operator: property existence check (key in obj) ////////////////////////////////////////
console.log("name" in ellie);

// 6. for..in vs for..of ////////////////////////////////////////
for (key in ellie) {
  // load all key
  console.log(key);
}
// for (value of iterable)
const array = [1, 2, 3, 4, 5];
for (value of array) {
  console.log(value);
}

// 7. Fun cloning ////////////////////////////////////////
const user = { name: "ellie", age: "20" };
const user2 = user;
user2.name = "coder";
console.log(user); // this isn't copy

// old way
const user3 = {};
for (key in user) {
  user3[key] = user[key];
}
console.log(user3);

// new way
// const user4 = {};
// Object.assign(user4, user);
const user4 = Object.assign({}, user); // copy user in user4
console.log(user4);

// another example
const fruit1 = { color: "red" };
const fruit2 = { color: "blue", size: "big" };
const mixed = Object.assign({}, fruit1, fruit2);
console.log(mixed.color); //copy by fruit2(the last thing)
console.log(mixed.size);
