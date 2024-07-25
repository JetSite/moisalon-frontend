import { ICity, IPhoto } from '.'
import { IID } from './common'

export interface IUserConnection {
  id: IID
  username: string
  email: string
  phone: string
  city: ICity
  avatar: IPhoto
}
