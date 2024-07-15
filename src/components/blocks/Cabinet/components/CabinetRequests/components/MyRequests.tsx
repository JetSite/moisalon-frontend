import { FC, useEffect, useState } from 'react'
import { IRentalRequest } from 'src/types/rentalRequest'
import { ITabsVariant } from '..'
import RequestsList from './RequestsList'
import { RequestsListSkeleton } from 'src/components/ui/Skeletons/RequestsListSkeleton'
import { useLazyQuery } from '@apollo/client'
import { RENTAL_REQUESTS_FOR_USER } from 'src/api/graphql/rentalRequest/queries/getRequestsForUser'
import { DELETED_RENTAL_REQUESTS_FOR_USER } from 'src/api/graphql/rentalRequest/queries/getDeletedRequestsForUser'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ISetState } from 'src/types/common'
import { request } from 'http'
import { RENTAL_REQUESTS_FOR_SALON } from 'src/api/graphql/rentalRequest/queries/getRequestsForSalon'
import { DELETED_RENTAL_REQUESTS_FOR_SALON } from 'src/api/graphql/rentalRequest/queries/getDeletedRequestsForSalon'

interface Props {
  myRequests: IRentalRequest[]
  myDeletedRequests: IRentalRequest[]
  activeTab: ITabsVariant
  setShowDeleted: ISetState<boolean>
  showDeleted: boolean
}

export const MyRequests: FC<Props> = ({
  showDeleted,
  myRequests,
  myDeletedRequests,
}) => {
  const [requests, setRequests] = useState<IRentalRequest[]>(myRequests)
  const [requestsDeleted, setRequestsDeleted] =
    useState<IRentalRequest[]>(myDeletedRequests)

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

  return loading || loadingDelete ? (
    <RequestsListSkeleton />
  ) : (
    <RequestsList
      myRequest
      refetch={refetch}
      refetchDeleted={refetchDeleted}
      showDeleted={showDeleted}
      rentalRequests={showDeleted ? requestsDeleted : requests}
    />
  )
}
