import { addApolloState, initializeApollo } from '../../api/apollo-client'
import BusinessCategoryPageLayout from '../../layouts/BusinessCategoryPageLayout'
import BusinessCategoryPage from '../../components/pages/BusinessCategoryPage'
import { getSales } from 'src/api/graphql/sale/queries/getSales'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { ISale } from 'src/types/sale'
import { FC } from 'react'
import { useQuery } from '@apollo/client'

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
    query: getSales,
  })

  const normalisedSales = flattenStrapiResponse(salesRes?.data?.promotions)

  return addApolloState(apolloClient, {
    props: {
      sales: normalisedSales,
    },
  })
}

export default Sales
