import { FC } from 'react'
import { useRouter } from 'next/router'
import CreatePageSkeleton from '../../components/ui/ContentSkeleton/CreatePageSkeleton'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import CreateMaster from 'src/components/pages/Master/CreateMaster'
import { getServiceCategories } from 'src/api/graphql/service/queries/getServiceCategories'
import { initializeApollo } from 'src/api/apollo-client'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { MASTER_PAGE } from 'src/api/graphql/master/queries/masterPage'
import { GetServerSideProps } from 'next'
import { Nullable } from 'src/types/common'
import { IServiceCategories } from 'src/types/services'
import { IMaster } from 'src/types/masters'
import { ICity, ISNetwork } from 'src/types'
import { getCities } from 'src/api/graphql/city/getCities'
import { S_NETWORKS } from 'src/api/graphql/common/queries/sNetworks'

interface Props {
  serviceCategories: IServiceCategories[]
  master: IMaster | null
  cities: ICity[]
  sNetworks: ISNetwork[]
}

const CreateOrEditMaster: FC<Props> = ({
  serviceCategories,
  master,
  cities,
  sNetworks,
}) => {
  const router = useRouter()
  const { user } = useAuthStore(getStoreData)

  if (user === null) {
    return <CreatePageSkeleton />
  }
  if (user && !user.info) {
    router.push('/login')
    return <CreatePageSkeleton />
  } else {
    return (
      <CreateMaster
        master={master}
        serviceCategories={serviceCategories}
        cities={cities}
        sNetworks={sNetworks}
      />
    )
  }
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const apolloClient = initializeApollo()

  let master: IMaster | null = null
  const id = ctx.query.id

  if (id) {
    const masterRes = await apolloClient.query({
      query: MASTER_PAGE,
      variables: { id },
    })
    master = flattenStrapiResponse(masterRes.data.master)
  }

  const data = await Promise.allSettled([
    apolloClient.query({ query: getServiceCategories }),
    apolloClient.query({ query: getCities, variables: { itemsCount: 100 } }),
    apolloClient.query({ query: S_NETWORKS }),
  ])

  const serviceCategories =
    data[0].status === 'fulfilled'
      ? flattenStrapiResponse(data[0].value.data.serviceCategories) || []
      : []
  const cities =
    data[1].status === 'fulfilled'
      ? flattenStrapiResponse(data[1].value.data.cities) || []
      : []
  const sNetworks =
    data[2].status === 'fulfilled'
      ? flattenStrapiResponse(data[2].value.data.sNetworks) || []
      : []

  return {
    props: {
      serviceCategories,
      master,
      cities,
      sNetworks,
    },
  }
}

export default CreateOrEditMaster
