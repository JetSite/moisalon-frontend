import React, { FC } from 'react'
import { initializeApollo } from '../../../api/apollo-client'
import CategoryPageLayout from '../../../layouts/CategoryPageLayout'
import AllRentPage, {
  IRentsPageProps,
} from '../../../components/pages/Rent/AllRentPage'
import { GET_RENT_SALONS } from 'src/api/graphql/salon/queries/getRentSalons'
import { fetchCity } from 'src/api/utils/fetchCity'
import { defaultValues } from 'src/api/authConfig'
import { BRANDS } from 'src/api/graphql/brand/queries/getBrands'
import { getMasters } from 'src/api/graphql/master/queries/getMasters'
import { getSalons } from 'src/api/graphql/salon/queries/getSalons'
import { getTotalCount } from 'src/utils/getTotalCount'
import { getRating } from 'src/utils/newUtils/getRating'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ISalon } from 'src/types/salon'
import { IBrand } from 'src/types/brands'
import { IMaster } from 'src/types/masters'
import { checkErr } from 'src/api/utils/checkErr'
import { IPagination } from 'src/types'
import { Nullable } from 'src/types/common'
import { GetServerSideProps } from 'next'
import { getPrepareData } from 'src/utils/newUtils/getPrepareData'
import { MIN_SEARCH_LENGTH } from 'src/components/pages/MainPage/components/SearchMain/utils/useSearch'

interface Props extends IRentsPageProps {
  brands: IBrand[] | null
  masters: IMaster[] | null
  salons: ISalon[] | null
}
const AllRent: FC<Props> = ({ brands, masters, salons, ...props }) => {
  const layout = { brands, masters, salons }

  return (
    <CategoryPageLayout {...layout} rent>
      <AllRentPage {...props} />
    </CategoryPageLayout>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const apolloClient = initializeApollo()
  const pageSize = 9

  const search = ctx.query['search']?.length >= MIN_SEARCH_LENGTH

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
        slug: ctx.query['city'],
        itemsCount: 10,
      },
    }),
    apolloClient.query({
      query: getSalons,
      variables: {
        slug: ctx.query['city'],
        itemsCount: 10,
      },
    }),
  ]

  if (!search) {
    queries.push(
      apolloClient.query({
        query: GET_RENT_SALONS,
        variables: { slug: ctx.query['city'], pageSize, sort: ['rating:asc'] },
      }),
    )
  }

  let rentData: ISalon[] | null = null
  let pagination: IPagination | null = null

  const data = await Promise.allSettled(queries)

  const cityData = await fetchCity(ctx.query['city'] as string, ctx)

  const brands = getPrepareData<IBrand[]>(data[0], 'brands')
  const masters = getPrepareData<IMaster[]>(data[1], 'masters')
  const salons = getPrepareData<ISalon[]>(data[2], 'salons')

  if (data.length >= 4) {
    rentData = getPrepareData<ISalon[]>(data[3], 'salons')
    pagination =
      data[3].status === 'fulfilled'
        ? data[3].value.data.salons.meta.pagination
        : null
  }

  return {
    notFound: !cityData?.name,
    props: {
      rentData: !rentData
        ? null
        : rentData.map(e => {
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
      meta: {
        title: `Аренда помещений в ${cityData.name} | MOI salon`,
        description: `Каталог помещений для аренды в ${cityData.name}. Поиск по условиям, ценам и расположению на платформе MOI salon`,
        image: '/salons-page-bg.jpg',
        url: `https://moi.salon/${cityData.slug}/rent`,
      },
      schema: {
        type: 'CollectionPage',
        data: {
          name: `Аренда помещений в ${cityData.name} | MOI salon`,
          description: `Каталог помещений для аренды в ${cityData.name}. Поиск по условиям, ценам и расположению на платформе MOI salon`,
          url: `https://moi.salon/${cityData.slug}/rent`,
          image: 'https://moi.salon/salons-page-bg.jpg',
          publisher: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          },
        },
      },
    },
  }
}

export default AllRent
