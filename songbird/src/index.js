import './styles/sass/normalize.css'
import './styles/sass/main.sass'
import {showBird, showTitle} from './components/animation';
import {makeGallery, openGallery, slide, closeSlider} from './components/slider-birds';
import {controlSliderPlayer} from './components/playerControls';
import {showBurger} from './components/burger';
import { changeLang } from './components/lang';


showBird();
showTitle()
showBurger();
changeLang();




window.addEventListener('resize', showBurger);

let galleryIsOpen = false;

const birdsGallery = [...document.querySelectorAll('.viewbutton')];

birdsGallery.forEach((item, index) => item.addEventListener('click', () => {
  makeGallery(index);
  openGallery();

  if (window.innerWidth < 490 ) {
    setTimeout(()=> {
      const openItem = document.querySelector('.gallery-visible');
      openItem.style.top =  item.getBoundingClientRect().y  + 'px';

    }, 100)
    
  }
  
  galleryIsOpen = true
  if (galleryIsOpen) {
    controlSliderPlayer();
    slide();
   
    document.querySelector('.close').addEventListener('click', ()=> {
      closeSlider();
      galleryIsOpen = false;
    } );
  }
}))


