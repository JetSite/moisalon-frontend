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
    serviceCategory => serviceCategory.category.serviceCategoryName,
  )
  return names.join(', ')
}

export function getServicesCategories(services) {
  const values = []
  if (services && !!services.length) {
    services.forEach(service => {
      service.service.service_categories.forEach(category => {
        values.push(category.serviceCategoryName)
      })
    })
    return [...new Set(values)]
  }
  return []
}

export function getServicesByCategory(services) {
  const servicesData = {}

  if (services && !!services.length) {
    services.forEach(service => {
      service.service.service_categories.forEach(categoryItem => {
        const category = categoryItem.serviceCategoryName
        if (!servicesData[category]) {
          servicesData[category] = { category, services: [] }
        }
        servicesData[category].services.push(service)
      })
    })

    return Object.values(servicesData)
  }
  return []
}
