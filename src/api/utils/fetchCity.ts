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

export const fetchCity: IFetchCity = async (citySlug = null, ctx) => {
  let cityCookie = getCookie(authConfig.cityKeyName) || null
  if (ctx) {
    const cookies = new Cookies(ctx.req, ctx.res)
    cityCookie = cookies.get(authConfig.cityKeyName) || null
  }
  const apolloClient = initializeApollo()

  let slug = cityCookie || defaultValues.citySlug

  if (
    citySlug
    // &&  citySlug !== 'null'
  ) {
    slug = citySlug
  }

  const city = await apolloClient.query({
    query: getCities,
    variables: {
      slug,
    },
  })

  const response: ICity[] = flattenStrapiResponse(city.data.cities)

  if (response.length) {
    return response[0]
  }

  return { slug: defaultValues.citySlug, id: 1 }
}
