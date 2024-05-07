import { gql } from "@apollo/client";
import { metaInfo } from "../../common/metaInfo";

export const getServiceCategories = gql`
  query serviceCategories {
    serviceCategories {
      data {
        id
        attributes {
            serviceCategoryName
            services {
              data {
                id
                attributes {
                    serviceName
                }
              }
            }
        }
      }
      ${metaInfo}
    }
  }
`;
