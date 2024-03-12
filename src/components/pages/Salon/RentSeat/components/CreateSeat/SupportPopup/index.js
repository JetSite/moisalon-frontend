import { useEffect, useRef } from "react";
import Link from "next/link";
import { CSSTransition } from "react-transition-group";
import { Wrapper, PopupWrapper, Text, Buttons, CustomButton } from "./styles";

const SupportPopup = ({ showSupportPopup, setShowSupportPopup }) => {
  const popupRef = useRef(null);

  const useOutsideClick = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowSupportPopup(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideClick(popupRef);

  return (
    <CSSTransition
      in={showSupportPopup}
      classNames="fadeBg"
      timeout={300}
      unmountOnExit
    >
      {() => (
        <Wrapper>
          <PopupWrapper ref={popupRef}>
            <Text>Нужна помощь специалиста?</Text>
            <Buttons>
              <CustomButton variant="red">
                <Link href="tel:+79852203700">позвонить</Link>
              </CustomButton>
              <CustomButton variant="red">
                <Link href="mailto:support@moi.salon">написать</Link>
              </CustomButton>
            </Buttons>
          </PopupWrapper>
        </Wrapper>
      )}
    </CSSTransition>
  );
};

export default SupportPopup;
