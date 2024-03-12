import styled from "styled-components";
import { laptopBreakpoint, red } from "../../../../../../styles/variables";

export const Wrapper = styled.div`
  display: flex;
  padding: 0 140px 0 160px;

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
    margin-top: 40px;
    padding: 0 20px;
    padding-bottom: 80px;
    background: #fff;
  }
`;

export const Category = styled.div`
  min-width: 320px;
  margin-right: 20px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-right: 0;
    margin-bottom: 30px;
  }
`;

export const Title = styled.div`
  color: #797979;
  font-weight: 500;
  @media (max-width: ${laptopBreakpoint}) {
  }
`;

export const List = styled.div`
  margin-top: 27px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 17px;
  }
`;

export const ListItem = styled.a`
  display: block;
  margin-bottom: 17px;
  color: #000;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    color: ${red};
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`;

export const EmptyResult = styled.p`
  display: block;
  margin-bottom: 17px;
  color: #797979;
  font-size: 14px;
  font-weight: 500;

  @media (max-width: ${laptopBreakpoint}) {
  }
`;
