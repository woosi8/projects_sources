"use strict";
// import PopUp from './field.js'
// import * as sound from './sound.js' // sound이름 전부다
import PopUp from "./popup.js";
// import Game from './game.js';
import { GameBuilder, Reason } from "./game.js";
import * as sound from "./sound.js"; // sound이름 전부다

const pickElem = function randomNum(lower, upper) {
	for (var i = 0; i < 1; i++) {
		let myRandom = Math.floor(Math.random() * (upper - lower + 1)) + lower;
		console.log(myRandom);
		return myRandom;
	}
};

// 랜덤 숫자 생성 최소 5~10, 9~10
const carrotCount = pickElem(5, 10);
const bugCount = pickElem(9, 10);

// 당근, 벅스 랜덤 생성

const gameFinishBanner = new PopUp();
// gameFinishBanner.setClickListener(startGame);

// object를 간편하고 알기 쉽게 하기 위해 개선한 방법임
const game = new GameBuilder()
	.withgameDuration(5) // 게임 타이머 설정
	.withcarrotCount(carrotCount)
	.withbugCount(bugCount)
	.build();

// const game = new Game(5,carrotCount,bugCount);
// 1. game.js에서 stop() 인자값(Reason)을 받아온다
// 2. game.js의 onItemClick에서 stop의 reason을 받아온다
// 3. filed.js의 onClick에서 받아온 setClickListener의 onItemClick인자를 game에 전달한다
game.setGamestopListener((reason) => {
	let message;
	console.log(reason);
	switch (reason) {
		// game의 Reason 오브젝트를 받아온다
		case Reason.win: //Reason을 써주고 뒤에는 들어올수있는게 3개뿐이여서 오타 확률을 줄여준다
			message = "YOU WON 🎉";
			sound.playWin();
			break;
		case Reason.lose:
			message = "YOU LOST 💩";
			sound.playBug();
			break;
		case Reason.cancel:
			message = "Replay❓";
			sound.playAlert();
			break;
		default:
			throw new Error("not valid reason");
	}

	gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
	// popup의 setClickListener의 인자로 전달된다
	game.start();
});
