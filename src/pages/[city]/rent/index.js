import Head from 'next/head'
import React from 'react'
import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import { EmptySearchQuery } from '../../../searchContext'
import CategoryPageLayout from '../../../layouts/CategoryPageLayout'
import { totalSalons } from '../../../_graphql-legacy/salon/totalSalons'
import { totalMasters } from '../../../_graphql-legacy/master/totalMasters'
import { totalBrands } from '../../../_graphql-legacy/brand/totalBrands'
import { citySuggestionsQuery } from '../../../_graphql-legacy/city/citySuggestionsQuery'
import AllRentPage from '../../../components/pages/Rent/AllRentPage'
import useCheckCity from '../../../hooks/checkCity'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'

const AllRent = ({
  salonSearch,
  totalBrands,
  totalMasters,
  totalSalons,
  cityData,
}) => {
  const { me } = useAuthStore(getStoreData)

  useCheckCity(cityData)

  return (
    <>
      <Head>
        <title>{`Аренда кабинета косметолога, мастера маникюра, бровиста, тату мастера, массажиста, парикмахера, барбера - ${cityData} - снять кабинет или рабочее место с moi.salon.`}</title>
        <meta
          name="description"
          content={`✔️ Найдите и арендуйте на выгодных условиях с почасовой или помесячной оплатой кабинет косметолога, мастера маникюра и педикюра, бровиста, тату мастера, массажиста, парикмахера и колориста, барбера, стилиста и визажиста в городе ${cityData} - снять кабинет или рабочее место с moi.salon ⭐️ Подберите лучшее место для работы в вашем городе ✅ Делайте правильный выбор с помощью сервиса moi.salon.`}
        />
      </Head>
      <CategoryPageLayout rent loading={false} me={me}>
        <AllRentPage
          totalBrands={totalBrands}
          totalMasters={totalMasters}
          totalSalons={totalSalons}
          salonSearch={salonSearch}
          me={me}
          cityData={cityData}
        />
      </CategoryPageLayout>
    </>
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
      query: searchQuery,
      variables: {
        input: {
          ...EmptySearchQuery,
          city: city?.data?.citySuggestions[0]?.data?.city || '',
          lessor: true,
          query: '',
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
  ])

  if (!city?.data?.citySuggestions[0]?.data?.city) {
    return {
      redirect: {
        destination: '/moskva/rent',
        permanent: true,
      },
    }
  }

  return addApolloState(apolloClient, {
    props: {
      salonSearch: data[0]?.data?.salonSearch,
      totalBrands: data[1]?.data.totalBrands,
      totalMasters: data[2]?.data.totalMasters,
      totalSalons: data[3]?.data.totalSalons,
      cityData: city?.data?.citySuggestions[0]?.data?.city || 'Москва',
    },
  })
}

export default AllRent
