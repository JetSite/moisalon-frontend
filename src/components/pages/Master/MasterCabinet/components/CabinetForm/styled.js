import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../styles/variables'

export const Wrapper = styled.div`
  max-width: 710px;
  width: 100%;
  padding-top: 35px;
  margin-bottom: 200px;

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 0;
  }
`

export const TitleMaster = styled.h3`
  margin-bottom: 40px;
  font-size: 22px;
  font-weight: 600;
`

export const ButtonWrapper = styled.div`
  max-width: 374px;
`

export const Wrap = styled.div`
  padding-top: 15px;
`

export const ButtonWrapperMaster = styled.div`
  max-width: 374px;
  margin-top: 20px;
`

export const MasterName = styled.p`
  font-size: 20px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 20px;
  }
`

export const Title = styled.h2`
  font-weight: 500;
  font-size: 40px;
  text-transform: uppercase;
  margin-bottom: 90px;
`

export const TitleCabinet = styled.h2`
  font-weight: 500;
  font-size: 30px;
  text-transform: uppercase;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const TextCabinet = styled.h2`
  font-weight: 600;
  font-size: 22px;
  margin-top: 18px;
  padding-bottom: 35px;

  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

export const TitleServicesMobile = styled.h4`
  display: block;
  padding-top: 25px;
  padding-bottom: 5px;
  font-size: 16px;
  font-weight: 600;
  line-height: 25px;
  border-bottom: 1px solid #e3e3e3;
`

export const Form = styled.form``

export const WrapperForm = styled.div`
  width: 100%;
  margin-bottom: 108px;
`

export const FieldWrap = styled.div`
  margin-bottom: 14px;
`
