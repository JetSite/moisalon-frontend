import { useEffect } from "react";
import { initializeApollo } from "../../../../../../apollo-client";
import { cyrToTranslit } from "../../../../../utils/translit";
import { masterSearchAllQuery } from "../../../../../_graphql-legacy/search/masterAllSearch";
import { useRouter } from "next/router";

const DynamicPage = ({ city, id }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(`/${city}/master/${id}`);
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
  const masterQueryRes = await apolloClient.query({
    query: masterSearchAllQuery,
    variables: {
      input: {
        query: "",
      },
    },
  });
  return {
    paths: masterQueryRes.data.masterSearch.connection.nodes.map((item) => {
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
