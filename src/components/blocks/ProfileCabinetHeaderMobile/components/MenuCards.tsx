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
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { Dispatch, FC, SetStateAction } from 'react'
import { IMasterCabinetTab } from 'src/components/pages/MasterCabinet'
import { ISetState } from 'src/types/common'

interface Props {
  tabs: IMasterCabinetTab[]
  setActiveTab: ISetState<string>
  setToggle: ISetState<boolean>
}

const MenuCards: FC<Props> = ({ tabs }) => {
  const router = useRouter()
  const { logout } = useAuthStore(getStoreEvent)
  const { city } = useAuthStore(getStoreData)

  return (
    <CardsWrapper>
      {tabs?.map(tab =>
        tab.visible !== false ? (
          <li key={tab.value}>
            <Card
              shallow
              href={{ query: { tab: tab.value } }}
              disable={tab.disable}
              data-disable={tab.disable}
              onClick={e => {
                if (tab.disable) {
                  e.preventDefault()
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
          </li>
        ) : null,
      )}
      <Card
        shallow
        href={'/' + city.slug}
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
