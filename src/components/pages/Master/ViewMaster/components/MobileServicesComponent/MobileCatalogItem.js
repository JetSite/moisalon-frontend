import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../../../styles/variables";

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 5px;
  border-bottom: ${(props) =>
    props.masterPage ? "1px solid #e2e2e2" : "none"};
  padding-bottom: ${(props) => (props.masterPage ? "5px" : "0")};
  @media (max-width: ${laptopBreakpoint}) {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h4`
  font-weight: 500;
  font-size: 14px;
  width: 70%;
  color: #727272;
  flex-shrink: 0;
`;

const Price = styled.p`
  font-weight: 400;
  font-size: 14px;
`;

export default function MobileCatalogItem({ item, entriesItems, masterPage }) {
  const service = entriesItems?.find((el) => el?.id === item?.id);

  return (
    <Wrapper masterPage={masterPage}>
      <Top>
        <Title>{item?.title}</Title>
        {service?.price ? <Price>от {service.price}</Price> : null}
      </Top>
    </Wrapper>
  );
}
