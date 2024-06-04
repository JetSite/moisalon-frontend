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
import AddressNoSalonField from '../../../../../../../blocks/Form/AddressField/AddressNoSalonField'
import { CheckBoxCustom } from '../../../../../../../pages/Rent/RentFilter'

const About = ({ setClickAddress, ref1, handleClickNextTab, number }) => {
  return (
    <WrapperForm ref={ref1} id="about">
      <FieldWrap>
        <FieldStyled
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
          name="address"
          setClickAddress={setClickAddress}
          component={AddressNoSalonField}
          label="Адрес"
          validate={required}
          requiredField
        />
      </FieldWrap>
      {/* <FieldWrap>
        <Field name="checkCart" type="checkbox">
          {({ input }) => (
            <CheckBoxCustom input={input} label="Показать на карте" />
          )}
        </Field>
      </FieldWrap> */}
      <FieldWrap>
        <Field name="birthday" component={TextField} label="Дата рождения" />
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
