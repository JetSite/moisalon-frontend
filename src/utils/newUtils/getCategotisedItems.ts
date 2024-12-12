export interface IGroupedItems<T> {
  id: string
  title: string
  items: T[]
}

interface IStandartItem {
  id: string
  title: string
}

interface IGetCategorisedItemsProps<T> {
  categoryKey: keyof T
}

export function getCategorisedItems<
  T extends Partial<Record<K, any>>,
  K extends keyof T,
>(arr: T[], props: IGetCategorisedItemsProps<T>): IGroupedItems<T>[] {
  const { categoryKey } = props

  const groupedItems: IGroupedItems<T>[] = []

  arr.forEach(item => {
    const typedItem = item as unknown as IStandartItem
    const categoryValues = item[categoryKey]

    // Проверяем, является ли значение массивом
    if (Array.isArray(categoryValues)) {
      // Проходим по каждому элементу массива
      const categoryValuesArr = categoryValues as IStandartItem[]
      categoryValuesArr.forEach(category => {
        const { id, title } = category

        // Находим или создаем категорию
        const existingCategory = groupedItems.find(cat => cat.id === id)

        if (existingCategory) {
          // Проверяем, если элемента еще нет в items, добавляем его
          if (
            !existingCategory.items.some(
              existingItem =>
                (existingItem as unknown as IStandartItem).id === typedItem.id,
            )
          ) {
            existingCategory.items.push(item)
          }
        } else {
          // Создаем новую категорию, если она еще не существует
          groupedItems.push({
            id,
            title,
            items: [item],
          })
        }
      })
    } else {
      // Если это не массив, продолжаем как обычная группировка
      const { id, title } = categoryValues
      const existingCategory = groupedItems.find(cat => cat.id === id)

      if (existingCategory) {
        if (
          !existingCategory.items.some(
            existingItem =>
              (existingItem as unknown as IStandartItem).id === typedItem.id,
          )
        ) {
          existingCategory.items.push(item)
        }
      } else {
        groupedItems.push({
          id,
          title,
          items: [item],
        })
      }
    }
  })

  return groupedItems
}
