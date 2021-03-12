const { topics } = require('../data/data');

/**
 * Generates a random number between the min and max values, with min and max
 * being inclusive
 *
 * @param {number} min The minimum value a number can be
 * @param {number} max The maximum value  a number can be
 * @returns {number} A randomized number using the min and max constraints
 * @example
 * generateRandomNumber(1, 5)
 * // returns 3
 */
const generateRandomNumber = (min: number = 1, max: number = 20) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  Math.floor(Math.random() * (max - min + 1) + min);

/**
 * Shuffles items in an array using Fisher Yates technique
 *
 * @param numberArray An array of items to shuffle
 * @returns {array} An array of shuffled items
 * @example:
 * shuffleFisherYates([1, 2, 3, 4, 5])
 * // returns [3, 5, 1, 2, 4] (not exact order)
 */
function shuffleFisherYates(arrayToShuffle: any) {
  const array = [...arrayToShuffle];
  let arrayLength = array.length;
  if (arrayLength === 0) {
    throw new Error('An array with no values has been passed');
  }
  // eslint-disable-next-line no-plusplus
  while (--arrayLength) {
    const randomNumber = Math.floor(Math.random() * (arrayLength + 1));
    const holdValue1 = array[arrayLength];
    const holdValue2 = array[randomNumber];
    array[arrayLength] = holdValue2;
    array[randomNumber] = holdValue1;
  }
  return array;
}

const getRandomNumbers = (
  minimumValue: number,
  maximumValue: number,
  numberOfNumbers: number,
) => {
  const range = maximumValue - minimumValue + 1;
  if (numberOfNumbers > range) {
    throw new Error(
      'The number of questions expected are greater than the range of numbers.',
    );
  }

  const myArr = [0, 1, 2, 3, 4, 5];
  console.log(shuffleFisherYates(myArr));

  // 1. Create an array of all numbers in range e.g. min 1, max 5, [1, 2, 3, 4, 5]
  // 2. Shuffle array e.g. [2, 4, 5, 1, 3]
  // 3. Grab the X number of values from the start

  /* const numbers = [];
  for (let i = 0; i < range; i += 1) {
    //

  } */
};

const getRandomQuestions = (topic: any, numberQuestions: any) => {
  if (!{}.hasOwnProperty.call(topics, topic)) {
    return [];
  }

  // console.log(numberQuestions);
  return [];
  // const totalQuestions = topics[topic].length;
};

module.exports = { generateRandomNumber, getRandomNumbers, getRandomQuestions };
