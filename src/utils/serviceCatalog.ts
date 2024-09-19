import { IGroupedServices } from 'src/types'

export function selectedGroupNames(selection, catalog, separator) {
  let names = catalog.groups
    .filter(g => selection?.includes(g?.id))
    .map(g => g?.title)
  return separator ? names.join(separator) : names
}

export function selectedGroupNamesMax(selection, catalog, separator, maxCount) {
  let names = catalog.groups
    .filter(g => selection?.includes(g?.id))
    .map(g => g?.title)
  return separator
    ? names.slice(0, maxCount).join(separator)
    : names.slice(0, maxCount)
}

export function selectedGroupNamesMaxSymbol(
  selection,
  catalog,
  separator,
  maxCount,
) {
  let names = catalog.groups
    .filter(g => selection?.includes(g?.id))
    .map(g => g?.title)
  return maxCount < names.join(separator)?.length
    ? names.join(', ').slice(0, maxCount) + '...'
    : names.join(', ').slice(0, maxCount)
}

export function convertServiceIdsToCatalogEntries(ids) {
  return ids?.map(id => {
    return {
      id,
      value: 1,
    }
  })
}

export function getServiceCategoriesNames(serviceCategories) {
  const names = serviceCategories.map(
    serviceCategory => serviceCategory.category.title,
  )
  return names.join(', ')
}

export function getServicesCategories(services) {
  const values = []
  if (services && !!services.length) {
    services.forEach(service => {
      service.service.service_categories.forEach(category => {
        values.push(category.title)
      })
    })
    return [...new Set(values)]
  }
  return []
}
// Типы для входящих данных
interface ICategory {
  title: string
}

interface IService {
  service_m_category?: ICategory
  service_categories?: ICategory[]
}

export interface IRawService {
  service?: IService
}

// Тип для результата
export interface IGroupedServices {
  category: string
  services: IRawService[]
}

// Тип функции
type IServicesByCategory = (services: IRawService[]) => IGroupedServices[]

// Основная функция
export const getServicesByCategory: IServicesByCategory = services => {
  const servicesData: Record<string, IGroupedServices> = {}

  services.forEach(service => {
    // Новая переменная, которая будет хранить либо service_m_category, либо service_categories
    const categories = service.service?.service_m_category
      ? [service.service.service_m_category]
      : service.service?.service_categories || []

    // Обработка категорий
    categories.forEach(categoryItem => {
      const categoryTitle = categoryItem.title
      if (!servicesData[categoryTitle]) {
        servicesData[categoryTitle] = { category: categoryTitle, services: [] }
      }
      servicesData[categoryTitle].services.push({
        ...service,
        service: {
          ...service.service,
          service_categories: categories,
          service_m_category: service.service?.service_m_category,
        },
      })
    })

    // Если ни `service_m_category`, ни `service_categories` нет
    if (categories.length === 0) {
      const uncategorized = 'Uncategorized'
      if (!servicesData[uncategorized]) {
        servicesData[uncategorized] = { category: uncategorized, services: [] }
      }
      servicesData[uncategorized].services.push(service)
    }
  })

  return Object.values(servicesData)
}
