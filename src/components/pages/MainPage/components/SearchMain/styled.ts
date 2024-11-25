import { Avatar } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import styled from 'styled-components'
import {
  mobileBreakpoint,
  tabletBreakpoint,
  laptopBreakpoint,
} from '../../../../../styles/variables'

export const Checkbox = styled.input<{ checked: boolean }>`
  position: absolute;
  z-index: -1;
  opacity: 0;
  & + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }
  & + label::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #797979;
    margin-right: 14px;
    cursor: pointer;
    background: ${props =>
      props.checked ? `url("/icon-check.svg") no-repeat center` : ''};
  }
`
export const Label = styled.label`
  font-size: 1rem;
  line-height: 1.5;
  cursor: pointer;
  margin-bottom: 16px;

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 10px;
    font-weight: 500;
    line-height: 16px;
  }
`

export const Wrapper = styled.div`
  max-width: 731px;
  width: 100%;

  @media (max-width: ${laptopBreakpoint}) {
    max-width: 100%;
  }
`

export const WrapperResults = styled.div`
  max-width: 1160px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 40px;

  @media (max-width: ${laptopBreakpoint}) {
    padding: 0 20px;
  }
`

export const InputWrap = styled.div`
  position: relative;
  margin-bottom: 25px;
  border: 1px solid #ededed;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  -webkit-appearance: none;

  &:before {
    position: absolute;
    content: '';
    left: 20px;
    top: 17px;
    background: url('/search.svg') no-repeat center;
    background-size: cover;
    cursor: pointer;
    width: 20px;
    height: 22px;
  }
  /* &:after {
    position: absolute;
    content: "";
    right: 20px;
    top: 15px;
    background: url("/filter.svg") no-repeat center;
    background-size: cover;
    cursor: pointer;
    width: 22px;
    height: 25px;

    @media (max-width: ${laptopBreakpoint}) {
      display: none;
    }
  } */
  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 16px;
  }
`

export const Input = styled.input`
  width: 100%;
  border: none;
  border-radius: 0;
  -webkit-border-radius: 0;
  outline: none;
  font-weight: 600;
  font-size: 18px;
  padding-left: 50px;
  padding-right: 50px;
  height: 56px;
  -webkit-appearance: none;
  ::-webkit-input-placeholder {
    color: #a2a2a2;
    font-weight: 600;
    font-size: 18px;
  }
  ::-moz-placeholder {
    color: #a2a2a2;
    font-weight: 600;
    font-size: 18px;
  }
  :-moz-placeholder {
    color: #a2a2a2;
    font-weight: 600;
    font-size: 18px;
  }
  :-ms-input-placeholder {
    color: #a2a2a2;
    font-weight: 600;
    font-size: 18px;
  }

  &[type='search'] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  &[type='search']::-webkit-search-cancel-button {
    -webkit-appearance: none;
    appearance: none;
  }

  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    padding-right: 20px;

    ::-webkit-input-placeholder {
      font-weight: 500;
      font-size: 12px;
    }

    ::-moz-placeholder {
      font-weight: 500;
      font-size: 12px;
    }
    :-moz-placeholder {
      font-weight: 500;
      font-size: 12px;
    }
    :-ms-input-placeholder {
      font-weight: 500;
      font-size: 12px;
    }
  }
`

export const WrapperItems = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  column-gap: 18px;
  row-gap: 55px;
  margin-bottom: 55px;

  a {
    color: #000;
  }

  @media (max-width: ${laptopBreakpoint}) {
    justify-content: flex-start;
    row-gap: 18px;
    column-gap: 15px;
    margin-bottom: 40px;
  }
`

export const WrapperItemsSalons = styled.ul`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  column-gap: 18px;
  row-gap: 55px;
  margin-bottom: 55px;

  a {
    color: #000;
  }

  @media (max-width: ${laptopBreakpoint}) {
    justify-content: center;
    row-gap: 18px;
    column-gap: 15px;
    margin-bottom: 40px;
  }
