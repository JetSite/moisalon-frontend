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
  title: string
  services?: IService[]
  services_m?: IService[]
}

export interface IService {
  id: IID
  title: string
  service_categories: IServiceCategories[]
  service_m_category: IServiceCategories
}

export interface IServices {
  id: IID
  title: string
  service: IService
  price: string
  priceFrom: string
  priceTo: string
  unitOfMeasurement: string
}

export interface IServiceInCategory {
  id: IID
  servicName: string
  title: string
}

export interface IServiceCategory {
  id: IID
  serviceCategoryName: string
  services: IServiceInCategory[]
  title: string
}
