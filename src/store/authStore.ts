import { deleteCookie, setCookie } from 'cookies-next'
import { NextRouter } from 'next/router'
import { authConfig, defaultValues } from 'src/api/authConfig'
import { ICity } from 'src/types'
import { Nullable } from 'src/types/common'
import { IMe, IUser } from 'src/types/me'
import { cyrToTranslit } from 'src/utils/translit'
import { create } from 'zustand'
import useBaseStore from './baseStore'

export interface IMasterCabinetTabs {
  requests?: number | null
  [K: string]: number | null | undefined
}

export interface IInitialAuthData {
  me: IMe | null
  user: IUser | null
  city: ICity
  loading: boolean
  masterCabinetTabs: IMasterCabinetTabs | null
}

interface IUseAuthStore {
  data: IInitialAuthData
  setMe: (me: IMe | null) => void
  setUser: (user: IUser | null) => void
  setCity: (city: ICity | null) => void
  setLoading: (bool: boolean) => void
  logout: (router: NextRouter) => void
  updateMasterCabinetTabs: (
    key: keyof IMasterCabinetTabs,
    value: number | null,
  ) => void
}

const initialData = {
  me: null,
  user: null,
  city: { slug: defaultValues.citySlug },
  loading: true,
  masterCabinetTabs: null,
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
  updateMasterCabinetTabs: (key, value) =>
    set(state => ({
      data: {
        ...state.data,
        masterCabinetTabs: state.data.masterCabinetTabs
          ? { ...state.data.masterCabinetTabs, [key]: value }
          : { [key]: value },
      },
    })),
  logout: router => {
    set(state => {
      const { setCart } = useBaseStore.getState()
      setCart(null)
      deleteCookie(authConfig.tokenKeyName)
      localStorage.removeItem(authConfig.tokenKeyName)
      return {
        data: {
          ...state.data,
          me: null,
          user: null,
        },
      }
    })
    router.push(`/${defaultValues.citySlug}`)
  },
}))
export default useAuthStore
