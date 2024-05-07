import { ICity, IPhoto } from '.'

export interface IBrand {
  brandLogo: IPhoto
  brandName: string
  id: string
  city: ICity
}
