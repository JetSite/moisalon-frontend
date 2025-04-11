import { addApolloState, initializeApollo } from '../../api/apollo-client';
import MainPage, { IMainPageProps } from '../../components/pages/MainPage';
import { getBannerHooks } from '../../api/graphql/banner/queries/getBannerHooks';
import { getFeeds } from '../../api/graphql/feed/queries/getFeeds';
import { getFeedCategories } from 'src/api/graphql/feed/queries/getFeedCategories';
import { totalSalons } from 'src/api/graphql/salon/queries/totalSalons';
import { totalMasters } from 'src/api/graphql/master/queries/totalMasters';
import { totalBrands } from 'src/api/graphql/brand/queries/totalBrands';
import {} from 'src/api/graphql/master/queries/masterPage';
import { GetServerSideProps } from 'next';
import { ICity } from 'src/types';
import { fetchCity } from 'src/api/utils/fetchCity';
import { getTotalCount } from 'src/utils/getTotalCount';
import { Nullable } from 'src/types/common';
import { FC } from 'react';
import { getPrepareData } from 'src/utils/newUtils/getPrepareData';
import { IBannerHook } from 'src/types/banners';
import { IBeautyCategories, IFeed } from '@/types/feed';

type Props = IMainPageProps;

const Main: FC<Props> = props => {
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
      <MainPage {...props} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  Nullable<Props>
> = async ctx => {
  const apolloClient = initializeApollo();
  const data = await Promise.allSettled([
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
  ]);

  const cityData: ICity = await fetchCity(ctx.query['city'] as string, ctx);

  if (ctx.query['city'] !== cityData.slug) {
    return {
      notFound: true,
      redirect: {
        destination: cityData.slug,
        permanent: false,
      },
    };
  }

  const beautyCategories = getPrepareData<IBeautyCategories[]>(
    data[0],
    'feedCategories',
  );
  const beautyAllContent = getPrepareData<IFeed[]>(data[1], 'feeds');
  const bannerHooks = getPrepareData<IBannerHook[]>(data[2], 'bannerHooks');

  return addApolloState(apolloClient, {
    props: {
      beautyCategories,
      beautyAllContent,
      bannerHooks,
      totalCount: {
        brands:
          data[5].status === 'fulfilled'
            ? getTotalCount(data[5].value.data.brands)
            : null,
        masters:
          data[4].status === 'fulfilled'
            ? getTotalCount(data[4].value.data.masters)
            : null,
        salons:
          data[3].status === 'fulfilled'
            ? getTotalCount(data[3].value.data.salons)
            : null,
      },
      cityData,
    },
  });
};

export default Main;
