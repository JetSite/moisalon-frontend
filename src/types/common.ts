import {
  ApolloQueryResult,
  LazyQueryExecFunction,
  OperationVariables,
} from '@apollo/client';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Dispatch, ReactElement, SetStateAction } from 'react';

export type Nullable<T> = { [P in keyof T]: T[P] | null };

export interface LazyType {
  [K: string]: LazyType | string | undefined | boolean | Array<unknown>;
}

export interface InitialValuesForm {
  [K: string]: string;
}

export type ISetState<T> = Dispatch<SetStateAction<T>>;

export type IID = string;

export type IApolloRefetch = (
  variables?: Partial<OperationVariables> | undefined,
) => Promise<ApolloQueryResult<unknown>>;

export type IApolloLazyRefetch = LazyQueryExecFunction<
  unknown,
  OperationVariables
>;

export type IApolloOnCompleted<TData> = (data: TData) => void;

export type IAppoloMutationCallback = (variables?: unknown) => Promise<unknown>;

export type IChildren =
  | Array<ReactElement | boolean | string | null>
  | ReactElement
  | boolean
  | string
  | null;

export interface CustomWindow extends Window {
  setFormValue?: (fieldName: string, value: unknown) => void;
}

export type INextContext = GetServerSidePropsContext<
  ParsedUrlQuery,
  PreviewData
>;
