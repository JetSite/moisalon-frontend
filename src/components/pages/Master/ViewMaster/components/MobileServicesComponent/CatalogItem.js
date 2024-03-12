import React from "react";
import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../../../styles/variables";

const Wrapper = styled.div``;

const Content = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    display: flex;
    justify-content: space-between;
  }
`;

const Title = styled.p`
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
  }
`;

const Price = styled.p`
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
  }
`;

export const CatalogItem = ({ item }) => {
  return (
    <Wrapper>
      <Content>
        <Title>{item.title}</Title>
        {/* <Price>от 10 000</Price> */}
      </Content>
    </Wrapper>
  );
};
