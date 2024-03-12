import Form from "./Form";
import { Wrapper, Container, Content, Title, Photo } from "./styles";

const Login = ({ setOpenSuccess, setOpenPopup }) => {
  return (
    <Wrapper id="login">
      <Container>
        <Content>
          <Title>
            Новый канал продаж <br /> без масштабных инвестиций
          </Title>
          <Form
            bg="#f2f0f0"
            setOpenSuccess={setOpenSuccess}
            setOpenPopup={setOpenPopup}
          />
        </Content>
      </Container>
      <Photo />
    </Wrapper>
  );
};

export default Login;
