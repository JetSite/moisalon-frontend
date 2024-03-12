import styled from "styled-components";
import PhotoAddBlock from "./PhotoField/PhotoAddBlock";

const Wrapper = styled.div`
  margin-bottom: 40px;
`;

const DefaultPhoto = ({ defaultPhoto, setDefaultPhoto }) => {
  return (
    <Wrapper>
      <PhotoAddBlock
        defaultPhoto={defaultPhoto}
        setDefaultPhoto={setDefaultPhoto}
      />
    </Wrapper>
  );
};

export default DefaultPhoto;
