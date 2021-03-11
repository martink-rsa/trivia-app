const { getRandomNumber, getRandomQuestions } = require('../utils/utils');

describe('utils', () => {
  describe('getRandomNumber', () => {
    it('', () => {
      expect.assertions(0);
    });
  });

  describe('getRandomQuestions', () => {
    it('should get a list of 5 random questions for javascript subject', () => {
      const questions = getRandomQuestions('javascript', 5);
      expect(questions.length).toBe(5);
      expect.assertions(1);
    });
  });
});
