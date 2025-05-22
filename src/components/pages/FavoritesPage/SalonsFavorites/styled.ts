import styled from 'styled-components'
import { lighten } from 'polished'
import { laptopBreakpoint } from '../../../../styles/variables'

export const Wrapper = styled.div`
  background: #fff;
`

export const Content = styled.div<{ cabinet: boolean }>`
  padding: ${props => (props.cabinet ? '0' : '0 140px')};
  padding-top: ${props => (props.cabinet ? '0' : '60px')};
  padding-bottom: ${props => (props.cabinet ? '0' : '60px')};

  @media (max-width: ${laptopBreakpoint}) {
    padding: ${props => (props.cabinet ? '0' : '30px 20px 40px 20px')};
  }
`

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ItemToggle = styled.div<{ disabled: boolean; toggle: boolean }>`
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

export const Title = styled.p<{ cabinet: boolean }>`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 55px;
  color: #000;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 24px;
    display: ${props => (props.cabinet ? 'none' : 'block')};
    margin-bottom: 20px;
  }
`

export const SliderWrapper = styled.div`
  display: flex;
  height: auto;
`

export const SwiperWrap = styled.div`
  width: 100%;
`

export const PhoneButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 100%;
  margin-top: 20px;
  color: #fff;
  background-color: #f03;
  border: 1px solid #f03;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: ${lighten(0.1, '#f03')};
  }
`

export const AllSalons = styled.div`
  width: 374px;
  padding: 30px;
  background: #000000;
  border-radius: 5px;
  height: calc(100% - 10px);
  margin-top: 5px;
  cursor: pointer;
  position: relative;
  border: 1px solid #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:before {
    content: '';
    position: absolute;
    background: url('/white-romb.svg') no-repeat center;
    background-size: cover;
    width: 31px;
    height: 31px;
    top: 86px;
    left: 64px;
  }
  &:after {
    content: '';
    position: absolute;
    background: url('/all-number.svg') no-repeat center;
    background-size: cover;
    width: 70px;
    height: 130px;
    top: 22px;
    right: 27px;
  }
`

export const AllIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &:after {
    content: '';
    position: absolute;
    background: url('/all-circle-red.png') no-repeat center;
    background-size: cover;
    width: 132px;
    height: 132px;
    bottom: 30px;
    left: 14.5px;
  }
  &:before {
    content: '';
    position: absolute;
    background: url('/all-salon-img.svg') no-repeat center;
    background-size: cover;
    width: 113px;
    height: 132px;
    bottom: 35px;
    right: 27.5px;
  }
`

export const FavoriteIcon = styled.div`
  position: absolute;
  background: url('/favorite-red-item.svg') no-repeat center;
  background-size: cover;
  width: 60px;
  height: 84px;
  top: 0;
  right: 50%;
  margin-right: -30px;
`

export const AllText = styled.p`
  font-size: 18px;
  color: #fff;
  text-align: center;
  font-weight: 600;
`

export const Empty = styled.div`
  font-size: 18px;
  line-height: 30px;
`
