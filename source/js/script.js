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
const pageBody = document.querySelector('.page-body');
const phoneLength = 18;

const anchors = document.querySelectorAll('a[href*="#"]');

const feedbackForm = document.querySelector('.feedback');
const feedbackFormSendButton = feedbackForm.querySelector('.feedback__submit');
const feedbackFormAgreement = feedbackForm.querySelector('#personal-data');
const feedbackFormNameInput = feedbackForm.querySelector('#name');
const feedbackFormPhoneInput = feedbackForm.querySelector('#phone');
const feedbackFormQuestionInput = feedbackForm.querySelector('#question');
const escButton = 'Escape';

/* Mask */

let maskPhone = (selector, masked = '+7 (___) ___-__-__') => {
  const elems = document.querySelectorAll(selector);

  if (elems) {
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
  }
};

if (document.querySelector('input[type="tel"]')) {
  maskPhone('input[type="tel"]');
}

/*Scroll*/

if (anchors) {
  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const blockID = anchor.getAttribute('href').substr(1);

      if (blockID) {
        document.getElementById(blockID).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    })
  }
}

/* Footer Accordeon */

if (accordeonBlocks) {
  let activePanel;

  accordeonBlocks.forEach((block) => {
    block.classList.remove('accordeon--nojs');
    block.classList.add('accordeon--closed');

    block.addEventListener('click', function() {
      if (!block.classList.contains('accordeon--closed')) {
        activePanel = block;
      }

      if (block.classList.contains('accordeon--closed')) {
        if (activePanel) {
          activePanel.classList.add('accordeon--closed');
        }
        block.classList.remove('accordeon--closed');
        activePanel = block;
      } else {
        block.classList.add('accordeon--closed');
      }
    });
  });
}

/* Validation */

const validatePhone = (phoneInput) => {
  if (phoneInput.validity.valueMissing) {
    phoneInput.setCustomValidity(`Обязательное поле`);
  } else {
    phoneInput.setCustomValidity(``);
  }

  phoneInput.addEventListener(`input`, function () {
    let valueLength = phoneInput.value.length;

    if (valueLength < phoneLength) {
      phoneInput.setCustomValidity(`неверный формат`);
    } else {
      phoneInput.setCustomValidity(``);
    }
  });
};

const validateName = (nameInput) => {
  if (nameInput.validity.valueMissing) {
    nameInput.setCustomValidity(`Обязательное поле`);
  } else {
    nameInput.setCustomValidity(``);
  }

  nameInput.addEventListener(`input`, function () {
    let valueLength = nameInput.value.length;

    if (valueLength < 1) {
      nameInput.setCustomValidity(`Input your name`);
    } else {
      nameInput.setCustomValidity(``);
    }
  });
};

/* CallBack Form */

if (callbackButton) {
  let closePopup = () => {
    overlay.classList.add('overlay--hidden');
    callbackPopup.classList.remove('pop-up--show');
    pageBody.classList.remove('page-body--special');
  };

  let showPopup = () => {
    overlay.classList.remove('overlay--hidden');
    callbackPopup.classList.add('pop-up--show');
    pageBody.classList.add('page-body--special');
    callbackNameInput.focus();
  };

  callbackButton.addEventListener('click', function(evt) {
    evt.preventDefault();
    showPopup();
  });

  callbackCloseButton.addEventListener('click', function() {
    closePopup();
  });

  overlay.addEventListener('click', function() {
    closePopup();
  });

  window.addEventListener('keydown', function(evt) {
    if (evt.key === escButton) {
      closePopup();
    }
  });

  if (callbackSendButton) {
    validatePhone(callbackPhoneInput);
    validateName(callbackNameInput);
    callbackSendButton.addEventListener('click', function (evt) {
      if (callbackPhoneInput.value.length !== phoneLength && callbackNameInput.value.valueMissing) {
        evt.preventDefault();
      } else if (callbackAgreement.checked && (callbackNameInput.value !== "") && (callbackPhoneInput.value.length === phoneLength)) {
        evt.preventDefault();
        localStorage.setItem('callbackUserName', callbackNameInput.value);
        localStorage.setItem('callbackPhoneNumber', callbackPhoneInput.value);
        localStorage.setItem('callbackQuestion', callbackQuestionInput.value);
        closePopup();
      }
    });
  }
}

/*Feedback Form*/

if (feedbackForm) {
  validatePhone(feedbackFormPhoneInput);
  validateName(feedbackFormNameInput);
  feedbackFormSendButton.addEventListener('click', function (evt) {
    if (feedbackFormPhoneInput.value.length !== phoneLength && feedbackFormNameInput.value.valueMissing) {
      evt.preventDefault();
    } else if (feedbackFormAgreement.checked && (feedbackFormNameInput.value !== "") && (feedbackFormPhoneInput.value.length === phoneLength)) {
      evt.preventDefault();
      localStorage.setItem('feedbackUserName', feedbackFormNameInput.value);
      localStorage.setItem('feedbackPhoneNumber', feedbackFormPhoneInput.value);
      localStorage.setItem('feedbackQuestion', feedbackFormQuestionInput.value);
    }
  });
}
