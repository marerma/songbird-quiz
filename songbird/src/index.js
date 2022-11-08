import './styles/sass/normalize.css'
import './styles/sass/main.sass'
import {showBird, showTitle} from './components/animation';
import {birdsData} from './components/birds.js';
import {makeGallery, openGallery, slide} from './components/slider-birds';
import {controlSliderPlayer} from './components/addFunc';

showBird();
showTitle()


const birdsGallery = [...document.querySelectorAll('.viewbutton')];

birdsGallery.forEach((item, index) => item.addEventListener('click', () => {
  makeGallery(birdsData, index);
  openGallery();
  controlSliderPlayer();
  slide();
}))



