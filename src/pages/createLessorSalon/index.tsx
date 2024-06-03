import { useRouter } from 'next/router'
import { addApolloState, initializeApollo } from '../../api/apollo-client'
import CreateSalon from '../../components/pages/Salon/CreateSalon'
import { salonQuery } from '../../_graphql-legacy/salon/salonQuery'
import { salonSlugQuery } from '../../_graphql-legacy/salon/salonSlugQuery'
import CreatePageSkeleton from '../../components/ui/ContentSkeleton/CreatePageSkeleton'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import { GetServerSideProps } from 'next'
import { Nullable } from 'src/types/common'
import { authConfig } from 'src/api/authConfig'
import { ME } from 'src/api/graphql/me/queries/getMe'
import { SALON_USER_ID } from 'src/api/graphql/salon/queries/getSalonUserId'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ISalonActivity, ISalonPage } from 'src/types/salon'
import { getSalonPage } from 'src/api/graphql/salon/queries/getSalon'
import { getServiceCategories } from 'src/api/graphql/service/queries/getServiceCategories'
import { FC, useEffect } from 'react'
import useBaseStore from 'src/store/baseStore'
import { IServiceCategories } from 'src/types/services'
import { GET_SALON_ACTIVITIES } from 'src/api/graphql/salon/queries/getSalonActivities'

interface Props {
  salon: ISalonPage
  services: IServiceCategories[]
  activities: ISalonActivity[]
}

const CreateOrEditLessorSalon: FC<Props> = ({
  salon,
  services,
  activities,
}) => {
  const router = useRouter()
  const onAdd = () => {}
  const { me } = useAuthStore(getStoreData)
  const { setServices, setSalonActivities } = useBaseStore(getStoreEvent)

  useEffect(() => {
    setServices(services)
    setSalonActivities(activities)
  }, [])

  console.log('page', activities)

  if (me === null) {
    return <CreatePageSkeleton />
  }
  if (me && !me.info) {
    router.push('/login')
    return <CreatePageSkeleton />
  } else {
    return <CreateSalon lessor onAdd={onAdd} salon={salon} />
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
  ])

  const services = flattenStrapiResponse(data[0].data.serviceCategories)
  const activities = flattenStrapiResponse(data[1].data.salonActivities)

  const salon = salonData ? flattenStrapiResponse(salonData.data.salon) : null

  return {
    props: { salon, services, activities },
  }
}

export default CreateOrEditLessorSalon
