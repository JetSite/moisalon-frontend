import { IServices } from 'src/types'
import { IID } from 'src/types/common'

export interface IGroupedService {
  id: IID
  serviceName: string
}

export interface IGroupedCategories {
  id: IID
  serviceCategoryName?: string
  categoryName?: string
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
        e.services.push({ id: service.id, serviceName: service.serviceName })
      }
    })
    return e
  })
}
