import { useRouter } from "next/router";
import Button from "../../../../ui/Button";
import { MobileVisible, MobileHidden } from "../../../../../styles/common";
import { BrandWrap, Logo, Image, Price, ButtonStyled } from "./styles";
import { PHOTO_URL } from "../../../../../../variables";

const BrandItem = ({ brand, filterProduct }) => {
  const router = useRouter();

  const clickHandler = () => {
    router.push({
      pathname: `/catalogB2b/${brand.id}/product`,
      query: {
        value: filterProduct?.value,
        label: filterProduct?.label,
        brand: brand?.name,
      },
    });
  };

  return (
    <BrandWrap>
      <Logo>
        <Image
          alt="logoBrand"
          src={`${PHOTO_URL}${brand?.logoId}/original`}
        />
      </Logo>
      {brand?.minimalOrderPrice ? (
        <Price>
          от{" "}
          {Number(
            brand?.minimalOrderPrice.replace(/\s/g, "")
          )?.toLocaleString() || 0}{" "}
          ₽
        </Price>
      ) : null}
      <MobileHidden>
        <Button
          variant="redWithRoundBorder"
          size="round114"
          font="roundMedium"
          onClick={clickHandler}
        >
          Заказать
        </Button>
      </MobileHidden>
      <MobileVisible>
        <ButtonStyled
          variant="redWithRoundBorder"
          size="roundSmallFullWidth"
          font="roundSmall"
          onClick={clickHandler}
        >
          Заказать
        </ButtonStyled>
      </MobileVisible>
    </BrandWrap>
  );
};

export default BrandItem;
