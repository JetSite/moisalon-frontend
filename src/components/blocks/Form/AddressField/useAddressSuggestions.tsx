import { useQuery } from '@apollo/client'
import { useDebounce } from 'use-debounce'
import { addressSuggestionsQuery } from '../../../../_graphql-legacy/addressSuggestionsQuery'
import { getDadataAddress } from 'src/api/dadata/getAddress'
import { useEffect, useState } from 'react'
import { ISetState } from 'src/types/common'

const isEnoughLength = (address: string) =>
  address ? address.length > 2 : false

export interface IAddressSuggestion {
  geoLat: number
  geoLon: number
  value: string
  city: string
  zipcode: string
}

type IuseAddressSuggestions = (
  addres: string,
  debounce?: number,
) => {
  suggestions: string[]
  coordinates: IAddressSuggestion | null
}

export const useAddressSuggestions: IuseAddressSuggestions = (
  address,
  debounce = 500,
) => {
  const [data, setData] = useState<IAddressSuggestion[]>([])
  const [debouncedAddress] = useDebounce(address, debounce)
  const validAddress = isEnoughLength(debouncedAddress)

  useEffect(() => {
    const getAdress = async (
      string: string,
      setData: ISetState<IAddressSuggestion[]>,
    ) => {
      const res = await getDadataAddress(string)
      setData(res)
    }
    if (validAddress) {
      getAdress(debouncedAddress, setData)
    }
  }, [debouncedAddress])

  if (!data) {
    return { suggestions: [], coordinates: null }
  }

  const prepareSuggestions = data.length
    ? data.filter(a => a.value !== null && a.value !== undefined)
    : []

  const coordinates =
    prepareSuggestions.length >= 1 ? prepareSuggestions[0] : null
  const suggestions = prepareSuggestions.map(e => e.value)

  return { suggestions, coordinates }
}
