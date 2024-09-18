import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../styles/variables'

export type IBgImages = keyof typeof bgImages

export const Wrapper = styled.div`
  background: #000;
  padding-top: 107px;

  @media (max-width: ${laptopBreakpoint}) {
    padding-top: 59px;
    overflow: hidden;
  }
`

export const Content = styled.div`
  padding: 0 140px;
  position: relative;
  &:after {
    position: absolute;
    content: '';
    background: url('/all-masters.svg') no-repeat center;
    width: 159px;
    height: 94px;
    background-size: contain;
    top: -35px;
    right: 430px;

    @media (max-width: ${laptopBreakpoint}) {
      display: none;
    }
  }
  &:before {
    position: absolute;
    content: '';
    background: url('/all-number.svg') no-repeat center;
    width: 89px;
    height: 161px;
    background-size: contain;
    top: -25px;
    right: 0;

    @media (max-width: ${laptopBreakpoint}) {
      display: none;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
    background-color: #000;
  }
`

export const RombIcon = styled.div`
  position: absolute;
  background: url('/white-romb.svg') no-repeat center;
  width: 48px;
  height: 48px;
  background-size: contain;
  bottom: -75px;
  left: 480px;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const Title = styled.p`
  color: #fff;
  margin-bottom: 80px;
  font-size: 30px;
  font-weight: 600;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 40px;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    line-height: 25px;
    text-transform: uppercase;
  }
`

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 213px;

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
    margin-top: 41px;
    margin-bottom: 66px;
  }
`

export const InfoItem = styled.div`
  max-width: 335px;
  width: 100%;

  @media (max-width: ${laptopBreakpoint}) {
    position: relative;
    max-width: 100%;
    min-height: 207px;

    &:not(:last-child) {
      border-bottom: 1px solid #ffffff;
    }
  }
`

export const InfoItemTitle = styled.p`
  color: #fff;
  text-transform: uppercase;
  padding-bottom: 40px;
  border-bottom: 1px solid #ffffff;
  font-size: 40px;
  font-weight: 500;
  line-height: 55px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 55%;
    padding-bottom: 0;
    padding-top: 37px;
    font-size: 20px;
    font-weight: 600;
    line-height: 25px;
    border-bottom: 0;
  }
`

export const InfoItemText = styled.p`
  color: #fff;
  font-size: 14px;
  line-height: 27px;
  margin-top: 25px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 57%;
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
    margin-bottom: 27px;
  }
`

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column;
  }
`

export const Left = styled.div`
  width: 50%;
  background: #f2f0f0;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 102px;
  padding-top: 468px;
  position: relative;
  &:after {
    position: absolute;
    content: '';
    background: url('/black-star-icon.svg') no-repeat center;
    width: 49px;
    height: 47px;
    left: 138px;
    top: 184px;

    @media (max-width: ${laptopBreakpoint}) {
      left: 5%;
      top: 28%;
    }
  }
  &:before {
    position: absolute;
    content: '';
    background: url('/all-salon-img.svg') no-repeat center;
    width: 109px;
    height: 127px;
    right: 107px;
    top: 298px;
    z-index: 1;

    @media (max-width: ${laptopBreakpoint}) {
      right: 5%;
      top: 37%;
      width: 102px;
      height: 120px;
      background-size: contain;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    padding: 0;
    padding-top: 471px;
  }
`

export const Right = styled.div`
  width: 50%;
  padding-bottom: 102px;
  padding-top: 468px;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    background: url('/white-romb.svg') no-repeat center;
    width: 36px;
    height: 36px;
    background-size: contain;
    top: 261px;
    left: 90px;

    @media (max-width: ${laptopBreakpoint}) {
      top: 7%;
      left: 7%;
      background: url('/mobile-red-romb.svg') no-repeat center;
      background-size: contain;
    }
  }
  &:before {
    content: '';
    position: absolute;
    background: url('/about-arrow-icon.svg') no-repeat center;
    width: 175px;
    height: 103px;
    background-size: contain;
    top: 7px;
    right: 73px;

    @media (max-width: ${laptopBreakpoint}) {
      width: 108px;
      top: -3%;
      right: -7%;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    padding: 0;
    padding-top: 400px;
    background-color: #000;
    margin-top: 65px;
  }
`

export const BottomContentLeft = styled.div<{
  image: IBgImages
  imageWidth: number
  imageHeight?: number
  imageTop?: number
}>`
  max-width: 500px;
  width: 100%;
  padding: 0 40px;
  padding-top: 35px;
  padding-bottom: 50px;
  background: #ffffff;
  position: relative;
  margin: 0 auto;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    padding: 0 20px;
    background: #f2f0f0;
  }
  &:after {
    position: absolute;
    content: '';
    background: url(${({ image }) => bgImages[image]}) no-repeat center;
    background-size: contain;
    width: ${props => props.imageWidth + 'px'};
    height: ${props => props.imageHeight + 'px'};
    right: 50%;
    margin-right: ${({ imageWidth }) => '-' + imageWidth / 2 + 'px'};
    bottom: 246px;
    @media (max-width: ${laptopBreakpoint}) {
      top: ${props => '-' + props.imageTop + 'px'};
    }
  }
  &:before {
    position: absolute;
    content: '';
    background: url('/all-circle-red.svg') no-repeat center;
    background-size: contain;
    width: 282px;
    height: 282px;
    right: 50%;
    margin-right: -150px;
    bottom: 390px;

    @media (max-width: ${laptopBreakpoint}) {
      bottom: 180%;
    }
  }
