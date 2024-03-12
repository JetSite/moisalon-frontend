import { useEffect } from "react";
import { initializeApollo } from "../../../../../../apollo-client";
import { cyrToTranslit } from "../../../../../utils/translit";
import { brandSearchAllName } from "../../../../../_graphql-legacy/search/brandSearchAllName";
import { useRouter } from "next/router";

const DynamicPage = ({ city, id }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(`/${city}/brand/${id}`);
  });
  return null;
};

export const getStaticProps = async ({ params }) => {
  return {
    props: {
      id: params?.id,
      city: params?.city,
    },
  };
};

export const getStaticPaths = async () => {
  const apolloClient = initializeApollo();
  const brandQueryRes = await apolloClient.query({
    query: brandSearchAllName,
    variables: {
      query: "",
    },
  });
  return {
    paths: brandQueryRes.data.brandsSearch.connection.nodes.map((item) => {
      return {
        params: {
          city: `${cyrToTranslit(item?.addressFull?.city || "Москва")}`,
          id: `${item?.seo?.slug || item?.id}`,
        },
      };
    }),
    fallback: false,
  };
};

export default DynamicPage;
