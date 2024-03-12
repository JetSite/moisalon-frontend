import { useEffect } from "react";
import { Wrapper, Backdrop, Text, CloseSuccess } from "./styles";

const SuccessPopup = ({ openSuccess, setOpenSuccess }) => {
  useEffect(() => {
    if (openSuccess) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflowY = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflowY = "scroll";
    };
  });

  const closeSuccess = () => {
    setOpenSuccess(false);
  };

  return (
    <>
      <Backdrop isOpen={openSuccess} onClick={closeSuccess} />
      <Wrapper isOpen={openSuccess}>
        <Text>
          Спасибо, ваша заявка успешно отправлена! <br /> В ближайшее время
          представитель <br /> бьюти-платформы МОЙ свяжется с вами.
        </Text>
        <CloseSuccess onClick={closeSuccess} />
      </Wrapper>
    </>
  );
};

export default SuccessPopup;
