import { ICity, IServiceCategories, IServices } from '.'
import { IID } from './common'

interface IMasterPhoto {
  id: IID
  name: string
  url: string
}

export interface IMaster {
  id: IID
  masterAddress: string
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
