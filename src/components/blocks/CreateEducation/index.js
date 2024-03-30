import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { useCallback, useState } from 'react'
import AutoFocusedForm from '../Form/AutoFocusedForm'
import { FieldStyled } from '../../blocks/Cabinet/components/CabinetForm/styled'
import { TextField } from '../Form'
import { required } from '../../../utils/validations'
import Error from '../Form/Error'
import { laptopBreakpoint } from '../../../styles/variables'
import Button from '../../ui/Button'
import Education from '../Education'
import { createEducationMutation } from '../../../_graphql-legacy/education/createEducationMutation'
import Popup from '../../ui/Popup'

const FieldWrap = styled.div`
  margin-bottom: 14px;
`

const TimeWrap = styled.div`
  margin-left: 14px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-left: 0;
    margin-bottom: 10px;
  }
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

const CreateEducation = ({
  setCreateEducation,
  type,
  activeProfile,
  refetch,
}) => {
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [photoId, setPhotoId] = useState(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)

  const [createEducation] = useMutation(createEducationMutation, {
    onError: error => {
      const errorMessages = error.graphQLErrors.map(e => e.message)
      setLoading(false)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
    onCompleted: async data => {
      setLoading(false)
      await refetch({
        variables: {
          originId: activeProfile.id,
        },
      })
      setOpenPopup(true)
    },
  })

  const onSubmit = useCallback(
    async values => {
      if (!photoId) {
        setErrors(['Необходимо добавить фото'])
        setErrorPopupOpen(true)
        return
      }
      setLoading(true)
      createEducation({
        variables: {
          input: {
            title: values.title,
            origin: type.toUpperCase(),
            originId: activeProfile?.id,
            photoId,
            desc: values.desc,
            short_desc: values.short_desc,
            amount: values.amount,
            dateStart: `${values.dateStart} ${values.timeStart}:00`,
            dateEnd: `${values.dateEnd} ${values.timeEnd}:00`,
          },
        },
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [photoId],
  )

  const onAdd = photoId => {
    setPhotoId(photoId)
  }

  const closePopup = () => {
    setOpenPopup(false)
    setCreateEducation(false)
  }

  return (
    <>
      <AutoFocusedForm
        onSubmit={onSubmit}
        subscription={{ values: true }}
        render={({ handleSubmit, pristine, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 20 }}>
                <Education
                  photoId={photoId}
                  onAdd={onAdd}
                  dateStart={values.dateStart}
                  dateEnd={values.dateEnd}
                  type={type}
                  create
                  title={values.title}
                  timeStart={values.timeStart}
                  timeEnd={values.timeEnd}
                  amount={values.amount}
                  name={`${
                    type === 'master'
                      ? 'Мастер'
                      : type === 'salon'
                      ? 'Салон'
                      : type === 'brand'
                      ? 'Бренд'
                      : ''
                  } ${activeProfile?.name}`}
                />
              </div>
              <FieldWrap>
                <FieldStyled
                  name="title"
                  component={TextField}
                  label="Название программы"
                  validate={required}
                  requiredField
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  name="short_desc"
                  component={TextField}
                  label="Краткое описание программы"
                  validate={required}
                  multiline={true}
                  maxLength={1200}
                  requiredField
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  name="desc"
                  component={TextField}
                  label="Описание программы"
                  validate={required}
                  multiline={true}
                  maxLength={40000}
                  requiredField
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  name="amount"
                  component={TextField}
                  type="number"
                  label="Стоимость"
                  requiredField
                  validate={required}
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
                <TimeWrap>
                  <FieldStyled
                    name="timeStart"
                    component={'input'}
                    type="time"
                    required
                  />
                </TimeWrap>
                <TextDate>День и время начала</TextDate>
              </FieldWrapDate>
              <FieldWrapDate>
                <FieldStyled
                  name="dateEnd"
                  component={'input'}
                  type="date"
                  required
                />
                <TimeWrap>
                  <FieldStyled
                    name="timeEnd"
                    component={'input'}
                    type="time"
                    required
                  />
                </TimeWrap>
                <TextDate>День и время окончания</TextDate>
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
                  onClick={() => setCreateEducation(false)}
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
        title="Ваша обучающуя программа на модерацию, в течение суток/часов вы получите уведомление."
      >
        <Button style={{ marginTop: 20 }} onClick={closePopup} variant="red">
          Закрыть
        </Button>
      </Popup>
    </>
  )
}

export default CreateEducation
