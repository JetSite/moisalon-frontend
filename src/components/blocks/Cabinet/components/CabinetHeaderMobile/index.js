import { useRouter } from 'next/router'
import MenuCards from './components/MenuCards'
import catalogOrDefault from '../../../../../utils/catalogOrDefault'
import { selectedGroupNamesMax } from '../../../../../utils/serviceCatalog'
import { Wrapper, Info, Logo, Text, Title, Subtitle } from './styles'

const salon = [
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

const rentSalonSeat = [
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

const brand = [
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

const CabinetHeaderMobile = ({ master, category, reviews, me }) => {
  const router = useRouter()
  let cards = []
  let id = category?.id
  let subtitle = ''

  const { catalog } = useBaseStore(getStoreData)

  const masterSpecializationsCatalog = catalogOrDefault(
    catalogs?.masterSpecializationsCatalog,
  )

  switch (router.pathname) {
    case '/masterCabinet':
      cards = [
        {
          title: 'Мои услуги',
          icon: '/cabinet-services-icon.svg',
          quantity: master?.master?.servicesMaster?.length || 0,
          anchor: '#services',
        },
        {
          title: 'Мои салоны',
          icon: '/cabinet-salons-icon.svg',
          quantity: me?.salons?.length || 0,
          anchor: '#salons',
        },
        {
          title: 'Мои бренды',
          icon: '/cabinet-brands-icon.svg',
          quantity: me?.userBrands?.length || 0,
          anchor: '#brands',
        },
        {
          title: 'Мои заказы',
          icon: '/cabinet-orders-icon.svg',
          quantity: me?.orders?.length || 0,
          anchor: '#orders',
        },
        {
          title: 'Сообще-ния',
          icon: '/cabinet-reviews-icon.svg',
          quantity: reviews?.reviewsForMaster?.length || 0,
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
      subtitle = category?.lessor ? 'Рабочие места' : 'Кабинет'
      break

    default:
      return cards
  }
  return (
    <Wrapper>
      <Info>
        <Logo url={category?.photo?.url || category?.logo?.url} />
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
