import { FC } from 'react'
import { Wrapper, TextWrapper, Text } from './styles'

interface Props {
  text: string
  border: string
  bg: string
  length: string
}

const Line: FC<Props> = ({ text, border, bg, length }) => {
  return (
    <Wrapper border={border} bg={bg}>
      <TextWrapper length={length}>
        <Text length={length}>{text}</Text>
        <Text length={length}>{text}</Text>
        <Text length={length}>{text}</Text>
        <Text length={length}>{text}</Text>
      </TextWrapper>
    </Wrapper>
  )
}

export default Line
