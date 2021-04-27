"use strict";

const carrotSound = new Audio("./sound/carrot_pull.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bgSound = new Audio("./sound/bg.mp3");
const bugSound = new Audio("./sound/bug_pull.mp3");
const winSound = new Audio("./sound/game_win.mp3");

export function playCarrot() {
	playSound(carrotSound);
}
export function playBug() {
	playSound(bugSound);
}
export function playAlert() {
	playSound(alertSound);
}
export function playWin() {
	playSound(winSound);
}
export function playBackground() {
	playSound(bgSound);
}
export function stopBackground() {
	stopSound(bgSound);
}

function playSound(sound) {
	sound.currentTime = 0; // 플레이가 항상 음악의 처음부터 시작되도록
	sound.play();
}

function stopSound(sound) {
	sound.pause();
}
