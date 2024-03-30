import { ICity, IServiceCategories, IServices } from '.'
import { IID } from './common'

interface IMasterPhoto {
  id: IID
  name: string
  url: string
}

export interface IMaster {
  id: IID
  masterEmail: string
  masterName: string
  masterPhone: string
  city: ICity
  masterPhoto: IMasterPhoto
  averageScore: number
  numberScore: number
  services: IServices[]
  serviceCategories: IServiceCategories[]
}
