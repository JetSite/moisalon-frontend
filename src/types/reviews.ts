import { IPhoto } from '.'
import { IID } from './common'

export interface IReview {
  id: string
  rating: {
    id: string
    title: string
  } | null
  content: string
  title: string
  publishedAt: string | null
  user: {
    avatar: IPhoto
    id: string
    username: string
    email: string
    phone: string
  }
}
