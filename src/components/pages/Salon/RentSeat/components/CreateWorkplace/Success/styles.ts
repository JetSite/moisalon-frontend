import styled from 'styled-components'
import { laptopBreakpoint, red } from '../../../../../../../styles/variables'
import Button from '../../../../../../ui/Button'
import { lighten } from 'polished'
import Link from 'next/link'

export const Wrapper = styled.div``

export const TopBlock = styled.div`
  @media (max-width: ${laptopBreakpoint}) {
    margin-left: -20px;
    margin-right: -20px;
    padding: 20px 0;
    background-color: rgba(0, 0, 0, 0.4);
    text-align: center;
  }
`

export const TopTitle = styled.h2`
  margin-bottom: 10px;

  @media (max-width: ${laptopBreakpoint}) {
    color: #fff;
    font-size: 20px;
    line-height: 28px;
    font-weight: 500;
    text-align: center;
  }
`

export const TopLink = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 35px;
  padding: 5px 10px;
  color: #fff;
  background: ${red};
  border-radius: 10px;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: ${lighten(0.1, '#f03')};
  }

  @media (max-width: ${laptopBreakpoint}) {
  }
`

export const Subtitle = styled.p`
  margin-bottom: 30px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 12px;
    text-align: center;
  }
`

export const MediumBlock = styled.div`
  margin-top: 60px;

  @media (max-width: ${laptopBreakpoint}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    text-align: center;
  }
`

export const MediumTitle = styled.h3`
  margin-bottom: 25px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    text-align: center;
  }
`

export const WorkplacePreview = styled.div<{ url: string }>`
  width: 400px;
  height: 250px;
  margin-bottom: 40px;
  border-radius: 10px;
  background: ${props => `url(${props.url})`} center no-repeat;
  background-size: cover;
  position: relative;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    max-width: 300px;
    height: 200px;
  }
`

export const Name = styled.p`
  display: inline-block;
  width: fit-content;
  max-width: 180px;
  padding: 5px 10px;
  background: #fff;
  border-radius: 100px;
  font-size: 10px;
  text-transform: uppercase;
  position: absolute;
  top: 10px;
  left: 10px;

  @media (max-width: ${laptopBreakpoint}) {
    left: 50%;
    transform: translateX(-50%);
    top: 55px;
  }
`

export const EditButton = styled.div`
  display: inline-block;
  padding: 5px 10px;
  color: #fff;
  background: ${red};
  border-radius: 10px;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  &:hover {
    background: ${lighten(0.1, '#f03')};
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 200px;
    right: 50%;
    margin-right: -100px;
  }
`

export const Price = styled.div`
  width: fit-content;
  padding: 5px 20px;
  background: #fff;
  border-radius: 100px;
  color: #fff;
  background: #007aff;
  font-size: 16px;
  position: absolute;
  bottom: 40px;
  left: 10px;
`

export const AddButton = styled(Button)`
  @media (max-width: ${laptopBreakpoint}) {
    height: 40px;
    border-radius: 10px;
  }
`

export const AddWorkplaceButton = styled(Button)`
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    max-width: 400px;
    padding: 0;
    border-radius: 10px;
  }
`

export const BottomBlock = styled.div`
  margin-top: 60px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 40px;
  }
`

export const BottomText = styled.p`
  width: 500px;
  margin-top: 30px;
  color: #a2a2a2;
  font-size: 14px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
  }
`

export const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 30px;
  color: #2d9bf0;
  cursor: pointer;
  position: relative;

  &:before {
    content: '';
    width: 0;
    height: 2px;
    background-color: #2d9bf0;
    position: absolute;
    bottom: 0;
    transition: 0.2s;
  }

  &:hover {
    &:before {
      width: 100%;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 20px;
    font-size: 14px;
  }
`
