import { pictureOpenHandler, onPictureEscKeywodn } from './big-picture.js';
import { getData } from './api.js';
import { debounce } from './utils/debounce.js';

const RERENDER_DELAY = 500;
const NUMBERS_ARRAY_LENGTH = 25;
const SLICED_NUMBERS_ARRAY_LENGTH = 10;

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');
const filtersForm = document.querySelector('.img-filters__form');
const defaultPhotosButton = filtersForm.querySelector('#filter-default');
const randomPhotosButton = filtersForm.querySelector('#filter-random');
const discussedPhotosButton = filtersForm.querySelector('#filter-discussed');

const generatePhotosList = (array, template) => {
  const photoFragment = document.createDocumentFragment();

  array.forEach((dataObject) => {
    const photoElement = template.cloneNode(true);

    photoElement.querySelector('.picture__img').src = dataObject.url;
    photoElement.querySelector('.picture__likes').textContent = dataObject.likes;
    photoElement.querySelector('.picture__comments').textContent = dataObject.comments.length;

    photoElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      pictureOpenHandler(dataObject, onPictureEscKeywodn);
    });

    photoFragment.appendChild(photoElement);
  });

  return photoFragment;
};

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const generateRandomPhotosArray = (defaultArray) => {
  const initialNumbersArray = [];

  for (let i = 0; i < NUMBERS_ARRAY_LENGTH; i++) {
    initialNumbersArray.push(i);
  }

  const slicedNumbersArray = shuffle(initialNumbersArray).slice(0, SLICED_NUMBERS_ARRAY_LENGTH);

  const randomPhotosArray = [];

  slicedNumbersArray.forEach((number) => {
    randomPhotosArray.push(defaultArray[number]);
  });

  return randomPhotosArray;
};

const sortPhotosArray = (defaultArray) => {
  const discussedPhotosArray = defaultArray.slice(0);

  discussedPhotosArray.sort((a, b) => b.comments.length - a.comments.length);

  return discussedPhotosArray;
};

const filterButtonsClickHandler = (classRemove, classRemoveSecond, classAdd) => {
  classRemove.classList.remove('img-filters__button--active');
  classRemoveSecond.classList.remove('img-filters__button--active');
  classAdd.classList.add('img-filters__button--active');
};

const renderPictures = (debounce(
  (photosArray) => {
    pictureList.querySelectorAll('.picture').forEach((photo) => {
      photo.remove();
    });
    const photosListFragment = generatePhotosList(photosArray, pictureTemplate);

    pictureList.appendChild(photosListFragment);
  },
  RERENDER_DELAY,
));

getData(
  (photos) => {
    renderPictures(photos);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');

    filtersForm.addEventListener('click', (evt) => {
      if (evt.target === defaultPhotosButton) {
        filterButtonsClickHandler(randomPhotosButton, discussedPhotosButton, defaultPhotosButton);
        renderPictures(photos);
      }
      if (evt.target === randomPhotosButton) {
        filterButtonsClickHandler(defaultPhotosButton, discussedPhotosButton, randomPhotosButton);

        const randomPhotosArray = generateRandomPhotosArray(photos);
        renderPictures(randomPhotosArray);
      }
      if (evt.target === discussedPhotosButton) {
        filterButtonsClickHandler(randomPhotosButton, defaultPhotosButton, discussedPhotosButton);

        const discussedPhotosArray= sortPhotosArray(photos);
        renderPictures(discussedPhotosArray);
      }
    });
  },
  (err) => {
    const errorDiv = document.createElement('div');
    document.body.prepend(errorDiv);
    errorDiv.textContent = `Данные не загрузились, ${err}`;
    errorDiv.style.textAlign = 'center';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '30px';
    errorDiv.style.marginTop = '30px';
    errorDiv.addEventListener('click', () => {
      document.body.removeChild(errorDiv);
    });
    return errorDiv;
  });
