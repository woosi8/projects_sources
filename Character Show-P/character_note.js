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
	this.init(); //아래 prototype에 만든 init을 호출

	// Scroll Event
	this.scrollState = false; // check for scroll event
	this.lastScrollTop; //  last scroll position

	// Key Event
	this.speed = info.speed; // set speed level with wall-3d.js
	this.xPos = info.xPos; // make decision Xpos value for - or +
	this.direction; // check chracters direction in run method

	// 좌우 이동 중인지 아닌지 판별
	this.runningState = false; // check for  this is running or not 좌우 이동 중인지 아닌지 (키중복 막기위함)
	// 리퀘스트 애니메이션 삭제를 위해 정의
	this.rafId; // put requestAnimationFram into this
}

//////// Constructor function for common working
// 객체 prototype : 생성자로 생성한 인스턴스 객체가 공통으로 사용하는 속성이나 메소드는 prototype객체에 만든다
Character.prototype = {
	// 생성자 함수를 따로 설정 하는 이유 -
	// Character.prototype.xxxx(method) = function (){} 이처럼 추가할수 있는데
	// 아래에서는 prototype개체를 재정의(빈것으로)새로운 객체를 다시 만들기 위해 원래 갖고 있는 constructor 속성을 다시 만들어 준다
	constructor: Character,
	// 이 아래부터 추가할 매쏘드 (xxxx: function)
	// init 초기화 메쏘드 : 캐릭터가 만들어지는 순간에 실행이되야함 (그래서 위에 this.init() 추가해줌)
	init: function () {
		// Init : Scroll Event  - 1. add or remove running class following your move
		// Init : Scroll Event  - 2. Depending on what direction you scroll up and down, the face show backward or forward
		// Init : Keydown Event - 1. Depending on what the keycode pushed , character move to left or right

		// clearTimeout과 setTimeout 메커니즘을 이용해 굉장히 빈번히 일어나는 스크롤 이벤트에서 필요할때 딱 한번만 효율적으로 실행되게 한다
		// this in window event is for window this. so put this into const self before event
		// addEvent의 주체는 window라서 여기서 this를 쓰면 전역객체를 가르킨다. 그래서 this를 밖에서 다른 변수에 넣어서 써야 한다
		const self = this;
		window.addEventListener("scroll", function () {
			// When you scroll, add running class for moving characters
			//   1. keep setTimeout cancled untill the scroll end
			// setTimeout은 0.5초후에 실행되는데 스크롤이 계속되면 clearTimeout으로 계속 취소를 시켜서 실행이 안되다가
			// 스크롤이 멈추면 0.5후에 setTimeout이 실행된다

			//  clearTimeout은 setTimeout의 반환값을 매개변수로 하여 setTimeout을 취소시키는 함수
			clearTimeout(self.scrollState);
			//  2. it works at first time. since 2times, scrollState has numbers. so it's not false anymore

			// 1. *** 처음에는 false니깐 if문이 실행되고,
			if (!self.scrollState) {
				self.mainElem.classList.add("running");
			}
			// setTimeout cause number return
			// 스크롤중에는 clearTimeout때문에 셋타임아웃 실행되지 않는다. 스크롤이 멈추고 나서야 실행
			// setTimeout함수는 어떤값(숫자)를 리턴한다 .
			// 함수는 실행이 안되더라도 scrollState의 값은 세팅이 된다. 그래서  scrollState가 트루가 된다.

			// *** 2 self.scrollStae변수 세팅값까지는 코드를 읽는다. setTimeout은 숫자를 리턴해서 scrollState가 true가되어서
			// 스크롤 이벤트가 계속 진행되더라도 scrollState가 true값이 되서 위에 add running은 한번만 실행된다.
			// 여기서 setTimeout함수는 0.5초 후에 발동되는데, 위에 clearTimeout때문에 스크롤중에는 계속 취소되다가
			// 스크롤 이벤트가 멈추고 0.5후에 비로소 실행이 된다.
			self.scrollState = setTimeout(function () {
				// when scroll is working, it dosen't work. because it set up for 0.5s
				// It will work at last scroll
				self.scrollState = false; // it's for rescrolling
				self.mainElem.classList.remove("running");
			}, 500);

			// Make a decision for forward or backward of character
			// Compare current scroll position value to last scroll position value
			// If current scroll position value were higher than last scroll, it means you scroll down
			// pageYOffset 현재 스크롤값은 아래로 갈수록 더 커진다
			// 마지막 스크롤값이 현재 스크롤값보다 크다면 우리는 스크롤을 올린것
			if (self.lastScrollTop > pageYOffset) {
				// Higher than current scroll position - scroll up
				self.mainElem.setAttribute("data-direction", "backward");
			} else {
				// Higher than last scroll position - scroll down
				self.mainElem.setAttribute("data-direction", "forward");
			}
			// 마지막으로 스크롤한 위치가 저장된다
			self.lastScrollTop = pageYOffset; // Put pageYOffset into lastScrollTop to compare next scroll position
		});

		////////// KEY Event
		window.addEventListener("keydown", (e) => {
			// It works at the second time to prevent keydown overlap
			// 처음 한번만 실행되게 하기
			// 초기값은 false로 아래로 넘어간다. 다음 keydown부터는 true가 되므로 아래가 발생되지 않고 리턴된다
			if (self.runningState) return;

			// 왼쪽
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
				self.run(self); //여기서 self를 받아서 run 메쏘드에 매개변수로 전달한다
				self.runningState = true;
			}
		});
		window.addEventListener("keyup", (e) => {
			self.mainElem.classList.remove("running");
			// 키를 땠을대 requestAnimationFrame 효과를 꺼준다
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
		// 값 css에 갱신
		self.mainElem.style.left = self.xPos + "%";

		// Set self.rafid to cancle this in keyup event.
		self.rafId = requestAnimationFrame(function () {
			// this in here is for window, so this needs to be set up this that we want
			// use parameter of the run function
			self.run(self);
		});
	},
};
