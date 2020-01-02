export const getRandomValueFromArray = arr => {
  return arr[getRandomIndexFromArray(arr)];
};

const getRandomIndexFromArray = arr => {
  return Math.floor(Math.random() * arr.length);
};

export const getRandomNumber = number => {
  return Math.floor(Math.random() * number);
};

const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export const getRandomNumberWithoutZero = randomInteger.bind(null, 1);

export const isAnswerCorrect = (correctAnswer, userAnswer) =>
  correctAnswer === userAnswer;
