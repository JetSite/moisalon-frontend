import useAuthStore from 'src/store/authStore'
import { getStoreEvent } from 'src/store/utils'
import { useShallow } from 'zustand/react/shallow'
import { getCookie, setCookie } from 'cookies-next'
import { authConfig, defaultValues } from '../authConfig'
import { IPrepareUser } from './getPrepareUser'
import { ICity } from 'src/types'
import { useMutation } from '@apollo/client'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { CHANGE_ME } from '../graphql/me/mutations/changeMe'

interface IUseCollectAuthProps {
  prepareUser: IPrepareUser
  pageCity: ICity | null
}

type IUseCollectAuth = (props: IUseCollectAuthProps) => void

export const useCollectAuth: IUseCollectAuth = ({ prepareUser, pageCity }) => {
  const cityCookie = getCookie(authConfig.cityKeyName)
  const { setMe, setCity, setUser } = useAuthStore(useShallow(getStoreEvent))

  const [changeCityFunc] = useMutation(CHANGE_ME, {
    onCompleted: res => {
      const newCity: ICity = flattenStrapiResponse(
        res.updateUsersPermissionsUser,
      ).selected_city
      setCity(newCity)
    },
    onError: () => {
      new Error('Error in collect Auth Store, change select city')
    },
  })

  const { selectedCity, ownersID, ...user } = prepareUser

  setUser(user)
  setMe({ info: user.info, owner: ownersID })
  setCity(selectedCity)

  const city = selectedCity || pageCity || user.info.city || defaultValues.city

  if (!cityCookie) {
    setCookie(authConfig.cityKeyName, city.slug)
  }

  if (!selectedCity) {
    changeCityFunc({
      variables: {
        id: user.info.id,
        data: { selected_city: city.id || 1 },
      },
    })
  }
}
