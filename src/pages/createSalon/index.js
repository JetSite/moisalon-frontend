import { useRouter } from 'next/router'
import { addApolloState, initializeApollo } from '../../apollo-client'
import CreateSalon from '../../components/pages/Salon/CreateSalon'
import { salonQuery } from '../../_graphql-legacy/salon/salonQuery'
import { salonSlugQuery } from '../../_graphql-legacy/salon/salonSlugQuery'

import CreatePageSkeleton from '../../components/ui/ContentSkeleton/CreatePageSkeleton'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'

const CreateOrEditSalon = ({ salon }) => {
  const router = useRouter()
  const onAdd = () => {}
  const { me } = useAuthStore(getStoreData)
  const { setMe } = useAuthStore(getStoreEvent)

  if (me === null) {
    return <CreatePageSkeleton />
  }
  if (me && !me.info) {
    router.push('/login')
    return <CreatePageSkeleton />
  } else {
    return <CreateSalon setMe={setMe} onAdd={onAdd} salon={salon} />
  }
}

export async function getServerSideProps({ query }) {
  const apolloClient = initializeApollo()

  const salonQueryRes = await apolloClient.query({
    query: salonSlugQuery,
    variables: { slug: query?.id },
  })

  const id = salonQueryRes?.data?.salonSlug?.id

  let data

  if (id) {
    data = await apolloClient.query({
      query: salonQuery,
      variables: { id: id },
    })
  }

  return addApolloState(apolloClient, {
    props: { salon: data?.data?.salon || null },
  })
}

export default CreateOrEditSalon
