import { defaultValues } from 'src/api/authConfig'
import { workingHoursOptions } from 'src/components/blocks/Form/WorkingTimeField/WorkingTime'
import { ICity, IPhoto } from 'src/types'
import { IID } from 'src/types/common'
import {
  IWorkingHoursInputResolve,
  transformWorkingHours,
} from 'src/utils/newUtils/transformWorkingHoursInput'

export interface IPrepareInputSalonForm {
  name: string
  email: string
  salonPhones: string
  description: string
  locationDirections: string
  contactPersonEmail: string
  contactPersonName: string
  contactPersonPhone: string
  onlineBookingUrl: string
  socialNetworks: { title: string; link: string }[]
  webSiteUrl: string
  workingHours: IWorkingHoursInputResolve[]
  services: { setvice: string }[]
  activities: string[]
  city: IID | null
  address: string
  logo?: IID
}

interface Props {
  values: { [K: string]: any }
  findCity: ICity | null
  logo: IPhoto | null
  selectCity?: ICity | null
  photos: string[]
  rent: boolean
}

type IGetPrepareInputSalonForm = (props: Props) => IPrepareInputSalonForm

export const getPrepareInputSalonForm: IGetPrepareInputSalonForm = ({
  values,
  findCity,
  logo,
  selectCity,
  photos,
  rent = false,
}) => {
  const servicesForInput = values.services?.map((item: { id: IID }) => ({
    service: item.id,
  }))

  const servicesMForInput = values.servicesM?.map((item: { id: IID }) => ({
    service: item.id,
  }))

  const socialNetworks = values.socialNetworkUrls
    ? Object?.keys(values.socialNetworkUrls)?.map(e => ({
        title: e,
        link: values.socialNetworkUrls[e] as string,
      }))
    : []
  return {
    name: values.name,
    email: values.email,
    salonPhones: values.salonPhones,
    description: values.description,
    locationDirections: values.locationDirections,
    contactPersonEmail: values.contactPersonEmail,
    contactPersonName: values.contactPersonName,
    contactPersonPhone: values.contactPersonPhone?.phoneNumber,
    onlineBookingUrl: values.onlineBookingUrl,
    socialNetworks,
    webSiteUrl: values.webSiteUrl,
    workingHours: transformWorkingHours(
      workingHoursOptions,
      values.workingHours,
    ),
    contactPersonWH: transformWorkingHours(
      workingHoursOptions,
      values.contactPersonWorkingHours,
    ),
    services: servicesForInput,
    servicesM: servicesMForInput,
    activities: values.activities,
    city: findCity?.id || selectCity?.id || null,
    address: values.address,
    logo: logo?.id,
    photos,
    rent,
    cover: photos.length ? photos[0] : null,
  }
}
