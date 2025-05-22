import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../styles/variables'

export const AllMasters = styled.div`
  width: 220px;
  background: #000000;
  border-radius: 5px;
  height: 100%;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:after {
    content: '';
    position: absolute;
    background: url('/all-masters.svg') no-repeat bottom;
    width: 86px;
    height: 45px;
    bottom: 77px;
    left: 50%;
    margin-left: -43px;
  }
  &:before {
    content: '';
    position: absolute;
    background: url('/all-romb.svg') no-repeat bottom;
    background-size: cover;
    width: 31px;
    height: 31px;
    top: 35px;
    left: 25px;
    transition: all 0.3s;
  }
  &:hover {
    opacity: 0.9;
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 160px;

    &:after {
      bottom: 50px;
    }
  }
`

export const AllSalons = styled.div`
  width: 368px;
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
    transition: all 0.3s;
  }
  &:hover {
    opacity: 0.9;
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 280px;
    height: 100%;
    margin: 0;
    padding: 20px;

    &:before {
      top: 55px;
      left: 13px;
    }

    &:after {
      width: 50px;
      height: 110px;
      top: 131px;
      right: 27px;
    }
  }
`

export const AllBrands = styled.div`
  width: 177px;
  padding: 30px;
  background: #000000;
  border-radius: 5px;
  height: 100%;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:after {
    content: '';
    position: absolute;
    background: url('/brand-img.svg') no-repeat bottom;
    width: 68px;
    height: 36px;
    bottom: 13px;
    left: 50%;
    margin-left: -34px;
  }
  &:before {
    content: '';
    position: absolute;
    background: url('/white-romb.svg') no-repeat bottom;
    background-size: cover;
    width: 31px;
    height: 31px;
    top: 20px;
    left: 20px;
    transition: all 0.3s;
  }
  &:hover {
    opacity: 0.9;
  }

  @media (max-width: ${laptopBreakpoint}) {
    padding: 5px;

    &:before {
      display: none;
    }

    &:after {
      bottom: 4px;
    }
  }
`

export const AllGoods = styled.div`
  width: 176px;
  height: calc(100% - 10px);
  margin-top: 5px;
  background: #000000;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:after {
    content: '';
    position: absolute;
    background: url('/all-goods.svg') no-repeat bottom;
    width: 124px;
    height: 124px;
    bottom: 21px;
    left: 50%;
    margin-left: -62px;
  }
  &:before {
    content: '';
    position: absolute;
    background: url('/all-romb.svg') no-repeat bottom;
    background-size: cover;
    width: 31px;
    height: 31px;
    top: 72px;
    left: 12px;
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 120px;
    height: calc(100% - 6px);

    &:before {
      top: 100px;
    }

    &:after {
      width: 94px;
      height: 94px;
      margin-left: -47px;
      background-size: contain;
    }
  }
`

export const AllIcon = styled.div`
  position: absolute;
  background: url('/all-master-img.svg') no-repeat bottom;
  background-size: cover;
  width: 80px;
  height: 73px;
  top: 15px;
  right: 15px;

  @media (max-width: ${laptopBreakpoint}) {
    background-size: contain;
  }
`

export const AllIconSalon = styled.div`
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

  @media (max-width: ${laptopBreakpoint}) {
    position: absolute;
    background: url('/all-master-img.svg') no-repeat bottom;
    background-size: cover;
    width: 80px;
    height: 73px;
    top: 15px;
    right: 15px;
    left: initial;

    &:after {
      display: none;
    }
    &:before {
      display: none;
    }
  }
`

export const AllText = styled.p`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  line-height: 25px;

  @media (max-width: ${laptopBreakpoint}) {
    /* font-size: 16px;
    line-height: 20px; */
  }
`

export const AllTextBrand = styled(AllText)`
  @media (max-width: ${laptopBreakpoint}) {
    margin-top: -10px;
    font-size: 14px;
    line-height: 20px;
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

  @media (max-width: ${laptopBreakpoint}) {
    width: 28px;
    height: 37px;
    right: 44px;
  }
`
