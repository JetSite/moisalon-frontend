import { ICity, IPhoto } from '.'
import { IBrand } from './brands'
import { IID, LazyType } from './common'
import { IMaster } from './masters'
import { IOrder } from './orders'
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
  birthDate: string | null
}

export interface IOwnersIds
  extends Omit<IUserThings, 'salons' | 'masters' | 'brands' | 'products'> {
  salons?: Pick<ISalon, 'id'>[]
  masters?: Pick<IMaster, 'id'>[]
  brands?: Pick<IBrand, 'id'>[]
  products?: Pick<IProduct, 'id'>[]
}

export interface IUserThings {
  salons?: ISalon[]
  masters?: IMaster[]
  brands?: IBrand[]
  products?: IProduct[]
  educations?: any
  cart?: ICart
}

export interface IUserReviews extends IReview {
  salons?: { id: IID }
  master?: { id: IID }
  brand?: { id: IID }
  product?: { id: IID }
}

export interface IMe {
  info: IMeInfo
  owner?: IOwnersIds
}

export interface IUser extends Omit<IMe, 'owner'> {
  owner: IUserThings
  favorite: IUserThings
  vacancies?: IVacancy[]
  reviews?: IUserReviews[]
  orders: IOrder[]
}
