import * as Styled from './styled'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AutoFocusedForm from '../../../../Form/AutoFocusedForm'
import { FieldStyled } from '../../CabinetForm/styled'
import { TextField } from '../../../../Form'
import { required } from '../../../../../../utils/validations'
import ErrorPopup from '../../../../Form/Error'
import Button from '../../../../../ui/Button'
import Event from '../../../../Event'
import Checkbox from 'src/components/blocks/Form/Checkbox'
import Popup from '../../../../../ui/Popup'
import { parse, isValid, format } from 'date-fns'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IPhoto } from 'src/types'
import { FormApi } from 'final-form'
import {
  IEventInitialForm,
  IEventInput,
  getEventInitialValues,
} from '../utils/getEventInitialValues'
import { IEvent } from 'src/types/event'
import AddressNoSalonField, {
  ICoordinate,
} from 'src/components/blocks/Form/AddressField/AddressNoSalonField'
import { IUseEventMutateResult } from '../utils/useEventMutate'
import { IProfileType } from '../../CabinetSales'
import { ISetState } from 'src/types/common'
import { IActiveProfile } from '../../ActiveProfile/ProfileManager'

interface Props
  extends Pick<
    IUseEventMutateResult,
    'handleCreateOrUpdate' | 'setErrors' | 'errors'
  > {
  type: IProfileType
  activeProfile: NonNullable<IActiveProfile>
  event: IEvent | null
  setEvent: ISetState<IEvent | null>
  loading: boolean
  setCreate: ISetState<boolean>
}

