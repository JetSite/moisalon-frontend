import { useRouter } from 'next/router'
import { addApolloState, initializeApollo } from '../../api/apollo-client'
import CreateSalon from '../../components/pages/Salon/CreateSalon'
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
import { getCities } from 'src/api/graphql/city/getCities'
import { ICity, ISNetwork } from 'src/types'
import { GET_SERVICES_M_CAT } from 'src/api/graphql/service/queries/getServicesMCat'
import { S_NETWORKS } from 'src/api/graphql/common/queries/sNetworks'

interface Props {
  salon: ISalonPage
  services: IServiceCategories[]
  servicesM: IServiceCategories[]
  activities: ISalonActivity[]
  cities: ICity[]
  sNetworks: ISNetwork[]
}

const CreateOrEditLessorSalon: FC<Props> = ({
  salon,
  services,
  servicesM,
  activities,
  cities,
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
    return (
      <CreateSalon sNetworks={sNetworks} cities={cities} rent salon={salon} />
    )
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
    props: {
      salon,
      services,
      activities,
      cities,
      servicesM,
      sNetworks,
      meta: {
        title: salon
          ? `Редактирование салона-арендодателя ${salon.name} | MOI salon`
          : 'Создание профиля арендодателя | MOI salon',
        description:
          'Управляйте профилем арендодателя, добавляйте рабочие места и привлекайте мастеров на платформе MOI salon',
        image:
          process.env.NEXT_PUBLIC_PHOTO_URL + salon?.cover?.url ||
          '/salons-page-bg.jpg',
        url: `/createLessorSalon${id ? `?id=${id}` : ''}`,
      },
      schema: {
        type: 'WebPage',
        data: {
          name: salon
            ? `Редактирование салона-арендодателя ${salon.name} | MOI salon`
            : 'Создание профиля арендодателя | MOI salon',
          description:
            'Управляйте профилем арендодателя, добавляйте рабочие места и привлекайте мастеров на платформе MOI salon',
          url: `https://moi.salon/createLessorSalon${id ? `?id=${id}` : ''}`,
          image: salon?.cover?.url
            ? `${process.env.NEXT_PUBLIC_PHOTO_URL}${salon.cover.url}`
            : 'https://moi.salon/salons-page-bg.jpg',
          publisher: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          },
        },
      },
    },
  }
}

export default CreateOrEditLessorSalon
