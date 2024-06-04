import { workingHoursOptions } from 'src/components/blocks/Form/WorkingTimeField/WorkingTime'
import { ICity, IPhoto } from 'src/types'
import { IID } from 'src/types/common'
import {
  IWorkingHoursInputResolve,
  transformWorkingHours,
} from 'src/utils/newUtils/transformWorkingHoursInput'

export interface IPrepareInputSalonForm {
  salonName: string
  salonEmail: string
  salonPhones: string
  salonDescription: string
  locationDirections: string
  salonContactPersonEmail: string
  salonContactPersonName: string
  salonContactPersonPhone: string
  salonOnlineBookingUrl: string
  socialNetworks: { title: string; link: string }[]
  salonWebSiteUrl: string
  workingHours: IWorkingHoursInputResolve[]
  services: { setvice: string }[]
  activities: string[]
  cities: IID | null
  salonAddress: string
  salonLogo?: IID
}

interface Props {
  values: { [K: string]: any }
  findCity: ICity | null
  logo: IPhoto | null
  selectCityId: IID | null
}

type IGetPrepareInputSalonForm = (props: Props) => IPrepareInputSalonForm

export const getPrepareInputSalonForm: IGetPrepareInputSalonForm = ({
  values,
  findCity,
  logo,
  selectCityId,
}) => {
  const servicesForInput = values.services?.map((item: { id: IID }) => ({
    service: item.id,
  }))

  const socialNetworks = values.socialNetworkUrls
    ? Object?.keys(values.socialNetworkUrls)?.map(e => ({
        title: e,
        link: values.socialNetworkUrls[e] as string,
      }))
    : []
  return {
    salonName: values.salonName,
    salonEmail: values.salonEmail,
    salonPhones: values.salonPhones,
    salonDescription: values.salonDescription,
    locationDirections: values.locationDirections,
    salonContactPersonEmail: values.salonContactPersonEmail,
    salonContactPersonName: values.salonContactPersonName,
    salonContactPersonPhone: values.salonContactPersonPhone?.phoneNumber,
    salonOnlineBookingUrl: values.salonOnlineBookingUrl,
    socialNetworks,
    salonWebSiteUrl: values.salonWebSiteUrl,
    workingHours: transformWorkingHours(
      workingHoursOptions,
      values.workingHours,
    ),
    services: servicesForInput,
    activities: values.activities,
    cities: findCity?.id || selectCityId,
    salonAddress: values.address,
    salonLogo: logo?.id,
  }
}
