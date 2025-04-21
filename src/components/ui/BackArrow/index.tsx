import Link from 'next/link';
import styled from 'styled-components';
import { laptopBreakpoint } from '../../../styles/variables';
import { LazyImage } from '@/components/newUI/common/LazyIMage';

const WrapperLink = styled(Link)`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    position: absolute;
    top: 156px;
    left: 10px;
    padding: 10px;
    cursor: pointer;
  }
`;

const Icon = styled(LazyImage)`
  width: 100%;
  height: auto;
`;

const BackArrow = ({ link }: { link: string }) => {
  return (
    <WrapperLink shallow href={`/${link}`} data-navigate={`/${link}`}>
      <Icon src="/arrow-back.svg" />
    </WrapperLink>
  );
};

export default BackArrow;
