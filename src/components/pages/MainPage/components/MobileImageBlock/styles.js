import styled from 'styled-components';
import { laptopBreakpoint } from '../../../../../styles/variables';
import { LazyImage } from '@/components/newUI/common/LazyIMage';

export const Wrapper = styled.div`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 200px;
    margin-top: 18px;
    margin-bottom: 10px;
    padding: 0 20px;
  }
`;

export const Image = styled(LazyImage)`
  height: auto;
  width: auto;
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    width: 100%;
  }
`;
