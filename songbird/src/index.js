import './styles/sass/normalize.css'
import './styles/sass/main.sass'
import {showBird, showTitle, animateByScroll} from './components/animation';
import {birdsData} from './components/birds.js';
import {makeGallery} from './components/slider-birds';

showBird();
showTitle()


const birdsGallery = [...document.querySelectorAll('.viewbutton')];

birdsGallery.forEach((item, index) => item.addEventListener('click', () => {
  makeGallery(birdsData, index);
}))
