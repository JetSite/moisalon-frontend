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

  if (!accessToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  }

  const meData = await apolloClient.query({
    query: ME,
  })
  const id = meData.data?.me.id || null

  if (!id) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  }
  const userData = await apolloClient.query({
    query: USER,
    variables: { id },
  })

  const user: StrapiDataObject = userData.data.usersPermissionsUser

  return {
    apolloClient,
    user,
  }
}
