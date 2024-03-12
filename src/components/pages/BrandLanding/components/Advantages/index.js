import { MainContainer } from "../../../../../styles/common";
import {
  Wrapper,
  Content,
  Text,
  List,
  ListItem,
  Photo,
  Overlay,
  Arrow,
  Romb,
  Circle,
} from "./styles";

const Advantages = () => {
  return (
    <Wrapper>
      <MainContainer>
        <Content>
          <Text>С платформой МОЙ вы качественно измените подход к работе:</Text>
          <List>
            <ListItem>
              Открытие перспективного независимого канала продаж.
            </ListItem>
            <ListItem>Расширение представительства на рынке.</ListItem>
            <ListItem>
              Увеличение дохода компании. <br />
              Привлечение дополнительной аудитории клиентов.
            </ListItem>
            <ListItem>Рост популярности и узнаваемости бренда.</ListItem>
            <ListItem>Создание базы лояльных покупателей.</ListItem>
            <ListItem>
              Оперативное информирование об акциях и новинках.
            </ListItem>
            <ListItem>Возможность проведения рекламных кампаний.</ListItem>
          </List>
        </Content>
      </MainContainer>
      <Photo>
        <Circle />
        <Overlay />
      </Photo>
      <Arrow />
      <Romb />
    </Wrapper>
  );
};

export default Advantages;
