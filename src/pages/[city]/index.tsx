import { addApolloState, initializeApollo } from '../../api/apollo-client'
import MainPage from '../../components/pages/MainPage'
import { getBannerHooks } from '../../api/graphql/banner/queries/getBannerHooks'
import { getFeeds } from '../../api/graphql/feed/queries/getFeeds'
import { getFeedCategories } from 'src/api/graphql/feed/queries/getFeedCategories'
import { totalSalons } from 'src/api/graphql/salon/queries/totalSalons'
import { totalMasters } from 'src/api/graphql/master/queries/totalMasters'
import { totalBrands } from 'src/api/graphql/brand/queries/totalBrands'
import {} from 'src/api/graphql/master/queries/masterPage'
import { GetServerSideProps } from 'next'
import { defaultValues } from 'src/api/authConfig'
import { ICity } from 'src/types'
import { fetchCity } from 'src/api/utils/fetchCity'
import { getTotalCount } from 'src/utils/getTotalCount'
import { ITotalCount } from './salon'
import { Nullable } from 'src/types/common'

interface Props {
  beautyCategories: any
  beautyAllContent: any
  bannerHooks: any
  totalCount: ITotalCount
  cityData: ICity
}

export default function Main({
  beautyCategories,
  beautyAllContent,
  bannerHooks,
  totalCount,
  cityData,
}: Props) {
  return (
    <>
      {/* <Head>
        <title>{`Все лучшие салоны красоты и spa (спа) в городе ${cityData}, отзывы, рейтинги - moi.salon`}</title>
        <meta
          name="description"
          content={`✔ Все салоны красоты и spa (спа) в городе ${cityData} ⭐ Выбирайте лучшие салоны красоты по рейтингам и отзывам посетителей. ✅ У нас представлено ${
            salons?.salonSearch?.salonsConnection?.totalCount
          } ${pluralize(
            salons?.salonSearch?.salonsConnection?.totalCount,
            "салон",
            "салона",
            "салонов"
          )} в городе ${cityData}. ✅ Делайте правильный выбор с помощью сервиса moi.salon.`}
        />
      </Head> */}
      <MainPage
        beautyCategories={beautyCategories}
        beautyAllContent={beautyAllContent}
        bannerHooks={bannerHooks}
        totalCount={totalCount}
        cityData={cityData.name}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const apolloClient = initializeApollo()
  const data = await Promise.all([
    apolloClient.query({
      query: getFeedCategories,
    }),
    apolloClient.query({
      query: getFeeds,
    }),
    apolloClient.query({
      query: getBannerHooks,
    }),
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

  const cityCookie = ctx.req.cookies['city']
  const cityData: ICity = (await fetchCity(ctx.query.city as string)) ||
    (await fetchCity(cityCookie)) || {
      slug: defaultValues.citySlug,
    }

  if (!cityCookie && ctx.query.city !== defaultValues.citySlug) {
    return {
      redirect: {
        destination: defaultValues.citySlug,
        permanent: true,
      },
    }
  }

  return addApolloState(apolloClient, {
    props: {
      data,
      beautyCategories: data[0]?.data?.feedCategories,
      beautyAllContent: data[1]?.data?.feeds,
      bannerHooks: data[2]?.data?.bannerHooks,
      totalCount: {
        brands: getTotalCount(data[1].data.brands),
        masters: getTotalCount(data[2].data.masters),
        salons: getTotalCount(data[3].data.salons),
      },
      cityData,
    },
  })
}
