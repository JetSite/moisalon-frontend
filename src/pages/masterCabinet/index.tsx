import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import CreatePageSkeleton from 'src/components/ui/ContentSkeleton/CreatePageSkeleton'
import Cabinet from 'src/components/blocks/Cabinet'
import MasterCabinet from 'src/components/pages/MasterCabinet'
import { GetServerSideProps, NextPage } from 'next'
import { addApolloState, initializeApollo } from 'src/api/apollo-client'
import { RENTAL_REQUESTS_FOR_USER } from 'src/api/graphql/rentalRequest/queries/getRequestsForUser'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IID, Nullable } from 'src/types/common'
import { IRentalRequest } from 'src/types/rentalRequest'
import { DELETED_RENTAL_REQUESTS_FOR_USER } from 'src/api/graphql/rentalRequest/queries/getDeletedRequestsForUser'
import { RENTAL_REQUESTS_FOR_SALON } from 'src/api/graphql/rentalRequest/queries/getRequestsForSalon'
import { ISalon } from 'src/types/salon'
import { DELETED_RENTAL_REQUESTS_FOR_SALON } from 'src/api/graphql/rentalRequest/queries/getDeletedRequestsForSalon'
import { getCities } from 'src/api/graphql/city/getCities'
import { ICity } from 'src/types'
import {
  IGetServerUserSuccess,
  getServerUser,
} from 'src/api/utils/getServerUser'
import { IAppProps } from '../_app'
import { getPrepareData } from 'src/utils/newUtils/getPrepareData'
import { Fragment } from 'react'
import MainHead from '../MainHead'

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

  if (loading || !user)
    return (
      <Fragment>
        <MainHead
          title="Личный кабинет мастера | MOI salon"
          description="Управление профилем мастера на платформе MOI salon"
          image="/masters-page-right.png"
        />
        <CreatePageSkeleton />
      </Fragment>
    )

  return !user.info?.username ||
    !user.info?.city?.name ||
    !user.info?.phone ||
    !user.info.birthDate ||
    !user.info?.email ? (
    <Fragment>
      <MainHead
        title="Личный кабинет мастера | MOI salon"
        description="Управление профилем мастера на платформе MOI salon"
        image="/masters-page-right.png"
      />
      <Cabinet user={user} cities={cities} />
    </Fragment>
  ) : (
    <Fragment>
      <MainHead
        title={`Личный кабинет ${user.info?.username || 'мастера'} | MOI salon`}
        description="Управление профилем мастера, услугами и расписанием на платформе MOI salon"
        image={user.info?.photo?.url || '/paul-oscar-1.jpg'}
      />
      <MasterCabinet user={user} requests={requests} cities={cities} />
    </Fragment>
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
  const salonsID =
    (prepareUser.salons?.map((e: ISalon) => e.id) as IID[] | null) || []

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

  const cities = getPrepareData<ICity[]>(data[0], 'cities') ?? []

  const rentalRequests =
    getPrepareData<IRentalRequest[]>(data[1], 'rentalRequests') ?? []

  const deletedRentalRequests =
    getPrepareData<IRentalRequest[]>(data[2], 'rentalRequests') ?? []

  const rentalRequestsSalons =
    getPrepareData<IRentalRequest[]>(data[3], 'rentalRequests') ?? []

  const deletedRentalRequestsSalons =
    getPrepareData<IRentalRequest[]>(data[4], 'rentalRequests') ?? []

  return addApolloState<Props>(apolloClient, {
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
