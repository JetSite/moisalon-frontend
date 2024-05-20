import {
  ICity,
  IMetroStations,
  ISalonPhones,
  IServices,
  ISocialNetworks,
  IWorkingHours,
  IPhoto,
  IRating,
} from '.'
import { IBrand } from './brands'
import { IID } from './common'
import { IMaster } from './masters'
import { IReview } from './reviews'
import { IVacancy } from './vacancies'

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
}

export interface ISalonPage extends ISalon {
  metro_stations?: IMetroStations[]
  servicesM: IServices[]
  brands: IBrand[]
  masters: IMaster[]
  user: { id: IID }
  activities: { id: IID; activityName: string }[]
  socialNetworks: ISocialNetworks[]
  workingHours: IWorkingHours[]
  vacancies: IVacancy[]
}
