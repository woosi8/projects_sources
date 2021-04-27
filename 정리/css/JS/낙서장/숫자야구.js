//  숫자 입력 제한 걸기



let numbers;
let sequence;

function pick(){
  numbers = [1,2,3,4,5,6,7,8,9];
  sequence = [];

  for (let index = 1; index <5; index++){

    let picked = numbers.splice(Math.floor(Math.random()*(10-index)),1)[0];
    sequence.push(picked);
  }


};

pick();


const resultElem = document.querySelector('h1');
const formElem = document.querySelector('form');
const inputElem = document.querySelector('input');
const buttonElem = document.querySelector('button');

inputElem.type = 'number';


let wrongElem = 0;
inputElem.focus();


function referee(e){
   e.preventDefault();
  const answer = inputElem.value;
  if (answer === sequence.join('')){
    resultElem.textContent = 'HomeRun';
    inputElem.value='';
    inputElem.focus();
    pick();
    wrongElem=0;
  } else{
    const answerElem = answer.split('');
    let strike = 0;
    let ball = 0;
    wrongElem+1;
    if(wrongElem>5){
      resultElem.textContent = 'can not allowed trying for 5 times, the answer is'
        +sequence.join(',');
      inputElem.value='';
      inputElem.focous();
      pick();
      wrongElem =0;
    } else{

      for (let i = 0; i < 5; i++){
        if(Number(answerElem[i]) === sequence[i]){
          strike+=1;
        } else if(sequence.indexOf(Number(answerElem[i])) >-1){
          ball +=1;
        }
      }
      answer.textContent = strike +'strike'
      +ball + 'ball' +'wrong for' +wrongElem;
      inputElem.value='';
      inputElem.focus();

    }
  }
};


formElem.addEventListener('submit',referee);




// 키 제한 시키기
// 1. 입력 길이 제한
function numberMaxLength(e){
    if(e.value.length > e.maxLength){
        e.value = e.value.slice(0, e.maxLength);
    }
};

// 1. 숫자만 입력 제한
function inNumber(){
    if(event.keyCode<48 || event.keyCode>57){
       event.returnValue=false;
    }
  }
