import React from 'react'
import AdvicesPage from '../../components/pages/AdvicesPage'
import { GetServerSideProps } from 'next'
import { addApolloState, initializeApollo } from '../../api/apollo-client'
import { getTotalCount } from 'src/utils/getTotalCount'
import { totalSalons } from 'src/api/graphql/salon/queries/totalSalons'
import { totalMasters } from 'src/api/graphql/master/queries/totalMasters'
import { totalBrands } from 'src/api/graphql/brand/queries/totalBrands'
import { getFeedCategories } from 'src/api/graphql/feed/queries/getFeedCategories'
import { getFeeds } from 'src/api/graphql/feed/queries/getFeeds'
import { Nullable } from '@/types/common'
import { getPrepareData } from '@/utils/newUtils/getPrepareData'
import { IBeautyCategories, IFeed } from '@/types/feed'

interface IAdvicesPageProps {
  categories: IBeautyCategories[]
  allAdvices: IFeed[]
  totalCount: {
    brands: number
    masters: number
    salons: number
  }
}

const Advices = ({ categories, allAdvices, totalCount }: IAdvicesPageProps) => {
  return (
    <AdvicesPage
      categories={categories}
      allAdvices={allAdvices}
      totalCount={totalCount}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo()

  const data = await Promise.allSettled([
    apolloClient.query({
      query: getFeedCategories,
    }),
    apolloClient.query({
      query: getFeeds,
    }),
  ])

  const countsData = await Promise.all([
    apolloClient.query({
      query: totalSalons,
    }),
    apolloClient.query({
      query: totalMasters,
    }),
    apolloClient.query({
      query: totalBrands,
    }),
  ])

  const categories =
    getPrepareData<IBeautyCategories[]>(data[0], 'feedCategories') || []
  const allAdvices = getPrepareData<IFeed[]>(data[1], 'feeds') || []

  const totalCount = {
    brands: getTotalCount(countsData[2].data.brands) || 0,
    masters: getTotalCount(countsData[1].data.masters) || 0,
    salons: getTotalCount(countsData[0].data.salons) || 0,
  }

  return addApolloState(apolloClient, {
    props: {
      meta: {
        title: 'Советы и статьи | MOI salon',
        description:
          'Полезные советы, статьи и рекомендации от экспертов индустрии красоты на платформе MOI salon',
        image: '/services-page-photo1.jpg',
        url: '/advices',
      },
      schema: {
        type: 'Blog',
        data: {
          name: 'Советы и статьи MOI salon',
          description:
            'Полезные советы, статьи и рекомендации от экспертов индустрии красоты на платформе MOI salon',
          url: 'https://moi.salon/advices',
          publisher: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          },
          blogPost: allAdvices.map(post => ({
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.shortDescription,
            image:
              process.env.NEXT_PUBLIC_PHOTO_URL + post.cover?.url ||
              '/services-page-photo1.jpg',
            datePublished: post.createdAt,
            author: {
              '@type': 'Organization',
              name: 'MOI salon',
            },
          })),
        },
      },
      categories,
      allAdvices,
      totalCount,
    },
  })
}

export default Advices
