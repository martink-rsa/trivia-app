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
declare const generateRandomNumber: (min?: number, max?: number) => number;
/**
 * Shuffles items in an array using Fisher Yates technique
 *
 * @param numberArray An array of items to shuffle
 * @returns {array} An array of shuffled items
 * @example:
 * shuffleFisherYates([1, 2, 3, 4, 5]);
 * // returns [3, 5, 1, 2, 4] (not exact order)
 */
declare function shuffleFisherYates(arrayToShuffle: any): any[];
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
declare const getRandomNumbers: (minimumValue: number, maximumValue: number, totalNumbers: number) => any[];
/**
 * Get an array of questions that will be asked in the Trivia
 * @param {string} topic The topic for the questions being asked
 * @param {number} numberQuestions How many questions are being asked
 * @returns {array} An array containing all of the questions
 * @example:
 * getRandomQuestions('javascript', 10)
 * // returns 10 questions from 'javascript' topic
 */
declare const getRandomQuestions: (topic: string, numberQuestions?: number) => any[];
export { generateRandomNumber, getRandomNumbers, getRandomQuestions, shuffleFisherYates };
