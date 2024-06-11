import { FC, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from '@apollo/client'
import CreatePageSkeleton from '../../components/ui/ContentSkeleton/CreatePageSkeleton'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import CreateMaster from 'src/components/pages/Master/CreateMaster'
import { UPDATE_MASTER_PHOTO } from 'src/api/graphql/master/mutations/updateMasterPhoto'
import { getServiceCategories } from 'src/api/graphql/service/queries/getServiceCategories'
import { addApolloState, initializeApollo } from 'src/api/apollo-client'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { MASTER_PAGE } from 'src/api/graphql/master/queries/masterPage'
import { GetServerSideProps } from 'next'
import { Nullable } from 'src/types/common'
import { IServiceCategories } from 'src/types/services'
import { IMaster } from 'src/types/masters'
import { ICity } from 'src/types'
import { getCities } from 'src/api/graphql/city/getCities'

interface Props {
  serviceCategories: IServiceCategories[]
  master: IMaster | null
  cities: ICity[]
}

const CreateOrEditMaster: FC<Props> = ({
  serviceCategories,
  master,
  cities,
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

  const data = await Promise.all([
    apolloClient.query({
      query: getServiceCategories,
    }),
    apolloClient.query({ query: getCities, variables: { itemsCount: 100 } }),
  ])

  const serviceCategories: IServiceCategories[] | null =
    flattenStrapiResponse(data[0].data.serviceCategories) || []
  const cities = flattenStrapiResponse(data[1].data.cities) || []

  return {
    props: {
      serviceCategories,
      master,
      cities,
    },
  }
}

export default CreateOrEditMaster
