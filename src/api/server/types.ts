import { ApolloQueryResult } from '@apollo/client'
import { INextContext, Nullable } from 'src/types/common'

export interface IServerProviderPropsData {
  pageData: ApolloQueryResult<any>
  otherData: ApolloQueryResult<any>[] | null
  totalCount: ApolloQueryResult<any>[] | null
  pagination: ApolloQueryResult<any>[] | null
}

export interface IServerProviderProps {
  data: IServerProviderPropsData
  ctx: INextContext
}

export interface IServerProps {
  props: {}
}

export interface IServerProciderData {
  data: ApolloQueryResult<any>[]
}
