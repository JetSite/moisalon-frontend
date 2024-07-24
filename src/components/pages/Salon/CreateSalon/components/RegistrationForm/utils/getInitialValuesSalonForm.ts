import { ISocialNetworks } from 'src/types'
import { ISalonPage } from 'src/types/salon'

interface ISalonPhonesInitialValue {
  phoneNumber: string
  haveTelegram: boolean
  haveViber: boolean
  haveWhatsApp: boolean
}

interface IWorkingHours {
  startDayOfWeek: string
  startHour: number
  startMinute: number
  endDayOfWeek: string
  endHour: number
  endMinute: number
}

interface IInitialInput
  extends Pick<
    ISalonPage,
    | 'name'
    | 'email'
    | 'description'
    | 'locationDirections'
    | 'contactPersonEmail'
    | 'contactPersonName'
    | 'onlineBookingUrl'
    | 'webSiteUrl'
    | 'salonPhones'
    | 'address'
  > {
  activities: string[] | null
  services: { id: string }[] | []
  salonPhones: ISalonPhonesInitialValue[]
}

export interface IInitialValuesSalonForm extends IInitialInput {
  socialNetworkUrls: { [K: string]: string | null }
  workingHours: IWorkingHours[]
  contactPersonWorkingHours: IWorkingHours[]
}

export type IgetInitialValuesSalonForm = (
  salon: ISalonPage | null,
) => IInitialValuesSalonForm

export const getInitialValuesSalonForm: IgetInitialValuesSalonForm = salon => {
  const socialNetworkUrls = {} as { [K: string]: string | null }
  salon?.socialNetworks.forEach(e => {
    socialNetworkUrls[e.title] = e.link || null
  })

  const initialInput: IInitialInput = salon
    ? {
        name: salon.name,
        email: salon.email,
        description: salon.description,
        locationDirections: salon.locationDirections,
        contactPersonEmail: salon.contactPersonEmail,
        contactPersonName: salon.contactPersonName,
        onlineBookingUrl: salon.onlineBookingUrl,
        webSiteUrl: salon.webSiteUrl,
        address: salon?.address,
        salonPhones: salon.salonPhones.map(e => ({
          phoneNumber: e.phoneNumber || '',
          haveTelegram: !!e.haveTelegram,
          haveViber: !!e.haveViber,
          haveWhatsApp: !!e.haveWhatsApp,
        })),
        activities: salon.activities.map(e => e.id) || null,
        services: salon.services.map(e => ({ id: e.service.id })) || [],
      }
    : {
        name: '',
        email: '',
        description: '',
        locationDirections: '',
        contactPersonEmail: '',
        contactPersonName: '',
        onlineBookingUrl: '',
        webSiteUrl: '',
        address: '',
        salonPhones: [
          {
            haveTelegram: false,
            haveViber: false,
            haveWhatsApp: false,
            phoneNumber: '',
          },
        ],
        activities: null,
        services: [],
      }
  return {
    ...initialInput,
    socialNetworkUrls,
    workingHours: [
      {
        startDayOfWeek: 'MONDAY',
        startHour: 0,
        startMinute: 0,
        endDayOfWeek: 'FRIDAY',
        endHour: 23,
        endMinute: 59,
      },
    ],
    contactPersonWorkingHours: [
      {
        startDayOfWeek: 'MONDAY',
        startHour: 0,
        startMinute: 0,
        endDayOfWeek: 'FRIDAY',
        endHour: 23,
        endMinute: 59,
      },
    ],
  }
}
