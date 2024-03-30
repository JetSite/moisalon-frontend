import { ICity } from '.'

export interface IBrand {
  brandLogo: {
    alternativeText: null | string
    formats: unknown
    id: string
    name: string
    previewUrl: null | string
    url: string
  }
  brandName: string
  id: string
  city: ICity
}
