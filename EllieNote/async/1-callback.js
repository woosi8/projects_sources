"use strict";

// JavaScript is synchronous.
// Execute the code block in order after hoisting
// hoisting : var, function declartion  - move declaration from bottom to top

////// Call back
// 1.Synchronous callback
function printImmediately(print) {
  print();
}
printImmediately(() => console.log("hello"));

// 2. Asynchronous callback
function printWithDelay(print, timeout) {
  setTimeout(print, timeout);
}
printWithDelay(() => console.log("async callback"), 2000);

////// Callback Hell example
// 1 Get user id and password
// 2 Login to UserStorage
// 3 Get user id
// 4 Ask User roles(getRoles) using user id
// 5 Print user name and role (onSuccess object)
class UserStorage {
  loginUser(id, password, onSuccess, onError) {
    setTimeout(() => {
      if (
        // Login
        (id === "ellie" && password === "dream") ||
        (id === "coder" && password === "academy")
      ) {
        onSuccess(id); // get UserID
      } else {
        onError(new Error("not found"));
      }
    }, 2000);
  }

  getRoles(user, onSuccess, onError) {
    setTimeout(() => {
      if (user === "ellie") {
        // get onSuccess object
        onSuccess({ name: "ellie", role: "admin" });
      } else {
        onError(new Error("no access"));
      }
    }, 1000);
  }
}

const userStorage = new UserStorage();
const id = prompt("enter your id");
const password = prompt("enter your password");
userStorage.loginUser(
  id,
  password,
  // When login succeed, get onSucess(id)
  (user) => {
    // Get user name and role object(onSuccess in getRolesFn)
    userStorage.getRoles(
      user,
      //  If user = ellie, get onSuccess
      (userWithRole) => {
        alert(
          `Hello ${userWithRole.name}, you have a ${userWithRole.role} role`
        );
      },
      (error) => {
        console.log(error);
      }
    );
  },
  // when login is failed
  (error) => {
    console.log(error);
  }
);
