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
      schema: {
        type: 'CollectionPage',
        data: {
          name: "Каталог | MOI salon",
          description: "Полный каталог услуг, салонов, мастеров и брендов на платформе MOI salon",
          url: "https://moi.salon/catalog",
          image: "https://moi.salon/mobile-main-bg.jpg",
          publisher: {
            '@type': 'Organization',
            name: 'MOI salon',
            url: 'https://moi.salon',
          },
          mainEntity: {
            '@type': 'ItemList',
            name: 'Каталог услуг и предложений',
            description: 'Полный каталог услуг, салонов, мастеров и брендов индустрии красоты',
            itemListElement: []
          }
        }
      }
    },
  });
};

export default Catalog;
