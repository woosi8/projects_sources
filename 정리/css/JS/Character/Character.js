        // 4 info 객체 넣어주기 레프트에 엑스위치값을 주기위해\
        // info란 생성자가 호출될때 매게변수 자리에 인자로 들어오는 정보를 담고잇는 객체
        //
        // 생성자함수라서 앞에 C를 대문자로 해줌
function Character(info) {
      //div를 만드고 그안에 캐릭터까지 생성
      // html에서 캐릭터 클래스를 가진 부모 div 생성, 변수에 넣는게 아니라 this로 넣어준다.
      //  왜냐면 캐릭터 생성자를 통해서 만들어낼 인스턴스 객체의 속성으로 쓰겠다는 뜻으로
      this.mainElem = document.createElement('div');
      // css에 chracter 클래스 특성 추가
      this.mainElem.classList.add('character' );
      //  mainElem은 <div class="character"></div>가 되겠지요.


      // 새로운 자바스크립트 버젼
      // this.mainElem.innerHTML =  이안에 막 넣어주면 된다. `<div> <div> </div></div> `

      this.mainElem.innerHTML = '' //아래 부터 시작하기 위해서 그냥 빈문자를 넣어줌.
      // +가 없으면 한줄로 쓴거랑 마찬가지이다. 보기좋게 하기위해 +붙여줌


      + '<div class="character-face-con character-head">'
          + '<div class="character-face character-head-face face-front"></div>'
          + '<div class="character-face character-head-face face-back"></div>'
      + '</div>'
      + '<div class="character-face-con character-torso">'
          + '<div class="character-face character-torso-face face-front"></div>'
          + '<div class="character-face character-torso-face face-back"></div>'
      + '</div>'
      + '<div class="character-face-con character-arm character-arm-right">'
          + '<div class="character-face character-arm-face face-front"></div>'
          + '<div class="character-face character-arm-face face-back"></div>'
      + '</div>'
      + '<div class="character-face-con character-arm character-arm-left">'
          + '<div class="character-face character-arm-face face-front"></div>'
          + '<div class="character-face character-arm-face face-back"></div>'
      + '</div>'
      + '<div class="character-face-con character-leg character-leg-right">'
          + '<div class="character-face character-leg-face face-front"></div>'
          + '<div class="character-face character-leg-face face-back"></div>'
      + '</div>'
      + '<div class="character-face-con character-leg character-leg-left">'
          + '<div class="character-face character-leg-face face-front"></div>'
          + '<div class="character-face character-leg-face face-back"></div>'
      + '</div>';

      //2 stage 자식으로 house 형제로 들어가야 한다. 스테이지에 캐릭터를 붙여 넣어준다.
      //    스테이지를 불어오고 어팬드 차일드로 메인요소를 붙여준다.
    document.querySelector('.stage').appendChild(this.mainElem);

    //5 left값에 주기. left에서 퍼센트 값으로 측정 하니깐. 현재는 css캐릭터에서 left값이 12%로 고정이다.
    this.mainElem.style.left = info.xPos + '%';

    //18 캐릭터가 만들어지는 순간에 만들어 져야한다. init이 아래에서 만든 초기화 함수니깐
    // 스테이지에 init 실행
    this.init();


    // 스크롤 멈추면 러닝 클래스 제거해서 가만히 서있게 하기
    // /////////3D 20강의
    // 스크롤 중인지 아닌지 체크하는 변수, 처음 생성했을떄는 스크롤 안했을때니깐 false 지정 or 안해도 undefined라서 안줘도 된다.
    // 이 변수가  true가 되면 런닝 클래스가 붙게 한다.
    this.scrollState = false;


    //바로 이전(마지막) 스크롤 위치
     this.lastScrollTop = 0 ;


    //움직이는 속도 주기 (랜덤으로 줘서 겹치지 않게하기)
    this.speed = info.speed;

    //객체의 속성으로 등록해서 각 객체의 속성이 생긴겨라서 접근하기 용이하다
    this.xPos = info.xPos;

    // 리퀘스트 애니메이션
    this.direction;

    // 좌우 이동 중인지 아닌지 판별
    this.runningState = false;
    this.rafId;
}


