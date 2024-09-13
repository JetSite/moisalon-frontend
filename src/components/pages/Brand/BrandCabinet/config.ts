import { IBrand } from 'src/types/brands'
import { ITab } from '../../Salon/CreateSalon/config'
import { IGetBrandTabs } from '../CreateBrand/config'

const tabs: ITab[] = [
  { id: '1', value: 'Наши продукты', anchor: 'products' },
  { id: '2', value: 'Отзывы клиентов', anchor: 'reviews' },
  { id: '3', value: 'Представители', anchor: 'person' },
  { id: '4', value: 'Наши профили', anchor: 'profiles' },
]

export const gtBrandCabinetTabs: IGetBrandTabs = brand => {
  const brandCabinet: ITab = {
    id: '5',
    value: 'Данные бренда',
    anchor: 'cabinet',
    href: '/createBrand',
    link: brand?.id,
    back: true,
  }

  return tabs.concat([brandCabinet])
}
