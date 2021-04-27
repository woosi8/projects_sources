const 바디 = document.body;

let 숫자후보, 숫자배열;
function 숫자뽑기() {
	숫자후보 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	숫자배열 = [];

	for (let index = 1; index < 5; index++) {
		// let 뽑은것 = 숫자후보.shift();
		// let 뽑은것 = 숫자후보.pop();
		//splice는 [배열,배열,배열]로 반환하기 때문에 배열에 첫번째값이 반복해서 필요하니  [0]을 자정해서
		//배열이 아닌 값으로 나오게 , 그리고 4번 반복해서 4자리 숫자를 뽑는것이다
		let 뽑은것 = 숫자후보.splice(
			Math.floor(Math.random() * (10 - index)), //뽑힌숫자는 숫자후보에서 빠지기 떄문에 그자리를 다시 뽑으면 빠진 숫자후보자리가 undefined 되니깐 배열 숫자를 index로 빼줘서 줄어들게 최신화 해준다

			1 //숫자 하나 랜덤으로 뽑는다는뜻
		)[0]; // [0]이 없으면 값이 [n],[n],[n],[n] 배열값으로 나온다.하지만 우리는 숫자를 뽑는거니깐 첫번째[0]을 지정해서 숫자를 뽑아준다
		// 숫자배열.unshift(뽑은것);
		숫자배열.push(뽑은것);
		// console.log(숫자배열);
	}
}

숫자뽑기();

const 결과 = document.querySelector("h1");
바디.append(결과);
const 폼 = document.querySelector("form");
document.body.appendChild(폼);
const 입력창 = document.querySelector("input");
입력창.type = "number";
// 입력창.maxLength = 4;
폼.appendChild(입력창);
const 버튼 = document.querySelector("button");
버튼.textContent = "입력!";
폼.appendChild(버튼);

let 틀린횟수 = 0;

폼.addEventListener("submit", function 비동기(e) {
	e.preventDefault();
	const 답 = 입력창.value;

	// join :답(문자값)에 맞추기 위해 숫자배열을 join해서 문자로 치환해준다.
	//  그사이 구분자('')는 구분자 없이 그냥 합치라는 뜻
	if (답 === 숫자배열.join("")) {
		결과.textContent = "홈런";
		입력창.value = "";
		입력창.focus();
		//다음문제 대기
		숫자뽑기();
	} else {
		//홈런이 아닐때
		// 답을 배열로 만들기 (숫자배열과 비교하기위해)
		const 답배열 = 답.split("");
		let 스트라이크 = 0;
		let 볼 = 0;
		틀린횟수 += 1;
		if (틀린횟수 > 4) {
			// 10번넘게 틀린 경우
			결과.textContent =
				"4번 이상 시도 불가! 답은 " + 숫자배열.join(",") + "였습니다";
			입력창.value = "";
			입력창.focus();
			숫자뽑기();
			틀린횟수 = 0;
		} else {
			// 10번 미만으로 틀린경우
			for (let i = 0; i < 4; i++) {
				// 내 픽             // 컴퓨터픽
				if (Number(답배열[i]) === 숫자배열[i]) {
					// 1 같은자리 비교확인
					// 답배열이 값들이 ["1","2","3"] 이런식으로 문자로 나오기 때문에 number로 숫자로 만들어줘서 숫자배열과 같은 숫자게 되게한다
					// 여기서는 스트라이크 즉 , 같은자리에 같은 숫자가 있는지만 검사
					스트라이크 += 1;
					// indexOf =숫자배열안에 답배열이 몇번째 순서에 들어있는지 확인, index[]에서 안에는 0,1,2,3이 있고 없는값은 -1이 추출되니 -1보다 크면 값이 들어있다는 뜻
				} else if (숫자배열.indexOf(Number(답배열[i])) > -1) {
					//2 같은자리는 아니지만 숫자가 있다는것, 겹치는지 확인
					볼 += 1;
				}
			}

			결과.textContent = 스트라이크 + "스트라이크" + 볼 + "볼입니다";
			입력창.value = "";
			입력창.focus();
		}
	}
});

//  숫자 입력 제한 걸기
function maxLengthCheck(object) {
	if (object.value.length > object.maxLength) {
		object.value = object.value.slice(0, object.maxLength);
	}
}
// randomly pickNumbers color

for (let i = 0; i < 1; i++) {
	let colorCode = "#" + Math.round(Math.random() * 0xfffff).toString(16);
	let colorElem = document.getElementsByClassName("b");
	colorElem[i].style.backgroundColor = colorCode;
}
