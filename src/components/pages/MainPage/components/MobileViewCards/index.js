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
import { useContext } from 'react'
import { CityContext, MeContext } from '../../../../../searchContext'
import { cyrToTranslit } from '../../../../../utils/translit'

const MobileViewCards = ({
  totalSalons,
  totalBrands,
  totalMasters,
  totalSales,
}) => {
  const router = useRouter()
  const [city] = useContext(CityContext)
  const [me] = useContext(MeContext)
  const b2bClient = !!me?.master?.id || !!me?.salons?.length

  const cards = [
    {
      title: 'Объявления',
      iconComponent: <CardIconAdvices />,
      quantity: totalSales || 0,
      link: `/${cyrToTranslit(city)}/sales`,
      target: '_self',
    },
    {
      title: 'Магазин',
      iconComponent: <CardIconShop />,
      quantity: 535,
      link: `/${cyrToTranslit(city)}/beautyFreeShop`,
      target: '_self',
    },
    {
      title: 'Аренда',
      iconComponent: <CardIconBusiness />,
      quantity: totalSalons || 0,
      link: `/${cyrToTranslit(city)}/rent`,
      target: '_self',
    },
    {
      title: 'Мастер',
      iconComponent: <CardIconMaster />,
      quantity: totalMasters || 0,
      link: `/${cyrToTranslit(city)}/master`,
      target: '_self',
    },
    {
      title: 'Салон',
      iconComponent: <CardIconSalon />,
      quantity: totalSalons || 0,
      link: `/${cyrToTranslit(city)}/salon`,
      target: '_self',
    },
    {
      title: 'Бренд',
      iconComponent: <CardIconBrand />,
      quantity: totalBrands || 0,
      link: `/${cyrToTranslit(city)}/brand`,
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
