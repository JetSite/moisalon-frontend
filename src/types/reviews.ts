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
  title: string
  user: {
    avatar: IPhoto
    id: string
    username: string
    email: string
    phone: string
  }
}
