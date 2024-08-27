import { IPhoto } from '.'

export interface IPromotions {
  id: string
  title: string
  cover: IPhoto
  fullDescription?: string
  shortDescription?: string
  dateStart: string
  dateEnd: string
  deleted: boolean
  value: string
  publishedAt: string | null
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
