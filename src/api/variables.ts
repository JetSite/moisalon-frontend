const dev = process.env.NEXT_PUBLIC_ENV !== 'production'

export const dadataAdressUrl =
  'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'

export const dadataCountryUrl =
  ' https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/country'

export const dadataConfig = {
  TOKEN: '155848cb2dd480e7323c73928112e2a527ddf06f',
  SECRET: 'ef42d8b1e8bf8402f212e85e837eb5fb23e30f88',
}

export const PHOTO_URL = dev
  ? `https://moisalon-backend.jetsite.ru`
  : `https://moisalon-backend.jetsite.ru`

export const UPLOAD_PHOTO_OPTIONS = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1200,
  useWebWorker: true,
}

export const SEARCH_URL = `${PHOTO_URL}/api/fuzzy-search/search`
