import { IID } from 'src/types/common'
import { IEquipment } from 'src/types/equipment'

export interface IGroupedService {
  id: IID
  title?: string
}

export interface IGroupedCategories {
  id: IID
  title?: string
  services: IGroupedService[]
}

type IGetGroupedServices = (data: IEquipment[] | any[]) => IGroupedCategories[]

export const getGroupedServices: IGetGroupedServices = data => {
  const categoriesMap = new Map<string, IGroupedCategories>()

  if (!data || !data.length) return []

  data?.forEach(service => {
    // Извлекаем категорию
    const serviceCategory =
      service.service?.service_categories?.[0] ||
      service.service?.service_m_category ||
      service.category

    if (serviceCategory) {
      const categoryId = serviceCategory.id
      const categoryTitle = serviceCategory.title

      // Если категории нет в карте, добавляем
      if (!categoriesMap.has(categoryId)) {
        categoriesMap.set(categoryId, {
          id: categoryId,
          title: categoryTitle,
          services: [],
        })
      }

      // Добавляем сервис к категории
      categoriesMap.get(categoryId)!.services.push({
        id: service.id,
        title: service.service?.title || service?.serviceName || service?.title,
      })
    }
  })

  // Конвертируем карту в массив
  return Array.from(categoriesMap.values())
}
