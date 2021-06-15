import {generatePhotosArray} from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');

const MIN_PHOTO_NUMBER = 1;
const MAX_PHOTO_NUMBER = 25;

const photos = generatePhotosArray(MIN_PHOTO_NUMBER, MAX_PHOTO_NUMBER);
const photosListFragment = document.createDocumentFragment();

photos.forEach(({url, likes, comments}) => {
  const photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;

  photosListFragment.appendChild(photoElement);
});

pictureList.appendChild(photosListFragment);
