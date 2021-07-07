import {setImageScale} from './picture-scale.js';
import {isEscEvent} from './util.js';
import { sendData } from './api.js';

const MAX_TAGS_COUNT = 5;
const DEFAULT_SCALE_VALUE = 100;

const validity =  /^#[a-zA-Zа-яА-я0-9]{1,19}$/;

const uploadForm = document.querySelector('.img-upload__form');
const uploadFile = uploadForm.querySelector('#upload-file');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadOverlay.querySelector('#upload-cancel');
const effectValue = uploadOverlay.querySelector('.effect-level__value');
const hashTagsInput = uploadOverlay.querySelector('.text__hashtags');
const pictureDescription = uploadOverlay.querySelector('.text__description');
const imagePreview = uploadOverlay.querySelector('.img-upload__preview');
const uploadImagePreview = imagePreview.querySelector('img');
const sliderWrapper = uploadOverlay.querySelector('.img-upload__effect-level');
const successPopup = document.querySelector('#success').content.querySelector('.success');
const successButton = successPopup.querySelector('.success__button');
const errorPopup = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorPopup.querySelector('.error__button');

const closeModal = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
  effectValue.value = '';
  hashTagsInput.value = '';
  pictureDescription.value = '';
  setImageScale(DEFAULT_SCALE_VALUE);
  uploadImagePreview.style.filter = 'none';
  uploadImagePreview.classList = '';
};

const openModal = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  sliderWrapper.classList.add('visually-hidden');
};

const modalKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeModal();
    document.removeEventListener('keydown', modalKeydownHandler);
  }
};

const uploadFileChangeHandler = () => {
  openModal();
  document.addEventListener('keydown', modalKeydownHandler);
};

const uploadCancelButtonClickHandler = () => {
  closeModal();
  document.removeEventListener('keydown', modalKeydownHandler);
};

uploadFile.addEventListener('change', uploadFileChangeHandler);

uploadCancelButton.addEventListener('click', uploadCancelButtonClickHandler);

hashTagsInput.addEventListener('input', () => {
  const hashTagsArray = hashTagsInput.value.trim().split(' ');
  const lowerTagsArray = hashTagsInput.value.trim().toLowerCase().split(' ').sort();

  hashTagsArray.forEach((element) => {
    if (hashTagsArray.length > MAX_TAGS_COUNT) {
      return hashTagsInput.setCustomValidity('Максимальное количество тегов - 5.');
    }
    if (element === '') {
      return hashTagsInput.setCustomValidity('');
    }
    if (element.length === 1) {
      return hashTagsInput.setCustomValidity('Тег должен состоять минимум из двух символов');
    }
    if (!validity.test(element)) {
      return hashTagsInput.setCustomValidity('Тег должен начинатся с # и состоять максимум из 20 букв и цифр.');
    }
    if (element.length > 20) {
      return hashTagsInput.setCustomValidity('Макс.длина 20');
    }
    return hashTagsInput.setCustomValidity('');
  });

  lowerTagsArray.forEach((element, index) => {
    if (lowerTagsArray[index] === lowerTagsArray[index + 1]) {
      return hashTagsInput.setCustomValidity('Теги не должны повторяться');
    }
  });

  const inputValidityCheck = hashTagsInput.checkValidity();

  if (!inputValidityCheck) {
    hashTagsInput.style.borderColor = 'red';
  } else if (inputValidityCheck) {
    hashTagsInput.style.borderColor = '';
  }

  hashTagsInput.reportValidity();
});

hashTagsInput.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

pictureDescription.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

const removeEventListeners = (event) => {
  document.removeEventListener('click', event);
  document.removeEventListener('keydown', event);
};

const popupEventsHandler = (evt) => {
  if (isEscEvent(evt)) {
    document.body.lastChild.remove();
    removeEventListeners(popupEventsHandler);
  } else if (evt.target === document.body.lastChild) {
    document.body.lastChild.remove();
    removeEventListeners(popupEventsHandler);
  }
};

const popupClickHandler = () => {
  document.body.lastChild.remove();
  removeEventListeners(popupEventsHandler);
};

const popupOpenHandler = (template, button) => {
  closeModal();
  document.body.append(template);

  document.removeEventListener('keydown', modalKeydownHandler);

  button.addEventListener('click', popupClickHandler);
  document.addEventListener('keydown', popupEventsHandler);
  document.addEventListener('click', popupEventsHandler);
};

const setUserFormSubmit = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => popupOpenHandler(successPopup, successButton),
      () => popupOpenHandler(errorPopup, errorButton),
      new FormData(evt.target),
    );
  });
};

setUserFormSubmit();
