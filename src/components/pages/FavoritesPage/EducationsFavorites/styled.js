import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'

export const Wrapper = styled.div`
  max-width: ${props => (props.cabinet ? '573px' : '100%')};
  @media (max-width: ${laptopBreakpoint}) {
    max-width: 100%;
  }
`

export const SliderWrapper = styled.div`
  display: flex;
`

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ItemToggle = styled.div`
  width: 100%;
  position: relative;
  transition: 0.3s;
  font-size: 14px;
  text-transform: uppercase;
  padding: 10px 0;
  font-weight: 500;
  color: ${props => (props.disabled ? '#e2e2e2' : '#000')};
  &:before {
    content: '';
    display: ${props => (props.disabled ? 'none' : 'block')};
    position: absolute;
    width: 9px;
    height: 9px;
    background: url('/arrow-next-2.svg') no-repeat center;
    background-size: contain;
    right: 0;
    transition: 0.3s;
    top: 50%;
    transform: ${props =>
      props.toggle ? 'rotate(90deg) translateX(-50%)' : 'translateY(-50%)'};
  }
`

export const Title = styled.p`
  margin-bottom: 55px;
  font-size: 30px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    display: ${props => (props.cabinet ? 'none' : 'block')};
    margin-bottom: 20px;
    font-size: 24px;
  }
`

export const Content = styled.div`
  padding: ${props => (props.cabinet ? '0' : '0 140px')};
  padding-top: ${props => (props.cabinet ? '0' : '60px')};
  padding-bottom: ${props => (props.cabinet ? '0' : '60px')};

  @media (max-width: ${laptopBreakpoint}) {
    padding: ${props => (props.cabinet ? '0' : '30px 20px 40px 20px')};
  }
`

export const Favorite = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: url('/favorite-red-icon.svg') no-repeat center;
  cursor: pointer;
  right: 10px;
  top: 9px;
`

export const SwiperWrap = styled.div`
  width: 100%;
`

export const Item = styled.div`
  width: 176px;
  height: 176px;
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  min-height: 100%;
  position: relative;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Image = styled.img`
  width: 100%;
`

export const BottomGoodWrapper = styled.div`
  padding: 12px 10px;
  background: #ffffff;
  border: 1px solid #ededed;
  border-top: none;
  border-radius: 5px;
  min-height: 186px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Name = styled.p`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #000;
  word-break: break-word;
  margin-bottom: 20px;
`

export const Empty = styled.div`
  font-size: 18px;
  line-height: 30px;
`
