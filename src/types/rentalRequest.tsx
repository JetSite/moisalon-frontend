import { IID } from './common'
import { IMeInfo, IUser } from './me'
import { ISalonWorkplace } from './workplace'

export interface IRentalRequest {
  comment: string
  contacts: string
  dateAt: string
  dateTo: string
  id: string
  salon: { id: IID; name: string }
  slug: string
  status: { id: IID; title: string }
  title: string
  type: { id: IID; title: string }
  user: IMeInfo
  communication_types: { id: IID; title: string }[] | null
  createdAt: string
  workplace: ISalonWorkplace
  publishedAt: string | null
}
