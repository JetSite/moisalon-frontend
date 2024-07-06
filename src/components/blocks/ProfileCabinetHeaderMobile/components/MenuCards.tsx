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
import { ISetState } from 'src/types/common'

interface Props {
  tabs: IMasterCabinetTab[]
  setActiveTab: ISetState<string>
  setToggle: ISetState<boolean>
}

const MenuCards: FC<Props> = ({ tabs, setActiveTab, setToggle }) => {
  const router = useRouter()
  const { logout } = useAuthStore(getStoreEvent)
  console.log(tabs)

  return (
    <CardsWrapper>
      {tabs?.map(tab =>
        tab.visible !== false ? (
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
              {tab.quantity ? (
                <CardQuantity>{tab.quantity}</CardQuantity>
              ) : null}
            </CardBottom>
          </Card>
        ) : null,
      )}
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
