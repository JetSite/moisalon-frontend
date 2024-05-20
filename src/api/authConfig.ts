export const baseUrl = 'https://moisalon-backend.jetsite.ru/graphql'

export const defaultValues = { citySlug: 'moskva' }

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
}

export const settingsConfig = {
  salonSort: 'salonSort',
  rentSort: 'rentSort',
  masterSort: 'masterSort',
}
