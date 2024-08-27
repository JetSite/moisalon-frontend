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
type IServicesByCategory = (services: any[]) => IGroupedServices[]
export const getServicesByCategory: IServicesByCategory = services => {
  const servicesData: Record<string, { category: string; services: any[] }> = {}

  if (services && services.length > 0) {
    services.forEach(service => {
      // Обработка service_m_category
      if (service.service.service_m_category) {
        const category = service.service.service_m_category.title as string
        if (!servicesData[category]) {
          servicesData[category] = {
            category,
            services: [],
          }
        }
        servicesData[category].services.push({
          ...service,
          service: {
            ...service.service,
            service_categories: [service.service.service_m_category],
            service_m_category: [service.service.service_m_category],
          },
        })
      }

      // Обработка service_categories
      if (service.service.service_categories) {
        service.service.service_categories.forEach((categoryItem: any) => {
          const category = categoryItem.title as string
          if (!servicesData[category]) {
            servicesData[category] = {
              category,
              services: [],
            }
          }
          servicesData[category].services.push(service)
        })
      }

      // Если ни service_m_category, ни service_categories нет
      if (
        !service.service.service_m_category &&
        !service.service.service_categories
      ) {
        const category = 'Uncategorized'
        if (!servicesData[category]) {
          servicesData[category] = {
            category,
            services: [],
          }
        }
        servicesData[category].services.push(service)
      }
    })

    return Object.values(servicesData)
  }

  return []
}
