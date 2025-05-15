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
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { getMastersByService } from '@/api/graphql/master/queries/getMastersByService'
import { getSalonsByService } from '@/api/graphql/salon/queries/getSalonsByService'

interface IServicesPageProps {
  servicesWithCategories: IServiceCategory[]
  mastersData: IMaster[]
  salonsData: ISalon[]
  brandsRandom: IBrand[]
  mastersRandom: IMaster[]
  salonsRandom: ISalon[]
  serviceId?: string | null
  hasMoreMasters: boolean
  hasMoreSalons: boolean
}

interface CategoryParams extends ParsedUrlQuery {
  city?: string
  category?: string[]
}

const MASTERS_PER_PAGE = 10
const SALONS_PER_PAGE = 6

const Services: FC<IServicesPageProps> = ({
  servicesWithCategories,
  mastersData,
  salonsData,
  brandsRandom,
  mastersRandom,
  salonsRandom,
  serviceId,
  hasMoreMasters,
  hasMoreSalons,
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
        serviceId={serviceId}
        hasMoreMasters={hasMoreMasters}
        hasMoreSalons={hasMoreSalons}
      />
    </CategoryPageLayout>
  )
}

export const getServerSideProps: GetServerSideProps<
  IServicesPageProps
> = async (context: GetServerSidePropsContext<CategoryParams>) => {
  const { params, query } = context
  const apolloClient = initializeApollo()
  let mastersData: IMaster[] = []
  let salonsData: ISalon[] = []
  let hasMoreMasters = false
  let hasMoreSalons = false

  const view = params?.category?.length > 1 ? params?.category[0] : undefined
  const serviceId =
    params?.category?.length > 1
      ? params?.category[1]
      : params?.category?.length
      ? params?.category[0]
      : undefined

  if (params?.category?.length) {
    // Use paginated queries for masters and salons
    const dataMasters = await apolloClient.query({
      query: getMastersByService,
      variables: {
        serviceId: serviceId || null,
        page: 1,
        pageSize: MASTERS_PER_PAGE + 1, // +1 to check if there are more
      },
    })

    const dataSalons = await apolloClient.query({
      query: getSalonsByService,
      variables: {
        serviceId: serviceId || null,
        page: 1,
        pageSize: SALONS_PER_PAGE + 1, // +1 to check if there are more
      },
    })

    const masters = flattenStrapiResponse(dataMasters?.data?.masters) || []
    const salons = flattenStrapiResponse(dataSalons?.data?.salons) || []

    // Check if we have more items than what we need to display initially
    hasMoreMasters = masters && masters.length > MASTERS_PER_PAGE
    hasMoreSalons = salons && salons.length > SALONS_PER_PAGE

    // Only return the initial page limit
    mastersData = masters.slice(0, MASTERS_PER_PAGE)
    salonsData = salons.slice(0, SALONS_PER_PAGE)
  }

  const citySlug = (query.city as string) || ''

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
      serviceId: serviceId || null,
      hasMoreMasters,
      hasMoreSalons,
    },
  })
}

export default Services
