import { ApolloQueryResult, useLazyQuery, useQuery } from '@apollo/client'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { getCookie } from 'cookies-next'
import { OptionsType } from 'cookies-next/lib/types'
import { authConfig } from 'src/api/authConfig'
import { FC, useEffect } from 'react'
import CreatePageSkeleton from 'src/components/ui/ContentSkeleton/CreatePageSkeleton'
import Cabinet from 'src/components/blocks/Cabinet'
import MasterCabinet from 'src/components/pages/MasterCabinet'
import { GetServerSideProps, NextPage } from 'next'
import { addApolloState, initializeApollo } from 'src/api/apollo-client'
import { RENTAL_REQUESTS_FOR_USER } from 'src/api/graphql/rentalRequest/queries/getRequestsForUser'
import { ME } from 'src/api/graphql/me/queries/getMe'
import {
  StrapiDataObject,
  flattenStrapiResponse,
} from 'src/utils/flattenStrapiResponse'
import { Nullable } from 'src/types/common'
import { IRentalRequest } from 'src/types/rentalRequest'
import { DELETED_RENTAL_REQUESTS_FOR_USER } from 'src/api/graphql/rentalRequest/queries/getDeletedRequestsForUser'
import { RENTAL_REQUESTS_FOR_SALON } from 'src/api/graphql/rentalRequest/queries/getRequestsForSalon'
import { USER } from 'src/api/graphql/me/queries/getUser'
import { ISalon } from 'src/types/salon'
import { DELETED_RENTAL_REQUESTS_FOR_SALON } from 'src/api/graphql/rentalRequest/queries/getDeletedRequestsForSalon'
import { getCities } from 'src/api/graphql/city/getCities'
import { ICity } from 'src/types'
import {
  IGetServerUserSuccess,
  getServerUser,
} from 'src/api/utils/getServerUser'
import { IAppProps } from '../_app'

export interface ICabinetRequestsData {
  rentalRequests: IRentalRequest[]
  deletedRentalRequests: IRentalRequest[]
  rentalRequestsSalons: IRentalRequest[]
  deletedRentalRequestsSalons: IRentalRequest[]
}

interface Props extends IAppProps {
  requests: ICabinetRequestsData
  cities: ICity[]
}

const CabinetPage: NextPage<Props> = ({ requests, cities }) => {
  const { user, loading, me } = useAuthStore(getStoreData)

  if (loading || !user) return <CreatePageSkeleton />

  return !user.info?.username ||
    !user.info?.city?.name ||
    !user.info?.phone ||
    !user.info.birthDate ||
    !user.info?.email ? (
    <Cabinet user={user} cities={cities} />
  ) : (
    <MasterCabinet user={user} requests={requests} cities={cities} />
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const result = await getServerUser(ctx)

  if ('redirect' in result) {
    return {
      redirect: result.redirect,
    }
  }

  const { user, apolloClient } = result as IGetServerUserSuccess

  const prepareUser = flattenStrapiResponse(user)
  const id = user.id
  const salonsID = prepareUser.salons.map((e: ISalon) => e.id)

  const queries = [
    apolloClient.query({ query: getCities, variables: { itemsCount: 100 } }),

    apolloClient.query({
      query: RENTAL_REQUESTS_FOR_USER,
      variables: { id },
    }),
    apolloClient.query({
      query: DELETED_RENTAL_REQUESTS_FOR_USER,
      variables: { id },
    }),
  ]

  if (salonsID.length > 0) {
    queries.push(
      apolloClient.query({
        query: RENTAL_REQUESTS_FOR_SALON,
        variables: { salonsID },
      }),
      apolloClient.query({
        query: DELETED_RENTAL_REQUESTS_FOR_SALON,
        variables: { salonsID },
      }),
    )
  }

  const data = await Promise.allSettled(queries)

  const cities =
    data[0].status === 'fulfilled'
      ? (flattenStrapiResponse(data[0].value.data.cities) as ICity[])
      : []

  const rentalRequests =
    data[1].status === 'fulfilled'
      ? flattenStrapiResponse(data[1].value.data?.rentalRequests)
      : []

  const deletedRentalRequests =
    data[2].status === 'fulfilled'
      ? flattenStrapiResponse(data[2].value.data?.rentalRequests)
      : []

  const rentalRequestsSalons =
    data[3]?.status === 'fulfilled'
      ? flattenStrapiResponse(data[3].value.data.rentalRequests)
      : []
  const deletedRentalRequestsSalons =
    data[4]?.status === 'fulfilled'
      ? flattenStrapiResponse(data[4].value.data.rentalRequests)
      : []

  return addApolloState<Nullable<Props>>(apolloClient, {
    props: {
      cities,
      requests: {
        rentalRequests,
        deletedRentalRequests,
        rentalRequestsSalons,
        deletedRentalRequestsSalons,
      },
      user,
    },
  })
}

export default CabinetPage
