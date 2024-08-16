import { useRouter } from 'next/router'
import MenuCards from './components/MenuCards'
import catalogOrDefault from '../../../../../utils/catalogOrDefault'
import { selectedGroupNamesMax } from '../../../../../utils/serviceCatalog'
import { Wrapper, Info, Logo, Text, Title, Subtitle } from './styles'
import { ITab } from 'src/components/pages/Salon/CreateSalon/config'
import { FC } from 'react'
import { ISalonPage } from 'src/types/salon'
import { IMaster } from 'src/types/masters'
import { IReview } from 'src/types/reviews'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { PHOTO_URL } from 'src/api/variables'

export interface IMobileHeaderTab {
  title: string
  icon?: string
  anchor?: string
  href?: string
  quantity?: number
}

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

interface Props {
  category?: ISalonPage
  master?: IMaster
  reviews?: IReview[]
}

const CabinetHeaderMobile: FC<Props> = ({ master, category, reviews }) => {
  const { user } = useAuthStore(getStoreData)
  const router = useRouter()
  let cards: IMobileHeaderTab[] = []
  let id = category?.id
  let subtitle = ''

  const masterSpecializationsCatalog = { groups: [] }

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
      subtitle = selectedGroupNamesMax(
        category?.specializations ? category?.specializations[0] : [],
        masterSpecializationsCatalog,
        ', ',
        1,
      )
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
      subtitle = category?.rent ? 'Рабочие места' : 'Кабинет'
      break

    default:
      return cards
  }

  return (
    <Wrapper>
      <Info>
        <Logo url={PHOTO_URL + category?.logo?.url} />
        <Text>
          <Title>{category?.name}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </Text>
      </Info>
      <MenuCards cards={cards} itemId={id} />
    </Wrapper>
  )
}

export default CabinetHeaderMobile
