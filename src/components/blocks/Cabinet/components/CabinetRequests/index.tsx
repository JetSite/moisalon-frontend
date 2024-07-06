import { FC, useEffect, useState } from 'react'
import RequestsList from './components/RequestsList'
import { ShowDeletedButton, Wrapper } from './styles'
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

interface Props {
  rentalRequests: IRentalRequest[]
  deletedRentalRequests: IRentalRequest[]
  meID: IID
}

const CabinetRequests: FC<Props> = ({
  rentalRequests,
  deletedRentalRequests,
  meID,
}) => {
  const [showDeleted, setShowDeleted] = useState<boolean>(false)
  const [requests, setRequests] = useState<IRentalRequest[]>(rentalRequests)
  const [requestsDeleted, setRequestsDeleted] = useState<IRentalRequest[]>(
    deletedRentalRequests,
  )
  const [refetch, { loading, data }] = useLazyQuery(RENTAL_REQUESTS_FOR_USER)
  const [refetchDeleted, { loading: loadingDelete, data: dataDeleted }] =
    useLazyQuery(DELETED_RENTAL_REQUESTS_FOR_USER)

  useEffect(() => {
    if (data) {
      setRequests(flattenStrapiResponse(data.rentalRequests))
    }
    if (dataDeleted) {
      setRequestsDeleted(flattenStrapiResponse(dataDeleted.rentalRequests))
    }
  }, [data, dataDeleted])

  return (
    <Wrapper>
      <Title>{showDeleted ? 'Удалённые заявки' : 'Мои заявки'}</Title>
      <ShowDeletedButton
        active={showDeleted}
        onClick={() => {
          setShowDeleted(!showDeleted)
          setRequests(showDeleted ? rentalRequests : deletedRentalRequests)
        }}
      >
        {showDeleted ? 'Назад' : 'Удалённые заявки'}
      </ShowDeletedButton>
      {loading || loadingDelete ? (
        <RequestsListSkeleton />
      ) : showDeleted ? (
        <RequestsList
          refetch={refetch}
          refetchDeleted={refetchDeleted}
          showDeleted={showDeleted}
          rentalRequests={requestsDeleted}
        />
      ) : (
        <RequestsList
          refetch={refetch}
          refetchDeleted={refetchDeleted}
          showDeleted={showDeleted}
          rentalRequests={requests}
        />
      )}
    </Wrapper>
  )
}

export default CabinetRequests
