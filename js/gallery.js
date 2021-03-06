import { pictureOpenHandler } from './big-picture.js';
import { getData } from './api.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;
const RANDOM_PHOTOS_ARRAY_LENGTH = 10;

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
      pictureOpenHandler(dataObject);
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
  const newCommentsArray = defaultArray.slice(0);

  return shuffle(newCommentsArray).slice(0, RANDOM_PHOTOS_ARRAY_LENGTH);
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
    const photosListFragment = generatePhotosList(photos, pictureTemplate);
    pictureList.appendChild(photosListFragment);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');

    filtersForm.addEventListener('click', (evt) => {
      switch (evt.target.id) {
        case ('filter-default'):
          filterButtonsClickHandler(randomPhotosButton, discussedPhotosButton, defaultPhotosButton);
          renderPictures(photos);
          break;
        case ('filter-random'):
          filterButtonsClickHandler(defaultPhotosButton, discussedPhotosButton, randomPhotosButton);
          renderPictures(generateRandomPhotosArray(photos));
          break;
        case ('filter-discussed'):
          filterButtonsClickHandler(randomPhotosButton, defaultPhotosButton, discussedPhotosButton);
          renderPictures(sortPhotosArray(photos));
          break;
      }
    });
  },
  (err) => {
    const errorDiv = document.createElement('div');
    document.body.prepend(errorDiv);
    errorDiv.textContent = `???????????? ???? ??????????????????????, ${err}`;
    errorDiv.style.textAlign = 'center';
    errorDiv.style.color = 'red';
    errorDiv.style.fontSize = '30px';
    errorDiv.style.marginTop = '30px';
    errorDiv.addEventListener('click', () => {
      document.body.removeChild(errorDiv);
    });
    return errorDiv;
  });
