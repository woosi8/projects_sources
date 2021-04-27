"use strict";

export default class PopUp {
	constructor() {
		this.popUp = document.querySelector(".pop-up");
		this.popUpText = document.querySelector(".pop-up__message");
		this.popUpRefresh = document.querySelector(".pop-up__refresh");
		this.popUpRefresh.addEventListener("click", () => {
			this.onClick && this.onClick(); //클릭되면 main에서 game의 start가 실행
			this.hide();
		});
	}

	setClickListener(onClick) {
		// popup클래스에 맴버변수 onClick에 이 함수에서 전달받은 매개변수 인자를 전달
		this.onClick = onClick;
	}
	showWithText(text) {
		this.popUpText.innerText = text;
		this.popUp.classList.remove("pop-up--hide");
	}

	hide() {
		this.popUp.classList.add("pop-up--hide");
	}
}
