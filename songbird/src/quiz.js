import './styles/sass/normalize.css'
import './styles/sass/main.sass'

import { getRandomBird, arrangeQuestions} from './components/quiz-layout';
import { controlSliderPlayer } from './components/playerControls';
import right from './assets/audio/right.mp3';
import wrong from './assets/audio/wrong.mp3';
import { fillOptionsList, makePreview, changeFirstPreview, getScore, toggleFinishScore, checkLangArray} from './components/helpers'
import {showBurger} from './components/burger';
import { redrawPage, setLocalStorage } from './components/lang';
import { selfCheck } from './components/selfcheck';
 


arrangeQuestions();
changeFirstPreview();
showBurger();
changeLangQuizz();

window.addEventListener('load', ()=> {
  setLocalStorage();
  newGameState.redrawOptions();
} 
);
selfCheck();

window.addEventListener('resize', showBurger);



const secretAudio = document.querySelector('.item__audio');
const playerIcon = document.querySelector('.player-icon');
const optionsItem = [...document.querySelectorAll('.options__item')];
const groupList = [...document.querySelectorAll('.questions__item')];
const nextBtn = document.querySelector('.next-btn');
const birdNameHtml = document.querySelector('.answer__name');
const birdImgHtml = document.querySelector('.guess__img');
const scoreHtml = [...document.querySelectorAll('.score')];


let birdsArr;


controlSliderPlayer();

const newGameState = {
  randomBird: 0,
  groupNum: 0,
  levelIsActive: false,
  previewIsOpen: false, 
  attemptCount: 0,
  finalScore: 0,
  birdOpen: 0,

  changePage() {
    changeFirstPreview();
    scoreHtml.forEach(el => {el.textContent =`${newGameState.finalScore}`});
  },

  redrawOptions() {
    const source = checkLangArray()[this.groupNum]; 
    fillOptionsList(optionsItem, source);
    if(this.previewIsOpen) {
      makePreview(source[this.birdOpen]);
    }
  }

}


function round(newGameState) {
  birdsArr = checkLangArray();
  if(newGameState.groupNum > 5) {
    return
  } 
  else {
    newGameState.randomBird = getRandomBird(birdsArr[newGameState.groupNum]);
    groupList[newGameState.groupNum].classList.add('active');
    secretAudio.src = birdsArr[newGameState.groupNum][newGameState.randomBird].audio;
    fillOptionsList(optionsItem, birdsArr[newGameState.groupNum]);
  }
}

optionsItem.forEach((el, index) => {
  el.addEventListener('click', ()=> {
    birdsArr = checkLangArray()
    if(newGameState.levelIsActive) {
      makePreview(birdsArr[newGameState.groupNum][index]);
      newGameState.previewIsOpen = true;
      newGameState.birdOpen = index;
    } else {
      makePreview(birdsArr[newGameState.groupNum][index]);
      checkAnswer(newGameState.randomBird, el, index);
      newGameState.attemptCount++;
      newGameState.previewIsOpen = true;
      newGameState.birdOpen = index;
    };
  });
});


function checkAnswer(correct, target, index) {
  birdsArr = checkLangArray()
  const answerAudio = new Audio();
  answerAudio.volume = 0.2;
  if (index == correct) {
    answerAudio.src = right;
    target.classList.add('correct');
    answerAudio.play();
    newGameState.levelIsActive = true;
    birdNameHtml.textContent = birdsArr[newGameState.groupNum][correct].name;
    birdImgHtml.src = birdsArr[newGameState.groupNum][correct].image;
    newGameState.finalScore += getScore(newGameState.attemptCount);
    scoreHtml.forEach(el => {el.textContent =`${newGameState.finalScore}`});
    secretAudio.pause();
    playerIcon.classList.remove('pause');
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
  newGameState.previewIsOpen = false;
  round(newGameState);
  newGameState.changePage();
  toggleFinishScore('block', 'none');
}


function changeLangQuizz() {
  let lang = '';
  const langList = document.querySelector('.header__navigation');
  const langInput = [...document.querySelectorAll('.lang__item')];

  langList.addEventListener('click', (e) => {
    if (e.target.dataset.lang) {
      lang = e.target.dataset.lang;
      (langInput.find(el => el.value == lang)).checked = true;
      localStorage.setItem('language', lang)
      redrawPage(lang);
      newGameState.redrawOptions();
    };
  });
}