import React, { FC } from 'react'
import { useCitySuggestions } from './useCitySuggestions'
import CitiesList from './CitiesList'
import { useRouter } from 'next/router'
import { ICity } from 'src/types'
import { authConfig } from 'src/api/authConfig'
import { IAppoloMutationCallback, ISetState } from 'src/types/common'
import { setCookie } from 'cookies-next'
import { redirectCityRoutes } from 'src/utils/newUtils/redirectCityRoutes'
import { IMe } from 'src/types/me'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'

export interface PropsUpdatedList {
  cityInput: string
  setCityInput: ISetState<string>
  setShowCitySelect: ISetState<boolean>
  setShowHamburgerMenu?: ISetState<boolean>
  changeCityFunc: IAppoloMutationCallback
  loading: boolean
}

export const UpdatedList: FC<PropsUpdatedList> = ({
  cityInput,
  setCityInput,
  setShowCitySelect,
  setShowHamburgerMenu,
  changeCityFunc,
  loading,
}) => {
  const { setCity } = useAuthStore(getStoreEvent)
  const { me } = useAuthStore(getStoreData)
  const { suggestions, loading: suggestLoad } = useCitySuggestions(cityInput)
  const unicSuggestion = Array.from(new Set(suggestions))
  const router = useRouter()

  const cityClickHandler = (city: ICity) => {
    setCookie(authConfig.cityKeyName, city.slug)
    setCityInput('')
    if (me?.info.id) {
      changeCityFunc({
        variables: { id: me.info.id, data: { selected_city: city.id } },
      })
    }
    setCity(city)

    redirectCityRoutes(city.slug, router)
    setShowCitySelect(false)
    setShowHamburgerMenu && setShowHamburgerMenu(false)
  }

  return (
    <CitiesList
      cities={unicSuggestion}
      cityClickHandler={cityClickHandler}
      loading={suggestLoad || loading}
    />
  )
}
