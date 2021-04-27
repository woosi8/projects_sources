"use strict";

///////////////////////////////// Make navbar transparent when it is on the top + Show "arrow up" bittpm wjem scrp;;omg dpwm
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height; // Viewport의 시작지점을 기준으로한 상대좌표 Y 값.
const topArrow = document.querySelector(".top-arrow");
const btt = document.querySelector("#back-to-top");
let scrollPos;

document.addEventListener("scroll", () => {
	// console.log(`navbarHeight :${navbarHeight}`);
	if (window.scrollY > navbarHeight) {
		navbar.classList.add("navbar--dark");
		topArrow.classList.add("visible");
	} else {
		navbar.classList.remove("navbar--dark");
		topArrow.classList.remove("visible");
	}
});
// End// End// End// End// End// End// End// End

///////////////////////////////// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelectorAll(".home__container");

home.forEach((target) => {
	const homeHeight = target.getBoundingClientRect().height;
	document.addEventListener("scroll", () => {
		// 스크롤페이드인: 내려가는 스크롤 값에 따라 opacity값에 반영되도록. 예) 1- 400/800 = opacity 0.5
		target.style.opacity = 1 - window.scrollY / homeHeight;
	});
});
// End// End// End// End// End// End// End// End

///////////////////////////////// Handle click on the "arrow up" button
btt.addEventListener("click", (e) => {
	e.preventDefault();
	scroll("#home");
	// scrollTop();
});
// End// End// End// End// End// End// End// End

///////////////////////////////// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
	const target = event.target;
	const link = target.dataset.link; // 먼저 html에서 data-link로 연결해준다
	if (link == null) {
		// link가 null이면 아무것도 하지않고 리턴해서 더이상 밑에 있는 코드가 실행되지 않도록 한다
		return;
	}
	scroll(link);
	navbarMenu.classList.remove("open"); // 네브바 클릭시 항상 창이 닫힐수있도록(반응형에서)
});
// End// End// End// End// End// End// End// End

///////////////////////////////// Navbar toggle button for responsive screen (small screen)
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
	navbarMenu.classList.toggle("open");
});

// End// End// End// End// End// End// End// End

///////////////////////////////// Home-Img Mouseover
function zoomIn(event) {
	event.target.style.transform = "scale(1.2)";
	event.target.style.zIndex = 1;
	event.target.style.transition = "all 0.5s";
}
function zoomOut(event) {
	event.target.style.transform = "scale(1)";
	event.target.style.zIndex = 0;
	event.target.style.transition = "all 0.5s";
}
// End// End// End// End// End// End// End// End

// const sliderWrapper = document.querySelector("#home");
const sliderContainer = document.querySelector(".slide"); //ul
const slides = document.querySelectorAll(".slides"); // li

let navPrev = document.querySelector("#prev");
let navNext = document.querySelector("#next");
const slideCount = slides.length; //슬라이드 갯수를 정의
let currentIndex = 0;
let topHeight = 0;

// slides 마다 높이가 다르면 그 중 가장 높은 슬라이드의 높이를 기준(topHeight)으로 해놓기 위한 함수
function calculateTallestSlide() {
	for (let i = 0; i < slideCount; i++) {
		if (slides[i].offsetHeight > topHeight) {
			topHeight = slides[i].offsetHeight;
		}
	}
	sliderContainer.style.height = topHeight + "px";
	// sliderWrapper.style.height = topHeight + "px";
}
calculateTallestSlide();

// slide마다 left값을 인덱스 순서대로 0, 100, 200  나열해주기 위한 함수
function slideLeft() {
	for (let j = 0; j < slideCount; j++) {
		slides[j].style.left = j * 100 + "%";
	}
}
slideLeft();

// next,prev와 페이저 작동을 만들어주는 함수
function goToSlide(idx) {
	//부모 ul 입장에서는 left값을 -100 씩 땡겨줘야 오른쪽 화면 100,200 으로 보여지게 된다
	sliderContainer.style.left = idx * -100 + "%"; //첫번째 페이지에서 이전 버튼을 누르면 맨 마지막 페이지가 나올수 있게 -100을 곱해준다
	currentIndex = idx; //초기에는 2가 된다
	sliderContainer.classList.add("animated");

	// 슬라이드가 이동될때마다 Pager 현재상태표시 동기화 시키기
	const pagerAct = document.querySelector(".dot.dot_active");
	// 기존의 active가 설정된 점을 정의
	// 지금 이동한 인덱스의 점을 찾고
	const dot = document.querySelector(`.dot[data-index="${idx}"]`);
	pagerAct.classList.remove("dot_active"); //전에 점에 붙은 active를 지우고
	dot.classList.add("dot_active"); //현재 index에 맞는 index에 active를 붙여준다
}

