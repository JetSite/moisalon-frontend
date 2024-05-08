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
import { getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { Dispatch, FC, SetStateAction } from 'react'
import { IMasterCabinetTab } from 'src/components/pages/Master/MasterCabinet'

interface Props {
  tabs: IMasterCabinetTab[]
  setActiveTab: Dispatch<SetStateAction<string>>
  setToggle: Dispatch<SetStateAction<boolean>>
}

const MenuCards: FC<Props> = ({ tabs, setActiveTab, setToggle }) => {
  const router = useRouter()
  const { logout } = useAuthStore(getStoreEvent)

  return (
    <CardsWrapper>
      {tabs?.map(tab => (
        <Card
          disable={tab.disable}
          key={tab.value}
          onClick={() => {
            if (!tab.disable) {
              setActiveTab(tab.value)
              setToggle(false)
            }
          }}
        >
          <CardTitle>{tab.title}</CardTitle>
          <CardBottom quantity={!!tab.quantity}>
            <Icon src={tab.icon} />
            {tab.quantity ? <CardQuantity>{tab.quantity}</CardQuantity> : null}
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
