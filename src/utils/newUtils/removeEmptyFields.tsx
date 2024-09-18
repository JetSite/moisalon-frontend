export const removeEmptyFields = <T extends object>(obj: T): Partial<T> => {
  const cleanedObject: Partial<T> = {}
  ;(Object.keys(obj) as (keyof T)[]).forEach(key => {
    const value = obj[key]

    // Проверка на различные типы значений
    if (
      value !== undefined && // Проверка на undefined
      value !== null && // Проверка на null
      !(typeof value === 'string' && (value as string).trim() === '') && // Проверка на пустую строку
      !(Array.isArray(value) && (value as Array<any>).length === 0) && // Проверка на пустой массив
      !(
        typeof value === 'object' &&
        !Array.isArray(value) &&
        Object.keys(value as object).length === 0
      ) // Проверка на пустой объект
    ) {
      cleanedObject[key] = value
    }
  })

  return cleanedObject
}
