import { Wrapper, TextWrapper, Text } from "./styles";

const Line = ({ text, border, bg, length }) => {
  return (
    <Wrapper border={border} bg={bg}>
      <TextWrapper length={length}>
        <Text length={length}>{text}</Text>
        <Text length={length}>{text}</Text>
        <Text length={length}>{text}</Text>
        <Text length={length}>{text}</Text>
      </TextWrapper>
    </Wrapper>
  );
};

export default Line;
