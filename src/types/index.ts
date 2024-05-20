import { IBrand } from './brands'
import { IID } from './common'
import { IMaster } from './masters'

export interface IPagination {
  total: number
  page: number
  pageSize: number
  pageCount: number
}

export interface IData {
  data: unknown
  meta: IMetaData
}

export interface IMetaData {
  pagination: Partial<IPagination>
}

export interface IPhoto {
  id: IID
  name: string
  url: string
}
export interface ISalonPhones {
  phoneNumber: string
  haveTelegram?: boolean
  haveWhatsApp?: boolean
  haveViber?: boolean
}
export interface IMetroStations {
  id: IID
  title: string
}

export interface ICity {
  id?: IID
  cityName?: string
  citySlug: string
}

export interface IServiceCategories {
  id: IID
  serviceCategoryName?: string
  categoryName?: string
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

export interface IWorkingHours {
  dayOfWeek: string
  endTime: string
  startTime: string
}

export interface ISocialNetworks {
  id: IID
  link: string
  s_network: {
    id: string
    logo: IPhoto | null
    slug: string
    title: string
  }
  title: string
}

export interface IRating {
  id: IID
  user: { id: IID }
  rating_value: { id: IID }
}

export interface IGroupedServices {
  category: string
  services: IServices[]
}

export interface ICountry {
  id: IID
  countryName: string
  description: string | null
  seoDescription: string | null
  slug: string
}

export interface IPhone {
  id: IID
  phoneTitle: string
  phoneNumber: string
  phoneContact: string
  haveViber: boolean
  haveWhatsApp: boolean
  haveTelegram: boolean
}
