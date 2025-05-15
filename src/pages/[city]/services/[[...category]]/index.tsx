import { addApolloState, initializeApollo } from '../../../../api/apollo-client'
import CategoryPageLayout from '../../../../layouts/CategoryPageLayout'
import SearchBlock from '../../../../components/blocks/SearchBlock'
import ServicesPage from '../../../../components/pages/ServicesPage'
import { getServiceCategories } from 'src/api/graphql/service/queries/getServiceCategories'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IServiceCategory } from 'src/types/services'
import { FC } from 'react'
import { IMaster } from 'src/types/masters'
import { ISalon } from 'src/types/salon'
import { getMasters } from 'src/api/graphql/master/queries/getMasters'
import { BRANDS } from 'src/api/graphql/brand/queries/getBrands'
import { getSalons } from 'src/api/graphql/salon/queries/getSalons'
import { IBrand } from 'src/types/brands'
import { GetServerSideProps } from 'next'

interface IServicesPageProps {
  servicesWithCategories: IServiceCategory[]
  brandsRandom: IBrand[]
  mastersRandom: IMaster[]
  salonsRandom: ISalon[]
  serviceId: string | null
}

const Services: FC<IServicesPageProps> = ({
  servicesWithCategories,
  brandsRandom,
  mastersRandom,
  salonsRandom,
  serviceId,
}) => {
  return (
    <CategoryPageLayout
      brands={brandsRandom}
      masters={mastersRandom}
      salons={salonsRandom}
    >
      <SearchBlock />
      <ServicesPage
        servicesWithCategories={servicesWithCategories}
        serviceId={serviceId}
        mastersData={[]}
        salonsData={[]}
      />
    </CategoryPageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { params, query } = context
  const apolloClient = initializeApollo()

  // Extract service ID from URL parameters
  const categoryParam = params?.['category']
  let serviceId: string | null = null

  if (categoryParam) {
    if (Array.isArray(categoryParam) && categoryParam.length > 0) {
      serviceId = categoryParam.length > 1 ? categoryParam[1] : categoryParam[0]
    } else if (typeof categoryParam === 'string') {
      serviceId = categoryParam
    }
  }

  const citySlug = query['city']
    ? Array.isArray(query['city'])
      ? query['city'][0]
      : query['city']
    : ''

  const data = await Promise.all([
    apolloClient.query({
      query: getServiceCategories,
    }),
    apolloClient.query({
      query: BRANDS,
      variables: {
        itemsCount: 10,
      },
    }),
    apolloClient.query({
      query: getMasters,
      variables: {
        slug: citySlug,
        itemsCount: 10,
      },
    }),
    apolloClient.query({
      query: getSalons,
      variables: {
        slug: citySlug,
        itemsCount: 10,
      },
    }),
  ])

  const normalisedData =
    flattenStrapiResponse(data[0]?.data?.serviceCategories) || []
  const brands = flattenStrapiResponse(data[1]?.data?.brands) || []
  const masters = flattenStrapiResponse(data[2]?.data?.masters) || []
  const salons = flattenStrapiResponse(data[3]?.data?.salons) || []

  return addApolloState(apolloClient, {
    props: {
      servicesWithCategories: normalisedData,
      brandsRandom: brands,
      mastersRandom: masters,
      salonsRandom: salons,
      serviceId,
    },
  })
}

export default Services
