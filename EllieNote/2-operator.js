
console.log("ellie\'s \n\tnote");
4. Assignment operators
let x = 3;
let y = 6;
x += y; // x = x + y;
x -= y;
x *= y;
x /= y;

6. Logical operator: || (or), &&(and), check(); // It's the best way that put FN at the end, bcz when the first condition is met , it dosen't need to go to the end 

7. Equality
// == loose equaility, with type conversion
// === strict equaility, no type conversion

9. Ternary operator:?
//  true면 ? yes를 실행 아니면 : no를 출력                          
console.log(name === 'ellie' ? 'yes' : 'no');

10. Switch statement // else if (it's useful when it needs a lot of if)
const browser = 'IE';
switch (browser) {
    case 'IE':
        console.log('go away');
        break;
    case 'Chrome':
    case 'Firefox':
        console.log('love you');    
        break;
    default:
        console.log('same all!');
        break;
}

