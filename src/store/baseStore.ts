import { LazyType, Nullable } from 'src/types/common'
import { ICart } from 'src/types/product'
import { ISalonActivity } from 'src/types/salon'
import { IServiceCategories } from 'src/types/services'
import { create } from 'zustand'

export interface IInitialBaseData {
  catalogs: LazyType[]
  brands: LazyType[]
  salons: LazyType[]
  masters: LazyType[]
  services: IServiceCategories[]
  activities: ISalonActivity[]
  products: LazyType[]
  cities: LazyType[]
  city: string
  cart: ICart | null
}

interface IUseBaseStore {
  data: Nullable<IInitialBaseData>
  setCatalogs: (catalogs: LazyType[]) => void
  setBrands: (brands: LazyType[]) => void
  setSalons: (salons: LazyType[]) => void
  setMasters: (masters: LazyType[]) => void
  setServices: (services: IServiceCategories[]) => void
  setSalonActivities: (activities: ISalonActivity[]) => void
  setProducts: (products: LazyType[]) => void
  setSities: (cities: LazyType[]) => void
  setCity: (city: string) => void
  setCart: (cart: ICart | null) => void
}

const initialData = {
  catalogs: null,
  brands: null,
  salons: null,
  masters: null,
  services: null,
  activities: null,
  products: null,
  cities: null,
  city: null,
  cart: null,
}

const useBaseStore = create<IUseBaseStore>((set, get) => ({
  data: initialData,
  setCatalogs: catalogs =>
    set(state => ({ data: { ...state.data, catalogs } })),
  setBrands: brands => set(state => ({ data: { ...state.data, brands } })),
  setSalons: salons => set(state => ({ data: { ...state.data, salons } })),
  setMasters: masters => set(state => ({ data: { ...state.data, masters } })),
  setServices: services =>
    set(state => ({ data: { ...state.data, services } })),
  setSalonActivities: activities =>
    set(state => ({ data: { ...state.data, activities } })),
  setProducts: products =>
    set(state => ({ data: { ...state.data, products } })),
  setSities: cities => set(state => ({ data: { ...state.data, cities } })),
  setCity: city => set(state => ({ data: { ...state.data, city } })),
  setCart: cart => set(state => ({ data: { ...state.data, cart } })),
}))
export default useBaseStore
