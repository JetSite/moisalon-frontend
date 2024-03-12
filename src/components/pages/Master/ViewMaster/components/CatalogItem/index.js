import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.p`
  font-size: 18px;
  line-height: 30px;
  margin-right: 10px;
`;

const Price = styled.p`
  font-size: 18px;
  line-height: 30px;
  flex-shrink: 0;
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