import { IID } from './common'

export interface IServiceInFormItem {
  groupName: string
  title: string
  id: IID
}

export interface IServiceInForm {
  id: IID
  description: string | undefined
  items: IServiceInFormItem[]
}

export interface IServiceCategories {
  id: IID
  serviceCategoryName?: string
  categoryName?: string
  services: IService[]
}

export interface IService {
  id: IID
  serviceName: string
  service_categories?: IServiceCategories[]
  service_m_category?: IServiceCategories
}

export interface IServices {
  id: IID
  serviceName: string
  service: IService
  price: string
  priceFrom: string
  priceTo: string
  unitOfMeasurement: string
}
