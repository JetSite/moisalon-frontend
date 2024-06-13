import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  Wrapper,
  CardWrap,
  Card,
  CardTitle,
  CardIconMaster,
  CardIconSalon,
  CardIconBrand,
  CardIconBusiness,
  CardIconShop,
  CardQuantity,
  CardIconAdvices,
} from './styles'
import { FC } from 'react'
import { cyrToTranslit } from '../../../../../utils/translit'
import { ICity } from 'src/types'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { ITotalCount } from 'src/pages/[city]/salon'

interface Props {
  totalCount: ITotalCount
}

const MobileViewCards: FC<Props> = ({ totalCount }) => {
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)

  const cards = [
    {
      title: 'Объявления',
      iconComponent: <CardIconAdvices />,
      quantity: 0,
      link: `/${city.slug}/sales`,
      target: '_self',
    },
    {
      title: 'Магазин',
      iconComponent: <CardIconShop />,
      quantity: 535,
      link: `/${city.slug}/beautyFreeShop`,
      target: '_self',
    },
    {
      title: 'Аренда',
      iconComponent: <CardIconBusiness />,
      quantity: totalCount.salons || 0,
      link: `/${city.slug}/rent`,
      target: '_self',
    },
    {
      title: 'Мастер',
      iconComponent: <CardIconMaster />,
      quantity: totalCount.masters || 0,
      link: `/${city.slug}/master`,
      target: '_self',
    },
    {
      title: 'Салон',
      iconComponent: <CardIconSalon />,
      quantity: totalCount.salons || 0,
      link: `/${city.slug}/salon`,
      target: '_self',
    },
    {
      title: 'Бренд',
      iconComponent: <CardIconBrand />,
      quantity: totalCount.brands || 0,
      link: `/${city.slug}/brand`,
      target: '_self',
    },
    // {
    //   title: "Советы",
    //   iconComponent: <CardIconAdvices />,
    //   quantity: 35,
    //   link: "/advices",
    //   target: "_self",
    // },
  ]

  return (
    <Wrapper>
      {cards.map((card, i) => (
        <CardWrap key={i}>
          <Link href={card.link} target={card.target}>
            <Card active={router.pathname == card.link}>
              <CardTitle>{card.title}</CardTitle>
              {card.iconComponent}
              <CardQuantity>{card.quantity}</CardQuantity>
            </Card>
          </Link>
        </CardWrap>
      ))}
    </Wrapper>
  )
}

export default MobileViewCards
