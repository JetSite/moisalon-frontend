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
  activityName: string
}

export interface ISalon {
  id: IID
  createdAt: string
  latitude: string
  longitude: string
  locationDirections: string
  publishedAt: string
  updatedAt: string
  salonID: string
  salonName: string
  salonAddress: string
  salonEmail: string
  salonContactPersonName: string
  salonContactPersonPhone: string
  salonContactPersonEmail: string
  reviewsCount: number
  rating: number
  salonWorkplacesCount: number
  salonBrandsCount: number
  salonMastersCount: number
  salonDescription: string
  salonOnlineBookingUrl: string
  salonWebSiteUrl: string
  salonIsPublished: boolean
  salonIsNotRent: boolean
  salonOwnerConfirmed: boolean
  salonCover: IPhoto | null
  salonLogo: IPhoto | null
  salonPhotos: IPhoto[]
  salonPhones: ISalonPhones[]
  cities: ICity
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
