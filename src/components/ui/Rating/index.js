import Stars from "../Stars";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props?.position === "start"
      ? "flex-start"
      : props?.position === "justify"
      ? "space-between"
      : "center"};
`;

const Count = styled.p`
  color: #727272;
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
`;

const Rating = ({
  averageScore,
  numberScore,
  position = "",
  fontSize = "10px",
  fontWeight = 400,
}) => {
  return (
    <Wrapper position={position}>
      <Stars count={Math.round(averageScore)} />
      <Count fontSize={fontSize} fontWeight={fontWeight}>
        {numberScore || 0}
      </Count>
    </Wrapper>
  );
};

export default Rating;
