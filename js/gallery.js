import { pictureOpenHandler, onPictureEscKeywodn } from './big-picture.js';
import { createFetch } from './api.js';

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
      pictureOpenHandler(dataObject, onPictureEscKeywodn);
    });

    photoFragment.appendChild(photoElement);
  });

  return photoFragment;
};

const fetchPhotos = createFetch(
  (photos) => {
    const photosListFragment = generatePhotosList(photos, pictureTemplate);

    pictureList.appendChild(photosListFragment);
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

fetchPhotos();
