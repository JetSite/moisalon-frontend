import { gql } from "@apollo/client";

export const updateBrandPhotoMutation = gql`
  mutation updateBrandPhotoMutation($input: UpdateBrandPhotoInput!) {
    updateBrandPhoto(input: $input) {
      id
      logoId
      photo(kind: "medium") {
        id
        kind
        url
      }
    }
  }
`;