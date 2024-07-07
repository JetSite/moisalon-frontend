import { useMutation } from '@apollo/client'
import { Children, FC, cloneElement, isValidElement, useState } from 'react'
import AutoFocusedForm from 'src/components/blocks/Form/AutoFocusedForm'
import { ISalonWorkplace } from 'src/types/workplace'
import { IApolloRefetch, IChildren, IID, ISetState } from 'src/types/common'
import { ISalonPage } from 'src/types/salon'
import ChangeWorkplaceForm from './Form/ChangeWorkplaceForm'
import { FormRenderProps } from 'react-final-form'
import { getInitialValuesChangeWorkplaceForm } from '../../utils/getInitialValuesChangeWorkplaceForm'
import { IPhoto, IRentalPeriod } from 'src/types'
import { IChangeWorkplaceFormValues, IPeriod } from './type'
import { IEquipment } from 'src/types/equipment'
import { UPDATE_WORKPLACE } from 'src/api/graphql/salon/mutations/updateSalonWorkplace'
import { CREATE_WORKPLACE } from 'src/api/graphql/salon/mutations/createSalonWorkplace'
import { parseToNumber } from 'src/utils/newUtils/common'
import { flattenStrapiResponse } from 'src/utils/flattenStrapiResponse'

interface Props {
  salon: ISalonPage
  workplace: ISalonWorkplace | null
  setWorkplace: ISetState<ISalonWorkplace | null>
  refetchSalon: IApolloRefetch
  setWorkplaceId: ISetState<IID | null>
  workplaceId: IID | null
  setCreateWorkplace: ISetState<boolean>
  retnalPeriods: IRentalPeriod[]
  equipments: IEquipment[]
}

export const CreateWorkplace: FC<Props> = ({
  salon,
  workplace,
  workplaceId,
  refetchSalon,
  setCreateWorkplace,
  setWorkplaceId,
  setWorkplace,
  retnalPeriods,
  equipments,
}) => {
  const [errors, setErrors] = useState<string[] | null>(null)
  const [isErrorPopupOpen, setErrorPopupOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [cover, setCover] = useState<IPhoto | null>(workplace?.cover || null)
  const [periods, setPeriods] = useState<IPeriod[]>(
    workplace?.rentalPeriod.map(period => ({
      id: period.rental_period.id,
      rentalCoast: period.rentalCost,
    })) || [{ id: 'CustomRate' }],
  )

  const [createWorkplace] = useMutation(CREATE_WORKPLACE, {
    onCompleted: async data => {
      const prepareData: ISalonWorkplace = flattenStrapiResponse(
        data.createSalonWorkplace,
      )
      await refetchSalon()
      setWorkplace(prepareData)
      setSuccess(true)

      // setLoading(false)
    },
    onError: error => {
      // setLoading(false)
      const errorMessages = error.graphQLErrors
        .filter(
          e =>
            e.extensions && e.extensions['code'] !== 'EXEC_NON_NULL_VIOLATION',
        )
        .map(e => e.message)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
  })

  const [updateWorkplace] = useMutation(UPDATE_WORKPLACE, {
    onCompleted: async data => {
      const prepareData: ISalonWorkplace = flattenStrapiResponse(
        data.updateSalonWorkplace,
      )
      setWorkplace(prepareData)
      setSuccess(true)
      await refetchSalon()
      // setLoading(false)
    },
    onError: error => {
      const errorMessages = error.graphQLErrors
        .filter(
          e =>
            e.extensions && e.extensions['code'] !== 'EXEC_NON_NULL_VIOLATION',
        )
        .map(e => e.message)
      setErrors(errorMessages)
      setErrorPopupOpen(true)
    },
  })

  const onSubmit = async (values: IChangeWorkplaceFormValues) => {
    const getPrepareEquipment = (findData: { [K: string]: any }) => {
      const equipmentKeys = Object.keys(findData).filter(e =>
        e.includes('equipments'),
      )
      if (!equipmentKeys.length) return null
      const prepareEquipment: string[] = []
      equipmentKeys.forEach(e => {
        if (Array.isArray(findData[e])) {
          prepareEquipment.push(...findData[e])
        }
      })
      return prepareEquipment
    }

    const rentalPeriod = periods.length
      ? periods
          ?.map(e => {
            return {
              rental_period: e.id,
              rentalCost: parseToNumber(e.rentalCoast),
            }
          })
          .filter(period => period.rental_period !== 'CustomRate')
      : []

    if (rentalPeriod.find(e => !e.rentalCost)) {
      setErrors(['Необходимо добавить стоимость аренды'])
      setErrorPopupOpen(true)
      return
    }
    if (!cover?.id) {
      setErrors(['Необходимо добавить фото рабочего места'])
      setErrorPopupOpen(true)
      return
    }

    if (!values.activities) {
      setErrors(['Необходимо добавить назначение рабочего кабинета'])
      setErrorPopupOpen(true)
      return
    }

    const input = {
      cover: parseToNumber(cover?.id),
      title: values.title,
      description: values.description || null,
      floor: parseToNumber(values.floor),
      space: parseToNumber(values.space),
      wetPointsHands: parseToNumber(values.wetPointsHands),
      wetPointsHead: parseToNumber(values.wetPointsHead),
      wetPointsShower: parseToNumber(values.wetPointsShower),
      isAvailableForRent: values.isAvailableForRent,
      subRent: values.subRent,
      shareRent: values.shareRent,
      withLicense: values.withLicense,
      gallery: values.photos?.map(e => e.id) || null,
      services: values.activities || null,
      equipment: getPrepareEquipment(values),
      rentalPeriod,
      publishedAt: '2007-12-03T10:15:30Z',
    }

    console.log('input', input, 'workplaceId', workplace?.id)

    // setLoading(true)

    if (workplace) {
      updateWorkplace({
        variables: {
          id: workplace.id,
          input,
        },
      })
      setSuccess(true)
      return
    }

    createWorkplace({
      variables: {
        input: {
          ...input,
          salon: salon.id,
        },
      },
    })

    setSuccess(true)
  }

  const states = {
    workplace,
    setWorkplace,
    workplaceId,
    setWorkplaceId,
    setCreateWorkplace,
    errors,
    setErrors,
    isErrorPopupOpen,
    setErrorPopupOpen,
    success,
    setSuccess,
    periods,
    setPeriods,
    cover,
    setCover,
  }

  // console.log(
  //   'getInitialValuesChangeWorkplaceForm',
  //   getInitialValuesChangeWorkplaceForm({ workplace, salon }),
  // )

  return (
    <AutoFocusedForm
      onSubmit={onSubmit}
      initialValues={
        workplace
          ? getInitialValuesChangeWorkplaceForm({ workplace })
          : { isAvailableForRent: true }
      }
      render={({
        handleSubmit,
        form,
        pristine,
      }: FormRenderProps<IChangeWorkplaceFormValues>) => {
        return (
          <form onSubmit={handleSubmit}>
            <ChangeWorkplaceForm
              states={states}
              salon={salon}
              refetchSalon={refetchSalon}
              form={form}
              retnalPeriods={retnalPeriods}
              equipments={equipments}
            />
          </form>
        )
      }}
    />
  )
}
