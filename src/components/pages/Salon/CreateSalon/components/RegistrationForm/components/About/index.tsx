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
import { IPhoto } from 'src/types'
import { ISalonPage } from 'src/types/salon'
import { IHandleClickNextTabInForm } from '../../../..'
import { IFormAboutProps } from 'src/components/pages/Master/CreateMaster/components/RegistrationForm/components/About'
import { IUsePhotoProps } from 'src/components/blocks/Form/PhotoArrayField/usePhotos'
import { parseFieldsToString } from 'src/utils/newUtils/formsHelpers'

interface Props extends IFormAboutProps {
  photos: IPhoto[]
  setPhotosArray: ISetState<IPhoto[]>
}

export interface IPhotoArrayPros
  extends Pick<IUsePhotoProps, 'photoType' | 'kind' | 'setPhotosArray'> {}

const About: FC<Props> = ({
  setClickCity,
  ref1,
  handleClickNextTab,
  number,
  photos,
  setPhotosArray,
}) => {
  const [view, setView] = useState<boolean>(true)
  const photoArrayProps: IPhotoArrayPros = {
    photoType: 'salonPhoto',
    kind: 'small',
    setPhotosArray,
  }

  return (
    <WrapperForm ref={ref1} id="about">
      <FieldWrap>
        <FieldStyled
          parse={parseFieldsToString}
          name="name"
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
          parse={parseFieldsToString}
          name="videoReviewUrl"
          component={TextField}
          label="Ссылка на видеообзор салона"
        />
      </VideoFieldWrap>
      <VideoFieldWrap>
        <Field
          parse={parseFieldsToString}
          name="onlineBookingUrl"
          component={TextField}
          label="Ссылка на ваш сервис онлайн записи"
        />
      </VideoFieldWrap>
      <FieldWrap>
        <FieldStyled
          parse={parseFieldsToString}
          name="description"
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
