import { addApolloState, initializeApollo } from '../../api/apollo-client'
import BusinessCategoryPageLayout from '../../layouts/BusinessCategoryPageLayout'
import BusinessCategoryPage from '../../components/pages/BusinessCategoryPage'
import { PROMOTIONS } from 'src/api/graphql/promotion/queries/getPromotions'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ISale } from 'src/types/sale'
import { FC } from 'react'

interface SalesProps {
  sales: ISale[]
}

const Sales: FC<SalesProps> = ({ sales }) => {
  return (
    <BusinessCategoryPageLayout loading={false}>
      <BusinessCategoryPage
        title="Акции"
        type="sales"
        data={sales}
        link={'/sales'}
      />
    </BusinessCategoryPageLayout>
  )
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  const salesRes = await apolloClient.query({
    query: PROMOTIONS,
  })

  const normalisedSales = flattenStrapiResponse(salesRes?.data?.promotions)

  return addApolloState(apolloClient, {
    props: {
      sales: normalisedSales,
      meta: {
        title: 'Акции и специальные предложения | MOI salon',
        description:
          'Выгодные акции и специальные предложения от салонов красоты и мастеров на платформе MOI salon',
        image: '/services-page-photo4.jpg',
        url: 'https://moi.salon/sales',
      },
    },
  })
}

export default Sales
