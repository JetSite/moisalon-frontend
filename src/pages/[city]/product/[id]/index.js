import SearchBlock from "../../../../components/blocks/SearchBlock";
import ProductPage from "../../../../components/pages/ProductPage";
import MainLayout from "../../../../layouts/MainLayout";
import { addApolloState, initializeApollo } from "../../../../../apollo-client";
import { reviewsforProductB2c } from "../../../../_graphql-legacy/reviewsforProductB2c";
import { productSearch } from "../../../../_graphql-legacy/product";

const Product = ({ product, dataReviews }) => {
  return (
    <MainLayout>
      <>
        <SearchBlock />
        <ProductPage product={product} dataReviews={dataReviews} />
      </>
    </MainLayout>
  );
};

export async function getServerSideProps({ params }) {
  const apolloClient = initializeApollo();

  const product = await apolloClient.query({
    query: productSearch,
    variables: {
      id: params.id,
    },
  });

  const reviews = await apolloClient.query({
    query: reviewsforProductB2c,
    variables: {
      originId: product?.data?.product?.id,
    },
  });

  return addApolloState(apolloClient, {
    props: {
      product: product?.data?.product,
      dataReviews: reviews?.data || [],
    },
  });
}

export default Product;
