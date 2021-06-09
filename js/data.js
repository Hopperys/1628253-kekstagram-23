import {getRandomNumber, getRandomArrayElement} from './util.js';

const MIN_ID_NUMBER = 1;
const MAX_ID_NUMBER = 150;
const MIN_LIKE_NUMBER = 15;
const MAX_LIKE_NUMBER = 200;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;
const MIN_COMMENT_COUNT = 1;
const MAX_COMMENT_COUNT = 5;

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

const generateRandomComment = function () {
  return {
    id: getRandomNumber(MIN_ID_NUMBER, MAX_ID_NUMBER),
    avatar: `img/avatar-${getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};

const createPhotoObject = function (counter) {
  return  {
    id: counter,
    url: `photos/${counter}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomNumber(MIN_LIKE_NUMBER, MAX_LIKE_NUMBER),
    comments: new Array(getRandomNumber(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT)).fill(null).map(() => generateRandomComment()),
  };
};

const generatePhotosArray = function (min, counter) {
  const photosArray = [];

  for (let i = min; i <= counter; i++) {
    photosArray.push(createPhotoObject(i));
  }

  return photosArray;
};

generatePhotosArray(MIN_ID_NUMBER, PHOTO_COUNT);
