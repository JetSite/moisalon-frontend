import { ApolloQueryResult, OperationVariables } from '@apollo/client'

export type IRefetch = (
  variables?: Partial<OperationVariables> | undefined,
) => Promise<ApolloQueryResult<any>>
