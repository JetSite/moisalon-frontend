import { ICity, ICountry, IPhone, IPhoto, IRating, ISocialNetworks } from '.'
import { IID } from './common'
import { IMaster } from './masters'
import { IProduct } from './product'
import { IReview } from './reviews'
import { ISalon } from './salon'
import { IVacancy } from './vacancies'

export interface IBrand {
  id: IID
  brandName: string
  slug: string
  seoTitle?: string
  seoDescription?: string
  description?: string
  address?: string
  name?: string
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
  termsDeliveryPrice?: number
  socialNetworks: ISocialNetworks[]
  vacancies: IVacancy[]
  reviews: IReview[]
  ratings: IRating[]
  masters: IMaster[]
  photos: IPhoto[]
  city: ICity
  brandLogo: IPhoto
  salons: ISalon[]
  country: ICountry | null
  products: IProduct[]
  phones: IPhone
  dontShowPrice: boolean
}
