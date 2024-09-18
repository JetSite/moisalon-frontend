import { ISalonWorkplace } from 'src/types/workplace'
import { ISalonPage } from 'src/types/salon'
import { IEquipment } from 'src/types/equipment'
import { IPeriod } from '../components/CreateWorkplace/type'
import { IPhoto } from 'src/types'
// import { IInitialValuesWorkplaceForm } from '../components/CreateWorkplace/type'

export interface IInitialValuesWorkplaceForm
  extends Pick<
    ISalonWorkplace,
    | 'isAvailableForRent'
    | 'description'
    | 'title'
    | 'shareRent'
    | 'subRent'
    | 'hasWindows'
    | 'withLicense'
  > {
  services: string[]
  workplaceTypes: string[]
  equipment: string[]
  wetPointsHands: string
  wetPointsHead: string
  wetPointsShower: string
  electricity_sockets_count: string
  electricity_sockets_extenders_count: string
  electricity_sockets_ups_count: string
  space: string
  floor: string
  gallery: IPhoto[]
  cover: string
  paymentMethods: string[]
  rentalPeriod: IPeriod[]
}

export type IGetInitialValuesWorkplaceForm = (
  props: IGetInitialValuesWorkplaceFormProps,
) => IInitialValuesWorkplaceForm

interface IGetInitialValuesWorkplaceFormProps {
  workplace: ISalonWorkplace | null
}

export const getInitialValuesWorkplaceForm: IGetInitialValuesWorkplaceForm = ({
  workplace,
}) => {
  const request: IInitialValuesWorkplaceForm = workplace
    ? {
        isAvailableForRent: !!workplace.isAvailableForRent,
        title: workplace.title,
        description: workplace.description || '',
        cover: workplace.cover?.id || '',
        shareRent: !!workplace.shareRent,
        subRent: !!workplace.subRent,
        services: workplace.services?.map(e => e.id) || [],
        workplaceTypes: workplace.workspaces_types.map(e => e.id) || [],
        equipment: workplace.equipment?.map(e => e.id) || [],
        withLicense: !!workplace?.withLicense,
        hasWindows: !!workplace.hasWindows,
        wetPointsHands: workplace.wetPointsHands?.toString() || '',
        wetPointsHead: workplace.wetPointsHead?.toString() || '',
        wetPointsShower: workplace.wetPointsShower?.toString() || '',
        electricity_sockets_count:
          workplace.electricitySocketsCount?.toString() || '',
        electricity_sockets_extenders_count:
          workplace.electricitySocketsExtendersCount?.toString() || '',
        electricity_sockets_ups_count:
          workplace.electricitySocketsUpsCount?.toString() || '',
        space: workplace?.space?.toString() || '',
        floor: workplace?.floor?.toString() || '',
        paymentMethods: workplace?.payment_methods.map(e => e.id),
        gallery: workplace.gallery,
        rentalPeriod: workplace.rentalPeriod?.map(period => ({
          id: period.rental_period.id,
          rentalCoast: period.rentalCost,
        })) || [{ id: 'CustomRate' }],
      }
    : {
        isAvailableForRent: true,
        description: '',
        title: '',
        shareRent: true,
        subRent: true,
        services: [],
        workplaceTypes: [],
        equipment: [],
        withLicense: false,
        hasWindows: false,
        wetPointsHands: '',
        wetPointsHead: '',
        wetPointsShower: '',
        electricity_sockets_count: '',
        electricity_sockets_extenders_count: '',
        electricity_sockets_ups_count: '',
        space: '',
        floor: '',
        cover: '',
        gallery: [],
        paymentMethods: ['1'],
        rentalPeriod: [{ id: 'CustomRate' }],
      }

  return request
}
