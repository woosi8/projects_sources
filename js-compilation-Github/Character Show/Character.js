"use strict";

function Character(info) {
  this.mainElem = document.createElement("div");
  this.mainElem.classList.add("character");
  this.mainElem.innerHTML = `<div class="character-face-con character-head">
     <div class="character-face character-head-face face-front"></div>
     <div class="character-face character-head-face face-back"></div>
 </div>
 <div class="character-face-con character-torso">
     <div class="character-face character-torso-face face-front"></div>
     <div class="character-face character-torso-face face-back"></div>
 </div>
 <div class="character-face-con character-arm character-arm-right">
     <div class="character-face character-arm-face face-front"></div>
     <div class="character-face character-arm-face face-back"></div>
 </div>
 <div class="character-face-con character-arm character-arm-left">
     <div class="character-face character-arm-face face-front"></div>
     <div class="character-face character-arm-face face-back"></div>
 </div>
 <div class="character-face-con character-leg character-leg-right">
     <div class="character-face character-leg-face face-front"></div>
     <div class="character-face character-leg-face face-back"></div>
 </div>
 <div class="character-face-con character-leg character-leg-left">
     <div class="character-face character-leg-face face-front"></div>
     <div class="character-face character-leg-face face-back"></div>
 </div>`;

  document.querySelector(".stage").appendChild(this.mainElem);
  this.mainElem.style.left = info.xPos + "%";
  this.init();

  // Scroll Event
  this.scrollState = false; // check for scroll event
  this.lastScrollTop; //  last scroll position

  // Key Event
  this.speed = info.speed; // set speed level with wall-3d.js
  this.xPos = info.xPos; // make decision Xpos value for - or +
  this.direction; // check chracters direction in run method

  this.runningState = false; // check for  this is running or not 좌우 이동 중인지 아닌지 (키중복 막기위함)
  this.rafId; // put requestAnimationFram into this
}

//////// Constructor function for common working
Character.prototype = {
  constructor: Character,
  init: function () {
    // Init : Scroll Event  - 1. add or remove running class following your move
    // Init : Scroll Event  - 2. Depending on what direction you scroll up and down, the face show backward or forward
    // Init : Keydown Event - 1. Depending on what the keycode pushed , character move to left or right

    // this in window event is for window this. so put this into const self before event
    const self = this;
    window.addEventListener("scroll", function () {
      // When you scroll, add running class for moving characters
      //   1. keep setTimeout cancled untill the scroll end
      clearTimeout(self.scrollState);
      //  2. it works at first time. since 2times, scrollState has numbers. so it's not false anymore
      if (!self.scrollState) {
        self.mainElem.classList.add("running");
      }
      // setTimeout cause number return
      self.scrollState = setTimeout(function () {
        // when scroll is working, it dosen't work. because it set up for 0.5s
        // It will work at last scroll
        self.scrollState = false; // it's for rescrolling
        self.mainElem.classList.remove("running");
      }, 500);

      // Make a decision for forward or backward of character
      // Compare current scroll position value to last scroll position value
      // If current scroll position value were higher than last scroll, it means you scroll down
      if (self.lastScrollTop > pageYOffset) {
        // Higher than current scroll position - scroll up
        self.mainElem.setAttribute("data-direction", "backward");
      } else {
        // Higher than last scroll position - scroll down
        self.mainElem.setAttribute("data-direction", "forward");
      }
      self.lastScrollTop = pageYOffset; // Put pageYOffset into lastScrollTop to compare next scroll position
    });

    ////////// KEY Event
    window.addEventListener("keydown", (e) => {
      // It works at the second time to prevent keydown overlap
      if (self.runningState) return;

      if (e.keyCode == 37) {
        // left
        self.direction = "left";
        self.mainElem.setAttribute("data-direction", "left");
        self.mainElem.classList.add("running");
        self.run(self);
        self.runningState = true;
      } else if (e.keyCode == 39) {
        // right
        self.direction = "right";
        self.mainElem.setAttribute("data-direction", "right");
        self.mainElem.classList.add("running");
        self.run(self);
        self.runningState = true;
      }
    });
    window.addEventListener("keyup", (e) => {
      self.mainElem.classList.remove("running");
      cancelAnimationFrame(self.rafId); // Cancle requestAnimationFrame
      self.runningState = false; // It's for next keydown event
    });
  },

  //////////  Method to make character move accroding to direction
  run: function (self) {
    // Linked with click event(49line) in wall-3djs
    // when character move to left, subtract speed property from Character's xPosition
    if (self.direction == "left") {
      self.xPos -= self.speed;
    } else if (self.direction == "right") {
      self.xPos += self.speed;
    }
    // Limit a moving range of chracter
    if (self.xPos < 2) {
      self.xPos = 2;
    }
    if (self.xPos > 88) {
      self.xPos = 88;
    }

    // Set xPosition to % in CSS
    self.mainElem.style.left = self.xPos + "%";

    // Set self.rafid to cancle this in keyup event.
    self.rafId = requestAnimationFrame(function () {
      // this in here is for window, so this needs to be set up this that we want
      // use parameter of the run function
      self.run(self);
    });
  },
};
