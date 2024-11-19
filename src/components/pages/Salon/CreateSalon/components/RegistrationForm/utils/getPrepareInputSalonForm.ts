import { defaultValues } from 'src/api/authConfig'
import { ICoordinate } from 'src/components/blocks/Form/AddressField/AddressNoSalonField'
import { workingHoursOptions } from 'src/config/workingTime'
import { ICity, IPhoto, ISNetwork } from 'src/types'
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
  findCity?: ICity | null
  logo: IPhoto | null
  photos: string[]
  rent: boolean
  coordinate: ICoordinate
  sNetworks: ISNetwork[]
}

type IGetPrepareInputSalonForm = (props: Props) => IPrepareInputSalonForm

export const getPrepareInputSalonForm: IGetPrepareInputSalonForm = ({
  values,
  findCity,
  logo,
  photos,
  coordinate,
  sNetworks,
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
        s_network: sNetworks.find(netWork => netWork.slug === e)?.id,
      }))
    : []
  return {
    name: values.name,
    email: values.email,
    salonPhones: values.salonPhones,
    description: values.description,
    videoReviewUrl: values.videoReviewUrl,
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
    city: findCity?.id || null,
    address: values.address,
    logo: logo?.id,
    photos,
    rent,
    cover: photos.length ? photos[0] : null,
    ...coordinate,
  }
}
