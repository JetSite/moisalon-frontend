import { IData } from '../types'

type IGetTotalCount = (data: IData) => number | null

export const getTotalCount: IGetTotalCount = data => {
  if (!data) return null
  return data.meta.pagination.total || null
}
