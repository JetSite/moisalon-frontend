import { initializeApollo } from '../../../api/apollo-client'
import CategoryPageLayout from '../../../layouts/CategoryPageLayout'
import AllMastersPage, {
  IMastersPageProps,
} from '../../../components/pages/Master/AllMasters'
import { GetServerSideProps } from 'next'
import { getMastersTroughCity } from 'src/api/graphql/master/queries/getMastersTroughCity'
import { FC, Fragment } from 'react'
import { IMaster } from 'src/types/masters'
import { IPagination } from 'src/types'
import { getTotalCount } from 'src/utils/getTotalCount'
import { fetchCity } from 'src/api/utils/fetchCity'
import { IBrand } from 'src/types/brands'
import { BRANDS } from 'src/api/graphql/brand/queries/getBrands'
import { getMasters } from 'src/api/graphql/master/queries/getMasters'
import { getSalons } from 'src/api/graphql/salon/queries/getSalons'
import { ISalon } from 'src/types/salon'
import { getRating } from 'src/utils/newUtils/getRating'
import { Nullable } from 'src/types/common'
import { MIN_SEARCH_LENGTH } from 'src/components/pages/MainPage/components/SearchMain/utils/useSearch'
import { getPrepareData } from 'src/utils/newUtils/getPrepareData'
import MainHead from '../../MainHead'

interface Props extends IMastersPageProps {
  brands: IBrand[] | null
  masters: IMaster[] | null
  salons: ISalon[] | null
}

const AllMasters: FC<Props> = ({ masters, salons, brands, ...props }) => {
  const layout = { brands, masters, salons }

  return (
    <Fragment>
      <MainHead
        title={`Мастера красоты в ${props.cityData.name} | MOI salon`}
        description={`Каталог мастеров красоты в ${props.cityData.name}. Поиск по услугам, ценам и отзывам на платформе MOI salon`}
        image="/masters-page-right.png"
      />
      <CategoryPageLayout {...layout}>
        <AllMastersPage {...props} />
      </CategoryPageLayout>
    </Fragment>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const apolloClient = initializeApollo()
  const cityParam = ctx.query['city'] as string
  const cityData = await fetchCity(cityParam, ctx)

  const search = ctx.query['search']?.length >= MIN_SEARCH_LENGTH

  const queries = [
    apolloClient.query({
      query: BRANDS,
      variables: {
        itemsCount: 10,
      },
    }),
    apolloClient.query({
      query: getMasters,
      variables: {
        slug: cityParam,
        itemsCount: 10,
      },
    }),
    apolloClient.query({
      query: getSalons,
      variables: {
        slug: cityParam,
        itemsCount: 10,
      },
    }),
  ]

  if (!search) {
    queries.push(
      apolloClient.query({
        query: getMastersTroughCity,
        variables: {
          pageSize: 10,
          slug: [cityParam],
        },
      }),
    )
  }

  let masterData: IMaster[] | null = null
  let pagination: IPagination | null = null

  const data = await Promise.allSettled(queries)

  const brands = getPrepareData<IBrand[]>(data[0], 'brands')
  const masters = getPrepareData<IMaster[]>(data[1], 'masters')
  const salons = getPrepareData<ISalon[]>(data[2], 'salons')

  if (data.length >= 4) {
    masterData = getPrepareData<IMaster[]>(data[3], 'masters')
    pagination =
      data[3].status === 'fulfilled'
        ? data[3].value.data.masters.meta.pagination
        : null
  }

  return {
    notFound: !cityData?.name,
    props: {
      masterData: !masterData
        ? null
        : masterData.map(e => {
            const reviewsCount = e.reviews?.length || 0
            const { rating, ratingCount } = getRating(e.ratings)
            return { ...e, rating, ratingCount, reviewsCount }
          }),
      brands: !brands
        ? null
        : brands.map(e => {
            const reviewsCount = e.reviews?.length || 0
            const { rating, ratingCount } = getRating(e.ratings)
            return { ...e, rating, ratingCount, reviewsCount }
          }),
      masters: !masters
        ? null
        : masters.map(e => {
            const reviewsCount = e.reviews?.length || 0
            const { rating, ratingCount } = getRating(e.ratings)
            return { ...e, rating, ratingCount, reviewsCount }
          }),
      salons: !salons
        ? null
        : salons.map(e => {
            const reviewsCount = e.reviews?.length || 0
            const { rating, ratingCount } = getRating(e.ratings)
            return { ...e, rating, ratingCount, reviewsCount }
          }),
      totalCount: {
        brands:
          data[0].status === 'fulfilled'
            ? getTotalCount(data[0].value.data.brands)
            : null,
        masters:
          data[1].status === 'fulfilled'
            ? getTotalCount(data[1].value.data.masters)
            : null,
        salons:
          data[2].status === 'fulfilled'
            ? getTotalCount(data[2].value.data.salons)
            : null,
      },
      cityData,
      pagination,
    },
  }
}

export default AllMasters
