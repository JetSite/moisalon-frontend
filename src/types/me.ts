import { ICity, IPhoto } from '.'
import { IBrand } from './brands'
import { IID, LazyType } from './common'
import { IMaster } from './masters'
import { ICart, IProduct } from './product'
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
}

export interface IUserThings {
  salons?: ISalon[]
  masters?: IMaster[]
  brand?: IBrand[]
  products?: IProduct[]
  educations?: any
  carts?: ICart[]
}

export interface IUserReviews extends IReview {
  salons?: { id: IID }
  master?: { id: IID }
  brand?: { id: IID }
  product?: { id: IID }
}

export interface IOwnersIds {
  salons: { id: IID }[]
  masters: { id: IID }[]
  brand: { id: IID }[]
  products?: { id: IID }[]
  educations?: { id: IID }[]
}

export interface IMe {
  info: IMeInfo
  owner?: IOwnersIds
}

export interface IUser extends Omit<IMe, 'owner'> {
  owner?: IUserThings
  favorite?: IUserThings
  vacancies?: IVacancy[]
  reviews?: IUserReviews[]
  orders?: LazyType[]
}
