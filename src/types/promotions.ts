import { IPhoto } from '.'

export enum IPromotionStatus {
  DRAFT = '2',
  PUBLISHED = '3',
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
  masters?: {
    id: string
    name: string
  }
  brands?: {
    id: string
    name: string
  }
  salons?: {
    id: string
    name: string
  }
}
