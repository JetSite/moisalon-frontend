import { useRouter } from 'next/router'
import { cyrToTranslit } from '../../../../utils/translit'
import {
  CardsWrapper,
  Card,
  CardTitle,
  CardBottom,
  Icon,
  CardQuantity,
} from '../styles'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const MenuCards = ({ tabs, setActiveTab, setToggle }) => {
  const dev = process.env.NEXT_PUBLIC_ENV !== 'production'
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)

  const handleLogout = async () => {
    const resData = await fetch(
      dev
        ? 'https://stage-passport.moi.salon/api/logout'
        : 'https://passport.moi.salon/api/logout',
      {
        credentials: 'include',
        'Access-Control-Allow-Credentials': true,
      },
    )

    if (resData.status === 200) {
      router.push(`/${cyrToTranslit(city)}`)
    }
  }

  return (
    <CardsWrapper>
      {tabs?.map(tab => (
        <Card
          key={tab.value}
          onClick={() => {
            setActiveTab(tab.value)
            setToggle(false)
          }}
        >
          <CardTitle>{tab.title}</CardTitle>
          <CardBottom quantity={tab.quantity}>
            <Icon src={tab.icon} />
            {tab.quantity ? <CardQuantity>{tab.quantity}</CardQuantity> : null}
          </CardBottom>
        </Card>
      ))}
      <Card
        onClick={() => {
          handleLogout()
        }}
      >
        <CardTitle>Выход</CardTitle>
      </Card>
    </CardsWrapper>
  )
}

export default MenuCards
