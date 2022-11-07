import {birdsData} from './birds';

const birdsGallery = [...document.querySelectorAll('.viewbutton')];


class SlideItem {
  constructor(name, species, img, audio, description) {
    this.name = name;
    this.species = species;
    this.img = img
    this.audio = new Audio(audio);
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
    const itemAudio = this.audio;
    itemAudio.className = 'item__audio';
    // itemAudio.src = this.audioSrc
    // itemAudio.type = 'audio/mpeg';
    const itemPlayer = document.createElement('div');
    itemPlayer.className = 'item__player';
    itemPlayer.innerHTML = `
      <button class="player-icon"></button>
      <button class="volume-icon"></button>
      <input type="range" class="volume-range" min="0" max="100">
      <div class="item-progress-container">
      <div class="track__time">
      <span class="current-time">00:00</span><span class="track-time"></span></div> 
      <progress class="track" value="0" max="100"></progress></div>`
    
    const itemDescription = document.createElement('p');
    itemDescription.className = 'item__description';
    itemDescription.textContent = this.description;
    item.append(itemImg, itemName, itemLatin, itemPlayer, itemAudio, itemDescription);
    itemContainer.append(item);
    return itemContainer;
  };

  play() {
    this.audio.play();
    this.audio.volume = 0.1
    
  }

  pause() {
    this.audio.pause();
  }
}

function makeGallery (array, index) {
  let arr = array[index];
  const slider = document.createElement('div');
  document.querySelector('.gallery-container').append(slider);
  slider.className = 'bird-type__gallery';
  slider.innerHTML = `<button class="close"></button>`;
  const itemGallery = document.createElement('div');
  itemGallery.className = 'gallery__slider';
  slider.append(itemGallery);
  const checker = document.createElement('div');
  checker.className = "slider__checker";

  for( let i = 0; i < arr.length; i++) {
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
    const playIcon = [...document.querySelectorAll('.player-icon')];


    playIcon[i].addEventListener('click', ()=> {

      if(newSlide.audio.paused) {
        newSlide.play();
        playIcon[i].classList.add('pause');
      } else {
        newSlide.pause();
        playIcon[i].classList.remove('pause');
      }
    
    })  

    

  }   
  slider.append(checker);
  [...document.querySelectorAll('.dots')][0].classList.add('active');

  setTimeout(()=> {
   slider.classList.add('gallery-visible');
  }, 100)
 
  document.querySelector('.close').addEventListener('click', closeSlider);
  
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
      if (index >= currentIndex) {
        const soundPlayingPrev = [...document.querySelectorAll('.item__audio')][index-1];
        const playIconPrev = [...document.querySelectorAll('.player-icon')][index-1];
        if
         (!soundPlayingPrev.paused || soundPlayingPrev.currentTime >= 0 || !soundPlayingPrev.started)  {
           soundPlayingPrev.pause();
           soundPlayingPrev.currentTime = 0;
           playIconPrev.classList.remove('pause');
         }
        slider.classList.add('slider-animation-left');
      } else {
        const soundPlayingNext = [...document.querySelectorAll('.item__audio')][index+1];
        const playIconNext = [...document.querySelectorAll('.player-icon')][index+1];
        if
         (!soundPlayingNext.paused || soundPlayingNext.currentTime >= 0 || !soundPlayingNext.started) 
         {
          soundPlayingNext.pause();
          soundPlayingNext.currentTime = 0;
          playIconNext.classList.remove('pause');
         }
        slider.classList.add('slider-animation-right')};
      
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
}

function closeSlider() {
  const slider = document.querySelector('.bird-type__gallery');
  slider.classList.remove('gallery-visible');
  setTimeout(()=> {
    slider.remove();
   }, 500)
  
} 




export {makeGallery, slide}