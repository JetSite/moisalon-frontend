import { FC, Fragment } from 'react'
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
import MainLayout from '../../../layouts/MainLayout'

export interface ITotalCount {
  brands: number | null
  masters: number | null
  salons: number | null
}

interface Props extends ISalonsPageProps {
  brands: IBrand[]
  masters: IMaster[]
  salons: ISalon[]
  cityData: ICity
  pagination: IPagination
}

const AllSalons: FC<Props> = ({
  brands,
  masters,
  salons,
  cityData,
  ...props
}) => {
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
      meta: {
        title: `Салоны красоты в ${cityData.name} | MOI salon`,
        description: `Все салоны красоты и spa (спа) в городе ${cityData.name}. Выбирайте лучшие салоны по рейтингам и отзывам на MOI salon.`,
        image: '/salons-page-bg.jpg',
        url: `https://moi.salon/${cityData.slug}/salon`,
      },
      schema: {
        type: 'CollectionPage',
        data: {
          name: `Салоны красоты в ${cityData.name} | MOI salon`,
          description: `Все салоны красоты и spa (спа) в городе ${cityData.name}. Выбирайте лучшие салоны по рейтингам и отзывам на MOI salon.`,
          url: `https://moi.salon/${cityData.slug}/salon`,
          image: 'https://moi.salon/salons-page-bg.jpg',
          publisher: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement:
              salonData?.map((salon, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'BeautySalon',
                  name: salon.name,
                  description: salon.description,
                  image:
                    process.env.NEXT_PUBLIC_PHOTO_URL +
                      salon.photos?.[0]?.url || '/salons-page-bg.jpg',
                  url: `https://moi.salon/${cityData.slug}/salon/${salon.id}`,
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: cityData.name,
                    addressCountry: 'RU',
                    streetAddress: salon.address,
                  },
                },
              })) || [],
          },
        },
      },
    },
  }
}

export default AllSalons
