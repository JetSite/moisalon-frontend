import { addApolloState, initializeApollo } from '../../../apollo-client'
import { masterSearchQuery } from '../../../_graphql-legacy/search/masterSearch'
import CategoryPageLayout from '../../../layouts/CategoryPageLayout'
import AllMastersPage from '../../../components/pages/Master/AllMasters'

import { citySuggestionsQuery } from '../../../_graphql-legacy/city/citySuggestionsQuery'
import { servicesWithMasterCount } from '../../../_graphql-legacy/services/servicesWithMasterCount'
import useCheckCity from '../../../hooks/checkCity'
import { GetServerSideProps } from 'next'
import { totalBrands } from 'src/graphql/brand/queries/totalBrands'
import { totalMasters } from 'src/graphql/master/queries/totalMasters'
import { totalSalons } from 'src/graphql/salon/queries/totalSalons'
import { getCities } from 'src/graphql/city/getCities'
import { getMasters } from 'src/graphql/master/queries/getMasters'
import { useQuery } from '@apollo/client'
import { getMastersTroughCity } from 'src/graphql/master/queries/getMastersTroughCity'
import { FC } from 'react'

interface Props {}

const AllMasters: FC<Props> = ({
  masterSearch,
  totalBrands,
  totalMasters,
  totalSalons,
  masterServices,
  cityData,
}) => {
  useCheckCity(cityData)

  // const { data } = useQuery(getMastersTroughCity, {
  //   variables: { itemsCount: 10, cityName: [cityData] },
  // })

  console.log(masterSearch)

  return (
    <CategoryPageLayout loading={false}>
      {/* <AllMastersPage
        totalBrands={totalBrands}
        totalMasters={totalMasters}
        totalSalons={totalSalons}
        masterSearch={masterSearch}
        masterServices={masterServices}
      /> */}
    </CategoryPageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apolloClient = initializeApollo()

  const { data: city } = await apolloClient.query({
    query: getCities,
    variables: { cityName: ['Москва'] },
  })
  const normalizeCity = city.cities.data[0].attributes.cityName

  const data = await Promise.all([
    apolloClient.query({
      query: getMastersTroughCity,
      variables: {
        itemsCount: 10,
        cityName: [normalizeCity],
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
    // apolloClient.query({
    //   query: servicesWithMasterCount,
    //   variables: {
    //     city: city?.data?.citySuggestions[0]?.data?.city || '',
    //   },
    // }),
  ])
  if (!normalizeCity) {
    return {
      redirect: {
        destination: '/moskva/master',
        permanent: true,
      },
    }
  }
  return addApolloState(apolloClient, {
    props: {
      masterSearch: data[0]?.data?.masters,
      // totalBrands: data[1]?.data.totalBrands,
      // totalMasters: data[2]?.data.totalMasters,
      // totalSalons: data[3]?.data.totalSalons,
      // masterServices: data[4]?.data?.mastersServicesCount,
      cityData: normalizeCity,
    },
  })
}

export default AllMasters
