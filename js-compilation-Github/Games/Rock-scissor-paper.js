const pic = document.querySelector(".pic");
let ImgElem = "0";

//  Pic's Location
const rsp = {
	rock: "0",
	scissor: "-142px",
	paper: "-284px",
};

// Set computer choice
function computer(ImgElem) {
	// make array
	// entries rsp의 키값을 가져온다
	// (Object.entries는 객체를 배열로)
	// indexOf는 1차원 배열 ,find는 2차원 배열에서 쓰인다
	return Object.entries(rsp).find(function (v) {
		// find( ) 메서드는 주어진 판별 함수를 (배열로)만족하는 첫 번째 요소의 값을 반환한다.
		// v[1]는 값value, ImgElem도 값
		return v[1] === ImgElem; // it's currently rock("0")
	})[0]; // pick text(rock)
}
// make image continuously move
function intervalMaker() {
	IntervalElem = setInterval(function () {
		if (ImgElem === rsp.rock) {
			ImgElem = rsp.scissor;
		} else if (ImgElem === rsp.scissor) {
			ImgElem = rsp.paper;
		} else {
			ImgElem = rsp.rock;
		}
		document.querySelector("#computer").style.background =
			"url(https://en.pimg.jp/023/182/267/1/23182267.jpg) " + ImgElem + " 0";
	}, 100);
}
const startButton = document.querySelector("#start");

// Start(click event)
startButton.addEventListener(
	"click",
	() => {
		intervalMaker();
	},
	{ once: true }
);
// intervalMaker()

// Set score value
const score = {
	scissor: 1,
	rock: 0,
	paper: -1,
};

//click Event
document.querySelectorAll(".btn").forEach(function (btn) {
	btn.addEventListener("click", function () {
		clearInterval(IntervalElem); // when you click, image stop for check the result at the momoent
		setTimeout(function () {
			intervalMaker();
		}, 1000);
		//클릭한 버튼의 텍스트를 가져와서 스코어 오브젝트에서 찾아서 내 점수에 넣어준다
		let myPick = this.innerText; //textContent를 해버리면 폰트어썸까지 나와서 undefine이 되버린다
		const myScore = score[myPick];
		const computerScore = score[computer(ImgElem)];
		//결과 내기위한 변수
		const scoreGap = myScore - computerScore; //it's for bringing out the result
		if (scoreGap === 0) {
			pic.innerHTML = "even";
			pic.style.color = "grey";
			// if the score is -1 or 2
		} else if ([-1, 2].includes(scoreGap)) {
			pic.innerHTML = "win";
			pic.style.color = "dodgerblue";
		} else {
			pic.innerHTML = "lost";
			pic.style.color = "red";
		}
	});
});
