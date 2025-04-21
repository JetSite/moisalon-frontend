import {
  ApolloCache,
  ApolloQueryResult,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
} from '@apollo/client';

export type IRefetch = (
  variables?: Partial<OperationVariables> | undefined,
) => Promise<ApolloQueryResult<unknown>>;

export type IMutations = (
  options?:
    | MutationFunctionOptions<
        unknown,
        OperationVariables,
        DefaultContext,
        ApolloCache<unknown>
      >
    | undefined,
) => Promise<unknown>;
