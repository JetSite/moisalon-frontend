import { IPhoto } from '.'
import { IID } from './common'

export enum IPromotionStatus {
  DRAFT = '2',
  PUBLISHED = '3',
}

interface IBasePromoOvner {
  id: string
  name: string
  address: string
  email: string
}

export interface IPromoMaster extends IBasePromoOvner {
  phone: string
}
export interface IPromoSalon extends IBasePromoOvner {
  salonPhones: {
    id: IID
    phoneNumber: string
  }[]
}
export interface IPromoBrand extends IBasePromoOvner {
  phones: {
    id: IID
    phoneNumber: string
  }[]
}

export interface IPromotions {
  id: string
  title: string
  cover: IPhoto
  fullDescription?: string
  shortDescription?: string
  dateStart: string
  dateEnd: string
  deleted: boolean
  promoCode: string
  publishedAt: string | null
  status: {
    id: IPromotionStatus
    title: string
    titleRus: string
  }
  master?: IPromoMaster
  brand?: IPromoBrand
  salon?: IPromoSalon
}
