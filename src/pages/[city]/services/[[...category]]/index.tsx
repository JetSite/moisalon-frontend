import { addApolloState, initializeApollo } from '../../../../api/apollo-client'
import CategoryPageLayout from '../../../../layouts/CategoryPageLayout'
import SearchBlock from '../../../../components/blocks/SearchBlock'
import ServicesPage from '../../../../components/pages/ServicesPage'
import { servicesWithMasterCount } from '../../../../_graphql-legacy/services/servicesWithMasterCount'
import { servicesWithSalonCount } from '../../../../_graphql-legacy/services/servicesWithSalonCount'
import { mastersByService } from '../../../../_graphql-legacy/services/mastersByService'
import { salonsByService } from '../../../../_graphql-legacy/services/salonsByService'
import { citySuggestionsQuery } from '../../../../_graphql-legacy/city/citySuggestionsQuery'
import { getServiceCategories } from 'src/api/graphql/service/queries/getServiceCategories'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IServiceCategory } from 'src/types/services'
import { FC } from 'react'
import { getMastersByService } from 'src/api/graphql/master/queries/getMastersByService'
import { getSalonsByService } from 'src/api/graphql/salon/queries/getSalonsByService'
import { IMaster } from 'src/types/masters'
import { ISalon } from 'src/types/salon'

interface IServicesPageProps {
  servicesWithCategories: IServiceCategory[]
  mastersData: IMaster[]
  salonsData: ISalon[]
}

const Services: FC<IServicesPageProps> = ({
  servicesWithCategories,
  mastersData,
  salonsData,
}) => {
  return (
    <CategoryPageLayout brands={[]} masters={[]} salons={[]}>
      <SearchBlock />
      <ServicesPage
        servicesWithCategories={servicesWithCategories}
        mastersData={mastersData}
        salonsData={salonsData}
      />
    </CategoryPageLayout>
  )
}

export async function getServerSideProps({ params }: any) {
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

  const view = params?.category?.length > 1 ? params?.category[0] : undefined
  const serviceId =
    params?.category?.length > 1
      ? params?.category[1]
      : params?.category?.length
      ? params?.category[0]
      : undefined

  if (params?.category?.length) {
    const dataMasters = await apolloClient.query({
      query: getMastersByService,
      variables: {
        serviceId: serviceId || null,
      },
    })
    const dataSalons = await apolloClient.query({
      query: getSalonsByService,
      variables: {
        serviceId: serviceId || null,
      },
    })
    mastersData = flattenStrapiResponse(dataMasters?.data?.masters)
    salonsData = flattenStrapiResponse(dataSalons?.data?.salons)
  }

  const data = await Promise.all([
    apolloClient.query({
      query: getServiceCategories,
    }),
  ])

  const normalisedData = flattenStrapiResponse(data[0]?.data?.serviceCategories)

  return addApolloState(apolloClient, {
    props: {
      servicesWithCategories: normalisedData,
      mastersData,
      salonsData,
    },
  })
}

export default Services
