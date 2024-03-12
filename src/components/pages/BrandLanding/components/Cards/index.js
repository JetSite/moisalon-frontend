import { Wrapper, Card, IconWrap, Icon, CardTitle, CardText } from "./styles";

const Cards = () => {
  return (
    <Wrapper>
      <Card>
        <IconWrap>
          <Icon src="/for-brand-cards-icon1.svg" />
        </IconWrap>
        <CardTitle>
          Оперативный <br /> запуск
        </CardTitle>
        <CardText>
          Размещаем информацию <br /> о вас в течение 7 дней – <br /> после
          этого стартуют заказы.
        </CardText>
      </Card>
      <Card>
        <IconWrap>
          <Icon src="/for-brand-cards-icon2.svg" />
        </IconWrap>
        <CardTitle>
          Полная <br /> прозрачность
        </CardTitle>
        <CardText>
          Вы всегда в курсе деталей – <br /> сколько пользователей <br /> пришло
          к вам от нас, кто из <br /> них оформил заказ.
        </CardText>
      </Card>
      <Card>
        <IconWrap>
          <Icon src="/for-brand-cards-icon3.svg" />
        </IconWrap>
        <CardTitle>
          Большие <br /> объемы{" "}
        </CardTitle>
        <CardText>
          Мастера и салоны закупают <br /> косметику и расходные <br />{" "}
          материалы преимущественно <br /> мелким и крупным оптом.
        </CardText>
      </Card>
      <Card>
        <IconWrap>
          <Icon src="/for-brand-cards-icon4.svg" />
        </IconWrap>
        <CardTitle>
          Растущая <br /> популярность
        </CardTitle>
        <CardText>
          Численность постоянных <br />
          и новых пользователей стабильно <br /> увеличивается, а с ними и спрос
          на <br /> вашу продукцию.{" "}
        </CardText>
      </Card>
    </Wrapper>
  );
};

export default Cards;
