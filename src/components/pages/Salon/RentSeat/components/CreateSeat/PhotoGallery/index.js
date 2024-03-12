import styled from "styled-components";
import PhotoArrayField from "./PhotoArrayField";

const Wrapper = styled.div`
  margin-bottom: 40px;
`;

const PhotoGallery = () => {
  const photoArrayProps = {
    photoType: "salonPhoto",
    kind: "small",
  };
  return (
    <Wrapper>
      <PhotoArrayField {...photoArrayProps} />
    </Wrapper>
  );
};

export default PhotoGallery;
