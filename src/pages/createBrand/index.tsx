import { useRouter } from 'next/router'
import { addApolloState, initializeApollo } from '../../api/apollo-client'
import CreatePageSkeleton from '../../components/ui/ContentSkeleton/CreatePageSkeleton'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import CreateBrand, {
  CreateBrandProps,
} from 'src/components/pages/Brand/CreateBrand'
import { getBrand } from 'src/api/graphql/brand/queries/getBrand'
import { GetServerSideProps, NextPage } from 'next'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { getCities } from 'src/api/graphql/city/getCities'
import { Nullable } from 'src/types/common'

const CreateOrEditBrand: NextPage<CreateBrandProps> = ({ brand, cities }) => {
  const router = useRouter()
  const { me } = useAuthStore(getStoreData)

  if (me === null) {
    return <CreatePageSkeleton />
  }
  if (me && !me.info) {
    router.push('/login')
    return <CreatePageSkeleton />
  } else {
    return <CreateBrand cities={cities} brand={brand} />
  }
}

export const getServerSideProps: GetServerSideProps<
  Nullable<CreateBrandProps>
> = async ctx => {
  const apolloClient = initializeApollo()

  let brand

  if (ctx.query?.id) {
    const brandQueryRes = await apolloClient.query({
      query: getBrand,
      variables: { id: ctx.query.id },
    })
    brand = brandQueryRes?.data?.brand
  }

  const data = await Promise.all([
    apolloClient.query({ query: getCities, variables: { itemsCount: 100 } }),
  ])

  const cities = flattenStrapiResponse(data[0].data.cities) || null

  return addApolloState(apolloClient, {
    props: { brand: flattenStrapiResponse(brand) || null, cities },
  })
}

export default CreateOrEditBrand
