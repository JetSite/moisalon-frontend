import { IID } from './common'

export interface IReview {
  id: IID
  brand: { id: IID; brandName: string } | null
  salons: { id: IID; salonName: string } | null
  master: { id: IID; masterName: string } | null
  product: { id: IID; productName: string } | null
  reviewContent: string
  reviewTitle: string
}
