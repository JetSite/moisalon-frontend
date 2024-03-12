import { MobileHidden, MobileVisible } from "../../../../../styles/common";
import { Bottom, ButtonStyled } from "./styles";

const RibbonBottomButton = () => {
  return (
    <Bottom>
      <MobileHidden>
        <ButtonStyled variant="red" size="mediumNoPadding" font="medium">
          Подписка на бьюти-ленту
        </ButtonStyled>
      </MobileHidden>
      <MobileVisible>
        <ButtonStyled variant="red" size="mediumNoPadding" font="popUp">
          Подписка на бьюти-ленту
        </ButtonStyled>
      </MobileVisible>
    </Bottom>
  );
};

export default RibbonBottomButton;
