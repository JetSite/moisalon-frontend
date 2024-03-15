import { FC, useContext } from 'react'
import React from 'react'
import { addApolloState, initializeApollo } from '../../../apollo-client'
import { EmptySearchQuery } from '../../../searchContext'
import { searchQuery } from '../../../_graphql-legacy/search/searchQuery'
import CategoryPageLayout from '../../../layouts/CategoryPageLayout'
import AllSalonsPage from '../../../components/pages/Salon/AllSalons'
import { totalMasters } from '../../../graphql/master/queries/totalMasters'
import { totalBrands } from '../../../graphql/brand/queries/totalBrands'
import { MeContext } from '../../../searchContext'
import { citySuggestionsQuery } from '../../../_graphql-legacy/city/citySuggestionsQuery'
import useCheckCity from '../../../hooks/checkCity'
import { servicesWithSalonCount } from '../../../_graphql-legacy/services/servicesWithSalonCount'
import { totalSalons } from '../../../graphql/salon/queries/totalSalons'
import { useQuery } from '@apollo/client'
import { getTotalCount } from '../../../utils/getTotalCount'
import { GetServerSideProps } from 'next'

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
  // const [me, setMe] = useContext(MeContext);
  // useCheckCity(cityData);

  // const { data } = useQuery(totalSalons)

  return (
    <></>

    // <CategoryPageLayout loading={false} me={me}>
    //   <AllSalonsPage
    //     totalBrands={totalBrands}
    //     totalMasters={totalMasters}
    //     totalSalons={totalSalons}
    //     salonSearch={salonSearch}
    //     salonServices={salonServices}
    //     me={me}
    //   />
    // </CategoryPageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apolloClient = initializeApollo()
  // const city = await apolloClient.query({
  //   query: citySuggestionsQuery,
  //   variables: {
  //     city: ctx?.query?.city || "",
  //     count: 1,
  //   },
  // });

  const data = await Promise.all([
    // apolloClient.query({
    //   query: searchQuery,
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

  return addApolloState(apolloClient, {
    props: {
      data: data,
      // salonSearch: data[0]?.data?.salonSearch,
      totalBrands: getTotalCount(data[0].data.brands),
      totalMasters: getTotalCount(data[1].data.masters),
      totalSalons: getTotalCount(data[2].data.salons),
      // salonServices: data[4]?.data?.salonServicesCount,
      // cityData: city?.data?.citySuggestions[0]?.data?.city || "Москва",
      cityData: 'Москва',
    },
  })
}

export default AllSalons
