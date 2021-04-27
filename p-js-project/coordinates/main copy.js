'use strict'

const vertical = document.querySelector('.vertical');
const horozontal = document.querySelector('.horozontal');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

//load를 불러옴으로써 마우스무브 이벤트가 순서상 제일 늦게 발생되어 앞에 defer(dom) 타켓들이 정확히 다 잡힌다음에 오류없이 발생하기 위해서
addEventListener('load', () =>{

  const targetRect = target.getBoundingClientRect();
  const targetHalfWidth = targetRect.width / 2;
  const targetHalfHeight = targetRect.height / 2;
  
  document.addEventListener('mousemove', event => {
    const x = event.clientX;
    const y = event.clientY;
  
    // vertical.style.left = `${x}px`;
    // horozontal.style.top = `${y}px`;
    // target.style.left = `${x}px`;
    // target.style.top = `${y}px`;
    // tag.style.left = `${x}px`;
    // tag.style.top = `${y}px`;
    // tag.innerHTML = `${x}px, ${y}px`;
    // ----> 개선하기
    vertical.style.transform = `translateX(${x}px)`;
    horozontal.style.transform = `translateY(${y}px)`;
  
    target.style.transform = `translate(${x - targetHalfWidth}px, ${y - targetHalfHeight}px)`;
    tag.style.transform = `translate(${x}px, ${y}px)`;
    tag.innerHTML = `${x}px, ${y}px`;;
  
  
  });

})