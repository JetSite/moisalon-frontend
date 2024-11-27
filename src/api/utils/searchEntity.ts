import { ISearchData } from 'src/components/pages/MainPage/components/SearchMain/utils/useSearch'
import { SEARCH_URL } from '../variables'

type SearchEntity = (query: string) => Promise<ISearchData | null>

export const searchEntity: SearchEntity = async query => {
  if (query.length < 3) return null

  try {
    const url = `${SEARCH_URL}?query=${encodeURIComponent(query)}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) {
      throw new Error(`Search request failed: ${res.status} ${res.statusText}`)
    }

    return await res.json()
  } catch (error) {
    console.error('Error in search query:', error)
    throw new Error('Error in search query')
  }
}
