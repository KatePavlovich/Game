import * as C from "./constants";

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

// for tasks with letters

const shuffle = array => {
  const len = array.length - 1;
  for (let i = len; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generateProposedLetters = answerLetter => {
  const letters = [];
  while (letters.length < C.PROPOSED_LETTERS_AMOUNT) {
    let newLetter = getRandomLetter();
    if (letters.includes(newLetter)) continue;
    letters.push(newLetter);
  }
  return shuffle([answerLetter, ...letters]);
};

export const getRandomLetter = () => {
  return C.ALPHABET[Math.floor(Math.random() * C.ALPHABET_LENGTH)];
};
