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
import { ICity, ISNetwork } from 'src/types'
import { useEffect } from 'react'
import useBaseStore from 'src/store/baseStore'
import { GET_SERVICES_M_CAT } from 'src/api/graphql/service/queries/getServicesMCat'
import { S_NETWORKS } from 'src/api/graphql/common/queries/sNetworks'

interface Props {
  salon: ISalonPage
  services: IServiceCategories[]
  activities: ISalonActivity[]
  cities: ICity[]
  servicesM: IServiceCategories[]
  sNetworks: ISNetwork[]
}

const CreateOrEditSalon: NextPage<Props> = ({
  salon,
  services,
  activities,
  cities,
  servicesM,
  sNetworks,
}) => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)
  const { setServices, setSalonActivities, setServicesM } =
    useBaseStore(getStoreEvent)

  useEffect(() => {
    setServices(services)
    setSalonActivities(activities)
    setServicesM(servicesM)
  }, [])

  if (me === null) {
    return <CreatePageSkeleton />
  }
  if (me && !me.info) {
    router.push('/login')
    return <CreatePageSkeleton />
  } else {
    return <CreateSalon sNetworks={sNetworks} cities={cities} salon={salon} />
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
    apolloClient.query({ query: GET_SERVICES_M_CAT }),
    apolloClient.query({ query: S_NETWORKS }),
  ])

  const services = flattenStrapiResponse(data[0].data.serviceCategories)
  const activities = flattenStrapiResponse(data[1].data.salonActivities)
  const cities = flattenStrapiResponse(data[2].data.cities)
  const servicesM = flattenStrapiResponse(data[3].data.servicesMCat)
  const sNetworks = flattenStrapiResponse(data[4].data.sNetworks) as ISNetwork[]

  const salon = salonData ? flattenStrapiResponse(salonData.data.salon) : null

  return {
    props: { salon, services, activities, cities, servicesM, sNetworks },
  }
}

export default CreateOrEditSalon
