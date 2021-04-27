let numberGroup, rightAnswers;

// pick right numbers
function pickNumbers() {
	numberGroup = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	rightAnswers = [];

	for (let index = 1; index < 5; index++) {
		let pickElem = numberGroup.splice(
			//뽑힌숫자는 숫자후보에서 빠지기 떄문에 그자리를 다시 뽑으면 빠진 숫자후보자리가 undefined 되니깐 배열 숫자를 index로 빼줘서 줄어들게 최신화 해준다
			Math.floor(Math.random() * (10 - index)),
			1 //숫자 하나 랜덤으로 뽑는다는뜻
		); // why?[0] : splice has array but it needs number.
		// [0]이 없으면 값이 [n],[n],[n],[n] 배열값으로 나온다.하지만 우리는 숫자를 뽑는거니깐 첫번째[0]을 지정해서 숫자를 뽑아준다
		rightAnswers.push(pickElem);
	}
}

pickNumbers();

const resultElem = document.querySelector("#baseball h2");
const formElem = document.querySelector("form");
const inputelem = document.querySelector("input");
const buttonElem = document.querySelector("button");
// inputelem.type = "number";
let beWrongNumbers = 0;
inputelem.focus();
function judgeScore(e) {
	console.log(rightAnswers);
	e.preventDefault();
	const answer = inputelem.value;
	// answer is string, so it needs to make rightAnswers string by join
	// join :답answer(문자값)은 문자이기 때문에 숫자배열을 join해서 문자로 치환해준다.
	//  그사이 구분자('')는 구분자 없이 그냥 합치라는 뜻
	if (answer === rightAnswers.join("")) {
		resultElem.textContent = "HomeRun";
		resultElem.style.color = "#8fceff";
		inputelem.value = "";
		inputelem.focus();
		pickNumbers();
		beWrongNumbers = 0;
	} else {
		// make answer array for comparing with rightAnswers
		// answer을 배열로 만들기 (숫자배열과 비교하기위해)
		const myAnswers = answer.split("");
		let strike = 0;
		let ball = 0;
		beWrongNumbers += 1;
		if (beWrongNumbers > 5) {
			resultElem.style.color = "#ff0000";
			resultElem.textContent = `It can't be more than 5times, the answer is  ${rightAnswers.join(
				","
			)} `;
			inputelem.value = "";
			inputelem.focus();
			pickNumbers();
			beWrongNumbers = 0;
		} else {
			for (let i = 0; i < 5; i++) {
				// Number : Make myAnswers number for comparing with rightAnswers
				// myAnswers 값들이 ["1","2","3"] 이런식으로 문자로 나오기 때문에 number로 숫자로 만들어줘서 숫자배열과 같은 숫자게 되게한다
				// 여기서는 스트라이크 즉 , 같은자리에 같은 숫자가 있는지만 검사
				if (Number(myAnswers[i]) === rightAnswers[i]) {
					strike += 1;
				}
				// if there's no myAnswers in rightAnswers, return -1
				// so if it is bigger than -1,
				// it menas it has number in rightAnswers but dosen't match place
				// indexOf =myAnswers안에 rightAnswers이 몇번째 순서에 들어있는지 확인,
				// index[]에서 안에는 0,1,2,3이 있고 없는값은 -1이 추출되니 -1보다 크면 값이 들어있다는 뜻
				else if (rightAnswers.indexOf(Number(myAnswers[i])) > -1) {
					ball += 1;
				}
			}
			resultElem.style.color = "#000";
			resultElem.textContent =
				"Score: " +
				strike +
				" Strike " +
				ball +
				" Ball " +
				" Trial " +
				beWrongNumbers +
				"";
			inputelem.value = "";
			inputelem.focus();
		}
	}
}

formElem.addEventListener("submit", judgeScore);

// limit length of input key ( link in #baseball > input oninput)
function numberMaxLength(e) {
	if (e.value.length > e.maxLength) {
		e.value = e.value.slice(0, e.maxLength);
	}
}

// randomly pickNumbers color

// for (let i = 0; i < 1; i++) {
// 	let colorCode = "#" + Math.round(Math.random() * 0xfffff).toString(16);
// 	let colorElem = document.getElementsByClassName("b");
// 	colorElem[i].style.backgroundColor = colorCode;
// }
