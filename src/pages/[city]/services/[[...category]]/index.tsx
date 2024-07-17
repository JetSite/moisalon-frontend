import { addApolloState, initializeApollo } from '../../../../api/apollo-client'
import CategoryPageLayout from '../../../../layouts/CategoryPageLayout'
import SearchBlock from '../../../../components/blocks/SearchBlock'
import ServicesPage from '../../../../components/pages/ServicesPage'
import { servicesWithMasterCount } from '../../../../_graphql-legacy/services/servicesWithMasterCount'
import { servicesWithSalonCount } from '../../../../_graphql-legacy/services/servicesWithSalonCount'
import { mastersByService } from '../../../../_graphql-legacy/services/mastersByService'
import { salonsByService } from '../../../../_graphql-legacy/services/salonsByService'
import { citySuggestionsQuery } from '../../../../_graphql-legacy/city/citySuggestionsQuery'

const Services = () => {
  return (
    <CategoryPageLayout>
      <SearchBlock />
      <ServicesPage />
    </CategoryPageLayout>
  )
}

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo()
  let mastersData = null
  let salonsData = null

  // const city = await apolloClient.query({
  //   query: citySuggestionsQuery,
  //   variables: {
  //     city: params?.city || '',
  //     count: 1,
  //   },
  // })

  // const view = params?.category?.length > 1 ? params?.category[0] : undefined
  // const serviceId =
  //   params?.category?.length > 1
  //     ? params?.category[1]
  //     : params?.category?.length
  //     ? params?.category[0]
  //     : undefined

  // if (params?.category?.length) {
  //   const dataMasters = await apolloClient.query({
  //     query: mastersByService,
  //     variables: {
  //       serviceId: serviceId || null,
  //       city: city?.data?.citySuggestions[0]?.data?.city || '',
  //     },
  //   })
  //   const dataSalons = await apolloClient.query({
  //     query: salonsByService,
  //     variables: {
  //       serviceId: serviceId || null,
  //       city: city?.data?.citySuggestions[0]?.data?.city || '',
  //     },
  //   })
  //   mastersData = dataMasters?.data?.listMastersByService
  //   salonsData = dataSalons?.data?.listSalonsByService
  // }

  const data = await Promise.all([
    // apolloClient.query({
    //   query: servicesWithSalonCount,
    // }),
  ])

  return addApolloState(apolloClient, {
    props: {},
  })
}

export default Services
