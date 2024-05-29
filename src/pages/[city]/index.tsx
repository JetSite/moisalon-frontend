import { addApolloState, initializeApollo } from '../../api/apollo-client'
import MainPage from '../../components/pages/MainPage'
import { getBannerHooks } from '../../api/graphql/banner/queries/getBannerHooks'
import { getFeeds } from '../../api/graphql/feed/queries/getFeeds'
import { getFeedCategories } from 'src/api/graphql/feed/queries/getFeedCategories'
import { totalSalons } from 'src/api/graphql/salon/queries/totalSalons'
import { totalMasters } from 'src/api/graphql/master/queries/totalMasters'
import { totalBrands } from 'src/api/graphql/brand/queries/totalBrands'
import {} from 'src/api/graphql/master/queries/masterPage'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { GetServerSideProps } from 'next'
import { getStoreData, getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { useEffect } from 'react'
import { authConfig, defaultValues } from 'src/api/authConfig'
import { ICity } from 'src/types'
import { getCookie } from 'cookies-next'
import { getSearchCity } from 'src/api/graphql/city/getSearchCity'
import { fetchCity } from 'src/api/utils/fetchCity'
import { getTotalCount } from 'src/utils/getTotalCount'
import { ITotalCount } from './salon'

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
  // const [city, setCity] = useContext(CityContext);
  // const [query, setQuery] = useContext(SearchMainQueryContext);
  // const router = useRouter();

  // const { refetch } = useQuery(currentUserSalonsAndMasterQuery, {
  //   skip: true,
  //   onCompleted: (res) => {
  //     setMe({
  //       info: res?.me?.info,
  //       master: res?.me?.master,
  //       locationByIp: res?.locationByIp,
  //       salons: res?.me?.salons,
  //       rentalRequests: res?.me?.rentalRequests,
  //     });
  //   },
  // });

  // const [changeCityFunc] = useMutation(changeCityMutation, {
  //   onCompleted: () => {
  //     refetch();
  //   },
  // });

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     if (
  //       localStorage.getItem("citySalon") !== cityData ||
  //       (localStorage.getItem("citySalon") === "Москва" &&
  //         router?.query?.city !== "moskva")
  //     ) {
  //       localStorage.setItem("citySalon", cityData);
  //       changeCityFunc({
  //         variables: {
  //           city: cityData,
  //         },
  //       });
  //       setCity(cityData);
  //       setQuery({ ...query, city: cityData });
  //       if (router?.query?.city !== "moskva" && cityData === "Москва") {
  //         router.replace({
  //           query: { ...router.query, city: cyrToTranslit(cityData) },
  //         });
  //       }
  //     }
  //   }
  // }, []);

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
        cityData={cityData.cityName}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
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
    // apolloClient.query({
    //   query: salesSearch,
    //   variables: { query: "" },
    // }),
    // apolloClient.query({
    //   query: searchQuery,
    //   variables: {
    //     input: {
    //       ...EmptySearchQuery,
    //       city: city?.data?.citySuggestions[0]?.data?.city || "",
    //       query: "",
    //       lessor: false,
    //     },
    //   },
    // }),
  ])

  const cityCookie = ctx.req.cookies['city']
  const cityData: ICity = (await fetchCity(ctx.query.city as string)) ||
    (await fetchCity(cityCookie)) || {
      citySlug: defaultValues.citySlug,
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
      // sales: data[8]?.data,
      // salons: data[9]?.data,
      cityData,
    },
  })
}
