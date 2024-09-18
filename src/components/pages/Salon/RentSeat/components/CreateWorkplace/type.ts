import { IPhoto } from 'src/types'
import { IID, ISetState } from 'src/types/common'
import { ISalonActivity } from 'src/types/salon'
import { ISalonWorkplace } from 'src/types/workplace'

// export interface IInitialValuesWorkplaceForm {
//   activities?: string[]
//   allowJointRental?: boolean
//   allowSublease?: boolean
//   description?: string
//   electricity_sockets_count: number
//   electricity_sockets_extenders_count: number
//   electricity_sockets_ups_count: number
//   equipment?: string
//   equipment_heating?: string
//   equipment_lighting?: string
//   equipment_vent?: string
//   equipment_water?: string
//   floor?: string
//   hasWindows?: boolean
//   isAvailableForRent?: boolean
//   photos: IPhoto[]
//   rentalPaymentMethods?: string
//   rentalPricing?: string
//   seatNumber?: string
//   services?: string
//   space?: string
//   wetPointsHands?: string
//   wetPointsHead?: string
//   wetPointsShower?: string
//   withLicense: boolean
//   subRent: boolean
//   shareRent: boolean
//   title: string
// }

export interface IPeriod {
  id: string
  rentalCoast?: number
}
