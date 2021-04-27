// targetElem.style.top = positionTop + "px";
'use strict';

const lineElem = document.querySelector('.line');
const targetElem = document.querySelector('.target img');
const textElem = document.querySelector('.target_text');
const vertical = document.querySelector('.vertical');
const horozontal = document.querySelector('.horozontal');

window.addEventListener('mousemove',e =>{

        const positionLeft = e.clientX;
        const positionTop = e.clientY;
        // const xY = e.clientX +  "px "  + e.clientY + "px " ;
        const xY = `${positionLeft}px, ${positionTop}px` ;

        // targetElem에 innerHTML 로 xY 변수를 적용 합니다.
        textElem.innerHTML = xY;

        //  targetElem의 position 위치를  positionLeft, Top 변수 값으로 style 적용해줍니다.
        targetElem.style.left = `${positionLeft}px`
        targetElem.style.top = `${positionTop}px`
        textElem.style.left = `${positionLeft + 30}px`
        textElem.style.top = `${positionTop + 20}px`
        vertical.style.left = `${positionLeft}px`;
        horozontal.style.top = `${positionTop}px`;
      

})