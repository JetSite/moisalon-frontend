import { FC } from 'react'
import React from 'react'
import { addApolloState, initializeApollo } from '../../../apollo-client'
import CategoryPageLayout from '../../../layouts/CategoryPageLayout'
import AllSalonsPage from '../../../components/pages/Salon/AllSalons'
import { totalMasters } from '../../../graphql/master/queries/totalMasters'
import { totalBrands } from '../../../graphql/brand/queries/totalBrands'
import { getCities } from '../../../graphql/city/getCities'
import { totalSalons } from '../../../graphql/salon/queries/totalSalons'
import { getTotalCount } from '../../../utils/getTotalCount'
import { GetServerSideProps } from 'next'
import { getSalonsThroughCity } from 'src/graphql/salon/queries/getSalonsThroughCity'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

interface IProps {
  totalBrands: number
  totalMasters: number
  totalSalons: number
  salonSearch: any
  salonServices: any
  cityData: any
  data: any
}

const AllSalons: FC<IProps> = ({
  salonSearch,
  totalBrands,
  totalMasters,
  totalSalons,
  salonServices,
  cityData,
  data,
}) => {
  const { me } = useAuthStore(getStoreData)

  // useCheckCity(cityData);

  return (
    <CategoryPageLayout loading={false} me={me}>
      <AllSalonsPage
        totalBrands={totalBrands}
        totalMasters={totalMasters}
        totalSalons={totalSalons}
        salonSearch={salonSearch}
        me={me}
      />
    </CategoryPageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apolloClient = initializeApollo()
  const { data: city } = await apolloClient.query({
    query: getCities,
    variables: { cityName: ['Москва'] },
  })
  // variables: { cityName: [ctx?.query?.city] || ['Москва'] },
  const normalizeCity = city.cities.data[0].attributes.cityName

  const data = await Promise.all([
    apolloClient.query({
      query: getSalonsThroughCity,
      variables: { cityName: ['Москва'] },
    }),
    // apolloClient.query({
    // query: searchQuery,
    //   variables: {
    //     input: {
    //       ...EmptySearchQuery,
    //       city: city?.data?.citySuggestions[0]?.data?.city || "",
    //       query: "",
    //       lessor: false,
    //     },
    //   },
    // }),
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
    // query: servicesWithSalonCount,
    // }),
  ])

  // if (!city?.data?.citySuggestions[0]?.data?.city) {
  //   return {
  //     redirect: {
  //       destination: '/moskva/salon',
  //       permanent: true,
  //     },
  //   }
  // }

  const normalisedSalons = flattenStrapiResponse(data[0].data.salons)

  return addApolloState(apolloClient, {
    props: {
      data: data,
      salonSearch: normalisedSalons,
      totalBrands: getTotalCount(data[1].data.brands),
      totalMasters: getTotalCount(data[2].data.masters),
      totalSalons: getTotalCount(data[3].data.salons),
      // salonServices: data[4]?.data?.salonServicesCount,
      // cityData: city?.data?.citySuggestions[0]?.data?.city || "Москва",
      cityData: normalizeCity,
    },
  })
}

export default AllSalons
