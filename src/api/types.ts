import {
  ApolloCache,
  ApolloQueryResult,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from '@apollo/client'

export type IRefetch = (
  variables?: Partial<OperationVariables> | undefined,
) => Promise<ApolloQueryResult<any>>

export type IMutations = (
  options?:
    | MutationFunctionOptions<
        any,
        OperationVariables,
        DefaultContext,
        ApolloCache<any>
      >
    | undefined,
) => Promise<any>
