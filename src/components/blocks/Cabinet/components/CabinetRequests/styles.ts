import styled from 'styled-components'
import Button from '../../../../ui/Button'
import { laptopBreakpoint } from '../../../../../styles/variables'

export const Text = styled.p`
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
`

export const Wrapper = styled.div`
  position: relative;
  max-width: 710px;
  width: 100%;
  padding-top: 35px;
  margin-bottom: 200px;
  @media (max-width: ${laptopBreakpoint}) {
    padding-top: 0;
    margin-bottom: 40px;
  }
`

export const ListWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
  margin-bottom: 23px;
`

export const Comment = styled(Text)`
  position: relative;
  display: flex;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 12px;
  margin: 32px 0 14px 0;
  &:before {
    content: '';
    top: -10px;
    left: -10px;
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    background: url('/email-active.svg') no-repeat center;
    background-size: contain;
    opacity: 0.6;
  }
`

export const ItemWrapper = styled.div<{ noView?: boolean }>`
  position: relative;
  width: 330px;
  min-height: 433px;
  padding: 43px 31px 43px 29px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 15px;
  margin-bottom: 31px;
  border-radius: 5px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);

  &:after {
    content: '';
    position: absolute;
    top: 15px;
    left: 17px;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background: #f03;
    ${({ noView }) => (!noView ? 'display: none;' : 'display: block;')}
  }
`

export const ShowDeletedButton = styled.button<{ active?: boolean }>`
  cursor: pointer;
  border: none;
  padding: 0;
  position: absolute;
  top: 48px;
  right: 17px;
  display: flex;
  opacity: ${({ active }) => (active ? 1 : 0.6)};
  &:hover {
    opacity: 1;
  }
  &:focus {
    opacity: 1;
  }
  &::before {
    display: inline-block;
    padding-right: 4px;
    content: '';
    width: 16px;
    height: 16px;
    background: ${({ active }) =>
      active
        ? "url('/icon-back.svg') no-repeat center"
        : "url('/trash.svg') no-repeat center"};
    filter: invert(50%);
  }
`

export const CloseButton = styled.button`
  cursor: pointer;
  border: none;
  padding: 0;
  position: absolute;
  top: 15px;
  right: 17px;
  width: 13px;
  height: 13px;
  background: url('/close-cross-gray.svg') no-repeat center;
  &:hover {
    filter: brightness(30%);
  }
  &:focus {
    filter: brightness(30%);
  }
`

export const MasterContent = styled.div`
  display: flex;
  margin-bottom: 16px;
`

export const MasterPhoto = styled.div`
  width: 88px;
  height: 88px;
  flex-shrink: 0;
  margin-right: 16px;
  border-radius: 50%;
  background: #e3e3e3;
`
export const Photo = styled.img`
  width: 100%;
  border-radius: 50%;
`
export const Info = styled.div``
export const Name = styled.h5`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`
export const Spec = styled(Text)``
export const Phone = styled(Text)`
  margin-top: 21px;
  font-weight: 500;
  line-height: 18px;
  text-decoration: underline;
`
export const Email = styled(Text)`
  font-weight: 500;
  line-height: 18px;
`
export const Request = styled.div`
  display: flex;
`
export const RequestInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const PositionWrap = styled.div``

export const Position = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`
export const SalonPhoto = styled.div<{ photo?: string | null }>`
  width: 88px;
  height: 90px;
  margin-right: 16px;
  flex-shrink: 0;
  background: #e3e3e3;
  border-radius: 5px;
  background: ${({ photo }) =>
    photo ? `url(${photo}) no-repeat center` : '#e3e3e3'};
  background-size: cover;
`
export const SalonName = styled(Text)``
export const ButtonWrapper = styled.div`
  min-height: 83px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const ButtonStyled = styled(Button)`
  :disabled {
    color: #000;
    background-color: #f0f0f0;
  }
`

export const NoRequestsText = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 30px;
`
