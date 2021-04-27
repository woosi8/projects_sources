"use strict";
// 즉시 실행함수
(function () {
	const houseElem = document.querySelector(".house");
	// 스크롤 되는 양 구하기 : 전체문서 높이 - 현재 창높이(스크롤바가 마지막까지 갔을때)
	let maxScrollValue;
	const barElem = document.querySelector(".progress-bar");
	// 가운데가 원점이 되도록 바꿀 값을 바꿔준다
	const mousePos = { x: 0, y: 0 };
	const stageElem = document.querySelector(".stage");
	const selectCharacterElem = document.querySelector(".select-character");

	// 1. 스크롤시 z값 움직임에 대응되서 화면 움직이기
	window.addEventListener("scroll", () => {
		// 스크롤 값을 비율로 구하기 위해 = 현재화면의 높이값 / 전체 스크롤할수있는양
		const scrollPer = pageYOffset / maxScrollValue;
		//  world에서 준 디폴트 z값이 -490이 있으니깐
		//  scrollper 값이 0~1까지라서 너무 작아서 1000단위로 해주는것 (490은 css에서 해준것처럼 시작을 멀리 떨어진것처럼해준다)
		const zMove = scrollPer * 980 - 490;
		// houseElem.style.transform = "translateZ(" + zMove + "vw)";
		houseElem.style.transform = `translateZ(${zMove}vw)`;

		// progress bar
		barElem.style.width = scrollPer * 100 + "%";
	});

	// 2. 창 사이즈가 변동될때 maxscroll값을 갱신시켜줘야 그 변경된 위치에서 제대로 나오게 된다
	window.addEventListener("resize", resizeHandler);
	function resizeHandler() {
		maxScrollValue = document.body.offsetHeight - window.innerHeight;
	}
	// 처음에 로딩됐을때 실행해주기
	resizeHandler();

	// 3. 마우스 위치 찾아 효과주기 이벤트 (가운데 포인트가 0,0이 되게하기)
	// 스테이지 클래스를 움직인다. 왜냐면 house랑 캐릭터가 같이 움직이게 되게 하기위해
	window.addEventListener("mousemove", (e) => {
		//     1
		// -1  0  1
		//    -1
		//  전체윈도우폭,높이 분에 현재 마우스의 x위치 (0~1사이) ,
		mousePos.x = -1 + (e.clientX / window.innerWidth) * 2; //  자주 쓰이는 식이다(이런게 있다고 알고있어서 필요할때 쓴다)
		mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
		// x축을 기준으로 회전일때는 마우스위치 Y에 영향을 받는다
		// *5를 준 이유는 좀더 값이 다이나믹하게 움직이하기위해 추가
		stageElem.style.transform = `rotateX(${mousePos.y * 5}deg) rotateY(${
			mousePos.x * 5
		}deg)`;
	});

	// 4.클릭시 캐릭터 나오게 하기
	stageElem.addEventListener("click", (e) => {
		// console.log(e.clientX) 클릭되는 위치를 %로 변환후 캐릭터클래스 css에 넣어준다;
		// 캐릭터 생성자 같은 경우 매개변수(parameterinfo)가 하나인 함수이다
		new Character({
			//캐릭터에 left값을 마우스의 위치 x값으로 주기위해
			xPos: (e.clientX / window.innerWidth) * 100,
			// 캐릭터 랜덤 속도주기 (* 속도 좀더 줄이기 , + 0.2 최소한 0.2보단 빠르게)
			speed: Math.random() * 0.5 + 0.2,
		});
	});

	// 캐릭터 설정 ( 일부니, 라면 선택 하면 그 해당 타켓의 html data속성값을 가져와서 body에 넣어준다)
	selectCharacterElem.addEventListener("click", (e) => {
		const value = e.target.getAttribute("data-char");
		document.body.setAttribute("data-char", value);
	});
})();
