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
  // 메쏘드 함수 실행시켜주기
  this.init();
  // 스크롤 중인지 아닌지 체크하는 변수
  this.scrollState = false;
  // 바로 이전(마지막) 스크롤 위치
  this.lastScrollTop;

  // 캐릭터 이동 되게 해주기
  this.speed = 1; //속도 조절값
  this.xPos = info.xPos; //xPos를 갱신해줘서 값을 계속 변화시켜주기위해
  this.direction; // run method에서 왼쪽인지 오른쪽인지 방향 알게 해주기
}

///////////////// 클래스를 상황에 따라 넣고 빼는건 동작 (함수) method
// 객체에 인스턴스 객체가 공통으로 사용하는 속성이나 메쏘드는 프로토타입 객체에 만든다
Character.prototype = {
  // constructor 해주는 이유는 프로토타입에 기본적으로 있는 속성인데
  // 여기서는 prototype을 재정의 해주는 것이라서 원래 가지고 있는 컨스트럭터 속성을 만들어 준다
  //   아래 예시 참고
  constructor: Character,
  init: function () {
    // this를 다른함수에 넣어놓는 이유 : window이벤트에서는 this가 window전역을 가르키기 떄문에, 여기서 우리가 원하는 this는 캐릭터에 this다
    const self = this;
    // window.addEventListener("scroll", function () {
    //   self.mainElem.classList.add("running");
    // });
    window.addEventListener("scroll", function () {
      //////////////// setTimeout에 안에 (숫자리턴값까지)값들을 취소시킨다 (그래서 0.5전에 계속 스크롤이 되면 셋타임아웃은 실행이안됨)
      // 첫번째 실행에서는 아무런 효과가 없다. 왜냐면 첫번째 순서로 와있기 때문에 클리어 해줄게 없다
      clearTimeout(self.scrollState);

      //   이 부분이 한번만 실행되는 이유는 아래 scrollState = setTimeout 리턴값은 들어간다. 0.5후와 상관없이
      //  그래서 한번 실행한 다음 scrollState에 숫자가 들어가서 false가 아니게 되서 실행이 안된다
      //  두번째부터 실행안되는 이유는 아래 셋타임아웃에서 scrollstate에 계속 숫자를 리턴해주기 때문에 true가 되기때문이다
      if (!self.scrollState) {
        self.mainElem.classList.add("running");
      }
      //settimeout은 숫자를 리턴해준다 (여기선 그 값을 scrollstate에 넣어준다)
      // Settimeout을 해주는 이유는 빈번히 실행되는 이벤트 실행중에는 멈춰있다가 마지막에만 실행되도록 하기위함
      self.scrollState = setTimeout(function () {
        // 스크롤 하는 중에는 실행이 안된다 . 위에 clear때문에
        // 마지막 턴에서야 비로서 0.5초후에 실행된다
        self.scrollState = false; //멈춘상태
        self.mainElem.classList.remove("running");
      }, 500); // 0.5초 기다렷다가 실행이 되야 하는데 스크롤하는 중에는 계쏙 스크롤 이벤트가 발생해서
      //   clear가 계속 되어서 스크롤중에는 실행이 안된다가, 마지막에 스크롤을 멈추고 0.5후에 실행된다
      //실제 순서 1. if문 2. setTime return 3. cleartimeout(setTime return값은 못건드는듯) 4. 마지막에 setTiemout function 한번 실행

      //////////////// 캐릭터 앞뒤 설정 : 현재보다 큰 값인지 작은값인지로 판단 가능
      console.log(pageYOffset);
      // 이전 스크롤 위치(self.lastScrollTop) VS 현재 스크롤 위치(pageYOffset)
      // 현재보다 이전 스크롤 위치가 더 크면 스크롤 업한거다
      if (self.lastScrollTop > pageYOffset) {
        // 이전 스크롤 위치가 크다면 : 스크롤 올림
        self.mainElem.setAttribute("data-direction", "backward");
      } else {
        // 현재 스크롤 위치가 크다면 : 스크롤 내림
        self.mainElem.setAttribute("data-direction", "forward");
      }
      self.lastScrollTop = pageYOffset; // 마지막으로 스크롤한 위치 저장 : 즉 이전 스크롤 위치가 됨
    });

    // KEY Event
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 37) {
        // left
        self.direction = "left";
        self.mainElem.setAttribute("data-direction", "left");
        self.mainElem.classList.add("running");
        self.run(self);
      } else if (e.keyCode == 39) {
        // right
        self.direction = "right";
        self.mainElem.setAttribute("data-direction", "right");
        self.mainElem.classList.add("running");
        self.run(self);
      }
    });
    window.addEventListener("keyup", (e) => {
      self.mainElem.classList.remove("running");
    });
  },
  // Make Method for Request animation frame
  run: function (self) {
    if (self.direction == "left") {
      self.xPos -= self.speed;
    } else if (self.direction == "right") {
      self.xPos += self.speed;
    }
    // left로 방향 지정
    self.mainElem.style.left = self.xPos + "%";
    // 위에 애를 반복시키기 (프레임 없이 부드럽게 보이기 위해)
    // requestAnimationFrame(self.run);
    // requestAnimationFram은 this를 초기화 시켜 window전역개체를 가르키게 한다.
    requestAnimationFrame(function () {
      self.run(self);
      // 우리의 의도와 다르게 바뀌어버린 this 대신 다른 변수(self)를 사용해야 하는데, 그 변수를 활용하기 위해 다른 메서드의 self를 가져와서 쓴다- 그러기 위해 self를 사용할 메서드의 인자로 self를 넣어준다."
  },
  //  this를 살리는 다른 방법 bind
  // blind(this)기능 : 호출 방법과 관계없이 특정 this를 호출되는 함수를 만든다
  // run: function () {
  //   const self = this;
  //   if (self.direction == "left") {
  //     self.xPos -= self.speed;
  //   } else if (self.direction == "right") {
  //     self.xPos += self.speed;
  //   }
  //   // left로 방향 지정
  //   self.mainElem.style.left = self.xPos + "%";
  //   // blind(this)기능 : 호출 방법과 관계없이 특정 this를 호출되는 함수를 만든다
  //   requestAnimationFrame(self.run.bind(self));
  // },


  
};

// Character.prototype.xxxx = function name(params) {

// }
