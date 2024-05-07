import {
  ICity,
  IMetroStations,
  ICoverImage,
  ISalonLogo,
  ISalonPhones,
  ISalonPhotos,
  IServices,
  ISocialNetworks,
  IWorkingHours,
} from '.'
import { IBrand } from './brands'
import { IID } from './common'
import { IMaster } from './masters'

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
  salonAverageScore: number
  salonRating: number
  salonReviewsCount: number
  salonSumScore: number
  salonWorkplacesCount: number
  salonBrandsCount: number
  salonMastersCount: number
  salonDescription: string
  salonOnlineBookingUrl: string
  salonWebSiteUrl: string
  salonIsPublished: boolean
  salonIsNotRent: boolean
  salonOwnerConfirmed: boolean
  salonCover: ICoverImage | null
  salonLogo: ISalonLogo | null
  salonPhotos: ISalonPhotos[]
  salonPhones: ISalonPhones[]
  cities: ICity
  services: IServices[]
}

export interface ISalonPage extends ISalon {
  metro_stations: IMetroStations[]
  brands: IBrand[]
  masters: IMaster[]
  user: { id: IID }
  activities: { id: IID; activityName: string }[]
  socialNetworks: ISocialNetworks[]
  review: {
    // Поля для отзывов
  }[]
  workingHours: IWorkingHours[]
}
