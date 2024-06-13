import { IID } from 'src/types/common'
import { ISalon } from 'src/types/salon'

export interface ITab {
  id: string
  href?: string
  back?: boolean
  link?: string
  value?: string
  quantity?: string
  anchor: string
}

type IGetTabs = (salon: ISalon) => ITab[]

const tabs = [
  { id: '1', value: 'Информация о салоне', anchor: 'about' },
  { id: '2', value: 'Вид деятельности', anchor: 'vid' },
  { id: '3', value: 'Сервис для посетителей', anchor: 'services' },
  { id: '4', value: 'График работы', anchor: 'schedule' },
  { id: '5', value: 'Маршрут и администратор', anchor: 'administartor' },
  { id: '6', value: 'Дополнительная информация', anchor: 'socials' },
]

export const getTabs: IGetTabs = salon => {
  if (salon?.rent) {
    const salonRent = {
      id: '7',
      value: 'Рабочие места',
      anchor: 'cabinet',
      href: '/rentSalonSeat',
      link: salon.id.toString(),
    }
    return tabs.concat([salonRent])
  }
  return tabs
}
