import { IID } from './common'
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
  user: { id: IID; userName: string }
  createdAt: string
  workplace: ISalonWorkplace
  publishedAt: string | null
}
