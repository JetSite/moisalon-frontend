import { dadataConfig, dadataCountryUrl } from '../variables'

export type IGetCountry = (query: string) => any

export const getDadataCountry: IGetCountry = async query => {
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
    }),
  }

  try {
    const response = await fetch(dadataCountryUrl, options)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()

    if (data && data.suggestions && data.suggestions.length > 0) {
      res = data.suggestions.map((e: { data: any; value: string }) => ({
        value: e.value,
      }))
    }
  } catch (error) {
    console.error('Error fetching address:', error)
  }

  return res
}
