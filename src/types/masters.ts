import { ICity, IPhoto, IRating, ISocialNetworks } from '.'
import { IBrand } from './brands'
import { IID } from './common'
import { IReview } from './reviews'
import { ISalon } from './salon'
import { IServices } from './services'

export interface IMasterServices extends IServices {}

export interface IMaster {
  id: IID
  masterName: string
  name: string
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
  masterPhone: string
  masterEmail: string
  phone: string
  email: string
  masterAddress: string
  description: string
  latitude: string
  longitude: string
  office: string
  onlineBookingUrl: string
  resume: string | null // TODO: в запросе пока нет поня
  photosDiploma: IPhoto[]
  salons: ISalon[]
  masterPhoto: IPhoto
  reviews: IReview[]
  ratings: IRating[]
  services: IServices[]
  brands: IBrand[]
  photosWorks: IPhoto[]
  socialNetworks: ISocialNetworks[]
  city: ICity
  photo: IPhoto
}
