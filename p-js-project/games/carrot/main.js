'use strict'

const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect(); // 필드에 놀이구역(범위설정)
const CARROT_SIZE = 80;
const popUp = document.querySelector('.pop-up');
const popUpText = document.querySelector('.pop-up__message');
const popUpRefresh = document.querySelector('.pop-up__refresh');

const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined;
// 당근, 벅스 랜덤 생성
const pickElem = function randomNum (lower, upper) {
    for(var i=0; i<1; i++) {
    let myRandom = Math.floor(Math.random() * (upper - lower + 1)) + lower;
    console.log(myRandom);
    return myRandom;
        }
    };
const carrotCount = pickElem (5, 10);
const bugCount = pickElem (9, 10);
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

function initGame() {
    score = 0;
    field.innerHTML = ''; //버튼 시작시마다 아이콘들이 추가되지 않게 리셋
    gameScore.innerText = carrotCount;
    addItem('carrot',carrotCount,'img/carrot.png');
    addItem('bug',bugCount,'img/bug.png');
}
function addItem(className, count, imgPath) {
    console.log(count);
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for (let i = 0;  i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min; //정해진 min,max 범위안에서 (max숫자는 미포함)
    
}

// 스코어 

field.addEventListener('click', onFieldClick);
gameBtn.addEventListener('click', () =>{
    if (started) {
        stopGame();
    } else{
        startGame();
    }
});

popUpRefresh.addEventListener('click', () =>{
    startGame();
    hidePopUP();
})




function startGame() {
    started = true;
    initGame();
    hideGameButton();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound)
}
function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    showPopUpWithText('REPLAY');
    playSound(alertSound);
    stopSound(bgsound);
    
}

function finishGame(win) {
    started = false;
    hideGameButton();
    stopGameTimer();
    if (win) {
        playSound(winSound)
    } else{
        playSound(bugSound)
    }
    stopSound(bgSound);
    showPopUpWithText(win? 'You Won' : 'You Lost');
    
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fas')
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';

}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
    
}

const GAME_DURATION_SEC = 5;
function startGameTimer() {
    // let count = 7;
    // let counter =setInterval(timer, 1000); 
    // function timer(){
    // count = count - 1;
    // if (count <= 0)
    // {
    //     clearInterval(counter);
    //     count = 0
    //     } 

    //     gameTimer.innerHTML= `00:${count}`
    // }
        
    // timer();
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() =>{
        if (remainingTimeSec <=0) {
            clearInterval(timer);
            finishGame(carrotCount === score);
            return;
        }
        updateTimerText(--remainingTimeSec)
    },1000);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerHTML = `${minutes}:${seconds}`
}


function stopGameTimer() {
    clearInterval(timer);
    hideGameButton();
    showPopUpWithText('REPLAY?') ;
}



function showPopUpWithText(text) {
    popUpText.innerText = text;
    popUp.classList.remove('pop-up--hide')
    
}




function onFieldClick(event) {
    if (!started) {
        return;
    }
    const target = event.target;
    if (target.matches('.carrot')) {
        target.remove();
        score++;
        playSound(carrotSound)
        updateScoreBoard();
        if (score === carrotCount) {
            finishGame(true);
        }
    } else if(target.matches('.bug')){
        finishGame(false);
    }
}

function playSound(sound) {
    sound.currentTime = 0; // 플레이가 항상 처음부터 시작되도록
    sound.play();
    
}

function stopSound(sound) {
    sound.pause();
    
}

function updateScoreBoard() {
    gameScore.innerText = carrotCount - score;
}

function hidePopUP() {
    popUp.classList.add('pop-up--hide');
    
}


