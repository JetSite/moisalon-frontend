import { gql } from "@apollo/client";

export const masterPhotoFragment = gql`
  fragment MasterPhotoFragment on Master {
    photo(kind: "big") {
      id
      kind
      url
    }
  }
`;
