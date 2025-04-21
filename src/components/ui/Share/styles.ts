import styled from 'styled-components';

import { laptopBreakpoint } from '../../../styles/variables';
import { RefObject } from 'react';
import { LazyImage } from '@/components/newUI/common/LazyIMage';

export const Wrapper = styled.div`
  position: relative;
`;

export const IconWrapper = styled.button`
  border: none;
  width: 17px;
  height: 16px;
  transition: 0.2s;
  &:hover {
    transform: scale(1.2);
  }
`;

export const Icon = styled(LazyImage)`
  height: auto;
  width: auto;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const WrapperSocials = styled.div<{ ref: RefObject<HTMLDivElement> }>`
  width: 210px;
  padding: 10px;
  /* padding-top: 20px; */
  position: absolute;
  top: -100px;
  left: -183px;
  background: #fff;
  z-index: 1000;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 105px;
    top: -75px;
    /* left: -120px; */
    left: -92px;
    padding-bottom: 6px;
  }
`;

export const WrapperItems = styled.div`
  height: 42px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${laptopBreakpoint}) {
    height: auto;
    justify-content: flex-start;

    button {
      width: 24px !important;
      height: 24px !important;
    }

    svg {
      width: 24px !important;
      height: 24px !important;
    }
  }
`;

export const Title = styled.h5`
  font-weight: 700;
  text-align: center;
  margin-bottom: 15px;
  font-size: 14px;
  color: #000;
  flex-grow: 1;
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 6px;
    font-size: 12px;
  }
`;

export const SocialItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  transition: 0.3s;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 24px;
    height: 24px;
    margin-bottom: 6px;
    &:not(:nth-child(3n)) {
      margin-right: 6px;
    }
  }
`;

export const CloseBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
  transition: 0.2s;
  &:hover {
    transform: scale(1.2);
  }
`;

export const Close = styled(LazyImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
