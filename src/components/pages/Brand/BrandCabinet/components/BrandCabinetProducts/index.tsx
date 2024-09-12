import Button from '../../../../../ui/Button'
import { required } from '../../../../../../utils/validations'
import { MobileHidden } from '../../../../../../styles/common'
import {
  WrapperForm,
  FieldWrap,
  PriceWrap,
  FieldPriceWrap,
  Title,
  FieldTitleStyled,
  FieldStyled,
} from './styles'
import PhotoArrayField from '../../../../../blocks/Form/PhotoArrayField/PhotoArrayField'
import { FC, RefObject } from 'react'
import { IHandleClickNextTabInForm } from 'src/components/pages/Salon/CreateSalon'
import { TextField } from 'src/components/blocks/Form'
import { ISetState } from 'src/types/common'
import { IPhoto } from 'src/types'
import { IPhotoArrayPros } from 'src/components/pages/Salon/CreateSalon/components/RegistrationForm/components/About'

export interface BrandCabinetProductsProps {
  ref1: RefObject<HTMLDivElement>
  handleClickNextTab: IHandleClickNextTabInForm
  setPhotosArray: ISetState<IPhoto[]>
}

const BrandCabinetProducts: FC<BrandCabinetProductsProps> = ({
  ref1,
  handleClickNextTab,
  setPhotosArray,
}) => {
  const photoArrayProps: IPhotoArrayPros = {
    photoType: 'brandPhoto',
    kind: 'small',
    setPhotosArray,
  }
  return (
    <WrapperForm ref={ref1} id="products">
      <Title>
        Добавьте популярные продукты бренда, которые можно будет приобрести на
        платформе.
      </Title>
      <FieldWrap>
        <FieldStyled
          name="name"
          component={TextField}
          label="Название"
          validate={required}
          requiredField
        />
      </FieldWrap>
      <FieldWrap>
        <FieldStyled
          name="description"
          component={TextField}
          label="Описание продукта"
          validate={required}
          requiredField
        />
      </FieldWrap>
      <PriceWrap>
        <FieldPriceWrap>
          <FieldStyled
            name="price1"
            component={TextField}
            label="Розничная цена"
            type="number"
            validate={required}
            requiredField
          />
        </FieldPriceWrap>
        <FieldPriceWrap>
          <FieldStyled
            name="price2"
            component={TextField}
            label="Оптовая цена"
            type="number"
            validate={required}
            requiredField
          />
        </FieldPriceWrap>
      </PriceWrap>
      <FieldTitleStyled requiredField>Фото продукта</FieldTitleStyled>
      <PhotoArrayField
        {...photoArrayProps}
        description="Загрузите до 10 фото интерьера салона – это поможет клиенту сделать выбор. Рекомендуем горизонтальную ориентацию фото."
      />{' '}
      <MobileHidden>
        <Button
          onClick={e => {
            e.preventDefault()
            handleClickNextTab(1)
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

export default BrandCabinetProducts
