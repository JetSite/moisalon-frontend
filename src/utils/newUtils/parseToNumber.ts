export function parseToNumber(
  value: unknown | null | undefined,
): number | null {
  // Пробуем преобразовать значение в число
  const parsedValue = Number(value)

  // Проверяем, удалось ли преобразование и не является ли результат NaN
  if (!isNaN(parsedValue)) {
    return parsedValue
  }

  // Если преобразование не удалось, возвращаем null
  return null
}
