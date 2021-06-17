import {randomPhotosArray} from './data.js';
import { generateBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');

const generatePhotosList = function (array, template) {
  const photoFragment = document.createDocumentFragment();

  array.forEach((object) => {
    const photoElement = template.cloneNode(true);

    photoElement.querySelector('.picture__img').src = object.url;
    photoElement.querySelector('.picture__likes').textContent = object.likes;
    photoElement.querySelector('.picture__comments').textContent = object.comments.length;

    photoElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      generateBigPicture(object);
    });

    photoFragment.appendChild(photoElement);
  });

  return photoFragment;
};

const photosListFragment = generatePhotosList(randomPhotosArray, pictureTemplate);

pictureList.appendChild(photosListFragment);
