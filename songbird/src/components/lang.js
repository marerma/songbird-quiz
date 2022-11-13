import { dictionary } from './dictionary';

function changeLang() {
  let lang = '';
  const langList = document.querySelector('.header__navigation');
  langList.addEventListener('click', (e) => {
    if (e.target.dataset.lang) {
      lang = e.target.dataset.lang;
      redrawPage(lang);
    };
  });
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
    nodesList = Array.of(headerItems, title, factsTitle, factsItems, rulesTitle, rulesItems, galleryTitle, startGame);
  } else if (document.URL.includes('quizz')) {
    const questionsItems = {"questionsItems": [...document.querySelectorAll('.questions__item')]};
    const score = { "score": document.querySelector('.score-text')};
    const finish = { "finish": document.querySelector('.finish-declaration')};
    const btnNew = { "btnNew": document.querySelector('.new-btn')};
    const next = { "next": document.querySelector('.next-btn')};
    nodesList = Array.of(headerItems, score, finish, btnNew, next, questionsItems);
  }


nodesList.forEach(el => {
  let key = Object.keys(el)[0]

if (!Array.isArray(el[key])) {
   el[key].innerHTML = dictionary[key][lng];
 } else {
   el[key].forEach((item, ind) => {
    item.innerHTML = dictionary[key][lng][ind];
   });
 }
});
}

export { changeLang }