import { Dispatch, FC, RefObject, SetStateAction } from 'react'
import { useCitySuggestions } from '../../../../../pages/MainPage/components/CitySelect/useCitySuggestions'
import { Wrapper, CityList, CityItem } from './styles'
import { CustomWindow, IID, ISetState } from 'src/types/common'
import { ICity } from 'src/types'

interface Props {
  cityInput: string
  setShowCityInput: (value: boolean) => void
  cityPopupRef: RefObject<HTMLDivElement>
  setCityId: ISetState<IID | null>
}
declare let window: CustomWindow

const ProfileCitySelect: FC<Props> = ({
  cityInput,
  setShowCityInput,
  cityPopupRef,
  setCityId,
}) => {
  const { suggestions } = useCitySuggestions(cityInput)
  const unicSuggestion = []

  const cityClickHandler = (city: ICity) => {
    if (window && window.setFormValue) {
      window.setFormValue('city', city.cityName)
    }
    setCityId(city.id)
    setShowCityInput(false)
  }

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
              <CityItem key={i} onClick={() => cityClickHandler(city)}>
                {city.cityName}
              </CityItem>
            ))}
          </CityList>
        </Wrapper>
      ) : null}
    </>
  )
}

export default ProfileCitySelect
