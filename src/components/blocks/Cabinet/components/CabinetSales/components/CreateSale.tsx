import styled from 'styled-components'
import { FC, FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import AutoFocusedForm from '../../../../Form/AutoFocusedForm'
import { FieldStyled } from '../../CabinetForm/styled'
import { TextField } from '../../../../Form'
import { required } from '../../../../../../utils/validations'
import Error from '../../../../Form/Error'
import { laptopBreakpoint } from '../../../../../../styles/variables'
import Button from '../../../../../ui/Button'
import Sale from '../../../../Sale'
import Popup from '../../../../../ui/Popup'
import { IPromotionsType } from '..'
import { ISalon } from 'src/types/salon'
import { IBrand } from 'src/types/brands'
import { IMaster } from 'src/types/masters'
import { IPhoto } from 'src/types'
import { IID, ISetState } from 'src/types/common'
import { IPromotions } from 'src/types/promotions'
import {
  IInitialValuesSaleForm,
  getInitialValuesSaleForm,
} from '../utils/getInitialValuesSaleForm'
import removeUnchangedFields from 'src/utils/newUtils/removeUnchangedFields'
import { usePromotionMutate } from '../utils/usePromotionMutate'
import { parseFieldsToString } from 'src/utils/newUtils/formsHelpers'

const FieldWrap = styled.div`
  margin-bottom: 14px;
`

const TextDate = styled.p`
  margin-left: 10px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-left: 0;
    margin-bottom: 10px;
  }
`

const FieldWrapDate = styled.div`
  margin-bottom: 14px;
  margin-top: 24px;
  display: flex;
  align-items: center;
  @media (max-width: ${laptopBreakpoint}) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 350px;
  margin-top: 66px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin-top: 40px;
  }
`

interface Props {
  type: IPromotionsType
  activeProfile: ISalon | IBrand | IMaster
  setCreateSale: ISetState<boolean>
  sale: IPromotions | null
  setSales: ISetState<IPromotions[]>
}

const CreateSale: FC<Props> = ({
  setCreateSale,
  type,
  activeProfile,
  sale,
  setSales,
}) => {
  const [errors, setErrors] = useState<string[] | null>(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [photo, setPhoto] = useState<IPhoto | null>(sale?.cover || null)
  const [buttonPublish, setButtonPublish] = useState(false)
  const { loading, handleCreateOrUpdate } = usePromotionMutate({
    setErrors,
    setErrorPopupOpen,
    setSales,
  })
  const initialValues = useMemo(
    () =>
      getInitialValuesSaleForm({
        sale,
        type,
        profileID: activeProfile?.id,
      }),
    [sale, type, activeProfile],
  )

  const onSubmit = useCallback(
    async (values: IInitialValuesSaleForm) => {
      if (!photo) {
        setErrors(['Необходимо добавить фото'])
        setErrorPopupOpen(true)
        return
      }
      const changetValues = removeUnchangedFields(values, initialValues, [
        'cover',
      ])

      const input = {
        title: changetValues.title,
        cover: changetValues.cover?.id || null,
        fullDescription: changetValues.fullDescription,
        shortDescription: changetValues.shortDescription,
        promoCode: changetValues.promoCode,
        dateStart: changetValues.dateStart,
        dateEnd: changetValues.dateEnd,
      }

      console.log(values)

      handleCreateOrUpdate({
        setOpenPopup,
        input,
        valueType: { [type as string]: activeProfile.id },
        sale,
        buttonPublish,
        promotions: activeProfile.promotions,
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [photo, activeProfile, sale, buttonPublish],
  )

  const closePopup = () => {
    setOpenPopup(false)
    setCreateSale(false)
  }

  console.log('activeProfile', activeProfile.promotions)

  return (
    <>
      <AutoFocusedForm<IInitialValuesSaleForm>
        onSubmit={onSubmit}
        subscription={{ values: true }}
        initialValues={initialValues}
        render={({ handleSubmit, pristine, values, form }) => {
          useEffect(() => {
            form.change('cover', photo)
          }, [photo])
          return (
            <form onSubmit={handleSubmit}>
              <ul style={{ marginBottom: 20 }}>
                <Sale
                  item={values as IPromotions}
                  photo={photo}
                  setPhoto={setPhoto}
                  type={type}
                  create
                />
              </ul>
              <FieldWrap>
                <FieldStyled
                  parse={parseFieldsToString}
                  name="title"
                  component={TextField}
                  label="Название акции"
                  validate={required}
                  requiredField
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  parse={parseFieldsToString}
                  name="shortDescription"
                  component={TextField}
                  label="Краткое описание акции"
                  validate={required}
                  multiline={true}
                  maxLength={1200}
                  requiredField
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  parse={parseFieldsToString}
                  name="fullDescription"
                  component={TextField}
                  label="Описание акции"
                  validate={required}
                  multiline={true}
                  maxLength={40000}
                  requiredField
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  parse={parseFieldsToString}
                  name="promoCode"
                  component={TextField}
                  label="Промокод"
                  maxLength={15}
                />
              </FieldWrap>
              <FieldWrapDate>
                <FieldStyled
                  parse={parseFieldsToString}
                  name="dateStart"
                  component={'input'}
                  type="date"
                  required
                />
                <TextDate>Дата начала акции</TextDate>
              </FieldWrapDate>
              <FieldWrapDate>
                <FieldStyled
                  parse={parseFieldsToString}
                  name="dateEnd"
                  component={'input'}
                  type="date"
                  required
                />
                <TextDate>Дата окончания акции</TextDate>
              </FieldWrapDate>
              <Error
                errors={errors}
                isOpen={isErrorPopupOpen}
                setOpen={setErrorPopupOpen}
              />
              <ButtonWrap>
                <Button
                  variant="red"
                  size="width100"
                  type="submit"
                  onClick={() => setButtonPublish(false)}
                  disabled={pristine || loading}
                >
                  {loading ? 'Подождите' : 'Сохранить'}
                </Button>
                <Button
                  value="public"
                  variant="red"
                  size="width100"
                  type="submit"
                  disabled={loading}
                  onClick={() => setButtonPublish(true)}
                >
                  {loading ? 'Подождите' : 'Опубликовать'}
                </Button>
                <Button
                  variant="darkTransparent"
                  size="width100"
                  type="submit"
                  onClick={() => setCreateSale(false)}
                >
                  Отменить
                </Button>
              </ButtonWrap>
            </form>
          )
        }}
      />
      <Popup
        isOpen={openPopup}
        onClose={closePopup}
        title="Ваша акция отправлена на модерацию, в течение суток/часов вы получите уведомление."
      >
        <Button style={{ marginTop: 20 }} onClick={closePopup} variant="red">
          Закрыть
        </Button>
      </Popup>
    </>
  )
}

export default CreateSale