// const pageDots = document.querySelectorAll(".dot");

navPrev.addEventListener("click", (event) => {
	event.preventDefault();
	// 첫번째 화면 아니서부터는 if 조건문 발동
	if (currentIndex != 0) {
		goToSlide(currentIndex - 1);
		//currentIndex 초기값은 0으로 설정했으니 처음에는 else가 실행된다
	} else {
		goToSlide(slideCount - 1);
	}
});

navNext.addEventListener("click", (event) => {
	event.preventDefault();
	if (currentIndex < slideCount - 1) {
		goToSlide(currentIndex + 1);
	} else {
		goToSlide(0); //마지막 슬라이드에서 첫 슬라이드로
	}
});

goToSlide(0);

// End//

///////////////////////////////// Pager in Home
const slidePager = document.querySelector(".slide_pagination");
slidePager.addEventListener("click", (e) => {
	const pagerAct = document.querySelector(".dot.dot_active");
	if (pagerAct != null) {
		pagerAct.classList.remove("dot_active"); //페이저 클릭시 기존에 붙어있던 active는 제거해준다
	}
	e.target.parentNode.classList.add("dot_active"); //클릭한 a링크의 부모 즉 dot에게 active를 붙여 준다

	const curIndex = Number(e.target.parentNode.getAttribute("data-index")); //클릭한 dot에 있는 data-index값을 숫자로 치환해서 정의한다
	goToSlide(curIndex); // 그 인덱스값을 goToSlide에 넣어줘서 pager가 이동할때마다 slides를 index에 맞는 페이지로 이동시켜준다
});

// End

///////////////////////////////// Modal in Home - 1
const homeBtn = document.querySelectorAll(".home__contact"); //resume button
const testiBtn = document.querySelectorAll(".testimonial__contact"); //certification button
const modal = document.querySelectorAll(".modal");
const overlay = document.querySelectorAll(".modal__overlay"); // black background
const closeBtn = document.querySelectorAll(".closeBtn");

const openModal = (event) => {
	// 버튼이 modal에 있지않고 home에 있어서 homebtn 옆에 있는 modal 선택
	event.currentTarget.nextElementSibling.classList.add("outbreak"); //modal
};
const closeModal = (event) => {
	event.currentTarget.parentNode.classList.remove("outbreak"); //modal
};
// 모달에 있는 자식 (모달의 배경)
overlay.forEach((event) => {
	event.addEventListener("click", closeModal);
});
// 모달의 x버튼
closeBtn.forEach((event) => {
	event.addEventListener("click", closeModal);
});
homeBtn.forEach((event) => {
	event.addEventListener("click", openModal);
});

///////////////////////////////// Dynamic and blink
const homeTitleElem = document.querySelector(".home__title");
const dynamicElem = document.querySelector(".dynamic");
const dynamicElem2 = document.querySelector(".dynamic2");
// 깜빡임 효과
function blink() {
	homeTitleElem.classList.toggle("active");
}
setInterval(() => {
	blink();
}, 300);

const stringArr = [dynamicElem.textContent, dynamicElem2.textContent];

function dynamicString() {
	// const dynamicText = stringArr[0];
	const dynamicTextArr = stringArr[0].split("");
	dynamicElem.textContent = ""; // 첫화면에서 나오지 않게
	return dynamicTextArr;
}
function dynamicString2() {
	// const dynamicText2 = stringArr[1];
	const dynamicTextArr2 = stringArr[1].split("");
	dynamicElem2.textContent = "";
	return dynamicTextArr2;
}

