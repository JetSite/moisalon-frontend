import { SEARCH_URL } from '../variables'

type SearchEntity = (query: string) => Promise<Array<any>>

export const searchEntity: SearchEntity = async query => {
  let data: any[] = []
  if (query.length < 3) return data

  try {
    const url = `${SEARCH_URL}?query=${encodeURIComponent(query)}`
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data = await res.json()

    return data
  } catch (error) {
    console.error('Error in search query:', error)
    throw new Error('Error in search query')
  }
}
