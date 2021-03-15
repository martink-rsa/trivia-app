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
    it('should get 5 random numbers between 1 and 5', () => {
      const minimum = 1;
      const maximum = 5;
      const totalNumbers = 5;
      const numberArray = [1, 2, 3, 4, 5];
      const numbers = getRandomNumbers(minimum, maximum, totalNumbers);
      numbers.forEach((number: number) => {
        expect(number).toBeGreaterThanOrEqual(minimum);
        expect(number).toBeLessThanOrEqual(maximum);
      });
      expect(numbers.length).toBe(5);
      expect(numbers.sort()).toEqual(numberArray);
      expect.assertions(totalNumbers * 2 + 2);
    });
    it('should get 5 random numbers with a range of 5', () => {
      const minimum = 10;
      const maximum = 15;
      const totalNumbers = 5;
      const numbers = getRandomNumbers(minimum, maximum, totalNumbers);
      numbers.forEach((number: number) => {
        expect(number).toBeGreaterThanOrEqual(minimum);
        expect(number).toBeLessThanOrEqual(maximum);
      });
      expect(numbers.length).toBe(totalNumbers);
      expect.assertions(totalNumbers * 2 + 1);
    });
    it('should get 5 random numbers with a range of 5', () => {
      const minimum = 10;
      const maximum = 20;
      const totalNumbers = 5;
      const numbers = getRandomNumbers(minimum, maximum, totalNumbers);
      numbers.forEach((number: number) => {
        expect(number).toBeGreaterThanOrEqual(minimum);
        expect(number).toBeLessThanOrEqual(maximum);
      });
      expect(numbers.length).toBe(totalNumbers);
      expect.assertions(totalNumbers * 2 + 1);
    });
    it('should throw an error if the range of numbers is less than the numbers needed', () => {
      expect(() => {
        getRandomNumbers(1, 5, 6);
      }).toThrowError();
    });
  });

  describe('getRandomQuestions', () => {
    it('should get a list of 5 random questions for javascript subject without fault 200 times', () => {
      const numLoops = 200;
      for (let i = 0; i < numLoops; i += 1) {
        const totalQuestions = 5;
        const questions = getRandomQuestions('javascript', totalQuestions);
        expect(questions.length).toBe(totalQuestions);
        questions.forEach((question: any) => {
          expect(question).not.toBeNull();
          expect(question).not.toBeUndefined();
        });
        expect.assertions(numLoops * (totalQuestions * 2 + 1));
      }
    });

    it("should throw an error if a topic doesn't exist", () => {
      expect(() => {
        getRandomQuestions('1javascript', 5);
      }).toThrowError();
      expect.assertions(1);
    });
  });
});

export {};
