import styled from 'styled-components'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AutoFocusedForm from '../../../../../Form/AutoFocusedForm'
import { FieldStyled } from '../../../CabinetForm/styled'
import { TextField } from '../../../../../Form'
import { required } from '../../../../../../../utils/validations'
import ErrorPopup from '../../../../../Form/Error'
import { laptopBreakpoint } from '../../../../../../../styles/variables'
import Button from '../../../../../../ui/Button'
import Vacancy from '../../../../../Vacancy'
import Popup from '../../../../../../ui/Popup'
import { IPhoto } from 'src/types'
import useAuthStore from 'src/store/authStore'
import { getStoreData } from 'src/store/utils'
import { IPromotionsType } from '../../../CabinetSales'
import { IBrand } from 'src/types/brands'
import { IMaster } from 'src/types/masters'
import { ISalon } from 'src/types/salon'
import { ISetState } from 'src/types/common'
import { IUseVacancyMutateResult } from '../../utils/useVacancyMutate'
import { IVacancy } from 'src/types/vacancies'
import { parseFieldsToString } from 'src/utils/newUtils/formsHelpers'
import {
  IVacancyInitialForm,
  IVacancyInput,
  getVacancyInitialValues,
} from '../../utils/vacancyFormValues'
import { FormApi } from 'final-form'
import Checkbox from 'src/components/blocks/Form/Checkbox'

const FieldWrap = styled.div`
  margin-bottom: 14px;
`

const ButtonWrap = styled.div`
  width: 350px;
  margin-top: 66px;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    margin-top: 40px;
  }
`

interface Props
  extends Pick<
    IUseVacancyMutateResult,
    'handleCreateOrUpdate' | 'setErrors' | 'errors'
  > {
  type: IPromotionsType
  activeProfile: ISalon | IMaster | IBrand
  vacancy: IVacancy | null
  setVacancy: ISetState<IVacancy | null>
  loading: boolean
  setCreateVacancy: ISetState<boolean>
}

const CreateVacancy: FC<Props> = ({
  type,
  activeProfile,
  errors,
  setErrors,
  vacancy,
  setVacancy,
  loading,
  handleCreateOrUpdate,
  setCreateVacancy,
}) => {
  const { user } = useAuthStore(getStoreData)
  const [photo, setPhoto] = useState<IPhoto | null>(vacancy?.cover || null)
  const [openPopup, setOpenPopup] = useState(false)
  const [publishedAt, setPublishedAt] = useState(false)
  const formRef = useRef<FormApi<IVacancyInitialForm>>()
  useEffect(() => {
    formRef.current?.change('cover', photo)
    formRef.current?.change('publishedAt', publishedAt)
  }, [photo, publishedAt])

  const initialValues = useMemo(
    () => getVacancyInitialValues({ vacancy }),
    [vacancy],
  )

  const onSubmit = useCallback(
    async (values: IVacancyInitialForm) => {
      const cover = photo?.id || values.cover?.id
      if (!cover) {
        setErrors(['Необходимо добавить фото'])
        return
      }

      const amountFrom = Math.min(
        Number(values.amountFrom),
        Number(values.amountTo),
      )
      const amountTo = Math.max(
        Number(values.amountFrom),
        Number(values.amountTo),
      )
      const validTypes = ['brand', 'salon'] as const
      if (!validTypes.includes(type as (typeof validTypes)[number])) {
        throw new Error(`Invalid type: ${type}`)
      }
      const input: IVacancyInput = {
        title: values.title,
        cover: cover,
        fullDescription: values.fullDescription,
        shortDescription: values.shortDescription,
        user: user?.info.id,
        amountFrom,
        amountTo,
        [type as 'brand' | 'salon']: activeProfile.id,
        ...{
          publishedAt: values.publishedAt ? new Date().toISOString() : null,
        },
      }

      handleCreateOrUpdate(input, vacancy?.id)
      !publishedAt && setOpenPopup(true)
      !publishedAt && setVacancy(null)
      !publishedAt && setCreateVacancy(false)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      photo,
      type,
      activeProfile,
      handleCreateOrUpdate,
      publishedAt,
      setOpenPopup,
      setVacancy,
      setCreateVacancy,
      setErrors,
      user?.info.id,
    ],
  )

  const closePopup = () => {
    setOpenPopup(false)
    setVacancy(null)
    setCreateVacancy(false)
  }

  return (
    <>
      <AutoFocusedForm<IVacancyInitialForm>
        onSubmit={onSubmit}
        initialValues={initialValues}
        subscription={{ values: true }}
        render={({ handleSubmit, pristine, values, form }) => {
          formRef.current = form
          return (
            <form onSubmit={handleSubmit}>
              <ul style={{ marginBottom: 20 }}>
                <Vacancy
                  photo={photo}
                  setPhoto={setPhoto}
                  type={type}
                  create
                  item={values as unknown as IVacancy}
                />
              </ul>
              <FieldWrap>
                <FieldStyled
                  parse={parseFieldsToString}
                  name="title"
                  component={TextField}
                  label="Название вакансии"
                  validate={required}
                  requiredField
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  parse={parseFieldsToString}
                  name="shortDescription"
                  component={TextField}
                  label="Краткое описание вакансии"
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
                  label="Описание вакансии"
                  validate={required}
                  multiline={true}
                  maxLength={40000}
                  requiredField
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  parse={parseFieldsToString}
                  name="amountFrom"
                  component={TextField}
                  type="number"
                  label="Зарплата от"
                  requiredField
                  validate={required}
                  maxLength={15}
                />
              </FieldWrap>
              <FieldWrap>
                <FieldStyled
                  parse={parseFieldsToString}
                  name="amountTo"
                  component={TextField}
                  type="number"
                  label="Зарплата до"
                  requiredField
                  validate={required}
                  maxLength={15}
                />
              </FieldWrap>
              <FieldWrap>
                <Checkbox
                  name="publishedAt"
                  label="Опубликовать вакансию"
                  checked={publishedAt}
                  setChecked={setPublishedAt}
                />
              </FieldWrap>
              <ErrorPopup
                errors={errors}
                isOpen={!!errors}
                setOpen={setErrors}
              />
              <ButtonWrap>
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
                  type="submit"
                  style={{ marginTop: 20 }}
                  onClick={() => setVacancy(null)}
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
        title="Ваша вакансия отправлена на модерацию, в течение суток/часов вы получите уведомление."
      >
        <Button style={{ marginTop: 20 }} onClick={closePopup} variant="red">
          Закрыть
        </Button>
      </Popup>
    </>
  )
}

export default CreateVacancy
