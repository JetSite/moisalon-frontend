import { getCookie } from 'cookies-next'
import { initializeApollo } from 'src/api/apollo-client'
import { authConfig, defaultValues } from 'src/api/authConfig'
import { ICity } from 'src/types'
import { getCities } from 'src/api/graphql/city/getCities'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

export type IFetchCity = (slug?: string) => Promise<ICity | null>

export const fetchCity: IFetchCity = async slug => {
  const apolloClient = initializeApollo()
  const cityCookie = getCookie(authConfig.cityKeyName)

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

  return null
}
