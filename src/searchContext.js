import { createContext } from "react";

export const SortProperty = {
  PRICING: "PRICING",
};

export const SortOrder = {
  ASCENDING: "ASCENDING",
  DESCENDING: "DESCENDING",
};

export const RentalPricingType = {
  HOUR: "HOUR",
  DAY: "DAY",
  WEEK: "WEEK",
  MONTH: "MONTH",
  YEAR: "YEAR",
};

export const EmptySearchQuery = {
  city: "Москва",
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
};

export const MasterSearchQuery = {};

export const SearchMasterQueryContext = createContext([
  MasterSearchQuery,
  () => {},
]);

export const BrandSearchQuery = {};

export const SearchBrandQueryContext = createContext([
  BrandSearchQuery,
  () => {},
]);

export const SearchQueryContext = createContext([EmptySearchQuery, () => {}]);

export const MainSearchQuery = {};

export const SearchMainQueryContext = createContext([
  MainSearchQuery,
  () => {},
]);

export const CategoryPageSearchQuery = {};

export const CategoryPageQueryContext = createContext([
  CategoryPageSearchQuery,
  () => {},
]);

export const MeContext = createContext([{}, () => {}]);

export const CartContext = createContext([{}, () => {}]);

export const CatalogsContext = createContext([{}, () => {}]);

export const ProductsContext = createContext([{}, () => {}]);

export const ProductsGetStatusContext = createContext([{}, () => {}]);

export const CityContext = createContext([{}, () => {}]);
