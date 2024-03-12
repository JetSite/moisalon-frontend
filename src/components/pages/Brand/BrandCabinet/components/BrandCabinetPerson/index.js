import { Field } from "react-final-form";
import { TextField } from "../../../../../Form";
import { email } from "../../../../../../utils/validations";
import {
  WrapperForm,
  FieldWrap,
  Title,
  AvatarWrap,
  AddPerson,
  Plus,
} from "./styles";
import { PhoneField } from "../../../../../Form";
import AddressNoSalonField from "../../../../../blocks/Form/AddressField/AddressNoSalonField";
import Avatar from "../../../../../blocks/Form/Avatar";

const BrandCabinetPerson = ({ ref3 }) => {
  const photoArrayProps = {
    photoType: "salonPhoto",
    kind: "small",
  };
  return (
    <WrapperForm ref={ref3} id="person">
      <Title>
        Вы можете добавлять новых пользователей с предоставлением им прав
        доступа на управление некоторой информацией страницы бренда, общением с
        мастерами и обработке заказов.
      </Title>
      <FieldWrap>
        <Field name="name" component={TextField} label="Имя" />
      </FieldWrap>
      <FieldWrap>
        <PhoneField name="phone" label="Телефон" requiredField="false" />
      </FieldWrap>
      <FieldWrap>
        <Field
          name="email"
          component={TextField}
          label="E-mail"
          validate={email}
          inputMode="email"
        />
      </FieldWrap>
      <FieldWrap>
        <Field name="address" component={AddressNoSalonField} label="Город" />
      </FieldWrap>
      <AvatarWrap>
        <Title>Фото регионального представителя</Title>
        <Avatar title="фото" red />
      </AvatarWrap>
      <AddPerson>
        <Title>Добавить других региональных представителей</Title>
        <Plus />
      </AddPerson>
    </WrapperForm>
  );
};

export default BrandCabinetPerson;
