import React, { FC } from 'react'
import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import { brandSearchQuery } from '../../../_graphql-legacy/search/brandSearch'
import CategoryPageLayout from '../../../layouts/CategoryPageLayout'
import AllBrandsPage, {
  IBrandPageProps,
} from '../../../components/pages/Brand/AllBrands'
import { citySuggestionsQuery } from '../../../_graphql-legacy/city/citySuggestionsQuery'
import { BRANDS } from 'src/api/graphql/brand/queries/getBrands'
import { totalBrands } from 'src/api/graphql/brand/queries/totalBrands'
import { totalSalons } from 'src/api/graphql/salon/queries/totalSalons'
import { totalMasters } from 'src/api/graphql/master/queries/totalMasters'
import { getTotalCount } from 'src/utils/getTotalCount'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { GetServerSideProps } from 'next'
import { ISalonsPageProps } from 'src/components/pages/Salon/AllSalons'
import { fetchCity } from 'src/api/utils/fetchCity'
import { defaultValues } from 'src/api/authConfig'
import { getSalons } from 'src/api/graphql/salon/queries/getSalons'
import { getMasters } from 'src/api/graphql/master/queries/getMasters'
import { checkErr } from 'src/api/utils/checkErr'
import { ISalon } from 'src/types/salon'
import { IPagination } from 'src/types'
import { IBrand } from 'src/types/brands'
import { IMaster } from 'src/types/masters'
import { getRating } from 'src/utils/newUtils/getRating'
import { Nullable } from 'src/types/common'

interface Props extends IBrandPageProps {
  brands: IBrand[] | null
  masters: IMaster[] | null
  salons: ISalon[] | null
}

const AllBrands: FC<Props> = ({
  masters: mastersData,
  salons: salonsData,
  brands,
  ...props
}) => {
  const salons =
    salonsData?.map(e => {
      const reviewsCount = e.reviews.length
      const { rating, ratingCount } = getRating(e.ratings)
      return { ...e, rating, ratingCount, reviewsCount }
    }) || null
  const masters =
    mastersData?.map(e => {
      const reviewsCount = e.reviews.length
      const { rating, ratingCount } = getRating(e.ratings)
      return { ...e, rating, ratingCount, reviewsCount }
    }) || null

  const layout = { brands, masters, salons }

  return (
    <CategoryPageLayout {...layout}>
      <AllBrandsPage {...props} />
    </CategoryPageLayout>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<IBrandPageProps>
> = async ctx => {
  const apolloClient = initializeApollo()
  const cityData = (await fetchCity(ctx.query.city as string)) || {
    slug: defaultValues.city.slug,
  }
  const data = await Promise.all([
    apolloClient.query({
      query: BRANDS,
      variables: {
        itemsCount: 100,
      },
    }),
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
  ])

  checkErr(data, ctx.res)

  const brandData: IBrand[] = flattenStrapiResponse(data[0].data.brands) || []
  const pagination: IPagination | null =
    data[0].data.brands.meta.pagination || null
  const brands: IBrand[] = flattenStrapiResponse(data[1].data.brands) || null
  const masters: IMaster[] = flattenStrapiResponse(data[2].data.masters) || null
  const salons: ISalon[] = flattenStrapiResponse(data[3]?.data.salons) || null

  return {
    notFound: !cityData?.name,
    props: {
      data: data,
      brandData,
      brands,
      masters,
      salons,
      totalCount: {
        brands: getTotalCount(data[1].data.brands),
        masters: getTotalCount(data[2].data.masters),
        salons: getTotalCount(data[3]?.data.salons),
      },
      cityData,
      pagination,
    },
  }
}

export default AllBrands
