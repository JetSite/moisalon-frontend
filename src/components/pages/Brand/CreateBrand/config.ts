import { IBrand } from 'src/types/brands'
import { ITab } from '../../Salon/CreateSalon/config'

const tabs: ITab[] = [
  { id: '1', value: 'Информация о бренде', anchor: 'about' },
  { id: '2', value: 'Дополнительная информация', anchor: 'socials' },
]

export type IGetBrandTabs = (brand: IBrand | null) => ITab[]

export const gtBrandTabs: IGetBrandTabs = brand => {
  if (!brand) return tabs

  const brandCabinet: ITab = {
    id: '3',
    value: 'Кабинет бренда',
    anchor: 'cabinet',
    href: '/brandCabinet',
    link: brand.id,
  }

  return tabs.concat([brandCabinet])
}
