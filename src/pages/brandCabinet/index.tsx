import { useRouter } from 'next/router'
import { addApolloState, initializeApollo } from '../../api/apollo-client'
import BrandCabinet, {
  IBrandCabinetProps,
} from '../../components/pages/Brand/BrandCabinet'
import CreatePageSkeleton from '../../components/ui/ContentSkeleton/CreatePageSkeleton'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { GetServerSideProps, NextPage } from 'next'
import { Nullable } from 'src/types/common'
import { BRAND } from 'src/api/graphql/brand/queries/getBrand'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

const BrandCabinetPage: NextPage<IBrandCabinetProps> = ({ brand }) => {
  const { user } = useAuthStore(getStoreData)
  const router = useRouter()

  if (user === null) {
    return <CreatePageSkeleton />
  }
  if (user && !user.info) {
    router.push('/login')
    return <CreatePageSkeleton />
  } else {
    return <BrandCabinet brand={brand} />
  }
}

export const getServerSideProps: GetServerSideProps<
  Nullable<IBrandCabinetProps>
> = async ctx => {
  const apolloClient = initializeApollo()
  if (!ctx.query?.id) {
    return {
      redirect: {
        permanent: true,
        destination: '/masterCabinet',
      },
    }
  }

  const brandData = await apolloClient.query({
    query: BRAND,
    variables: {
      id: ctx.query.id,
    },
  })
  const brand = flattenStrapiResponse(brandData.data.brand)

  return addApolloState(apolloClient, {
    props: {
      brand,
      meta: {
        title: `Личный кабинет ${brand.name} | MOI salon`,
        description: 'Управление профилем бренда на платформе MOI salon',
        image: brand.logo?.url || '/ribbon-3.jpg',
        url: `/brandCabinet?id=${ctx.query.id}`,
      },
    },
  })
}

export default BrandCabinetPage
