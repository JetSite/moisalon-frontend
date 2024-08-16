import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import CategoryPageLayout from '../../../layouts/CategoryPageLayout'
import AllMastersPage, {
  IMastersPageProps,
} from '../../../components/pages/Master/AllMasters'

import { GetServerSideProps } from 'next'
import { totalBrands } from 'src/api/graphql/brand/queries/totalBrands'
import { totalMasters } from 'src/api/graphql/master/queries/totalMasters'
import { totalSalons } from 'src/api/graphql/salon/queries/totalSalons'
import { getMastersTroughCity } from 'src/api/graphql/master/queries/getMastersTroughCity'
import { FC, useEffect } from 'react'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IMaster } from 'src/types/masters'
import { ICity, IPagination } from 'src/types'
import { getTotalCount } from 'src/utils/getTotalCount'
import useAuthStore from 'src/store/authStore'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useCheckMobileDevice from 'src/hooks/useCheckMobileDevice'
import { fetchCity } from 'src/api/utils/fetchCity'
import { authConfig, defaultValues } from 'src/api/authConfig'
import { IBrand } from 'src/types/brands'
import { getBrands } from 'src/api/graphql/brand/queries/getBrands'
import { getMasters } from 'src/api/graphql/master/queries/getMasters'
import { getSalons } from 'src/api/graphql/salon/queries/getSalons'
import { ISalon } from 'src/types/salon'
import { getRating } from 'src/utils/newUtils/getRating'

interface Props extends IMastersPageProps {
  brands: IBrand[] | null
  masters: IMaster[] | null
  salons: ISalon[] | null
}

const AllMasters: FC<Props> = ({ masters, salons, brands, ...props }) => {
  const layout = { brands, masters, salons }
  return (
    <CategoryPageLayout {...layout}>
      <AllMastersPage {...props} />
    </CategoryPageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apolloClient = initializeApollo()

  const cityData = (await fetchCity(ctx.query.city as string)) || {
    slug: defaultValues.citySlug,
  }

  // const masterData = []
  // const brands = null
  // const masters = null
  // const salons = null
  // const totalCount = {
  //   brands: 0,
  //   masters: 0,
  //   salons: 0,
  // }
  // const cityData = []
  // const pagination = []

  const data = await Promise.all([
    apolloClient.query({
      query: getMastersTroughCity,
      variables: {
        pageSize: 10,
        slug: [cityData.slug],
      },
    }),
    apolloClient.query({
      query: getBrands,
      variables: {
        itemsCount: 10,
      },
    }),
    apolloClient.query({
      query: getMasters,
      variables: {
        slug: ctx.query.city,
        itemsCount: 10,
      },
    }),
    apolloClient.query({
      query: getSalons,
      variables: {
        slug: ctx.query.city,
        itemsCount: 10,
      },
    }),
  ])

  const masterData: IMaster[] =
    flattenStrapiResponse(data[0].data.masters) || []
  const pagination: IPagination | null =
    data[0].data.masters.meta.pagination || null
  const brands: IBrand[] = flattenStrapiResponse(data[1].data.brands) || null
  const masters: IMaster[] = flattenStrapiResponse(data[2].data.masters) || null
  const salons: ISalon[] = flattenStrapiResponse(data[3].data.salons) || null

  return {
    notFound: !cityData?.name,
    props: {
      masterData: masterData.map(e => {
        const reviewsCount = e.reviews?.length || null
        const { rating, ratingCount } = getRating(e.ratings)
        return { ...e, rating, ratingCount, reviewsCount }
      }),
      brands: brands.map(e => {
        const reviewsCount = e.reviews?.length || null
        const { rating, ratingCount } = getRating(e.ratings)
        return { ...e, rating, ratingCount, reviewsCount }
      }),
      masters: masters.map(e => {
        const reviewsCount = e.reviews?.length || null
        const { rating, ratingCount } = getRating(e.ratings)
        return { ...e, rating, ratingCount, reviewsCount }
      }),
      salons: salons.map(e => {
        const reviewsCount = e.reviews?.length || null
        const { rating, ratingCount } = getRating(e.ratings)
        return { ...e, rating, ratingCount, reviewsCount }
      }),
      totalCount: {
        brands: getTotalCount(data[1].data.brands),
        masters: getTotalCount(data[2].data.masters),
        salons: getTotalCount(data[3].data.salons),
      },
      cityData,
      pagination,
    },
  }
}

export default AllMasters
