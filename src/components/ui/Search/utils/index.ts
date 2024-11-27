import splitString from 'src/utils/newUtils/common/splitString'

export const searchablePathnames = [
  '/[city]/master',
  '/[city]/salon',
  '/[city]/brand',
  '/[city]/beautyFreeShop',
  '/[city]/rent',
]

type ServiceType = 'master' | 'salon' | 'brand' | 'beautyFreeShop'

type TagsConfig = {
  [key in ServiceType]: string[]
}

const tagsConfig: TagsConfig = {
  master: ['Колорист', 'Бровист', 'Макияж', 'Пилинг', 'Татуаж'],
  salon: ['Хаммам', 'Солярий', 'Окрашивание', 'Тату', 'Массаж'],
  brand: ['ESTEL', 'Волосы', 'Бальзам', 'Краска', 'Лак'],
  beautyFreeShop: ['Лечение', 'Шампунь', 'Краска', 'Ногти', 'Кожа'],
}

const DEFAULT_TAGS = ['Стрижка', 'Маникюр', 'Колорист', 'Массаж', 'Бровист']

export const tagsSwitch = (url: string): string[] => {
  if (!url || typeof url !== 'string') {
    return DEFAULT_TAGS
  }
  const splitUrl = splitString(url, '/')
  const serviceType = splitUrl[1] as ServiceType
  return tagsConfig[serviceType] || DEFAULT_TAGS
}
