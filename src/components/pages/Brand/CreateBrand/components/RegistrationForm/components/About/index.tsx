import { Field } from 'react-final-form'
import {
  CheckBox,
  PhoneField,
  TextField,
} from '../../../../../../../blocks/Form'
import Button from '../../../../../../../ui/Button'
import {
  required,
  email,
  composeValidators,
} from '../../../../../../../../utils/validations'
import { MobileHidden } from '../../../../../../../../styles/common'
import { WrapperForm, FieldWrap, FieldStyled } from '../../styled'
import AddressNoSalonField, {
  ICoordinate,
} from '../../../../../../../blocks/Form/AddressField/AddressNoSalonField'
import { FC, RefObject, useState } from 'react'
import { Checkbox, Label } from 'src/components/pages/Rent/RentFilter/style'
import { ISetState } from 'src/types/common'
import { IHandleClickNextTabInForm } from 'src/components/pages/Salon/CreateSalon'
import { parseFieldsToString } from 'src/utils/newUtils/formsHelpers'
import PhoneArrayField from 'src/components/blocks/Form/PhoneField/PhoneArrayField'
import CountryField from 'src/components/blocks/Form/AddressField/CountryField'

export interface IFormAboutProps {
  setSelectCity: ISetState<string | null>
  setSelectCountry: ISetState<string | null>
  number: number
  handleClickNextTab: IHandleClickNextTabInForm
  ref1: RefObject<HTMLDivElement>
  setCootdinates: ISetState<ICoordinate | null>
}

const About: FC<IFormAboutProps> = ({
  setSelectCity,
  setSelectCountry,
  ref1,
  handleClickNextTab,
  setCootdinates,
  number,
}) => {
  const [view, setView] = useState<boolean>(true)

  return (
    <WrapperForm ref={ref1} id="about">
      <FieldWrap>
        <Field
          parse={parseFieldsToString}
          name="name"
          component={TextField}
          label="Название *"
          validate={required}
        />
      </FieldWrap>
      <FieldWrap>
        <FieldStyled
          name="country"
          setSelectCountry={setSelectCountry}
          component={CountryField}
          label="Страна производителя *"
          validate={required}
          requiredField
        />
      </FieldWrap>
      <FieldWrap>
        <PhoneArrayField name="phones" />
      </FieldWrap>
      <FieldWrap>
        <Field
          parse={parseFieldsToString}
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
          setClickCity={setSelectCity}
          setCootdinates={setCootdinates}
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
          parse={parseFieldsToString}
          name="minimalOrderPrice"
          component={TextField}
          type="number"
          label="Минимальная сумма доставки"
        />
      </FieldWrap>
      <FieldWrap>
        <Field
          parse={parseFieldsToString}
          name="termsDeliveryPrice"
          component={TextField}
          multiline={true}
          maxLength="20000"
          label="Условия и стоимость доставки"
        />
      </FieldWrap>
      <FieldWrap>
        <Field
          parse={parseFieldsToString}
          name="description"
          component={TextField}
          label="Описание бренда"
          multiline={true}
          maxLength="20000"
        />
      </FieldWrap>
      <FieldWrap>
        <Field
          parse={parseFieldsToString}
          name="history"
          component={TextField}
          label="История бренда"
          multiline={true}
          maxLength="20000"
        />
      </FieldWrap>
      <FieldWrap>
        <Field
          parse={parseFieldsToString}
          name="manufacture"
          component={TextField}
          label="Производство бренда"
          multiline={true}
          maxLength="20000"
        />
      </FieldWrap>
      <MobileHidden>
        <Button
          onClick={e => {
            e.preventDefault()
            handleClickNextTab(number)
          }}
          variant="red"
          size="width374"
          mt="66"
        >
          Далее
        </Button>
      </MobileHidden>
    </WrapperForm>
  )
}

export default About
