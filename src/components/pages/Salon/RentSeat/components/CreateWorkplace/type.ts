import { IPhoto } from 'src/types'
import { IID, ISetState } from 'src/types/common'
import { ISalonActivity } from 'src/types/salon'
import { ISalonWorkplace } from 'src/types/workplace'

export interface IChangeWorkplaceFormValues {
  activities?: string[]
  allowJointRental?: boolean
  allowSublease?: boolean
  description?: string
  electricity_sockets_count: number
  electricity_sockets_extenders_count: number
  electricity_sockets_ups_count: number
  equipment?: string
  equipment_heating?: string
  equipment_lighting?: string
  equipment_vent?: string
  equipment_water?: string
  floor?: string
  hasWindows?: boolean
  isAvailableForRent?: boolean
  photos: IPhoto[]
  rentalPaymentMethods?: string
  rentalPricing?: string
  seatNumber?: string
  services?: string
  space?: string
  wetPointsHands?: string
  wetPointsHead?: string
  wetPointsShower?: string
  withLicense: boolean
  subRent: boolean
  shareRent: boolean
}

export interface IPeriod {
  id: string
  rentalCoast?: number
}

export interface IChangeWorkplaceFormStates {
  workplace: ISalonWorkplace | null
  setWorkplace: ISetState<ISalonWorkplace | null>
  workplaceId: IID | null
  setWorkplaceId: ISetState<IID | null>
  setCreateWorkplace: ISetState<boolean>
  errors: string[] | null
  setErrors: ISetState<string[] | null>
  isErrorPopupOpen: boolean
  setErrorPopupOpen: ISetState<boolean>
  success: boolean
  setSuccess: ISetState<boolean>
  periods: IPeriod[]
  setPeriods: ISetState<IPeriod[]>
  cover: IPhoto | null
  setCover: ISetState<IPhoto | null>
}
