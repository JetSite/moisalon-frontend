import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'

const Wrapper = styled.div`
  margin-bottom: ${props => `${props.mbWrapper}px`};

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 30px;
  }
`

const TitleWrapper = styled.div``

const Title = styled.div``

const ContentWrapper = styled.div`
  flex: 1 1 auto;
`

const Description = styled.p`
  font-size: 18px;
  line-height: 30px;
  margin-bottom: ${props => `${props.mbDesc}px`};

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 30px;
    font-size: 14px;
    font-weight: 400;
    line-height: 25px;
  }
`

const Group = ({
  mbDesc = 75,
  mbWrapper = 54,
  title,
  description,
  children,
  fullWidth = false,
}) => {
  return (
    <Wrapper mbWrapper={mbWrapper} fullWidth={fullWidth}>
      <TitleWrapper>
        <Title>{title}</Title>
        <Description mbDesc={mbDesc}>{description}</Description>
      </TitleWrapper>
      <ContentWrapper>{children}</ContentWrapper>
    </Wrapper>
  )
}

export default Group
