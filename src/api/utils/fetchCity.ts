import { getCookie } from 'cookies-next'
import { initializeApollo } from 'src/api/apollo-client'
import { authConfig, defaultValues } from 'src/api/authConfig'
import { ICity } from 'src/types'
import { getCities } from 'src/api/graphql/city/getCities'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { INextContext } from 'src/types/common'
import Cookies from 'cookies'

export type IFetchCity = (
  slug?: string | null,
  ctx?: INextContext,
) => Promise<ICity>

export const fetchCity: IFetchCity = async (slug = null, ctx) => {
  let cityCookie = getCookie(authConfig.cityKeyName) || null
  if (ctx) {
    const cookies = new Cookies(ctx.req, ctx.res)
    cityCookie = cookies.get(authConfig.cityKeyName) || null
  }
  const apolloClient = initializeApollo()

  const citySlug = slug || cityCookie || defaultValues.citySlug
  const city = await apolloClient.query({
    query: getCities,
    variables: {
      citySlug,
    },
  })

  const response: ICity[] = flattenStrapiResponse(city.data.cities)

  if (response.length) {
    return response[0]
  }

  return { citySlug: defaultValues.citySlug, id: 1 }
}
