import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import { getFeedCategories } from 'src/api/graphql/feed/queries/getFeedCategories'
import { getFeeds } from 'src/api/graphql/feed/queries/getFeeds'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { getSaleById } from 'src/api/graphql/sale/event/queries/getSaleById'
import { ISale } from 'src/types/sale'
import { FC } from 'react'
import SalePage from 'src/components/pages/SalePage'

interface SaleDetailedProps {
  sale: ISale
  beautyCategories: any
  beautyAllContent: any
}

const SaleDetailed: FC<SaleDetailedProps> = ({
  sale,
  beautyCategories,
  beautyAllContent,
}) => {
  return (
    <SalePage
      sale={sale}
      beautyCategories={beautyCategories}
      beautyAllContent={beautyAllContent}
    />
  )
}

export async function getServerSideProps({ params }: any) {
  const apolloClient = initializeApollo()

  const saleRes = await apolloClient.query({
    query: getSaleById,
    variables: { id: params.id },
  })
  const categories = await apolloClient.query({
    query: getFeedCategories,
  })
  const all = await apolloClient.query({
    query: getFeeds,
  })

  const normalisedSale = flattenStrapiResponse(saleRes?.data?.promotion)

  return addApolloState(apolloClient, {
    props: {
      sale: normalisedSale,
      beautyCategories: categories?.data?.feedCategories,
      beautyAllContent: all?.data?.feeds,
    },
  })
}

export default SaleDetailed
