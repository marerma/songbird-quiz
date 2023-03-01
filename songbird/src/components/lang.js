import { dictionary } from './dictionary';
import { closeSlider } from './slider-birds';


function changeLang() {
  let lang = '';
  const langList = document.querySelector('.header__navigation');
  const langInput = [...document.querySelectorAll('.lang__item')];

  langList.addEventListener('click', (e) => {
    if (e.target.dataset.lang) {
      lang = e.target.dataset.lang;
      (langInput.find(el => el.value == lang)).checked = true;
      localStorage.setItem('language', lang)
      redrawPage(lang);
    if(document.querySelector('.gallery-visible')) {
      closeSlider();
    }
    };
  });
}

function setLocalStorage() {
const langInput = [...document.querySelectorAll('.lang__item')]; 
  if(localStorage.getItem('language')) {
    let lang = localStorage.getItem('language');
    let input = langInput.filter(el => el.value === lang);
    input[0].checked = true;  
    redrawPage(lang);
  } else
  {
    let input = langInput.filter(el => el.value === 'en');
    input[0].checked = true;

  }

}

function redrawPage(lng) {
  let headerItems
  
  if (window.innerWidth <= 764) {
    headerItems = {"headerItems": [...document.querySelector('.burger__list').querySelectorAll('.header__link')]};
  } else headerItems = {"headerItems": [...document.querySelectorAll('.header__link')]};

  
  let nodesList
  if(document.URL.includes('index')) {
    const title = {"title": document.querySelector('.background-video__title')};
    const factsTitle = {"factsTitle": document.querySelector('.section__title_facts')};
    const factsItems = { "factsItems": [...document.querySelectorAll('.facts__item')]};
    const rulesTitle = { "rulesTitle": document.querySelector('.section__title_rules')};
    const rulesItems = {"rulesItems": [...document.querySelectorAll('.rules__item')]};
    const galleryTitle = { "galleryTitle": document.querySelector('.gallery_title')};
    const startGame = { "startBtn": document.getElementById('new-quizz')};
    const galleryItems = {"questionsItems": [...document.querySelectorAll('.bird-type__title')]};
    const viewBtn = { "viewBtn": [...document.querySelectorAll('.viewbutton')]};


    nodesList = Array.of(headerItems, title, factsTitle, factsItems, rulesTitle, rulesItems, galleryTitle, galleryItems, startGame, viewBtn);
  } 
  else if (document.URL.includes('quiz')) {
    const questionsItems = {"questionsItems": [...document.querySelectorAll('.questions__item')]};
    const score = { "score": document.querySelector('.score-text')};
    const finish = { "finish": document.querySelector('.finish-declaration')};
    const btnNew = { "btnNew": document.querySelector('.new-btn')};
    const next = { "next": document.querySelector('.next-btn')};
    const gameIntro = {"gameIntro": document.querySelector('.game__intro')};
    nodesList = Array.of(headerItems, score, finish, btnNew, next, questionsItems, gameIntro);
  }


nodesList.forEach(el => {
  let key = Object.keys(el)[0];

if (!Array.isArray(el[key])) {
   el[key].innerHTML = dictionary[key][lng];
  } else if (key == 'viewBtn') {
    el[key].forEach(btn => {btn.innerHTML = dictionary[key][lng]});
  } else {
   el[key].forEach((item, ind) => {
    item.innerHTML = dictionary[key][lng][ind];
   });
 }
});


}

export { changeLang, redrawPage, setLocalStorage }