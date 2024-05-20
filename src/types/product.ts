import { IPhoto } from '.'
import { IBrand } from './brands'
import { IID } from './common'

export interface IProductCategories {
  productCategoryName: string
  id: IID
}

export interface IAttrGroups {
  attributeGroupName: string
  attributeGroupType: string | null
  attr_value?: IAttrValue
}

export interface IAttrValue {
  id: IID
  attributeValueName: string
  attr_groups?: IAttrGroups
}

export interface IAttributesAttrValue {
  id: IID
  attributeName: string
  attr_value: IAttrValue
}

export interface IProduct {
  id: IID
  productName: string
  productSKU: string
  productPrice: number
  productBarcode: string
  productSalePrice: number
  productFullDescription: string
  productShortDescription: string
  productAvailableInStock: boolean
  product_categories: IProductCategories
  attributes: IAttributesAttrValue
  productCover: IPhoto
  productGallery: IPhoto[]
  brand: IBrand
}
