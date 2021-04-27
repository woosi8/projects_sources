// 숫자 나열하기
let options = Array(45)
  .fill()
  .map((elem, index) => {
    return index + 1;
  });

console.log(options)



// 짝수 구해서 더하기
let sum = 0;

for (let i = 1; i <= 100; i++) {
  if (i % 2 == 0) {
    sum += i;
  }
}
console.log(sum)

// 홀수 짝수 함수
function solution(num) {
  return (num % 2) ? "Odd" : "Even"; //2로 나누기 하고 나머지 값이 있으면 홀수, 나머지가 없으면 짝수
}
function isEven(value) {
  if (value % 2 == 0)
    return true;
  else
    return false;
}

// 홀수,짝수 배열만들기
const arr = [1, 2, 3, 4, 5];
const arr2 = arr.filter(number => number % 2 === 0);
const arr3 = arr.filter(number => number % 2 !== 0);
console.log(arr2);
console.log(arr3);

// 숫자 합하기
let sum = 0;
for (let i = 1; i <= 100; i++) {
  sum = sum + i;
}

document.writeln(sum);



1. 이벤트 위임이란 ?
  하위 이벤트가 발생되면  버블링되서 부모에게 가는것

2. this란 ?

  메쏘드의 this는 객체를 가리킨다
함수가 단순히 실행되면 전역개체를 가리킨다
화살표 함수는 함수를 둘러싼 scope의 this

3. 프로토타입 상속 ?
  어떤 속성이 객체내 있으면 사용하고, 없으면 프로토타입 객체에서 찾는다.

6. null, undefined
널은 명시적 값,
  언디파인드는 선언만 하고 값이 없는것

7. 클로져랑 ? closure ?
  함수안에 선언된 변수를 리턴시켜 밖에 노출시켜 접근가능하게 하는것

9. foreach, map 차이 ?
  foreach 는 배열의 요소로 순환.값을 리턴안함
map은 배열의 요소를 순환 값을 리턴함
두개 모두 원본 배열값을 바꾸지 않는다.

10.익명함수 ?
  다른곳에서 참조할 일이 없을때
콜백으로서의 함수는 재사용하지 않는 경우가 대부분이다.콜백이 사용되는 위치에 직접 선언하는 편이 더 가독성이 높다.

13. Function.prototype.bind에 대해 설명하라
한줄 답변: this 키워드가 지정된 새 함수를 만든다.
클래스의 메소드가 비동기적으로 실행되거나, DOM의 이벤트 핸들러(ex.onClick)로 할당되면 this가 유지되지 않고 사라진다.
bind를 사용해서 this를 명시적으로 바인딩하거나 화살표 함수를 사용해야 한다.
메소드를 선언할 때 화살표 함수를 사용하면 this를 바인딩하지 않아도 된다.
화살표 함수 코드가 작성된 곳의 this를 사용한다.

16. Ajax에 대해 가능한 자세하게 설명하라
한줄 답변: 비동기 데이터 통신, 동적인 웹 컨텐츠 제공을 위한 기술
현재 표시중인 있는 화면에 영향을 주지 않고 서버에 비동기적으로(백그라운드에서) 데이터를 보내고 받을 수 있다
서버에서 가져온 컨텐츠를 페이지 새로고침 없이 보여줄 수 있다.
  단점: 자바스크립트가 허용되지 않은 페이지에서는 동작하지 않는다.
느린 접속 속도와 낮은 스펙을 가진 모바일 기기에서는 페이지 표시에 어려움을 겪을 수 있다.

20. hoisting에 대해서 설명하라
한줄 답변: 같은 스쿠프라면 아래쪽 줄에 있는 변수를 윗줄에서 참조 가능하도록 하는 자바스크립트의 특징.하지만 변수에 할당된 값은 알려주지 않는다.






