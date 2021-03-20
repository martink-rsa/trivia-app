/**
 * Adds a leading 0 to a single integer if less than 10
 * @param {number} value An integer value
 * @returns {string} String with leading 0 added
 * @example
 * addLeadingZero(5);
 * // returns "05"
 */
const addLeadingZero = (value: number): string =>
  value < 10 ? `0${value}` : value.toString();

/**
 * Converts a millisecond value to a display time
 * @param {number} timeInMs Time value in milliseconds
 * @returns {string} .....
 * @example
 * convertMsToDisplayTime(5000);
 * // returns "00:05"
 */
export const convertMsToDisplayTime = (timeInMs: number): string => {
  const seconds = Math.floor(timeInMs / 1000) % 60;
  const minutes = Math.floor(timeInMs / (1000 * 60)) % 60;
  return `${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
};
