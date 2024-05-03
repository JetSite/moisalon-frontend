import React from 'react'
import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import { brandSearchQuery } from '../../../_graphql-legacy/search/brandSearch'
import CategoryPageLayout from '../../../layouts/CategoryPageLayout'
import AllBrandsPage from '../../../components/pages/Brand/AllBrands'
import { citySuggestionsQuery } from '../../../_graphql-legacy/city/citySuggestionsQuery'
import useCheckCity from '../../../hooks/checkCity'
import { getBrands } from 'src/graphql/brand/queries/getBrands'
import { totalBrands } from 'src/graphql/brand/queries/totalBrands'
import { totalSalons } from 'src/graphql/salon/queries/totalSalons'
import { totalMasters } from 'src/graphql/master/queries/totalMasters'
import { getTotalCount } from 'src/utils/getTotalCount'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

const AllBrands = ({
  brandsSearch,
  totalBrands,
  totalMasters,
  totalSalons,
  cityData,
}) => {
  useCheckCity(cityData)

  return (
    <CategoryPageLayout loading={false}>
      <AllBrandsPage
        totalBrands={totalBrands}
        totalMasters={totalMasters}
        totalSalons={totalSalons}
        brandsSearch={brandsSearch}
      />
    </CategoryPageLayout>
  )
}

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo()
  // const city = await apolloClient.query({
  //   query: citySuggestionsQuery,
  //   variables: {
  //     city: ctx?.query?.city || '',
  //     count: 1,
  //   },
  // })

  const data = await Promise.all([
    apolloClient.query({
      query: getBrands,
      variables: {
        itemsCount: 100,
      },
    }),
    apolloClient.query({
      query: totalBrands,
    }),
    apolloClient.query({
      query: totalMasters,
    }),
    apolloClient.query({
      query: totalSalons,
    }),
  ])

  // if (!city?.data?.citySuggestions[0]?.data?.city) {
  //   return {
  //     redirect: {
  //       destination: '/moskva/brand',
  //       permanent: true,
  //     },
  //   }
  // }

  const normalisedBrands = flattenStrapiResponse(data[0]?.data?.brands?.data)

  return addApolloState(apolloClient, {
    props: {
      brandsSearch: normalisedBrands,
      totalBrands: getTotalCount(data[1].data.brands),
      totalMasters: getTotalCount(data[2].data.masters),
      totalSalons: getTotalCount(data[3].data.salons),
      cityData: 'Москва',
    },
  })
}

export default AllBrands
