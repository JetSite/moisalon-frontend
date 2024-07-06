import { useLazyQuery, useQuery } from '@apollo/client'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { getCookie } from 'cookies-next'
import { OptionsType } from 'cookies-next/lib/types'
import { authConfig } from 'src/api/authConfig'
import { FC, useEffect } from 'react'
import CreatePageSkeleton from 'src/components/ui/ContentSkeleton/CreatePageSkeleton'
import Cabinet from 'src/components/blocks/Cabinet'
import MasterCabinet from 'src/components/pages/Master/MasterCabinet'
import { GetServerSideProps, NextPage } from 'next'
import { initializeApollo } from 'src/api/apollo-client'
import { RENTAL_REQUESTS_FOR_USER } from 'src/api/graphql/rentalRequest/queries/getRequestsForUser'
import { ME } from 'src/api/graphql/me/queries/getMe'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { Nullable } from 'src/types/common'
import { IRentalRequest } from 'src/types/rentalRequest'
import { DELETED_RENTAL_REQUESTS_FOR_USER } from 'src/api/graphql/rentalRequest/queries/getDeletedRequestsForUser'

interface Props {
  accessToken?: string
  rentalRequests: IRentalRequest[]
  deletedRentalRequests: IRentalRequest[]
}

const CabinetPage: NextPage<Props> = ({
  accessToken,
  rentalRequests,
  deletedRentalRequests,
}) => {
  const { user, loading } = useAuthStore(getStoreData)

  if (loading || !user) return <CreatePageSkeleton />

  return !user.info?.username ||
    !user.info?.city?.name ||
    !user.info?.phone ||
    !user.info?.email ? (
    <Cabinet />
  ) : (
    <MasterCabinet
      user={user}
      rentalRequests={rentalRequests}
      deletedRentalRequests={deletedRentalRequests}
    />
  )
}

export const getServerSideProps: GetServerSideProps<Nullable<Props>> = async (
  context: OptionsType,
) => {
  const accessToken = getCookie(authConfig.tokenKeyName, context)
  const apolloClient = initializeApollo({ accessToken })

  const meData = await apolloClient.query({
    query: ME,
  })
  const id = meData.data?.me.id || null

  if (!accessToken || !id) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  } else {
    const data = await Promise.all([
      apolloClient.query({
        query: RENTAL_REQUESTS_FOR_USER,
        variables: { id },
      }),
      apolloClient.query({
        query: DELETED_RENTAL_REQUESTS_FOR_USER,
        variables: { id },
      }),
    ])

    console.log(data)

    const rentalRequests = flattenStrapiResponse(data[0].data?.rentalRequests)
    const deletedRentalRequests = flattenStrapiResponse(
      data[1].data?.rentalRequests,
    )

    return { props: { accessToken, rentalRequests, deletedRentalRequests } }
  }
}

export default CabinetPage
