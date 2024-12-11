import { addApolloState, initializeApollo } from '../../../../api/apollo-client'
import CategoryPageLayout from '../../../../layouts/CategoryPageLayout'
import SearchBlock from '../../../../components/blocks/SearchBlock'
import ServicesPage from '../../../../components/pages/ServicesPage'
import { getServiceCategories } from 'src/api/graphql/service/queries/getServiceCategories'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { IServiceCategory, IServiceInCategory } from 'src/types/services'
import { FC } from 'react'
import { getMastersByService } from 'src/api/graphql/master/queries/getMastersByService'
import { getSalonsByService } from 'src/api/graphql/salon/queries/getSalonsByService'
import { IMaster } from 'src/types/masters'
import { ISalon } from 'src/types/salon'
import { getMasters } from 'src/api/graphql/master/queries/getMasters'
import { BRANDS } from 'src/api/graphql/brand/queries/getBrands'
import { getSalons } from 'src/api/graphql/salon/queries/getSalons'
import { IBrand } from 'src/types/brands'

interface IServicesPageProps {
  servicesWithCategories: IServiceCategory[]
  mastersData: IMaster[]
  salonsData: ISalon[]
  brandsRandom: IBrand[]
  mastersRandom: IMaster[]
  salonsRandom: ISalon[]
}

const Services: FC<IServicesPageProps> = ({
  servicesWithCategories,
  mastersData,
  salonsData,
  brandsRandom,
  mastersRandom,
  salonsRandom,
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
        mastersData={mastersData}
        salonsData={salonsData}
      />
    </CategoryPageLayout>
  )
}

export async function getServerSideProps({ params, query }: any) {
  const apolloClient = initializeApollo()
  let mastersData = null
  let salonsData = null

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
    apolloClient.query({
      query: BRANDS,
      variables: {
        itemsCount: 10,
      },
    }),
    apolloClient.query({
      query: getMasters,
      variables: {
        slug: query.city,
        itemsCount: 10,
      },
    }),
    apolloClient.query({
      query: getSalons,
      variables: {
        slug: query.city,
        itemsCount: 10,
      },
    }),
  ])

  const normalisedData = flattenStrapiResponse(data[0]?.data?.serviceCategories)
  const brands: IBrand[] = flattenStrapiResponse(data[1].data.brands)
  const masters: IMaster[] = flattenStrapiResponse(data[2].data.masters)
  const salons: ISalon[] = flattenStrapiResponse(data[3]?.data.salons)

  return addApolloState(apolloClient, {
    props: {
      servicesWithCategories: normalisedData,
      mastersData,
      salonsData,
      brandsRandom: brands,
      mastersRandom: masters,
      salonsRandom: salons,
    },
  })
}

export default Services
