import styled from "styled-components";
import { laptopBreakpoint } from "../../../../../../../styles/variables";

export const Wrapper = styled.div`
  margin-bottom: 60px;
  padding: 0 140px;
  padding-top: 100px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    margin-top: 0;
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Address = styled.a`
  font-size: 14px;
  line-height: 30px;
  color: #000;
  width: 50%;
  margin-right: 25px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    font-weight: 400;
    line-height: 25px;
    margin-right: 0px;
  }
`;

export const ContentWrapperElement = styled.div`
  width: 47%;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

export const ContentBottom = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
  }
`;

export const Title = styled.p`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 55px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 67px;
    margin-bottom: 21px;
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
  }
`;

export const ContactBody = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const MapBlock = styled.div`
  width: 600px;
  height: 340px;
  margin-right: 50px;
`;

export const InfoBlock = styled.div`
  width: 60%;
  min-height: 100%;
  /* margin-left: 50px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 60px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BlurPhone = styled.p`
  display: inline;
  background: #000000;
  background: -webkit-linear-gradient(to right, #000000 0%, #ffffff 72%);
  background: -moz-linear-gradient(to right, #000000 0%, #ffffff 72%);
  background: linear-gradient(to right, #000000 0%, #ffffff 72%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const InfoTitle = styled.p`
  width: 50%;
  /* margin-left: 25px; */
  font-size: 14px;
  line-height: 27px;
  color: #000000;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: 25px;
  }
`;
export const InfoDescription = styled.p`
  width: 50%;
  margin-right: 25px;
  font-size: 14px;
  line-height: 27px;
  color: #000000;

  a {
    color: #000000;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: #ff0033;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-right: 0;
    font-size: 12px;
    line-height: 25px;
  }
`;
