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

const COMMENTS_LOAD_STEP = 5;

const generateCommentsList = (array, template) => {
  const commentFragment = document.createDocumentFragment();

  array.forEach ((comment) => {
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

const generateBigPicture = (dataObject) => {
  bigPictureImage.src = dataObject.url;
  bigPictureLikes.textContent = dataObject.likes;
  bigPictureCommentsCounter.textContent = dataObject.comments.length;
  bigPictureDescription.textContent = dataObject.description;

  showInitialCommentsArray(dataObject.comments);

  let currentCommentsNumber = 5;

  // Отрисовываем дополнительные комментарии по клику на кнопку

  commentsLoader.addEventListener('click', () => {
    const newCommentsNumber = currentCommentsNumber + COMMENTS_LOAD_STEP;
    const additionalCommentsArray = dataObject.comments.slice(currentCommentsNumber, newCommentsNumber);
    currentCommentsNumber = newCommentsNumber;

    commentsList.appendChild(generateCommentsList(additionalCommentsArray, commentTemplate));

    const renderedCommentsArrayLength = document.querySelectorAll('.social__comment').length;

    if (dataObject.comments.length === renderedCommentsArrayLength) {
      commentsLoader.classList.add('hidden');
    }
    socialCommentCount.firstChild.textContent = `${renderedCommentsArrayLength  } из  `;
  });
};

const pictureOpenHandler = (dataObject, escEvent) => {
  removeComments();
  generateBigPicture(dataObject);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', escEvent);
};

const pictureCloseHandler = (escEvent) => {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  commentsLoader.classList.remove('hidden');

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
