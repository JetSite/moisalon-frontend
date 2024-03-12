import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 45px;
`;

const Step = styled.div`
  padding-left: 15px;
  position: relative;
  font-size: 10px;
  flex-shrink: 0;
  &:after {
    position: absolute;
    content: "";
    left: 0;
    top: 3px;
    background: ${(props) => (props.active ? "#f03" : "#e3e3e3")};
    width: 6px;
    height: 6px;
    transform: rotate(135deg);
  }
`;

const Line = styled.div`
  background: #e3e3e3;
  width: 100%;
  margin: 0 15px;
  height: 1px;
`;

const Steps = ({ active }) => {
  return (
    <Wrapper>
      <Step active={active === 1}>1 шаг</Step>
      <Line />
      <Step active={active === 2}>2 шаг</Step>
      <Line />
      <Step active={active === 3}>3 шаг</Step>
    </Wrapper>
  );
};

export default Steps;
