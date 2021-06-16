import {randomPhotosArray} from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const pictureList = document.querySelector('.pictures');

const generatePhotosList = function (array, template) {
  const photoFragment = document.createDocumentFragment();

  array.forEach(({url, likes, comments}) => {
    const photoElement = template.cloneNode(true);

    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;

    photoFragment.appendChild(photoElement);
  });

  return photoFragment;
};

const photosListFragment = generatePhotosList(randomPhotosArray, pictureTemplate);

pictureList.appendChild(photosListFragment);
