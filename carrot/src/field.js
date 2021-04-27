"use strict";
import * as sound from "./sound.js"; // 캐롯 사운드 가져오기위해

// 상수인것들은 클래스 밖에 선언해준다
const CARROT_SIZE = 80;

// 타입 보장해주기 (문자열을 전달하는게 아닌 타입을 전달하도록)
//문자열을 쓰지 못하게 만들기 (지정된 object의 키값들만 쓸수있도록)
export const ItemType = Object.freeze({
	carrot: "carrot",
	bug: "bug",
});
export class Filed {
	//game > main에서 랜덤 숫자의 함수를 인자로 받아온다
	constructor(carrotCount, bugCount) {
		this.carrotCount = carrotCount;
		this.bugCount = bugCount;
		this.field = document.querySelector(".game__field");
		this.fieldRect = this.field.getBoundingClientRect(); // 필드에 놀이구역(범위설정)
		// this는 클래스에 있는 함수를 다른 콜백으로 전달해줄때는 클래스 정보가 무시되기 때문에 함수를 this(클래스)랑 바인딩을 해줘야한다
		// this바인딩 첫번째방법 this.onClick = this.onClick.bind(this); // Class와 바인딩 시키기( 잘안쓰는 방법, 보통은 이벤트에 에로우 펑션을 아래처럼 해준다)
		// this바인딩 두번째 this.field.addEventListener('click', (event) => this.onClick(event)); // 에로우 펑션은 this가 유지된다
		//자바스크립트에서는 함수를 인자로 어딘가로 전달할때 Class 정보는 함께 전달되지 않는다, this 바인딩이 필요하다
		this.field.addEventListener("click", this.onClick);
	}

	//초기화 함수
	init() {
		this.field.innerHTML = ""; //버튼 시작시마다 아이콘들이 추가되지 않게 리셋
		this._addItem("carrot", this.carrotCount, "img/carrot.png"); //this.carrotCount : Game class에서 받아온다
		this._addItem("bug", this.bugCount, "img/bug.png");
	}

	setClickListener(onItemClick) {
		// onItemClick : game에 onItemClick 메소드를 인자로 전달
		this.onItemClick = onItemClick;
	}

	//underbar = private function
	_addItem(className, count, imgPath) {
		const x1 = 0;
		const y1 = 0;
		const x2 = this.fieldRect.width - CARROT_SIZE; //filed의 너비만큼 (CARROT_SIZE사이즈는 빼줘야지 기준점이 x,y값이 니깐 걸쳐서 이미지가 삐져나올수 있다)
		const y2 = this.fieldRect.height - CARROT_SIZE; //filed의 높이만큼
		for (let i = 0; i < count; i++) {
			const item = document.createElement("img");
			item.setAttribute("class", className);
			item.setAttribute("src", imgPath);
			item.style.position = "absolute";
			const x = randomNumber(x1, x2); //x1부터 x2까지 아무 숫자나
			const y = randomNumber(y1, y2);
			item.style.left = `${x}px`;
			item.style.top = `${y}px`;
			this.field.appendChild(item);
		}
	}
	// 클래스 안에 있는 어떤 함수를 다른 콜백으로 전달할때는 변수로
	//  this바인딩3 펑션이 인자로 받아 this가 안먹을때는 onClick(함수)을 변수로 해준다 (this바인딩)
	// onClick (event) { 맴버변수
	onClick = (event) => {
		const target = event.target; //carrot or bug
		//css 셀렉터가 해당하는지
		// 클릭한 요소의 class 이름이 carrot이면
		if (target.matches(".carrot")) {
			target.remove();
			sound.playCarrot();
			// onItemClick에 콜백이 등록되어 있으면 호출 : game에 onItemClick 메소드의 인자로 전달
			this.onItemClick && this.onItemClick(ItemType.carrot);
		} else if (target.matches(".bug")) {
			this.onItemClick && this.onItemClick(ItemType.bug);
		}
	};
}

// class와 상관없는 상수 static 함수, 밖에 두는게 더 효율적이다(클래스안에서 반복안되서)
// 반복해서 다른 오브젝트에 만들어지지 때문에 효율적이다
function randomNumber(min, max) {
	return Math.random() * (max - min) + min; //정해진 min,max 범위안에서 (max숫자는 포함되지 않는 숫자 안에서)
}
