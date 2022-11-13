import './styles/sass/normalize.css'
import './styles/sass/main.sass'

import {quizzLayout, getRandomBird, arrangeQuestions} from './components/quizz-layout';
import {birdsGroups} from './components/birds-group';
import {birdsData} from './components/birds';
import {birdsDataEn} from './components/birdsEn.js';
import { controlSliderPlayer } from './components/addFunc';
import right  from './assets/audio/right.mp3';
import wrong from './assets/audio/wrong.mp3';
import { fillOptionsList, makePreview, changeFirstPreview, getScore, toggleFinishScore } from './components/helpers'
import {showBurger} from './components/burger'

quizzLayout('En');
arrangeQuestions();
showBurger();



const groupArr = [...birdsGroups];
const birds = [... birdsData];
const birdsEn = [... birdsDataEn];
const secretAudio = document.querySelector('.item__audio');
const optionsItem = [...document.querySelectorAll('.options__item')];
const groupList = [...document.querySelectorAll('.questions__item')];
const nextBtn = document.querySelector('.next-btn');
const birdNameHtml = document.querySelector('.answer__name');
const birdImgHtml = document.querySelector('.guess__img');
const scoreHtml = [...document.querySelectorAll('.score')];



controlSliderPlayer();

const newGameState = {
  randomBird: 0,
  groupNum: 0,
  levelIsActive: false,
  attemptCount: 0,
  finalScore: 0,
  changePage() {
    changeFirstPreview();
    scoreHtml.forEach(el => {el.textContent =`${newGameState.finalScore}`});
  }
}


function round(newGameState) {
  if(newGameState.groupNum > 5) {
    return
  } 
  else {
    newGameState.randomBird = getRandomBird(birdsEn[newGameState.groupNum]);
    groupList[newGameState.groupNum].classList.add('active');
    secretAudio.src = birdsEn[newGameState.groupNum][newGameState.randomBird].audio;
    fillOptionsList(optionsItem, birdsEn[newGameState.groupNum]);
  }
}

optionsItem.forEach((el, index) => {
  el.addEventListener('click', ()=> {
    if(newGameState.levelIsActive) {
      makePreview(birdsEn[newGameState.groupNum][index]);
    } else {
      makePreview(birdsEn[newGameState.groupNum][index]);
      checkAnswer(newGameState.randomBird, el, index);
      newGameState.attemptCount++;
    }
    
  })
})


function checkAnswer(correct, target, index) {
  
  const answerAudio = new Audio();
  if (index == correct) {
    answerAudio.src = right;
    target.classList.add('correct');
    answerAudio.play();
    newGameState.levelIsActive = true;
    birdNameHtml.textContent = birdsEn[newGameState.groupNum][correct].name;
    birdImgHtml.src = birdsEn[newGameState.groupNum][correct].image;
    newGameState.finalScore += getScore(newGameState.attemptCount);
    scoreHtml.forEach(el => {el.textContent =`${newGameState.finalScore}`});
    secretAudio.pause();
    nextBtn.classList.add('next-active');
    
    newGameState.groupNum == 5? 
      setTimeout(()=> {
        toggleFinishScore('none', 'block') 
      }, 3000)
      : nextBtn.addEventListener('click', nextLevel);
 
  } else {
    answerAudio.src = wrong;
    target.classList.add('incorrect');
    answerAudio.play();
    }   
  } 


function nextLevel() {
  groupList[newGameState.groupNum].classList.remove('active');
  changeFirstPreview();
  nextBtn.classList.remove('next-active');
  newGameState.levelIsActive = false;
  nextBtn.removeEventListener('click', nextLevel);
  newGameState.groupNum++;
  newGameState.attemptCount = 0;
  round(newGameState); 
}

round(newGameState);

const newBtn = document.querySelector('.game__new-game');
newBtn.addEventListener('click', newGame);

function newGame(){
  groupList[newGameState.groupNum].classList.remove('active');
  newGameState.groupNum = 0;
  newGameState.randomBird = 0;
  newGameState.attemptCount = 0;
  newGameState.finalScore = 0;
  newGameState.levelIsActive = false;
  round(newGameState);
  newGameState.changePage();
  toggleFinishScore('block', 'none');
}


