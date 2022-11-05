import {birdsData} from './birds';

const birdsGallery = [...document.querySelectorAll('.viewbutton')];
const slider = document.querySelector('.gallery__slider');
const slides = [...document.querySelectorAll('.gallery__item')];

class SlideItem {
  constructor(name, species, img, audio, description) {
    this.name = name;
    this.species = species;
    this.img = img
    this.audio = audio;
    this.description = description;

  };

  drawLayout () {
    const item = document.createElement('div');
    item.className = 'gallery__item';
    const itemImg = document.createElement('img');
    item.className = 'item__image';
    itemImg.src = this.img 
    const itemName = document.createElement('h3');
    itemName.className = 'item__name';
    itemName.textContent = this.name;
    const itemLatin = document.createElement('h4');
    itemLatin.className = 'item__latin-name';
    itemLatin.textContent = this.species;
    const itemAudio = document.createElement('audio');
    itemAudio.className = 'item__audio';
    itemAudio.src = this.audio;
    const itemDescription = document.createElement('p');
    itemDescription.className = 'item__description';
    itemDescription.textContent = this.description;
    item.append(itemImg, itemName, itemLatin, itemAudio, itemDescription);
    return item;
  }
}

function makeGallery (array, index) {
  let arr = array[index];
  
  for( let i = 0; i < arr.length; i++) {
    const name = arr[i].name;
    const spec = arr[i].species;
    const img = arr[i].image;
    const audio = arr[i].audio;
    const descr = arr[i].description;
    const newSlide = new SlideItem (name, spec, img, audio, descr);
    slider.append(newSlide.drawLayout());
  }
}

//birdsGallery.addEventListener('click', makeGallery)

export {makeGallery}