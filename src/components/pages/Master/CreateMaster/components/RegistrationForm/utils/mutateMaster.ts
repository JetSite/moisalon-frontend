import { ApolloError, ApolloQueryResult } from '@apollo/client'
// import { initializeApollo } from 'src/api/apollo-client'
import { CREATE_MASTER } from 'src/api/graphql/master/mutations/createMaster'
import { UPDATE_MASTER } from 'src/api/graphql/master/mutations/updateMaster'
import { IID, ISetState } from 'src/types/common'
import { IMasterCreateInput } from 'src/types/masters'

interface ICallbacks {
  onError?: (err: ApolloError) => void
  onCompleted?: (data: ApolloQueryResult<any>) => void
  onErrorCreate?: (err: ApolloError) => void
  onCompletedCreate?: (data: ApolloQueryResult<any>) => void
  onErrorMutate?: (err: ApolloError) => void
  onCompletedMutate?: (data: ApolloQueryResult<any>) => void
}

type IMutateMaster = (
  input: IMasterCreateInput,
  ids: { masterId?: IID; userId?: IID },
  callbacks?: ICallbacks,
) => Promise<void>

export const mutateMaster: IMutateMaster = async (input, ids, callbacks) => {
  console.log('useMutateMaster', callbaks)
  try {
    let _callbacks: ICallbacks = {
      onError: undefined,
      onCompleted: undefined,
      onErrorCreate: undefined,
      onCompletedCreate: undefined,
      onErrorMutate: undefined,
      onCompletedMutate: undefined,
    }
    if (callbacks) {
      _callbacks = callbacks
    }
    const {
      onError,
      onCompleted,
      onErrorCreate,
      onCompletedCreate,
      onErrorMutate,
      onCompletedMutate,
    } = _callbacks
    // const apolloClient = initializeApollo()

    const [mutate, { loading: loadingMutate }] = useMutation(UPDATE_MASTER, {
      onError: onErrorMutate || onError,
      onCompleted: onCompletedMutate || onCompleted,
    })
    const [createMaster, { loading: loadingCreate }] = useMutation(
      CREATE_MASTER,
      {
        onCompleted: onCompletedCreate || onCompleted,
        onError: onErrorCreate || onError,
      },
    )
    if (ids.masterId) {
      mutate({ variables: { masterId: ids.masterId, input } })
    } else {
      createMaster({
        variables: { input: { user: ids.userId, ...input } },
      })
    }
  } catch (err) {
    console.log(err)
  }

  return console.log('first')
}
