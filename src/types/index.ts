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

export interface ISalonCover {
  id: IID
  name: string
  alternativeText: string | null
  formats: any // Замените на конкретный тип, если есть
  url: string
  previewUrl?: string // Если есть предпросмотр
}

export interface ISalonLogo {
  id: IID
  name: string
  alternativeText: string | null
  formats: any // Замените на конкретный тип, если есть
  url: string
  previewUrl?: string // Если есть предпросмотр
}

export interface ISalonPhotos {
  id: IID
  name: string
  alternativeText: string | null
  formats: any // Замените на конкретный тип, если есть
  url: string
  previewUrl?: string // Если есть предпросмотр
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
  id: IID
  cityName: string
  citySlug: string
}

export interface IServiceCategories {
  id: IID
  serviceCategoryName: string
}

export interface IService {
  id: IID
  serviceName: string
  service_categories: IServiceCategories[]
}

export interface IServices {
  id: IID
  serviceName: string
  service: IService
}

export interface IWorkingHours {
  dayOfWeek: string
  endTime: string
  startTime: string
}

export interface ISocialNetworks {
  link: string
  title: string
}
