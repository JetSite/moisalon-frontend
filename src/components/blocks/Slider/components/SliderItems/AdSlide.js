import Link from "next/link";
import AdCard from "../../../AdCard";
import styled from "styled-components";

const LinkStyled = styled.a`
  color: #000;
  cursor: pointer;
`;

const AdSlide = ({ item }) => {
  return (
    <Link href={`/sales/${item?.id}`}>
      <LinkStyled>
        <AdCard
          item={item}
          type="slider"
          shareLink={`https://moi.salon/sales/${item?.id}`}
        />
      </LinkStyled>
    </Link>
  );
};

export default AdSlide;
