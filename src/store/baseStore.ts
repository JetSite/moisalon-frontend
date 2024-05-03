import { LazyType, Nullable } from 'src/types/common'
import { create } from 'zustand'

export interface IInitialBaseData {
  catalogs: LazyType[]
  brands: LazyType[]
  salons: LazyType[]
  masters: LazyType[]
  services: LazyType[]
  products: LazyType[]
  cities: LazyType[]
  city: string
}

interface IUseBaseStore {
  data: Nullable<IInitialBaseData>
  setCatalogs: (catalogs: LazyType[]) => void
  setBrands: (brands: LazyType[]) => void
  setSalons: (salons: LazyType[]) => void
  setMasters: (masters: LazyType[]) => void
  setServices: (services: LazyType[]) => void
  setProducts: (products: LazyType[]) => void
  setSities: (cities: LazyType[]) => void
  setCity: (city: string) => void
}

const initialData = {
  catalogs: null,
  brands: null,
  salons: null,
  masters: null,
  services: null,
  products: null,
  cities: null,
  city: null,
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
  setProducts: products =>
    set(state => ({ data: { ...state.data, products } })),
  setSities: cities => set(state => ({ data: { ...state.data, cities } })),
  setCity: city => set(state => ({ data: { ...state.data, city } })),
}))
export default useBaseStore
