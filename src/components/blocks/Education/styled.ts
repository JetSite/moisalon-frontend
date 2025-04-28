import { LazyImage } from '@/components/newUI/common/LazyIMage';
import { laptopBreakpoint, red } from '../../../styles/variables';
import styled, { css } from 'styled-components';

export const EducationWrap = styled.li`
  width: 375px;
  height: 340px;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
  flex-shrink: 0;
  transition: 0.2s;
  color: #000;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    max-width: 375px;
    height: 280px;
  }
`;

export const EducationTop = styled.div<{
  imageHover?: boolean;
  isDeleted?: boolean;
}>`
  width: 100%;
  height: 163px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  @media (max-width: ${laptopBreakpoint}) {
    height: 133px;
  }
  ${({ isDeleted }) =>
    isDeleted &&
    css`
      ::after {
        content: 'Ожидание удаления';
        top: 10px;
        right: 10px;
        position: absolute;
        background-color: black;
        color: white;
        padding: 2px;
        border-radius: 4px;
        font-size: small;
      }
    `}
  ::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: black;
    opacity: ${({ imageHover }) => (imageHover ? 0.4 : 0)};
    transition: opacity 0.3s ease; /* Плавный переход при наведении */
  }
`;

export const Image = styled(LazyImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const EducationContent = styled.div`
  padding: 30px 25px;
  padding-top: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 177px;
  @media (max-width: ${laptopBreakpoint}) {
    height: 147px;
    padding: 15px 20px;
    padding-top: 8px;
  }
`;

export const EducationName = styled.p`
  font-size: 10px;
  line-height: 16px;
  text-align: center;
`;

export const EducationTitle = styled.p`
  min-height: 50px;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  @media (max-width: ${laptopBreakpoint}) {
    min-height: auto;
    mtargin-top: 8px;
    font-size: 14px;
    line-height: initial;
  }
`;

export const EducationBottom = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: 14px;
  }
`;

export const EducationData = styled.div``;

export const Date = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: 14px;
  }
`;

export const Promo = styled.div`
  margin-left: auto;
`;

export const PromoText = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: 14px;
  }
`;

export const Favorite = styled.button`
  position: absolute;
  width: 16px;
  height: 16px;
  padding: 20px;
  cursor: pointer;
  right: 20px;
  top: -8px;

  @media (max-width: ${laptopBreakpoint}) {
    right: 15px;
    top: -12px;
  }
`;
