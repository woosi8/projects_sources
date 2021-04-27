'use strict'
import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as sound from './sound.js'
import { Filed } from './field.js';

const pickElem = function randomNum(lower, upper) {
  for (var i = 0; i < 1; i++) {
    let myRandom = Math.floor(Math.random() * (upper - lower + 1)) + lower;
    console.log(myRandom);
    return myRandom;
  }
};

const carrotCount = pickElem(5, 10);
const bugCount = pickElem(9, 10);


const gameFinishBanner = new PopUp();

// object를 간편하고 알기 쉽게 하기 위해 개선한 방법
const game = new GameBuilder()
  .withgameDuration(5)
  .withcarrotCount(carrotCount)
  .withbugCount(bugCount)
  .build();


game.setGamestopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.win:
      message = 'YOU WON 🎉';
      sound.playWin();
      break;
    case Reason.lose:
      message = 'YOU LOST 💩';
      sound.playBug();
      break;
    case Reason.cancel:
      message = 'Replay❓';
      sound.playAlert();
      break;
    default:
      throw new Error('not valid reason');
  }

  gameFinishBanner.showWithText(message);
})

gameFinishBanner.setClickListener(() => {
  game.start();
})












