import {
  ApolloCache,
  ApolloQueryResult,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from '@apollo/client'
import { GetServerSidePropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Dispatch, ReactElement, SetStateAction } from 'react'

export type Nullable<T> = { [P in keyof T]: T[P] | null }

export interface LazyType {
  [K: string]: LazyType | string | undefined | boolean | Array<any>
}

export interface InitialValuesForm {
  [K: string]: string
}

export type ISetState<T> = Dispatch<SetStateAction<T>>

export type IID = string

export type IApolloRefetch = (
  variables?: Partial<OperationVariables> | undefined,
) => Promise<ApolloQueryResult<any>>

export type IAppoloMutationCallback = (variables?: any) => Promise<any>

export type IChildren =
  | Array<ReactElement | boolean | string | null>
  | ReactElement
  | boolean
  | string
  | null

export interface CustomWindow extends Window {
  setFormValue?: (fieldName: string, value: any) => void
}

export type INextContext = GetServerSidePropsContext<
  ParsedUrlQuery,
  PreviewData
>
