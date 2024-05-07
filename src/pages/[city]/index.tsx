import { addApolloState, initializeApollo } from '../../api/apollo-client'
import MainPage from '../../components/pages/MainPage'
import { getBannerHooks } from '../../api/graphql/banner/queries/getBannerHooks'
import { getFeeds } from '../../api/graphql/feed/queries/getFeeds'
import { getFeedCategories } from 'src/api/graphql/feed/queries/getFeedCategories'
import { totalSalons } from 'src/api/graphql/salon/queries/totalSalons'
import { totalMasters } from 'src/api/graphql/master/queries/totalMasters'
import { totalBrands } from 'src/api/graphql/brand/queries/totalBrands'
import { getMaster } from 'src/api/graphql/master/queries/getMaster'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'
import { GetServerSideProps } from 'next'
import { getStoreEvent } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'
import { useEffect } from 'react'

interface Props {
  beautyCategories: any
  beautyAllContent: any
  bannerHooks: any
  totalSalons: any
  totalMasters: any
  totalBrands: any
  cityData: string
}

export default function Main({
  beautyCategories,
  beautyAllContent,
  bannerHooks,
  totalSalons,
  totalMasters,
  totalBrands,
  cityData,
}: Props) {
  const { setCity } = useAuthStore(getStoreEvent)
  useEffect(() => {
    setCity(cityData)
  }, [setCity])

  // setMe(cityData)
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

  // const { data } = useQuery(getMaster, {
  //   variables: { id: 1 },
  // })

  // console.log(data)

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
        totalSalons={totalSalons}
        totalMasters={totalMasters}
        totalBrands={totalBrands}
        cityData={cityData}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apolloClient = initializeApollo()
  // const city = await apolloClient.query({
  //   query: citySuggestionsQuery,
  //   variables: {
  //     city: ctx?.query?.city || "",
  //     count: 1,
  //   },
  // });
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

  // if (!city?.data?.citySuggestions[0]?.data?.city) {
  //   return {
  //     redirect: {
  //       destination: "/moskva",
  //       permanent: true,
  //     },
  //   };
  // }

  const normalisedBeautyCategories = flattenStrapiResponse(
    data[0]?.data?.feedCategories,
  )
  const normalisedBeautyAllContent = flattenStrapiResponse(data[1]?.data?.feeds)

  return addApolloState(apolloClient, {
    props: {
      beautyCategories: normalisedBeautyCategories,
      beautyAllContent: normalisedBeautyAllContent,
      bannerHooks: data[2]?.data?.bannerHooks,
      totalSalons: data[3]?.data?.salons?.meta?.pagination?.total,
      totalMasters: data[4]?.data?.masters?.meta?.pagination?.total,
      totalBrands: data[5]?.data?.brands?.meta?.pagination?.total,
      // sales: data[8]?.data,
      // salons: data[9]?.data,
      cityData: 'Москва',
    },
  })
}
