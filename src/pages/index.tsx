import { initializeApollo } from '../api/apollo-client'
import { citySuggestionsQuery } from '../_graphql-legacy/city/citySuggestionsQuery'
import { GetServerSideProps } from 'next'
import { defaultCitySlug } from 'src/api/authConfig'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { FC } from 'react'

const AppContent: FC = () => {
  return <div>sdd</div>
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  // const apolloClient = initializeApollo()
  // const data = await apolloClient.query({
  //   query: citySuggestionsQuery,
  //   variables: {
  //     city: ctx?.query?.city || defaultCitySlug,
  //     count: 1,
  //   },
  // })
  console.log('first')

  // const city = flattenStrapiResponse(data.data.cities)
  return {
    city: '',
    // redirect: {
    //   destination: defaultCitySlug,
    //   permanent: true,
    // },
  }
}

export default AppContent
