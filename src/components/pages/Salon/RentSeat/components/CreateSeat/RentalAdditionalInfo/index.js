import { useEffect } from "react";
import { Field } from "react-final-form";
import { TextField } from "../../../../../../blocks/Form";
import {
  required,
  min,
  composeValidators,
} from "../../../../../../../utils/validations";
import {
  Wrapper,
  Title,
  FieldWrap,
  Desc,
  Subdesc,
  SubdescDescription,
  Detail,
  CheckboxWrapper,
  CheckboxElement,
  Label,
  CheckboxLicenseWrapper,
} from "./styles";
import { Back } from "../styles";
import { FieldStyled } from "../styles";
import TechnicalList from "../TechnicalList";
import EquipmentList from "../EquipmentList";
import TechnicalBlock from "./TechnicalBlock";

const RentalAdditionalInfo = ({
  children,
  catalogs,
  equipmentCatalog,
  setShowAdditionalInfo,
}) => {
  const technicalParameters =
    catalogs?.salonRoomServicesCatalog?.groups[0]?.subGroups.filter(
      (item) => item.id !== "electricity_sockets"
    );
  const equipment = catalogs?.salonWorkplacesServicesCatalog?.groups[2];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <Wrapper>
      <Back
        onClick={() => {
          setShowAdditionalInfo(false);
        }}
      >
        Перейти в "Фото и назначение рабочего места"
      </Back>
      <Title>Параметры сдаваемого места</Title>
      <Subdesc>
        Опишите здесь общие параметры для рабочих мест, которые вы будете
        сдавать в своем салоне, чтобы не делать это для каждого рабочего места в
        отдельности
      </Subdesc>
      <FieldWrap>
        <Field
          name="description"
          component={TextField}
          multiline={true}
          maxLength={1200}
          label="Описание"
        />
      </FieldWrap>
      <SubdescDescription>
        Дайте краткое описание деятельности рабочего места/кабинета
      </SubdescDescription>
      <FieldWrap>
        <FieldStyled
          name="space"
          component={TextField}
          label="Площадь помещения"
          type="number"
          maxLength={9}
          inputMode="numeric"
          validate={composeValidators(min(1), required)}
        />
      </FieldWrap>
      <FieldWrap>
        <FieldStyled
          name="floor"
          component={TextField}
          label="Этаж"
          type="number"
          maxLength={2}
          inputMode="numeric"
          validate={composeValidators(min(1), required)}
        />
      </FieldWrap>
      <Desc>Сотрудничество</Desc>
      <CheckboxWrapper>
        <CheckboxElement
          name="allowJointRental"
          component="input"
          type="checkbox"
          id="allowJointRental"
        />
        <Label htmlFor="allowJointRental">Совместная аренда</Label>
      </CheckboxWrapper>
      <CheckboxWrapper>
        <CheckboxElement
          name="allowSublease"
          component="input"
          type="checkbox"
          id="allowSublease"
        />
        <Label htmlFor="allowSublease">Возможность субаренды</Label>
      </CheckboxWrapper>
      <Desc>Оборудование</Desc>
      <EquipmentList catalog={equipmentCatalog} mbDesc={30} />
      <Desc>Параметры рабочего места/кабинета</Desc>
      {technicalParameters?.map((technicalParameter) => (
        <TechnicalBlock key={technicalParameter.id} item={technicalParameter} />
      ))}
      <Detail>Мокрые точки</Detail>
      <FieldWrap>
        <FieldStyled
          name="wetPointsHands"
          component={TextField}
          label="Для мытья рук, шт."
          type="number"
          maxLength={2}
          inputMode="numeric"
          // validate={min(0)}
        />
      </FieldWrap>
      <FieldWrap>
        <FieldStyled
          name="wetPointsHead"
          component={TextField}
          label="Для мытья головы, шт."
          type="number"
          maxLength={2}
          inputMode="numeric"
          // validate={min(0)}
        />
      </FieldWrap>
      <FieldWrap>
        <FieldStyled
          name="wetPointsShower"
          component={TextField}
          label="Душевые, шт."
          type="number"
          maxLength={2}
          inputMode="numeric"
          // validate={min(0)}
        />
      </FieldWrap>
      <CheckboxLicenseWrapper>
        <CheckboxElement
          name="withLicense"
          component="input"
          type="checkbox"
          id="withLicense"
        />
        <Label htmlFor="withLicense">Рабочее место с лицензией</Label>
      </CheckboxLicenseWrapper>
      {children}
    </Wrapper>
  );
};

export default RentalAdditionalInfo;
