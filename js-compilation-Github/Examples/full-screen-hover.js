const links = document.querySelectorAll(".full_screen a");
const bg = document.querySelector(".bg");
const showclass = "bg-show";

for (const link of links) {
	// it dosen't need to use const img, but it helps for img loading speed ahead of mouseenter event
	// 원래 html에 <img> 태그를 사용하지 않고 자바스크립트 코드로 Image 객체를 생성하여 이미지를 로딩하여 저장해 두는 목적으로사용됨.
	// 동적으로 Image 객체를 만들고 이미지를 로딩시키는 코드이다.
	const img = new Image();
	// 미리 로딩할 이미지를 담을 객체를 전역 이미지 객체로 생성한 후
	// 이 객체에 담을 이미지들을 담고 있는 함수를 현 페이지의 로딩이 끝난 상태에서 불러들이는 것이다.

	img.src = link.dataset.bg;

	link.addEventListener("mouseenter", function () {
		bg.style.backgroundImage = `url(${this.dataset.bg})`; //load data-bg url in A link
		bg.classList.add(showclass);
	});
	link.addEventListener("mouseleave", function () {
		bg.classList.remove(showclass);
	});
}
