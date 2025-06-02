export const baseUrl = 'https://moisalon-backend.jetsite.ru/graphql'

export const defaultValues = { city: { slug: 'moskva', id: '1' } }

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
  cookieOptions: {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  },
}

export const settingsConfig = {
  salonSort: 'salonSort',
  rentSort: 'rentSort',
  masterSort: 'masterSort',
}
