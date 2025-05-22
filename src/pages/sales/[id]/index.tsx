import { addApolloState, initializeApollo } from '../../../api/apollo-client'
import { ISale } from 'src/types/sale'
import { FC } from 'react'
import SalePage, { SalePageProps } from 'src/components/pages/SalePage'
import { PROMOTION_BY_ID } from 'src/api/graphql/promotion/queries/getPromotionById'
import { IBeautyCategories, IFeed } from '@/types/feed'
import { GetServerSideProps } from 'next'
import { Nullable } from '@/types/common'
import { getPrepareData } from '@/utils/newUtils/getPrepareData'
import { PHOTO_URL } from '../../../api/variables'
import { getFeedCategoriesForSlider } from '@/api/graphql/feed/queries/getFeedCategoriesForSlider'
import { getFeedsForSlider } from '@/api/graphql/feed/queries/getFeedsForSlider'

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
      query: getFeedCategoriesForSlider,
    }),
    apolloClient.query({
      query: getFeedsForSlider,
    }),
  ])

  const sale: ISale | null = getPrepareData<ISale>(data[0], 'promotion')

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
      schema: {
        type: 'Offer',
        data: {
          '@context': 'https://schema.org',
          '@type': 'Offer',
          name: sale.title,
          description:
            sale.seoDescription ||
            sale.shortDescription ||
            'Акция на платформе MOI salon',
          image: sale?.cover?.url
            ? `${process.env.NEXT_PUBLIC_PHOTO_URL}${sale.cover.url}`
            : 'https://moi.salon/mobile-main-bg.jpg',
          url: `https://moi.salon/sales/${sale.id}`,
          availability: 'https://schema.org/InStock',
          validFrom: sale.dateStart,
          validThrough: sale.dateEnd,
          itemCondition: 'https://schema.org/NewCondition',
        },
      },
    },
  })
}

export default SaleDetailed
