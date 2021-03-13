'use strict';

const accordeonBlocks = document.querySelectorAll('.accordeon');
const callbackButton = document.querySelector('.header__call-button');
const callbackCloseButton = document.querySelector('.callback-popup__button-close');
const overlay = document.querySelector('.overlay');
const callbackPopup = document.querySelector('.callback-popup');

/*Footer Accordeon*/

if (accordeonBlocks) {
  accordeonBlocks.forEach((block) => {
    block.classList.remove('accordeon--nojs');

  const toggleButton = block.querySelector('.accordeon button');

  toggleButton.addEventListener('click', function() {
      block.classList.toggle('accordeon--closed');
    });
  });
}

/*CallBack Form*/

if (callbackButton) {
  let closePopup = () => {
    overlay.classList.add('overlay--hidden');
    callbackPopup.classList.remove('pop-up--show');
  };

  let showPopup = () => {
    overlay.classList.remove('overlay--hidden');
    callbackPopup.classList.add('pop-up--show');
  };

  callbackButton.addEventListener('click', function() {
    showPopup();
  });

  callbackButton.addEventListener('keydown', function(evt) {
    if (evt.key === 'Enter') {
      showPopup();
    }
  });

  callbackCloseButton.addEventListener('click', function() {
    closePopup();
  });

  overlay.addEventListener('click', function() {
    closePopup();
  });

  window.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  });
}
