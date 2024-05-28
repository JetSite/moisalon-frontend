import { useMutation } from '@apollo/react-hooks'
import { changeCityMutation } from '../../../_graphql-legacy/city/changeCityMutation'
import { useQuery } from '@apollo/client'
import { currentUserSalonsAndMasterQuery } from '../../../_graphql-legacy/master/currentUserSalonsAndMasterQuery'
import CitiesList from 'src/components/pages/MainPage/components/CitySelect/CitiesList'
import { cyrToTranslit } from 'src/utils/translit'
import { useRouter } from 'next/router'
import useBaseStore from 'src/store/baseStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { IID } from 'src/types/common'
import { Dispatch, FC, SetStateAction } from 'react'
import { ICity } from 'src/types'
import { setCookie } from 'cookies-next'
import { authConfig } from 'src/api/authConfig'
import { useCitySuggestions } from 'src/components/pages/MainPage/components/CitySelect/useCitySuggestions'
import { PropsUpdatedList } from 'src/components/pages/MainPage/components/CitySelect/UpdatedList'
import useAuthStore from 'src/store/authStore'
import { redirectCityRoutes } from 'src/utils/newUtils/redirectCityRoutes'

const ChangeCityPopupCityList: FC<PropsUpdatedList> = ({
  setShowCitySelect,
  setCityInput,
  cityInput,
  changeCityFunc,
  me,
}) => {
  const router = useRouter()
  const { suggestions } = useCitySuggestions(cityInput)
  const { setCity } = useAuthStore(getStoreEvent)

  const cityClickHandler = (city: ICity) => {
    setCookie(authConfig.cityKeyName, city.citySlug)
    setCityInput('')
    if (me?.info.id) {
      changeCityFunc({
        variables: { id: me.info.id, data: { selected_city: city.id } },
      })
    }
    setCity(city)
    setShowCitySelect(false)
    redirectCityRoutes(city.citySlug, router)
  }

  return <CitiesList cities={suggestions} cityClickHandler={cityClickHandler} />
}

export default ChangeCityPopupCityList
