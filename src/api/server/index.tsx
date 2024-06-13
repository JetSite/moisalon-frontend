import { ApolloQueryResult } from '@apollo/client'
import { IServerProviderProps } from './types'
import { checkErr } from '../utils/checkErr'
import { fetchCity } from '../utils/fetchCity'
import { authConfig, defaultValues } from '../authConfig'
import Cookies from 'cookies'
import { initializeApollo } from '../apollo-client'
import { getCities } from '../graphql/city/getCities'
import { fetchUser } from '../utils/fetchUser'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { getServerPrepareData } from './utils/getServerPrepareData'
import { INextContext } from 'src/types/common'
import { GetServerSidePropsResult } from 'next'

type IServerProvider = <T>(
  props: IServerProviderProps,
) => Promise<GetServerSidePropsResult<T>>

export const serverProvider: IServerProvider = async ({ data, ctx }) => {
  const cookies = new Cookies(ctx.req, ctx.res)
  const accessToken = cookies.get(authConfig.tokenKeyName)
  const apolloClient = initializeApollo({ accessToken })
  const cityData = await fetchCity(ctx.query.city as string, ctx)
  const user = await fetchUser({ needUser: true, cookies })
  const citiesData =
    (await apolloClient.query({
      query: getCities,
      variables: {
        itemsCount: 10,
      },
    })) || null
  const errorDataRedirect = checkErr(data.pageData).redirect
  const prepareData = data ? getServerPrepareData(data, citiesData) : null

  const serverRouter = (ctx: INextContext, redirect) => {
    const asPath = ctx.resolvedUrl
  }

  // ctx.res.setHeader('Set-Cookie', [
  //   `${authConfig.meKeyName}=${JSON.stringify(user.me) || ''}; Path=/;`,
  // ])

  console.log(prepareData)

  return {
    notFound: false,
    props: { ...prepareData, loc: ctx.resolvedUrl, user },
    redirect: errorDataRedirect,
  }
}
