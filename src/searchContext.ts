import { createContext } from 'react'
import { IMe } from './types/me'

export const SortProperty = {
  PRICING: 'PRICING',
}

export const SortOrder = {
  ASCENDING: 'ASCENDING',
  DESCENDING: 'DESCENDING',
}

export const RentalPricingType = {
  HOUR: 'HOUR',
  DAY: 'DAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH',
  YEAR: 'YEAR',
}

export const EmptySearchQuery = {
  city: 'Москва',
  activities: [],
  salonActivities: [],
  services: [],
  roomServices: [],
  salonServices: [],
  seatServices: [],
  workplaceServices: [],
  paymentMethods: {
    cash: false,
    bankingCard: false,
    wireTransfer: false,
    appleOrGooglePay: false,
  },
  sortProperty: SortProperty.PRICING,
  sortOrder: null,
}

export type IContext = [{ [K: string]: any }, () => void]

type IMeContext = [IMe, () => void]
type ICityContext = [string, (city: string) => void]

export const MasterSearchQuery = {}

export const SearchMasterQueryContext = createContext([
  MasterSearchQuery,
  () => {},
])

export const BrandSearchQuery = {}

export const SearchBrandQueryContext = createContext([
  BrandSearchQuery,
  () => {},
])

export const SearchQueryContext = createContext([EmptySearchQuery, () => {}])

export const MainSearchQuery: { [K: string]: string } = {}

interface IQuery {
  [K: string]: string | undefined
}

type ISearchMainQueryContext = [
  { [K: string]: string },
  (query: IQuery) => void,
]

export const SearchMainQueryContext = createContext<ISearchMainQueryContext>([
  MainSearchQuery,
  () => {},
])

export const CategoryPageSearchQuery = {}

export const CategoryPageQueryContext = createContext([
  CategoryPageSearchQuery,
  () => {},
])

export const MeContext = createContext<IMeContext>([{}, () => {}])

export const CartContext = createContext([{}, () => {}])

export const CatalogsContext = createContext<IContext>([{}, () => {}])

export const ProductsContext = createContext([{}, () => {}])

export const ProductsGetStatusContext = createContext([{}, () => {}])

export const CityContext = createContext<ICityContext>(['', () => {}])
