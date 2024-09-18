import { ISalonWorkplace } from 'src/types/workplace'
import { IInitialValuesWorkplaceForm } from './getInitialValuesWorkplaceForm'
import { IID } from 'src/types/common'
import { parseToNumber } from 'src/utils/newUtils/common'
import { removeEmptyFields } from 'src/utils/newUtils/removeEmptyFields'

export interface IPrepareInputWorkplaceForm
  extends Omit<
    ISalonWorkplace,
    | 'cover'
    | 'services'
    | 'equipment'
    | 'rentalPeriod'
    | 'payment_methods'
    | 'gallery'
    | 'id'
    | 'workspaces_types'
    | 'salon'
  > {
  cover?: IID
  services: IID[]
  workspaces_types: IID[]
  equipment: IID[]
  payment_methods: IID[]
  gallery: IID[]
  rentalPeriod:
    | {
        rentalCost: number | null
        rental_period: IID
      }[]
    | null
}

type IGetPrepareInputWorkplaceForm = (
  values: Partial<IInitialValuesWorkplaceForm>,
) => Partial<IPrepareInputWorkplaceForm>

export const getPrepareInputWorkplaceForm: IGetPrepareInputWorkplaceForm =
  values => {
    const rentalPeriod = values.rentalPeriod
      ?.map(e => {
        return {
          rental_period: e.id,
          rentalCost: parseToNumber(e.rentalCoast),
        }
      })
      .filter(period => period.rental_period !== 'CustomRate')

    const request: IPrepareInputWorkplaceForm = {
      isAvailableForRent: !!values.isAvailableForRent,
      title: values.title as string,
      description: values.description as string,
      cover: values.cover,
      shareRent: !!values.shareRent,
      subRent: !!values.subRent,
      services: values.services as IID[],
      equipment: values.equipment as IID[],
      withLicense: !!values.withLicense,
      hasWindows: !!values.hasWindows,
      wetPointsHands: parseToNumber(values.wetPointsHands),
      wetPointsHead: parseToNumber(values.wetPointsHead),
      wetPointsShower: parseToNumber(values.wetPointsShower),
      electricitySocketsCount: parseToNumber(values.electricity_sockets_count),
      electricitySocketsExtendersCount: parseToNumber(
        values.electricity_sockets_extenders_count,
      ),
      electricitySocketsUpsCount: parseToNumber(
        values.electricity_sockets_ups_count,
      ),
      space: parseToNumber(values.space),
      floor: parseToNumber(values.floor),
      payment_methods: values.paymentMethods as IID[],
      gallery: values.gallery?.map(e => e.id) as IID[],
      rentalPeriod: rentalPeriod?.length ? rentalPeriod : null,
      workspaces_types: values.workplaceTypes as IID[],
    }

    return removeEmptyFields(request)
  }
