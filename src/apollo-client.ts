import { useMemo } from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  NormalizedCacheObject,
  DefaultOptions,
} from '@apollo/client'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient: ApolloClient<NormalizedCacheObject>

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
const dev = process.env.NEXT_PUBLIC_ENV !== 'production'
const isServer = typeof window === 'undefined'
export const server = dev
  ? 'https://moisalon-backend.jetsite.ru/graphql'
  : 'https://moisalon-backend.jetsite.ru/graphql'

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

const link = new HttpLink({
  uri: server,
  fetchOptions: {
    credentials: 'include',
  },
})

const cache = isServer
  ? new InMemoryCacheForServerSide({
      resultCaching: false,
    })
  : new InMemoryCache()

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link,
    cache,
    defaultOptions,
  })
}

export function initializeApollo(
  initialState: NormalizedCacheObject | null = null,
) {
  const _apolloClient = apolloClient ?? createApolloClient()
  if (initialState) {
    const existingCache = _apolloClient.extract()
    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
      ],
    })
    _apolloClient.cache.restore(data)
  }
  if (isServer) return _apolloClient
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

interface PageProps<T> {
  props: Partial<T> & {
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
  const state = pageProps.props?.[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
