import { getCookie } from 'cookies-next'
import { authConfig } from '../authConfig'
import { initializeApollo } from '../apollo-client'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { INextContext } from 'src/types/common'
import { ME } from '../graphql/me/queries/getMe'
import { USER } from '../graphql/me/queries/getUser'
import { StrapiDataObject } from 'src/utils/flattenStrapiResponse'

/**
 * Fetches user data for server-side rendering and authentication guard.
 *
 * @param ctx - Next.js page context, containing request and response objects.
 * @returns An object containing the following:
 * - `apolloClient`: An instance of Apollo Client configured with authentication.
 * - `user`: User data fetched via GraphQL, or `undefined` if not authenticated.
 * - `redirect`: Redirect information, if authentication fails (e.g., to login page).
 */

export interface IGetServerUserSuccess {
  apolloClient: ApolloClient<NormalizedCacheObject>
  user: NonNullable<StrapiDataObject>
}

export interface IGetServerUserRedirect {
  redirect: RedirectResult['redirect']
}

export type IGetServerUserResult =
  | IGetServerUserSuccess
  | IGetServerUserRedirect

type IGetServerUser = (
  props: INextContext,
  onlyMe?: boolean,
) => Promise<IGetServerUserResult>

type RedirectResult = {
  redirect: {
    destination: string
    permanent: boolean
  }
}

export const getServerUser: IGetServerUser = async ctx => {
  const accessToken = getCookie(authConfig.tokenKeyName, ctx)
  const apolloClient = initializeApollo({ accessToken })

  let id: string | null = null
  let user: StrapiDataObject | null = null

  const redirect = {
    destination: '/login',
    permanent: false,
  }

  if (accessToken && typeof accessToken === 'string') {
    try {
      // Basic JWT format validation
      const [header, payload, signature] = accessToken.split('.')
      if (!header || !payload || !signature) {
        throw new Error('Invalid token format')
      }
    } catch (error) {
      console.error('Invalid token:', error)
      return {
        redirect,
      }
    }
  } else {
    return {
      redirect,
    }
  }

  try {
    const meData = await apolloClient.query({
      query: ME,
    })
    id = meData.data?.me.id || null
  } catch (error) {
    console.error('Failed to fetch user data:', error)
    return { redirect }
  }

  if (!id) {
    return {
      redirect,
    }
  }
  try {
    const userData = await apolloClient.query({
      query: USER,
      variables: { id },
    })
    user = userData.data.usersPermissionsUser
  } catch (error) {
    console.error('Failed to fetch user details:', error)
    return { redirect }
  }

  return {
    apolloClient,
    user,
  }
}
