import { Field } from "react-final-form";
import { CheckBox, PhoneField, TextField } from "../../../../../../../blocks/Form";
import Button from "../../../../../../../ui/Button";
import {
  required,
  email,
  composeValidators,
} from "../../../../../../../../utils/validations";
import { MobileHidden } from "../../../../../../../../styles/common";
import { WrapperForm, FieldWrap, FieldStyled } from "../../styled";
import AddressNoSalonField from "../../../../../../../blocks/Form/AddressField/AddressNoSalonField";
import { FC, RefObject, useState } from "react";
import { Checkbox, Label } from "src/components/pages/Rent/RentFilter/style";
import { ISetState } from "src/types/common";
import { IHandleClickNextTabInForm } from "src/components/pages/Salon/CreateSalon";

export interface IFormAboutProps {
  setClickCity: ISetState<string | null>
  number: number
  handleClickNextTab: IHandleClickNextTabInForm
  ref1: RefObject<HTMLDivElement>
}

const About: FC<IFormAboutProps> = ({ setClickCity, ref1, handleClickNextTab, number }) => {
  const [view, setView] = useState<boolean>(false)

  return (
    <WrapperForm ref={ref1} id="about">
      <FieldWrap>
        <Field
          name="name"
          component={TextField}
          label="Название *"
          validate={required}
        />
      </FieldWrap>
      <FieldWrap>
        <Field
          name="country"
          component={TextField}
          label="Страна производителя *"
          validate={required}
        />
      </FieldWrap>
      <FieldWrap>
        <PhoneField name="phone" label="Телефон *" />
      </FieldWrap>
      <FieldWrap>
        <Field
          name="email"
          component={TextField}
          label="E-mail *"
          validate={composeValidators(required, email)}
          inputMode="email"
        />
      </FieldWrap>
      <FieldWrap>
        <FieldStyled
          name="address"
          setClickCity={setClickCity}
          component={AddressNoSalonField}
          label="Адрес"
          validate={required}
          requiredField
          view={view}
        />
      </FieldWrap>
      <FieldWrap>
        <Field name="checkCart" type="checkbox">
          {({ input }) => {
            return (
              <>
                <Checkbox
                  onClick={() => setView(!view)}
                  {...input}
                  id={input?.name}
                />
                <Label htmlFor={'checkCart'}>{'Показать на карте'}</Label>
              </>
            )
          }}
        </Field>
      </FieldWrap>
      <FieldWrap>
        <Field
          name="description"
          component={TextField}
          label="Описание бренда"
          multiline={true}
          maxLength="20000"
        />
      </FieldWrap>
      <FieldWrap>
        <Field
          name="history"
          component={TextField}
          label="История бренда"
          multiline={true}
          maxLength="20000"
        />
      </FieldWrap>
      <FieldWrap>
        <Field
          name="manufacture"
          component={TextField}
          label="Производство бренда"
          multiline={true}
          maxLength="20000"
        />
      </FieldWrap>
      <MobileHidden>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleClickNextTab(number);
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

export default About;
