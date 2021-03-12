const {
  generateRandomNumber,
  getRandomNumbers,
  getRandomQuestions,
} = require('../utils/utils');

describe('utils', () => {
  describe('getRandomNumber', () => {
    it('should get a random number between 0 and 1', () => {
      const minimum = 0;
      const maximum = 1;
      for (let i = 0; i < 10; i += 1) {
        const randomNumber = generateRandomNumber(minimum, maximum);
        expect(randomNumber).toBeGreaterThanOrEqual(minimum);
        expect(randomNumber).toBeLessThanOrEqual(maximum);
      }
    });
    it('should get a random number between 5 and 6', () => {
      const minimum = 5;
      const maximum = 6;
      for (let i = 0; i < 10; i += 1) {
        const randomNumber = generateRandomNumber(minimum, maximum);
        expect(randomNumber).toBeGreaterThanOrEqual(minimum);
        expect(randomNumber).toBeLessThanOrEqual(maximum);
      }
    });
  });

  describe('getRandomNumbers', () => {
    it('should get 5 random numbers', () => {
      const numbers = getRandomNumbers(5);
      expect(numbers.length).toBe(5);
      expect.assertions(1);
    });
  });

  describe('getRandomQuestions', () => {
    it('should get a list of 5 random questions for javascript subject', () => {
      const questions = getRandomQuestions('javascript', 5);
      expect(questions.length).toBe(5);
      expect.assertions(1);
    });

    it("should get an empty list if topic doesn't exist", () => {
      const questions = getRandomQuestions('1javascript', 5);
      expect(questions.length).toBe(0);
      expect.assertions(1);
    });
  });
});

export {};
