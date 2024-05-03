import { deleteCookie } from 'cookies-next'
import { NextRouter } from 'next/router'
import { authConfig } from 'src/api/authConfig'
import { IMe } from 'src/types/me'
import { cyrToTranslit } from 'src/utils/translit'
import { create } from 'zustand'

export interface IInitialAuthData {
  me: IMe | null
  city: string
  cartItemTotal: number
  loading: boolean
}

interface IUseAuthStore {
  data: IInitialAuthData
  setMe: (me: IMe | null) => void
  setCity: (city: string) => void
  setLoading: (bool: boolean) => void
  logout: (router: NextRouter) => void
}

const initialData = {
  me: null,
  city: 'Москва',
  cartItemTotal: 0,
  loading: false,
}

const useAuthStore = create<IUseAuthStore>((set, get) => ({
  data: initialData,
  setMe: me => set(state => ({ data: { ...state.data, me } })),
  setCity: city => set(state => ({ data: { ...state.data, city } })),
  setLoading: bool =>
    set(state => ({ data: { ...state.data, loading: bool } })),
  logout: router =>
    set(state => {
      deleteCookie(authConfig.tokenKeyName)
      localStorage.removeItem(authConfig.tokenKeyName)
      router.push(`/${cyrToTranslit(state.data.city)}`)
      return { data: { ...state.data, me: null } }
    }),
}))
export default useAuthStore
