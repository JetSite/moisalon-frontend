import { IMe } from 'src/types/me'
import { create } from 'zustand'

export interface IInitialAuthData {
  me: IMe | null
  city: string
  cartItemTotal: number
}

interface IUseAuthStore {
  data: IInitialAuthData
  setMe: (me: IMe) => void
  setCity: (city: string) => void
}

const initialData = { me: null, city: 'Москва', cartItemTotal: 0 }

const useAuthStore = create<IUseAuthStore>((set, get) => ({
  data: initialData,
  setMe: me => set(state => ({ data: { ...state.data, me } })),
  setCity: city => set(state => ({ data: { ...state.data, city } })),
}))
export default useAuthStore
