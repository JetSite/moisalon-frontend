import styled from 'styled-components';
import { laptopBreakpoint, red } from '../../../../../../styles/variables';
import { LazyImage } from '@/components/newUI/common/LazyIMage';

export const ChatBlockWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  background: #f8f8f8;
  border-radius: 5px;
  padding: 40px;
  padding-left: 21px;
  margin-bottom: 19px;
  cursor: pointer;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border: 1px solid #f8f8f8;
  &:hover {
    border-color: #000;
    background: #fff;
  }
  @media (max-width: ${laptopBreakpoint}) {
    padding: 10px;
    /* align-items: center; */
  }
`;

export const ChatAvatarWrapper = styled.div`
  width: 76px;
  height: 76px;
  border-radius: 100%;
  flex-shrink: 0;
  overflow: hidden;
  @media (max-width: ${laptopBreakpoint}) {
    width: 56px;
    height: 56px;
  }
`;

export const ChatAvatar = styled(LazyImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  @media (max-width: ${laptopBreakpoint}) {
  }
`;

export const ChatBlockContent = styled.div`
  margin-left: 40px;
  width: 100%;
  /* height: 76px; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media (max-width: ${laptopBreakpoint}) {
    margin-left: 14px;
  }
`;

export const ChatBlockName = styled.p`
  font-size: 24px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
  }
`;

export const ChatBlockOrigin = styled.a`
  margin-top: 5px;
  margin-bottom: 15px;
  color: #727272;
  font-size: 18px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
  }
`;

export const ChatBlockLastMessageTime = styled.span`
  color: #727272;
  font-size: 18px;
  font-weight: 400;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
  }
`;

export const ChatBlockLastMessage = styled.p`
  max-width: 90%;
  height: 30px;
  color: #727272;
  font-size: 22px;
  font-weight: 700;
  line-height: 30px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
  }
`;

export const UnreadQuantity = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  background: ${red};
  border-radius: 100%;
  color: #fff;
  font-size: 9px;
  font-weight: 600;
  @media (max-width: ${laptopBreakpoint}) {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    align-self: center;
  }
`;

export const MessageBlockWrapper = styled.div`
  display: flex;
  padding: 20px 20px 0 20px;
  margin-bottom: 10px;
  background: ${({ isRead }) =>
    isRead ? 'transparent' : 'rgba(0, 0, 0, 0.1)'};
  transition: background 2s;

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
    margin-bottom: 10px;
    padding: 10px;
    background: #f0f0f0;
    border-radius: 5px;
  }
`;

export const AvatarBlock = styled.div`
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  position: relative;

  /* &:after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 16px;
    height: 16px;
    background: url("/favorite-red-icon.svg") no-repeat center;
  } */

  @media (max-width: ${laptopBreakpoint}) {
  }
`;

export const AvatarWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  overflow: hidden;

  @media (max-width: ${laptopBreakpoint}) {
  }
`;

export const Avatar = styled(LazyImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  @media (max-width: ${laptopBreakpoint}) {
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 593px;
  margin-left: 42px;

  @media (max-width: ${laptopBreakpoint}) {
    margin: 0 auto;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const MobileTopWrapper = styled.div`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    max-width: 529px;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
`;

export const Row = styled.div`
  max-width: 540px;
  display: flex;
  justify-content: space-between;

  @media (max-width: ${laptopBreakpoint}) {
  }
`;

export const ChatRowMessage = styled(Row)`
  @media (max-width: ${laptopBreakpoint}) {
    max-width: 195px;
  }
`;

export const Name = styled.p`
  font-size: 18px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    margin-left: 14px;
    font-size: 14px;
    flex-grow: 1;
  }
`;

export const Time = styled.p`
  color: #727272;
  font-size: 14px;
  font-weight: 400;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
  }
`;

export const Question = styled.p`
  margin-bottom: 36px;
  max-width: 513px;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 25px;
  }
`;

export const NotAnswered = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  background: ${red};
  border-radius: 100%;
  color: #fff;
  font-size: 9px;
  font-weight: 600;
  position: relative;
  top: 7px;
  flex-shrink: 0;

  @media (max-width: ${laptopBreakpoint}) {
    top: 4px;
  }
`;

export const AnswerInputWrapper = styled.div`
  width: 600px;
  margin-top: 70px;
  margin-left: 98px;
  position: relative;
  @media (max-width: ${laptopBreakpoint}) {
    max-width: 528px;
  }
`;

export const AnswerInput = styled.input`
  width: 100%;
  max-width: 600px;
  height: 49px;
  padding-left: 36px;
  padding-right: 73px;
  border: 1px solid transparent;
  border-radius: 5px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
  outline: none;

  &:focus {
    border: 1px solid #727272;
  }

  @media (max-width: ${laptopBreakpoint}) {
    height: 39px;
    padding-left: 16px;
  }
`;

export const AnswerIcon = styled.div`
  width: 24px;
  height: 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 35px;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    right: 15px;
  }
`;

export const Answer = styled.p`
  max-width: 538px;
  margin-left: 98px;
  padding-left: 30px;
  color: #727272;
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;

  @media (max-width: ${laptopBreakpoint}) {
    padding-left: 10px;
    font-size: 14px;
    line-height: 25px;
    align-self: flex-start;
  }
`;
