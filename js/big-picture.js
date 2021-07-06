import {isEscEvent} from './util.js';

const COMMENTS_LOAD_STEP = 5;
let currentCommentsArray = [];

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

const generateCommentsList = (comments, template) => {
  const commentFragment = document.createDocumentFragment();

  comments.forEach ((comment) => {
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

// Отрисовываем первые 5 комментариев

const showInitialCommentsArray = (commentsArray) => {
  const initialCommentsArray = commentsArray.slice(0, COMMENTS_LOAD_STEP);

  socialCommentCount.firstChild.textContent = `${initialCommentsArray.length  } из  `;
  commentsList.appendChild(generateCommentsList(initialCommentsArray, commentTemplate));

  if (initialCommentsArray.length === commentsArray.length) {
    commentsLoader.classList.add('hidden');
  }
};

const renderAdditionalComments = () => {
  const additionalCommentsArray = currentCommentsArray.slice(commentsList.children.length, commentsList.children.length + COMMENTS_LOAD_STEP);

  commentsList.appendChild(generateCommentsList(additionalCommentsArray, commentTemplate));

  if (currentCommentsArray.length === commentsList.children.length) {
    commentsLoader.classList.add('hidden');
  }
  socialCommentCount.firstChild.textContent = `${commentsList.children.length  } из  `;
};

const generateBigPicture = (dataObject) => {
  bigPictureImage.src = dataObject.url;
  bigPictureLikes.textContent = dataObject.likes;
  bigPictureCommentsCounter.textContent = dataObject.comments.length;
  bigPictureDescription.textContent = dataObject.description;

  currentCommentsArray = dataObject.comments;

  commentsLoader.addEventListener('click', renderAdditionalComments);
  showInitialCommentsArray(dataObject.comments);
};

const closeBigPicture = () => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', renderAdditionalComments);
};

const pictureKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeBigPicture();
    document.removeEventListener('keydown', pictureKeydownHandler);
  }
};

const pictureOpenHandler = (dataObject) => {
  removeComments();
  generateBigPicture(dataObject);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', pictureKeydownHandler);
};

const pictureCloseHandler = () => {
  closeBigPicture();
  document.removeEventListener('keydown', pictureKeydownHandler);
};

closeButton.addEventListener('click', pictureCloseHandler);

export {pictureOpenHandler};
