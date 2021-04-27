"use strict";
// 즉시 실행함수
(function () {
	const houseElem = document.querySelector(".house");
	let maxScrollValue; // Range How much we can scroll
	const barElem = document.querySelector(".progress-bar");
	const mousePos = { x: 0, y: 0 }; // Make start point center
	const stageElem = document.querySelector(".stage");
	const selectCharacterElem = document.querySelector(".select-character");

	// Move screen by Z value
	window.addEventListener("scroll", () => {
		const scrollPer = pageYOffset / maxScrollValue; // Scroll value percent
		// 다 스크롤 했을때 화면에 꽉차진 않게 980
		const zMove = scrollPer * 980 - 490; // (-490) : for showing perspective 첫화면 디폴트가 house에-490해줬으니
		houseElem.style.transform = `translateZ(${zMove}vw)`;

		// progress bar
		barElem.style.width = scrollPer * 100 + "%";
	});
	console.log(maxScrollValue);
	window.addEventListener("resize", resizeHandler);
	function resizeHandler() {
		// 내가 스크롤 할수 있는 최대 양 ( 스크롤을 끝까지 했을때 스크롤바 윗꼭대기까지(즉 마지막 스크린 화면높이(innerHeight)는 제외한) 높이)
		maxScrollValue = document.body.offsetHeight - window.innerHeight;
	}

	// Load at first
	resizeHandler();

	// 3. 마우스 위치 찾아 효과주기 이벤트 (가운데 포인트가 0,0이 되게하기)
	// 스테이지 클래스를 움직인다. 왜냐면 house랑 캐릭터가 같이 움직이게 되게 하기위해
	window.addEventListener("mousemove", (e) => {
		// Mouse pointer values
		//     1
		// -1  0  1
		//    -1
		// Percentage according to where the mouse point is
		mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
		mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
		// Put css into stage class has house class and characters
		stageElem.style.transform = `rotateX(${mousePos.y * 5}deg) rotateY(${
			mousePos.x * 5
		}deg)`;
	});

	// Linked with character.js
	stageElem.addEventListener("click", (e) => {
		new Character({
			// Make percentage of the position clicked
			// 캐릭터의 left값
			xPos: (e.clientX / window.innerWidth) * 100,
			// 캐릭터 랜덤 속도주기 (* 속도 좀더 줄이기 , + 0.2 최소한 0.2보단 빠르게)
			// Make randomly speed percentage
			// 0.2 : the minium of randomly speed percentage
			speed: Math.random() * 0.5 + 0.2, //너무 빨라서 0.5 절반 정도 속도를 줄이기 +너무 느린애 없애기 - 0.2 최소 0.2보다 빠르게
		});
	});

	selectCharacterElem.addEventListener("click", (e) => {
		const value = e.target.getAttribute("data-char");
		document.body.setAttribute("data-char", value);
	});
})();
