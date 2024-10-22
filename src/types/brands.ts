import { ICity, ICountry, IPhone, IPhoto, IRating, ISocialNetworks } from '.'
import { IID } from './common'
import { IMaster } from './masters'
import { IProduct } from './product'
import { IPromotions } from './promotions'
import { IReview } from './reviews'
import { ISalon } from './salon'
import { IVacancy } from './vacancies'

export interface IBrand {
  id: IID
  name: string
  slug: string
  seoTitle?: string
  seoDescription?: string
  description?: string
  address?: string
  history?: string
  rating?: number
  ratingCount?: number | string
  reviewsCount?: number
  email?: string
  office?: string
  latitude?: number
  longitude?: number
  manufacture?: string
  minimalOrderPrice?: number
  termsDeliveryPrice?: string
  socialNetworks: ISocialNetworks[]
  vacancies: IVacancy[]
  reviews: IReview[]
  ratings: IRating[]
  masters: IMaster[]
  photos: IPhoto[]
  city: ICity
  logo: IPhoto
  salons: ISalon[]
  country: ICountry | null
  products: IProduct[]
  phones: IPhone[]
  dontShowPrice: boolean
  promotions: IPromotions[] | null
  webSiteUrl: string | null
}
