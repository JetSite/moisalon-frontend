import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  margin-right: 10px;
  padding-bottom: 5px;
  & span: {
    vertical-align: middle;
  }
`;

const ItemDot = styled.div`
  vertical-align: middle;
  width: 8px;
  height: 8px;
  display: inline-block;
  border-radius: 50%;
  margin-right: 4px;
`;

const SubwayStation = ({ item, index, length }) => {
  const title = item.lineName;
  return (
    <Wrapper title={title}>
      <ItemDot
        className={"subwayStation__itemDot"}
        style={{ backgroundColor: `#${item.lineColor}` }}
      />
      <span>
        {item.name}
        {index + 1 !== length ? "," : null}
      </span>
    </Wrapper>
  );
};

export default SubwayStation;
