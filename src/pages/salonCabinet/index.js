import { useRouter } from 'next/router'
import { addApolloState, initializeApollo } from '../../api/apollo-client'
import SalonCabinet from '../../components/pages/Salon/SalonCabinet'
import { salonQuery } from '../../_graphql-legacy/salon/salonQuery'
import CreatePageSkeleton from '../../components/ui/ContentSkeleton/CreatePageSkeleton'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const SalonCabinetPage = ({ data }) => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)

  if (me === null) {
    return <CreatePageSkeleton />
  }
  if (me && !me.info) {
    router.push('/login')
    return <CreatePageSkeleton />
  } else {
    return <SalonCabinet salon={data} />
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

  const data = await apolloClient.query({
    query: salonQuery,
    variables: {
      id: query?.id,
    },
  })

  return addApolloState(apolloClient, {
    props: { data: data?.data?.salon || null },
  })
}

export default SalonCabinetPage
