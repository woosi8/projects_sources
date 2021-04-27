// Fetch the items from the JSON file
function loadItems() {
    return fetch('data/data.json')
        .then(response => response.json()) // 패치해서 받은 respnse 바디를 JSON의 obejct로 변환
        .then(json => json.items)
}

// Update the list with the given items
function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => creatHTMLString(item).join('')) // join : 문자열의 배열을 하나의 배열로 병합해주기
}
// Create HTML list item from the given data item
function creatHTMLString(item) {
    return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
      <span class="item__description">${item.gender}, ${item.size}</span>
    </li>    
    `;
}

// Handle button click
// 이 방식은 클릭할때마다 데이터를 로딩하기 떄문에 좋지 못하다
function onButtonClick(event, items) {
    // console.log(event.target.dataset.key);
    // console.log(event.target.dataset.value);
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    if (key == null || value == null) {
        return;
    }
    // filter : 배열에서 어떤 특정한 데이터만 추출해서 새로운 작은 단위에 배열을 만들때 사용
    displayItems(items.filter(item => item[key] === value))// [key]:오브젝트는 배열처럼 키를 이용해서 데이터의 접근 가능, item의 오브젝트안에  key에 해당하는 값이 === 우리가 원하는 value 인 아이들만 전달
    // 개선방안
    // updateItems(items,key,value);
}
// 개선 방안 : display none을 이용
// Make the itmes matching {key:value} invisible.
// function updateItems(items, key, value) {
//     items.forEach(item => {
//         if (item.dataset[key] === value) {
//             item.classList.remove('invisible') //css 손봐줘야함
//         } else {
//             item.classList.add('invisible')
//         }
//     });

// }



function setEventListener(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items)); //클릭되면 모든 아이템이 보이도록하기
    buttons.addEventListener('click', event => onButtonClick(event, items))
}

// main
// JSON을 동적으로 읽어오니깐 로딩시간이 있기때문에 Promise를 리턴하도록
loadItems()
    .then(items => {
        displayItems(items);
        setEventListener(items) // 버튼을 누르면 필터링이 필요하니깐
    })
    .catch()