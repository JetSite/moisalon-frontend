const dev = process.env.NEXT_PUBLIC_ENV !== 'production'

export const PHOTO_URL = dev
  ? `https://moisalon-backend.jetsite.ru`
  : `https://moisalon-backend.jetsite.ru`
