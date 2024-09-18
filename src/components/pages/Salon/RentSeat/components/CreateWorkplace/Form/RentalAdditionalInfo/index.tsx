import { Children, FC, ReactNode, useEffect } from 'react'
import { Field } from 'react-final-form'
import { TextField } from '../../../../../../../blocks/Form'
import {
  required,
  min,
  composeValidators,
} from '../../../../../../../../utils/validations'
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
  FieldWrapItem,
} from './styles'
import { Back } from '../../styles'
import { FieldStyled } from '../../styles'
import { IChildren, ISetState } from 'src/types/common'
import { IGroupedCategories } from 'src/utils/getGrupedServices'
import { IQuantityFieldsWorkplaceConfig } from '../../../../config'
import { WorkplaceEquipments } from './WorkplaceEquipments'
import { parseFieldsToString } from 'src/utils/newUtils/formsHelpers'

export interface IRentalAdditionalInfoProps {
  groupedEquipments: IGroupedCategories[]
  setShowAdditionalInfo: ISetState<boolean>
  quantityFields: IQuantityFieldsWorkplaceConfig[]
  children: IChildren
}

const RentalAdditionalInfo: FC<IRentalAdditionalInfoProps> = ({
  groupedEquipments,
  setShowAdditionalInfo,
  quantityFields,
  children,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const liquidPointsArr = quantityFields.filter(
    ({ type }) => type === 'Мокрые точки',
  )
  const electricityPointsArr = quantityFields.filter(
    ({ type }) => type === 'Точки электричества',
  )

  return (
    <Wrapper>
      <Back
        onClick={() => {
          setShowAdditionalInfo(false)
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
          parse={parseFieldsToString}
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
          parse={parseFieldsToString}
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
          parse={parseFieldsToString}
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
      <ul>
        <CheckboxWrapper>
          <CheckboxElement
            name="shareRent"
            component="input"
            type="checkbox"
            id="shareRent"
          />
          <Label htmlFor="shareRent">Совместная аренда</Label>
        </CheckboxWrapper>
        <CheckboxWrapper>
          <CheckboxElement
            name="subRent"
            component="input"
            type="checkbox"
            id="subRent"
          />
          <Label htmlFor="subRent">Возможность субаренды</Label>
        </CheckboxWrapper>
      </ul>
      <WorkplaceEquipments groupedEquipments={groupedEquipments} />
      <Detail>Мокрые точки</Detail>
      <ul>
        {liquidPointsArr.map(field => (
          <FieldWrapItem key={field.name}>
            <FieldStyled
              parse={parseFieldsToString}
              name={field.name}
              component={TextField}
              label={field.label}
              type="number"
              maxLength={2}
              inputMode="numeric"
              validate={min(0)}
            />
          </FieldWrapItem>
        ))}
      </ul>
      <Detail>Точки электричества</Detail>
      <ul>
        {electricityPointsArr.map(field => (
          <FieldWrapItem key={field.name}>
            <FieldStyled
              parse={parseFieldsToString}
              name={field.name}
              component={TextField}
              label={field.label}
              type="number"
              maxLength={2}
              inputMode="numeric"
              validate={min(0)}
            />
          </FieldWrapItem>
        ))}
      </ul>
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
  )
}

export default RentalAdditionalInfo
