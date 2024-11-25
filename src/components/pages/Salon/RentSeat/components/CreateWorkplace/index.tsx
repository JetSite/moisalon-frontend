import { FC, useMemo, useState } from 'react'
import AutoFocusedForm from 'src/components/blocks/Form/AutoFocusedForm'
import { IApolloRefetch } from 'src/types/common'
import {
  IInitialValuesWorkplaceForm,
  getInitialValuesWorkplaceForm,
} from '../../utils/getInitialValuesWorkplaceForm'
import RenderWorkplaceForm, {
  RenderWorkplaceFormProps,
} from './Form/RenderWorkplaceForm'
import ErrorPopup from '../../../../../blocks/Form/Error'
import { FormGuardPopup } from 'src/components/blocks/Form/FormGuardPopup'
import { useWorkplaceMutate } from '../../utils/useWorkplaceMutation'
import removeUnchangedFields from 'src/utils/newUtils/removeUnchangedFields'
import { getPrepareInputWorkplaceForm } from '../../utils/getPrepareInputWorkplaseForm'
import { removeEmptyFields } from 'src/utils/newUtils/removeEmptyFields'

export interface ICreateWorkplaceProps
  extends Omit<
    RenderWorkplaceFormProps,
    | 'formProps'
    | 'states'
    | 'formProps'
    | 'setErrors'
    | 'success'
    | 'setSuccess'
    | 'setErrorPopupOpen'
    | 'initialPeriod'
    | 'setDirtyForm'
    | 'dirtyForm'
    | 'loading'
  > {
  refetchSalon: IApolloRefetch
}

export const CreateWorkplace: FC<ICreateWorkplaceProps> = ({
  salon,
  workplace,
  refetchSalon,
  setWorkplace,
  rentalPeriods,
  groupedEquipments,
  paymentMethods,
  quantityFields,
  workplaceTypes,
}) => {
  const [errors, setErrors] = useState<string[] | null>(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [dirtyForm, setDirtyForm] = useState(false)
  const initialPeriod = workplace?.rentalPeriod?.map(period => ({
    id: period.rental_period.id,
    rentalCoast: period.rentalCost,
  })) || [{ id: 'CustomRate' }]

  const initialValues = useMemo<IInitialValuesWorkplaceForm>(
    () => getInitialValuesWorkplaceForm({ workplace }),
    [workplace],
  )

  const formKey = useMemo(() => JSON.stringify(initialValues), [initialValues])

  const { loading, handleCreateOrUpdate } = useWorkplaceMutate({
    setErrors,
    setErrorPopupOpen,
  })

  const onSubmit = async (values: IInitialValuesWorkplaceForm) => {
    if (
      values.rentalPeriod.find(e => !e.rentalCoast) &&
      !values.rentalPeriod.find(e => e.id === 'CustomRate')
    ) {
      setErrors(['Необходимо добавить стоимость аренды'])
      setErrorPopupOpen(true)
      return
    }
    if (!values.cover) {
      setErrors(['Необходимо добавить фото рабочего места'])
      setErrorPopupOpen(true)
      return
    }

    if (!values.services.length) {
      setErrors(['Необходимо добавить услугу оказываемую в рабочем кабинете'])
      setErrorPopupOpen(true)
      return
    }

    if (!values.workplaceTypes.length) {
      setErrors(['Необходимо добавить назначение рабочего кабинета'])
      setErrorPopupOpen(true)
      return
    }
    const input = getPrepareInputWorkplaceForm(
      removeUnchangedFields(values, initialValues, [
        'paymentMethods',
        'isAvailableForRent',
        'subRent',
        'shareRent',
      ]),
    )

    handleCreateOrUpdate({
      input,
      workplace,
      salonID: salon.id,
      setWorkplace,
      setSuccess,
      refetchSalon,
    })
  }

  return (
    <>
      <AutoFocusedForm<IInitialValuesWorkplaceForm>
        onSubmit={onSubmit}
        key={formKey}
        initialValues={initialValues}
        render={formProps => (
          <RenderWorkplaceForm
            formProps={formProps}
            paymentMethods={paymentMethods}
            quantityFields={quantityFields}
            salon={salon}
            rentalPeriods={rentalPeriods}
            groupedEquipments={groupedEquipments}
            workplace={workplace}
            setWorkplace={setWorkplace}
            setErrors={setErrors}
            success={success}
            setSuccess={setSuccess}
            setErrorPopupOpen={setErrorPopupOpen}
            setDirtyForm={setDirtyForm}
            dirtyForm={dirtyForm}
            initialPeriod={initialPeriod}
            loading={loading}
            workplaceTypes={workplaceTypes}
          />
        )}
      />
      <ErrorPopup errors={errors} setErrors={setErrors} />
      <FormGuardPopup setDirtyForm={setDirtyForm} dirtyForm={dirtyForm} />
    </>
  )
}