function delay(ms) {
	// setTimeout이 비동기 web api이므로 비동기 처리를 해결하기위해
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function dynamic(Arr) {
	dynamicElem2.textContent = "";
	if (Arr.length > 0) {
		dynamicElem.textContent += Arr.shift(); //배열 앞에서 부터 더한다
		setTimeout(() => {
			dynamic(Arr);
		}, await delay(170)); //시간차로 반복 배열에 글자가 다 소진될때까지
		// 1번줄이 다 나오고 난 후 실행
	} else {
		dynamic2(dynamicString2());
		// setTimeout(() => {
		// 	reset(); // 다 실행된후(6초) 초기화
		// }, 6000);
	}
}
dynamic(dynamicString());

async function dynamic2(Arr2) {
	if (Arr2.length > 0) {
		dynamicElem2.textContent += Arr2.shift();
		setTimeout(() => {
			dynamic2(Arr2);
		}, await delay(170));
	}
}

// function reset() {
// 	dynamicElem.textContent = "";
// 	dynamicElem2.textContent = "";
// 	dynamic(dynamicString()); //리셋하고 다시 시작
// }

///////////////////////////////// Work Projects
const workBtnContainer = document.querySelector(".work__categories"); //project 버튼 전체
const projectContainer = document.querySelector(".work__projects"); //컨텐츠 전체
const proejects = document.querySelectorAll(".project"); //컨텐츠 각각 data-type
const projectsArray = [...proejects];
// const categoryCount = document.querySelectorAll(".category__count");
// 이벤트 위임
workBtnContainer.addEventListener("click", (event) => {
	const filter =
		event.target.dataset.filter || event.target.parentNode.dataset.filter;
	if (filter == null) {
		// 에러방지를 위해 filter가 null 이면 아무것도 하지않기
		return;
	}

	// Remove selection from the previous item and select the new one
	const selectElem = document.querySelector(".category__btn.selected");
	if (selectElem != null) {
		// 클릭 전에 있었던 곳에 selected를 없애 효과를 빼도록(옮겨가게끔)
		selectElem.classList.remove("selected");
	}
	const target =
		event.target.nodeName === "BUTTON" ? event.target : event.target.parentNode;
	target.classList.add("selected");

	// 필터링해서 걸려진것들에 anim-out을 준다 (먼저 anim이 된다음에 아래 0.3초후에 효과가 사라진다)
	projectContainer.classList.add("anim-out");
	setTimeout(() => {
		// foreach 는 quersysleectorAll에 있는 값들을 배열형태로 가져온다
		proejects.forEach((project) => {
			// 만약 위에서 선택한 filter가 * 이거나 선택한 data-type과 똑같으면 (즉 같은 필터값을 나오게)
			if (filter === "*" || filter === project.dataset.type) {
				project.classList.remove("invisible"); //타입이 동일한 클래스에 invisible 제거해서 보이게하기
			} else {
				project.classList.add("invisible");
			}
		});
		// 클릭시 0.3초후에 anim-out 이 사라지고 본 내용이 돌아오게한다. 그래서 효과가 보이게 한다
		projectContainer.classList.remove("anim-out"); //anim-out은 opacity:0
	}, 300);
});

// Make category numbers automatically when the proejcts add
const categoryBtn = document.querySelectorAll(".category__btn");
let typeCss = projectsArray.filter((value) => value.dataset.type === "css"); //filter 배열로 리턴
let typeJs = projectsArray.filter((value) => value.dataset.type === "js");
let typeReact = projectsArray.filter((value) => value.dataset.type === "react");
categoryBtn.forEach((btn) => {
	// count 숫자
	const child = btn.childNodes[3]; //btn의 childNodes의 3번째의 innerText값이 들어있다.
	switch (btn.dataset.filter) {
		case "*":
			// 버튼 숫자 표시값에
			child.innerText = projectsArray.length;
			break;
		case "css":
			child.innerText = typeCss.length;
			break;
		case "js":
			child.innerText = typeJs.length;
			break;
		case "react":
			child.innerText = typeReact.length;
			break;
		default:
			break;
	}
});

// End// End// End// End// End// End// End// End

///////////////////////////////// Slide Show in Testimonial
// (function () {
// 	function showValue() {
// 		const testiElem = document.querySelector(".testimonials");
// 		let posY = testiElem.getBoundingClientRect().top;
// 		console.log(window.innerHeight);
// 		if (posY < window.innerHeight / 3) {
// 			testiElem.classList.add("active");
// 		} else {
// 			testiElem.classList.remove("active");
// 		}
// 	}

// 	window.addEventListener("scroll", function () {
// 		showValue();
// 	});
// })();

// testiBtn.forEach((event) => {
// 	event.addEventListener("click", openModal);
// });

// End

// Intersection Observer
const testiElem = document.querySelector(".testimonials");

const options = {
	root: null, // 실행기준 vieport , 실행기준을 윈도우 창 기준이 아닌 요소(기준)을 넣을수 있음 document.querySelector(".testimonials");
	rootMargin: "0px", //default값 ,  윈도우 창 보이는 포함영역을 마진까지 해준다는뜻 , 활용 방법 : 사용자에게 현재 보여지지는 않지만 미리 근접해 있는 경우 이미지, 컨텐츠를 준비해 놓겠다 할때 유용하게 쓰인다.100px ,
	threshold: 0.4, // 얼마만큼 보여져야 콜백함수가 수행되는지 0.0부터 1까지
};
//두가지 인자가 전달됨
//entrie : 화면상에 들어온 요소, observer:
const callback = (entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("active");
		} else {
			entry.target.classList.remove("active");
		}
	});
};
const observer = new IntersectionObserver(callback, options); //IntersectionObserver은 callbakc과 options가 전달된다
observer.observe(testiElem);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 1. 모든 섹션 요스들을 가지고 온다
const sectionIds = [
	"#home",
	"#about",
	"#skills",
	"#work",
	"#testimonials",
	"#contact",
];
const sections = sectionIds.map((id) => document.querySelector(id)); // 배열을 빙글빙글 돌면서 각각의 아이디를 섹션 돔요소로 변환
const navItems = sectionIds.map((id) =>
	document.querySelector(`[data-link="${id}"]`)
);

// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
	selectedNavItem.classList.remove("active");
	// selectedNavItem = navItems[selectedNavIndex];
	selectedNavItem = selected; //다시 할당
	selectedNavItem.classList.add("active");
}

///////////////////////////////// Common Functions
function scroll(selector) {
	const scrollTo = document.querySelector(selector);
	scrollTo.scrollIntoView({ behavior: "smooth" });
	selectNavItem(navItems[sectionIds.indexOf(selector)]);
}
// End// End// End// End// End// End// End// End

const observerOptions = {
	root: null,
	rootMargin: "0px",
	threshold: 0.3,
};

// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다
const observerCallback = (entries, observers) => {
	entries.forEach((entry) => {
		// 아래 if문을 해주는 이유 : 첫화면의 섹션은 이미 화면상에 들어와 있어서 나가지도 들어가지도 않는것으로 인식해기때문에
		// 빠져나가는 방향에 따라 정해주기
		// 보여지는 섹션이 위로 빠지는지 아래로 빠지는지 확인해서 다음, 이전이 선택되게 한다
		// entry 가 빠져나갈떄(!isIntersecting) entry는 빠져나가는 섹션을 가리키고있따
		if (!entry.isIntersecting && entry.intersectionRatio > 0) {
			// entry.intersectionRatio : 페이지가 랜딩되면서 바로 몇몇 섹션에서 콜백함수가 바로 실행된 경우가 있다.
			//  이걸 해결해주기 위해 0이상을 처리해주는 조건을 줌. default가 0이라서
			const index = sectionIds.indexOf(`#${entry.target.id}`);
			// 섹션이 위로 나가는 경우는 현재 보이는 요소의 y좌표가 마이너스 그래서 index+1을 해주고 (휠을 아래로)
			if (entry.boundingClientRect.y < 0) {
				selectedNavIndex = index + 1;
			} else {
				// 아래로 나가는 경우 y좌표가 플러스 그래서 index-1 (휠을 위로)
				selectedNavIndex = index - 1; //다음에 선택해야될 인덱스
			}
		}
	});
};
const observerr = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observerr.observe(section));

// 예외사항 : 마지막 섹션

// 위에 클릭nav로 페이지를 이동시 scroll을 해주면 여기도 반복적으로 호출이 된다.
// window.addEventListener("scroll", () => {
// scroll: 브라우저에서 모든 스크롤이 해당하는 이벤트가 발생할 때마다 생성되는 이벤트
window.addEventListener("wheel", () => {
	// 사용자가 마우스로 스스로 스크롤 할때는 wheel
	if (window.scrollY === 0) {
		selectedNavIndex = 0;
	}
	// 마지막까지 스크롤 했을때 scrollY는 현재 창의 최상단 높이, window.innerHeight는 현재창의 높이니깐 더하면 전체 높이가 된다
	// 소수점으로 조건이 안맞을경우도 있어서 올림을 해준다
	else if (
		Math.ceil(window.scrollY + window.innerHeight) >= document.body.scrollHeight
	) {
		selectedNavIndex = navItems.length - 1; //마지막 인덱스 가르키기
	}
	selectNavItem(navItems[selectedNavIndex]);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
