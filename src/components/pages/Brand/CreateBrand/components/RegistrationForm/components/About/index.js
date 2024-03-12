import { Field } from "react-final-form";
import { PhoneField, TextField } from "../../../../../../../blocks/Form";
import Button from "../../../../../../../ui/Button";
import {
  required,
  email,
  composeValidators,
} from "../../../../../../../../utils/validations";
import { MobileHidden } from "../../../../../../../../styles/common";
import { WrapperForm, FieldWrap } from "../../styled";
import AddressNoSalonField from "../../../../../../../blocks/Form/AddressField/AddressNoSalonField";
import { CheckBoxCustom } from "../../../../../../../pages/Rent/RentFilter";

const About = ({ setClickAddress, ref1, handleClickNextTab, number }) => {
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
        <Field
          name="address"
          setClickAddress={setClickAddress}
          component={AddressNoSalonField}
          label="Адрес *"
          validate={required}
        />
      </FieldWrap>
      <FieldWrap>
        <Field name="checkCart" type="checkbox">
          {({ input }) => (
            <CheckBoxCustom input={input} label="Показать на карте" />
          )}
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
