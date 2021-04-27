"use strict";

function Character(info) {
	this.mainElem = document.createElement("div");
	this.mainElem.classList.add("character");
	// 클릭했을때 캐릭터가 완성되야 되기 떄문에 클래스에 html값들을 따로 뺘놓았다
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
	this.scrollState = false; // 스크롤 중인지 아닌지 체크하는 변수
	this.lastScrollTop; // 바로 이전(마지막) 스크롤 위치 비교 캐릭터 앞면 뒷면 방향을 결정을 위해

	// Key Event
	this.speed = info.speed; //속도 조절값 (랜덤으로 주기위해  wall.js에서 스피드를 랜덤으로 준다)
	this.xPos = info.xPos; // 키 입력시 xPos값을 스피드에 - or + 해서 값을 계속 변화시켜 캐릭터 이동시킨다
	this.direction; // run method에서 왼쪽인지 오른쪽인지 방향 알게 해주기

	this.runningState = false; // 좌우 이동 중인지 아닌지 (키중복 막기위함)
	this.rafId; // 키업에서 캔슬해주기위해서 리퀘스트 리턴숫자값을 저장하는 속성
}

//////// 클래스에 기능 추가하기
Character.prototype = {
	// 재정의
	constructor: Character,
	init: function () {
		// Init : 스크롤 이벤트 -  1. 스크롤시 캐릭터에 러닝 붙여주고 멈추면 제거해줘서 멈추게 하기.
		// Init : 스크롤 이벤트 - 2. 앞으로 스크롤, 뒤스크롤시 캐릭터 방향 결정
		// Init: 키입력 이벤트 -  1. 키 왼쪽, 오른쪽 입력시 방향에 맞게 움직이게 하고, 키를 뗴면 멈추게 하기

		// this를 다른함수에 넣어놓는 이유 : window이벤트에 this는 window전역을 가르키기 떄문에,
		// 여기서는 캐릭터 클래스에 this 변수가 필요해서 선언해 놓은것
		const self = this;
		window.addEventListener("scroll", function () {
			//   1. 실행 -Settimeout을 취소시켜주는 명령어
			clearTimeout(self.scrollState);

			//  2. 처음에만 실행된다. 위에서 초기값을 false로 해놔서
			// 왜냐면 뒤따라오는 다음 SetTimeout은 숫자를 리턴하므로  scrollState에 숫자가 계속 들어가서 참이되므로
			if (!self.scrollState) {
				self.mainElem.classList.add("running");
			}
			self.scrollState = setTimeout(function () {
				// 3. 0.5초 후에 실행되는것이라서 스크롤중일때는 0.5초에 멈추는 시간이 없어서 마지막 멈출때에 비로서 한번 실행된다
				self.scrollState = false; // false로 안해주면 true로 남아있기 때문에 다시 스크롤시 이프문이 발동되지 않는다.
				self.mainElem.classList.remove("running"); //멈추게 한다
			}, 500);

			// 캐릭터 앞뒤 설정 : 현재보다 큰 값인지 작은값인지로 판단 가능
			// 비교 - 이전 스크롤 위치(self.lastScrollTop) VS 현재 스크롤 위치(pageYOffset)
			// 이전 스크롤 위치가 현재 스크롤보다 크다면 : 스크롤 올림
			if (self.lastScrollTop > pageYOffset) {
				self.mainElem.setAttribute("data-direction", "backward");
			} else {
				// 현재 스크롤 위치가 크다면 : 스크롤 내림
				self.mainElem.setAttribute("data-direction", "forward");
			}
			// 현재pageYOffset을 마지막으로 스크롤한 위치로 정의한다. LastscrollTop 값이 되게한다
			//  : 즉 다음 스크롤부턴 현재가 이전 스크롤 위치가 됨
			self.lastScrollTop = pageYOffset;
		});

		////////// KEY Event
		window.addEventListener("keydown", (e) => {
			// 키 중복 막기위한 이프문 (초기값은 self.runningState) false 상태니깐 리턴되지않고 아래 if문이 실행되고
			// if문 맨 마지막에 runningstate true로 줘서 두번재 실행부터 리턴해서 아래 기능들을 멈춰준다)
			if (self.runningState) return;

			// left
			if (e.keyCode == 37) {
				self.direction = "left";
				self.mainElem.setAttribute("data-direction", "left");
				self.mainElem.classList.add("running");
				self.run(self);
				// 키다운 이벤트는 누르고 있으면 중복되서 값이 실행되는 문제가 있다( 중첩막기):
				// 반복실행을 막기위함 true로 바꿔줘서 다음 실행때 위에서 return되서 실행이 한번만 되게 한다 (24번강의)
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
			// 중첩방지 : 키를 뗏을때 리퀘스트 애니메이션때문에 자동으로 쭉 가나는 캐릭터를 잡아주기위함
			cancelAnimationFrame(self.rafId);
			self.runningState = false; // false로 다시 해줘야지 다시 키다운했을시 이벤트가 동작한다
		});
	},

	////////// Make Method for Request animation frame
	run: function (self) {
		// 위에 init keydown 이벤트에 연결됨. 좌방향키 클릭시 랜덤한 숫자(self.spped)만큼 빼줘서 왼쪽으로 움직이게 한다
		if (self.direction == "left") {
			self.xPos -= self.speed;
		} else if (self.direction == "right") {
			self.xPos += self.speed;
		}
		// 캐릭터 이동 범위 정하기 Xpos 2~88 사이에서 움직이게하기
		if (self.xPos < 2) {
			self.xPos = 2;
		}
		if (self.xPos > 88) {
			self.xPos = 88;
		}

		// 현재 클릭 한 지점을 %붙여 CSS에 입력해주기
		self.mainElem.style.left = self.xPos + "%";

		// 전진 3D 스크롤 23
		// 위에 애를 반복시키기 (프레임 없이 부드럽게 보이기 위해)
		// requestAnimationFrame(self.run);
		/////////////
		// requestAnimationFram : 프레임을 부드럽게 반복해주기 위해 (반복되는 속도 업)
		// requestAnimationFram은 호출방법에 따라 this를 초기화 시켜 window전역개체를 가르키게 한다.
		// 리퀘스트 속성은 숫자값을 return한다 (위에 키이벤트로 누르고 있으면 계속 반복된다)
		self.rafId = requestAnimationFrame(function () {
			// init에 있는 run 매개변수로 init의 self(this)를 전달하여 this를 살리는 방법 , 이 방법말고 bind방법이 있다
			self.run(self);
			// 우리의 의도와 다르게 바뀌어버린 this 대신 다른 변수(self)를 사용해야 하는데,
			// 그 변수를 활용하기 위해 다른 메서드의 self를 가져와서 쓴다. 위에 run 메쏘드에 매게변수에 담아둔걸 쓴다
			//  그러기 위해 self를 사용할 run 메서드의 매게변수를 self를 넣어준다."
		});
	},
};
