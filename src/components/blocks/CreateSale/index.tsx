import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { FC, useCallback, useState } from 'react'
import AutoFocusedForm from '../Form/AutoFocusedForm'
import { FieldStyled } from '../Cabinet/components/CabinetForm/styled'
import { TextField } from '../Form'
import { required } from '../../../utils/validations'
import Error from '../Form/Error'
import { laptopBreakpoint } from '../../../styles/variables'
import Button from '../../ui/Button'
import Sale from '../Sale'
import { createSaleMutation } from '../../../_graphql-legacy/sales/createSaleMutation'
import Popup from '../../ui/Popup'
import { IPromotionsType } from '../Cabinet/components/CabinetSales'
import { ISalon } from 'src/types/salon'
import { IBrand } from 'src/types/brands'
import { IMaster } from 'src/types/masters'
import { IPhoto } from 'src/types'
import { CREATE_PROMOTION } from 'src/api/graphql/promotion/mutations/createPromotion'
import { ISetState } from 'src/types/common'
import { IPromotions } from 'src/types/promotions'

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
  width: 350px;
  margin-top: 66px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin-top: 40px;
  }
`

type IFormValues = Pick<
  IPromotions,
  | 'title'
  | 'fullDescription'
  | 'shortDescription'
  | 'promoCode'
  | 'dateStart'
  | 'dateEnd'
>

interface Props {
  type: IPromotionsType
  activeProfile: ISalon | IBrand | IMaster | null
  setCreateSale: ISetState<boolean>
}

const CreateSale: FC<Props> = ({ setCreateSale, type, activeProfile }) => {
  const [errors, setErrors] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)
  const [photo, setPhoto] = useState<IPhoto | null>(null)

  const [createSale] = useMutation(CREATE_PROMOTION, {
    onError: error => {
      const errorMessages = error.graphQLErrors.map(e => e.message)
      setLoading(false)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
    onCompleted: async data => {
      setLoading(false)
      console.log(data)

      setOpenPopup(true)
    },
  })

  const onSubmit = useCallback(
    async (values: IFormValues) => {
      console.log(values)

      if (!photo) {
        setErrors(['Необходимо добавить фото'])
        setErrorPopupOpen(true)
        return
      } else if (activeProfile) {
        setLoading(true)
        createSale({
          variables: {
            input: {
              title: values.title,
              cover: photo.id,
              fullDescription: values.fullDescription,
              shortDescription: values.shortDescription,
              promoCode: values.promoCode,
              dateStart: values.dateStart,
              dateEnd: values.dateEnd,
              [type as string]: activeProfile.id,
            },
          },
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [photo],
  )

  const closePopup = () => {
    setOpenPopup(false)
    setCreateSale(false)
  }

  return (
    <>
      <AutoFocusedForm
        onSubmit={e => onSubmit(e as IFormValues)}
        subscription={{ values: true }}
        render={({ handleSubmit, pristine, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 20 }}>
                <Sale
                  item={values as IPromotions}
                  photo={photo}
                  setPhoto={setPhoto}
                  type={type}
                  create
                  // name={`${
                  //   type === 'master'
                  //     ? 'Мастер'
                  //     : type === 'salon'
                  //     ? 'Салон'
                  //     : type === 'brand'
                  //     ? 'Бренд'
                  //     : ''
                  // } ${activeProfile?.name}`}
                />
              </div>
              <FieldWrap>
                <FieldStyled
                  name="title"
                  component={TextField}
                  label="Название акции"
                  validate={required}
                  requiredField
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
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
                  name="promoCode"
                  component={TextField}
                  label="Промокод"
                  maxLength={15}
                />
              </FieldWrap>
              <FieldWrapDate>
                <FieldStyled
                  name="dateStart"
                  component={'input'}
                  type="date"
                  required
                />
                <TextDate>Дата начала акции</TextDate>
              </FieldWrapDate>
              <FieldWrapDate>
                <FieldStyled
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
                  disabled={pristine || loading}
                >
                  {loading ? 'Подождите' : 'Сохранить'}
                </Button>
                <Button
                  variant="darkTransparent"
                  size="width100"
                  type="submit"
                  style={{ marginTop: 20 }}
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
