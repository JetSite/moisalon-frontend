import { IPhoto } from '.'
import { IID } from './common'

export interface IBanner {
  bannerImage: IPhoto
  linkText: string
  linkUrl: string
  title: string | null
}

export interface IBannerHook {
  id: IID
  title: string | null
  name: string | null
  banners: IBanner[]
}
