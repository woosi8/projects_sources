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
	this.init();

	// 스크롤 중인지 아닌지 체크하는 변수
	this.scrollState = false;

	// 바로 이전(마지막) 스크롤 위치
	this.lastScrollTop;

	// 캐릭터 이동 되게 해주기
	this.speed = info.speed; //속도 조절값 (랜덤으로 주기위해 벽 자바에서 스피드를 랜덤으로 준다)
	this.mainElem.style.left = info.xPos + "%";
	this.xPos = info.xPos; //xPos를 갱신해줘서 값을 계속 변화시켜주기위해
	this.direction; // run method에서 왼쪽인지 오른쪽인지 방향 알게 해주기

	// 좌우 이동 중인지 아닌지 (키중복 막기위함)
	this.runningState = false;
	// 키업에서 캔슬해주기위해서 리퀘스트 리턴숫자값을 저장하는 속성
	this.rafId;
}

//////// 생성자함수 constructor function for common working
Character.prototype = {
	constructor: Character,
	init: function () {
		// Init : 스크롤 이벤트 -  1. 스크롤시 캐릭터에 러닝 붙여주고 멈추면 제거해줘서 움직이게 하기.
		// Init : 스크롤 이벤트 - 2. 앞으로 스크롤, 뒤스크롤시 캐릭터 방향 결정
		// Init: 키입력 이벤트 -  1. 키 왼쪽, 오른쪽 입력시 방향에 맞게 움직이게 하고, 키를 뗴면 멈추게 하기

		// this를 다른함수에 넣어놓는 이유 : window이벤트에서는 this가 window전역을 가르키기 떄문에, 여기서 우리가 원하는 this는 캐릭터에 this다
		const self = this;
		window.addEventListener("scroll", function () {
			//   1. 실행 -Settimeout을 취소시켜주는 명령어
			clearTimeout(self.scrollState);

			//  2. 처음에만 실행된다. 왜냐면 뒤따라오는 다음 SetTimeout에서 scrollState에 숫자가 계속 리턴되어서 참이되므로
			if (!self.scrollState) {
				self.mainElem.classList.add("running");
			}
			self.scrollState = setTimeout(function () {
				// 3. 0.5초 후에 실행되는것이라서 스크롤중일때는 0.5초에 멈추는 시간이 없어서 마지막 멈출때에 비로서 한번 실행된다
				self.scrollState = false; //멈춘상태
				self.mainElem.classList.remove("running");
			}, 500);

			// 캐릭터 앞뒤 설정 : 현재보다 큰 값인지 작은값인지로 판단 가능
			// Check 이전 스크롤 위치(self.lastScrollTop) VS 현재 스크롤 위치(pageYOffset)
			// 현재보다 이전 스크롤 위치가 더 크면 스크롤 업한거다
			if (self.lastScrollTop > pageYOffset) {
				// 이전 스크롤 위치가 크다면 : 스크롤 올림
				self.mainElem.setAttribute("data-direction", "backward");
			} else {
				// 현재 스크롤 위치가 크다면 : 스크롤 내림
				self.mainElem.setAttribute("data-direction", "forward");
			}
			self.lastScrollTop = pageYOffset; // 마지막으로 스크롤한 위치(pageYOffset)을 lastScrollTop에 넣어줘서 마지막 이전 스크롤 값이 되게한다
			//  : 즉 현재가 이전 스크롤 위치가 됨
		});

		////////// KEY Event
		window.addEventListener("keydown", (e) => {
			// 키 중복 막기위한 이프문 (첫번째는 false니깐 그냥 통과해서 실행되고 두번쨰부터는 아래 true를 줘서 트루가 되서 리턴해서 아래 기능들을 멈춰준다)
			if (self.runningState) return;

			if (e.keyCode == 37) {
				// left
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
			cancelAnimationFrame(self.rafId); // 중첩방지 : 키를 뗏을때 리퀘스트 애니메이션때문에 자동으로 쭉 가나는 캐릭터를 잡아주기위함
			self.runningState = false; // false로 다시 해줘야지 위에 키 다운 이벤트가 동작한다
		});
	},
	////////// Make Method for Request animation frame
	run: function (self) {
		// 위에 init keydown 이벤트에 연결됨. 왼쪽버튼시 랜덤한 숫자만큼 빼줘서 움직이게 한다
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

		// 현재 클릭 한 지점 %로 나타난 값을 %붙여 CSS에 입력해주기
		self.mainElem.style.left = self.xPos + "%";

		// 위에 애를 반복시키기 (프레임 없이 부드럽게 보이기 위해)
		// requestAnimationFrame(self.run);
		// requestAnimationFram은 this를 초기화 시켜 window전역개체를 가르키게 한다.
		// 리퀘스트 속성은 숫자값을 return한다
		self.rafId = requestAnimationFrame(function () {
			// 함수의 매개변수로 전달하여 this를 살리는 방법
			self.run(self);
			// 우리의 의도와 다르게 바뀌어버린 this 대신 다른 변수(self)를 사용해야 하는데,
			// 그 변수를 활용하기 위해 다른 메서드의 self를 가져와서 쓴다-
			//  그러기 위해 self를 사용할 메서드의 인자로 self를 넣어준다."
		});
	},
};
