import { MainContainer } from "../../../../../styles/common";
import {
  Wrapper,
  Title,
  Text,
  TasksCards,
  TasksCard,
  CardNumber,
  CardText,
} from "./styles";

const Tasks = () => {
  return (
    <>
      <MainContainer>
        <Wrapper>
          <Title>
            Решаем 4 ключевые задачи производителей <br /> и дистрибьюторов
            косметики
          </Title>
          <Text>
            Открыты для сотрудничества с отечественными и зарубежными брендами
            профессиональной косметики и товаров для бьюти-индустрии. Наше
            предложение будет интересно всем, кто:{" "}
          </Text>
        </Wrapper>
      </MainContainer>
      <TasksCards>
        <TasksCard>
          <CardNumber>01.</CardNumber>
          <CardText>
            ищет новый канал <br /> реализации продукции
          </CardText>
        </TasksCard>
        <TasksCard>
          <CardNumber>02.</CardNumber>
          <CardText>
            хочет увеличить долю <br /> оптовых заказов
          </CardText>
        </TasksCard>
        <TasksCard>
          <CardNumber>03.</CardNumber>
          <CardText>
            стремится расширить географию <br /> присутствия в регионах без{" "}
            <br /> масштабных вложений
          </CardText>
        </TasksCard>
        <TasksCard>
          <CardNumber>04.</CardNumber>
          <CardText>
            работает над повышением <br /> узнаваемости бренда
          </CardText>
        </TasksCard>
      </TasksCards>
    </>
  );
};

export default Tasks;
