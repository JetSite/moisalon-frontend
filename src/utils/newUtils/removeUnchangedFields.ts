import { isEqual } from 'lodash'

const removeUnchangedFields = <T extends object>(
  values: T,
  initialValues: T,
  preserveFields: (keyof T)[] = [], // Добавляем массив полей, которые не нужно удалять
): Partial<T> => {
  const updatedValues: Partial<T> = { ...values }

  ;(Object.keys(values) as (keyof T)[]).forEach(key => {
    // Если поле находится в preserveFields, пропускаем его удаление
    if (
      !preserveFields.includes(key) &&
      isEqual(values[key], initialValues[key])
    ) {
      delete updatedValues[key]
    }
  })

  return updatedValues
}

export default removeUnchangedFields
