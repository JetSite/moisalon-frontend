import { useEffect, useContext } from 'react'
import Head from 'next/head'
import { addApolloState, initializeApollo } from '../../apollo-client'
import MainPage from '../../components/pages/MainPage'
import { totalSalons } from '../../_graphql-legacy/salon/totalSalons'
import { totalMasters } from '../../_graphql-legacy/master/totalMasters'
import { totalBrands } from '../../_graphql-legacy/brand/totalBrands'
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
import { getServiceCategories } from '../../graphql/service/queries/getServiceCategories'
import { getProductCategories } from '../../graphql/product/queries/getProductCategories'

export default function AppContent({
  // totalSalons,
  // totalMasters,
  // totalBrands,
  // beautyCategories,
  // beautyAllContent,
  // bannersByHookWide,
  // bannersByHookSmall1,
  // bannersByHookSmall2,
  // sales,
  // salons,
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

  const { data } = useQuery(totalSalons)

  console.log(data)

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
        // totalSalons={totalSalons}
        // totalMasters={totalMasters}
        // totalBrands={totalBrands}
        // beautyCategories={beautyCategories}
        // beautyAllContent={beautyAllContent}
        // sales={sales}
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
    // apolloClient.query({
    //   query: totalSalons,
    // }),
    // apolloClient.query({
    //   query: totalMasters,
    // }),
    // apolloClient.query({
    //   query: totalBrands,
    // }),
    // apolloClient.query({
    //   query: getCategories,
    //   context: { uri: "https://moi.salon/graphql" },
    // }),
    // apolloClient.query({
    //   query: getAll,
    //   context: { uri: "https://moi.salon/graphql" },
    // }),
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

  debugger

  return addApolloState(apolloClient, {
    props: {
      // totalSalons: data[0]?.data?.totalSalons,
      // totalMasters: data[1]?.data?.totalMasters,
      // totalBrands: data[2]?.data?.totalBrands,
      // beautyCategories: data[3]?.data?.catagories,
      // beautyAllContent: data[4]?.data?.pages,
      // bannersByHookWide: data[5]?.data,
      // bannersByHookSmall1: data[6]?.data,
      // bannersByHookSmall2: data[7]?.data,
      // sales: data[8]?.data,
      // salons: data[9]?.data,
      cityData: 'Москва',
    },
  })
}
