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

function creatItem(text) {
    // item__row를 똑같이 구현해준다
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class','item__row');

    const item = document.createElement('div');
    item.setAttribute('class','item');

    const name = document.createElement('span');
    name.setAttribute('class','item__name');
    name.innerText = text;  //전달받은 텍스트 전달

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class','item__delete');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';// 아이콘은 변동될일 없으니깐 이렇게 써준다
    deleteBtn.addEventListener('click', () =>{
        items.removeChild(itemRow);
    })

    const itemDivider = document.createElement('div');
    itemDivider.setAttribute('class','item__divider');

    itemRow.appendChild(item);
    itemRow.appendChild(itemDivider);
    item.appendChild(name);
    item.appendChild(deleteBtn);
    return itemRow;
}

addBtn.addEventListener('click', () =>{
    onAdd();
})

input.addEventListener('keypress',(event) =>{
    if (event.keyCode == 13) {
         onAdd();
    }


})