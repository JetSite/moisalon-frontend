import styled, { css } from 'styled-components'
import { laptopBreakpoint, red } from '../../../styles/variables'

export const EventWrap = styled.li<{ cabinetVariant?: boolean }>`
  width: ${({ cabinetVariant }) => (cabinetVariant ? '345px' : '375px')};
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
  flex-shrink: 0;
  transition: 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
  &:hover {
    opacity: 0.9;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    max-width: 375px;
    height: 280px;
  }
`

export const EventTop = styled.div<{
  imageHover?: boolean
  isDeleted?: boolean
}>`
  width: 100%;
  height: 280px;
  border-bottom: 0.5px solid #000000;
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
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const EventContent = styled.div`
  padding: 24px 21px 17px 21px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
  @media (max-width: ${laptopBreakpoint}) {
    height: 147px;
  }
`

// const EventName = styled.p`
//   font-size: 10px;
//   line-height: 16px;
//   text-align: center;
// `;

export const EventTitle = styled.p`
  display: inline-block;
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  padding-bottom: 8px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    line-height: initial;
  }
`

export const EventBottom = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: baseline;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: 14px;
  }
`

export const EventData = styled.div`
  border-top: 0.5px solid #000;
  padding-top: 10px;
  width: 100%;
`

export const Date = styled.p`
  display: inline-block;
  color: ${red};
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: 14px;
  }
`

export const EventAddress = styled.p`
  color: #727272;
  font-size: 12px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: 14px;
  }
`

export const Promo = styled.div`
  margin-left: auto;
`

export const PromoText = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: 14px;
  }
`
