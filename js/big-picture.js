const bigPicture = document.querySelector('.big-picture');
const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const closeButton = document.querySelector('#picture-cancel');

const generateCommentsList = function (array, template) {
  const commentFragment = document.createDocumentFragment();

  array.comments.forEach ((object) => {
    const randomComment = template.cloneNode(true);

    randomComment.querySelector('.social__picture').src = object.avatar;
    randomComment.querySelector('.social__picture').alt = object.name;
    randomComment.querySelector('.social__text').textContent = object.message;

    commentFragment.appendChild(randomComment);
  });

  return commentFragment;
};

const removeComments = () => {
  document.querySelectorAll('.social__comment').forEach((element) => {
    element.remove();
  });
};

const generateBigPicture = function (array) {
  removeComments();
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = array.url;
  bigPicture.querySelector('.likes-count').textContent = array.likes;
  bigPicture.querySelector('.comments-count').textContent = array.comments.length;
  bigPicture.querySelector('.social__caption').textContent = array.description;

  commentsList.appendChild(generateCommentsList(array, commentTemplate));

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');
};

const closeBigPicture = function () {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

closeButton.addEventListener('click', closeBigPicture);

window.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    closeBigPicture();
  }
});

export {generateBigPicture};
