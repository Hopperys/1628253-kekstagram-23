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

const getRandomArrayElement = function (elements) {
  return elements[getRandomNumber(0, elements.length -1)];
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export {getRandomNumber, getRandomArrayElement, stringLengthCheck, isEscEvent};
