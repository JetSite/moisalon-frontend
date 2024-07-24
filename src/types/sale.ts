import { IPhoto } from '.'
import { IBrand } from './brands'
import { IID } from './common'
import { IMaster } from './masters'
import { ISalon } from './salon'
import { IUserConnection } from './user'

export interface ISale {
  id: IID
  title: string
  slug: string
  cover: IPhoto
  fullDescription: string
  shortDescription: string
  salon: ISalon
  master: IMaster
  brand: IBrand
  seoTitle: string
  seoDescription: string
  dateStart: Date
  dateEnd: Date
  deleted: boolean
  user: IUserConnection
  value: string
}
