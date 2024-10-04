import { Skeleton } from '@material-ui/lab'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../styles/variables'

export const Wrapper = styled.section`
  max-width: 710px;
  width: 100%;
  padding-top: 35px;
  margin: 0 auto;
  margin-bottom: 200px;
  @media (max-width: ${laptopBreakpoint}) {
    padding-top: 0;
    margin-bottom: 40px;
  }
`

export const TitlePage = styled.h2`
  font-size: 40px;
  font-weight: 500;
  margin-bottom: 17px;
  text-transform: uppercase;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 5px;
    text-transform: none;
  }
`

export const Subtitle = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  margin-bottom: 49px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
    line-height: 17px;
  }
`

export const Item = styled.div`
  width: 100%;
  background: #f8f8f8;
  border-radius: 5px;
  padding: 40px;
  padding-left: 21px;
  margin-bottom: 19px;
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid #f8f8f8;
  &:hover {
    border: 1px solid #000000;
    background: #fff;
  }
  @media (max-width: ${laptopBreakpoint}) {
    background: #ffffff;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 25px;
    padding-left: 11px;
  }
`

export const Container = styled.div`
  display: flex;
  align-items: center;
`

export const Content = styled.div`
  margin-left: 41px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-left: 11px;
  }
`

export const Name = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  word-break: break-word;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
    margin-bottom: 3px;
  }
`

export const Type = styled.p`
  font-size: 18px;
  line-height: 30px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 11px;
    line-height: 17px;
  }
`

export const Avatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 100%;
`

export const SkeletonWrap = styled(Skeleton)`
  width: 375px;
  height: 340px;
  margin-top: 32px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    max-width: 375px;
    height: 280px;
  }
`

export const EventsWrapper = styled.div`
  width: 100%;
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
`

export const Back = styled.p`
  font-size: 24px;
  line-height: 27px;
  font-weight: 600;
  margin-bottom: 20px;
  cursor: pointer;
  @media (max-width: ${laptopBreakpoint}) {
    color: #f03;
    font-size: 16px;
  }
`
