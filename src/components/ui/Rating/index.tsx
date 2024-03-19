import { FC } from 'react'
import Stars from '../Stars'
import styled from 'styled-components'

const Wrapper = styled.div<{ position: string }>`
  display: flex;
  align-items: center;
  justify-content: ${props =>
    props?.position === 'start'
      ? 'flex-start'
      : props?.position === 'justify'
      ? 'space-between'
      : 'center'};
`

const Count = styled.p<{ fontSize: string; fontWeight: number }>`
  color: #727272;
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};
`

interface Props {
  averageScore: number
  numberScore: number
  position: string
  fontSize: string
  fontWeight: number
}

const Rating: FC<Props> = ({
  averageScore,
  numberScore,
  position,
  fontSize = '10px',
  fontWeight = 400,
}) => {
  return (
    <Wrapper position={position}>
      <Stars count={Math.round(averageScore)} />
      <Count fontSize={fontSize} fontWeight={fontWeight}>
        {numberScore || 0}
      </Count>
    </Wrapper>
  )
}

export default Rating
