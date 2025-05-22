import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'

export const Wrapper = styled.section`
  background: rgba(242, 240, 240, 1) url('/rent-salon-bg.png') center;
  margin-top: 60px;
`

export const Content = styled.div`
  padding: 0 140px;
  padding-top: 70px;
  padding-bottom: 80px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px 56px 20px;
  }
`

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
  }
`

export const Title = styled.p`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 55px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 20px;
    font-weight: 600;
    line-height: 25px;
    margin: 0;
    padding-top: 16px;
    padding-bottom: 16px;
  }
`

export const Plus = styled.div`
  width: 56px;
  height: 56px;
  background: #f0f0f0;
  position: relative;
  border-radius: 100%;
  margin-right: 24px;
  &:after {
    content: '';
    position: absolute;
    width: 22px;
    height: 1px;
    background: #000;
    top: 50%;
    left: 50%;
    margin-left: -11px;
  }
  &:before {
    content: '';
    position: absolute;
    width: 1px;
    height: 22px;
    background: #000;
    top: 50%;
    margin-top: -11px;
    left: 50%;
  }
`

export const BottomText = styled.p`
  font-weight: 600;
  font-size: 18px;
  color: #fff;
  line-height: 25px;
`

export const SwiperWrap = styled.div`
  width: 100%;
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
