"use strict";
import { Filed, ItemType } from "./field.js";
import * as sound from "./sound.js"; // sound이름 전부다

// const GAME_DURATION_SEC = 5;

// 타입 보장해주기 (문자열을 전달하는게 아닌 타입을 전달하도록)
export const Reason = Object.freeze({
	//문자열을 쓰지 못하게 만들기 (지정된 object의 키값들만 쓸수있도록)
	win: "win",
	lose: "lose",
	cancel: "cancel",
});

// Builder Pattern (오브젝트를 간편하고 읽기 쉽게)
export class GameBuilder {
	//main에서 매개변수 duration을 받아온다
	withgameDuration(duration) {
		this.gameDuration = duration;
		return this; // 전달받은 이 클래스 자체를 리턴한다. 맵소드를 체이닝 하듯이
	}

	withcarrotCount(num) {
		this.carrotCount = num;
		return this;
	}
	withbugCount(num) {
		this.bugCount = num;
		return this;
	}

	build() {
		return new Game(
			this.gameDuration, //
			this.carrotCount,
			this.bugCount
		);
	}
}

// 이건 숨긴다 export안함
class Game {
	constructor(gameDuration, carrotCount, bugCount) {
		this.gameDuration = gameDuration;
		this.carrotCount = carrotCount;
		this.bugCount = bugCount;
		this.gameTimer = document.querySelector(".game__timer");
		this.gameScore = document.querySelector(".game__score");
		this.gameBtn = document.querySelector(".game__button");
		this.gameBtn.addEventListener("click", () => {
			if (this.started) {
				//게임이 시작되면 게임을 중지할수 있게
				this.stop(Reason.cancel);
			} else {
				this.start();
			}
		});
		this.gameField = new Filed(carrotCount, bugCount);
		this.gameField.setClickListener(this.onItemClick); //field의 onClick에서 전달받는다
		this.started = false; //게임이 시작되었는지 안되었는지
		this.score = 0;
		this.timer = undefined; //초기값 : 게임이 시작되지 않음
	}

	// main에게 게임이 끝나면 알려줄수 있는 콜백 만들기
	setGamestopListener(onGameStop) {
		this.onGameStop = onGameStop;
	}

	start() {
		this.started = true;
		this.initGame(); //게임 start버튼을 클릭했을때 벌레 당근들이 나오게 하기위해 여기에다
		this.hideGameButton();
		this.showStopButton();
		this.showTimerAndScore(); //시작전에는 보이지 않았다가 시작하면 보이게
		this.startGameTimer();
		sound.playBackground();
	}

	//reason은 onItemClick, startGameTimer, gameBtn Click 이벤트에서 받아온다
	stop(reason) {
		this.started = false;
		this.stopGameTimer(); //타이머가 중지되도록
		this.hideGameButton(); //중지하면 버튼을 없애기
		// this.gameFinishBanner.showWithText('REPLAY?')
		sound.stopBackground();
		// 게임이 끝나면 this.onGameStop을 불러온다
		this.onGameStop && this.onGameStop(reason);
	}

	// item : filed에 onClick 함수에서 carrot or bug를 받아온다
	onItemClick = (item) => {
		if (!this.started) {
			return;
		}
		if (item === ItemType.carrot) {
			this.score++;
			// 점수를 업데이트 해준다
			this.updateScoreBoard();
			if (this.score === this.carrotCount) {
				this.stop(Reason.win);
			}
		} else if (item === ItemType.bug) {
			this.stop(Reason.lose);
		}
	};

	showStopButton() {
		const icon = this.gameBtn.querySelector(".fas");
		// stop버튼을 누르면 버튼은 사라지게하기
		icon.classList.add("fa-stop");
		icon.classList.remove("fa-play");
		this.gameBtn.style.visibility = "visible";
	}

	hideGameButton() {
		this.gameBtn.style.visibility = "hidden";
	}

	showTimerAndScore() {
		this.gameTimer.style.visibility = "visible";
		this.gameScore.style.visibility = "visible";
	}

	startGameTimer() {
		let remainingTimeSec = this.gameDuration; //남아 있는 시간동안(gameDruation) 게속 interval이 진행되도록
		this.updateTimerText(remainingTimeSec);
		this.timer = setInterval(() => {
			if (remainingTimeSec <= 0) {
				//시간을 다썼다면 멈춰
				clearInterval(this.timer);
				this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
				return;
			}
			// 게임이 계속 진행중이라면 계속 --숫자가 하나씩 줄면서 바꿔준다
			this.updateTimerText(--remainingTimeSec);
		}, 1000);
	}

	stopGameTimer() {
		clearInterval(this.timer);
		// hideGameButton();
		// gameFinishBanner.showWithText('REPLAY?')
	}

	updateTimerText(time) {
		// 분단위로
		// 5초를 60으로 나누면 소수점이니깐 반올림해서 0이된다
		const minutes = Math.floor(time / 60);
		// 60으로 나누고 남는값, 즉 60초 1분하고 남는 초
		const seconds = time % 60;
		this.gameTimer.innerHTML = `${minutes}:${seconds}`;
	}

	initGame() {
		this.score = 0;
		this.gameScore.innerText = this.carrotCount; // 게임 스코어와 당근 갯수를 동기화
		this.gameField.init();
	}

	updateScoreBoard() {
		// 클릭하면서 남은 당근의 갯수
		this.gameScore.innerText = this.carrotCount - this.score;
	}
}
