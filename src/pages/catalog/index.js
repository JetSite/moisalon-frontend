import React, { Fragment } from "react";
import CatalogPage from "../../components/pages/CatalogPage";
import { addApolloState, initializeApollo } from "../../api/apollo-client";

const Catalog = () => {
  return (
    <Fragment>
      <CatalogPage />
    </Fragment>
  );
};

export const getServerSideProps = async () => {
  const apolloClient = initializeApollo();

  return addApolloState(apolloClient, {
    props: {
      meta: {
        title: "Каталог | MOI salon",
        description: "Полный каталог услуг, салонов, мастеров и брендов на платформе MOI salon",
        image: "/mobile-main-bg.jpg",
        url: "https://moi.salon/catalog",
      },
    },
  });
};

export default Catalog;
