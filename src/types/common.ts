import {
  ApolloCache,
  ApolloQueryResult,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from '@apollo/client'
import { ReactElement } from 'react'

export type Nullable<T> = { [P in keyof T]: T[P] | null }

export interface LazyType {
  [K: string]: LazyType
}

export interface InitialValuesForm {
  [K: string]: string
}

export type IID = string | number

export type IApolloRefetch = (
  variables?: Partial<OperationVariables> | undefined,
) => Promise<ApolloQueryResult<any>>

export type IAppoloMutationCallback = (
  options?:
    | MutationFunctionOptions<
        any,
        OperationVariables,
        DefaultContext,
        ApolloCache<any>
      >
    | undefined,
) => Promise<any>

export type IChildren =
  | Array<ReactElement | boolean | string | null>
  | ReactElement
  | boolean
  | string
  | null

export interface CustomWindow extends Window {
  setFormValue?: (fieldName: string, value: any) => void
}
