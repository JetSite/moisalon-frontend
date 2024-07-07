import { useRouter } from 'next/router'
import { addApolloState, initializeApollo } from '../../api/apollo-client'
import { useState } from 'react'
import { salonQuery } from '../../_graphql-legacy/salon/salonQuery'
import { getSeatActivities } from '../../_graphql-legacy/seat/getSeatActivities'
import { getSeatEquipment } from '../../_graphql-legacy/seat/getSeatEquipment'
import RentSeat from '../../components/pages/Salon/RentSeat'
import { useLazyQuery, useQuery } from '@apollo/client'
import CreatePageSkeleton from '../../components/ui/ContentSkeleton/CreatePageSkeleton'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { getSalonPage } from 'src/api/graphql/salon/queries/getSalon'
import { PAYMENT_METHODS } from 'src/api/graphql/salon/queries/getPaymentMethods'
import { RENTAL_PERIODS } from 'src/api/graphql/salon/queries/getRentalPeriods'
import { GetServerSideProps, NextPage } from 'next'
import { ISalonPage } from 'src/types/salon'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IRentalPeriod } from 'src/types'
import { EQUIPMENT } from 'src/api/graphql/equipment/quries/getEquipment'
import { IEquipment } from 'src/types/equipment'

interface Props {
  salonData: ISalonPage
  retnalPeriods: IRentalPeriod[]
  equipments: IEquipment[]
}

const RentSalonSeat: NextPage<Props> = ({
  salonData,
  retnalPeriods,
  equipments,
}) => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)

  if (me === null) {
    return <CreatePageSkeleton />
  }
  if (me && !me.info) {
    router.push('/login')
    return <CreatePageSkeleton />
  } else {
    return (
      <RentSeat
        salonData={salonData}
        retnalPeriods={retnalPeriods}
        equipments={equipments}
      />
    )
  }
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const apolloClient = initializeApollo()

  if (!query?.id) {
    return {
      redirect: {
        permanent: false,
        destination: '/masterCabinet',
      },
    }
  }

  const data = await Promise.all([
    apolloClient.query({
      query: getSalonPage,
      variables: {
        id: query?.id,
      },
    }),
    apolloClient.query({
      query: PAYMENT_METHODS,
    }),
    apolloClient.query({
      query: RENTAL_PERIODS,
    }),
    apolloClient.query({
      query: EQUIPMENT,
    }),
  ])

  const salonData = flattenStrapiResponse(data[0].data.salon)
  const paymentMethods = flattenStrapiResponse(data[1].data.paymentMethods)
  const retnalPeriods = flattenStrapiResponse(data[2].data.rentalPeriods)
  const equipments = flattenStrapiResponse(data[3].data.equipments)

  return addApolloState(apolloClient, {
    props: {
      salonData,
      paymentMethods,
      retnalPeriods,
      equipments,
    },
  })
}

export default RentSalonSeat
