import { ICity } from 'src/types'
import { LazyType, Nullable } from 'src/types/common'
import { ICart } from 'src/types/product'
import { ISalonActivity } from 'src/types/salon'
import { IServiceCategories } from 'src/types/services'
import { create } from 'zustand'

export interface IInitialBaseData {
  catalogs: LazyType[] | null
  brands: LazyType[] | null
  salons: LazyType[] | null
  masters: LazyType[] | null
  services: IServiceCategories[] | []
  servicesM: IServiceCategories[] | []
  activities: ISalonActivity[] | []
  products: LazyType[] | null
  cities: ICity[]
  city: string | null
  cart: ICart | null
}

interface IUseBaseStore {
  data: IInitialBaseData
  setCatalogs: (catalogs: LazyType[]) => void
  setBrands: (brands: LazyType[]) => void
  setSalons: (salons: LazyType[]) => void
  setMasters: (masters: LazyType[]) => void
  setServices: (services: IServiceCategories[]) => void
  setServicesM: (services: IServiceCategories[]) => void
  setSalonActivities: (activities: ISalonActivity[]) => void
  setProducts: (products: LazyType[]) => void
  setCities: (cities: ICity[]) => void
  setCity: (city: string) => void
  setCart: (cart: ICart | null) => void
}

const initialData = {
  catalogs: null,
  brands: null,
  salons: null,
  masters: null,
  services: [],
  servicesM: [],
  activities: [],
  products: null,
  cities: [],
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
  setServicesM: servicesM =>
    set(state => ({ data: { ...state.data, servicesM } })),
  setSalonActivities: activities =>
    set(state => ({ data: { ...state.data, activities } })),
  setProducts: products =>
    set(state => ({ data: { ...state.data, products } })),
  setCities: cities => set(state => ({ data: { ...state.data, cities } })),
  setCity: city => set(state => ({ data: { ...state.data, city } })),
  setCart: cart => set(state => ({ data: { ...state.data, cart } })),
}))
export default useBaseStore
