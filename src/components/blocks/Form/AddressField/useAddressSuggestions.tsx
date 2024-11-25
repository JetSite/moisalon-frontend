import { useDebounce } from 'use-debounce'
import { getDadataAddress } from 'src/api/dadata/getAddress'
import { useEffect, useState } from 'react'
import { ISetState } from 'src/types/common'
import { getDadataCity } from 'src/api/dadata/getCity'

export const isEnoughLength = (string: string) =>
  string ? string.length > 2 : false

export interface IAddressSuggestion {
  geoLat: number
  geoLon: number
  value: string
  city: string
  zipcode: string
  house: string | null
}

type IUseAddressSuggestions = (
  addres: string,
  onlyCity?: boolean,
  debounce?: number,
) => {
  suggestions: string[]
  fullAddress: IAddressSuggestion | null
  loading: boolean
}

export const useAddressSuggestions: IUseAddressSuggestions = (
  address,
  onlyCity,
  debounce = 500,
) => {
  const [data, setData] = useState<IAddressSuggestion[]>([])
  const [debouncedAddress] = useDebounce(address, debounce)
  const validAddress = isEnoughLength(debouncedAddress)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getAdress = async (
      string: string,
      setData: ISetState<IAddressSuggestion[]>,
    ) => {
      setLoading(true)
      const res = onlyCity
        ? await getDadataCity(string)
        : await getDadataAddress(string)

      setData(res)
      setLoading(false)
    }
    if (validAddress) {
      getAdress(debouncedAddress, setData)
    }
  }, [debouncedAddress])

  if (!data) {
    return { suggestions: [], fullAddress: null, loading }
  }

  let prepareSuggestions = data.length
    ? data.filter(a => a.value !== null && a.value !== undefined)
    : []

  const fullAddress =
    prepareSuggestions.length >= 1 ? prepareSuggestions[0] : null
  const suggestions = prepareSuggestions.map(e => e.value)

  return { suggestions, fullAddress, loading }
}
