# Carrot Game

## Introduction

당근과 버그를 랜덤으로 생성하여 주어진 시간안에 랜덤으로 지정된 숫자만큼 당근을 클릭하여 없애야지 이기는 게임.

## 🔭Skills

### - main.js

게임을 만들고 게임과 배너를 연결해준다.  
game에 setGamestopListener함수에 reason을 인자로 전달받아 swtich문에 해당하는 message받아온다.  
그리고 sound의 종류에 따라 나오도록 sound를 불러온다.

### - game.js

게임 start버튼, stop버튼, 기능들을 구성.  
start,stop 버튼 클릭시 발생되는 콜백함수들을 설정해 준다.  
게임이 시작되면 타이머가 작동되고 게임이 끝남과 동시에 main에서 reason을 setGamestopListener함수의 매개변수로 받아온다.  
onItemClick함수에서 받아온 매개변수가 당근이면 점수를 업데이트 시켜주고 점수를 비교하여 결과를 준다.

### - field.js

Field는 게임을 정확하게 생성하고 아이템들을 랜덤한곳에 배치하고 클릭까지 핸들링 해주는 클래스이다.  
Field 클래스에 필드 놀이 구역을 설정.  
className, count, imgPath을 매개변수로 받오는 addItem.  
지정해준 count만큼 이미지캐릭터를 생성해서 제한된 필드안에 랜덤으로 배치  
carrotCount, bugCount는 field > game > main 으로 전달되서 main에서 설정된다  
field 클릭시 onClick함수에서 css 셀럭터가 carrot인지 bug인지 확인하고 onItemClick함수에 매개변수를(carrot or bug)를 game에 onItemclick함수에 전달한다

### - popup.js

main에서 setGamestopListener함수안에서 gameFinishBanner.showWithText(message)를 받아 매개변수로 전달받아 popup message창에 text로 넣어준다

### - sound.js

사운드 종류 별로 사운드를 정의 해주고 main에 game.setGamestopListener에 switch문에서 인자값에 따라 결정되는 return sound에 따라 지정한 사운드를 재생한다
