"use strict";

// Promise is a JavaScript object for asynchronous operation.
// 1. State : pending -> fulfilled or rejected
// 2. Producer vs Consumer

// 1. Producer
// when new Promise is created, the executor runs automatically.
// for doing some heavy work (network, read files)
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("ellie");
    reject(new Error("no network"));
  }, 2000);
});

// 2. Consumers: then, catch, finally
promise
  .then((value) => {
    console.log(value);
  })
  // catch - error handling
  .catch((error) => {
    console.log(error);
  })
  // work at the end
  .finally(() => {
    console.log("finally");
  });

//  3. Promise chaining
const fetchNumber = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
fetchNumber
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => {
    // another server data
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(num - 1);
      }, 1000);
    });
  })
  .then((num) => console.log(num));

// 4. Error Handling
const getHen = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("chicken");
    }, 1000);
  });

const getEgg = (hen) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      //   resolve(`${hen} => egg`);
      reject(new Error(`error! ${hen} => egg`));
    }, 1000);
  });

const cook = (egg) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`${egg} => cook`);
    }, 1000);
  });

getHen()
  .then((hen) => getEgg(hen))
  // replace when it has a error
  .catch((error) => {
    return "bread";
  })
  .then(cook)
  .then((meal) => console.log(meal));
