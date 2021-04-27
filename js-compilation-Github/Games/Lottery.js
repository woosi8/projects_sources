// Set 45 numbers
let options = Array(45)
	.fill() // make () * 45
	//for matching one on one
	.map((elem, index) => {
		return index + 1;
	});
let suffle = [];
const btnElem = document.querySelector(".lottery_btn");

// Mixed numbers randomly
// 45개 숫자를 섞어준다.
while (options.length > 0) {
	// splice 기존 배열에서 숫자가 뽑히면서 중복이 없도록 한다
	let pick = options.splice(Math.floor(Math.random() * options.length), 1)[0];
	suffle.push(pick);
}
const bonus = suffle[suffle.length - 1]; // Bonus number (pick last number in suffle)

// Listed sequentially.
// Pick 6 numbers by slice
const numbers = suffle.slice(0, 6).sort((p, c) => {
	return p - c;
});
let result = document.querySelector("#result");

// Control Css in JS
function printBall(numberElem, result) {
	const ball = document.createElement("div");
	ball.textContent = numberElem;
	ball.style.border = "1px solid black";
	ball.style.display = "inline-block";
	ball.style.textAlign = "center";
	ball.style.borderRadius = "20px";
	ball.style.width = "20px";
	ball.style.height = "20px";
	ball.style.marginRight = "5px";
	ball.style.padding = "6px";
	let backColor;
	if (numberElem <= 10) {
		backColor = "red";
	} else {
		backColor = "dodgerblue";
	}
	ball.style.backgroundColor = backColor;
	// add div class in #result for showing ball
	result.appendChild(ball);
}

// Click Event (재사용 어케할까?)
btnElem.addEventListener(
	"click",
	() => {
		// Show ball in order of number
		for (let i = 0; i < numbers.length; i++) {
			function closure(j) {
				setTimeout(() => {
					printBall(numbers[j], result);
				}, (j + 1) * 1000);
			}
			closure(i);
		}
		// show bonus after ball
		setTimeout(() => {
			const bonusElem = document.querySelector(".bonus");
			printBall(bonus, bonusElem);
		}, 7000);

		console.log("If you want it again, press F5 please");
	},
	{ once: true }
);
