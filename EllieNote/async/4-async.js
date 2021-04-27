// async & await
// syntactic sugar
// clear style of using promise

//1. async ////////////////////////////////////////
// function fetchUser() {
//   return new Promise((resolve, reject) => {
//     resolve("ellie");
//   });
// }
//  -------------->>>

// async has code block by Promise automatically
async function fetchUser() {
  // do network request in 10 secs...
  return "ellie";
}

const user = fetchUser();
user.then(console.log);
console.log(user);

// 2. await (it can be used in async Fn) ////////////////////////////////////////
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getApple() {
  await delay(1000);
  // throw "error"; // error
  return "apple";
}

async function getBanana() {
  //   return delay(3000);.then(() => "banana");
  await delay(1000);
  return "banana";
}

// function pickFruits() {
//     return getApple().then (apple => {
//         return getBanana().then (banana => `${apple} + ${banana}`)
//     })
// } ----------------------->>
async function pickFruits() {
  const applePromise = getApple(); // Promise for running at once when it's made (parallel running)
  const bananaPromise = getBanana();
  const apple = await applePromise; //synchronization
  const banana = await bananaPromise;
  return `${apple} + ${banana}`;
}
pickFruits().then(console.log);

// ----------------------->>  improvement method
// 3. useful Promise APIs (pickFruits is a little messy ) ////////////////////////////////////////
function pickAllFruits() {
  return Promise.all([getApple(), getBanana()]) // Promise.all : synchronization all (parallel running)
    .then((fruits) => fruits.join("+"));
}

pickAllFruits().then(console.log);

// race - return only first one
function pickOnlyOne() {
  return Promise.race([getApple(), getBanana()]);
}

pickOnlyOne().then(console.log);
