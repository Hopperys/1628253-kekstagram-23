import { isEscEvent} from './util.js';

const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadOverlay.querySelector('#upload-cancel');
const effectValue = uploadOverlay.querySelector('.effect-level__value');
const hashTagsInput = uploadOverlay.querySelector('.text__hashtags');
const pictureDescription = uploadOverlay.querySelector('.text__description');

const validity =  /^#[a-zA-Zа-яА-я0-9]{1,19}$/;

const MAX_TAGS_COUNT = 5;

const closeModal = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
  effectValue.value = '';
  hashTagsInput.value = '';
  pictureDescription.value = '';
};

const openModal = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
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

uploadFile.addEventListener('change', () => {
  uploadFileChangeHandler();
});

uploadCancelButton.addEventListener('click', () => {
  uploadCancelButtonClickHandler();
});

hashTagsInput.addEventListener('input', () => {
  const hashTagsArray = hashTagsInput.value.trim().split(' ');
  const lowerTagsArray = hashTagsInput.value.trim().toLowerCase().split(' ').sort();

  hashTagsArray.forEach((element) => {
    if (hashTagsArray.length > MAX_TAGS_COUNT) {
      return hashTagsInput.setCustomValidity('Максимальное количество тегов - 5.');
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

  hashTagsInput.reportValidity();
});

hashTagsInput.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});

hashTagsInput.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.stopPropagation();
  }
});
