import { IID } from 'src/types/common'
import { IServices } from 'src/types/services'

export interface IGroupedService {
  id: IID
  title: string
}

export interface IGroupedCategories {
  id: IID
  title?: string
  title?: string
  services: IGroupedService[]
}

type IGetGroupedServices = (data: IServices[]) => IGroupedCategories[]

export const getGroupedServices: IGetGroupedServices = data => {
  const categories: IGroupedCategories[] = []
  data?.forEach(service => {
    const setviseCategory = service.service.service_categories
      ? service.service.service_categories[0]
      : service.service.service_m_category

    if (
      setviseCategory &&
      !categories.find(e => setviseCategory?.id === e.id)
    ) {
      categories.push({
        ...setviseCategory,
        services: [],
      })
    }
  })

  return categories.map(e => {
    data.forEach(service => {
      const setviseCategory = service.service.service_categories
        ? service.service.service_categories[0]
        : service.service.service_m_category

      if (setviseCategory && setviseCategory.id === e.id) {
        e.services.push({ id: service.id, title: service.title })
      }
    })
    return e
  })
}
