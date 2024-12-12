import { useEffect } from 'react'
import { CustomWindow, IID, ISetState } from 'src/types/common'
import { useAddressSuggestions } from 'src/components/blocks/Form/AddressField/useAddressSuggestions'
import useBaseStore from 'src/store/baseStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { useLazyQuery, useMutation } from '@apollo/client'
import { getCities as getCitiesQuery } from 'src/api/graphql/city/getCities'
import { ICity } from 'src/types'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { CREATE_CITY } from 'src/api/graphql/city/mutations/createCity'
import { cyrToTranslit } from 'src/utils/translit'

declare let window: CustomWindow

interface Props {
  input: string
  setShowInput: (value: boolean) => void
  setLocationName: ISetState<string | null>
  locationName: string | null
  onlyCity?: boolean
}

export const useLocationSuggestions = ({
  input,
  setShowInput,
  setLocationName,
  onlyCity,
}: Props) => {
  const { suggestions, fullAddress, loading } = useAddressSuggestions(
    input,
    onlyCity,
  ) // получаем город или адрес
  const { setCities } = useBaseStore(getStoreEvent)
  const { cities } = useBaseStore(getStoreData)
  const [addCity] = useMutation(CREATE_CITY, {
    onCompleted: data => {
      const newCity = flattenStrapiResponse(data.createCity) as ICity
      setCities([...cities, newCity])
      setShowInput(false)
    },
  })

  const [getCities] = useLazyQuery(getCitiesQuery, {
    onCompleted: data => {
      const response: ICity[] = flattenStrapiResponse(data.cities)
      setCities(response)
    },
  })

  useEffect(() => {
    if (!cities.length) {
      // если нет гододов в сторе запрашиваем что есть в базе
      getCities({ variables: { itemsCount: 100 } })
    }
  }, [cities.length])

  const locationClickHandler = (location: string) => {
    if (window && window.setFormValue) {
      window.setFormValue('city', location)
    }
    setLocationName(location)
    const findCity = cities.find(e => e.name === location)
    if (!findCity) {
      addCity({
        variables: { name: location, slug: cyrToTranslit(location) },
      })
    } else {
      setShowInput(false)
    }
  }

  return {
    suggestions,
    locationClickHandler,
    fullAddress,
    loading,
  }
}
