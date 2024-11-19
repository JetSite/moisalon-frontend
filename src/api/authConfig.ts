export const baseUrl = 'https://moisalon-backend.jetsite.ru/graphql'

export const defaultValues = { city: { slug: 'moskva' } }

export const defaultcCitiesList = [
  'Москва',
  'Санкт-Петербург',
  'Екатеринбург',
  'Новосибирск',
  'Нижний Новгород',
  'Казань',
  'Самара',
  'Ростов-на-Дону',
  'Челябинск',
  'Саратов',
  'Хабаровск',
  'Волгоград',
]

export const authConfig = {
  tokenKeyName: 'accessToken',
  notAuthLink: '/login',
  cityKeyName: 'city',
  meKeyName: 'me',
}

export const settingsConfig = {
  salonSort: 'salonSort',
  rentSort: 'rentSort',
  masterSort: 'masterSort',
}
