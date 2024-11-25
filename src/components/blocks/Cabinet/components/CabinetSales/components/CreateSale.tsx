import styled from 'styled-components'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AutoFocusedForm from '../../../../Form/AutoFocusedForm'
import { FieldStyled } from '../../CabinetForm/styled'
import { TextField } from '../../../../Form'
import { required } from '../../../../../../utils/validations'
import ErrorPopup from '../../../../Form/Error'
import { laptopBreakpoint } from '../../../../../../styles/variables'
import Button from '../../../../../ui/Button'
import Sale from '../../../../Sale'
import Popup from '../../../../../ui/Popup'
import { IProfileWithPromotions, IProfileType } from '..'
import { IPhoto } from 'src/types'
import { ISetState } from 'src/types/common'
import { IPromotions } from 'src/types/promotions'
import {
  IInitialValuesSaleForm,
  getInitialValuesSaleForm,
} from '../utils/getInitialValuesSaleForm'
import removeUnchangedFields from 'src/utils/newUtils/removeUnchangedFields'
import { usePromotionMutate } from '../utils/usePromotionMutate'
import { parseFieldsToString } from 'src/utils/newUtils/formsHelpers'
import { FormApi } from 'final-form'

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

export interface CreateSaleProps {
  type: IProfileType
  activeProfile: IProfileWithPromotions
  setCreateSale: ISetState<boolean>
  sale: IPromotions | null
  setSales: ISetState<IPromotions[]>
}

const CreateSale: FC<CreateSaleProps> = ({
  setCreateSale,
  type,
  activeProfile,
  sale,
  setSales,
}) => {
  const [errors, setErrors] = useState<string[] | null>(null)
  const [openPopup, setOpenPopup] = useState(false)
  const [photo, setPhoto] = useState<IPhoto | null>(sale?.cover || null)
  const [buttonPublish, setButtonPublish] = useState(false)
  const { loading, handleCreateOrUpdate } = usePromotionMutate({
    setErrors,
    setSales,
  })
  const formRef = useRef<FormApi<IInitialValuesSaleForm>>()
  useEffect(() => {
    formRef.current?.change('cover', photo)
  }, [photo, formRef.current])

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

      handleCreateOrUpdate({
        setOpenPopup,
        input,
        valueType: { [type as string]: activeProfile.id },
        sale,
        buttonPublish,
        promotions: activeProfile.promotions || [],
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [photo, activeProfile, sale, buttonPublish],
  )

  const closePopup = () => {
    setOpenPopup(false)
    setCreateSale(false)
  }

  const handleFormSubscription = useCallback(
    (form: FormApi<IInitialValuesSaleForm>) => {
      formRef.current = form
    },
    [],
  )

  return (
    <>
      <AutoFocusedForm<IInitialValuesSaleForm>
        onSubmit={onSubmit}
        subscription={{ values: true }}
        initialValues={initialValues}
        render={({ handleSubmit, pristine, values, form }) => {
          handleFormSubscription(form)
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
              <ErrorPopup errors={errors} setErrors={setErrors} />

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
