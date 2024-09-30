import { FC, useEffect, useState } from 'react'
import { IRentalRequest } from 'src/types/rentalRequest'
import { ITabsVariant } from '..'
import RequestsList from './RequestsList'
import { RequestsListSkeleton } from 'src/components/ui/Skeletons/RequestsListSkeleton'
import { useLazyQuery } from '@apollo/client'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ISetState } from 'src/types/common'
import { RENTAL_REQUESTS_FOR_SALON } from 'src/api/graphql/rentalRequest/queries/getRequestsForSalon'
import { DELETED_RENTAL_REQUESTS_FOR_SALON } from 'src/api/graphql/rentalRequest/queries/getDeletedRequestsForSalon'

interface Props {
  salonRequests: IRentalRequest[]
  salonDeletedRequests: IRentalRequest[]
  activeTab: ITabsVariant
  setShowDeleted: ISetState<boolean>
  showDeleted: boolean
}

export const SalonRequests: FC<Props> = ({
  showDeleted,
  salonRequests,
  salonDeletedRequests,
}) => {
  const [requests, setRequests] = useState<IRentalRequest[]>(salonRequests)
  const [requestsDeleted, setRequestsDeleted] =
    useState<IRentalRequest[]>(salonDeletedRequests)

  const [refetch, { loading, data }] = useLazyQuery(RENTAL_REQUESTS_FOR_SALON)
  const [refetchDeleted, { loading: loadingDelete, data: dataDeleted }] =
    useLazyQuery(DELETED_RENTAL_REQUESTS_FOR_SALON)

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
      refetch={refetch}
      refetchDeleted={refetchDeleted}
      showDeleted={showDeleted}
      rentalRequests={showDeleted ? requestsDeleted : requests}
    />
  )
}
