import { gql } from "@apollo/client";

export const addBrandProductsPhotosMutation = gql`
  mutation addBrandProductsPhotos($input: AddBrandProductsPhotosInput!) {
    addBrandProductsPhotos(input: $input) {
      id
    }
  }
`;
