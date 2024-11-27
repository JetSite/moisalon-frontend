import splitString from 'src/utils/newUtils/common/splitString'

export const searchablePathnames = [
  '/[city]/master',
  '/[city]/salon',
  '/[city]/brand',
  '/[city]/beautyFreeShop',
  '/[city]/rent',
]

export const tagsSwitch = (url: string) => {
  const splitUrl = splitString(url, '/')
  switch (splitUrl[1]) {
    case 'master':
      return ['Колорист', 'Бровист', 'Макияж', 'Пилинг', 'Татуаж']
    case 'salon':
      return ['Хаммам', 'Солярий', 'Окрашивание', 'Тату', 'Массаж']
    case 'brand':
      return ['ESTEL', 'Волосы', 'Бальзам', 'Краска', 'Лак']
    case 'beautyFreeShop':
      return ['Лечение', 'Шампунь', 'Краска', 'Ногти', 'Кожа']
    default:
      return ['Стрижка', 'Маникюр', 'Колорист', 'Массаж', 'Бровист']
  }
}
