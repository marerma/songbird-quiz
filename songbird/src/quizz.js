import './styles/sass/normalize.css'
import './styles/sass/main.sass'

import {quizzLayout, getRandomBird, arrangeQuestions} from './components/quizz-layout';
import {birdsGroups} from './components/birds-group';
import {birdsData} from './components/birds';
import {birdsDataEn} from './components/birdsEn.js';
import { Player } from './components/player';
import { controlSliderPlayer, progressUpdate } from './components/addFunc';
import right  from './assets/audio/right.mp3';
import wrong from './assets/audio/wrong.mp3';
import { fillOptionsList, makePreview, changeFirstPreview } from './components/helpers'

quizzLayout('En');
arrangeQuestions();


const groupArr = [...birdsGroups];
const birds = [... birdsData];
const birdsEn = [... birdsDataEn];
const secretAudio = document.querySelector('.item__audio');
const optionsItem = [...document.querySelectorAll('.options__item')];
const groupList = [...document.querySelectorAll('.questions__item')];
const nextBtn = document.querySelector('.next-btn');
const birdNameHtml = document.querySelector('.answer__name');
const birdImgHtml = document.querySelector('.guess__img');
controlSliderPlayer();

let randomBird;
let groupNum = 0;
let levelIsActive = false;

function round(groupNum) {
  if(groupNum > 5) {
    return
  } 
  else {
    randomBird = getRandomBird(birdsEn[groupNum]);
    console.log(randomBird)
    groupList[groupNum].classList.add('active');
    secretAudio.src = birdsEn[groupNum][randomBird].audio;

    fillOptionsList(optionsItem, birdsEn[groupNum]);
 
  }
}

optionsItem.forEach((el, index) => {
  el.addEventListener('click', ()=> {
    makePreview(birdsEn[groupNum][index]);
    checkAnswer(randomBird, el, index);
  })
})


function checkAnswer(correct, target, index) {
  const answerAudio = new Audio();
  if (index == correct) {
    answerAudio.src = right;
    target.classList.add('correct');
    answerAudio.play();
    levelIsActive = true;
    birdNameHtml.textContent = birdsEn[groupNum][correct].name;
    birdImgHtml.src = birdsEn[groupNum][correct].image;
    groupNum == 5? console.log('finished') : nextBtn.addEventListener('click', nextLevel);
    nextBtn.classList.add('next-active');
  } else {
    answerAudio.src = wrong;
    target.classList.add('incorrect');
    answerAudio.play();
    }   
  } 


function nextLevel() {
  groupList[groupNum].classList.remove('active');
  changeFirstPreview();
  nextBtn.classList.remove('next-active');
  levelIsActive = false;
  nextBtn.removeEventListener('click', nextLevel);
  groupNum++
  round(groupNum); 
  
}

round(groupNum) 



