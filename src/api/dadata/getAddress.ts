import { Nullable } from 'src/types/common'
import { dadataAdressUrl, dadataConfig } from '../variables'
import { IAddressSuggestion } from 'src/components/blocks/Form/AddressField/useAddressSuggestions'

export type IGetDadataAddress = (query: string) => Promise<IAddressSuggestion[]>

export const getDadataAddress: IGetDadataAddress = async query => {
  let res = []
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Token ' + dadataConfig.TOKEN,
    },
    body: JSON.stringify({ query: query }),
  }

  try {
    const response = await fetch(dadataAdressUrl, options)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()

    if (data && data.suggestions && data.suggestions.length > 0) {
      res = data.suggestions.map((e: { data: any; value: string }) => ({
        geoLat: e.data.geo_lat ? Number(e.data.geo_lat) : null,
        geoLon: e.data.geo_lon ? Number(e.data.geo_lon) : null,
        value: e.value,
        city: e.data.city || null,
        zipcode: e.data.postal_code || null,
        house: e.data.house,
      }))
    }
  } catch (error) {
    console.error('Error fetching address:', error)
  }

  return res
}
