import {isEscEvent} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const closeButton = document.querySelector('#picture-cancel');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureCommentsCounter = bigPicture.querySelector('.comments-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');

const generateCommentsList = (array, template) => {
  const commentFragment = document.createDocumentFragment();

  array.comments.forEach ((comment) => {
    const randomComment = template.cloneNode(true);

    randomComment.querySelector('.social__picture').src = comment.avatar;
    randomComment.querySelector('.social__picture').alt = comment.name;
    randomComment.querySelector('.social__text').textContent = comment.message;

    commentFragment.appendChild(randomComment);
  });

  return commentFragment;
};

const removeComments = () => {
  bigPicture.querySelectorAll('.social__comment').forEach((element) => {
    element.remove();
  });
};

const generateBigPicture = (dataObject) => {
  bigPictureImage.src = dataObject.url;
  bigPictureLikes.textContent = dataObject.likes;
  bigPictureCommentsCounter.textContent = dataObject.comments.length;
  bigPictureDescription.textContent = dataObject.description;

  commentsList.appendChild(generateCommentsList(dataObject, commentTemplate));
};

const pictureOpenHandler = (dataObject, escEvent) => {
  removeComments();
  generateBigPicture(dataObject);
  bigPicture.classList.remove('hidden');

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', escEvent);
};

const pictureCloseHandler = (escEvent) => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', escEvent);
};

const onPictureEscKeywodn = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    pictureCloseHandler(onPictureEscKeywodn);
  }
};

closeButton.addEventListener('click', () => {
  pictureCloseHandler(onPictureEscKeywodn);
});

export {pictureOpenHandler, onPictureEscKeywodn};
