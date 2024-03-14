import { gql } from "@apollo/client";
import { metaInfo } from "../../common/metaInfo";
import { imageInfo } from "../../common/imageInfo";

export const getMasters = gql`
  query masters {
    masters {
      data {
        id
        attributes {
            masterName
            masterPhone
            masterEmail
            salons {
              data {
                id
                attributes {
                    salonName
                }
              }
            }
            services {
              data {
                id
                attributes {
                    serviceName
                }
              }
            }
            city
            masterPhoto {
              ${imageInfo}
            }
            masterGallery {
              ${imageInfo}
            }
        }
      }
      ${metaInfo}
    }
  }
`;
