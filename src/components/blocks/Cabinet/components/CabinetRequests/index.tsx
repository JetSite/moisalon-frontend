import { FC, useState } from 'react'
import * as Styled from './styles'
import { Title } from '../CabinetOrders/styles'
import { IID } from 'src/types/common'
import { ICabinetRequestsData } from 'src/pages/masterCabinet'
import { MyRequests } from './components/MyRequests'
import { SalonRequests } from './components/SalonsRequests'

export type ITabsVariant = 'in' | 'out'

interface Props {
  requestsData: ICabinetRequestsData
  meID: IID
}

const CabinetRequests: FC<Props> = ({ requestsData }) => {
  const [activeTab, setActiveTab] = useState<ITabsVariant>('in')
  const {
    rentalRequests,
    deletedRentalRequests,
    rentalRequestsSalons,
    deletedRentalRequestsSalons,
  } = requestsData
  const [showDeleted, setShowDeleted] = useState<boolean>(false)

  return (
    <Styled.Wrapper>
      <Title>{showDeleted ? 'Удалённые заявки' : 'Мои заявки'}</Title>
      <Styled.ShowDeletedButton
        active={showDeleted}
        onClick={() => {
          setShowDeleted(!showDeleted)
        }}
      >
        {showDeleted ? 'Назад' : 'Удалённые заявки'}
      </Styled.ShowDeletedButton>
      <Styled.TabWrapper>
        <Styled.Tab>
          <Styled.TabButton
            onClick={() => setActiveTab('in')}
            active={activeTab === 'in'}
          >
            Входящие
          </Styled.TabButton>
        </Styled.Tab>
        <Styled.Tab>
          <Styled.TabButton
            onClick={() => setActiveTab('out')}
            active={activeTab === 'out'}
          >
            Исходящие
          </Styled.TabButton>
        </Styled.Tab>
      </Styled.TabWrapper>
      {activeTab === 'in' ? (
        <SalonRequests
          setShowDeleted={setShowDeleted}
          salonDeletedRequests={deletedRentalRequestsSalons}
          salonRequests={rentalRequestsSalons}
          showDeleted={showDeleted}
          activeTab={activeTab}
        />
      ) : (
        <MyRequests
          setShowDeleted={setShowDeleted}
          myDeletedRequests={deletedRentalRequests}
          myRequests={rentalRequests}
          showDeleted={showDeleted}
          activeTab={activeTab}
        />
      )}
    </Styled.Wrapper>
  )
}

export default CabinetRequests
