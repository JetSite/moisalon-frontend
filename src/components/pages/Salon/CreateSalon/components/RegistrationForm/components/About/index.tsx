import { Field } from 'react-final-form'
import { TextField } from '../../../../../../../blocks/Form'
import Button from '../../../../../../../ui/Button'
import {
  required,
  email,
  composeValidators,
} from '../../../../../../../../utils/validations'
import {
  WrapperForm,
  FieldWrap,
  VideoFieldWrap,
  FieldTitleStyled,
  FieldStyled,
} from '../../styled'
import { MobileHidden } from '../../../../../../../../styles/common'
import AddressNoSalonField from '../../../../../../../blocks/Form/AddressField/AddressNoSalonField'
import PhotoArrayField from '../../../../../../../blocks/Form/PhotoArrayField/PhotoArrayField'
import PhoneArrayField from '../../../../../../../blocks/Form/PhoneField/PhoneArrayField'
import { Checkbox, Label } from '../../../../../../Rent/RentFilter/style'
import { FC, RefObject, useState } from 'react'
import { ISetState } from 'src/types/common'

interface Props {
  number: number
  ref1: RefObject<HTMLDivElement>
  setClickAddress: ISetState<boolean>
  handleClickNextTab: (number: number) => void
}

const About: FC<Props> = ({
  setClickAddress,
  ref1,
  handleClickNextTab,
  number,
}) => {
  const [view, setView] = useState<boolean>(false)
  const photoArrayProps = {
    photoType: 'salonPhoto',
    kind: 'small',
  }

  return (
    <WrapperForm ref={ref1} id="about">
      <FieldWrap>
        <FieldStyled
          name="salonName"
          component={TextField}
          label="Название"
          validate={required}
          requiredField
        />
      </FieldWrap>
      <FieldWrap>
        <PhoneArrayField name="salonPhones" />
      </FieldWrap>
      <FieldWrap>
        <FieldStyled
          name="salonEmail"
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
          // disabled
          setClickAddress={setClickAddress}
          component={AddressNoSalonField}
          label="Адрес"
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
      <FieldTitleStyled requiredField>Фото салона</FieldTitleStyled>
      <PhotoArrayField
        {...photoArrayProps}
        description="Загрузите до 10 фото интерьера салона – это поможет клиенту сделать выбор. Рекомендуем горизонтальную ориентацию фото."
      />
      <VideoFieldWrap>
        <Field
          name="video"
          component={TextField}
          label="Ссылка на видеообзор салона"
        />
      </VideoFieldWrap>
      <VideoFieldWrap>
        <Field
          name="salonOnlineBookingUrl"
          component={TextField}
          label="Ссылка на ваш сервис онлайн записи"
        />
      </VideoFieldWrap>
      <FieldWrap>
        <FieldStyled
          name="salonDescription"
          component={TextField}
          multiline={true}
          minRows={1}
          maxRows={5}
          maxLength={1200}
          validate={required}
          label="О салоне: Что делает ваш салон особенным? Расскажите здесь"
          requiredField
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