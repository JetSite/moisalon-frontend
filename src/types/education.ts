import { IPhoto } from '.'
import { IBrand } from './brands'
import { IID } from './common'
import { IMaster } from './masters'
import { IUser } from './me'
import { ISalon } from './salon'

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
  salon: ISalon
  master: IMaster
  brands: IBrand[]
  user: IUser
  cover: IPhoto
  sumScore: number
  amount: string
}
