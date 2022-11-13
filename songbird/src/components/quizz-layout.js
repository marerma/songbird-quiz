import { Player } from './player';
import { changeFirstPreview} from './helpers'

// function quizzLayout(lang) {
//  changeFirstPreview()
//  const gameSection = document.querySelectorAll('.questions__item');
//  const questionsList = document.createElement('ul');
//  questionsList.className = 'questions__list';
//  gameSection.append(questionsList);
//  const questions = birdsGroups.reduce((res, el) => {
//    res.push(el[lang]);
//    return res
//  }, []);

// makeList('questions__item', questions, questionsList);
// }




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