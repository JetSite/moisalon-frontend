import { IPhoto } from '.'
import { IBrand } from './brands'
import { IID } from './common'
import { IMeInfo } from './me'
import { ISalon } from './salon'

export interface IVacancyType {
  id: IID
  title: string
}

export interface IVacancy {
  id: IID
  title: string
  slug: string
  shortDescription: string
  fullDescription: string
  conditions: string
  requirements: string
  cover: IPhoto[]
  deleted: boolean
  vacancy_type: IVacancyType
  brand: IBrand | null
  salon: ISalon | null
  user: IMeInfo
}
