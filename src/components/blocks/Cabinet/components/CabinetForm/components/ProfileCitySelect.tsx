import { FC, RefObject, useEffect } from 'react'
import { Wrapper, CityList, CityItem } from './styles'
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
import { useLocationSuggestions } from 'src/utils/newUtils/hooks/useLocationSuggestions'

interface Props {
  cityInput: string
  setShowCityInput: (value: boolean) => void
  cityPopupRef: RefObject<HTMLDivElement>
  setCityName: ISetState<string | null>
  cityName: string | null
}
declare let window: CustomWindow

const ProfileCitySelect: FC<Props> = ({
  cityInput,
  setShowCityInput,
  cityPopupRef,
  setCityName,
  cityName,
}) => {
  const { suggestions, locationClickHandler } = useLocationSuggestions({
    input: cityInput,
    setShowInput: setShowCityInput,
    setLocationName: setCityName,
    locationName: cityName,
    onlyCity: true,
  })

  return (
    <>
      {cityInput ? (
        <Wrapper ref={cityPopupRef}>
          {/* {suggestions.length === 0 && (
            <CityItem onClick={() => cityClickHandler(cityInput)}>
              {cityInput}
            </CityItem>
          )} */}
          <CityList>
            {suggestions.map((city, i) => (
              <CityItem key={i} onClick={() => locationClickHandler(city)}>
                {city}
              </CityItem>
            ))}
          </CityList>
        </Wrapper>
      ) : null}
    </>
  )
}

export default ProfileCitySelect
