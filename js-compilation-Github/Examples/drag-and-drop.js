// Fill Listeners
const empties = document.querySelectorAll(".empty");
const fill = document.querySelector(".fill"); //Img class

fill.addEventListener("dragstart", dragStart);
fill.addEventListener("dragend", dragEnd);

empties.forEach((empty) => {
	empty.addEventListener("dragover", dragOver);
	empty.addEventListener("dragenter", dragEnter);
	empty.addEventListener("dragleave", dragLeave);
	empty.addEventListener("drop", dragDrop);
});

// Drag Functions
function dragStart() {
	// 이미지 파일을 드래그 하고있으면  hold가 되면서 보더에 색을 준다
	this.className += " hold";
	// 이미지가 떠나면서 invisible이 된다.
	// to make sure that this happens after we actually move it
	setTimeout(() => {
		this.className = "invisible";
	}, 0);
}

function dragEnd() {
	this.className = "fill";
}

function dragOver(e) {
	e.preventDefault();
}
function dragEnter(e) {
	e.preventDefault();
	// empty + hovered
	// 이미지가 들어오면서 hovered가 되면서 테투리 효과를 준다. 이미지가 드랍되면서 효과는 끝난다.
	this.className += " hovered";
}
function dragLeave() {
	// replaces empty
	this.className = "empty";
}
// don't work until dragover prevent
function dragDrop() {
	this.className = "empty";
	this.append(fill);
}
