import React from 'react'
import { addApolloState, initializeApollo } from '../../../apollo-client'
import { brandSearchQuery } from '../../../_graphql-legacy/search/brandSearch'
import CategoryPageLayout from '../../../layouts/CategoryPageLayout'
import AllBrandsPage from '../../../components/pages/Brand/AllBrands'
import { totalBrands } from '../../../_graphql-legacy/brand/totalBrands'
import { totalMasters } from '../../../_graphql-legacy/master/totalMasters'
import { totalSalons } from '../../../_graphql-legacy/salon/totalSalons'
import { citySuggestionsQuery } from '../../../_graphql-legacy/city/citySuggestionsQuery'
import useCheckCity from '../../../hooks/checkCity'

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
  const city = await apolloClient.query({
    query: citySuggestionsQuery,
    variables: {
      city: ctx?.query?.city || '',
      count: 1,
    },
  })

  const data = await Promise.all([
    apolloClient.query({
      query: brandSearchQuery,
      variables: {
        query: '',
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

  if (!city?.data?.citySuggestions[0]?.data?.city) {
    return {
      redirect: {
        destination: '/moskva/brand',
        permanent: true,
      },
    }
  }

  return addApolloState(apolloClient, {
    props: {
      brandsSearch: data[0]?.data?.brandsSearch,
      totalBrands: data[1]?.data.totalBrands,
      totalMasters: data[2]?.data.totalMasters,
      totalSalons: data[3]?.data.totalSalons,
      cityData: city?.data?.citySuggestions[0]?.data?.city || 'Москва',
    },
  })
}

export default AllBrands
