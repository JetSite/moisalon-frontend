import { TextField } from "../../../../../Form";
import Button from "../../../../../ui/Button";
import { required } from "../../../../../../utils/validations";
import { MobileHidden } from "../../../../../../styles/common";
import {
  WrapperForm,
  FieldWrap,
  PriceWrap,
  FieldPriceWrap,
  Title,
  FieldTitleStyled,
  FieldStyled,
} from "./styles";
import PhotoArrayField from "../../../../../blocks/Form/PhotoArrayField/PhotoArrayField";

const BrandCabinetProducts = ({ ref1, handleClickNextTab }) => {
  const photoArrayProps = {
    photoType: "salonPhoto",
    kind: "small",
  };
  return (
    <WrapperForm ref={ref1} id="products">
      <Title>
        Добавьте популярные продукты бренда, которые можно будет приобрести на
        платформе.
      </Title>
      <FieldWrap>
        <FieldStyled
          name="name"
          component={TextField}
          label="Название"
          validate={required}
          requiredField
        />
      </FieldWrap>
      <FieldWrap>
        <FieldStyled
          name="description"
          component={TextField}
          label="Описание продукта"
          validate={required}
          requiredField
        />
      </FieldWrap>
      <PriceWrap>
        <FieldPriceWrap>
          <FieldStyled
            name="price1"
            component={TextField}
            label="Розничная цена"
            type="number"
            validate={required}
            requiredField
          />
        </FieldPriceWrap>
        <FieldPriceWrap>
          <FieldStyled
            name="price2"
            component={TextField}
            label="Оптовая цена"
            type="number"
            validate={required}
            requiredField
          />
        </FieldPriceWrap>
      </PriceWrap>

      <FieldTitleStyled requiredField>Фото продукта</FieldTitleStyled>
      <PhotoArrayField {...photoArrayProps} />
      <MobileHidden>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleClickNextTab();
          }}
          variant="red"
          size="width374"
          mt="66"
        >
          Далее
        </Button>
      </MobileHidden>
    </WrapperForm>
  );
};

export default BrandCabinetProducts;
