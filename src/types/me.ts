import { ICity, IPhoto } from '.'
import { IBrand } from './brands'
import { IID } from './common'
import { IMaster } from './masters'
import { IReview } from './reviews'
import { ISalon } from './salon'
import { IVacancy } from './vacancies'

export interface IMeInfo {
  id: IID
  username: string
  email: string
  phone: string
  city: ICity
  avatar: IPhoto | null
  masters: IMaster[]
}

export interface IMeThings {
  salons: ISalon[]
  masters: IMaster[]
  brand: IBrand[]
  products?: any
  educations?: any
  [K: string]: any
}

export interface IMe {
  info: IMeInfo
  owner?: IMeThings
  favorite?: IMeThings
  vacancies?: IVacancy[]
  reviews?: IReview[]
  [K: string]: any
}
