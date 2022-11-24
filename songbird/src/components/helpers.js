import {birdsData} from './birds';
import {birdsDataEn} from './birdsEn.js';

function fillOptionsList(optionsArr, sourceArr) {
  optionsArr.forEach((el, ind) => {
    el.textContent = sourceArr[ind].name;

  })
}


function makePreview(obj) {
  const keys = ['name', 'species', 'description', 'image', 'audio'];
  document.querySelector('.game__intro').style.display = 'none';
  document.querySelector('.preview__container').style.display = 'flex';
  document.querySelector('.preview__description').style.display = 'flex';

  document.querySelector('.preview__image').src = obj[keys[3]];
  document.querySelector('.preview__name').textContent = obj[keys[0]];
  document.querySelector('.preview__latin-name').textContent = obj[keys[1]];
  document.querySelector('.item__audio.preview-audio').src = obj[keys[4]];
  document.querySelector('.preview__description').textContent = obj[keys[2]];
}

function changeFirstPreview() {
  document.querySelector('.game__intro').style.display = 'block';
  document.querySelector('.preview__container').style.display = 'none';
  document.querySelector('.preview__description').style.display = 'none';
  document.querySelector('.answer__name').textContent = '******';
  document.querySelector('.guess__img').src = './assets/img/hiddenBird.jpg';
  [...document.querySelectorAll('.options__item')].forEach(el => el.className = 'options__item')

}

// function getScore(attempt, maxScore = 5, maxAttempt = 6) {
//   return Math.floor(maxScore - attempt*(attempt/maxAttempt));
// }

function getScoreNew(attempt) {
  let score = [5, 4, 3, 2, 1, 0];
  return score[attempt-1];
}

function toggleFinishScore(propScore, propFinish) {
  document.querySelector('.game__score').style.display = propScore;
  document.querySelector('.game__round').style.display = propScore;
  document.querySelector('.game__next').style.display = propScore;
  document.querySelector('.game__finish').style.display = propFinish;
}



function checkLangArray() {
  const lang = document.querySelector("input[type='radio']:checked").value;
  let arrayBirds
  if (lang == 'en') {
    arrayBirds = [...birdsDataEn];
  } 
  else {
    arrayBirds = [...birdsData]};
    
  return arrayBirds
}


export {fillOptionsList, makePreview, changeFirstPreview, toggleFinishScore, checkLangArray, getScoreNew}