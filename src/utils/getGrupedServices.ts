import { IID } from 'src/types/common'
import { IServiceCategories, IServices } from 'src/types/services'

export interface IGroupedService {
  id: IID
  title?: string
}

export interface IGroupedCategories {
  id: IID
  title?: string
  services: IGroupedService[]
}

type IGetGroupedServices = (data: IServiceCategories[]) => IGroupedCategories[]

export const getGroupedServices: IGetGroupedServices = data => {
  const categories: IGroupedCategories[] = []
  data?.forEach(service => {
    const serviseCategory = service.service.service_categories
      ? service.service.service_categories[0]
      : service.service.service_m_category

    if (
      serviseCategory &&
      !categories.find(e => serviseCategory?.id === e.id)
    ) {
      categories.push({
        ...serviseCategory,
        services: [],
      })
    }
  })

  return categories.map(e => {
    data.forEach(service => {
      const serviseCategory = service.service.service_categories
        ? service.service.service_categories[0]
        : service.service.service_m_category

      if (serviseCategory && serviseCategory.id === e.id) {
        e.services.push({ id: service.id, title: service.service.title })
      }
    })
    return e
  })
}
