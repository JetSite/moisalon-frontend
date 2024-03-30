import styled from 'styled-components'
import Button from '../../../../ui/Button'
import { laptopBreakpoint } from '../../../../../styles/variables'

export const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 79px;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
  margin-bottom: 23px;
`

export const ItemWrapper = styled.div`
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
  &:before {
    content: '';
    position: absolute;
    top: 15px;
    right: 17px;
    width: 13px;
    height: 13px;
    background: url('/close-cross-gray.svg') no-repeat center;
  }
`

export const MasterContent = styled.div`
  display: flex;
`
export const Text = styled.p`
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
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
export const SalonPhoto = styled.div`
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
