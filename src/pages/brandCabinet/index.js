import { useRouter } from 'next/router'
import { addApolloState, initializeApollo } from '../../api/apollo-client'
import BrandCabinet from '../../components/pages/Brand/BrandCabinet'
import CreatePageSkeleton from '../../components/ui/ContentSkeleton/CreatePageSkeleton'
import { brandSlugQuery } from '../../_graphql-legacy/brand/brandSlugQuery'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const BrandCabinetPage = ({ brand }) => {
  const { me } = useAuthStore(getStoreData)
  const router = useRouter()

  if (me === null) {
    return <CreatePageSkeleton />
  }
  if (me && !me.info) {
    router.push('/login')
    return <CreatePageSkeleton />
  } else {
    return <BrandCabinet brand={brand} me={me} />
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

  const brandData = await apolloClient.query({
    query: brandSlugQuery,
    variables: {
      slug: query.id,
    },
  })
  return addApolloState(apolloClient, {
    props: {
      brand: brandData?.data?.brandSlug,
    },
  })
}

export default BrandCabinetPage
