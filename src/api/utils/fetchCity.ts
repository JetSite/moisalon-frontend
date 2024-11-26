import { getCookie, setCookie } from 'cookies-next'
import { initializeApollo } from 'src/api/apollo-client'
import { authConfig, defaultValues } from 'src/api/authConfig'
import { ICity } from 'src/types'
import { getCities } from 'src/api/graphql/city/getCities'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { INextContext } from 'src/types/common'

export type IFetchCity = (
  slug?: string | null,
  ctx?: INextContext,
) => Promise<ICity>

export const fetchCity: IFetchCity = async (citySlug = null, ctx) => {
  const cityCookie = getCookie(authConfig.cityKeyName, ctx) || null
  const apolloClient = initializeApollo()

  let slug = cityCookie || defaultValues.city.slug

  if (citySlug) {
    slug = citySlug
  }

  try {
    const city = await apolloClient.query({
      query: getCities,
      variables: {
        slug,
      },
    })
    const response: ICity[] = flattenStrapiResponse(city.data.cities)
    if (response.length) {
      setCookie(authConfig.cityKeyName, response[0].slug, ctx)
      return response[0]
    } else {
      const city = await apolloClient.query({
        query: getCities,
        variables: {
          slug: cityCookie || defaultValues.city.slug,
        },
      })
      const response: ICity[] = flattenStrapiResponse(city.data.cities)
      return response[0]
    }
  } catch (error) {
    console.error('error to fetch city: ', error)
    return { slug: defaultValues.city.slug, id: '1' }
  }
}
