'use strict';

const accordeonBlocks = document.querySelectorAll('.accordeon');
const toggleButtons = document.querySelectorAll('.accordeon button');

if (accordeonBlocks) {
  accordeonBlocks.forEach((block) => {
    block.classList.remove('accordeon--nojs');

  const toggleButton = block.querySelector('.accordeon button');

  toggleButton.addEventListener('click', function() {
      block.classList.toggle('accordeon--closed');
    });
  });
}
