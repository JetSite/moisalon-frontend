import { useDebounce } from 'use-debounce'
import { useEffect, useState } from 'react'
import { ISetState } from 'src/types/common'
import { getDadataCountry } from 'src/api/dadata/getCountry'
import { isEnoughLength } from './useAddressSuggestions'

type IUseCountrySuggestions = (
  addres: string,
  debounce?: number,
) => {
  suggestions: string[]
  loading: boolean
  coordinates: { value: string } | null
}

export const useCountrySuggestions: IUseCountrySuggestions = (
  address,
  debounce = 500,
) => {
  const [data, setData] = useState<{ value: string }[]>([])
  const [debounced] = useDebounce(address, debounce)
  const validCountry = isEnoughLength(debounced)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getData = async (
      string: string,
      setData: ISetState<{ value: string }[]>,
    ) => {
      setLoading(true)
      const res = await getDadataCountry(string)
      setData(res)
      setLoading(false)
    }
    if (validCountry) {
      getData(debounced, setData)
    }
  }, [debounced])

  if (!data) {
    return { suggestions: [], coordinates: null, loading }
  }

  let prepareSuggestions = data.length
    ? data.filter(a => a.value !== null && a.value !== undefined)
    : []

  const coordinates =
    prepareSuggestions.length >= 1 ? prepareSuggestions[0] : null
  const suggestions = prepareSuggestions.map(e => e.value)

  return { suggestions, coordinates, loading }
}
