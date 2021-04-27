// JavaScript Object Notation
// -1 object to string
// -2 string to object

// 1. Object to JSON ////////////////////////////////////////
// - stringify(obj)
let json = JSON.stringify(true);

// - array to JSON
json = JSON.stringify(["apple", "banana"]); //JSON, looks like array

// - Object to JSON
const rabbit = {
  name: "tori",
  color: "white",
  size: null,
  birthDate: new Date(),
  // Fn is not included in JSON
  jump: () => {
    console.log(`${this.name} can jump!`);
  },
};
json = JSON.stringify(rabbit);

// + Control (Fn or array)
// array
json = JSON.stringify(rabbit, ["name", "color"]);

// Fn
json = JSON.stringify(rabbit, (key, value) => {
  // console.log(`key:${key}, value: ${value}`);
  return key === "name" ? "ellie" : value;
});
console.log(json);

// 2. JSON to Object ////////////////////////////////////////
// - parse(json)
//                          parse reviver(callback function)
const obj = JSON.parse(json, (key, value) => {
  // If key were birthDate, birthDate would be made to new Date object or if wern't brithDate, it would keep value
  return key === "birthDate" ? new Date(value) : value;
});
rabbit.jump();
// obj.jump(); // error
// why? obj is serialized from JSON. The JSON didn't have function

console.log(rabbit.birthDate.getDate());
// obj.birthDate is a string from JSON. but Date in rabbit is a object.it dosen't match. so it needs parse reviver.
console.log(obj.birthDate.getDate());

// Helpful JSON sites
// http://www.jsondiff.com/    - For debugging
// https://jsonbeautifier.org/ - Fixing JSON format
// https://jsonparser.org/     - Check object type from json type
// https://tools.learningcontainer.com/json-validator/  - Confirm JSON is valid or not
