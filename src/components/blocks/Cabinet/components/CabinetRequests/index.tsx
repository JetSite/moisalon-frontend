import { FC, useEffect, useState } from 'react'
import RequestsList from './components/RequestsList'
import {
  ShowDeletedButton,
  Wrapper,
  TabWrapper,
  TabButton,
  Tab,
} from './styles'
import { IUser } from 'src/types/me'
import { IRentalRequest } from 'src/types/rentalRequest'
import { Title } from '../CabinetOrders/styles'
import { useLazyQuery, useQuery } from '@apollo/client'
import { RENTAL_REQUESTS_FOR_USER } from 'src/api/graphql/rentalRequest/queries/getRequestsForUser'
import { DELETED_RENTAL_REQUESTS_FOR_USER } from 'src/api/graphql/rentalRequest/queries/getDeletedRequestsForUser'
import { IID } from 'src/types/common'
import ContentCatalogSkeleton from 'src/components/ui/ContentSkeleton/ContentCatalogSkeleton'
import ContentSkeleton from 'src/components/ui/ContentSkeleton/ContentSkeleton'
import MainSkeleton from 'src/components/ui/ContentSkeleton/MainSkeleton'
import { RequestsListSkeleton } from 'src/components/ui/Skeletons/RequestsListSkeleton'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ICabinetRequestsData } from 'src/pages/masterCabinet'
import styled from 'styled-components'
import { red } from 'src/styles/variables'
import { MyRequests } from './components/MyRequests'
import { SalonRequests } from './components/SalonsRequests'

export type ITabsVariant = 'in' | 'out'

interface Props {
  requestsData: ICabinetRequestsData
  meID: IID
}

const CabinetRequests: FC<Props> = ({ requestsData, meID }) => {
  const [activeTab, setActiveTab] = useState<ITabsVariant>('in')
  const {
    rentalRequests,
    deletedRentalRequests,
    rentslRequestsSalons,
    deletedRentalRequestsSalons,
  } = requestsData
  const [showDeleted, setShowDeleted] = useState<boolean>(false)

  return (
    <Wrapper>
      <Title>{showDeleted ? 'Удалённые заявки' : 'Мои заявки'}</Title>
      <ShowDeletedButton
        active={showDeleted}
        onClick={() => {
          setShowDeleted(!showDeleted)
        }}
      >
        {showDeleted ? 'Назад' : 'Удалённые заявки'}
      </ShowDeletedButton>
      <TabWrapper>
        <Tab>
          <TabButton
            onClick={() => setActiveTab('in')}
            active={activeTab === 'in'}
          >
            Входящие
          </TabButton>
        </Tab>
        <Tab>
          <TabButton
            onClick={() => setActiveTab('out')}
            active={activeTab === 'out'}
          >
            Исходящие
          </TabButton>
        </Tab>
      </TabWrapper>
      {activeTab === 'in' ? (
        <SalonRequests
          setShowDeleted={setShowDeleted}
          salonDeletedRequests={deletedRentalRequestsSalons}
          salonRequests={rentslRequestsSalons}
          showDeleted={showDeleted}
          activeTab={activeTab}
        />
      ) : (
        <MyRequests
          setShowDeleted={setShowDeleted}
          myDeletedRequests={deletedRentalRequests}
          myRequests={rentslRequestsSalons}
          showDeleted={showDeleted}
          activeTab={activeTab}
        />
      )}
    </Wrapper>
  )
}

export default CabinetRequests
