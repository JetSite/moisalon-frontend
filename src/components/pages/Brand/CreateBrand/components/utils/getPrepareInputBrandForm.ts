import { ICoordinate } from 'src/components/blocks/Form/AddressField/AddressNoSalonField'
import { IPhonesInitialValue } from 'src/components/pages/Salon/CreateSalon/components/RegistrationForm/utils/getInitialValuesSalonForm'
import { ICity, ICountry, IPhoto } from 'src/types'
import { IID } from 'src/types/common'
import { parseToNumber } from 'src/utils/newUtils/common'

export interface IPrepareInputBrandForm {
  socialNetworks: { title: string; link: string }[]
  webSiteUrl: string
  name: string
  logo: IID
  city: IID | null
  country: IID | null
  phones: IPhonesInitialValue[]
  email: string
  address: string
  description: string
  history: string
  manufacture: string
}

interface Props {
  values: { [K: string]: any }
  findCity?: ICity | null
  findCountry?: ICountry | null
  logo: IPhoto
  coordinate: ICoordinate
}

type IGetPrepareInputBrandForm = (props: Props) => IPrepareInputBrandForm

export const getPrepareInputBrandForm: IGetPrepareInputBrandForm = ({
  values,
  findCity,
  findCountry,
  logo,
  coordinate,
}) => {
  const socialNetworks = values.socialNetworkUrls
    ? Object?.keys(values.socialNetworkUrls)?.map(e => ({
        title: e,
        link: values.socialNetworkUrls[e] as string,
      }))
    : []
  return {
    name: values.name,
    logo: logo?.id,
    city: findCity?.id || null,
    country: findCountry?.id || null,
    phones: values.phones,
    email: values.email,
    address: values.address,
    description: values.description,
    history: values.history,
    manufacture: values.manufacture,
    webSiteUrl: values.webSiteUrl,
    minimalOrderPrice: parseToNumber(values.minimalOrderPrice),
    termsDeliveryPrice: values.termsDeliveryPrice,
    socialNetworks,
    ...coordinate,
  }
}
