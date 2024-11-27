import { FC } from 'react'
import React from 'react'
import { initializeApollo } from '../../../api/apollo-client'
import CategoryPageLayout from '../../../layouts/CategoryPageLayout'
import AllSalonsPage, {
  ISalonsPageProps,
} from '../../../components/pages/Salon/AllSalons'
import { getTotalCount } from '../../../utils/getTotalCount'
import { GetServerSideProps } from 'next'
import { getSalonsThroughCity } from 'src/api/graphql/salon/queries/getSalonsThroughCity'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { fetchCity } from 'src/api/utils/fetchCity'
import { defaultValues } from 'src/api/authConfig'
import { ISalon, ISalonPage } from 'src/types/salon'
import { IPagination } from 'src/types'
import { BRANDS } from 'src/api/graphql/brand/queries/getBrands'
import { IBrand } from 'src/types/brands'
import { getMasters } from 'src/api/graphql/master/queries/getMasters'
import { IMaster } from 'src/types/masters'
import { getSalons } from 'src/api/graphql/salon/queries/getSalons'
import { getRating } from 'src/utils/newUtils/getRating'
import { Nullable } from 'src/types/common'
import { getPrepareData } from 'src/utils/newUtils/getPrepareData'
import { MIN_SEARCH_LENGTH } from 'src/components/pages/MainPage/components/SearchMain/utils/useSearch'

export interface ITotalCount {
  brands: number | null
  masters: number | null
  salons: number | null
}

interface Props extends ISalonsPageProps {
  brands: IBrand[]
  masters: IMaster[]
  salons: ISalon[]
}

const AllSalons: FC<Props> = ({ brands, masters, salons, ...props }) => {
  const layout = { brands, masters, salons }

  return (
    <CategoryPageLayout {...layout}>
      <AllSalonsPage {...props} />
    </CategoryPageLayout>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<ISalonsPageProps>
> = async ctx => {
  const apolloClient = initializeApollo()

  const pageSize = 9

  const search = ctx.query.search?.length >= MIN_SEARCH_LENGTH

  const queries = [
    apolloClient.query({
      query: BRANDS,
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
  ]

  if (!search) {
    queries.push(
      apolloClient.query({
        query: getSalonsThroughCity,
        variables: { slug: ctx.query.city, pageSize, sort: ['rating:asc'] },
      }),
    )
  }
  let salonData: ISalon[] | null = null
  let pagination: IPagination | null = null

  const data = await Promise.allSettled(queries)

  const cityData = await fetchCity(ctx.query.city as string, ctx)

  const brands = getPrepareData<IBrand[]>(data[0], 'brands')
  const masters = getPrepareData<IMaster[]>(data[1], 'masters')
  const salons = getPrepareData<ISalon[]>(data[2], 'salons')

  if (data.length >= 4) {
    salonData = getPrepareData<ISalon[]>(data[3], 'salons')
    pagination =
      data[3].status === 'fulfilled'
        ? data[3].value.data.salons.meta.pagination
        : null
  }
  return {
    notFound: !cityData?.name,
    props: {
      salonData: !salonData
        ? null
        : salonData.map(e => {
            const reviewsCount = e.reviews.length
            const { rating, ratingCount } = getRating(e.ratings)
            return { ...e, rating, ratingCount, reviewsCount }
          }),
      brands,
      masters: !masters
        ? null
        : masters.map(e => {
            const reviewsCount = e.reviews.length
            const { rating, ratingCount } = getRating(e.ratings)
            return { ...e, rating, ratingCount, reviewsCount }
          }),
      salons: !salons
        ? null
        : salons.map(e => {
            const reviewsCount = e.reviews.length
            const { rating, ratingCount } = getRating(e.ratings)
            return { ...e, rating, ratingCount, reviewsCount }
          }),
      totalCount: {
        brands:
          data[0].status === 'fulfilled'
            ? getTotalCount(data[0].value.data.brands)
            : null,
        masters:
          data[1].status === 'fulfilled'
            ? getTotalCount(data[1].value.data.masters)
            : null,
        salons:
          data[2].status === 'fulfilled'
            ? getTotalCount(data[2].value.data.salons)
            : null,
      },
      cityData,
      pagination,
      pageSize,
    },
  }
}

export default AllSalons
