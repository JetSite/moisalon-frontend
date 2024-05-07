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

const MenuCards = ({ cards, itemId }) => {
  const router = useRouter()
  const { setMe, logout } = useAuthStore(getStoreEvent)

  const handleClick = item => {
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

  const { refetch } = useQuery(currentUserSalonsAndMasterQuery, {
    skip: true,
    onCompleted: res => {
      setMe({
        info: res?.me?.info,
        master: res?.me?.master,
        locationByIp: res?.locationByIp,
        salons: res?.me?.salons,
        rentalRequests: res?.me?.rentalRequests,
      })
    },
  })

  return (
    <CardsWrapper>
      {cards?.map((card, id) => (
        <Card
          key={id}
          onClick={() => {
            handleClick(card)
            if (card.href) {
              router.push(
                {
                  pathname: card.href,
                  query: { id: itemId },
                },
                card.href,
              )
            }
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
