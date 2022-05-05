const toggleMenu = document.querySelector('.header__toggle');
const mobileMenu = document.querySelector('.main-nav');
const iconMenuOpen = document.querySelector('.header__toggle-svg');
const iconMenuClose = document.querySelector('.header__close-menu');

const toggleSubmenu = document.querySelector('.main-nav__link--toggle');
const submenu = document.querySelector('.main-nav__sublist');

toggleMenu.addEventListener('click', () => {
  if(mobileMenu.classList.contains('main-nav--closed')){
    mobileMenu.classList.remove('main-nav--closed');
    iconMenuOpen.classList.add('header__toggle-svg--hide');
    iconMenuClose.classList.remove('header__close-menu--hide');
  }
  else {
    mobileMenu.classList.add('main-nav--closed');
    iconMenuClose.classList.add('header__close-menu--hide');
    iconMenuOpen.classList.remove('header__toggle-svg--hide');
  }
});

toggleSubmenu.addEventListener('click', (e) => {
  console.log(e);
  if(toggleSubmenu.classList.contains('main-nav__link--open')) {
    submenu.classList.remove('main-nav__sublist--close');
    toggleSubmenu.classList.remove('main-nav__link--open');
  }
  else {
    submenu.classList.add('main-nav__sublist--close');
    toggleSubmenu.classList.add('main-nav__link--open');
  }
})
