import { ICity, IPhoto, IServiceCategories, IServices } from '.'
import { IID } from './common'

export interface IMaster {
  id: IID
  masterAddress: string
  masterEmail: string
  masterName: string
  masterPhone: string
  city: ICity
  masterPhoto: IPhoto
  averageScore: number
  numberScore: number
  services: IServices[]
  serviceCategories: IServiceCategories[]
}
