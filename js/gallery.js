import {randomPhotosArray} from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');

const photosListFragment = document.createDocumentFragment();

const generatePhotosList = function (array, element) {
  array.forEach(({url, likes, comments}) => {
    const photoElement = pictureTemplate.cloneNode(true);
  
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;

    photosListFragment.appendChild(photoElement);
  });

  return element.appendChild(photosListFragment);
};

generatePhotosList (randomPhotosArray, pictureList);
