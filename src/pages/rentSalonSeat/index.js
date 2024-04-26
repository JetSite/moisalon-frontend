import { useRouter } from 'next/router'
import { addApolloState, initializeApollo } from '../../apollo-client'
import { useState } from 'react'
import { salonQuery } from '../../_graphql-legacy/salon/salonQuery'
import { getSeatActivities } from '../../_graphql-legacy/seat/getSeatActivities'
import { getSeatEquipment } from '../../_graphql-legacy/seat/getSeatEquipment'
import RentSeat from '../../components/pages/Salon/RentSeat'
import { useQuery } from '@apollo/client'
import CreatePageSkeleton from '../../components/ui/ContentSkeleton/CreatePageSkeleton'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const RentSalonSeat = ({ salonData, seatActivities, seatEquipment }) => {
  const [salon, setSalon] = useState(salonData)
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)

  const { refetch: refetchSalon } = useQuery(salonQuery, {
    variables: {
      id: router?.query?.id,
    },
    fetchPolicy: 'network-only',
    onCompleted: res => {
      setSalon(res?.salon)
    },
  })

  if (me === null) {
    return <CreatePageSkeleton />
  }
  if (me && !me.info) {
    router.push('/login')
    return <CreatePageSkeleton />
  } else {
    return (
      <RentSeat
        refetchSalon={refetchSalon}
        salon={salon}
        seatActivities={seatActivities}
        seatEquipment={seatEquipment}
      />
    )
  }
}

export async function getServerSideProps({ query }) {
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
      query: salonQuery,
      variables: {
        id: query?.id,
      },
    }),
    apolloClient.query({
      query: getSeatActivities,
    }),
    apolloClient.query({
      query: getSeatEquipment,
    }),
  ])

  return addApolloState(apolloClient, {
    props: {
      salonData: data[0]?.data?.salon || null,
      seatActivities: data[1]?.data?.activitiesSeatServicesCatalog,
      seatEquipment: data[2]?.data?.equipmentSeatServicesCatalog,
    },
  })
}

export default RentSalonSeat
