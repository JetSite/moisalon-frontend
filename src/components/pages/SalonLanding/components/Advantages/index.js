import { useRouter } from "next/router";
import {
  MainContainer,
  MobileHidden,
  MobileVisible,
} from "../../../../../styles/common";
import {
  Wrapper,
  Content,
  Text,
  List,
  ListItem,
  ButtonWrap,
  Photo,
  Overlay,
  Arrow,
  Romb,
} from "./styles";
import Button from "../../../../ui/Button";

const Advantages = () => {
  const { push } = useRouter();
  return (
    <Wrapper>
      <MainContainer>
        <Content>
          <Text>
            Бьюти-платформа МОЙ сделает бизнес эффективнее и принесет отличные
            результаты сразу в нескольких направлениях:{" "}
          </Text>
          <List>
            <ListItem>Добьетесь высокой загрузки 7 дней в неделю.</ListItem>
            <ListItem>
              Увеличите прибыль за счет арендных платежей и доп.продаж.{" "}
            </ListItem>
            <ListItem>
              Привлечете больше клиентов и выйдете на новую аудиторию.
            </ListItem>
            <ListItem>Сократите расходы на штатных сотрудников. </ListItem>
            <ListItem>Найдете перспективных деловых партнеров.</ListItem>
            <ListItem>Станете известнее и популярнее в своем городе. </ListItem>
          </List>
          <MobileHidden>
            <ButtonWrap>
              <Button
                onClick={() => push("/createLessorSalon")}
                size="mediumNoPadding"
                variant="red"
                font="medium"
                mt="62"
              >
                Присоединиться к платформе
              </Button>
            </ButtonWrap>
          </MobileHidden>
          <MobileVisible>
            <ButtonWrap>
              <Button
                onClick={() => push("/createLessorSalon")}
                size="fullWidth"
                variant="red"
                font="small"
                mt="42"
              >
                Присоединиться к платформе
              </Button>
            </ButtonWrap>
          </MobileVisible>
        </Content>
      </MainContainer>
      <Photo>
        <Overlay />
      </Photo>
      <Arrow />
      <Romb />
    </Wrapper>
  );
};

export default Advantages;
