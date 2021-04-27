'use strict'

const items = document.querySelector('.items'),
      input = document.querySelector('.footer__input'),
      addBtn = document.querySelector('.footer__button');
      input.focus();

function onAdd() {
    // 1. 사용자가 입력한 텍스트를 받아옴
    const text = input.value;
    if (text === '') {
        input.focus();
        return;
    }
    // 2. 새로운 아이템을 만듬 (텍스트 + 삭제 버튼)
    const item = creatItem(text);
    // 3. items 컨테이너안에 새로 만든 아이템을 추가한다.
    items.appendChild(item);
    // 4. 새로 추가된 아이템으로 스크롤링 최신화
    item.scrollIntoView({block:'center'});
    // 5. 인풋을 초기화 한다.
    input.value = '';
    input.focus();

}

let id = 0; /// 인티져로 해주는건 안좋다. 여기선 간단히 하기위해서 : UUID (유니크아이디)로 하는게 좋다. 아니면 오브젝트 해시코드이용

function creatItem(text) {
    // item__row를 똑같이 구현해준다
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class','item__row');
    itemRow.setAttribute('data-id', id);
    // String으로 해주기
    itemRow.innerHTML = `
    <div class="item" >
         <span class="item__name">${text}</span>
         <button class="item__delete">
            <i class="fas fa-trash-alt ed" data-id=${id}></i>
         </button>
    </div>
    <div class="itme__divier"></div>
    `
    id++
    return itemRow;
}

addBtn.addEventListener('click', () =>{
    onAdd();
})

input.addEventListener('keypress',(event) =>{
    if (event.keyCode == 13) {
         onAdd();
    }
});

// 이벤트 위임
items.addEventListener('click', event => {
    const id = event.target.parentNode.dataset.id;
    //   if (event.target.nodeName ==='path') { // 형제중에 같은 타입(path)이 있으면 같이 사라지는 위험이 있음.
      if (id) { 
         const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
         toBeDeleted.remove();

      }

    // i class에 클래스 주어지고 클래스로 부모를 찾아서 삭제해보기
    //   const id = event.target.parentNode.classList.contains('ed');
    //   if (id) { 
    //     const parent = event.target.parentNode.parentNode.parentNode.parentNode;
    //     parent.remove();
    //   }

})
