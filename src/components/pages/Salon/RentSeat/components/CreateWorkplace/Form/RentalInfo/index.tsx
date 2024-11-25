import { FC, useEffect, useState } from 'react'
import {
  MobileHidden,
  MobileVisible,
} from '../../../../../../../../styles/common'
import {
  Desc,
  Subdesc,
  Title,
  DescPhoto,
  SupportLink,
  SupportTextBottom,
  FieldWrap,
} from '../../styles'
import DefaultPhoto from '../../DefaultPhoto'
import { TextField } from '../../../../../../../blocks/Form'
import { Field, useForm } from 'react-final-form'
import Services from './Services'
import RentalPeriod from '../RentalInfo/RentalPeriod'
import SupportPopup from '../../SupportPopup'
import { parseFieldsToString } from 'src/utils/newUtils/formsHelpers'
import PhotoArrayField from 'src/components/blocks/Form/PhotoArrayField'
import {
  IPaymentMethods,
  IPhoto,
  IRentalPeriod,
  IWorkplacesType,
} from 'src/types'
import { IChildren, ISetState } from 'src/types/common'
import { IService } from 'src/types/services'
import { IPeriod } from '../../type'
import {
  CheckboxElement,
  CheckboxWrapper,
  Label,
  Wrapper,
} from '../RentalAdditionalInfo/styles'
import DictionaryField from 'src/components/blocks/Form/DictionaryField'
import { WorkplaceTypes } from './WorkplaceTypes'
import { required } from 'src/utils/validations'

export interface IRentalInfoProps {
  services: IService[]
  rentalPeriods: IRentalPeriod[]
  paymentMethods: IPaymentMethods[]
  cover: IPhoto | null
  setCover: ISetState<IPhoto | null>
  initialPeriod: IPeriod[]
  children: IChildren
  workplaceTypes: IWorkplacesType[]
}

export const RentalInfo: FC<IRentalInfoProps> = ({
  services,
  rentalPeriods,
  paymentMethods,
  cover,
  setCover,
  initialPeriod,
  children,
  workplaceTypes,
}) => {
  const [showSupportPopup, setShowSupportPopup] = useState(false)
  const form = useForm()

  useEffect(() => {
    if (cover) form.change('cover', cover?.id)
  }, [cover])

  return (
    <Wrapper>
      <Title>Фото и назначение сдаваемого рабочего места</Title>
      <DescPhoto>Загрузите главное фото*</DescPhoto>
      <DefaultPhoto defaultPhoto={cover} setDefaultPhoto={setCover} />
      <Desc>Загрузите фотографии в фотогалерею*</Desc>
      <PhotoArrayField
        photoType="salonPhoto"
        kind="small"
        name="gallery"
        description="Загрузите до 10 фото рабочего места – это поможет мастеру сделать выбор. Рекомендуем горизонтальную ориентацию фото."
      />
      <FieldWrap>
        <Desc>Назовите рабочее место</Desc>
        <Field
          parse={parseFieldsToString}
          name="title"
          component={TextField}
          multiline={true}
          maxLength={1200}
          label="Название"
          validate={required}
          requiredField
        />
      </FieldWrap>
      <WorkplaceTypes
        workplaceTypes={workplaceTypes}
        setShowSupportPopup={setShowSupportPopup}
      />
      <Services services={services} setShowSupportPopup={setShowSupportPopup} />
      <Desc>Стоимость и период аренды*</Desc>
      <Subdesc>
        Выберите оптимальные для вас периоды аренды рабочего места и укажите
        цену. Заполните только нужные вам поля, а остальные оставьте пустыми
      </Subdesc>
      <RentalPeriod
        initialPeriod={initialPeriod}
        rentalPeriods={rentalPeriods}
      />
      <Desc>Способы оплаты</Desc>
      <ul style={{ marginBottom: '30px' }}>
        {paymentMethods.map(method => (
          <CheckboxWrapper key={method.id}>
            <CheckboxElement
              name="paymentMethods"
              component="input"
              type="checkbox"
              value={method.id}
              id={method.id}
            />
            <Label htmlFor={method.id}>{method.title}</Label>
          </CheckboxWrapper>
        ))}
      </ul>
      {children}
      <SupportPopup
        showSupportPopup={showSupportPopup}
        setShowSupportPopup={setShowSupportPopup}
      />
      <SupportTextBottom>
        Возникли сложности с заполнением?
        <br />
        <SupportLink onClick={() => setShowSupportPopup(true)}>
          Обратитесь к нашим специалистам за помощью
        </SupportLink>
      </SupportTextBottom>
    </Wrapper>
  )
}
