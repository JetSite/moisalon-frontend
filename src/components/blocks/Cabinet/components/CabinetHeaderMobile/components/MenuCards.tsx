import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import scrollIntoView from 'scroll-into-view'
import { currentUserSalonsAndMasterQuery } from '../../../../../../_graphql-legacy/master/currentUserSalonsAndMasterQuery'
import { cyrToTranslit } from '../../../../../../utils/translit'
import {
  CardsWrapper,
  Card,
  CardTitle,
  CardBottom,
  Icon,
  CardQuantity,
} from '../styles'
import { getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { FC } from 'react'
import { IMobileHeaderTab } from '..'

interface Props {
  cards: IMobileHeaderTab[]
  itemId: string | undefined
}

const MenuCards: FC<Props> = ({ cards, itemId }) => {
  const router = useRouter()
  const { setUser, logout } = useAuthStore(getStoreEvent)

  const handleClick = (item: IMobileHeaderTab) => {
    if (item?.anchor) {
      const element = document.getElementById(item?.anchor?.replace('#', ''))
      if (element) {
        scrollIntoView(element, {
          time: 500,
          align: {
            top: 0,
            topOffset: 100,
          },
        })
      }
    }
  }

  return (
    <CardsWrapper>
      {cards?.map((card, id) => (
        <Card
          shallow
          href={{
            pathname: card.href,
            query: { id: itemId },
          }}
          key={id}
          onClick={() => {
            handleClick(card)
          }}
        >
          <CardTitle>{card.title}</CardTitle>
          <CardBottom quantity={card.quantity}>
            <Icon src={card.icon} />
            {card?.quantity ? (
              <CardQuantity>{card.quantity}</CardQuantity>
            ) : null}
          </CardBottom>
        </Card>
      ))}
      <Card
        shallow
        href={'/login'}
        onClick={() => {
          logout(router)
        }}
      >
        <CardTitle>Выход</CardTitle>
      </Card>
    </CardsWrapper>
  )
}

export default MenuCards
