import { IRawService } from 'src/utils/serviceCatalog'
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
import { IPromotions } from './promotions'
import { IReview } from './reviews'
import { IServiceCategories, IServices } from './services'
import { IVacancy } from './vacancies'
import { ISalonWorkplace } from './workplace'

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
  seoTitle: string
  seoDescription: string
  latitude: number
  longitude: number
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
  rent: boolean
  ownerConfirmed: boolean
  cover: IPhoto | null
  logo: IPhoto | null
  photos: IPhoto[]
  salonPhones: ISalonPhones[]
  city: ICity
  services: IRawService[]
  ratingCount: number
  ratings: IRating[]
  reviews: IReview[]
  workingHours: IWorkingHours[]
  contactPersonWH: IWorkingHours[]
  promotions: IPromotions[]
  videoReviewUrl: string | null
}

export interface ISalonPage extends ISalon {
  metro_stations?: IMetroStations[]
  servicesM: IRawService[]
  brands: IBrand[]
  masters: IMaster[]
  user: { id: IID }
  activities: ISalonActivity[]
  socialNetworks: ISocialNetworks[]
  vacancies: IVacancy[]
  rental_requests: any[]
  workplaces: ISalonWorkplace[]
}
