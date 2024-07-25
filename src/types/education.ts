import { IPhoto } from '.'
import { IBrand } from './brands'
import { IID } from './common'
import { IMaster } from './masters'
import { IReview } from './reviews'
import { ISalon } from './salon'
import { IUserConnection } from './user'

export interface IEducation {
  id: IID
  title: string
  slug: string
  averageScore: number
  dateStart: Date
  dateEnd: Date
  deleted: boolean
  shortDescription: string
  fullDescription: string
  isPublished: boolean
  numberScore: number
  reviews: IReview[]
  salon: ISalon
  master: IMaster
  brand: IBrand
  user: IUserConnection
  cover: IPhoto
  sumScore: number
  amount: string
}
