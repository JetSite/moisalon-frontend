import Head from 'next/head'
import React, { FC } from 'react'
import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import CategoryPageLayout from '../../../layouts/CategoryPageLayout'
import { totalSalons } from '../../../_graphql-legacy/salon/totalSalons'
import { totalMasters } from '../../../_graphql-legacy/master/totalMasters'
import { totalBrands } from '../../../_graphql-legacy/brand/totalBrands'
import { citySuggestionsQuery } from '../../../_graphql-legacy/city/citySuggestionsQuery'
import AllRentPage, {
  IRentsPageProps,
} from '../../../components/pages/Rent/AllRentPage'
import useCheckCity from '../../../hooks/checkCity'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { GET_RENT_SALONS } from 'src/api/graphql/salon/queries/getRentSalons'
import { fetchCity } from 'src/api/utils/fetchCity'
import { defaultValues } from 'src/api/authConfig'
import { getBrands } from 'src/api/graphql/brand/queries/getBrands'
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

interface Props extends IRentsPageProps {
  brands: IBrand[] | null
  masters: IMaster[] | null
  salons: ISalon[] | null
}
const AllRent: FC<Props> = ({ brands, masters, salons, ...props }) => {
  const layout = { brands, masters, salons }

  return (
    <>
      <Head>
        <title>{`Аренда кабинета косметолога, мастера маникюра, бровиста, тату мастера, массажиста, парикмахера, барбера - ${props.cityData.cityName} - снять кабинет или рабочее место с moi.salon.`}</title>
        <meta
          name="description"
          content={`✔️ Найдите и арендуйте на выгодных условиях с почасовой или помесячной оплатой кабинет косметолога, мастера маникюра и педикюра, бровиста, тату мастера, массажиста, парикмахера и колориста, барбера, стилиста и визажиста в городе ${props.cityData.cityName} - снять кабинет или рабочее место с moi.salon ⭐️ Подберите лучшее место для работы в вашем городе ✅ Делайте правильный выбор с помощью сервиса moi.salon.`}
        />
      </Head>
      <CategoryPageLayout {...layout} rent>
        <AllRentPage {...props} />
      </CategoryPageLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const apolloClient = initializeApollo()
  const cityData = (await fetchCity(ctx.query.city as string)) || {
    citySlug: defaultValues.citySlug,
  }

  const data = await Promise.all([
    apolloClient.query({
      query: GET_RENT_SALONS,
      variables: {
        citySlug: cityData.citySlug,
        itemsCount: 10,
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

  checkErr(data, ctx.res)

  const rentData: ISalon[] = flattenStrapiResponse(data[0].data.salons) || []
  const pagination: IPagination | null =
    data[0].data.salons.meta.pagination || null
  const brands: IBrand[] = flattenStrapiResponse(data[1].data.brands)
  const masters: IMaster[] = flattenStrapiResponse(data[2].data.masters)
  const salons: ISalon[] = flattenStrapiResponse(data[3]?.data.salons)

  return {
    notFound: !cityData?.cityName,
    props: {
      rentData: rentData.map(e => {
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

export default AllRent