Character.prototype = {
  constructor: Character,
  init: function () {

    // 여기에 this를 정의 해줌으로써 this가 mainElem에 접근이 된다.
    // 아래 이벤트 핸들러에 그냥 this를 주면 그 this값은 window를 가르킨다
    const that = this;
    window.addEventListener('scroll',function () {
      //3 셋타임아웃이랑 세트다. 셋타임아웃에 들어오는 번호에 해당하는 셋타임아웃을 클리어 취소 해준다.
      //  즉 스크롤 하자마자 바로 클리어한다.  스크롤을 하는동안은 scrollState는 계속 클리어된다. 0.5초 후에 실행이기떄문에 발생시간요건을 못채우니깐.
      //  스크롤을 멈추면 clearTimeout이 실행이 안되니깐 마지막 턴에서야 scrollState가 실행된다.
      //  즉 스크릴 움직일동안에는 계속 클리어되고 멈추면 0.5초 후에 scrollState가 발생한다.
      clearTimeout(that.scrollState);


      // if문은 처음 스크롤했을때 생성함수에서 false로 정의되어있으니깐 false니깐 실행이 되고, 그 다음에 아래scrollstate  값이
      // 셋팅되서 that가 트루가 되서 거짓이므로 실행 이 안됨. 스크롤이 멈추고 scrollState실행이 될때 다시 참이 되서 실행된다.
      if (!that.scrollState) {
         that.mainElem.classList.add('running');
         console.log('running 클래스 붙었음');
      }

      //1 목적은 빈번히 일어나느 스크롤 이벤트에서 정말 필요할때 1번만 효율적으로 실행하게 하는것.
      //1 setTimeout은 숫자를 리턴한다. 그걸 scrollState에 넣었으니 위에 if문에서는 거짓으로 실행이 안된다.
      //1 그래서 if문은 실행이 안된다. 0.5초 동안만. 0.5초후에 that.scrollState = false; 실행되니깐
      //위에 if문은 다시 참이 되서 실행된다.

      that.scrollState = setTimeout (function () {
          that.scrollState = false;
          that.mainElem.classList.remove('running');
      },500);
       //2 0.5초 후에 scrollState에 false가 작동되니 위에 !합쳐서 트루가 되면서 if가 실행된다.
      // 스크롤을 하는동안


      /////////3D 18강의
      /////////
      /////////
      // 러닝 클래스를 동작에 따라 넣고 빼고 하는 것은 함수.
      // 캐릭터 객체에 매쏘드로 만든다. 생성자가 공통으로 사용하는 메쏘드는 프로토타입 객체에 만든다.
      // 나중에 수정이나 추가 하기 용이하다.
          /////////
          //생성자 객체 생성 (1 방법) : 프로토타입 재설정, 그래서 원래 갖고있는 컨스트럭터 속성을 다시 만들어줘야 한다.
          //객체
           // Character.prototype ={}
             // 프로토타입객체에 기본적으로 컨스트럭터 속성이 있는데 그게 가리키는게 생성자다.
             // 원래 갖고있는 컨스트럭터 속성을 아래처럼 다시 지정해줘야 한다.
             // constructor : Character,
             // (1 방법) 여기서부터 우리가 넣고싶은 메소드를 추가하면된다.
             // 이런식으로 xxxx:function () {}


           //생성자 객체 생성 (2 방법) : 추가하기. 프로토타입 객체 자체를 없앤개 아니라  xxxx 매쏘드를 추가한것 뿐이다.
           // Character.prototype.xxxx= function () {}


          //  완성본
          // Character.prototype = {
          //   constructor : Character,
          //   // init 초기화 해준다는 의미
          //   init : function () {
          //         // 아래에서 this가 window를 가르키게 되니깐 this를 셀프로 설정해서 아래 디스자리에 셀프를 넣어준다. ex)this.mainElem.classList.add >>that.mainElem
          //         // 여기서 this는 character를 가르키게 된다. 우리가 의도한바다.
          //       const self = this;
          //       window.addEventListener('scroll',function () {
          //         //지금 이상태에서this는 window를 가르키게 된다.
          //         // 이 this 자체를 다른 변수에 넣어주면된다 .사전에 현재 스크롤 이벤트 핸들러 밖에서 만들어주면 된다.
          //         self.mainElem.classList.add('running');
          //       })
          //   }
          // };






      //  3D 스크롤 21 - 스크롤 이동시 캐릭터 앞뒤 방향 맞춰주기
      //
      //
      //  이전 스크롤값위치와  현재 스크롤위치를 비교
      //  전 스크롤 값 >>>>현재 스크롤값 = 스크롤 올림
      // 현재 스크롤값 >>>>전 스크롤 값 = 스크롤 내림
      //
      //
      //                     여기서 pageYOffset값은 아래 값이랑 다르게 현재값이다.
      if (that.lastScrollTop>pageYOffset) {
          //character에 data direction 값을 가져와야 하니깐 mainElem을 불러온다
          that.mainElem.setAttribute('data-direction','backward');

          // 이전 스크롤 위치가 크다면 : 스크롤 올림  (css:backward)

      } else {
        that.mainElem.setAttribute('data-direction','forward');
        // 현재 스크롤 위치가 크다면 : 스크롤 내림 (css:forward) (캐릭터가 다가오는것)
      }

      //lastScrollTop 값에 이전 오프셋(여기) 값을 넣어주기 위해서.
      that.lastScrollTop = pageYOffset;

    });



          //  3D 스크롤 22 - 좌우로 움직이기, 키보드 이벤트 활용
          //  keycode.info , 키값 확인하기 여기선 37왼쪽,39오른쪽
          window.addEventListener('keydown',function (e) {
              // 러닝스테이트가 트루라면 리턴
              // 키 다운 반복 없애기위함 . 키를 누르고 있더라도 한번만 실행되는게 필요
              //
              if (that.runningState) return;

              if (e.keyCode == 37) {
                // 프레임 값 주기위해서 따로
                that.direction = 'left';
                that.mainElem.setAttribute('data-direction','left');
                that.mainElem.classList.add('running');
                that.run(that);
                //마지막에 트루로 나가게 되면서 러닝스테이트를 리턴한다.
                that.runningState = true;

                // 이 방법은 프레임설정이 안되서 캐릭터 움직임이 느리다
                // // that.xPos = that.xPos - that.speed; 축약형
                // // 스피드 만큼 계속 뺴주자 -1(spped)씩
                // that.xPos -= that.speed;
                // //위에서 갱신된 값을 이용해서  레프트값을 재조정해준다.
                // that.mainElem.style.left = that.xPos + '%';

              } else if(e.keyCode == 39) {
                that.direction = 'right';

                that.mainElem.setAttribute('data-direction','right');
                that.mainElem.classList.add('running');
                that.run(that);
                that.runningState = true;

              }
          });


          //  3D 스크롤 23 - 키를 똈을때 멈추게하기 , 이동하기

          window.addEventListener('keyup', function (e) {
            that.mainElem.classList.remove('running');
            cancelAnimationFrame(that.rafId);
            that.runningState = false;
          });

  },

  // init 메쏘드가 아닌 런메쏘드를 따로 만들어 준다
  run : function (that) {

    if (that.direction =='left') {
      that.xPos -= that.speed;
    } else if (that.direction == 'right') {
      that.xPos += that.speed;
    }

    // console.log(that.xPos);
    // 캐릭터 이동 한계 정해주기 (범위 제한)
    if (that.xPos<2) {
     that.xPos = 2;
    }
    if (that.xPos>88) {
     that.xPos = 88;
    }

   that.mainElem.style.left = that.xPos + '%';
   that.rafId = requestAnimationFrame(function () {
     that.run(that);

   });
  }
};
