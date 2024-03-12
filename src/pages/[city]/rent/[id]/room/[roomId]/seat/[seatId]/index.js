import Head from "next/head";
import { useContext } from "react";
import {
  addApolloState,
  initializeApollo,
} from "../../../../../../../../../apollo-client";
import RentHeader from "../../../../../../../../components/pages/Rent/RentHeader";
import SearchBlock from "../../../../../../../../components/blocks/SearchBlock";
import { citySuggestionsQuery } from "../../../../../../../../_graphql-legacy/city/citySuggestionsQuery";
import { salonQuery } from "../../../../../../../../_graphql-legacy/salon/salonQuery";
import { salonSlugQuery } from "../../../../../../../../_graphql-legacy/salon/salonSlugQuery";
import { seatQuery } from "../../../../../../../../_graphql-legacy/salon/seatQuery";
import MainLayout from "../../../../../../../../layouts/MainLayout";
import { CityContext } from "../../../../../../../../searchContext";
import { cyrToTranslit } from "../../../../../../../../utils/translit";

const Seat = ({ salonData, roomData }) => {
  const [city] = useContext(CityContext);
  const seoData = roomData?.seat?.seo;

  return (
    <MainLayout>
      <Head>
        {seoData?.title ? <title>{seoData?.title}</title> : null}
        {seoData?.description ? (
          <meta name="description" content={seoData?.description} />
        ) : null}
        {salonData?.logo?.url ? (
          <meta property="og:image" content={salonData?.logo?.url} />
        ) : null}
      </Head>
      <>
        <SearchBlock />
        <RentHeader city={city} salonData={salonData} roomData={roomData} />
      </>
    </MainLayout>
  );
};

export async function getServerSideProps({ params, query }) {
  const apolloClient = initializeApollo();

  const salonQueryRes = await apolloClient.query({
    query: salonSlugQuery,
    variables: { slug: params.id },
  });

  const city = await apolloClient.query({
    query: citySuggestionsQuery,
    variables: {
      city: query?.city || "",
      count: 1,
    },
  });

  const id = salonQueryRes?.data?.salonSlug?.id;
  const data = await Promise.all([
    apolloClient.query({
      query: salonQuery,
      variables: { id: id, filterDefinition: "" },
    }),
    apolloClient.query({
      query: seatQuery,
      variables: { salonId: id, roomId: query?.roomId, seatId: query?.seatId },
    }),
  ]);

  if (
    !id ||
    !city?.data?.citySuggestions[0]?.data?.city ||
    (data[0]?.data?.salon?.address?.city &&
      cyrToTranslit(data[0]?.data?.salon?.address?.city) !== query?.city)
  ) {
    return {
      notFound: true,
    };
  }

  return addApolloState(apolloClient, {
    props: {
      salonData: data[0]?.data?.salon,
      roomData: data[1]?.data?.salon?.room,
    },
  });
}

export default Seat;
