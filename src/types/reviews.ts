import { IPhoto } from '.'
import { IID } from './common'

export interface IReview {
  id: string
  rating: {
    id: string
    title: string
  } | null
  reviewContent: string
  reviewTitle: string
  title: string
  user: {
    avatar: IPhoto
    id: string
    username: string
    email: string
    phone: string
  }
}
