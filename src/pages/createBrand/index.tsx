import { useRouter } from 'next/router'
import { addApolloState, initializeApollo } from '../../api/apollo-client'
import CreatePageSkeleton from '../../components/ui/ContentSkeleton/CreatePageSkeleton'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import CreateBrand, {
  CreateBrandProps,
} from 'src/components/pages/Brand/CreateBrand'
import { BRAND } from 'src/api/graphql/brand/queries/getBrand'
import { GetServerSideProps, NextPage } from 'next'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { getCities } from 'src/api/graphql/city/getCities'
import { Nullable } from 'src/types/common'
import { COUNTRIES } from 'src/api/graphql/country/queries/getCountries'
import { ISNetwork } from 'src/types'
import { S_NETWORKS } from 'src/api/graphql/common/queries/sNetworks'

const CreateOrEditBrand: NextPage<CreateBrandProps> = ({
  brand,
  cities,
  countries,
  sNetworks,
}) => {
  const router = useRouter()
  const { user } = useAuthStore(getStoreData)
  const isEditMode = !!brand

  if (user === null) {
    return <CreatePageSkeleton />
  }
  if (user && !user.info) {
    router.push('/login')
    return <CreatePageSkeleton />
  } else {
    return (
      <CreateBrand
        cities={cities}
        sNetworks={sNetworks}
        brand={brand}
        countries={countries}
      />
    )
  }
}

export const getServerSideProps: GetServerSideProps<
  Nullable<CreateBrandProps>
> = async ctx => {
  const apolloClient = initializeApollo()

  let brand

  if (ctx.query?.id) {
    const brandQueryRes = await apolloClient.query({
      query: BRAND,
      variables: { id: ctx.query.id },
    })
    brand = brandQueryRes?.data?.brand
  }

  const data = await Promise.all([
    apolloClient.query({ query: getCities, variables: { itemsCount: 100 } }),
    apolloClient.query({ query: COUNTRIES, variables: { itemsCount: 100 } }),
    apolloClient.query({ query: S_NETWORKS }),
  ])

  const cities = flattenStrapiResponse(data[0].data.cities) || null
  const countries = flattenStrapiResponse(data[1].data.countries) || null
  const sNetworks: ISNetwork[] = flattenStrapiResponse(data[2].data.sNetworks)
  const flattenedBrand = flattenStrapiResponse(brand) || null

  return addApolloState(apolloClient, {
    props: {
      brand: flattenedBrand,
      cities,
      countries,
      sNetworks,
      meta: {
        title: flattenedBrand
          ? 'Редактирование бренда | MOI salon'
          : 'Создание бренда | MOI salon',
        description: flattenedBrand
          ? 'Редактирование информации о бренде в системе MOI salon'
          : 'Создайте профиль вашего бренда на платформе MOI salon',
        image: '/ribbon-3.jpg',
        url: `/createBrand${ctx.query?.id ? `?id=${ctx.query.id}` : ''}`,
      },
    },
  })
}

export default CreateOrEditBrand
