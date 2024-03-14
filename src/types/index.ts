export interface IPagination {
  total: number
  page: number
  pageSize: number
  pageCount: number
}

export interface IData {
  data: unknown
  meta: IMetaData
}

export interface IMetaData {
  pagination: Partial<IPagination>
}
