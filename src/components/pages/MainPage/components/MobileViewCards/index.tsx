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
import { FC, useContext } from 'react'
import { CityContext, MeContext } from '../../../../../searchContext'
import { cyrToTranslit } from '../../../../../utils/translit'
import { ICity } from 'src/types'

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
  const [city] = useContext(CityContext)

  const cards = [
    {
      title: 'Объявления',
      iconComponent: <CardIconAdvices />,
      quantity: 0,
      link: `/${cyrToTranslit(city || cityData?.[0].cityName)}/sales`,
      target: '_self',
    },
    {
      title: 'Магазин',
      iconComponent: <CardIconShop />,
      quantity: 535,
      link: `/${cyrToTranslit(city || cityData?.[0].cityName)}/beautyFreeShop`,
      target: '_self',
    },
    {
      title: 'Аренда',
      iconComponent: <CardIconBusiness />,
      quantity: totalSalons || 0,
      link: `/${cyrToTranslit(city || cityData?.[0].cityName)}/rent`,
      target: '_self',
    },
    {
      title: 'Мастер',
      iconComponent: <CardIconMaster />,
      quantity: totalMasters || 0,
      link: `/${cyrToTranslit(city || cityData?.[0].cityName)}/master`,
      target: '_self',
    },
    {
      title: 'Салон',
      iconComponent: <CardIconSalon />,
      quantity: totalSalons || 0,
      link: `/${cyrToTranslit(city || cityData?.[0].cityName)}/salon`,
      target: '_self',
    },
    {
      title: 'Бренд',
      iconComponent: <CardIconBrand />,
      quantity: totalBrands || 0,
      link: `/${cyrToTranslit(city || cityData?.[0].cityName)}/brand`,
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
