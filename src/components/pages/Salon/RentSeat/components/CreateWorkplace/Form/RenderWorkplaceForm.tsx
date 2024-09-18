import { FC, useState } from 'react'
import RentalAdditionalInfo, {
  IRentalAdditionalInfoProps,
} from './RentalAdditionalInfo'
import { useEffect } from 'react'
import Success, { ISuccessProps } from '../Success'
import { ISalonPage } from 'src/types/salon'
import { ISetState } from 'src/types/common'
import { IPhoto } from 'src/types'
import { FormRenderProps } from 'react-final-form'
import { IInitialValuesWorkplaceForm } from '../../../utils/getInitialValuesWorkplaceForm'
import { IRentalInfoProps, RentalInfo } from './RentalInfo'
import { ISalonWorkplace } from 'src/types/workplace'
import { isEqual } from 'lodash'
import { RentalAddititionalInfoButtons } from './RentalAdditionalInfo/RentalAddititionalInfoButtons'
import { RentalInfoButtons } from './RentalInfo/RentalInfoButtons'

export interface RenderWorkplaceFormProps
  extends Omit<
      IRentalAdditionalInfoProps,
      'children' | 'setShowAdditionalInfo'
    >,
    Omit<IRentalInfoProps, 'cover' | 'setCover' | 'services' | 'children'>,
    Omit<ISuccessProps, 'setShowAdditionalInfo'> {
  salon: ISalonPage
  formProps: FormRenderProps<IInitialValuesWorkplaceForm>
  workplace: ISalonWorkplace | null
  setWorkplace: ISetState<ISalonWorkplace | null>
  setErrors: ISetState<string[] | null>
  setErrorPopupOpen: ISetState<boolean>
  success: boolean
  setSuccess: ISetState<boolean>
  setDirtyForm: ISetState<boolean>
  dirtyForm: boolean
  loading: boolean
}

const RenderWorkplaceForm: FC<RenderWorkplaceFormProps> = ({
  quantityFields,
  salon,
  rentalPeriods,
  groupedEquipments,
  paymentMethods,
  formProps,
  workplace,
  setWorkplace,
  setErrors,
  success,
  setSuccess,
  setErrorPopupOpen,
  setDirtyForm,
  initialPeriod,
  dirtyForm,
  loading,
  workplaceTypes,
}) => {
  const { handleSubmit, form } = formProps
  const [cover, setCover] = useState<IPhoto | null>(workplace?.cover || null)
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [success, showAdditionalInfo])

  const showAdditionalHandler = () => {
    if (!form.getFieldState('gallery')?.value) {
      setErrors(['Необходимо добавить фото рабочего места'])
      setErrorPopupOpen(true)
      return
    }
    setShowAdditionalInfo(true)
  }

  useEffect(() => {
    const unsubscribe = form.subscribe(
      ({ dirty, values }) => {
        const currentPeriod = values.rentalPeriod
        const isNewLogo = !!cover && cover.id !== workplace?.cover?.id
        const isFormDirty =
          !isEqual(currentPeriod, initialPeriod) || isNewLogo || dirty
        setDirtyForm(isFormDirty)
      },
      { dirty: true, values: true },
    )
    return unsubscribe
  }, [form, cover])

  return !success ? (
    <form onSubmit={handleSubmit}>
      {!showAdditionalInfo ? (
        <RentalInfo
          cover={cover}
          setCover={setCover}
          rentalPeriods={rentalPeriods}
          services={salon.services.map(e => e.service)}
          paymentMethods={paymentMethods}
          initialPeriod={initialPeriod}
          workplaceTypes={workplaceTypes}
        >
          <RentalInfoButtons
            disabled={!dirtyForm || loading}
            textConfirmButton="Разместить на платформе"
            textAddititionalButton="Дополнить информацию о кресле/кабинете"
            showAdditionalHandler={showAdditionalHandler}
          />
        </RentalInfo>
      ) : (
        <RentalAdditionalInfo
          groupedEquipments={groupedEquipments}
          setShowAdditionalInfo={setShowAdditionalInfo}
          quantityFields={quantityFields}
        >
          <RentalAddititionalInfoButtons disabled={!dirtyForm || loading} />
        </RentalAdditionalInfo>
      )}
    </form>
  ) : (
    <Success
      salon={salon}
      workplace={workplace}
      setShowAdditionalInfo={setShowAdditionalInfo}
      setSuccess={setSuccess}
      setWorkplace={setWorkplace}
    />
  )
}
export default RenderWorkplaceForm
