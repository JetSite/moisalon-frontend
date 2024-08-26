const splitArray = <T>(
  arr: Array<T>,
  index: number,
  includeIndex = true,
): Array<Array<T>> => [
  arr.slice(0, index), // Если includeIndex === true, включаем элемент на позиции index
  arr.slice(index + (includeIndex ? 0 : 1)), // В зависимости от includeIndex начинаем со следующего элемента или с текущего
]

export default splitArray
