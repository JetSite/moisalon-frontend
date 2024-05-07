import { IPhoto } from '.'
import { IID } from './common'

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
  brand: { id: IID; brandName: string } | null
  salon: { id: IID; salonName: string } | null
}
