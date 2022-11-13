import {birdsGroups} from './birds-group'
import { Player } from './player';
import { makeList, changeFirstPreview} from './helpers'

function quizzLayout(lang) {
 changeFirstPreview()
 const gameSection = document.querySelector('.game__questions');
 const questionsList = document.createElement('ul');
 questionsList.className = 'questions__list';
 gameSection.append(questionsList);
 const questions = birdsGroups.reduce((res, el) => {
   res.push(el[lang]);
   return res
 }, []);

makeList('questions__item', questions, questionsList);
}




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
export {quizzLayout, getRandomBird, arrangeQuestions, makeList}