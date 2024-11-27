/**
 * Splits a string by the specified delimiter and removes empty segments.
 *
 * @param string - The string to split.
 * @param delimiter - The character used to split the string (e.g., '/').
 * @returns An array of non-empty string segments.
 *
 * @example
 * const path = '/city/salon/';
 *
 * const segments = splitString(path, '/');
 * console.log(segments); // Output: ['city', 'salon']
 */
const splitString = (string: string, delimiter: string) =>
  string.split(delimiter).filter(Boolean)

export default splitString
