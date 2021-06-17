import {randomPhotosArray} from './data.js';
import { generateBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');

const generatePhotosList = (array, template) => {
  const photoFragment = document.createDocumentFragment();

  array.forEach((dataObject) => {
    const photoElement = template.cloneNode(true);

    photoElement.querySelector('.picture__img').src = dataObject.url;
    photoElement.querySelector('.picture__likes').textContent = dataObject.likes;
    photoElement.querySelector('.picture__comments').textContent = dataObject.comments.length;

    photoElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      generateBigPicture(dataObject);
    });

    photoFragment.appendChild(photoElement);
  });

  return photoFragment;
};

const photosListFragment = generatePhotosList(randomPhotosArray, pictureTemplate);

pictureList.appendChild(photosListFragment);
