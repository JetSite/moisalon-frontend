import { useMemo } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  NormalizedCacheObject,
  DefaultOptions,
  ServerError,
  Operation,
} from '@apollo/client'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { deleteCookie, getCookie } from 'cookies-next'
import { authConfig, baseUrl } from './authConfig'
import Router from 'next/router'
import { onError } from '@apollo/client/link/error'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { Nullable } from 'src/types/common'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject>

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const dev = process.env.NEXT_PUBLIC_ENV !== 'production'
const isServer = typeof window === 'undefined'
export const server = baseUrl

export class InMemoryCacheForServerSide extends InMemoryCache {
  diff() {
    return {}
  }

  broadcastWatches() {}
}

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

export const getAuthLink = (accessToken?: string) => {
  const httpLink = createUploadLink({
    uri: server,
    fetchOptions: {
      credentials: 'include',
    },
  })

  const authLink = new ApolloLink((operation, forward) => {
    const token = getCookie(authConfig.tokenKeyName) || accessToken

    operation.setContext(({ headers = {} }) => {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      }
    })

    return forward(operation)
  })
  const errorLink = onError(error => {
    if (error.networkError?.message.includes('headers')) {
      if (typeof window !== 'undefined') {
        deleteCookie(authConfig.tokenKeyName)
        Router.push('/auth')
      }
      return
    }

    if (
      (error.networkError as ServerError | undefined)?.response?.statusText ===
      'Unauthorized'
    ) {
      if (typeof window !== 'undefined') {
        deleteCookie(authConfig.tokenKeyName)
      }
      Router.push(authConfig.notAuthLink)
      return
    }

    if (error.graphQLErrors) {
      for (const err of error.graphQLErrors) {
        console.log(err.extensions)

        if (
          err?.message === 'Unauthorized' ||
          err?.message === 'Forbidden access'
        ) {
          if (typeof window !== 'undefined') {
            deleteCookie(authConfig.tokenKeyName)
            Router.push(authConfig.notAuthLink)
          }
          return
        } else {
          // Router.back()
          return
        }
      }
    }
  })
  return ApolloLink.from([errorLink, authLink, httpLink])
}

const cache = isServer
  ? new InMemoryCacheForServerSide({
      resultCaching: false,
    })
  : new InMemoryCache()

interface IApolloClientProps {
  accessToken?: string
  initialState?: NormalizedCacheObject | null
}

function createApolloClient(data: IApolloClientProps) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: getAuthLink(data?.accessToken),
    cache,
    defaultOptions,
  })
}

export function initializeApollo(data?: IApolloClientProps) {
  const _apolloClient =
    apolloClient ??
    createApolloClient({
      accessToken: data?.accessToken,
      initialState: data?.initialState,
    })
  if (data?.initialState) {
    const existingCache = _apolloClient.extract()
    const mergedData = merge(data?.initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    })
    _apolloClient.cache.restore(mergedData)
  }
  if (isServer) return _apolloClient
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

interface PageProps<T> {
  props: Nullable<T> & {
    __APOLLO_STATE__?: NormalizedCacheObject
  }
}

export function addApolloState<T>(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: PageProps<T>,
): PageProps<T> {
  if (pageProps.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo<T>(pageProps: PageProps<T>) {
  const state = pageProps.props?.[APOLLO_STATE_PROP_NAME] || null

  const store = useMemo(
    () => initializeApollo({ initialState: state }),
    [state],
  )
  return store
}
