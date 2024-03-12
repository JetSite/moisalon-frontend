import { gql } from "@apollo/client";

export const vacancySearchById = gql`
  query Vacancies($id: String) {
    vacancy(id: $id) {
      id
      title
      desc
      originId
      isPublished
      short_desc
      createAt
      amountFrom
      amountTo
      originId
      origin
      photoId
      salonOrigin {
        name
        address {
          city
        }
      }
      brandOrigin {
        name
        addressFull {
          city
        }
      }
    }
  }
`;
