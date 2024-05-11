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

interface Props {
  totalSalons: number
  totalBrands: number
  totalMasters: number
  cityData?: ICity[]
}

const MobileViewCards: FC<Props> = ({
  totalSalons,
  totalBrands,
  totalMasters,
  cityData,
}) => {
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)

  const cards = [
    {
      title: 'Объявления',
      iconComponent: <CardIconAdvices />,
      quantity: 0,
      link: `/${city.citySlug || cityData?.[0].citySlug}/sales`,
      target: '_self',
    },
    {
      title: 'Магазин',
      iconComponent: <CardIconShop />,
      quantity: 535,
      link: `/${city.citySlug || cityData?.[0].citySlug}/beautyFreeShop`,
      target: '_self',
    },
    {
      title: 'Аренда',
      iconComponent: <CardIconBusiness />,
      quantity: totalSalons || 0,
      link: `/${city.citySlug || cityData?.[0].citySlug}/rent`,
      target: '_self',
    },
    {
      title: 'Мастер',
      iconComponent: <CardIconMaster />,
      quantity: totalMasters || 0,
      link: `/${city.citySlug || cityData?.[0].citySlug}/master`,
      target: '_self',
    },
    {
      title: 'Салон',
      iconComponent: <CardIconSalon />,
      quantity: totalSalons || 0,
      link: `/${city.citySlug || cityData?.[0].citySlug}/salon`,
      target: '_self',
    },
    {
      title: 'Бренд',
      iconComponent: <CardIconBrand />,
      quantity: totalBrands || 0,
      link: `/${city.citySlug || cityData?.[0].citySlug}/brand`,
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
