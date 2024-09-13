import { Field } from 'react-final-form'
import { PhoneField, TextField } from '../../../../../../../blocks/Form'
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
import { Checkbox, Label } from '../../../../../../Rent/RentFilter/style'
import { FC, RefObject, useState } from 'react'
import { ISetState } from 'src/types/common'
import { ICity } from 'src/types'
import { IHandleClickNextTabInForm } from 'src/components/pages/Salon/CreateSalon'
import { parseFieldsToString } from 'src/utils/newUtils/formsHelpers'

export interface IFormAboutProps {
  setClickCity: ISetState<string | null>
  number: number
  handleClickNextTab: IHandleClickNextTabInForm
  ref1: RefObject<HTMLDivElement>
  setCoordinates: ISetState<ICoordinate | null>
}

const About: FC<IFormAboutProps> = ({
  ref1,
  handleClickNextTab,
  number,
  setClickCity,
  setCoordinates,
}) => {
  const [view, setView] = useState<boolean>(true)

  return (
    <WrapperForm ref={ref1} id="about">
      <FieldWrap>
        <FieldStyled
          parse={parseFieldsToString}
          name="name"
          component={TextField}
          label="ФИО"
          validate={required}
          requiredField
        />
      </FieldWrap>
      <FieldWrap>
        <PhoneField name="phone" label="Телефон" requiredField />
      </FieldWrap>
      <FieldWrap>
        <FieldStyled
          parse={parseFieldsToString}
          name="email"
          component={TextField}
          label="E-mail"
          validate={composeValidators(required, email)}
          inputMode="email"
          requiredField
        />
      </FieldWrap>
      <FieldWrap>
        <FieldStyled
          parse={parseFieldsToString}
          name="address"
          setClickCity={setClickCity}
          component={AddressNoSalonField}
          setCoordinates={setCoordinates}
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
      {/* <FieldWrap>
        <Field
          parse={parseFieldsToString}
          name="birthday"
          component={TextField}
          label="Дата рождения"
        />
      </FieldWrap> */}
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
