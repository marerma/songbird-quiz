import {Player} from './player';
import {birdsData} from './birds.js';
import {birdsDataEn} from './birdsEn.js';


class SlideItem {
  constructor(name, species, img, audio, description) {
    this.name = name;
    this.species = species;
    this.img = img
    this.audio = new Player(audio);
    this.description = description;
  };

  drawLayout () {
    const itemContainer = document.createElement('div');
    itemContainer.className = 'gallery__item-container';
    const item = document.createElement('div');
    item.className = 'gallery__item';
    const itemImg = document.createElement('img');
    itemImg.className = 'item__image';
    itemImg.src = this.img 
    const itemName = document.createElement('h3');
    itemName.className = 'item__name';
    itemName.textContent = this.name;
    const itemLatin = document.createElement('h4');
    itemLatin.className = 'item__latin-name';
    itemLatin.textContent = this.species;
    const itemPlayer = this.audio.drawPlayer();    
    const itemDescription = document.createElement('p');
    itemDescription.className = 'item__description';
    itemDescription.textContent = this.description;
    item.append(itemImg, itemName, itemLatin, itemPlayer, itemDescription);
    itemContainer.append(item);
    return itemContainer;
  };

}



function makeGallery (index) {
  const lang = document.querySelector("input[type='radio']:checked").value;

  let arrayBirds
  if (lang == 'en') {
    arrayBirds = [...birdsDataEn];
  } else arrayBirds = [...birdsData];

  let arr = arrayBirds[index];
  const slider = document.createElement('div');
  document.querySelector('.gallery-container').append(slider);
  slider.className = 'bird-type__gallery';
  slider.innerHTML = `<button class="close"></button>`;
  const itemGallery = document.createElement('div');
  itemGallery.className = 'gallery__slider';
  slider.append(itemGallery);
  const checker = document.createElement('div');
  checker.className = "slider__checker";

  for(let i = 0; i < arr.length; i++) {
    const name = arr[i].name;
    const spec = arr[i].species;
    const img = arr[i].image;
    const audio = arr[i].audio;
    const description = arr[i].description;
    const dot = document.createElement('div');
    dot.className = 'dots';
    const newSlide = new SlideItem(name, spec, img, audio, description);
    itemGallery.append(newSlide.drawLayout());
    checker.append(dot);
  }   
  slider.append(checker);
  [...document.querySelectorAll('.dots')][0].classList.add('active');
}

function slide () {
  const dots = document.querySelectorAll('.dots');
  const slides = document.querySelectorAll('.gallery__item-container');
  const slider = document.querySelector('.gallery__slider');
  let slideWidth = parseInt((getComputedStyle([...slides][0]).width).replace('px', ''), 10);
  let currentIndex = 0 
  let dotsArr = [...dots]
  slider.style.left = 0 + 'px'
  let newPosition = 0

  dotsArr.forEach((item, index) => {
    item.addEventListener('click', ()=> {
      removeDotsClass()
      addActiveClass(item);
      newPosition = (index * slideWidth);
      
      let soundPlaying = [...document.querySelectorAll('.item__audio')][index-1];
      let playIcon = [...document.querySelectorAll('.player-icon')][index-1];

    if (index >= currentIndex) {
      slider.classList.add('slider-animation-left');
    } else {
      soundPlaying = [...document.querySelectorAll('.item__audio')][index+1];
      playIcon = [...document.querySelectorAll('.player-icon')][index+1];
      slider.classList.add('slider-animation-right');
    };
    stopSong(soundPlaying, playIcon);

    setTimeout(()=>{
      slider.style.left = -newPosition + 'px'
      slider.classList.remove('slider-animation-left');
      slider.classList.remove('slider-animation-right');
    }, 1000)
    currentIndex = index;
  })
})

function removeDotsClass() {
  for (let dot of dots) {
    dot.classList.remove('active');
  }
}

function addActiveClass(item) {
  item.classList.add('active');
  }

function stopSong(slide, icon) {
  if (!slide.paused || slide.currentTime >= 0 || !slide.started)  {
    slide.pause();
    slide.currentTime = 0;
    icon.classList.remove('pause');
  }
  }
}

function closeSlider() {
  const slider = document.querySelector('.bird-type__gallery');
  slider.classList.remove('gallery-visible');
  setTimeout(()=> {
    slider.remove();
   }, 500)
  
} 

function openGallery() {
  const slider = document.querySelector('.bird-type__gallery');
  setTimeout(()=> {
    slider.classList.add('gallery-visible');
   }, 100)
}


export {makeGallery, slide, openGallery, closeSlider}