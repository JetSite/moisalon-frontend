import { useEffect, useContext } from 'react'
import Head from 'next/head'
import { addApolloState, initializeApollo } from '../../apollo-client'
import MainPage from '../../components/pages/MainPage'
import { getCategories } from '../../_graphql-legacy/advices/getCategories'
import { getAll } from '../../_graphql-legacy/advices/getAll'
import { bannersByHookCodeQuery } from '../../_graphql-legacy/baners/bannersHooks'
import { citySuggestionsQuery } from '../../_graphql-legacy/city/citySuggestionsQuery'
import {
  MeContext,
  CityContext,
  SearchMainQueryContext,
  EmptySearchQuery,
} from '../../searchContext'
import { salesSearch } from '../../_graphql-legacy/sales/salesSearch'
import { searchQuery } from '../../_graphql-legacy/search/searchQuery'
import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { currentUserSalonsAndMasterQuery } from '../../_graphql-legacy/master/currentUserSalonsAndMasterQuery'
import { changeCityMutation } from '../../_graphql-legacy/city/changeCityMutation'
import { cyrToTranslit } from '../../utils/translit'
import { pluralize } from '../../utils/pluralize'
import { getSalons } from '../../graphql/salon/queries/getSalons'
import { getBannerHooks } from '../../graphql/banner/queries/getBannerHooks'
import { getFeeds } from '../../graphql/feed/queries/getFeeds'
import { getFeedCategories } from 'src/graphql/feed/queries/getFeedCategories'
import { totalSalons } from 'src/graphql/salon/queries/totalSalons'
import { totalMasters } from 'src/graphql/master/queries/totalMasters'
import { totalBrands } from 'src/graphql/brand/queries/totalBrands'

export default function AppContent({
  beautyCategories,
  beautyAllContent,
  bannerHooks,
  totalSalons,
  totalMasters,
  totalBrands,
  cityData,
}) {
  // const [me, setMe] = useContext(MeContext);
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
        totalSalons={totalSalons}
        totalMasters={totalMasters}
        totalBrands={totalBrands}
        cityData={cityData}
      />
    </>
  )
}

export async function getServerSideProps(ctx) {
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

  return addApolloState(apolloClient, {
    props: {
      beautyCategories: data[0]?.data?.feedCategories,
      beautyAllContent: data[1]?.data?.feeds,
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
