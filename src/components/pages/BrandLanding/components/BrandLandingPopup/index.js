import { useEffect } from "react";
import Form from "../Login/Form";
import {
  Wrapper,
  Backdrop,
  Title,
  Subtitle,
  Left,
  Right,
  Close,
} from "./styles";

const BrandLandingPopup = ({ openPopup, setOpenPopup, setOpenSuccess }) => {
  useEffect(() => {
    if (openPopup) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflowY = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflowY = "scroll";
    };
  });

  const closePopup = () => {
    setOpenPopup(false);
  };

  return (
    <>
      <Backdrop isOpen={openPopup} onClick={closePopup} />
      <Wrapper isOpen={openPopup}>
        <Left>
          <Title>Новый канал продаж без масштабных инвестиций</Title>
          <Subtitle>
            Отправьте нам заявку на сотрудничество — наши менеджеры свяжутся с
            вами, чтобы обсудить детали.
          </Subtitle>
        </Left>
        <Right>
          <Form setOpenSuccess={setOpenSuccess} setOpenPopup={setOpenPopup} />
        </Right>
        <Close onClick={closePopup} />
      </Wrapper>
    </>
  );
};

export default BrandLandingPopup;
