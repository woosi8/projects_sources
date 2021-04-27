  (function() {
    const useragent = window.navigator.userAgent.toLowerCase();
    if (useragent.indexOf('chrome') < 0 && useragent.indexOf('safari') < 0) {
      document.body.style.cssText = 'height: auto';
      document.body.innerHTML =
        '<p style="padding: 20px; line-height: 1.6">본 예제는 Full CSS 3D가 사용된 페이지로, webkit 기반 브라우저(크롬, 사파리 등)에서 확인하며 학습하시는게 좋습니다.<br>CSS 3D 부분 외에는 브라우저 상관없이 인터랙티브 웹 페이지 개발을 위해 필수적이고 유용한 내용들을 다루고 있으니 꼭 처음부터 끝까지 공부해 보세요! :)</p>';
    }


    const houseElem = document.querySelector('.house');
    let maxScrollValue;
    const barElem = document.querySelector('.progress-bar');
    const mousePos = {x: 0,y: 0};
    const stageElem = document.querySelector('.stage');
    //버튼 이벤트 위임
    const selectCharacterElem = document.querySelector('.select-character');


    // 1 창 크기에 맞춰서 크기재조정하기
    function resizeHandler() {
    // 최대 스크롤할 수 있는 높이 = 전체 높이 - 현재띄어논 창 높이
    // (스크롤바 마지막 머리까지) =
      maxScrollValue = document.body.offsetHeight - window.innerHeight;
    }


    //2 스크롤해서 창 움직이게 하기
    window.addEventListener('scroll', function() {
                  //  스크롤바의 offset /
      const scrollPer = pageYOffset / maxScrollValue;
      barElem.style.width = scrollPer * 100 + '%';
      const zMove = scrollPer * 980 - 490;
      houseElem.style.transform = 'translateZ(' + zMove + 'vw)';
    });



    //3 마우스 이동하는 곳으로 창 기울기
    window.addEventListener('mousemove', function(e) {
      mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
      mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
      stageElem.style.transform = 'rotateX(' + (mousePos.y * 5) + 'deg) rotateY(' + (mousePos.x * 5) + 'deg)';

    })


    // 1 창 크기에 맞춰서 크기재조정하기
    window.addEventListener('resize', resizeHandler);
    resizeHandler();





    // 1 stgae에 append차일드를 붙여서 클릭하는 곳에 캐릭터가 나타나게 하기
    stageElem.addEventListener('click',function (e) {
      //  2퍼센트로 변환해서 캐릭터 엘리먼트에 %값으로 들어가게 하기
      //  innerWeight가 전체폭 100%이니깐 분에 클라이언트엑스
      // console.log(e.clientX/window.innerWidth *100);


      // 이런 식으로 매개변수 자리에 xPos의 정보를 가진 객체(Object)를 인자로 넣어서 생성자를 호출하게 되는데
      // 바로 이 때 만든 객체가 Chracter.js안에 function Character(info)로 들어가는것
       new Character({
        //  3 xPos객체에다 넣어주기. 아래 계산값을 바로 생성자에 안넣어주고 객체의 속성을 넣어준다.
        // 왜냐면 여기다가 기능을 추가하기 용의하게 >>4 js 생성자 고치기
        xPos: e.clientX/window.innerWidth *100,
        speed: Math.random()*0.5
        // speed: Math.random() * 0.5 + 0.2

        //움직임 속도 랜덤으로 주기

       });

    });

  // 생성자 호출이라 new 가 붙는다. 여기서 호출해야 생성자로 인스턴스가 생성되니깐
  // 그리고  캐릭터 스크립트는 여기 스크립트보다 먼저 넣어줘야 한다. 그래야 불러오지 여기에
  // new Character();


  //캐릭터 버튼
  selectCharacterElem.addEventListener('click',function (e) {
    const value = e.target.getAttribute('data-char');
  document.body.setAttribute('data-char', value);

  })

  })();
