import { IServices } from 'src/types'
import { IID } from 'src/types/common'

export interface IGroupedService {
  id: IID
  serviceName: string
}

export interface IGroupedCategories {
  id: IID
  serviceCategoryName: string
  services: IGroupedService[]
}

type IGetGroupedServices = (data: IServices[]) => IGroupedCategories[]

export const getGroupedServices: IGetGroupedServices = data => {
  const categories: IGroupedCategories[] = []
  data?.forEach(service => {
    if (
      !categories.find(e => service.service.service_categories[0].id === e.id)
    ) {
      categories.push({
        ...service.service.service_categories[0],
        services: [],
      })
    }
  })

  return categories.map(e => {
    data.forEach(service => {
      if (service.service.service_categories[0].id === e.id) {
        e.services.push({ id: service.id, serviceName: service.serviceName })
      }
    })
    return e
  })
}
