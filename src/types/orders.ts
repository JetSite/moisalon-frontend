import { IID } from './common'
import { IUser } from './me'
import { ICart, IProductCart } from './product'

export interface IAddress {
  city: string
  zipCode: string
  address: string
}

export interface IOrder {
  id: IID
  title: string
  user: IUser
  contactName: string
  contactPhone: string
  cartContent: IProductCart[]
  order_status: {
    title: string
    id: string
  }
  payment_method: {
    title: string
  }
  delivery_method: {
    name: string
  }
  comment: string
  address: IAddress
  createdAt: Date
}

export interface IOrderInput {
  title: string
  user: string
  cartContent: string[]
  order_status: string
  payment_method: string
  comment: string
  address: string
}
