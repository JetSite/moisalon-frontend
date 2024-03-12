import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px solid #f8f8f8;
  background: #f8f8f8;
  height: 100px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  padding: 40px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  &:hover {
    border: 1px solid #000;
    background: #fff;
  }
`;

const Text = styled.p`
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Status = styled.p`
  color: #f03;
  position: absolute;
  right: 40px;
  top: 40px;
`;

const Priority = ({ text, status }) => {
  return (
    <Wrapper>
      <Text>{text}</Text>
      <Status>
        Статус: {status === "New "
          ? "Новый"
          : status === "Confirmed"
          ? "Подтвержденный"
          : "Новый"}
      </Status>
    </Wrapper>
  );
};

export default Priority;
