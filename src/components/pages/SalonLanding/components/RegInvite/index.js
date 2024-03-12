import { useRouter } from "next/router";
import {
  MainContainer,
  MobileHidden,
  MobileVisible,
} from "../../../../../styles/common";
import {
  Wrapper,
  LeftBlock,
  Title,
  Text,
  List,
  ListItem,
  RightBlock,
  ImageWrap,
  Image,
} from "./styles";
import Button from "../../../../ui/Button";

const RegInvite = () => {
  const { push } = useRouter();
  return (
    <MainContainer>
      <Wrapper>
        <LeftBlock>
          <Title>
            Ваш салон будет зарабатывать <br /> каждую минуту рабочего времени{" "}
          </Title>
          <Text>
            В каждом салоне красоты кабинеты простаивают 10–40% времени, а их
            владельцы из-за этого недополучают значительную долю прибыли.
            Бьюти-платформа МОЙ решает эту проблему и помогает найти внештатных
            мастеров на свободные часы и добиться полной загрузки заведения.
          </Text>
          <List>
            <ListItem>
              Зарегистрируйте салон и добавьте свободные рабочие места и
              кабинеты в каталог.
            </ListItem>
            <ListItem>
              Привлекайте мастеров с собственными клиентами в свободные часы.{" "}
            </ListItem>
            <ListItem>Увеличьте прибыль. </ListItem>
          </List>
          <MobileHidden>
            <Button
              onClick={() => push("/createLessorSalon")}
              size="mediumNoPadding"
              variant="red"
              font="medium"
              mt="63"
            >
              Зарегистрировать салон
            </Button>
          </MobileHidden>
          <MobileVisible>
            <Button
              onClick={() => push("/createLessorSalon")}
              size="fullWidth"
              variant="red"
              font="medium"
              mt="43"
            >
              Зарегистрировать салон
            </Button>
          </MobileVisible>
        </LeftBlock>
        <RightBlock>
          <ImageWrap>
            <Image
              src="/for-salon-reginvite-image.jpg"
              alt="register invite image"
            />
          </ImageWrap>
        </RightBlock>
      </Wrapper>
    </MainContainer>
  );
};

export default RegInvite;
