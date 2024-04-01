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
import { FC, useContext } from 'react'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IMaster } from 'src/types/masters'
import { CityContext, MeContext } from 'src/searchContext'
import { ICity, IPagination } from 'src/types'
import { getTotalCount } from 'src/utils/getTotalCount'

interface Props {
  masterData: IMaster[]
  totalBrands: number
  totalMasters: number
  totalSalons: number
  cityData: ICity[]
  paginations: IPagination
}

const AllMasters: FC<Props> = ({
  masterData,
  totalBrands,
  totalMasters,
  totalSalons,
  // masterServices,
  cityData,
  paginations,
}) => {
  const [me, setMe] = useContext(MeContext)
  const [city, setCity] = useContext(CityContext)

  setCity(cityData[0].cityName)

  // const { data: data1 } = useQuery(getMastersTroughCity, {
  //   variables: { itemsCount: 10, cityName: [cityData[0].cityName] },
  // })

  return (
    <CategoryPageLayout rent me={me} loading={false}>
      <AllMastersPage
        totalBrands={totalBrands}
        totalMasters={totalMasters}
        totalSalons={totalSalons}
        masterData={masterData}
        cityData={cityData}
        paginations={paginations}
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

  // console.log(data[0].data.masters.meta)

  return addApolloState(apolloClient, {
    props: {
      paginations: data[0].data.masters.meta.pagination,
      masterData: flattenStrapiResponse(data[0]?.data.masters),
      totalBrands: getTotalCount(data[1]?.data.brands),
      totalMasters: getTotalCount(data[2]?.data.masters),
      totalSalons: getTotalCount(data[3]?.data.salons),
      // masterServices: data[4]?.data?.mastersServicesCount,
      cityData: flattenStrapiResponse(city.cities.data),
    },
  })
}

export default AllMasters
