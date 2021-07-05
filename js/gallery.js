import { pictureOpenHandler, onPictureEscKeywodn } from './big-picture.js';
import { getData } from './api.js';
import { debounce } from './utils/debounce.js';

const RERENDER_DELAY = 500;

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');
const defaultPhotosButton = document.querySelector('#filter-default');
const randomPhotosButton = document.querySelector('#filter-random');
const discussedPhotosButton = document.querySelector('#filter-discussed');

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

const generateRandomPhotosArray = (defaultArray) => {
  const initialNumbersArray = [];

  for (let i = 0; i < 25; i++) {
    initialNumbersArray.push(i);
  }

  const slicedNumbersArray = initialNumbersArray.sort(() => Math.random() - 0.5).slice(0, 10);

  const randomPhotosArray = [];

  slicedNumbersArray.forEach((number) => {
    randomPhotosArray.push(defaultArray[number]);
  });

  return randomPhotosArray;
};

const sortPhotosArray = (defaultArray) => {
  const discussedPhotosArray = defaultArray.slice(0);

  for (let i = 0; i < discussedPhotosArray.length; i++) {
    for (let j = 0; j < discussedPhotosArray.length - 1; j++) {
      if (discussedPhotosArray[i].comments.length > discussedPhotosArray[j].comments.length) {
        const temp = discussedPhotosArray[i];
        discussedPhotosArray[i] = discussedPhotosArray[j];
        discussedPhotosArray[j] = temp;
      }
    }
  }

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

    defaultPhotosButton.addEventListener('click', () => {
      filterButtonsClickHandler(randomPhotosButton, discussedPhotosButton, defaultPhotosButton);
      renderPictures(photos);
    });

    randomPhotosButton.addEventListener('click', () => {
      filterButtonsClickHandler(defaultPhotosButton, discussedPhotosButton, randomPhotosButton);

      const randomPhotosArray = generateRandomPhotosArray(photos);
      renderPictures(randomPhotosArray);
    });

    discussedPhotosButton.addEventListener('click', () => {
      filterButtonsClickHandler(randomPhotosButton, defaultPhotosButton, discussedPhotosButton);

      const discussedPhotosArray= sortPhotosArray(photos);
      renderPictures(discussedPhotosArray);
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
