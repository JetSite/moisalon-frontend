import styled from 'styled-components';
import { laptopBreakpoint } from '../../../../../../styles/variables';

export const AboutContainer = styled.div`
  padding: 0 140px;
  padding-top: 75px;
  padding-bottom: 20px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;
export const ShowMore = styled.span`
  display: block;
  width: fit-content;
  margin-top: 25px;
  font-size: 14px;
  line-height: 27px;
  color: #000000;
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: #ff0033;
  }
`;
export const FirstContainer = styled.div`
  width: 67%;
  display: flex;
  flex-direction: column;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
  }
`;
export const SecondContainer = styled.div<{ open?: boolean }>`
  display: ${props => `${props.open ? 'none' : 'block'}`};
`;
export const FirstBlock = styled.div`
  margin: 17px;
`;
export const FirstBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  margin: 17px;
`;
export const SecondBox = styled.div`
  padding: 75px 0 0 50px;
  width: 50%;
`;

export const MainDescriptionBox = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  font-size: 14px;
  line-height: 25px;
  color: #000000;
`;

export const SecondOpen = styled.div``;
export const ThirdOpen = styled.div``;
export const Text = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const Title = styled.p`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 55px;
  margin-top: 55px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 67px;
    margin-bottom: 21px;
    font-size: 16px;
    font-weight: 600;
    line-height: 25px;
  }
`;
