import { addApolloState, initializeApollo } from '../../../apollo-client'
import { masterSearchQuery } from '../../../_graphql-legacy/search/masterSearch'
import CategoryPageLayout from '../../../layouts/CategoryPageLayout'
import AllMastersPage from '../../../components/pages/Master/AllMasters'
import { totalBrands } from '../../../_graphql-legacy/brand/totalBrands'
import { totalMasters } from '../../../_graphql-legacy/master/totalMasters'
import { totalSalons } from '../../../_graphql-legacy/salon/totalSalons'
import { citySuggestionsQuery } from '../../../_graphql-legacy/city/citySuggestionsQuery'
import { servicesWithMasterCount } from '../../../_graphql-legacy/services/servicesWithMasterCount'
import useCheckCity from '../../../hooks/checkCity'

const AllMasters = ({
  masterSearch,
  totalBrands,
  totalMasters,
  totalSalons,
  masterServices,
  cityData,
}) => {
  useCheckCity(cityData)

  return (
    <CategoryPageLayout loading={false}>
      <AllMastersPage
        totalBrands={totalBrands}
        totalMasters={totalMasters}
        totalSalons={totalSalons}
        masterSearch={masterSearch}
        masterServices={masterServices}
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
      query: masterSearchQuery,
      variables: {
        input: {
          query: '',
          city: city?.data?.citySuggestions[0]?.data?.city || '',
        },
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
    apolloClient.query({
      query: servicesWithMasterCount,
      variables: {
        city: city?.data?.citySuggestions[0]?.data?.city || '',
      },
    }),
  ])
  if (!city?.data?.citySuggestions[0]?.data?.city) {
    return {
      redirect: {
        destination: '/moskva/master',
        permanent: true,
      },
    }
  }
  return addApolloState(apolloClient, {
    props: {
      masterSearch: data[0]?.data?.masterSearch,
      totalBrands: data[1]?.data.totalBrands,
      totalMasters: data[2]?.data.totalMasters,
      totalSalons: data[3]?.data.totalSalons,
      masterServices: data[4]?.data?.mastersServicesCount,
      cityData: city?.data?.citySuggestions[0]?.data?.city || 'Москва',
    },
  })
}

export default AllMasters
