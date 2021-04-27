"use strict";
// 즉시 실행함수
(function () {
  const houseElem = document.querySelector(".house");
  let maxScrollValue; // Range How much we can scroll
  const barElem = document.querySelector(".progress-bar");
  const mousePos = { x: 0, y: 0 }; // Make start point center
  const stageElem = document.querySelector(".stage");
  const selectCharacterElem = document.querySelector(".select-character");

  // Move screen by Z value
  window.addEventListener("scroll", () => {
    const scrollPer = pageYOffset / maxScrollValue; // Scroll value percent
    const zMove = scrollPer * 980 - 490; // (-490) : for showing perspective
    houseElem.style.transform = `translateZ(${zMove}vw)`;

    // progress bar
    barElem.style.width = scrollPer * 100 + "%";
  });

  window.addEventListener("resize", resizeHandler);
  function resizeHandler() {
    maxScrollValue = document.body.offsetHeight - window.innerHeight;
  }

  window.addEventListener("mousemove", (e) => {
    // Mouse pointer values
    //     1
    // -1  0  1
    //    -1
    // Percentage according to where the mouse point is
    mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
    mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
    // Put css into stage class has house class and characters
    stageElem.style.transform = `rotateX(${mousePos.y * 5}deg) rotateY(${
      mousePos.x * 5
    }deg)`;
  });

  // Linked with character.js
  stageElem.addEventListener("click", (e) => {
    new Character({
      // Make percentage of the position clicked
      xPos: (e.clientX / window.innerWidth) * 100,
      // Make randomly speed percentage
      // 0.2 : the minium of randomly speed percentage
      speed: Math.random() * 0.5 + 0.2,
    });
  });

  selectCharacterElem.addEventListener("click", (e) => {
    const value = e.target.getAttribute("data-char");
    document.body.setAttribute("data-char", value);
  });

  // Load at first
  resizeHandler();
})();
