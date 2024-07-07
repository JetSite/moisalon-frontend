import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'
import { FC } from 'react'
import { IChildren } from 'src/types/common'

const Wrapper = styled.div<{ mbWrapper?: number }>`
  margin-bottom: ${props => `${props.mbWrapper}px`};

  @media (max-width: ${laptopBreakpoint}) {
    margin-bottom: 30px;
  }
`

const TitleWrapper = styled.div``

const Title = styled.div``

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  flex: 1 1 auto;
`

const Description = styled.p<{ mbDesc?: number }>`
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

interface Props {
  mbDesc?: number
  mbWrapper?: number
  title?: string
  description?: string
  children: IChildren
}

const Group: FC<Props> = ({
  mbDesc = 75,
  mbWrapper = 54,
  title,
  description,
  children,
}) => {
  return (
    <Wrapper mbWrapper={mbWrapper}>
      {title ? (
        <TitleWrapper>
          <Title>{title}</Title>
          <Description mbDesc={mbDesc}>{description}</Description>
        </TitleWrapper>
      ) : null}
      <ContentWrapper>{children}</ContentWrapper>
    </Wrapper>
  )
}

export default Group
