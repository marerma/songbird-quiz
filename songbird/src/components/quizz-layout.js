import { Player } from './player';


function arrangeQuestions(src) {
  const guessBird = new Player(src);
  const player = guessBird.drawPlayer();
  document.querySelector('.guess__name').append(player);
}


function getRandomBird(arr) {
  const min = 0;
  const max = arr.length;
  return Math.floor(Math.random() * (max - min) + min);
}
export {getRandomBird, arrangeQuestions}