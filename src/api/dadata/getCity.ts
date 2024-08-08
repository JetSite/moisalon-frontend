import { dadataAdressUrl, dadataConfig } from '../variables'

export type IGetCity = (query: string) => any

export const getDadataCity: IGetCity = async query => {
  let res = []
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Token ' + dadataConfig.TOKEN,
    },
    body: JSON.stringify({
      query: query,
      count: 4,

      from_bound: { value: 'city' },
      to_bound: { value: 'city' },
    }),
  }

  try {
    const response = await fetch(dadataAdressUrl, options)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()

    console.log(data)

    if (data && data.suggestions && data.suggestions.length > 0) {
      res = data.suggestions.map((e: { data: any; value: string }) => ({
        geoLat: e.data.geo_lat ? Number(e.data.geo_lat) : null,
        geoLon: e.data.geo_lon ? Number(e.data.geo_lon) : null,
        value: e.data.city,
        city: e.data.city || null,
        zipcode: e.data.postal_code || null,
      }))
    }
  } catch (error) {
    console.error('Error fetching address:', error)
  }

  return res
}
