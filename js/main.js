const MIN_ID_NUMBER = 1;
const MIN_LIKE_NUMBER = 15;
const MAX_LIKE_NUMBER = 200;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;

const PHOTO_COUNT = 25;

const DESCRIPTIONS = [
  'Фото моего завтрака',
  'Красивый пейзаж',
  'Отдых на море',
  'Мой кот',
  'Вид из самолета',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Ваня',
  'Саша',
  'Катя',
  'Настя',
  'Витя',
  'Маша',
  'Петя',
];

const getRandomNumber = function (min, max) {
  if (min < 0 || max < 0) {
    return 'Числа должны быть положительными';
  }

  if (min >= max) {
    return 'Второе число должно быть больше первого';
  }

  return Math.floor(Math.random() * (max - min + 1)) + min; //  Взято с сайта developer.mozilla.org
};

const stringLengthCheck = function (string, maxLength) {
  return (string.length <= maxLength);
};

stringLengthCheck('Hello world', 20);

const getRandomArrayElement = function (elements) {
  return elements[getRandomNumber(0, elements.length -1)];
};

const generateRandomComment = function () {
  const commentObject = {};

  commentObject.id = getRandomNumber(1, 150);
  commentObject.avatar = `img/avatar-${getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`;
  commentObject.message = getRandomArrayElement(MESSAGES);
  commentObject.name = getRandomArrayElement(NAMES);

  return commentObject;
};

const createPhotoObject = function (counter) {
  const photoObject = {};

  photoObject.id = counter;
  photoObject.url = `photos/${counter}.jpg`;
  photoObject.description = getRandomArrayElement(DESCRIPTIONS);
  photoObject.likes = getRandomNumber(MIN_LIKE_NUMBER, MAX_LIKE_NUMBER);
  photoObject.comments = generateRandomComment();

  return  photoObject;
};

const generatePhotosArray = function () {
  const photosArray = [];

  for (let index = MIN_ID_NUMBER; index <= PHOTO_COUNT; index++) {
    photosArray.push(createPhotoObject(index));
  }

  return photosArray;
};

generatePhotosArray(generatePhotosArray);
