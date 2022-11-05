function animateByScroll(animationClass, animatedItem, itemBlock) {
  const item = document.querySelector(`.${animatedItem}`);
  item.classList.remove(animationClass);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
    
      if (entry.isIntersecting) {
        item.classList.add(animationClass);
        return;
      }
      item.classList.remove(animationClass);
    });
  });
  observer.observe(document.querySelector(`.${itemBlock}`));
  }
 



function showBird() {
  animateByScroll('flying-bird', 'facts__bird', 'facts__img');
  }
 
function showTitle() {
  animateByScroll('section__title_animation', 'section__title_facts', 'facts__list');
  animateByScroll('facts__list_animation', 'facts__list', 'facts__container');
}


export {showBird, showTitle, animateByScroll} 