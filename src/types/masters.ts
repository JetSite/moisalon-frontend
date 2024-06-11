import { ICity, IGender, IPhoto, IRating, ISocialNetworks } from '.'
import { IBrand } from './brands'
import { IID } from './common'
import { IReview } from './reviews'
import { ISalon } from './salon'
import { IServices } from './services'

export interface IMasterServices extends IServices {}

export interface IResume {
  id: IID
  title: string
  content: string
  master: IMaster
  specialization: string
  age: number
  workSchedule: string
  salary: string
  region: ICity
  gender: IGender
}

export interface IMaster {
  id: IID
  name: string
  phone: string
  email: string
  address: string

  reviewsCount: number
  rating: number
  ratingCount: number
  webSiteUrl: string
  slug: string
  seoDescription: string
  haveViber: boolean
  haveTelegram: boolean
  haveWhatsApp: boolean
  searchWork: boolean
  description: string
  latitude: string
  longitude: string
  office: string
  onlineBookingUrl: string
  resumes: IResume[]
  photosDiploma: IPhoto[]
  salons: ISalon[]
  photo: IPhoto
  reviews: IReview[]
  ratings: IRating[]
  services: IServices[]
  brands: IBrand[]
  photosWorks: IPhoto[]
  socialNetworks: ISocialNetworks[]
  city: ICity
}

export interface IMasterCreateInput {
  name: string
  email: string
  phone: string
  description: string
  address: string
  searchWork?: boolean
  services: IMasterServices[]
  webSiteUrl?: string
  haveTelegram?: boolean
  haveViber?: boolean
  haveWhatsApp?: boolean
  photo: IID
  city: IID
  resumes?: IID[]
}
