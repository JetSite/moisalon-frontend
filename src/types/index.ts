import { IBrand } from './brands'
import { IID } from './common'
import { IMaster } from './masters'
import { IServices } from './services'

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
  name?: string
  slug: string
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
  name: string
  description: string | null
  seoDescription: string | null
  slug: string
}

export interface IPhone {
  id: IID
  phoneTitle?: string
  phoneNumber: string
  phoneContact?: string
  haveViber: boolean
  haveWhatsApp: boolean
  haveTelegram: boolean
}

export interface IGender {
  id: IID
  title: string
}

export interface IWorkplacesType {
  id: IID
  workplaceType: string
}

export interface IRentalPeriod {
  id: IID
  rentalCost: number
  rental_period: {
    id: IID
    title: string
  }
}

export interface IPaymentMethods {
  id: IID
  title: string
}

export interface ISalonWorkplaces {
  id: IID
  shareRent: boolean
  subRent: boolean
  title: string
  workspaces_types: IWorkplacesType[]
  rentalPeriod: IRentalPeriod[]
  payment_methods: IPaymentMethods[]
  gallery: IPhoto[]
}
