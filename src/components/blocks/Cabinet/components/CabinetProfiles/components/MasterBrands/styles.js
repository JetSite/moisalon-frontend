import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../../../../styles/variables";

export const BrandItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

export const Text = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 572px;
  margin-bottom: 45px;
  gap: 22px;

  @media (max-width: ${laptopBreakpoint}) {
    margin: 0;
    margin-bottom: 30px;
    min-width: 100%;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;

  @media (max-width: ${laptopBreakpoint}) {
    height: 100px;
    flex-direction: column;
    margin-bottom: 22px;
  }
`;

export const InputWrap = styled.div`
  position: relative;
  width: 572px;
  flex-shrink: 0;
  margin-right: 22px;
  &:before {
    position: absolute;
    content: "";
    left: 20px;
    top: 17px;
    background: url("/search.svg") no-repeat center;
    background-size: cover;
    cursor: pointer;
    width: 20px;
    height: 22px;
  }
  /* &:after {
    position: absolute;
    content: "";
    right: 20px;
    top: 15px;
    background: url("/filter.svg") no-repeat center;
    background-size: cover;
    cursor: pointer;
    width: 22px;
    height: 25px;
  } */

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin-right: 0;
  }
`;

export const Input = styled.input`
  width: 100%;
  border: 1px solid #ededed;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  outline: none;
  font-weight: 600;
  font-size: 18px;
  padding-left: 50px;
  padding-right: 50px;
  height: 56px;
  ::-webkit-input-placeholder {
    color: #a2a2a2;
    font-weight: 600;
    font-size: 18px;
  }
  ::-moz-placeholder {
    color: #a2a2a2;
    font-weight: 600;
    font-size: 18px;
  }
  :-moz-placeholder {
    color: #a2a2a2;
    font-weight: 600;
    font-size: 18px;
  }
  :-ms-input-placeholder {
    color: #a2a2a2;
    font-weight: 600;
    font-size: 18px;
  }
`;

export const Published = styled.div`
  display: ${({ published }) => (published ? "block" : "none")};
  position: absolute;
  top: 0;
  left: 0;
  width: 176px;
  height: 176px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 5px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 118px;
    height: 118px;
  }
`;
