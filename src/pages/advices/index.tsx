import { addApolloState, initializeApollo } from '../../api/apollo-client'
import { getTotalCount } from 'src/utils/getTotalCount'
import { totalSalons } from 'src/api/graphql/salon/queries/totalSalons'
import { totalMasters } from 'src/api/graphql/master/queries/totalMasters'
import { totalBrands } from 'src/api/graphql/brand/queries/totalBrands'
import AdvicesPage, {
  IAdvicesPageProps,
} from 'src/components/pages/AdvicesPage'
import { getFeedCategories } from 'src/api/graphql/feed/queries/getFeedCategories'
import { getFeeds } from 'src/api/graphql/feed/queries/getFeeds'
import { GetServerSideProps, NextPage } from 'next'
import { Nullable } from '@/types/common'
import { getPrepareData } from '@/utils/newUtils/getPrepareData'
import { IBeautyCategories, IFeed } from '@/types/feed'
import MainHead from '../MainHead'
import { Fragment } from 'react'

const Advices: NextPage<IAdvicesPageProps> = ({
  categories,
  allAdvices,
  totalCount,
}) => {
  return (
    <Fragment>
      <MainHead
        title="Советы и статьи | MOI salon"
        description="Полезные советы, статьи и рекомендации от экспертов индустрии красоты на платформе MOI salon"
        image="/services-page-photo1.jpg"
      />
      <AdvicesPage
        categories={categories}
        allAdvices={allAdvices}
        totalCount={totalCount}
      />
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<IAdvicesPageProps>
> = async ctx => {
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

  const categories = getPrepareData<IBeautyCategories[]>(
    data[0],
    'feedCategories',
  )
  const allAdvices = getPrepareData<IFeed[]>(data[1], 'feeds')

  return addApolloState(apolloClient, {
    props: {
      categories,
      allAdvices,
      totalCount: {
        brands: getTotalCount(countsData[2].data.brands),
        masters: getTotalCount(countsData[1].data.masters),
        salons: getTotalCount(countsData[0].data.salons),
      },
    },
  })
}

export default Advices
