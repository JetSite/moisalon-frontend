import { gql } from "@apollo/client";

export const seatPhotoEditorFragment = gql`
  fragment SeatPhotoEditorFragment on Seat {
    editorPhoto: photo(kind: "medium") {
      id
      kind
      url
    }
  }
`;