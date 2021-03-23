"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleFisherYates = exports.getRandomQuestions = exports.getRandomNumbers = exports.generateRandomNumber = void 0;
// import { topics } from '../data/data';
const topics_1 = require("./topics");
/**
 * Generates a random number between the min and max values, with min and max
 * being inclusive
 *
 * @param {number} min The minimum value a number can be
 * @param {number} max The maximum value  a number can be
 * @returns {number} A randomized number using the min and max constraints
 * @example
 * generateRandomNumber(1, 5);
 * // returns 3
 */
const generateRandomNumber = (min = 1, max = 20) => 
// eslint-disable-next-line implicit-arrow-linebreak
Math.floor(Math.random() * (max - min + 1) + min);
exports.generateRandomNumber = generateRandomNumber;
/**
 * Shuffles items in an array using Fisher Yates technique
 *
 * @param numberArray An array of items to shuffle
 * @returns {array} An array of shuffled items
 * @example:
 * shuffleFisherYates([1, 2, 3, 4, 5]);
 * // returns [3, 5, 1, 2, 4] (not exact order)
 */
function shuffleFisherYates(arrayToShuffle) {
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
exports.shuffleFisherYates = shuffleFisherYates;
/**
 *
 * @param {number} minimumValue The minimum value constraint for the random number generator
 * @param {number} maximumValue The maxiumum value constraint for the random number generator
 * @param {number} numberOfNumbers How many numbers must be generated
 * @returns {array} An array of random numbers that have been generated
 * @example:
 * getRandomNumbers(1, 5, 3);
 * // [2, 4, 5] (not exact values)
 */
const getRandomNumbers = (minimumValue, maximumValue, totalNumbers) => {
    // Creating an array of random numbers by shuffling:
    // 1. Create an array of all numbers in range e.g. min 1, max 5, [1, 2, 3, 4, 5]
    // 2. Shuffle array e.g. [2, 4, 5, 1, 3]
    // 3. Return totalNumber number of items from the start of the array
    const range = maximumValue - minimumValue + 1;
    if (totalNumbers > range) {
        throw new Error('The number of questions expected are greater than the range of numbers.');
    }
    // Generates an array with numbers in numerical order e.g.
    // [1, 2, 3, 4, 5] or [3, 4, 5]
    const arrayOfNumbers = Array.from({ length: range }, (_, index) => index + minimumValue);
    // Shuffles the generated array
    const shuffledArray = shuffleFisherYates(arrayOfNumbers);
    return shuffledArray.slice(0, totalNumbers);
};
exports.getRandomNumbers = getRandomNumbers;
/**
 * Get an array of questions that will be asked in the Trivia
 * @param {string} topic The topic for the questions being asked
 * @param {number} numberQuestions How many questions are being asked
 * @returns {array} An array containing all of the questions
 * @example:
 * getRandomQuestions('javascript', 10)
 * // returns 10 questions from 'javascript' topic
 */
const getRandomQuestions = (topic, numberQuestions = 20) => {
    const topics = topics_1.default.getTopics();
    if (!{}.hasOwnProperty.call(topics, topic)) {
        throw new Error('Topic does not exist');
    }
    const topicQuestions = topics[topic].questions;
    const randomNumbers = getRandomNumbers(0, topicQuestions.length - 1, numberQuestions);
    const questions = randomNumbers.map((number) => topicQuestions[number]);
    return questions;
};
exports.getRandomQuestions = getRandomQuestions;
//# sourceMappingURL=utils.js.map