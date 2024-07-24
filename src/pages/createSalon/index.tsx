import { useRouter } from 'next/router'
import { addApolloState, initializeApollo } from '../../api/apollo-client'
import CreateSalon from '../../components/pages/Salon/CreateSalon'
import { salonQuery } from '../../_graphql-legacy/salon/salonQuery'
import { salonSlugQuery } from '../../_graphql-legacy/salon/salonSlugQuery'

import CreatePageSkeleton from '../../components/ui/ContentSkeleton/CreatePageSkeleton'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { getServiceCategories } from 'src/api/graphql/service/queries/getServiceCategories'
import { GET_SALON_ACTIVITIES } from 'src/api/graphql/salon/queries/getSalonActivities'
import { getCities } from 'src/api/graphql/city/getCities'
import { GetServerSideProps, NextPage } from 'next'
import { Nullable } from 'src/types/common'
import { getSalonPage } from 'src/api/graphql/salon/queries/getSalon'
import { ISalonActivity, ISalonPage } from 'src/types/salon'
import { IServiceCategories } from 'src/types/services'
import { ICity } from 'src/types'
import { useEffect } from 'react'
import useBaseStore from 'src/store/baseStore'

interface Props {
  salon: ISalonPage
  services: IServiceCategories[]
  activities: ISalonActivity[]
  cities: ICity[]
}

const CreateOrEditSalon: NextPage<Props> = ({
  salon,
  services,
  activities,
  cities,
}) => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)
  const { setServices, setSalonActivities } = useBaseStore(getStoreEvent)

  useEffect(() => {
    setServices(services)
    setSalonActivities(activities)
  }, [])

  if (me === null) {
    return <CreatePageSkeleton />
  }
  if (me && !me.info) {
    router.push('/login')
    return <CreatePageSkeleton />
  } else {
    return <CreateSalon cities={cities} salon={salon} />
  }
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const apolloClient = initializeApollo()
  const id = ctx.query.id
  let salonData

  if (id) {
    salonData = await apolloClient.query({
      query: getSalonPage,
      variables: { id },
    })
  }

  const data = await Promise.all([
    apolloClient.query({ query: getServiceCategories }),
    apolloClient.query({ query: GET_SALON_ACTIVITIES }),
    apolloClient.query({ query: getCities, variables: { itemsCount: 100 } }),
  ])

  const services = flattenStrapiResponse(data[0].data.serviceCategories)
  const activities = flattenStrapiResponse(data[1].data.salonActivities)
  const cities = flattenStrapiResponse(data[2].data.cities)

  const salon = salonData ? flattenStrapiResponse(salonData.data.salon) : null

  return {
    props: { salon, services, activities, cities },
  }
}

export default CreateOrEditSalon
