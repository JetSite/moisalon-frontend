import React from "react";
import PhotoAdd from "./PhotoAdd";
import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../../../../../styles/variables";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;

  @media (max-width: ${laptopBreakpoint}) {
    justify-content: center;
  }
`;

const PhotoAddBlock = ({ defaultPhoto, setDefaultPhoto }) => {
  return (
    <Wrapper>
      <PhotoAdd defaultPhoto={defaultPhoto} setDefaultPhoto={setDefaultPhoto} />
    </Wrapper>
  );
};

export default PhotoAddBlock;
