import styled from "styled-components";

export const InputField = styled.input`
  background: #5c5c73;
  border: none;
  border-top: ${(props) =>
    props.error ? "0.1rem solid #FF4B55" : "0.1rem solid #bebee8"};
  -webkit-appearance: none;
  box-shadow: ${(props) =>
    props.error ? "0 0 0 0.2rem inset #FF4B55;" : "none"};
  border-radius: 0.2rem;
  font-size: 1.6rem;
  outline: none;
  padding-left: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  color: #fff;
  width: 100%;
  ::placeholder {
    color: #a2a6cb;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  margin-bottom: ${(props) => (props.mb ? props.mb : "0")};
  &:before {
    content: "";
    display: ${(props) => (props.error ? "none" : "block")};
    position: absolute;
    width: 0.2rem;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(190, 190, 232, 1) 0%,
      rgba(132, 132, 175, 0.5) 12%
    );
    left: 0;
    top: 0;
  }
  &:after {
    content: "";
    display: ${(props) => (props.error ? "none" : "block")};
    position: absolute;
    width: 0.2rem;
    height: 100%;
    background: linear-gradient(
      180deg,
      rgba(190, 190, 232, 1) 0%,
      rgba(132, 132, 175, 0.5) 12%
    );
    right: 0;
    top: 0;
  }
`;