`

export const BottomContentRight = styled(BottomContentLeft)`
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    padding: 0 20px;
    background-color: #000;
  }
  &:after {
    position: absolute;
    content: '';
    background: url(${props => bgImages[props.image]}) no-repeat center;
    background-size: contain;
    width: ${props => props.imageWidth + 'px'};
    height: ${props => props.imageHeight + 'px'};
    right: 50%;
    margin-right: ${props => '-' + props.imageWidth / 2 + 'px'};
    bottom: 247px;
    @media (max-width: ${laptopBreakpoint}) {
      width: 355px;
      margin-right: -177px;
      right: 50%;
      bottom: 0;
      top: ${props => '-' + props.imageTop + 'px'};
    }
  }
  &:before {
    display: none;
  }
`

export const BottomContentTitle = styled.p`
  text-align: center;
  font-size: 24px;
  line-height: 34px;
  font-weight: 600;
  margin-bottom: 20px;
  text-transform: uppercase;

  @media (max-width: ${laptopBreakpoint}) {
    background: #fff;
    margin: 0;
    padding-top: 30px;
    padding-bottom: 20px;
  }
`

export const BottomContentText = styled.p`
  text-align: center;
  font-size: 14px;
  line-height: 27px;

  @media (max-width: ${laptopBreakpoint}) {
    background: #fff;
    padding-bottom: 30px;
  }
`

export const ButtonWrapper = styled.div`
  height: 135px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: ${laptopBreakpoint}) {
    min-width: 100%;
    min-height: 165px;
    padding: 0 20px 30px 20px;
  }
`

export const MobileLogo = styled.div`
  display: none;

  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    width: 100%;
    min-height: 150px;
    background: url('/mobile-about-logo.svg') no-repeat center;
    background-size: contain;
  }
`

export const MobileAssetMaster = styled.div`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    width: 63px;
    height: 116px;
    position: absolute;
    top: 46px;
    right: 40px;
    background: url('/mobile-about-asset1.svg') no-repeat center;
  }
`
export const MobileAssetSalon = styled.div`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    width: 94px;
    height: 94px;
    position: absolute;
    top: 39px;
    right: 20px;
    background: url('/mobile-about-asset2.svg') no-repeat center;
  }
`
export const MobileAssetBusiness = styled.div`
  display: none;
  @media (max-width: ${laptopBreakpoint}) {
    display: block;
    width: 93px;
    height: 108px;
    position: absolute;
    top: 37px;
    right: 20px;
    background: url('/mobile-about-asset3.svg') no-repeat center;
  }
`

const bgImages = {
  leftMaster: '/masters-page-left.png',
  rightMaster: '/masters-page-right.png',
  leftMain: '/about-man.png',
  rightMain: '/about-woman.png',
  left: '/woman-left.png',
  right: '/woman-right.png',
}
