import { gql } from "@apollo/client";

export const catalogsQuery = gql`
  query CatalogsQuery {
    salonActivitiesCatalog {
      ...ServiceCatalog
    }
    salonServicesCatalog {
      ...ServiceCatalog
    }
    salonWorkplacesServicesCatalog {
      ...ServiceCatalog
    }
    masterSpecializationsCatalog {
      ...ServiceCatalog
    }
    salonRoomServicesCatalog {
      ...ServiceCatalog
    }
    salonServicesMasterCatalog {
      ...ServiceCatalog
    }
  }

  fragment ServiceCatalog on ServiceCatalog {
    groups {
      id
      title
      description
      items {
        ...ServiceCatalogItem
      }
      subGroups {
        id
        title
        description
        items {
          ...ServiceCatalogItem
        }
      }
    }
  }

  fragment ServiceCatalogItem on ServiceCatalogItem {
    id
    kind
    title
  }
`;
