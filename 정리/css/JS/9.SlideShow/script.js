//////******먼저 해야할것 CSS ul,li 에 absolute지정 되어있어야한다
//////****** ul에 animated도 추가해줘야함


//**1 변수 지정
const sliderWrapper = document.querySelector('.container')
const sliderContainer = document.querySelector('.slider-container')
const slides = document.querySelectorAll('.slide')
//슬라이드의 개수
const slideCount = slides.length;
//처음 끝 화살표 없애기 위한 변수지정(슬라이드 번호확인)
let currentIndex = 0;
//슬라이드 가장 높은 높이를 가진 요소를 가져오게 하기위한 변수
let topheight = 0;
//좌우 버튼 (아이디 prev)
let navPrev = document.querySelector('#prev');
//좌우 버튼 (아이디 next)
let navNext = document.querySelector('#next');



//**2  슬라이드의 높이 확인하여 부모의 높이로 지정하기
//슬라이드중에 높이가 가장 높은것 구하기(요소높이) - 반복문
//함수지정,할일
function calculateTallestSlide() {

  //topheight 구해오기 반복문
  for (var i = 0; i < slideCount; i++) {
    if (slides[i].offsetHeight > topheight) {
      //위에서 탑하이트값을 0으로 이미 정했기때문에 slides첫번째 offsetHeight값은 당연히 0보다 크니깐 그 값이 초기값이 되고 나머지 순서에 따라 다른 값들과 비교해서 가장 큰값이 남게된다
      topheight = slides[i].offsetHeight;
    }
  }

  //변수를 클래스명으로 가져왔기때문에 배열이라 첫번째0라고 지정을 해줘야 한다 ????에러나는데 .알았다. query로 안가져왔을때
  //container,slider-container에다가 list중에 가장 높은 높이값을 높이로 주기위해 두개 를 가져온다
  // sliderWrapper[0].style.height = topheight + 'px';
  sliderContainer.style.height = topheight + 'px';
  sliderWrapper.style.height = topheight + 'px';
  // 슬라이드 컨테이너에만 주면 안되고 부모인 컨테이너랩퍼까지 줘야한다

}
calculateTallestSlide();

//**3  (겹쳐있는)슬라이드 가로로 순서대로 배열하기
function slideLeft() {
  for (var i = 0; i < slideCount; i++) {
    //슬라이드가 부모인 container 기준으로
    // left 0부터 100%씩 이동해야 하니깐
    slides[i].style.left = i * 100 + '%';
  }

}
slideLeft();

//**4 슬라이드 이동 함수 : 버튼을 클릭하면 슬라이드 current 번호에 -100을 곱해서 해당 위치로 가게끔한다
//              매게변수값이 있어야함 (번호를 매겨야하니깐)
function goToSlide(idx) {
  //부모를 왼쪽으로 -100%씩 옮겨서 자식 list가 순차적으로 나오게 하는 것이기에 여기선 left -100씩
  sliderContainer.style.left = idx * -100 + '%';
  //이 값이 있어야하는 이유는 슬라이더가 어느 인덱스에 가있는지 현재 currentindex번호 확인을 위해
  currentIndex = idx;
  //트랜지션 효과를 주기위해 클래스 추가하기
  sliderContainer.classList.add('animated');

  //6 처음,마지막인지 구분을 하고 버튼 사라지게 하는 함수 추가
  // updateNave(); (첫번째 화면에 이전버튼 발생여부 선택할수있다)
  // 8 마지막은 이전,다음 버튼이 사라지지 않고 클릭시 처음으로 마지막으로 이동하게 롤링되게하기
}

//** 8 버튼기능 업데이트 함수

// function updateNav() {
//   //슬라이드 처음일때
//   if (currentIndex == 0) {
//     navPrev.classList.add('disabled')
//   } else {
//     navPrev.classList.remove('disabled')
//   }
//   //슬라이드 마지막일때 슬라이드갯수6 인데 마지막 슬라이드 번호는 5번이니 -1해준다. 0부터 시작이니깐
//   //                  숫자만 쓰면 안된다. 왜냐면 추가되면 반응할수가 없다
//   if (currentIndex == slideCount - 1) {
//     navNext.classList.add('disabled')
//   } else {
//     navNext.classList.remove('disabled')
//   }
//
//
// };



//** 5 버튼을 클릭하면 슬라이드 이동시키기
// 다음,이전 클릭시 currentIndex값에 1씩 증가,감소하는 값을 goToSlide에 넘겨주기
navPrev.addEventListener('click', function(event) {
  event.preventDefault();
  // 8 처음이 아니라면 이전으로 이동,
  // goToSlide(currentIndex - 1);
  // 처음이라면 끝으로 가야한다
  if (currentIndex != 0) {
    goToSlide(currentIndex - 1);
  } else {
    goToSlide(slideCount - 1);
  }
})

navNext.addEventListener('click', function(event) {
  event.preventDefault();
  // goToSlide(currentIndex + 1);
  if (currentIndex < slideCount - 1) {
    goToSlide(currentIndex + 1);
  } else {
    // 끝으로 가면 0으로 돌아가게 하기
    goToSlide(0);
  }
})

//** 7 첫번째 슬라이드 먼저 보이도록 하기
// 이게 없으면 첫번째인지 구분 못하고 이전버튼이 생겨있다
// 페이지 열자마자 페이지가 처음인제 끝인지 확인하는 함수 updateNave고
// updateNave는 gotoslide에 물려있고 페이지 열자마자 gotoslid가 작동해서
// upsdatave()를 실행하면 아래 0값을 줬으니 0이되서 updateNave의 if 0을 충족해서 disabled 발생
goToSlide(0);
