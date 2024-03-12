import { MobileVisible } from "../../../../styles/common";
import { AdvWrapper, AdvItem, AdvTitle, AdvText, MobileTitle } from "../styles";

const elements = [
  { title: "Быстро", text: "Находите то, что нужно, за пару минут" },
  { title: "Удобно", text: "Вся beauty-индустрия в одном месте" },
  {
    title: "Выгодно",
    text: "Не влияем на ценообразование –транслируем цены напрямую",
  },
  { title: "Бесплатно", text: "Свободная регистрация и создание профиля" },
  { title: "Прицельно", text: "Только целевая аудитория" },
  { title: "Везде", text: "География – вся Россия" },
];

const Advantages = () => {
  return (
    <>
      <MobileVisible>
        <MobileTitle>Работаем, чтобы вы были эффективнее</MobileTitle>
      </MobileVisible>
      <AdvWrapper>
        {elements.map((el, id) => (
          <AdvItem key={id}>
            <AdvTitle>{el.title}</AdvTitle>
            <AdvText>{el.text}</AdvText>
          </AdvItem>
        ))}
      </AdvWrapper>
    </>
  );
};

export default Advantages;
