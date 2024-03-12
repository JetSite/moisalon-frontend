import styled from "styled-components";
import {
  laptopBreakpoint,
  tabletBreakpoint,
} from "../../../../../../styles/variables";

export const Wrapper = styled.div`
  height: 489px;
  display: flex;

  @media (max-width: ${tabletBreakpoint}) {
    height: auto;
    flex-wrap: wrap;
  }

  @media (max-width: ${laptopBreakpoint}) {
    height: auto;
    flex-direction: column;
  }
`;

export const Card = styled.div`
  flex: 1 0 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 79px;
  border: 1px solid #000;
  border-left: none;
  border-top: none;

  &:last-child {
    border-right: none;
  }

  @media (max-width: ${tabletBreakpoint}) {
    flex: 1 0 50%;
    min-height: 275px;
    padding-top: 20px;

    &:nth-child(2n) {
      border-right: none;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    flex: 1 0 100%;
    min-height: 175px;
    border-right: none;
  }
`;

export const IconWrap = styled.div`
  width: 81px;
  height: 81px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${tabletBreakpoint}) {
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 41px;
    height: 41px;
  }
`;

export const Icon = styled.img`
  @media (max-width: ${tabletBreakpoint}) {
  }

  @media (max-width: ${laptopBreakpoint}) {
    height: 100%;
  }
`;

export const CardTitle = styled.h3`
  margin-top: 23px;
  font-size: 30px;
  font-weight: 600;
  line-height: 45px;
  text-align: center;

  @media (max-width: ${tabletBreakpoint}) {
    margin-top: 13px;
    font-size: 18px;
    line-height: 24px;
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`;

export const CardText = styled.p`
  margin-top: 26px;
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;
  text-align: center;

  @media (max-width: ${tabletBreakpoint}) {
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 24px;
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`;
