import styled, { css } from 'styled-components'
import { laptopBreakpoint } from '../../../styles/variables'

export const SaleWrap = styled.li<{ type: string | undefined }>`
  max-width: 375px;
  width: 47%;
  min-width: 250px;
  height: 340px;
  border: ${({ type }) => (type === 'slider' ? 'none' : '1px solid #f0f0f0')};
  border-radius: 5px;
  overflow: hidden;
  flex-shrink: 0;
  transition: 0.2s;
  &:hover {
    opacity: 0.9;
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 280px;
  }
`

export const SaleTop = styled.div<{
  imageHover?: boolean
  isDeleted?: boolean
}>`
  width: 100%;
  height: 163px;
  overflow: hidden;
  position: relative;

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

  @media (max-width: ${laptopBreakpoint}) {
    height: 50%;
  }
`
export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const DeleteIcon = styled.button<{ visible?: boolean }>`
  position: absolute;
  background: url('/close-cross-red.svg') no-repeat center;
  width: 10px;
  height: 10px;
  top: 10px;
  right: 10px;

  display: ${({ visible }) => (visible ? 'block' : 'none')};
`

export const SaleContent = styled.div`
  padding: 30px 25px;
  padding-top: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 177px;
  background-color: #fff;
  @media (max-width: ${laptopBreakpoint}) {
    height: 50%;
    padding: 15px 20px;
    padding-top: 8px;
  }
`

export const SaleTitle = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  margin-top: 8px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    line-height: initial;
  }
`

export const SaleBottom = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    line-height: 14px;
  }
`

export const SaleData = styled.p``

export const Date = styled.p`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
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
