import { useContext } from "react";
import React from "react";
import { addApolloState, initializeApollo } from "../../../../apollo-client";
import { EmptySearchQuery } from "../../../searchContext";
import { searchQuery } from "../../../_graphql-legacy/search/searchQuery";
import CategoryPageLayout from "../../../layouts/CategoryPageLayout";
import AllSalonsPage from "../../../components/pages/Salon/AllSalons";
import { totalSalons } from "../../../_graphql-legacy/salon/totalSalons";
import { totalMasters } from "../../../_graphql-legacy/master/totalMasters";
import { totalBrands } from "../../../_graphql-legacy/brand/totalBrands";
import { MeContext } from "../../../searchContext";
import { citySuggestionsQuery } from "../../../_graphql-legacy/city/citySuggestionsQuery";
import useCheckCity from "../../../hooks/checkCity";
import { servicesWithSalonCount } from "../../../_graphql-legacy/services/servicesWithSalonCount";

const AllSalons = ({
  salonSearch,
  totalBrands,
  totalMasters,
  totalSalons,
  salonServices,
  cityData,
}) => {
  const [me, setMe] = useContext(MeContext);
  useCheckCity(cityData);

  return (
    <CategoryPageLayout loading={false} me={me}>
      <AllSalonsPage
        totalBrands={totalBrands}
        totalMasters={totalMasters}
        totalSalons={totalSalons}
        salonSearch={salonSearch}
        salonServices={salonServices}
        me={me}
      />
    </CategoryPageLayout>
  );
};

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo();
  const city = await apolloClient.query({
    query: citySuggestionsQuery,
    variables: {
      city: ctx?.query?.city || "",
      count: 1,
    },
  });

  const data = await Promise.all([
    apolloClient.query({
      query: searchQuery,
      variables: {
        input: {
          ...EmptySearchQuery,
          city: city?.data?.citySuggestions[0]?.data?.city || "",
          query: "",
          lessor: false,
        },
      },
    }),
    apolloClient.query({
      query: totalBrands,
    }),
    apolloClient.query({
      query: totalMasters,
    }),
    apolloClient.query({
      query: totalSalons,
    }),
    apolloClient.query({
      query: servicesWithSalonCount,
    }),
  ]);

  if (!city?.data?.citySuggestions[0]?.data?.city) {
    return {
      redirect: {
        destination: "/moskva/salon",
        permanent: true,
      },
    };
  }

  return addApolloState(apolloClient, {
    props: {
      salonSearch: data[0]?.data?.salonSearch,
      totalBrands: data[1]?.data.totalBrands,
      totalMasters: data[2]?.data.totalMasters,
      totalSalons: data[3]?.data.totalSalons,
      salonServices: data[4]?.data?.salonServicesCount,
      cityData: city?.data?.citySuggestions[0]?.data?.city || "Москва",
    },
  });
}

export default AllSalons;
