import { ApolloQueryResult, useLazyQuery, useQuery } from '@apollo/client'
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
import { RENTAL_REQUESTS_FOR_SALON } from 'src/api/graphql/rentalRequest/queries/getRequestsForSalon'
import { USER } from 'src/api/graphql/me/queries/getUser'
import { ISalon } from 'src/types/salon'
import { DELETED_RENTAL_REQUESTS_FOR_SALON } from 'src/api/graphql/rentalRequest/queries/getDeletedRequestsForSalon'

export interface ICabinetRequestsData {
  rentalRequests: IRentalRequest[]
  deletedRentalRequests: IRentalRequest[]
  rentalRequestsSalons: IRentalRequest[]
  deletedRentalRequestsSalons: IRentalRequest[]
}

interface Props {
  accessToken?: string
  requests: ICabinetRequestsData
  user: ApolloQueryResult<any>
}

const CabinetPage: NextPage<Props> = ({ requests, user: datauser }) => {
  const { user, loading, me } = useAuthStore(getStoreData)

  if (loading || !user) return <CreatePageSkeleton />

  return !user.info?.username ||
    !user.info?.city?.name ||
    !user.info?.phone ||
    !user.info?.email ? (
    <Cabinet />
  ) : (
    <MasterCabinet user={user} requests={requests} />
  )
}

export const getServerSideProps: GetServerSideProps<Nullable<Props>> = async (
  context: OptionsType,
) => {
  const accessToken = getCookie(authConfig.tokenKeyName, context)
  const apolloClient = initializeApollo({ accessToken })

  if (!accessToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  }

  const meData = await apolloClient.query({
    query: ME,
  })

  const id = meData.data?.me.id || null

  if (!id) {
    return {
      redirect: {
        destination: '/login',
        permanent: true,
      },
    }
  } else {
    const userData = await apolloClient.query({
      query: USER,
      variables: { id },
    })

    const user = flattenStrapiResponse(userData.data.usersPermissionsUser)
    const salonIDArr = user.salons.map((e: ISalon) => e.id)

    const queries = [
      apolloClient.query({
        query: RENTAL_REQUESTS_FOR_USER,
        variables: { id },
      }),
      apolloClient.query({
        query: DELETED_RENTAL_REQUESTS_FOR_USER,
        variables: { id },
      }),
    ]

    if (salonIDArr.length > 0) {
      queries.push(
        apolloClient.query({
          query: RENTAL_REQUESTS_FOR_SALON,
          variables: { id: salonIDArr },
        }),
        apolloClient.query({
          query: DELETED_RENTAL_REQUESTS_FOR_SALON,
          variables: { id: salonIDArr },
        }),
      )
    }

    const data = await Promise.all(queries)

    const rentalRequests = flattenStrapiResponse(data[0].data?.rentalRequests)
    const deletedRentalRequests = flattenStrapiResponse(
      data[1].data?.rentalRequests,
    )
    const rentalRequestsSalons =
      flattenStrapiResponse(data[2]?.data.rentalRequests) || []
    const deletedRentalRequestsSalons =
      flattenStrapiResponse(data[3]?.data.rentalRequests) || []

    return {
      props: {
        accessToken,
        requests: {
          rentalRequests,
          deletedRentalRequests,
          rentalRequestsSalons,
          deletedRentalRequestsSalons,
        },
        user: userData.data.usersPermissionsUser,
      },
    }
  }
}

export default CabinetPage
