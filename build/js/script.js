'use strict';

const accordeonBlocks = document.querySelectorAll('.accordeon');

const callbackButton = document.querySelector('.header__call-button');
const callbackCloseButton = document.querySelector('.callback-popup__button-close');
const overlay = document.querySelector('.overlay');
const callbackPopup = document.querySelector('.callback-popup');
const callbackSendButton = callbackPopup.querySelector('.callback-popup__submit');
const callbackAgreement = callbackPopup.querySelector('#personal-data-popup');
const callbackNameInput = callbackPopup.querySelector('#name-popup');
const callbackPhoneInput = callbackPopup.querySelector('#phone-popup');
const callbackQuestionInput = callbackPopup.querySelector('#question-popup');

const anchors = document.querySelectorAll('a[href*="#"]');

const feedbackForm = document.querySelector('.feedback');
const feedbackFormSendButton = feedbackForm.querySelector('.feedback__submit');
const feedbackFormAgreement = feedbackForm.querySelector('#personal-data');
const feedbackFormNameInput = feedbackForm.querySelector('#name');
const feedbackFormPhoneInput = feedbackForm.querySelector('#phone');
const feedbackFormQuestionInput = feedbackForm.querySelector('#question');

/* Mask */

let maskPhone = (selector, masked = '+7 (___) ___-__-__') => {
  const elems = document.querySelectorAll(selector);

  function mask(event) {
    const keyCode = event.keyCode;
    const template = masked,
      def = template.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
    let i = 0,
      newValue = template.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
    i = newValue.indexOf("_");
    if (i !== -1) {
      newValue = newValue.slice(0, i);
    }
    let reg = template.substr(0, this.value.length).replace(/_+/g,
      function (a) {
        return "\\d{1," + a.length + "}";
      }).replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
      this.value = newValue;
    }
    if (event.type === "blur" && this.value.length < 5) {
      this.value = "";
    }
  }

  for (const elem of elems) {
    elem.addEventListener("input", mask);
    elem.addEventListener("focus", mask);
    elem.addEventListener("blur", mask);
  }
};

maskPhone('input[type="tel"]');

/*Scroll*/

if (anchors) {
  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = anchor.getAttribute('href').substr(1)

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }
}

/* Footer Accordeon */

if (accordeonBlocks) {
  accordeonBlocks.forEach((block) => {
    block.classList.remove('accordeon--nojs');

  const toggleButton = block.querySelector('.accordeon button');

  toggleButton.addEventListener('click', function() {
      block.classList.toggle('accordeon--closed');
    });
  });
}

/* CallBack Form */

if (callbackButton) {
  let closePopup = () => {
    overlay.classList.add('overlay--hidden');
    callbackPopup.classList.remove('pop-up--show');
  };

  let showPopup = () => {
    overlay.classList.remove('overlay--hidden');
    callbackPopup.classList.add('pop-up--show');
    callbackNameInput.focus();
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

  if (callbackSendButton) {
    callbackSendButton.addEventListener('click', function (evt) {
      if (callbackAgreement.checked) {
        evt.preventDefault();
        localStorage.setItem('modalUserName', callbackNameInput.value);
        localStorage.setItem('modalPhoneNumber', callbackPhoneInput.value);
        localStorage.setItem('modalQuestion', callbackQuestionInput.value);
        closePopup();
      }
    });
  }
}

/*Feedback Form*/

if (feedbackForm) {
  feedbackFormSendButton.addEventListener('click', function (evt) {
    if (feedbackFormAgreement.checked) {
      evt.preventDefault();
      localStorage.setItem('modalUserName', feedbackFormNameInput.value);
      localStorage.setItem('modalPhoneNumber', feedbackFormPhoneInput.value);
      localStorage.setItem('modalQuestion', feedbackFormQuestionInput.value);
      closePopup();
    }
  });
}