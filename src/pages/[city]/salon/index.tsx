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
import { authConfig, defaultValues } from 'src/api/authConfig'
import { ISalon } from 'src/types/salon'
import { IPagination } from 'src/types'
import { getBrands } from 'src/api/graphql/brand/queries/getBrands'
import { IBrand } from 'src/types/brands'
import { getMasters } from 'src/api/graphql/master/queries/getMasters'
import { IMaster } from 'src/types/masters'
import { getSalons } from 'src/api/graphql/salon/queries/getSalons'
import { checkErr } from 'src/api/utils/checkErr'
import { getRating } from 'src/utils/newUtils/getRating'
import { INextContext, Nullable } from 'src/types/common'
import { ApolloQueryResult } from '@apollo/client'
import { serverProvider } from 'src/api/server'
import Cookies from 'cookies'

export interface ITotalCount {
  brands: number | null
  masters: number | null
  salons: number | null
}

interface Props extends ISalonsPageProps {
  brands: IBrand[] | null
  masters: IMaster[] | null
  salons: ISalon[] | null
}

const AllSalons: FC<Props> = ({
  serverProviderData,
  brands,
  masters,
  salons,
  ...props
}) => {
  const layout = { brands, masters, salons }
  console.log(JSON.stringify(serverProviderData.props.user.me))

  return (
    <CategoryPageLayout {...layout}>
      <AllSalonsPage {...props} />
    </CategoryPageLayout>
  )
}

export const getServerSideProps: GetServerSideProps<
  ISalonsPageProps
> = async ctx => {
  const apolloClient = initializeApollo()

  // const salonData = []
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
      query: getSalonsThroughCity,
      variables: { citySlug: ctx.query.city },
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
        citySlug: ctx.query.city,
        itemsCount: 10,
      },
    }),
    apolloClient.query({
      query: getSalons,
      variables: {
        citySlug: ctx.query.city,
        itemsCount: 10,
      },
    }),
  ])

  const serverProviderData = await serverProvider<ISalonsPageProps>({
    data: {
      pageData: data[0],
      otherData: [data[1], data[2], data[3]],
      totalCount: [data[1], data[2], data[3]],
      pagination: [data[0]],
    },
    ctx,
  })

  const cityData = (await fetchCity(ctx.query.city as string, ctx)) || {
    citySlug: defaultValues.citySlug,
  }

  const salonData: ISalon[] = flattenStrapiResponse(data[0].data.salons) || []
  const pagination: IPagination | null =
    data[0].data.salons.meta.pagination || null
  const brands: IBrand[] = flattenStrapiResponse(data[1].data.brands)
  const masters: IMaster[] = flattenStrapiResponse(data[2].data.masters)
  const salons: ISalon[] = flattenStrapiResponse(data[3]?.data.salons) // TODO: отделить главный контент от допа

  // return dataaaaa
  return {
    notFound: !cityData?.cityName,
    props: {
      serverProviderData,
      salonData: salonData.map(e => {
        const reviewsCount = e.reviews.length
        const { rating, ratingCount } = getRating(e.ratings)
        return { ...e, rating, ratingCount, reviewsCount }
      }),
      brands,
      masters: masters.map(e => {
        const reviewsCount = e.reviews.length
        const { rating, ratingCount } = getRating(e.ratings)
        return { ...e, rating, ratingCount, reviewsCount }
      }),
      salons: salons.map(e => {
        const reviewsCount = e.reviews.length
        const { rating, ratingCount } = getRating(e.ratings)
        return { ...e, rating, ratingCount, reviewsCount }
      }),
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

export default AllSalons
