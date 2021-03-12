const { topics } = require('../data/data');

/**
 * Generates a random number between the min and max values, with min and max being inclusive
 * @param {number} min The minimum number a number can be
 * @param {number} max The maximum number a number can be
 */

const generateRandomNumber = (min: number = 1, max: number = 20) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  Math.floor(Math.random() * (max - min + 1) + min);

const getRandomNumbers = (numberOfNumbers: number) => {
  //
};

const getRandomQuestions = (topic: any, numberQuestions: any) => {
  if (!{}.hasOwnProperty.call(topics, topic)) {
    return [];
  }

  console.log(numberQuestions);
  return [];
  // const totalQuestions = topics[topic].length;
};

module.exports = { generateRandomNumber, getRandomNumbers, getRandomQuestions };
