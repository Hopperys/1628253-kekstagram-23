const randomizeNumber = function (min, max) {
  if (min < 0 || max < 0) {
    return 'Числа должны быть положительными';
  }
  if (min >= max) {
    return 'Второе число должно быть больше первого';
  }
  return Math.floor(Math.random() * (max - min + 1)) + min; //  Взято с сайта developer.mozilla.org
};

randomizeNumber(1, 100);

const stringLengthCheck = function (string, maxLength) {
  return (string.length <= maxLength);
};

stringLengthCheck('Hello world', 20);
