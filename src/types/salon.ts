import {
  ICity,
  IMetroStations,
  ISalonPhones,
  ISocialNetworks,
  IWorkingHours,
  IPhoto,
  IRating,
} from '.'
import { IBrand } from './brands'
import { IID } from './common'
import { IMaster } from './masters'
import { IReview } from './reviews'
import { IServices } from './services'
import { IVacancy } from './vacancies'

export interface ISalonActivity {
  id: IID
  title: string
}

export interface ISalon {
  id: IID
  name: string
  email: string
  address: string

  createdAt: string
  latitude: string
  longitude: string
  locationDirections: string
  updatedAt: string
  contactPersonName: string
  contactPersonPhone: string
  contactPersonEmail: string
  reviewsCount: number
  rating: number
  workplacesCount: number
  brandsCount: number
  mastersCount: number
  description: string
  onlineBookingUrl: string
  webSiteUrl: string
  published: boolean
  rent: boolean
  ownerConfirmed: boolean
  cover: IPhoto | null
  logo: IPhoto | null
  photos: IPhoto[]
  salonPhones: ISalonPhones[]
  city: ICity
  services: IServices[]
  ratingCount: number
  ratings: IRating[]
  reviews: IReview[]
  workingHours: IWorkingHours[]
}

export interface ISalonPage extends ISalon {
  metro_stations?: IMetroStations[]
  servicesM: IServices[]
  brands: IBrand[]
  masters: IMaster[]
  user: { id: IID }
  activities: ISalonActivity[]
  socialNetworks: ISocialNetworks[]
  vacancies: IVacancy[]
}
