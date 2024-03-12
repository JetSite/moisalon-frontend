import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CatalogItem } from "../CatalogItem";

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 40px;
  min-height: 165px;
`;

const Title = styled.h4`
  font-weight: 600;
  font-size: 18px;
  margin-bottom: 20px;
`;

const Item = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
`;

const ShowMore = styled.span`
  display: block;
  width: fit-content;
  margin-top: 10px;
  font-size: 14px;
  line-height: 27px;
  color: #000000;
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #ff0033;
  }
`;

export function CatalogGroup({ group, services, withPrice = false }) {
  const [collapsed, setCollapsed] = useState(false);

  if (group?.items === undefined) {
    return null;
  }

  const items = group?.items
    ?.filter((item) => services?.find((entry) => entry.id === item.id))
    ?.map((item) => (
      <CatalogItem withPrice={withPrice} key={item.id} item={item} />
    ));

  if (items.length === 0) {
    return null;
  }

  const visibleItems = items?.slice(0, 3);
  const collapsedItems = items?.slice(3);
  const collapsedText = collapsed ? "Показать все" : "Скрыть";

  const handleChange = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    setCollapsed(true);
  }, []);

  return (
    <Wrapper>
      <Title>{group?.title}</Title>
      <Item>{visibleItems}</Item>
      {!collapsed && <Item>{collapsedItems}</Item>}
      {items?.length > 3 && (
        <ShowMore onClick={handleChange}>{collapsedText}</ShowMore>
      )}
    </Wrapper>
  );
}
