import { IPaymentMethods, IPhoto, IWorkplacesType } from '.'
import { IID } from './common'
import { IEquipment } from './equipment'
import { IService } from './services'

export interface ISalonRentalPeriod {
  id: IID
  rentalCost: number
  rental_period: {
    id: IID
    title: string
  }
}

export interface ISalonWorkplace {
  id: IID
  description: string | null
  shareRent: boolean
  subRent: boolean
  title: string
  workspaces_types: IWorkplacesType[]
  rentalPeriod: ISalonRentalPeriod[] | null
  payment_methods: IPaymentMethods[]
  gallery: IPhoto[]
  cover: IPhoto | null
  electricitySocketsCount: number | null
  electricitySocketsExtendersCount: number | null
  electricitySocketsUpsCount: number | null
  equipment: IEquipment[]
  floor: number | null
  hasWindows: boolean
  isAvailableForRent: boolean
  space: number | null
  wetPointsHands: number | null
  wetPointsHead: number | null
  wetPointsShower: number | null
  withLicense: boolean
  services: IService[]
  salon: { id: IID }
}
