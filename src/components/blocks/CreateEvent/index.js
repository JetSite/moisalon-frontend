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
import Event from '../Event'
import { createEventMutation } from '../../../_graphql-legacy/events/createEventMutation'
import Popup from '../../ui/Popup'

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

const TimeWrap = styled.div`
  margin-left: 14px;
  @media (max-width: ${laptopBreakpoint}) {
    margin-left: 0;
    margin-bottom: 10px;
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

const CreateEvent = ({ setCreateEvent, refetch, id }) => {
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const [photoId, setPhotoId] = useState(null)
  const [published, setPublished] = useState(false)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [openPopup, setOpenPopup] = useState(false)

  const [createEvent] = useMutation(createEventMutation, {
    onError: error => {
      const errorMessages = error.graphQLErrors.map(e => e.message)
      setLoading(false)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
    onCompleted: async data => {
      setLoading(false)
      await refetch()
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
      createEvent({
        variables: {
          input: {
            title: values.title,
            id: id,
            origin: 'Not',
            photoId,
            desc: values.desc,
            short_desc: values.short_desc,
            dateStart: `${values.dateStart} ${values.timeStart}:00`,
            dateEnd: `${values.dateEnd} ${values.timeEnd}:00`,
            address: values.address,
            isPublished: false,
          },
        },
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [photoId, published],
  )
  const onAdd = photoId => {
    setPhotoId(photoId)
  }

  const closePopup = () => {
    setOpenPopup(false)
    setCreateEvent(false)
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
                <Event
                  photoId={photoId}
                  onAdd={onAdd}
                  dateStart={values.dateStart}
                  dateEnd={values.dateEnd}
                  create
                  title={values.title}
                  promo={values.value}
                  address={values.address}
                />
              </div>
              <FieldWrap>
                <FieldStyled
                  name="title"
                  component={TextField}
                  label="Название мероприятия"
                  validate={required}
                  requiredField
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  name="short_desc"
                  component={TextField}
                  label="Краткое описание мероприятия"
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
                  label="Описание мероприятия"
                  validate={required}
                  multiline={true}
                  maxLength={40000}
                  requiredField
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  name="address"
                  component={TextField}
                  label="Адрес мероприятия"
                  validate={required}
                  requiredField
                />
              </FieldWrap>
              {/* <FieldWrap>
                <FieldStyled
                  name="value"
                  component={TextField}
                  label="Промокод"
                  maxLength={15}
                />
              </FieldWrap> */}
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
              {/* <FieldWrap>
                <Checkbox
                  name="isPublished"
                  label="Опубликовать мероприятие"
                  checked={published}
                  setChecked={setPublished}
                />
              </FieldWrap> */}
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
                  onClick={() => setCreateEvent(false)}
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
        title="Ваше мероприятие отправлено на модерацию, в течение суток/часов вы получите уведомление."
      >
        <Button style={{ marginTop: 20 }} onClick={closePopup} variant="red">
          Закрыть
        </Button>
      </Popup>
    </>
  )
}

export default CreateEvent
