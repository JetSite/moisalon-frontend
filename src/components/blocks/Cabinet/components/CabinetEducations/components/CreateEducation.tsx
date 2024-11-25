import * as Styled from '../styles'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AutoFocusedForm from '../../../../Form/AutoFocusedForm'
import { FieldStyled } from '../../CabinetForm/styled'
import { TextField } from '../../../../Form'
import { required } from '../../../../../../utils/validations'
import ErrorPopup from '../../../../Form/Error'
import Button from '../../../../../ui/Button'
import Education from '../../../../Education'
import Popup from '../../../../../ui/Popup'
import { IEducation } from 'src/types/education'
import { IPhoto } from 'src/types'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IProfileType } from '../../CabinetSales'
import { ISalon } from 'src/types/salon'
import { IMaster } from 'src/types/masters'
import { IBrand } from 'src/types/brands'
import { ISetState } from 'src/types/common'
import { IUseEducationMutateResult } from '../utils/useEducationMutate'
import {
  IEducationInitialForm,
  IEducationInput,
  getEducationInitialValues,
} from '../utils/getEducationInitialValues'
import Checkbox from 'src/components/blocks/Form/Checkbox'
import moment from 'moment'
import { FormApi } from 'final-form'
import { IActiveProfile } from '../../ActiveProfile/ProfileManager'

interface Props
  extends Pick<
    IUseEducationMutateResult,
    'handleCreateOrUpdate' | 'setErrors' | 'errors'
  > {
  type: IProfileType
  activeProfile: NonNullable<IActiveProfile>
  education: IEducation | null
  setEducation: ISetState<IEducation | null>
  loading: boolean
  setCreate: ISetState<boolean>
}

const CreateEducation: FC<Props> = ({
  type,
  activeProfile,
  errors,
  setErrors,
  education,
  setEducation,
  loading,
  handleCreateOrUpdate,
  setCreate,
}) => {
  const { user } = useAuthStore(getStoreData)
  const [photo, setPhoto] = useState<IPhoto | null>(education?.cover || null)
  const [openPopup, setOpenPopup] = useState(false)
  const [publishedAt, setPublishedAt] = useState(false)
  const formRef = useRef<FormApi<IEducationInitialForm>>()

  const initialValues = useMemo(
    () => getEducationInitialValues({ education }),
    [education],
  )

  useEffect(() => {
    formRef.current?.change('cover', photo)
    formRef.current?.change('publishedAt', publishedAt)
  }, [photo, publishedAt])

  const onSubmit = useCallback(
    async (values: IEducationInitialForm) => {
      const cover = photo?.id || values.cover?.id
      if (!cover) {
        setErrors(['Необходимо добавить фото'])
        return
      }

      const amount = Number(values.amount)

      const validTypes = ['brand', 'salon', 'master'] as const
      if (!validTypes.includes(type as (typeof validTypes)[number])) {
        throw new Error(
          `Invalid type: ${type}. Expected one of: ${validTypes.join(', ')}`,
        )
      }

      const timeStart = moment(values.timeStart, 'HH:mm').isValid()
        ? moment(values.timeStart, 'HH:mm').format('HH:mm:ss.SSS')
        : null
      const timeEnd = moment(values.timeEnd, 'HH:mm').isValid()
        ? moment(values.timeEnd, 'HH:mm').format('HH:mm:ss.SSS')
        : null

      const input: IEducationInput = {
        title: values.title,
        cover: cover,
        fullDescription: values.fullDescription,
        shortDescription: values.shortDescription,
        amount,
        dateStart: values.dateStart,
        dateEnd: values.dateEnd,
        timeStart,
        timeEnd,
        user: user?.info.id,
        [type as 'brand' | 'salon' | 'master']: activeProfile.id,
        ...{
          publishedAt: values.publishedAt ? new Date().toISOString() : null,
        },
      }

      handleCreateOrUpdate(input, education?.id)
      if (values.publishedAt) {
        setEducation(null)
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
    setEducation(null)
    setCreate(false)
  }

  return (
    <>
      <AutoFocusedForm<IEducationInitialForm>
        onSubmit={onSubmit}
        initialValues={initialValues}
        subscription={{ values: true }}
        render={({ handleSubmit, pristine, values, form }) => {
          formRef.current = form
          return (
            <form onSubmit={handleSubmit}>
              <ul style={{ marginBottom: 20 }}>
                <Education
                  photo={photo}
                  setPhoto={setPhoto}
                  type={type}
                  create
                  item={values as unknown as IEducation}
                />
              </ul>
              <Styled.FieldWrap>
                <FieldStyled
                  name="title"
                  component={TextField}
                  label="Название программы"
                  validate={required}
                  requiredField
                />
              </Styled.FieldWrap>
              <Styled.FieldWrap>
                <FieldStyled
                  name="shortDescription"
                  component={TextField}
                  label="Краткое описание программы"
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
                  label="Описание программы"
                  validate={required}
                  multiline={true}
                  maxLength={40000}
                  requiredField
                />
              </Styled.FieldWrap>
              <Styled.FieldWrap>
                <FieldStyled
                  name="amount"
                  component={TextField}
                  type="number"
                  label="Стоимость"
                  requiredField
                  validate={required}
                  maxLength={15}
                />
              </Styled.FieldWrap>
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
