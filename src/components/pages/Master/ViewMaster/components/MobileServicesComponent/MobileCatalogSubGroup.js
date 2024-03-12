import styled from "styled-components";
import MobileCatalogItem from "./MobileCatalogItem";

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Title = styled.h4`
  font-weight: 500;
  font-size: 16px;
  width: 70%;
  flex-shrink: 0;
`;

const Price = styled.p`
  font-weight: 400;
  font-size: 16px;
`;

const ucFirst = (str) => {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
};

export default function MobileCatalogSubGroup({
  subGroup,
  entriesItems,
  masterPage,
}) {
  const item = entriesItems?.find((item) => item?.id === subGroup?.id);
  const mapped = subGroup?.items
    ?.map((service, key) => {
      if (entriesItems.find((el) => el?.id === service?.id)) {
        return (
          <MobileCatalogItem
            entriesItems={entriesItems}
            key={key}
            masterPage={masterPage}
            item={service}
          />
        );
      } else {
        return null;
      }
    })
    .filter((element) => element !== null);

  return (
    <Wrapper masterPage={masterPage}>
      <Top>
        <Title>{ucFirst(subGroup?.title)}</Title>
        {item?.price ? <Price>от {item.price}</Price> : null}
      </Top>
      {mapped}
    </Wrapper>
  );
}
