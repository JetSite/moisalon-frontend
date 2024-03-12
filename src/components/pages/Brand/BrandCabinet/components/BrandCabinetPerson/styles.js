import styled from "styled-components";

import { laptopBreakpoint } from "../../../../../../../styles/variables";

export const Title = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 23px;
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
    text-transform: none;
  }
`;

export const WrapperForm = styled.div`
  width: 100%;
  margin-bottom: 108px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 85px;
  }
`;

export const FieldWrap = styled.div`
  margin-bottom: 14px;
`;

export const AvatarWrap = styled.div`
  min-height: 183px;
  margin-bottom: 69px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const AddPerson = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 56px;
`;

export const Plus = styled.div`
  position: absolute;
  left: -89px;
  width: 56px;
  height: 56px;
  border: 1px solid #e3e3e3;
  border-radius: 50%;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    width: 56px;
    height: 56px;
    bottom: -1px;
    left: -1px;
    background: url("/plus.svg") no-repeat center;
  }
`;

export const PriceWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
