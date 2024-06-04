import { useCallback } from 'react'
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

const CreateOrEditMaster = ({ serviceCategories }) => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)
  const [updateMasterPhoto] = useMutation(UPDATE_MASTER_PHOTO)

  const onAdd = useCallback(
    (photoUrl: string) => {
      updateMasterPhoto({ variables: { input: { photoUrl } } })
    },
    [updateMasterPhoto],
  )

  if (me === null) {
    return <CreatePageSkeleton />
  }
  if (me && !me.info) {
    router.push('/login')
    return <CreatePageSkeleton />
  } else {
    return (
      <CreateMaster
        master={me?.master || null}
        serviceCategories={serviceCategories}
        onAdd={onAdd}
      />
    )
  }
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  let data
  const serviceCategories = await apolloClient.query({
    query: getServiceCategories,
  })
  if (serviceCategories?.data?.serviceCategories) {
    data = flattenStrapiResponse(serviceCategories.data.serviceCategories)
  }

  return addApolloState(apolloClient, {
    props: {
      serviceCategories: data || null,
    },
  })
}

export default CreateOrEditMaster