`

export const WrapperItemsMasters = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, minmax(135px, 1fr));
  column-gap: 18px;
  row-gap: 35px;
  margin-bottom: 55px;

  @media (max-width: ${laptopBreakpoint}) {
    display: grid;
    grid-template-columns: repeat(4, minmax(135px, 1fr));
    column-gap: 10px;
    row-gap: 20px;
  }

  @media (max-width: ${tabletBreakpoint}) {
    grid-template-columns: repeat(4, minmax(135px, 1fr));
  }

  @media (max-width: ${mobileBreakpoint}) {
    grid-template-columns: repeat(2, minmax(135px, 1fr));
  }
`

export const City = styled.p`
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
  font-size: 14px;
  color: #000;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 10px;
  }
`

export const WrapperItemsBrands = styled(WrapperItems)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 18px;
  row-gap: 35px;
  margin-bottom: 55px;

  @media (max-width: ${laptopBreakpoint}) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(13rem, 1fr));
    column-gap: 14px;
    row-gap: 20px;
  }

  @media (max-width: ${tabletBreakpoint}) {
  }

  @media (max-width: ${mobileBreakpoint}) {
  }
`

export const Item = styled.div`
  width: 217px;
  background: #ffffff;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  min-height: 100%;
  position: relative;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 160px;
    /* height: 266px; */
    padding: 21px 30px 0 30px;
    justify-content: flex-start;
  }
`

export const Name = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #000;
  word-break: break-word;
  margin-bottom: 20px;

  @media (max-width: ${laptopBreakpoint}) {
    grid-row: 1/4;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
  }
`

export const Favorite = styled.div<{ isFavorite: boolean }>`
  position: absolute;
  width: 16px;
  height: 16px;
  padding: 20px;
  background: ${({ isFavorite }) =>
      isFavorite ? 'url(/favorite-red-icon.svg)' : 'url(/favorit.svg)'}
    no-repeat center;
  cursor: pointer;
  right: 2px;
  top: 2px;

  @media (max-width: ${laptopBreakpoint}) {
    right: -5px;
    top: -6px;
  }
`

export const SkeletonItem = styled(Skeleton)`
  width: 173px;
  height: 173px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 104px;
    height: 104px;
  }
`

export const SkeletonMasterItem = styled(Skeleton)`
  width: 217px;
  height: 436px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 160px;
    height: 355px;
  }
`

export const FavoriteMaster = styled(Favorite)`
  @media (max-width: ${laptopBreakpoint}) {
    right: 2px;
    top: 2px;
  }
`

export const Image = styled(Avatar)`
  width: 140px;
  height: 140px;
  margin-bottom: 30px;

  @media (max-width: ${laptopBreakpoint}) {
    width: 100px;
    height: 100px;
    margin-bottom: 18px;
  }
`

export const Specializations = styled.p`
  color: #727272;
  text-align: center;
  margin-bottom: 20px;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;

  @media (max-width: ${laptopBreakpoint}) {
    /* grid-row: 4/6; */
    margin-top: 5px;
    margin-bottom: 0;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
  }
`

export const Title = styled.h1`
  margin-top: 64px;
  margin-bottom: 55px;
  font-size: 30px;
  font-weight: 600;
  line-height: 48px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 36px;
    margin-bottom: 28px;
    text-align: left;
    font-size: 22px;
  }
`

export const MasterInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;

  @media (max-width: ${laptopBreakpoint}) {
    /* display: grid;
    grid-template-rows: repeat(6, 18px);
    row-gap: 2px; */
  }
`

export const SalonCardWrapper = styled.li`
  width: 373px;
  height: 100%;
  cursor: pointer;

  @media (max-width: ${laptopBreakpoint}) {
    margin-right: 0;
  }
`

export const BItem = styled.div`
  width: 173px;
  height: 173px;
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
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
  &:hover {
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 104px;
    height: 104px;
    padding: 0 16px;
  }
`

export const BrandImage = styled.img`
  max-width: 100%;
  overflow: hidden;
`

export const LinkStyled = styled.a`
  display: block;
  height: 100%;
`
