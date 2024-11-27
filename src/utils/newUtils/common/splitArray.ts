/**
 * Splits an array into two subarrays at the specified index.
 * Optionally includes the element at the split index in the first subarray.
 *
 * @template T - The type of elements in the array.
 * @param arr - The array to split.
 * @param index - The index at which to split the array.
 * @param includeIndex - If true, includes the element at the specified index
 * in the first subarray. Default is true.
 * @returns An array containing two subarrays:
 * - The first subarray contains elements from the start of the array up to (and optionally including) the split index.
 * - The second subarray contains the remaining elements after the split.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * // Splits the array at index 2, including the element at index 2 in the first subarray
 * const [first, second] = splitArray(arr, 2);
 * console.log(first); // Output: [1, 2, 3]
 * console.log(second); // Output: [4, 5]
 *
 * // Splits the array at index 2, excluding the element at index 2
 * const [firstExcl, secondExcl] = splitArray(arr, 2, false);
 * console.log(firstExcl); // Output: [1, 2]
 * console.log(secondExcl); // Output: [4, 5]
 */

const splitArray = <T>(
  arr: Array<T>,
  index: number,
  includeIndex = true,
): Array<Array<T>> => [
  arr.slice(0, index), // Если includeIndex === true, включаем элемент на позиции index
  arr.slice(index + (includeIndex ? 0 : 1)), // В зависимости от includeIndex начинаем со следующего элемента или с текущего
]

export default splitArray
