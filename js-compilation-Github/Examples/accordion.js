// 블락 스코프
// const하고 let 차이
// let은 변수에 재할당은 가능하지만 재선언은 안된다
// const는 재할당 재선언 안된다. 보안에 더 적합

const btnCollapse = document.querySelector("#btn-collapse"),
	questions = document.querySelectorAll(".panel-question"),
	heading = document.querySelectorAll(".panel-heading"),
	pbody = document.querySelectorAll(".panel-body");

heading.forEach((e) => {
	e.addEventListener("click", (e) => {
		questions.forEach((elem) => {
			// remove active Class from currentTarget(added active panel-questions)
			elem.classList.remove("active");
			// add active Class in clicked panel-questions
			e.target.parentNode.classList.add("active");
			const activePanel = document.querySelector(
				".panel-question.active .panel-body"
			);
			const activeElem = document.querySelector(".panel-question.active");
			if (activeElem != null) {
				activePanel.style.display = "block";
			}
		});
	});
});

function closeElem() {
	for (let i = 0; i < pbody.length; i++) {
		pbody[i].style.display = "none";
	}
}
closeElem();
// choose activateBody or closeElem for panel-body opened or closed at first
// activateBody();

// close All opend panel-body
btnCollapse.addEventListener("click", () => {
	pbody.forEach((elem) => {
		elem.style.display = "none";
	});
});

// If there a panel-questions that has active Class, change panel-body display value into block.
function activateBody() {
	// closeElem()
}
