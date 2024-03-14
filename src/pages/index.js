import { initializeApollo } from '../apollo-client'
import { citySuggestionsQuery } from '../_graphql-legacy/city/citySuggestionsQuery'

const AppContent = () => {}

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo()
  // const city = await apolloClient.query({
  //   query: citySuggestionsQuery,
  //   variables: {
  //     city: ctx?.query?.city || "",
  //     count: 1,
  //   },
  // });
  return {
    redirect: {
      destination: 'moskva',
      permanent: true,
    },
  }
}

export default AppContent
