 

// var 함수는 Block scope{}에 영향을 안미친다 .옛날거라
// 기존의 scope은 자신의 스코프에 없으면 상위 스코프에서 찾는다



// hoisting (TDZ) 임시 사망지역 temporary dead zone

(function () {
  var a = 10;
  (function () {
    console.log(a);  //undefined
    var a=20;
    }) ();
    console.log(a); // 10 ,이 나온 이유는 var
  }) ();
  console.log(a);   // a is not defined

  1.기존 var에서는 hoisting호이스팅 :
    1) 변수명만 위로 끌어올리고
    2) undefined를 할당한다


  (function () {
    let a = 10;
    (function () {
      console.log(a);  // reference Error : a is not defined.
      const a=20;
      }) ();
      console.log(a); //
    }) ();
    console.log(a);   //
    // 호이스팅
  2.let,const:
    1)변수명만 위로 끌어올리고/끝

----------------------------------------------------------
    1 함수선언문 function declaration
    function a() {
      return 'a';
          }
    2 기명 함수표현식 named function expression
    var b = function bb() {
      return 'bb';
    }
    3 (익명)함수표현식 function expression //요즘에는 3번을 주로 쓴다
    var c = function () {
      return 'c';
    }


    콜백함수는 메쏘드가 아니다
    메소드 호출      obj.longValues(1,2); 여기서 obj는 this로 간다
    콜백함수로 전달  arr.forEach(obj.logValues); 여기서는 콜백으로 넘기기때문에 obj가 참조하는 콜백함수만 전달한다.
                                                그래서 이때는 this가 정의되지 않아서 window로 출력된다
