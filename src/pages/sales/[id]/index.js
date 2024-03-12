import { addApolloState, initializeApollo } from "../../../../apollo-client";
import { salesSearchById } from "../../../_graphql-legacy/sales/salesSearchById";
import SalePage from "../../../components/pages/SalePage";
import { getCategories } from "../../../_graphql-legacy/advices/getCategories";
import { getAll } from "../../../_graphql-legacy/advices/getAll";

const SaleDetailed = ({ sale, beautyCategories, beautyAllContent }) => {
  return (
    <SalePage
      sale={sale}
      loading={false}
      beautyCategories={beautyCategories}
      beautyAllContent={beautyAllContent}
    />
  );
};

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();

  const saleRes = await apolloClient.query({
    query: salesSearchById,
    variables: { id: params.id },
  });

  const categories = await apolloClient.query({
    query: getCategories,
    context: { uri: "https://moi.salon/graphql" },
  });
  const all = await apolloClient.query({
    query: getAll,
    context: { uri: "https://moi.salon/graphql" },
  });

  return addApolloState(apolloClient, {
    props: {
      sale: saleRes?.data?.sale,
      beautyCategories: categories?.data?.catagories,
      beautyAllContent: all.data?.pages,
    },
  });
}

export default SaleDetailed;