const CreateEvent: FC<Props> = ({
  type,
  activeProfile,
  errors,
  setErrors,
  event,
  setEvent,
  loading,
  handleCreateOrUpdate,
  setCreate,
}) => {
  const { user } = useAuthStore(getStoreData)
  const [photo, setPhoto] = useState<IPhoto | null>(event?.cover || null)
  const [openPopup, setOpenPopup] = useState(false)
  const [publishedAt, setPublishedAt] = useState(false)
  const formRef = useRef<FormApi<IEventInitialForm>>()
  const [coordinate, setCoordinates] = useState<ICoordinate | null>(null)

  const initialValues = useMemo(() => getEventInitialValues({ event }), [event])

  useEffect(() => {
    if (formRef.current) {
      formRef.current.change('cover', photo)
      formRef.current.change('publishedAt', publishedAt)
      coordinate && formRef.current.change('longitude', coordinate.longitude)
      coordinate && formRef.current.change('latitude', coordinate.latitude)
    }
  }, [photo, publishedAt, coordinate])

  const onSubmit = useCallback(
    async (values: IEventInitialForm) => {
      const cover = photo?.id || values.cover?.id
      if (!cover) {
        setErrors(['Необходимо добавить фото'])
        return
      }
      if (!values.longitude || !values.latitude) {
        setErrors(['Нужно добавить адрес'])
        return
      }

      const parseTime = (timeStr: string) => {
        const parsedTime = parse(timeStr, 'HH:mm', new Date())
        return isValid(parsedTime) ? format(parsedTime, 'HH:mm:ss.SSS') : null
      }

      const timeStart = parseTime(values.timeStart)
      const timeEnd = parseTime(values.timeEnd)

      if (!timeEnd || !timeStart) {
        setErrors(['Необходимо ввести время начала и конца события'])
        return
      }

      const validTypes = ['brand', 'salon', 'master'] as const
      if (!validTypes.includes(type as (typeof validTypes)[number])) {
        throw new Error(
          `Invalid type: ${type}. Expected one of: ${validTypes.join(', ')}`,
        )
      }

      const input: IEventInput = {
        title: values.title,
        cover,
        fullDescription: values.fullDescription,
        shortDescription: values.shortDescription,
        dateStart: values.dateStart,
        dateEnd: values.dateEnd,
        timeStart,
        timeEnd,
        address: values.address,
        user: user?.info.id,
        latitude: values.latitude,
        longitude: values.longitude,
        [type as 'brand' | 'salon' | 'master']: activeProfile.id,
        ...{
          publishedAt: values.publishedAt ? new Date().toISOString() : null,
        },
      }

      handleCreateOrUpdate(input, event?.id)
      if (values.publishedAt) {
        setEvent(null)
        setCreate(false)
      } else {
        setOpenPopup(true)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [photo],
  )

  const closePopup = () => {
    setOpenPopup(false)
    setEvent(null)
    setCreate(false)
  }

  return (
    <>
      <AutoFocusedForm<IEventInitialForm>
        onSubmit={onSubmit}
        initialValues={initialValues}
        subscription={{ values: true }}
        render={({ handleSubmit, pristine, values, form }) => {
          formRef.current = form
          return (
            <form onSubmit={handleSubmit}>
              <ul style={{ marginBottom: 20 }}>
                <Event
                  photo={photo}
                  setPhoto={setPhoto}
                  type={type}
                  create
                  item={values as unknown as IEvent}
                />
              </ul>
              <Styled.FieldWrap>
                <FieldStyled
                  name="title"
                  component={TextField}
                  label="Название мероприятия"
                  validate={required}
                  requiredField
                />
              </Styled.FieldWrap>
              <Styled.FieldWrap>
                <FieldStyled
                  name="shortDescription"
                  component={TextField}
                  label="Краткое описание мероприятия"
                  validate={required}
                  multiline={true}
                  maxLength={1200}
                  requiredField
                />
              </Styled.FieldWrap>
              <Styled.FieldWrap>
                <FieldStyled
                  name="fullDescription"
                  component={TextField}
                  label="Описание мероприятия"
                  validate={required}
                  multiline={true}
                  maxLength={40000}
                  requiredField
                />
              </Styled.FieldWrap>
              <Styled.FieldWrap>
                <FieldStyled
                  name="address"
                  component={AddressNoSalonField}
                  setCoordinates={setCoordinates}
                  label="Адрес мероприятия"
                  validate={required}
                  requiredField
                  view={true}
                />
              </Styled.FieldWrap>
              {/* <FieldWrap>
                <FieldStyled
                  name="value"
                  component={TextField}
                  label="Промокод"
                  maxLength={15}
                />
              </FieldWrap> */}
              <Styled.FieldWrapDate>
                <FieldStyled
                  name="dateStart"
                  component={'input'}
                  type="date"
                  required
                />
                <Styled.TimeWrap>
                  <FieldStyled
                    name="timeStart"
                    component={'input'}
                    type="time"
                    required
                  />
                </Styled.TimeWrap>
                <Styled.TextDate>День и время начала</Styled.TextDate>
              </Styled.FieldWrapDate>
              <Styled.FieldWrapDate>
                <FieldStyled
                  name="dateEnd"
                  component={'input'}
                  type="date"
                  required
                />
                <Styled.TimeWrap>
                  <FieldStyled
                    name="timeEnd"
                    component={'input'}
                    type="time"
                    required
                  />
                </Styled.TimeWrap>
                <Styled.TextDate>День и время окончания</Styled.TextDate>
              </Styled.FieldWrapDate>
              <Styled.FieldWrap>
                <Checkbox
                  name="publishedAt"
                  label="Опубликовать"
                  checked={publishedAt}
                  setChecked={setPublishedAt}
                />
              </Styled.FieldWrap>
              <ErrorPopup errors={errors} setErrors={setErrors} />
              <Styled.ButtonWrap>
                <Button
                  variant="red"
                  size="width100"
                  type="submit"
                  disabled={(pristine && !publishedAt) || loading}
                >
                  {loading ? 'Подождите' : 'Сохранить'}
                </Button>
                <Button
                  variant="darkTransparent"
                  size="width100"
                  type="button"
                  style={{ marginTop: 20 }}
                  onClick={() => setCreate(false)}
                >
                  Отменить
                </Button>
              </Styled.ButtonWrap>
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
