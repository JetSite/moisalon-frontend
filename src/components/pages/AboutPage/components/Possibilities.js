import { MobileVisible } from "../../../../styles/common";
import { PosWrapper, PosItem, PosListItem, MobileTitle } from "../styles";

const Possibilities = () => {
  return (
    <>
      <MobileVisible>
        <MobileTitle>
          Скоро с beauty-платформой МОЙ вы сможете больше:
        </MobileTitle>
      </MobileVisible>
      <PosWrapper>
        <PosItem>
          <PosListItem>вести онлайн-запись</PosListItem>
          <PosListItem>общаться во внутреннем чате</PosListItem>
        </PosItem>
        <PosItem>
          <PosListItem>
            размещать акции на услуги и товары с помощью встроенного редактора
          </PosListItem>
        </PosItem>
        <PosItem>
          <PosListItem>
            информировать о мастер-классах и образовательных программах
          </PosListItem>
        </PosItem>
        <PosItem>
          <PosListItem>
            оперативно узнавать обо всех beauty-мероприятиях
          </PosListItem>
        </PosItem>
        <PosItem>
          <PosListItem>размещать вакансии и резюме</PosListItem>
          <PosListItem>создавать списки избранного</PosListItem>
        </PosItem>
        <PosItem>
          <PosListItem>
            читать новости и участвовать как эксперт в создании beauty-ленты
          </PosListItem>
        </PosItem>
      </PosWrapper>
    </>
  );
};

export default Possibilities;
