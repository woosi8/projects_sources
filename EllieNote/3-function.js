1. Function declartion
    naming: doSomething,command,verb 
    function is object in JS


3. Default parameters (added in ES6)
    function showMessage(message, from = 'unknown') {
        console.log(`${message} by ${from}`);
    }
    showMessage('Hi!')


4. Rest parameters(added in ES6)    
function printAll(...args) { // array parameter
    for (let i = 0; i < array.length; i++) {
        console.log(args[i]);
    }

    // ---->> make simple
    for (const arg of args){
        console.log(arg);
    }
    // or
    args.forEach(() => console.log(arg);)
}
printAll('dream','coding','ellie');

5. Local scope
    // global variable
    // local variable
7. Early return, early exit

// bad
   function upgradeUser(user) {
    if (user.point > 10) {
        // long upgrade logic...
    }
   }

// good   
   function upgradeUser(user) {
        if (user.point <=10) {
            return; // return quickly if it isn't met
        }       
        // long upgrade logic...
   }

// named function for debugging
// better debugging in debugger's stack traces
// recursions

Arrow function
const add = function (a,b) {return a + b}
// >>>
const add = (a,b) => a + b;

function calculate(command, a, b) {
    switch (command) {
        case 'add':
            return a + b
        case 'substract':
            return a - b
        case 'divide':
            return a / b
        case 'multiply':
            return a * b
        case 'remainder':
            return a % b
        default:
            throw Error('unkown command')
    }
}

console.log(calculate('remainder', 5, 2))

1. Function

1 - a function //delcaration can be called earlier than it is defiend(hoisted)
sum(2,3);
function sum(a,b){
    return a+b;
}

2 - a function //expression 
const result = function expresion (){

}
result();

2. Callback function // using function expression
function randomQuiz(answer, printYes, printNo) {
    if (answer ==='love you') {
        printYes();
    } else{
        printNo();
    }
}

// anonymous function
const printYes = function () {
    console.log('yes');

// named function
// better debugging in dubugger's stack traces
// recursions 
const printNo = function print() {
    console.log('no');
}

randomQuiz('wrong',printYes,printNo);
randomQuiz('love you',printYes,printNo);


3. Arrow function
// always anonymous

const add = (a,b) => a +b; //i dosen't need return
const simpleAdd = (a,b) => { // it needs return by block
    return a * b;
}

* IIFE: Immediately Invoked Function expression
(function name() {
    
})();