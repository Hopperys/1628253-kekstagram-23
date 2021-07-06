const SCALE_MIN_VALUE = 25;
const SCALE_MAX_VALUE = 100;
const SCALE_STEP = 25;

const minusButton = document.querySelector('.scale__control--smaller');
const plusButton = document.querySelector('.scale__control--bigger');
const imagePreview = document.querySelector('.img-upload__preview');
const scaleValue = document.querySelector('.scale__control--value');

let currentScale = 100;

const setImageScale = (newScale) => {
  scaleValue.value = `${newScale}%`;
  imagePreview.querySelector('img').style = `transform: scale(${newScale / 100})`;
  currentScale = newScale;
};

const minusButtonClickHandler = () => {
  if (currentScale > SCALE_MIN_VALUE) {
    currentScale -= SCALE_STEP;
    setImageScale(currentScale);
  }
};

const plusButtonClickHandler = () => {
  if (currentScale < SCALE_MAX_VALUE) {
    currentScale += SCALE_STEP;
    setImageScale(currentScale);
  }
};

minusButton.addEventListener('click', minusButtonClickHandler);
plusButton.addEventListener('click', plusButtonClickHandler);

export {setImageScale};
