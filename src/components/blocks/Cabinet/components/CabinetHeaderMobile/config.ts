import { selectedGroupNamesMax } from 'src/utils/serviceCatalog'
import { IMobileHeaderTab } from '.'
import { ISalonPage } from 'src/types/salon'
import { IUser } from 'src/types/me'
import { NextRouter } from 'next/router'
import { IBrand } from 'src/types/brands'

const salon: IMobileHeaderTab[] = [
  {
    title: 'Рабочие места',
    href: '/rentSalonSeat',
  },
  {
    title: 'Данные салона',
    icon: '/arrow-back.svg',
    anchor: '#cabinet',
    href: '/createSalon',
  },
  {
    title: 'Назад в профиль',
    icon: '/arrow-back.svg',
    href: '/masterCabinet',
  },
]

const rentSalonSeat: IMobileHeaderTab[] = [
  {
    title: 'Назад в профиль',
    icon: '/arrow-back.svg',
    href: '/masterCabinet',
  },
  {
    title: 'Данные салона',
    icon: '/arrow-back.svg',
    anchor: '#cabinet',
    href: '/createSalon',
  },
]

const brand: IMobileHeaderTab[] = [
  {
    title: 'Данные бренда',
    icon: '/arrow-back.svg',
    anchor: '#cabinet',
    href: '/createBrand',
  },
  {
    title: 'Назад в профиль',
    icon: '/arrow-back.svg',
    href: '/masterCabinet',
  },
]

export type IGetCards = (props: Props) => {
  cards: IMobileHeaderTab[]
  subtitle: string
}

interface Props {
  user: IUser | null
  router: NextRouter
  category?: ISalonPage | IBrand
}

export const getCards: IGetCards = ({ user, router, category }) => {
  let cards: IMobileHeaderTab[] = []
  // const masterSpecializationsCatalog = { groups: [] }
  let subtitle = ''

  switch (router.pathname) {
    case '/masterCabinet':
      cards = [
        {
          title: 'Мои услуги',
          icon: '/cabinet-services-icon.svg',
          quantity: user?.owner.masters?.length || 0,
          anchor: '#services',
        },
        {
          title: 'Мои салоны',
          icon: '/cabinet-salons-icon.svg',
          quantity: user?.owner?.salons?.length || 0,
          anchor: '#salons',
        },
        {
          title: 'Мои бренды',
          icon: '/cabinet-brands-icon.svg',
          quantity: user?.owner?.brands?.length || 0,
          anchor: '#brands',
        },
        {
          title: 'Мои заказы',
          icon: '/cabinet-orders-icon.svg',
          quantity: user?.orders?.length || 0,
          anchor: '#orders',
        },
        {
          title: 'Сообще-ния',
          icon: '/cabinet-reviews-icon.svg',
          quantity: user?.reviews?.length || 0,
          anchor: '#reviews',
        },
        {
          title: 'Мои данные',
          icon: '/arrow-back.svg',
          anchor: '#cabinet',
          href: '/createMaster',
        },
      ]
      subtitle = 'Кабинет'
      // subtitle = selectedGroupNamesMax(
      //   category?.specializations ? category?.specializations[0] : [],
      //   masterSpecializationsCatalog,
      //   ', ',
      //   1,
      // )
      break
    case '/salonCabinet':
      cards = salon
      subtitle = 'Кабинет'
      break
    case '/brandCabinet':
      cards = brand
      subtitle = 'Кабинет'
      break
    case '/rentSalonSeat':
      cards = rentSalonSeat
      subtitle = (category as ISalonPage)?.rent ? 'Рабочие места' : 'Кабинет'
      break

    default:
      return { cards, subtitle }
  }

  return { cards, subtitle }
}
