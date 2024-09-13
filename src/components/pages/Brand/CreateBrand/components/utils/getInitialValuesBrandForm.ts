import { IPhonesInitialValue } from 'src/components/pages/Salon/CreateSalon/components/RegistrationForm/utils/getInitialValuesSalonForm'
import { IBrand } from 'src/types/brands'

interface IInitialInput
  extends Pick<
    IBrand,
    | 'name'
    | 'email'
    | 'description'
    | 'address'
    | 'history'
    | 'manufacture'
    | 'webSiteUrl'
  > {
  phones: IPhonesInitialValue[]
  country: string
}

export interface IInitialValuesBrandForm extends IInitialInput {
  socialNetworkUrls?: { [K: string]: string | null }
  checkCart: boolean
}

export type IgetInitialValuesBrandForm = (
  salon: IBrand | null,
) => IInitialValuesBrandForm

export const getInitialValuesBrandForm: IgetInitialValuesBrandForm = brand => {
  const socialNetworkUrls = {} as { [K: string]: string | null }
  brand?.socialNetworks.forEach(e => {
    socialNetworkUrls[e.title] = e.link || ''
  })

  const initialInput: IInitialInput = brand
    ? {
        address: brand.address || '',
        country: brand.country?.name || '',
        description: brand.description || '',
        email: brand.email,
        history: brand.history || '',
        manufacture: brand.manufacture,
        name: brand.name,
        webSiteUrl: brand.webSiteUrl || '',
        phones: brand.phones.map(e => ({
          phoneNumber: e.phoneNumber || '',
          haveTelegram: !!e.haveTelegram,
          haveViber: !!e.haveViber,
          haveWhatsApp: !!e.haveWhatsApp,
        })),

        // webSiteUrl: brand,
      }
    : {
        name: '',
        email: '',
        description: '',
        country: '',
        webSiteUrl: '',
        address: '',
        phones: [
          {
            haveTelegram: false,
            haveViber: false,
            haveWhatsApp: false,
            phoneNumber: '',
          },
        ],
      }

  const result: IInitialValuesBrandForm = {
    ...initialInput,
    checkCart: true,
  }

  // Добавляем socialNetworkUrls только если есть ключи
  if (Object.keys(socialNetworkUrls).length) {
    result.socialNetworkUrls = socialNetworkUrls
  }

  return result
}
