import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  height: 35px;
  padding: 0px 12px;
  margin-top: 10px;
  border: 1px solid #ededed;
  border-radius: 5px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);

  color: #a1a1a1;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  &:focus::-webkit-input-placeholder {
    color: transparent;
  }

  &:focus::-moz-placeholder {
    color: transparent;
  }

  &:focus:-moz-placeholder {
    color: transparent;
  }

  &:focus:-ms-input-placeholder {
    color: transparent;
  }
`;
