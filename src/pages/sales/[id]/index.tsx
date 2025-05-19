import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import { getFeedCategories } from 'src/api/graphql/feed/queries/getFeedCategories'
import { getFeeds } from 'src/api/graphql/feed/queries/getFeeds'
import { ISale } from 'src/types/sale'
import { FC } from 'react'
import SalePage, { SalePageProps } from 'src/components/pages/SalePage'
import { PROMOTION_BY_ID } from 'src/api/graphql/promotion/queries/getPromotionById'
import { IBeautyCategories, IFeed } from '@/types/feed'
import { GetServerSideProps } from 'next'
import { Nullable } from '@/types/common'
import { getPrepareData } from '@/utils/newUtils/getPrepareData'
import { PHOTO_URL } from '../../../api/variables'

const SaleDetailed: FC<SalePageProps> = ({
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

export const getServerSideProps: GetServerSideProps<
  Nullable<SalePageProps>
> = async ctx => {
  const apolloClient = initializeApollo()

  const id = ctx.params?.['id']
  if (!id)
    return {
      notFound: true,
    }

  const data = await Promise.allSettled([
    apolloClient.query({
      query: PROMOTION_BY_ID,
      variables: { id },
    }),
    apolloClient.query({
      query: getFeedCategories,
    }),
    apolloClient.query({
      query: getFeeds,
    }),
  ])

  const sale = getPrepareData<ISale>(data[0], 'promotion')

  if (!sale)
    return {
      notFound: true,
    }
  const beautyCategories = getPrepareData<IBeautyCategories[]>(
    data[1],
    'feedCategories',
  )
  const beautyAllContent = getPrepareData<IFeed[]>(data[2], 'feeds')

  return addApolloState(apolloClient, {
    props: {
      sale,
      beautyCategories,
      beautyAllContent,
      meta: {
        title: sale.seoTitle || `${sale.title} | Акции MOI salon`,
        description:
          sale.seoDescription ||
          sale.shortDescription ||
          'Акция на платформе MOI salon',
        image: `${PHOTO_URL}${sale?.cover?.url}` || '/mobile-main-bg.jpg',
        url: `https://moi.salon/sales/${sale.id}`,
      },
    },
  })
}

export default SaleDetailed
