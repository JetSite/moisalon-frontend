import { ApolloQueryResult, OperationVariables } from '@apollo/client'
import { ReactElement } from 'react'

export type Nullable<T> = { [P in keyof T]: T[P] | null }

export type IID = string | number

export type IApolloRefetch = (
  variables?: Partial<OperationVariables> | undefined,
) => Promise<ApolloQueryResult<any>>

export type IChildren =
  | Array<ReactElement | boolean | string | null>
  | ReactElement
  | boolean
  | string
  | null
