import { isEscEvent } from './util.js';

const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadOverlay.querySelector('#upload-cancel');
const effectValue = uploadOverlay.querySelector('.effect-level__value');
const hashTagsInput = uploadOverlay.querySelector('.text__hashtags');
const pictureDescription = uploadOverlay.querySelector('.text__description');

const modalOpenHandler = (escEvent) => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', escEvent);
};

const modalCloseHandler = (escEvent) => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
  effectValue.value = '';
  hashTagsInput.value = '';
  pictureDescription.value = '';

  document.removeEventListener('keydown', escEvent);
};

const onModalEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    modalCloseHandler(onModalEscKeydown);
  }
};

uploadFile.addEventListener('change', () => {
  modalOpenHandler(onModalEscKeydown);
});

uploadCancelButton.addEventListener('click', () => {
  modalCloseHandler(onModalEscKeydown);
});

