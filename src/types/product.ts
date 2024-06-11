import { IPhoto } from '.'
import { IBrand } from './brands'
import { IID } from './common'

export interface IProductCategories {
  title: string
  id: IID
}

export interface IAttrGroups {
  title: string
  attributeGroupType: string | null
  attr_value?: IAttrValue
}

export interface IAttrValue {
  id: IID
  title: string
  attr_groups?: IAttrGroups
}

export interface IAttributesAttrValue {
  id: IID
  attributeName: string
  attr_value: IAttrValue
}

export interface IProduct {
  id: IID
  name: string
  sku: string
  regularPrice: number
  barcode: string
  salePrice: number
  fullDescription: string
  shortDescription: string
  availableInStock: boolean
  product_categories: IProductCategories
  attributes: IAttributesAttrValue
  cover: IPhoto
  gallery: IPhoto[]
  brand: IBrand
}
