import { useState } from "react";
import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../../../styles/variables";
import MobileCatalogSubGroup from "./MobileCatalogSubGroup";

const Wrapper = styled.div`
  width: ${(props) => (props.masterPage ? "100%" : "initial")};
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

const Title = styled.h4`
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    text-transform: uppercase;
  }
`;

const Item = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  cursor: ${(props) => (props.masterPage ? "pointer" : "initial")};
`;

const TickIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11px;
  height: 11px;
  transform: ${({ open }) => (open ? "rotate(90deg) translateX(-2px)" : "")};
  transition: all 0.2s;
`;

const Icon = styled.img`
  width: 100%;
`;

const ItemWrapper = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  margin-bottom: ${({ open }) => (open ? "40px" : "0")};
`;

const ucFirst = (str) => {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
};

export function MobileCatalogGroupForClient({
  group,
  entriesItems,
  masterPage,
}) {
  const [openGroup, setOpenGroup] = useState(false);

  if (!group?.subGroups) {
    return null;
  }

  const openGroupHandler = () => {
    setOpenGroup(!openGroup);
  };

  const subGroups = group?.subGroups
    ?.map((subGroup, key) => {
      if (
        entriesItems.find((item) => item?.id === subGroup?.id) ||
        (subGroup?.items?.length &&
          entriesItems.find((item) => {
            for (let i = 0; i < group?.subGroups?.items?.length; i++) {
              if (item?.id === group?.subGroups?.items[i]?.id) {
                return item;
              }
            }
          }))
      ) {
        return (
          <MobileCatalogSubGroup
            key={key}
            masterPage={masterPage}
            subGroup={subGroup}
            entriesItems={entriesItems}
          />
        );
      } else {
        return null;
      }
    })
    .filter((element) => element !== null);

  if (subGroups?.length === 0) {
    return null;
  }

  return (
    <Wrapper masterPage={masterPage}>
      <TitleWrapper masterPage={masterPage} onClick={openGroupHandler}>
        <Title>{ucFirst(group?.title)}</Title>
        <TickIcon open={openGroup}>
          <Icon src="/services-tick.svg" />
        </TickIcon>
      </TitleWrapper>
      <ItemWrapper open={openGroup}>
        <Item>{subGroups}</Item>
      </ItemWrapper>
    </Wrapper>
  );
}
