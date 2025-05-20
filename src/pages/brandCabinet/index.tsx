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
import { IBrand } from '@/types/brands'

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
  const brand: IBrand = flattenStrapiResponse(brandData.data.brand)

  return addApolloState(apolloClient, {
    props: {
      brand,
      meta: {
        title: `Личный кабинет ${brand.name} | MOI salon`,
        description: 'Управление профилем бренда на платформе MOI salon',
        image: brand.logo?.url || '/ribbon-3.jpg',
        url: `/brandCabinet?id=${ctx.query.id}`,
      },
      schema: {
        type: 'ProfilePage',
        data: {
          name: `Личный кабинет ${brand.name} | MOI salon`,
          description: 'Управление профилем бренда на платформе MOI salon',
          url: `https://moi.salon/brandCabinet?id=${ctx.query.id}`,
          image: brand.logo?.url
            ? `${process.env.NEXT_PUBLIC_PHOTO_URL}${brand.logo.url}`
            : 'https://moi.salon/ribbon-3.jpg',
          publisher: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          },
          mainEntity: {
            '@type': 'Organization',
            name: brand.name,
            description: brand.description,
            logo: brand.logo?.url
              ? `${process.env.NEXT_PUBLIC_PHOTO_URL}${brand.logo.url}`
              : undefined,
            address: brand.address
              ? {
                  '@type': 'PostalAddress',
                  addressLocality: brand.city?.name,
                  addressCountry: 'RU',
                  streetAddress: brand.address,
                }
              : undefined,
            brand: {
              '@type': 'Brand',
              name: brand.name,
              logo: brand.logo?.url
                ? `https://moi.salon${brand.logo.url}`
                : undefined,
            },
          },
        },
      },
    },
  })
}

export default BrandCabinetPage
