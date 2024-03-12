import { MainContainer } from "../../../../../../styles/common";
import { Wrapper, Title, Content } from "./styles";

const Resume = ({ master }) => {
  return (
    <MainContainer>
      <Wrapper>
        <Title>Резюме</Title>
        <Content
          dangerouslySetInnerHTML={{
            __html: master.resume,
          }}
        />
      </Wrapper>
    </MainContainer>
  );
};

export default Resume;
