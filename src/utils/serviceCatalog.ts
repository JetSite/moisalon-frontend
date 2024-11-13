import { IGroupedServices } from 'src/types'
import { IService, IServiceCategories } from 'src/types/services'

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

export interface IServices {
  service: IService
  service_categories?: IServiceCategories[]
}

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

  services.forEach(service => {
    const categories = service.service?.service_m_category
      ? [service.service.service_m_category]
      : service.service?.service_categories || service.service_categories || []

    categories.forEach(categoryItem => {
      const categoryTitle = categoryItem.title

      if (!servicesData[categoryTitle]) {
        servicesData[categoryTitle] = { category: categoryTitle, services: [] }
      }

      const { service_categories, ...sProps } = service

      servicesData[categoryTitle].services.push({
        ...sProps,
        ...(categories == service.service_categories && {
          [service]: {
            ...service.service,
            service_categories: categories,
            service_m_category: service.service?.service_m_category,
          },
        }),
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
