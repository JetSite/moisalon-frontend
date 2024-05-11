import { getCookie } from 'cookies-next'
import { authConfig } from 'src/api/authConfig'
import { ICity } from 'src/types'

export type IGetCityFoo = () => ICity

export const getCity = () => {
  const cityCookie = JSON.stringify(getCookie(authConfig.cityKeyName))
  const cityStorage = JSON.stringify(
    localStorage.getItem(authConfig.cityKeyName),
  )
}
