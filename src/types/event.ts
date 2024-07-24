import { IPhoto } from '.'
import { IBrand } from './brands'
import { IID } from './common'
import { IMaster } from './masters'
import { ISalon } from './salon'
import { IUserConnection } from './user'

export interface IEvent {
  id: IID
  title: string
  slug: string
  dateStart: Date
  dateEnd: Date
  address: string
  deleted: boolean
  shortDescription: string
  fullDescription: string
  isPublished: boolean
  salon: ISalon
  brand: IBrand
  master: IMaster
  user: IUserConnection
  cover: IPhoto
  seoTitle: string
  seoDescription: string
}
