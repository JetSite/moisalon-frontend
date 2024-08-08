import { useRouter } from 'next/router'
import { addApolloState, initializeApollo } from '../../api/apollo-client'
import CreatePageSkeleton from '../../components/ui/ContentSkeleton/CreatePageSkeleton'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import CreateBrand from 'src/components/pages/Brand/CreateBrand'
import { getBrand } from 'src/api/graphql/brand/queries/getBrand'

const CreateOrEditBrand = ({ brand }) => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)

  if (me === null) {
    return <CreatePageSkeleton />
  }
  if (me && !me.info) {
    router.push('/login')
    return <CreatePageSkeleton />
  } else {
    return <CreateBrand brand={brand} />
  }
}

export async function getServerSideProps({ query }: any) {
  const apolloClient = initializeApollo()

  let brand

  if (query?.id) {
    const brandQueryRes = await apolloClient.query({
      query: getBrand,
      variables: { id: query.id },
    })
    brand = brandQueryRes?.data?.brand
  }


  return addApolloState(apolloClient, {
    props: { brand: brand || null },
  })
}

export default CreateOrEditBrand
