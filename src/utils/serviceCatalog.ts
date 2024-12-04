import { IServices } from 'src/types/services'

// Тип для результата
export interface IGroupedServices {
  category: string
  services: IServices[]
}

// Тип функции
type IServicesByCategory = (services: IServices[]) => IGroupedServices[]

// Основная функция
export const getServicesByCategory: IServicesByCategory = services => {
  const servicesData: Record<string, IGroupedServices> = {}

  services.forEach(serviceItem => {
    const { service } = serviceItem
    const categories = service?.service_m_category
      ? [service.service_m_category]
      : service?.service_categories || []

    // Обработка категорий
    categories.forEach(category => {
      const categoryTitle = category.title

      if (!servicesData[categoryTitle]) {
        servicesData[categoryTitle] = { category: categoryTitle, services: [] }
      }

      servicesData[categoryTitle].services.push(serviceItem)
    })

    // Если ни `service_m_category`, ни `service_categories` нет
    if (categories.length === 0) {
      const uncategorized = 'Uncategorized'
      if (!servicesData[uncategorized]) {
        servicesData[uncategorized] = { category: uncategorized, services: [] }
      }
      servicesData[uncategorized].services.push(serviceItem)
    }
  })

  return Object.values(servicesData)
}
