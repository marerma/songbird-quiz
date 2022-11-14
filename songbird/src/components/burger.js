function showBurger() {

  if(window.innerWidth <= 764 && !document.querySelector('.burger__list')) {
    const insertBurger = document.querySelector('.header__navigation');
    const menuList = document.querySelector('.header__nav-list');
    const burger = menuList.cloneNode(true);
    burger.className = 'burger__list';
    const icon = document.createElement('div');
    icon.className = 'burger-icon';
    insertBurger.append(icon);
    insertBurger.append(burger);
    const closeIcon = document.createElement('div');
    closeIcon.className = 'burger-close';
    burger.prepend(closeIcon);
    const bg = document.createElement('div');
    bg.className = 'burger-bg'
    document.querySelector('.header').append(bg);

    closeIcon.addEventListener('click', () => {
      burger.classList.toggle('burger-open');
      bg.classList.toggle('burger-bg_open');
    });

    icon.addEventListener('click', () => {
      burger.classList.toggle('burger-open');
      bg.classList.toggle('burger-bg_open');
    });

    bg.addEventListener('click', (e) => {
      if (e.target !== burger) {
        burger.classList.toggle('burger-open');
        bg.classList.toggle('burger-bg_open');
      };
    });

  } else if (window.innerWidth > 764 && document.querySelector('.burger__list')){
    document.querySelector('.burger__list').classList.remove('burger-open');
    document.querySelector('.burger-bg').classList.remove('burger-bg_open')
  }

}

export { showBurger }