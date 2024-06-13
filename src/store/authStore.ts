import { deleteCookie, setCookie } from 'cookies-next'
import { NextRouter } from 'next/router'
import { authConfig, defaultValues } from 'src/api/authConfig'
import { ICity } from 'src/types'
import { Nullable } from 'src/types/common'
import { IMe, IUser } from 'src/types/me'
import { cyrToTranslit } from 'src/utils/translit'
import { create } from 'zustand'

export interface IInitialAuthData {
  me: IMe | null
  user: IUser | null
  city: ICity
  cartItemTotal: number
  loading: boolean
}

interface IUseAuthStore {
  data: IInitialAuthData
  setMe: (me: IMe | null) => void
  setUser: (user: IUser | null) => void
  setCity: (city: ICity | null) => void
  setLoading: (bool: boolean) => void
  logout: (router: NextRouter) => void
}

const initialData = {
  me: null,
  user: null,
  city: { slug: defaultValues.citySlug },
  cartItemTotal: 1,
  loading: false,
}

const useAuthStore = create<IUseAuthStore>((set, get) => ({
  data: initialData,
  setMe: me => set(state => ({ data: { ...state.data, me } })),
  setUser: user => set(state => ({ data: { ...state.data, user } })),
  setCity: city =>
    set(state => ({
      data: {
        ...state.data,
        city: city || { slug: defaultValues.citySlug },
      },
    })),
  setLoading: bool =>
    set(state => ({ data: { ...state.data, loading: bool } })),
  logout: router =>
    set(state => {
      deleteCookie(authConfig.tokenKeyName)
      localStorage.removeItem(authConfig.tokenKeyName)
      router.push(`/${defaultValues.citySlug}`)
      return {
        data: {
          ...state.data,
          me: null,
        },
      }
    }),
}))
export default useAuthStore
